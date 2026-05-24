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

// Phase-O pedagogical extension types (all optional, backwards-compatible)
export interface Derivation {
  claim: string       // Markdown+Math: die zu zeigende Aussage
  reasoning: string   // Schritt-für-Schritt-Begründung, Markdown
}

export interface CommonMistake {
  wrong: string       // Was Lerner oft falsch machen, Markdown
  correct: string     // Was richtig ist, Markdown
  explanation: string // Warum, kurz, Markdown
}

export interface FurtherResource {
  title: string       // z.B. "3Blue1Brown: Essence of Linear Algebra Ep. 14"
  type: 'video' | 'article' | 'exercise' | 'book'
  note?: string       // Optionale Anmerkung, z.B. "Sehr visuell"
}

// Phase-O V2: Multi-step concept flow and code bridges
export interface ConceptStep {
  title: string       // Kurzüberschrift, z.B. "Was ist eine Potenz?"
  body: string        // Hauptinhalt, Markdown+Math
  visual?: string     // Inline SVG (optional)
  preprompt?: string  // Denkfrage VOR dem Inhalt, Markdown
  miniExample?: string // Kurzes Rechenbeispiel, Markdown
  selfCheck?: string  // Verständnisfrage am Ende, Markdown
}

export interface CodeBridge {
  title: string                       // z.B. "PyTorch: L2-Norm berechnen"
  lang: 'python' | 'typescript'
  code: string                        // Code-Snippet
  annotation: string                  // Erklärung des Codes, Markdown
}

export interface CrossLink {
  lessonId: string                            // z.B. "p0.potenzen-wurzeln"
  relation: 'requires' | 'extends' | 'see-also'
  hint: string                                // Kurzer Text, Markdown
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
  // Phase-O V1: optionale Vertiefungsfelder
  description?: string
  derivations?: Derivation[]
  commonMistakes?: CommonMistake[]
  furtherResources?: FurtherResource[]
  // Phase-O V2: Multi-step flow, code bridges, cross-links
  learningOutcome?: string      // "Nach dieser Lektion kannst du…"
  conceptSteps?: ConceptStep[]  // Ersetzt blocks.show wenn vorhanden (5-7 Schritte)
  codeBridges?: CodeBridge[]    // Ersetzt blocks.explain wenn vorhanden
  crossLinks?: CrossLink[]      // Auf COMPLETE-Screen angezeigt
  reflection?: string           // Abschlussfrage, Markdown
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
