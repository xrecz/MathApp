import { navigate } from '../../lib/store'
import { getCourse } from '../../content/index'
import { LessonStateMachine } from '../../engine/stateMachine'
import { checkAnswer, checkMCAnswer, checkOrderAnswer } from '../../engine/matcher'
import { computeNextMastery, masteryLabel, type MasteryState } from '../../engine/mastery'
import { completeLesson, recordAttempt, getProgress } from '../../data/progress'
import { recordActivity, xpForAnswer, XP_LESSON_BONUS } from '../../engine/session'
import { renderMath } from '../../lib/katex'
import { renderMarkdown, renderBlock } from '../components/MathRender'
import { haptic } from '../../lib/haptics'
import type { Lesson, Exercise, MasteryLevel, Derivation, CommonMistake, FurtherResource } from '../../types'
import '../components/MathKeyboard'
import '../components/HintsAccordion'

export async function renderLessonScreen(container: HTMLElement, lessonId: string): Promise<void> {
  container.innerHTML = `<div class="flex items-center justify-center min-h-screen">
    <div class="text-gray-400 text-sm animate-pulse">Lektion laden…</div>
  </div>`

  const course = await getCourse()
  const lesson = course.phases
    .flatMap(p => p.topics).flatMap(t => t.lessons)
    .find(l => l.id === lessonId)

  if (!lesson) {
    container.innerHTML = `<div class="screen items-center justify-center">
      <p class="text-red-400">Lektion nicht gefunden: ${lessonId}</p>
      <button class="btn-secondary mt-4" id="back-btn">Zurück</button>
    </div>`
    container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
    return
  }

  const existing = await getProgress(lessonId)
  const mastery: MasteryState = {
    level: existing?.masteryLevel ?? 'attempted',
    ccr: existing?.ccr ?? 0,
    totalCorrect: 0,
    totalAttempts: 0,
  }

  const fsm = new LessonStateMachine(lesson.blocks.practice.length)
  let xpEarned = 0
  let practiceIdx = 0

  const allTopics = course.phases.flatMap(p => p.topics)
  const parentTopic = allTopics.find(t => t.lessons.some(l => l.id === lessonId))
  const prereqTitles = (parentTopic?.prerequisites ?? [])
    .map(id => allTopics.find(t => t.id === id)?.title ?? id)
  const topicId = parentTopic?.id ?? ''

  function render() {
    switch (fsm.current) {
      case 'INTRO':
        renderIntro(container, lesson!, topicId, prereqTitles, existing?.masteryLevel ?? null, fsm, render)
        break
      case 'CONCEPT':
        renderBlocks(container, lesson!.blocks.show, 'Konzept', fsm, render,
          renderMistakesHtml(lesson!.commonMistakes))
        break
      case 'WORKED_EXAMPLE':
        renderBlocks(container, lesson!.blocks.explain, 'Beispiel', fsm, render,
          renderDerivationsHtml(lesson!.derivations))
        break
      case 'PRACTICE': renderPractice(container, lesson!, practiceIdx, fsm, render, onCorrect, onIncorrect); break
      case 'DEEPEN':
        renderBlocks(container, lesson!.blocks.deepen, 'ML-Bezug', fsm, render,
          renderResourcesHtml(lesson!.furtherResources))
        break
      case 'COMPLETE':       renderComplete(container, lesson!, xpEarned, mastery); break
    }
  }

  function onCorrect(ex: Exercise, hintCount: number) {
    haptic.success()
    const xp = xpForAnswer(true, hintCount)
    xpEarned += xp
    Object.assign(mastery, computeNextMastery(mastery, true, ex.difficulty))
    practiceIdx = Math.min(practiceIdx + 1, lesson!.blocks.practice.length - 1)
    recordAttempt({ exerciseId: ex.id, correct: true, timeMs: 0, ts: Date.now() })
    fsm.transition('CORRECT')
    render()
  }

  function onIncorrect(ex: Exercise) {
    haptic.error()
    Object.assign(mastery, computeNextMastery(mastery, false, ex.difficulty))
    recordAttempt({ exerciseId: ex.id, correct: false, timeMs: 0, ts: Date.now() })
    fsm.transition('INCORRECT')
    render()
  }

  render()

  // Persist and finish on COMPLETE
  const obs = new MutationObserver(async () => {
    if (fsm.current === 'COMPLETE') {
      obs.disconnect()
      await completeLesson(lessonId, mastery.level, mastery.ccr, lesson!)
      await recordActivity(xpEarned + XP_LESSON_BONUS)
    }
  })
  obs.observe(container, { childList: true, subtree: false })
}

