import { navigate, store } from '../../lib/store'
import { getDueReviewStates, getReviewState, upsertReviewState } from '../../data/progress'
import { getCourse } from '../../content/index'
import { scheduleReview, cardToRow, Rating } from '../../engine/srs'
import { renderMath } from '../../lib/katex'
import { renderMarkdown } from '../components/MathRender'
import { addXP, XP_REVIEW_GOOD, XP_REVIEW_HARD, XP_REVIEW_AGAIN } from '../../engine/session'
import { haptic } from '../../lib/haptics'
import type { ReviewCard } from '../../types'
import type { ReviewStateRow } from '../../types'

export async function renderReviewScreen(container: HTMLElement): Promise<void> {
  container.innerHTML = `<div class="flex items-center justify-center min-h-screen">
    <div class="text-gray-400 text-sm">Lade Karten…</div>
  </div>`

  const dueStates = await getDueReviewStates()

  if (dueStates.length === 0) {
    renderEmpty(container)
    return
  }

  const course = await getCourse()
  const allCards = new Map<string, ReviewCard>()
  for (const pu of course.phases)
    for (const t of pu.topics)
      for (const l of t.lessons)
        for (const c of l.reviewCards)
          allCards.set(c.id, c)

  const queue = dueStates.filter(s => allCards.has(s.cardId))
  if (queue.length === 0) { renderEmpty(container); return }

  let idx = 0
  let reviewedToday = 0

  async function renderCard(revealed: boolean) {
    const state = queue[idx]
    if (!state) { renderDone(container, reviewedToday, queue.length); return }
    const card  = allCards.get(state.cardId)!
    renderCardUI(container, card, state, revealed, idx, queue.length, reviewedToday, {
      onReveal: () => renderCard(true),
      onRate: async (rating: Rating) => {
        await rateCard(state.cardId, rating)
        reviewedToday++
        idx++
        renderCard(false)
      },
    })
  }

  async function rateCard(cardId: string, rating: Rating) {
    haptic.light()
    const existing = await getReviewState(cardId)
    const { next } = scheduleReview(existing, rating)
    await upsertReviewState(cardToRow(cardId, next))
    const xp = rating >= Rating.Good ? XP_REVIEW_GOOD
             : rating === Rating.Hard ? XP_REVIEW_HARD
             : XP_REVIEW_AGAIN
    if (xp > 0) await addXP(xp)
  }

  renderCard(false)
}

