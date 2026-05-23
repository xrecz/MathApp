import { navigate } from '../../lib/store'
import { getCourse } from '../../content/index'
import { LessonStateMachine } from '../../engine/stateMachine'
import { checkAnswer, checkMCAnswer, checkOrderAnswer } from '../../engine/matcher'
import { computeNextMastery, xpForCorrect, type MasteryState } from '../../engine/mastery'
import { upsertProgress, recordAttempt, getProgress, upsertReviewState } from '../../data/progress'
import { scheduleReview, cardToRow, Rating } from '../../engine/srs'
import { finishLesson } from '../../engine/session'
import { renderMath } from '../../lib/katex'
import { renderMarkdown, renderBlock } from '../components/MathRender'
import { hapticSuccess, hapticError } from '../../lib/haptics'
import type { Lesson, Exercise } from '../../types'
import '../components/MathKeyboard'
import '../components/HintsAccordion'

export async function renderLessonScreen(container: HTMLElement, lessonId: string): Promise<void> {
  const course = await getCourse()
  const lesson = course.phases
    .flatMap(p => p.topics)
    .flatMap(t => t.lessons)
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
  let hintUsed = false

  function render() {
    switch (fsm.current) {
      case 'INTRO':           renderIntro(container, lesson!, fsm, render); break
      case 'CONCEPT':         renderBlocks(container, lesson!.blocks.show, 'Konzept', fsm, render); break
      case 'WORKED_EXAMPLE':  renderBlocks(container, lesson!.blocks.explain, 'Beispiel', fsm, render); break
      case 'PRACTICE':        renderPractice(container, lesson!, practiceIdx, fsm, render, onCorrect, onIncorrect, onHint); break
      case 'DEEPEN':          renderBlocks(container, lesson!.blocks.deepen, 'ML-Bezug', fsm, render); break
      case 'COMPLETE':        renderComplete(container, lesson!, xpEarned, mastery); break
    }
  }

  function onCorrect(ex: Exercise) {
    hapticSuccess()
    xpEarned += xpForCorrect(ex.difficulty, hintUsed)
    hintUsed = false
    Object.assign(mastery, computeNextMastery(mastery, true, ex.difficulty))
    practiceIdx = Math.min(practiceIdx + 1, lesson!.blocks.practice.length - 1)
    recordAttempt({ exerciseId: ex.id, correct: true, timeMs: 0, ts: Date.now() })
    fsm.transition('CORRECT')
    render()
  }

  function onIncorrect(ex: Exercise) {
    hapticError()
    hintUsed = false
    Object.assign(mastery, computeNextMastery(mastery, false, ex.difficulty))
    recordAttempt({ exerciseId: ex.id, correct: false, timeMs: 0, ts: Date.now() })
    fsm.transition('INCORRECT')
    render()
  }

  function onHint() {
    hintUsed = true
    fsm.transition('HINT')
  }

  render()

  // Persist and schedule review cards on complete
  const obs = new MutationObserver(async () => {
    if (fsm.current === 'COMPLETE') {
      obs.disconnect()
      await upsertProgress({
        lessonId,
        status: 'completed',
        masteryLevel: mastery.level,
        ccr: mastery.ccr,
        updatedAt: Date.now(),
      })
      await finishLesson(xpEarned)
      for (const card of lesson!.reviewCards) {
        const result = scheduleReview(undefined, Rating.Good)
        await upsertReviewState(cardToRow(card.id, result.next))
      }
    }
  })
  obs.observe(container, { childList: true, subtree: false })
}

function renderIntro(container: HTMLElement, lesson: Lesson, fsm: LessonStateMachine, onNext: () => void): void {
  container.innerHTML = `
    <div class="screen pb-24">
      <div class="top-bar gap-3">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl leading-none">←</button>
        <div class="flex-1 progress-track">
          <div class="lesson-progress-fill progress-fill" style="width:0%"></div>
        </div>
      </div>
      <div class="flex-1 flex flex-col items-center justify-center py-8 text-center px-2">
        <div class="text-4xl mb-4">📐</div>
        <h1 class="text-2xl font-bold mb-3">${lesson.title}</h1>
        <p class="text-gray-400 mb-4">≈ ${lesson.estimatedMinutes} Min. · ${lesson.blocks.practice.length} Aufgaben</p>
        <div class="flex flex-wrap gap-2 justify-center mb-6">
          ${lesson.conceptTags.map(t =>
            `<span class="px-2 py-1 bg-brand-900/40 border border-brand-500/30 text-brand-300 rounded-full text-xs">${t}</span>`
          ).join('')}
        </div>
      </div>
      <div class="fixed bottom-6 right-4 left-4 max-w-lg mx-auto flex gap-3">
        <button id="skip-btn" class="btn-secondary flex-1">Überspringen</button>
        <button id="start-btn" class="btn-primary flex-grow">Starten →</button>
      </div>
    </div>`

  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
  container.querySelector('#skip-btn')?.addEventListener('click', () => { fsm.transition('SKIP'); onNext() })
  container.querySelector('#start-btn')?.addEventListener('click', () => { fsm.transition('NEXT'); onNext() })
}