function topicEmoji(topicId: string): string {
  if (topicId.includes('stochastik') || topicId.includes('statistik')) return '🎲'
  if (topicId.includes('calculus')) return '📈'
  if (topicId.includes('linalg')) return '📊'
  if (topicId.includes('funktion')) return '📐'
  return '📚'
}

function masteryDots(level: MasteryLevel): string {
  const filled = ({ attempted: 1, familiar: 2, proficient: 4, mastered: 5 } as Record<MasteryLevel, number>)[level] ?? 0
  const dots = Array(5).fill(0)
    .map((_, i) => `<span class="${i < filled ? 'text-brand-400' : 'text-gray-600'}">●</span>`)
    .join('')
  return `<span class="tracking-widest">${dots}</span> <span class="text-xs text-gray-400">${masteryLabel(level)}</span>`
}

function renderIntro(
  container: HTMLElement,
  lesson: Lesson,
  topicId: string,
  prereqTitles: string[],
  masteryLevel: MasteryLevel | null,
  fsm: LessonStateMachine,
  onNext: () => void,
) {
  const prereqHtml = prereqTitles.length > 0 ? `
    <section class="px-4 py-3 border-t border-surface-700">
      <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Voraussetzungen</h2>
      <ul class="space-y-1.5">
        ${prereqTitles.map(t => `<li class="text-sm text-gray-400">○ ${t}</li>`).join('')}
      </ul>
    </section>` : ''

  container.innerHTML = `
    <div class="screen block-transition">
      <div class="top-bar gap-3">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl no-tap-highlight">←</button>
      </div>

      <div class="flex-1">
        <div class="flex items-start gap-4 px-4 pt-2 pb-6">
          <div class="text-5xl leading-none mt-1 flex-shrink-0">${topicEmoji(topicId)}</div>
          <div class="flex-1 min-w-0">
            <h1 class="text-xl font-bold leading-tight mb-1">${lesson.title}</h1>
            <p class="text-gray-400 text-sm mb-2">
              ≈ ${lesson.estimatedMinutes} Min · ${lesson.blocks.practice.length} Aufgaben
            </p>
            ${masteryLevel ? `<div class="text-sm">${masteryDots(masteryLevel)}</div>` : ''}
          </div>
        </div>

        ${prereqHtml}

        <section class="px-4 py-3 border-t border-surface-700">
          <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Themen</h2>
          <div class="flex flex-wrap gap-2">
            ${lesson.conceptTags.map(t =>
              `<span class="px-2 py-1 bg-brand-900/40 border border-brand-500/30 text-brand-300 rounded-full text-xs">${t}</span>`
            ).join('')}
          </div>
        </section>
      </div>

      <div class="action-bar">
        <button id="start-btn" class="btn-primary w-full no-tap-highlight active:scale-95 transition-transform">
          Beginnen →
        </button>
      </div>
    </div>`

  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
  container.querySelector('#start-btn')?.addEventListener('click', () => {
    haptic.light()
    fsm.transition('NEXT')
    onNext()
  })
}

function renderDerivationsHtml(derivations: Derivation[] | undefined): string {
  if (!derivations?.length) return ''
  const items = derivations.map(d => `
    <div class="derivation-card math-block">
      <div class="derivation-card__claim">${renderMarkdown(d.claim)}</div>
      <div class="derivation-card__reasoning">${renderMarkdown(d.reasoning)}</div>
    </div>`).join('')
  return `<div class="mt-4"><h3 class="text-xs font-semibold uppercase tracking-wide text-brand-400 mb-2 px-1">Warum gilt das?</h3>${items}</div>`
}