function renderCardUI(
  container: HTMLElement,
  card: ReviewCard,
  _state: ReviewStateRow,
  revealed: boolean,
  idx: number,
  total: number,
  reviewed: number,
  callbacks: { onReveal: () => void; onRate: (r: Rating) => void },
): void {
  const streak = store.get('streak')

  container.innerHTML = `
    <div class="screen pb-28">
      <!-- Top bar -->
      <div class="top-bar">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl no-tap-highlight">←</button>
        <span class="text-sm text-gray-400 flex-1 text-center">
          Karte ${idx + 1} / ${total}
        </span>
        <streak-badge count="${streak}"></streak-badge>
      </div>

      <!-- Progress bar -->
      <div class="progress-track mb-4">
        <div class="progress-fill" style="width:${Math.round((idx / total) * 100)}%"></div>
      </div>

      <!-- Card -->
      <div class="flex-1 flex flex-col justify-center px-1">
        <div class="card mb-4 min-h-[120px]">
          <p class="text-xs text-gray-500 uppercase tracking-wider mb-3">Frage</p>
          <div class="math-block text-base leading-relaxed">${renderMarkdown(card.front)}</div>
          <div class="flex flex-wrap gap-1 mt-3">
            ${card.conceptTags.map(t =>
              `<span class="px-2 py-0.5 bg-surface-700 rounded-full text-xs text-gray-400">${t}</span>`
            ).join('')}
          </div>
        </div>

        ${revealed ? `
          <!-- Back (card flip animation) -->
          <div class="card border border-green-500/30 bg-green-900/10 mb-4 answer-reveal">
            <p class="text-xs text-gray-500 uppercase tracking-wider mb-3">Antwort</p>
            <div class="math-block text-base leading-relaxed">${renderMarkdown(card.back)}</div>
          </div>

          <!-- Rating buttons -->
          <p class="text-xs text-gray-500 text-center mb-3">Wie gut wusstest du es?</p>
          <div class="grid grid-cols-2 gap-2">
            <button data-rating="${Rating.Again}"
              class="rating-btn py-3 rounded-xl border border-red-500/40 bg-red-900/20 text-red-400 font-medium text-sm no-tap-highlight active:scale-95 transition-transform">
              🔁 Nochmal
            </button>
            <button data-rating="${Rating.Hard}"
              class="rating-btn py-3 rounded-xl border border-orange-500/40 bg-orange-900/20 text-orange-400 font-medium text-sm no-tap-highlight active:scale-95 transition-transform">
              😓 Schwer
            </button>
            <button data-rating="${Rating.Good}"
              class="rating-btn btn-primary py-3 text-sm no-tap-highlight active:scale-95 transition-transform">
              👍 Gut
            </button>
            <button data-rating="${Rating.Easy}"
              class="rating-btn py-3 rounded-xl border border-blue-500/40 bg-blue-900/20 text-blue-400 font-medium text-sm no-tap-highlight active:scale-95 transition-transform">
              ✨ Leicht
            </button>
          </div>
        ` : `
          <div class="fixed bottom-6 right-4 left-4 max-w-lg mx-auto">
            <button id="reveal-btn"
              class="btn-primary w-full py-4 text-base no-tap-highlight active:scale-95 transition-transform">
              Antwort zeigen
            </button>
          </div>
        `}
      </div>

      <!-- Bottom stats -->
      <div class="fixed bottom-0 left-0 right-0 bg-surface-900/80 backdrop-blur-sm px-4 py-2 flex justify-between text-xs text-gray-500">
        <span>Heute wiederholt: ${reviewed}</span>
        <span>Streak: ${streak} 🔥</span>
      </div>
    </div>`

  container.querySelectorAll<HTMLElement>('.math-block').forEach(el => renderMath(el))
  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
  container.querySelector('#reveal-btn')?.addEventListener('click', () => {
    haptic.light()
    callbacks.onReveal()
  })
  container.querySelectorAll<HTMLElement>('.rating-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rating = parseInt(btn.dataset['rating'] ?? '3', 10) as Rating
      callbacks.onRate(rating)
    })
  })
}

function renderEmpty(container: HTMLElement): void {
  const streak = store.get('streak')
  container.innerHTML = `
    <div class="screen items-center justify-center text-center py-16 px-4">
      <div class="top-bar justify-between">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl">←</button>
        <h1 class="text-lg font-bold">Wiederholungen</h1>
        <streak-badge count="${streak}"></streak-badge>
      </div>
      <div class="flex-1 flex flex-col items-center justify-center">
        <p class="text-5xl mb-4">🎉</p>
        <h2 class="text-xl font-bold mb-2">Keine Reviews fällig!</h2>
        <p class="text-gray-400 mb-6 max-w-xs">
          Komm morgen wieder oder lerne eine neue Lektion, um Karten einzuenrollen.
        </p>
        <button id="learn-btn" class="btn-primary px-8">Neue Lektion lernen</button>
      </div>
    </div>`

  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
  container.querySelector('#learn-btn')?.addEventListener('click', () => navigate('/'))
}

function renderDone(container: HTMLElement, reviewed: number, total: number): void {
  container.innerHTML = `
    <div class="screen items-center justify-center text-center py-12">
      <p class="text-5xl mb-4">🏆</p>
      <h1 class="text-xl font-bold mb-2">Alle Karten wiederholt!</h1>
      <p class="text-gray-400 mb-6">${reviewed} von ${total} Karten bearbeitet.</p>
      <button id="home-btn" class="btn-primary px-8">Zur Übersicht</button>
    </div>`
  container.querySelector('#home-btn')?.addEventListener('click', () => navigate('/'))
}