function renderBlocks(
  container: HTMLElement,
  blocks: { kind: string; content: string; caption?: string }[],
  phase: string,
  fsm: LessonStateMachine,
  onNext: () => void,
): void {
  const blocksHtml = blocks.map(b => renderBlock(b.kind, b.content, b.caption)).join('')

  container.innerHTML = `
    <div class="screen pb-24">
      <div class="top-bar gap-3">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl">←</button>
        <span class="text-sm text-gray-400">${phase}</span>
        <div class="flex-1 progress-track ml-2">
          <div class="lesson-progress-fill progress-fill" style="width:30%"></div>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto py-4">
        ${blocksHtml}
      </div>
      <div class="fixed bottom-6 right-4 left-4 max-w-lg mx-auto">
        <button id="next-btn" class="btn-primary w-full">Weiter →</button>
      </div>
    </div>`

  container.querySelectorAll<HTMLElement>('.math-block').forEach(el => renderMath(el))
  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
  container.querySelector('#next-btn')?.addEventListener('click', () => { fsm.transition('NEXT'); onNext() })
}

function renderPractice(
  container: HTMLElement,
  lesson: Lesson,
  idx: number,
  fsm: LessonStateMachine,
  onReRender: () => void,
  onCorrect: (ex: Exercise) => void,
  onIncorrect: (ex: Exercise) => void,
  onHint: () => void,
): void {
  const ex = lesson.blocks.practice[idx]
  if (!ex) { fsm.transition('NEXT'); onReRender(); return }

  const hintLevel = fsm.context.hintLevel

  container.innerHTML = `
    <div class="screen pb-4">
      <div class="top-bar gap-3">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl">←</button>
        <span class="text-sm text-gray-400">Aufgabe ${idx + 1}/${lesson.blocks.practice.length}</span>
        <div class="flex-1 progress-track ml-2">
          <div class="lesson-progress-fill progress-fill" style="width:60%"></div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto py-4">
        <div class="card mb-4">
          <div class="text-xs text-gray-400 mb-2">
            Schwierigkeit: ${'★'.repeat(ex.difficulty)}${'☆'.repeat(5 - ex.difficulty)}
          </div>
          <div id="prompt" class="math-block">${renderMarkdown(ex.prompt)}</div>
        </div>

        <div id="input-area" class="mb-4">
          ${renderInputArea(ex)}
        </div>

        <div id="feedback-area"></div>
        <hints-accordion id="hints"></hints-accordion>
      </div>

      <div class="sticky bottom-0 bg-surface-900 pt-2 pb-4 space-y-2">
        <div class="flex gap-2">
          <button id="hint-btn" class="btn-secondary flex-1 text-yellow-400 text-sm">
            💡 Hinweis (${3 - hintLevel} übrig)
          </button>
          <button id="submit-btn" class="btn-primary flex-grow">Antworten</button>
        </div>
      </div>
    </div>`

  container.querySelectorAll<HTMLElement>('.math-block, #prompt').forEach(el => renderMath(el))

  // Init hints accordion
  const hintsEl = container.querySelector('#hints') as (HTMLElement & {
    setHints?: (h: [string, string, string], cb: (l: number) => void) => void
  }) | null
  hintsEl?.setHints?.(ex.hints, (level) => {
    if (level > hintLevel) onHint()
  })

  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
  container.querySelector('#hint-btn')?.addEventListener('click', () => {
    hintsEl?.setHints?.(ex.hints, (level) => { if (level > hintLevel) onHint() })
    onHint()
    onReRender()
  })

  container.querySelectorAll<HTMLElement>('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
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
    if (userAnswer === null) return

    const correct = ex.type === 'mc'
      ? checkMCAnswer(String(userAnswer), String(ex.answer))
      : ex.type === 'order'
        ? checkOrderAnswer(userAnswer as string[], ex.answer as string[])
        : checkAnswer(String(userAnswer), ex.answer, ex.acceptedAlternatives)

    showFeedback(container, correct, ex, userAnswer)

    btn.removeEventListener('click', handleSubmit)
    if (correct) {
      btn.textContent = 'Weiter →'
      btn.onclick = () => onCorrect(ex)
    } else {
      btn.textContent = 'Erneut versuchen'
      btn.onclick = () => onIncorrect(ex)
    }
  }

  // Math keyboard for symbolic
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
      return `<div class="space-y-2" id="mc-options">
        ${(ex.options ?? []).map((opt, i) => `
          <button class="mc-option w-full text-left card hover:bg-surface-700 transition-colors py-3 px-4" data-idx="${i}">
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
        <button class="mc-option flex-1 btn-secondary" data-idx="0" data-value="true">Wahr</button>
        <button class="mc-option flex-1 btn-secondary" data-idx="1" data-value="false">Falsch</button>
      </div>`

    case 'order':
      return `<div id="order-list" class="space-y-2">
        ${(ex.options ?? []).map((opt, i) => `
          <div class="card flex items-center gap-3" draggable="true" data-idx="${i}">
            <span class="text-gray-400">⠿</span>
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
    case 'mc':
    case 'tf': {
      const sel = container.querySelector<HTMLElement>('.mc-option[data-selected="true"]')
      if (!sel) return null
      if (ex.type === 'tf') return sel.dataset['value'] ?? null
      const idx = parseInt(sel.dataset['idx'] ?? '0', 10)
      return ex.options?.[idx] ?? null
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

function showFeedback(container: HTMLElement, correct: boolean, ex: Exercise, userAnswer: string | string[] | null): void {
  const fb = container.querySelector('#feedback-area')
  if (!fb) return

  const misconception = typeof userAnswer === 'string' && ex.misconceptions?.[userAnswer]
    ? `<p class="text-orange-300 text-sm mt-1">${renderMarkdown(ex.misconceptions[userAnswer])}</p>`
    : ''

  if (correct) {
    fb.innerHTML = `
      <div class="card border border-green-500/40 bg-green-900/20 mb-3">
        <p class="text-green-400 font-semibold">✓ Richtig!</p>
        <details class="mt-2">
          <summary class="text-sm text-gray-400 cursor-pointer">Lösungsweg anzeigen</summary>
          <div class="mt-2 text-sm math-block">${renderMarkdown(ex.explanation)}</div>
        </details>
      </div>`
  } else {
    fb.innerHTML = `
      <div class="card border border-red-500/40 bg-red-900/20 mb-3">
        <p class="text-red-400 font-semibold">✗ Nicht ganz.</p>
        ${misconception}
        <details class="mt-2">
          <summary class="text-sm text-gray-400 cursor-pointer">Warum? Lösungsweg anzeigen</summary>
          <div class="mt-2 text-sm math-block">${renderMarkdown(ex.explanation)}</div>
        </details>
      </div>`
  }

  fb.querySelectorAll<HTMLElement>('.math-block').forEach(el => renderMath(el))
}

function renderComplete(container: HTMLElement, lesson: Lesson, xpEarned: number, mastery: MasteryState): void {
  container.innerHTML = `
    <div class="screen items-center justify-center text-center py-12">
      <div class="text-6xl mb-4">🎉</div>
      <h1 class="text-2xl font-bold mb-2">Lektion abgeschlossen!</h1>
      <p class="text-gray-400 mb-6">${lesson.title}</p>
      <div class="card w-full max-w-xs mx-auto mb-6 space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-400">XP verdient</span>
          <span class="text-brand-400 font-bold">+${xpEarned}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-400">Niveau</span>
          <span class="font-semibold">${masteryLabel(mastery.level)}</span>
        </div>
      </div>
      <button id="home-btn" class="btn-primary w-full max-w-xs mx-auto">Zur Übersicht</button>
    </div>`

  container.querySelector('#home-btn')?.addEventListener('click', () => navigate('/'))
}

function masteryLabel(level: string): string {
  const map: Record<string, string> = {
    attempted: 'Versucht', familiar: 'Bekannt',
    proficient: 'Geübt', mastered: 'Gemeistert',
  }
  return map[level] ?? level
}