function renderMistakesHtml(mistakes: CommonMistake[] | undefined): string {
  if (!mistakes?.length) return ''
  const items = mistakes.map(m => `
    <div class="mistake-card math-block">
      <div class="mistake-card__wrong">${renderMarkdown(m.wrong)}</div>
      <div class="mistake-card__correct">${renderMarkdown(m.correct)}</div>
      <div class="mistake-card__explanation text-sm text-gray-400 mt-1">${renderMarkdown(m.explanation)}</div>
    </div>`).join('')
  return `<div class="mt-4"><h3 class="text-xs font-semibold uppercase tracking-wide text-red-400 mb-2 px-1">Häufige Fehler</h3>${items}</div>`
}

function renderResourcesHtml(resources: FurtherResource[] | undefined): string {
  if (!resources?.length) return ''
  const typeIcon: Record<string, string> = { video: '▶', article: '📄', exercise: '✏️', book: '📖' }
  const items = resources.map(r =>
    `<li class="text-sm text-gray-400">${typeIcon[r.type] ?? '→'} ${r.title}${r.note ? ` <span class="text-gray-500 italic">(${r.note})</span>` : ''}</li>`
  ).join('')
  return `<div class="mt-4 px-1"><h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Weiter vertiefen</h3><ul class="space-y-1.5">${items}</ul></div>`
}

function renderBlocks(
  container: HTMLElement,
  blocks: { kind: string; content: string; caption?: string }[],
  phase: string,
  fsm: LessonStateMachine,
  onNext: () => void,
  extraHtml = '',
) {
  const blocksHtml = blocks.map(b => renderBlock(b.kind, b.content, b.caption)).join('')

  container.innerHTML = `
    <div class="screen block-transition">
      <div class="top-bar gap-3">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl no-tap-highlight">←</button>
        <span class="text-sm text-gray-400 font-medium">${phase}</span>
        <div class="flex-1 progress-track ml-2">
          <div class="progress-fill" style="width:${phase === 'ML-Bezug' ? '90' : phase === 'Beispiel' ? '55' : '25'}%"></div>
        </div>
      </div>
      <div class="flex-1 py-4 px-1">${blocksHtml}${extraHtml}</div>
      <div class="action-bar">
        <button id="next-btn" class="btn-primary w-full no-tap-highlight active:scale-95 transition-transform">
          Weiter →
        </button>
      </div>
    </div>`

  container.querySelectorAll<HTMLElement>('.math-block').forEach(el => renderMath(el))
  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
  container.querySelector('#next-btn')?.addEventListener('click', () => {
    haptic.light()
    fsm.transition('NEXT')
    onNext()
  })
}

