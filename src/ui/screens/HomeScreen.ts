import { store, navigate } from '../../lib/store'
import { getAllProgress, getDueReviewStates } from '../../data/progress'
import { getCourse } from '../../content/index'
import { getGamStats } from '../../engine/session'

export async function renderHomeScreen(container: HTMLElement): Promise<void> {
  // Show skeleton quickly
  container.innerHTML = `<div class="screen"><div class="animate-pulse space-y-4 py-4">
    <div class="h-8 bg-surface-700 rounded-xl w-3/4"></div>
    <div class="h-24 bg-surface-700 rounded-2xl"></div>
    <div class="h-16 bg-surface-700 rounded-2xl"></div>
    <div class="h-16 bg-surface-700 rounded-2xl"></div>
  </div></div>`

  const [course, allProgress, dueCards, gam] = await Promise.all([
    getCourse(),
    getAllProgress(),
    getDueReviewStates(),
    getGamStats(),
  ])

  const progressMap = new Map(allProgress.map(p => [p.lessonId, p]))
  const streak = store.get('streak')
  const todayXp = gam.dailyXP
  const goal = gam.dailyGoalXP
  const goalPct = Math.min(100, goal > 0 ? Math.round((todayXp / goal) * 100) : 0)

  const phaseStats = course.phases.map(pu => {
    const allLessons = pu.topics.flatMap(t => t.lessons)
    const done = allLessons.filter(l => {
      const p = progressMap.get(l.id)
      return p && (p.masteryLevel === 'proficient' || p.masteryLevel === 'mastered')
    }).length
    return { phase: pu.phase, title: pu.title, done, total: allLessons.length }
  })

  // Find next unfinished lesson
  let nextLessonId: string | null = null
  outer: for (const pu of course.phases) {
    for (const topic of pu.topics) {
      for (const lesson of topic.lessons) {
        const p = progressMap.get(lesson.id)
        if (!p || p.status !== 'completed') { nextLessonId = lesson.id; break outer }
      }
    }
  }

  const hasAnyActivity = allProgress.length > 0

  container.innerHTML = `
    <div class="screen pb-28">
      <!-- Top bar -->
      <div class="top-bar justify-between">
        <h1 class="text-xl font-bold">MathLab DE</h1>
        <div class="flex items-center gap-2">
          <streak-badge count="${streak}"></streak-badge>
          <button id="profile-btn" class="btn-secondary px-3 py-1.5 text-sm no-tap-highlight">
            👤 Profil
          </button>
        </div>
      </div>

      <!-- Daily Goal Ring + XP -->
      <div class="card mb-4 flex items-center gap-4">
        <div class="relative flex-shrink-0">
          ${goalRing(goalPct, 64)}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-center mb-1">
            <span class="font-semibold text-sm">Tagesziel</span>
            <span class="text-brand-400 font-bold text-sm">${todayXp} / ${goal} XP</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${goalPct}%"></div>
          </div>
          ${goalPct >= 100
            ? `<p class="text-green-400 text-xs mt-1">🎯 Tagesziel erreicht!</p>`
            : `<p class="text-gray-500 text-xs mt-1">Noch ${goal - todayXp} XP bis zum Ziel</p>`}
        </div>
      </div>

      <!-- Backup reminder placeholder (injected by main.ts if needed) -->
      <div id="backup-banner"></div>

      <!-- Due Reviews -->
      ${dueCards.length > 0 ? `
        <div class="card mb-4 flex items-center justify-between border border-orange-500/30">
          <div>
            <p class="font-semibold text-sm">📋 Wiederholungen fällig</p>
            <p class="text-xs text-gray-400">${dueCards.length} Karte${dueCards.length !== 1 ? 'n' : ''}</p>
          </div>
          <button id="review-btn" class="btn-primary px-4 py-2 text-sm no-tap-highlight">
            Wiederholen
          </button>
        </div>` : ''}

      <!-- Empty welcome state -->
      ${!hasAnyActivity ? `
        <div class="card mb-4 text-center py-6 border border-brand-500/20">
          <p class="text-2xl mb-2">👋</p>
          <p class="font-semibold mb-1">Willkommen bei MathLab DE!</p>
          <p class="text-gray-400 text-sm">Tippe auf Phase 0 um deine erste Lektion zu starten.</p>
        </div>` : ''}

      <!-- Phase Progress -->
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Lernpfad</h2>
      <div class="space-y-2 mb-6">
        ${phaseStats.map(({ phase, title, done, total }) => `
          <div class="card cursor-pointer hover:bg-surface-700 active:bg-surface-600 transition-colors no-tap-highlight"
            data-phase="${phase}">
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium text-sm">Phase ${phase}: ${title}</span>
              <span class="text-xs text-gray-400">${done}/${total}</span>
            </div>
            <progress-bar value="${done}" max="${Math.max(total, 1)}"></progress-bar>
          </div>`).join('')}
      </div>
    </div>

    <!-- FAB: continue learning -->
    <div class="fixed bottom-6 right-4 left-4 max-w-lg mx-auto">
      ${nextLessonId
        ? `<button id="continue-btn" data-lesson="${nextLessonId}"
            class="btn-primary w-full text-base py-4 shadow-xl no-tap-highlight active:scale-95 transition-transform">
            ▶ Weiter lernen
           </button>`
        : `<div class="card text-center py-4">
            <p class="text-green-400 font-semibold">🎓 Alle Lektionen abgeschlossen!</p>
           </div>`}
    </div>`

  // Event listeners
  container.querySelector('#profile-btn')?.addEventListener('click', () => navigate('/profile'))
  container.querySelector('#review-btn')?.addEventListener('click', () => navigate('/review'))

  const continueBtn = container.querySelector<HTMLElement>('#continue-btn')
  continueBtn?.addEventListener('click', () => {
    const id = continueBtn.dataset['lesson']
    if (id) navigate(`/lesson/${id}`)
  })

  container.querySelectorAll<HTMLElement>('[data-phase]').forEach(el => {
    el.addEventListener('click', () => navigate(`/topics/${el.dataset['phase']}`))
  })
}

function goalRing(pct: number, size: number): string {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const filled = circ * (pct / 100)
  const color = pct >= 100 ? '#22c55e' : '#6366f1'

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}"
      fill="none" stroke="#1f2937" stroke-width="6"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}"
      fill="none" stroke="${color}" stroke-width="6"
      stroke-dasharray="${filled} ${circ}"
      stroke-linecap="round"
      transform="rotate(-90 ${size/2} ${size/2})"/>
    <text x="${size/2}" y="${size/2 + 5}" text-anchor="middle"
      fill="${color}" font-size="13" font-weight="bold"
      font-family="sans-serif">${pct}%</text>
  </svg>`
}
