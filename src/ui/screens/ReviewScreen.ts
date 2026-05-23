import { navigate } from '../../lib/store'
import { getDueReviewStates, getReviewState, upsertReviewState } from '../../data/progress'
import { getCourse } from '../../content/index'
import { scheduleReview, cardToRow, Rating } from '../../engine/srs'
import { renderMath } from '../../lib/katex'
import { renderMarkdown } from '../components/MathRender'
import { addXp } from '../../data/settings'
import { hapticSuccess } from '../../lib/haptics'
import type { ReviewCard } from '../../types'

export async function renderReviewScreen(container: HTMLElement): Promise<void> {
  const dueStates = await getDueReviewStates()

  if (dueStates.length === 0) {
    container.innerHTML = `
      <div class="screen items-center justify-center text-center py-12">
        <p class="text-4xl mb-4">✅</p>
        <h1 class="text-xl font-bold mb-2">Keine Wiederholungen fällig!</h1>
        <p class="text-gray-400 mb-6">Komm später wieder.</p>
        <button id="back-btn" class="btn-secondary">Zurück</button>
      </div>`
    container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
    return
  }

  // Map cardId → ReviewCard
  const course = await getCourse()
  const allCards = new Map<string, ReviewCard>()
  for (const pu of course.phases) {
    for (const topic of pu.topics) {
      for (const lesson of topic.lessons) {
        for (const card of lesson.reviewCards) {
          allCards.set(card.id, card)
        }
      }
    }
  }

  let currentIdx = 0
  const queue = dueStates.filter(s => allCards.has(s.cardId))

  async function renderCard(revealed: boolean): Promise<void> {
    const state = queue[currentIdx]
    if (!state) {
      renderFinished()
      return
    }
    const card = allCards.get(state.cardId)!

    container.innerHTML = `
      <div class="screen pb-24">
        <div class="top-bar">
          <button id="back-btn" class="text-gray-400 hover:text-white text-xl">←</button>
          <span class="text-sm text-gray-400 flex-1 text-center">
            ${currentIdx + 1} von ${queue.length} heute fällig
          </span>
        </div>

        <div class="flex-1 flex flex-col justify-center py-6">
          <!-- Front -->
          <div class="card mb-4">
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Frage</p>
            <div class="math-block text-lg">${renderMarkdown(card.front)}</div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1 mb-4">
            ${card.conceptTags.map(t => `<span class="px-2 py-0.5 bg-surface-700 rounded-full text-xs text-gray-400">${t}</span>`).join('')}
          </div>

          ${revealed ? `
            <!-- Back -->
            <div class="card border border-green-500/30 mb-6">
              <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Antwort</p>
              <div class="math-block">${renderMarkdown(card.back)}</div>
            </div>

            <!-- Rating buttons -->
            <div class="grid grid-cols-2 gap-2">
              <button data-rating="${Rating.Again}" class="rating-btn btn-secondary text-red-400 py-3">
                🔁 Nochmal
              </button>
              <button data-rating="${Rating.Hard}" class="rating-btn btn-secondary text-orange-400 py-3">
                😓 Schwer
              </button>
              <button data-rating="${Rating.Good}" class="rating-btn btn-primary py-3">
                👍 Gut
              </button>
              <button data-rating="${Rating.Easy}" class="rating-btn btn-secondary text-green-400 py-3">
                ✨ Leicht
              </button>
            </div>` : `
            <div class="fixed bottom-6 right-4 left-4 max-w-lg mx-auto">
              <button id="reveal-btn" class="btn-primary w-full py-4 text-base">Antwort zeigen</button>
            </div>`}
        </div>
      </div>`

    container.querySelectorAll<HTMLElement>('.math-block').forEach(el => renderMath(el))

    container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
    container.querySelector('#reveal-btn')?.addEventListener('click', () => renderCard(true))

    container.querySelectorAll<HTMLElement>('.rating-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const rating = parseInt(btn.dataset['rating'] ?? '3', 10) as Rating
        await rateCard(state.cardId, rating)
        hapticSuccess()
        currentIdx++
        renderCard(false)
      })
    })
  }

  async function rateCard(cardId: string, rating: Rating): Promise<void> {
    const existing = await getReviewState(cardId)
    const { next } = scheduleReview(existing, rating)
    await upsertReviewState(cardToRow(cardId, next))
    if (rating >= Rating.Good) await addXp(5)
  }

  function renderFinished(): void {
    container.innerHTML = `
      <div class="screen items-center justify-center text-center py-12">
        <p class="text-5xl mb-4">🏆</p>
        <h1 class="text-xl font-bold mb-2">Alle Karten wiederholt!</h1>
        <p class="text-gray-400 mb-6">${queue.length} Karte${queue.length !== 1 ? 'n' : ''} bearbeitet.</p>
        <button id="home-btn" class="btn-primary">Zur Übersicht</button>
      </div>`
    container.querySelector('#home-btn')?.addEventListener('click', () => navigate('/'))
  }

  renderCard(false)
}
