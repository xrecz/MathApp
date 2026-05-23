import { store, navigate } from '../../lib/store'
import { getAllProgress, getDueReviewStates } from '../../data/progress'
import { getCourse } from '../../content/index'

export async function renderHomeScreen(container: HTMLElement): Promise<void> {
  const course = await getCourse()
  const allProgress = await getAllProgress()
  const dueCards = await getDueReviewStates()
  const progressMap = new Map(allProgress.map(p => [p.lessonId, p]))

  const streak   = store.get('streak')
  const todayXp  = store.get('todayXp')
  const goal     = store.get('dailyGoalXp')
  const goalPct  = Math.min(100, Math.round((todayXp / goal) * 100))

  const phaseStats = course.phases.map(pu => {
    const allLessons = pu.topics.flatMap(t => t.lessons)
    const done = allLessons.filter(l => {
      const p = progressMap.get(l.id)
      return p && (p.masteryLevel === 'proficient' || p.masteryLevel === 'mastered')
    }).length
    return { phase: pu.phase, title: pu.title, done, total: allLessons.length }
  })

  // Find next uncompleted lesson
  let nextLessonId: string | null = null
  outer: for (const pu of course.phases) {
    for (const topic of pu.topics) {
      for (const lesson of topic.lessons) {
        const p = progressMap.get(lesson.id)
        if (!p || p.status !== 'completed') {
          nextLessonId = lesson.id
          break outer
        }
      }
    }
  }

  container.innerHTML = `
    <div class="screen pb-24">
      <div class="top-bar justify-between">
        <h1 class="text-xl font-bold">MathLab DE</h1>
        <div class="flex items-center gap-3">
          <streak-badge count="${streak}"></streak-badge>
          <button id="profile-btn" class="btn-secondary px-3 py-2 text-sm">Profil</button>
        </div>
      </div>

      <!-- Daily Goal -->
      <div class="card mb-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium">Tagesziel</span>
          <span class="text-sm text-brand-400">${todayXp} / ${goal} XP</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${goalPct}%"></div>
        </div>
        ${goalPct >= 100 ? `<p class="text-green-400 text-xs mt-1 text-center">🎉 Tagesziel erreicht!</p>` : ''}
      </div>

      <!-- Due Reviews -->
      ${dueCards.length > 0 ? `
        <div class="card mb-4 border border-orange-500/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold">📋 Wiederholungen fällig</p>
              <p class="text-sm text-gray-400">${dueCards.length} Karte${dueCards.length !== 1 ? 'n' : ''} warten</p>
            </div>
            <button id="review-btn" class="btn-primary px-4 py-2 text-sm">Wiederholen</button>
          </div>
        </div>` : ''}

      <!-- Phase Progress -->
      <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Lernpfad</h2>
      <div class="space-y-3 mb-6">
        ${phaseStats.map(({ phase, title, done, total }) => `
          <div class="card cursor-pointer hover:bg-surface-700 transition-colors" data-phase="${phase}">
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium">Phase ${phase}: ${title}</span>
              <span class="text-xs text-gray-400">${done}/${total}</span>
            </div>
            <progress-bar value="${done}" max="${total || 1}"></progress-bar>
          </div>`).join('')}
      </div>

      <!-- FAB -->
      ${nextLessonId ? `
        <div class="fixed bottom-6 right-4 left-4 max-w-lg mx-auto">
          <button id="continue-btn" data-lesson="${nextLessonId}"
            class="btn-primary w-full text-base py-4 shadow-xl">
            ▶ Weiter lernen
          </button>
        </div>` : `
        <div class="card text-center py-8">
          <p class="text-2xl mb-2">🎓</p>
          <p class="font-semibold">Alle Lektionen abgeschlossen!</p>
        </div>`}
    </div>`

  // Register custom elements (import side effects)
  await import('../components/StreakBadge')
  await import('../components/ProgressBar')

  container.querySelector('#profile-btn')?.addEventListener('click', () => navigate('/profile'))
  container.querySelector('#review-btn')?.addEventListener('click', () => navigate('/review'))

  const continueBtn = container.querySelector('#continue-btn') as HTMLElement | null
  continueBtn?.addEventListener('click', () => {
    const id = continueBtn.dataset['lesson']
    if (id) navigate(`/lesson/${id}`)
  })

  container.querySelectorAll('[data-phase]').forEach(el => {
    (el as HTMLElement).addEventListener('click', () => {
      const phase = (el as HTMLElement).dataset['phase']
      navigate(`/topics/${phase}`)
    })
  })

  // Init custom elements
  requestAnimationFrame(() => {
    container.querySelectorAll<HTMLElement>('streak-badge, progress-bar').forEach(el => {
      if ('render' in el) (el as { render(): void }).render()
    })
  })
}