function renderPractice(
  container: HTMLElement,
  lesson: Lesson,
  idx: number,
  fsm: LessonStateMachine,
  onReRender: () => void,
  onCorrect: (ex: Exercise, hintCount: number) => void,
  onIncorrect: (ex: Exercise) => void,
) {
  const ex = lesson.blocks.practice[idx]
  if (!ex) { fsm.transition('NEXT'); onReRender(); return }

  const hintLevel = fsm.context.hintLevel
  const pct = Math.round(((idx + 1) / lesson.blocks.practice.length) * 100)

  container.innerHTML = `
    <div class="screen block-transition">
      <div class="top-bar gap-3">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl no-tap-highlight">←</button>
        <span class="text-sm text-gray-400">Aufgabe ${idx + 1}/${lesson.blocks.practice.length}</span>
        <div class="flex-1 progress-track ml-2">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
      </div>

      <div class="flex-1 py-4">
        <div class="card mb-4">
          <div class="text-xs text-gray-400 mb-2">
            ${'★'.repeat(ex.difficulty)}${'☆'.repeat(5 - ex.difficulty)}
            <span class="ml-2 text-brand-400 text-xs">${ex.type.toUpperCase()}</span>
          </div>
          <div id="prompt" class="math-block">${renderMarkdown(ex.prompt)}</div>
        </div>

        <div id="input-area" class="mb-4">${renderInputArea(ex)}</div>
        <div id="feedback-area"></div>
        <hints-accordion id="hints"></hints-accordion>
      </div>

      <div class="action-bar">
        <div class="flex gap-2">
          <button id="hint-btn" class="btn-secondary flex-1 text-yellow-400 text-sm no-tap-highlight
            ${hintLevel >= 3 ? 'opacity-40 cursor-not-allowed' : ''}">
            💡 ${hintLevel >= 3 ? 'Alle Hinweise genutzt' : `Hinweis (${3 - hintLevel} übrig)`}
          </button>
          <button id="submit-btn" class="btn-primary flex-grow no-tap-highlight active:scale-95 transition-transform">
            Antworten
          </button>
        </div>
      </div>
    </div>`

  container.querySelectorAll<HTMLElement>('.math-block, #prompt').forEach(el => renderMath(el))

  const hintsEl = container.querySelector('#hints') as (HTMLElement & {
    setHints?: (h: [string, string, string], cb: (l: number) => void) => void
  }) | null
  hintsEl?.setHints?.(ex.hints, () => {
    fsm.transition('HINT')
    onReRender()
  })

  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))

  const hintBtn = container.querySelector<HTMLButtonElement>('#hint-btn')
  hintBtn?.addEventListener('click', () => {
    if (fsm.context.hintLevel >= 3) return
    hintsEl?.setHints?.(ex.hints, () => { fsm.transition('HINT'); onReRender() })
    haptic.light()
    fsm.transition('HINT')
    onReRender()
  })

  container.querySelectorAll<HTMLElement>('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      haptic.light()
      container.querySelectorAll<HTMLElement>('.mc-option').forEach(b => {
        b.classList.remove('ring-2', 'ring-brand-500')
        delete b.dataset['selected']
      })
      btn.classList.add('ring-2', 'ring-brand-500')
      btn.dataset['selected'] = 'true'
    })
  })

  const submitBtn = container.querySelector<HTMLButtonElement>('#submit-btn')
  if (!submitBtn) return

  submitBtn.addEventListener('click', handleSubmit)

  function handleSubmit() {
    const btn = container.querySelector<HTMLButtonElement>('#submit-btn')
    if (!btn) return
    const userAnswer = collectAnswer(container, ex)
    if (userAnswer === null) { haptic.warning(); return }

    const correct = ex.type === 'mc'
      ? checkMCAnswer(String(userAnswer), String(ex.answer))
      : ex.type === 'order'
        ? checkOrderAnswer(userAnswer as string[], ex.answer as string[])
        : checkAnswer(String(userAnswer), ex.answer, ex.acceptedAlternatives)

    showFeedback(container, correct, ex, userAnswer)
    btn.removeEventListener('click', handleSubmit)

    if (correct) {
      btn.textContent = 'Weiter →'
      btn.onclick = () => onCorrect(ex, fsm.context.hintLevel)
    } else {
      btn.textContent = 'Erneut versuchen'
      btn.onclick = () => onIncorrect(ex)
    }
  }

  if (ex.type === 'symbolic') {
    const kb = container.querySelector('#keyboard') as (HTMLElement & {
      setTarget?: (i: HTMLInputElement) => void
    }) | null
    const input = container.querySelector<HTMLInputElement>('#symbolic-input')
    if (kb && input) kb.setTarget?.(input)
  }
}

function renderInputArea(ex: Exercise): string {
  switch (ex.type) {
    case 'mc':
      return `<div class="space-y-2">
        ${(ex.options ?? []).map((opt, i) => `
          <button class="mc-option w-full text-left card hover:bg-surface-700 transition-colors py-3 px-4 no-tap-highlight" data-idx="${i}">
            <span class="math-block">${renderMarkdown(opt)}</span>
          </button>`).join('')}
      </div>`

    case 'numeric':
    case 'fillblank':
      return `<input id="numeric-input" type="text" inputmode="decimal"
        class="w-full bg-surface-700 rounded-xl px-4 py-3 text-lg text-center focus:outline-none focus:ring-2 focus:ring-brand-500"
        placeholder="Antwort eingeben…" autocomplete="off" autocorrect="off" spellcheck="false">`

    case 'symbolic':
      return `<div>
        <input id="symbolic-input" type="text"
          class="w-full bg-surface-700 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-500 mb-2"
          placeholder="z.B. 2x+1" autocomplete="off" autocorrect="off" spellcheck="false">
        <math-keyboard id="keyboard"></math-keyboard>
      </div>`

    case 'tf':
      return `<div class="flex gap-3">
        <button class="mc-option flex-1 btn-secondary text-lg" data-idx="0" data-value="true">✓ Wahr</button>
        <button class="mc-option flex-1 btn-secondary text-lg" data-idx="1" data-value="false">✗ Falsch</button>
      </div>`

    case 'order':
      return `<div id="order-list" class="space-y-2">
        ${(ex.options ?? []).map((opt, i) => `
          <div class="card flex items-center gap-3" draggable="true" data-idx="${i}">
            <span class="text-gray-400 text-lg">⠿</span>
            <span class="math-block flex-1">${renderMarkdown(opt)}</span>
          </div>`).join('')}
      </div>`

    default:
      return `<input type="text" id="generic-input"
        class="w-full bg-surface-700 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
        placeholder="Antwort…">`
  }
}

