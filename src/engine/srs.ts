import { createEmptyCard, fsrs, Rating, State, type Card, type Grade } from 'ts-fsrs'
import type { ReviewStateRow } from '../types'

const scheduler = fsrs({ request_retention: 0.9, maximum_interval: 36500 })

export { Rating }

export function scheduleReview(state: ReviewStateRow | undefined, grade: Rating, now = new Date()) {
  const card: Card = state ? rowToCard(state) : createEmptyCard(now)
  // Rating.Manual (0) is excluded from Grade; values 1-4 are valid Grades
  const result = scheduler.next(card, now, grade as Grade)
  return { next: result.card, log: result.log }
}

export function dueCards(rows: ReviewStateRow[], now = Date.now()): ReviewStateRow[] {
  return rows.filter(r => r.due <= now).sort((a, b) => a.due - b.due)
}

export function rowToCard(row: ReviewStateRow): Card {
  return {
    due: new Date(row.due),
    stability: row.stability,
    difficulty: row.difficulty,
    elapsed_days: row.elapsedDays,
    scheduled_days: row.scheduledDays,
    learning_steps: 0,
    reps: row.reps,
    lapses: row.lapses,
    state: row.state as State,
    last_review: new Date(row.lastReview),
  }
}

export function cardToRow(cardId: string, card: Card): ReviewStateRow {
  return {
    cardId,
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state as number,
    lastReview: card.last_review ? card.last_review.getTime() : Date.now(),
  }
}
