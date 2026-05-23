export type Phase = 0 | 1 | 2 | 3 | 4
export type Difficulty = 1 | 2 | 3 | 4 | 5
export type MasteryLevel = 'attempted' | 'familiar' | 'proficient' | 'mastered'
export type ExerciseType = 'mc' | 'numeric' | 'tf' | 'fillblank' | 'order' | 'symbolic'

export interface Block {
  kind: 'text' | 'math' | 'callout' | 'svg' | 'worked-example' | 'plot'
  content: string
  caption?: string
}

export interface Exercise {
  id: string
  difficulty: Difficulty
  conceptTags: string[]
  type: ExerciseType
  prompt: string
  options?: string[]
  answer: string | number | string[]
  acceptedAlternatives?: string[]
  hints: [string, string, string]
  explanation: string
  misconceptions?: Record<string, string>
}

export interface ReviewCard {
  id: string
  front: string
  back: string
  conceptTags: string[]
}

export interface Lesson {
  id: string
  title: string
  conceptTags: string[]
  estimatedMinutes: number
  blocks: {
    show: Block[]
    explain: Block[]
    practice: Exercise[]
    deepen: Block[]
  }
  reviewCards: ReviewCard[]
}

export interface Topic {
  id: string
  title: string
  prerequisites: string[]
  lessons: Lesson[]
}

export interface PhaseUnit {
  phase: Phase
  title: string
  topics: Topic[]
}

export interface Course {
  id: string
  title: string
  phases: PhaseUnit[]
}

// IndexedDB persistence rows
export interface ProgressRow {
  lessonId: string
  status: 'not_started' | 'in_progress' | 'completed'
  masteryLevel: MasteryLevel
  ccr: number
  updatedAt: number
}

export interface ReviewStateRow {
  cardId: string
  due: number
  stability: number
  difficulty: number
  elapsedDays: number
  scheduledDays: number
  reps: number
  lapses: number
  state: number
  lastReview: number
}

export interface AttemptRow {
  id?: number
  exerciseId: string
  correct: boolean
  timeMs: number
  ts: number
}

export interface SettingsRow {
  key: string
  value: string | number | boolean
}

export interface SessionRow {
  id?: number
  date: string
  xp: number
  lessonsCompleted: number
}
