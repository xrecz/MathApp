export type LessonState =
  | 'INTRO'
  | 'CONCEPT'
  | 'WORKED_EXAMPLE'
  | 'PRACTICE'
  | 'DEEPEN'
  | 'COMPLETE'

export type LessonEvent =
  | 'NEXT'
  | 'CORRECT'
  | 'INCORRECT'
  | 'HINT'
  | 'SKIP'

export interface StateMachineContext {
  ccr: number          // consecutive correct
  hintLevel: number    // 0–3
  practiceIndex: number
  totalPractice: number
}

const TRANSITIONS: Record<LessonState, Partial<Record<LessonEvent, LessonState>>> = {
  INTRO:          { NEXT: 'CONCEPT',        SKIP: 'COMPLETE' },
  CONCEPT:        { NEXT: 'WORKED_EXAMPLE', SKIP: 'COMPLETE' },
  WORKED_EXAMPLE: { NEXT: 'PRACTICE',       SKIP: 'COMPLETE' },
  PRACTICE:       { CORRECT: 'PRACTICE', INCORRECT: 'PRACTICE', HINT: 'PRACTICE', NEXT: 'DEEPEN', SKIP: 'COMPLETE' },
  DEEPEN:         { NEXT: 'COMPLETE',        SKIP: 'COMPLETE' },
  COMPLETE:       {},
}

export class LessonStateMachine extends EventTarget {
  current: LessonState = 'INTRO'
  context: StateMachineContext

  constructor(totalPractice: number) {
    super()
    this.context = { ccr: 0, hintLevel: 0, practiceIndex: 0, totalPractice }
  }

  transition(event: LessonEvent): LessonState {
    const next = this.resolve(event)
    if (!next) return this.current

    const prev = this.current
    this.current = next
    this.updateContext(event)

    this.dispatchEvent(new CustomEvent('state-changed', {
      detail: { prev, next, event, context: { ...this.context } },
    }))

    return this.current
  }

  private resolve(event: LessonEvent): LessonState | undefined {
    if (event === 'SKIP') return 'COMPLETE'

    if (this.current === 'PRACTICE') {
      if (event === 'CORRECT') {
        const newCcr = this.context.ccr + 1
        const done = this.context.practiceIndex + 1 >= this.context.totalPractice
        if (done || newCcr >= 3) return 'DEEPEN'
        return 'PRACTICE'
      }
      if (event === 'INCORRECT' || event === 'HINT') return 'PRACTICE'
      if (event === 'NEXT') return 'DEEPEN'
    }

    return TRANSITIONS[this.current][event]
  }

  private updateContext(event: LessonEvent): void {
    if (event === 'CORRECT') {
      this.context.ccr += 1
      this.context.hintLevel = 0
      if (this.current === 'PRACTICE') this.context.practiceIndex++
    } else if (event === 'INCORRECT') {
      this.context.ccr = 0
      this.context.hintLevel = 0
      if (this.current === 'PRACTICE') this.context.practiceIndex++
    } else if (event === 'HINT') {
      this.context.hintLevel = Math.min(3, this.context.hintLevel + 1)
    }
  }
}