function collectAnswer(container: HTMLElement, ex: Exercise): string | string[] | null {
  switch (ex.type) {
    case 'mc': {
      const sel = container.querySelector<HTMLElement>('.mc-option[data-selected="true"]')
      if (!sel) return null
      return ex.options?.[parseInt(sel.dataset['idx'] ?? '0', 10)] ?? null
    }
    case 'tf': {
      const sel = container.querySelector<HTMLElement>('.mc-option[data-selected="true"]')
      return sel ? (sel.dataset['value'] ?? null) : null
    }
    case 'numeric':
    case 'fillblank':
      return container.querySelector<HTMLInputElement>('#numeric-input')?.value ?? null
    case 'symbolic':
      return container.querySelector<HTMLInputElement>('#symbolic-input')?.value ?? null
    case 'order': {
      const items = container.querySelectorAll<HTMLElement>('#order-list [data-idx]')
      return Array.from(items).map(el => ex.options?.[parseInt(el.dataset['idx'] ?? '0', 10)] ?? '')
    }
    default:
      return container.querySelector<HTMLInputElement>('#generic-input')?.value ?? null
  }
}

function showFeedback(
  container: HTMLElement,
  correct: boolean,
  ex: Exercise,
  userAnswer: string | string[] | null,
) {
  const fb = container.querySelector('#feedback-area')
  if (!fb) return

  const misconception = typeof userAnswer === 'string' && ex.misconceptions?.[userAnswer]
    ? `<p class="text-orange-300 text-sm mt-2">${renderMarkdown(ex.misconceptions[userAnswer])}</p>`
    : ''

  fb.innerHTML = correct
    ? `<div class="card border border-green-500/40 bg-green-900/20 mb-3 feedback-animate">
        <p class="text-green-400 font-semibold">✓ Richtig!</p>
        <details class="mt-2">
          <summary class="text-sm text-gray-400 cursor-pointer">Lösungsweg anzeigen</summary>
          <div class="mt-2 text-sm math-block">${renderMarkdown(ex.explanation)}</div>
        </details>
      </div>`
    : `<div class="card border border-red-500/40 bg-red-900/20 mb-3 feedback-animate">
        <p class="text-red-400 font-semibold">✗ Nicht ganz.</p>
        ${misconception}
        <details class="mt-2">
          <summary class="text-sm text-gray-400 cursor-pointer">Warum? Lösungsweg anzeigen</summary>
          <div class="mt-2 text-sm math-block">${renderMarkdown(ex.explanation)}</div>
        </details>
      </div>`

  fb.querySelectorAll<HTMLElement>('.math-block').forEach(el => renderMath(el))
}

function renderComplete(container: HTMLElement, lesson: Lesson, xpEarned: number, mastery: MasteryState) {
  container.innerHTML = `
    <div class="screen items-center justify-center text-center py-12 block-transition">
      <div class="text-6xl mb-4">🎉</div>
      <h1 class="text-2xl font-bold mb-2">Lektion abgeschlossen!</h1>
      <p class="text-gray-400 mb-6">${lesson.title}</p>
      <div class="card w-full max-w-xs mx-auto mb-6 space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-400">XP verdient</span>
          <span class="text-brand-400 font-bold text-lg">+${xpEarned + XP_LESSON_BONUS}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-400">Niveau</span>
          <span class="font-semibold">${masteryLabel(mastery.level)}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-400">Streak</span>
          <span class="text-orange-400">+1 Review-Karte${lesson.reviewCards.length !== 1 ? 'n' : ''}</span>
        </div>
      </div>
      <button id="home-btn" class="btn-primary w-full max-w-xs mx-auto no-tap-highlight">Zur Übersicht</button>
    </div>`

  container.querySelector('#home-btn')?.addEventListener('click', () => navigate('/'))
}
