import { db } from './db'
import type { ProgressRow, MasteryLevel, AttemptRow, ReviewStateRow } from '../types'

export async function getProgress(lessonId: string): Promise<ProgressRow | undefined> {
  return db.progress.get(lessonId)
}

export async function upsertProgress(row: ProgressRow): Promise<void> {
  await db.progress.put({ ...row, updatedAt: Date.now() })
}

export async function getAllProgress(): Promise<ProgressRow[]> {
  return db.progress.toArray()
}

export async function recordAttempt(attempt: Omit<AttemptRow, 'id'>): Promise<void> {
  await db.attempts.add({ ...attempt, ts: Date.now() })
}

export async function getAttemptsForExercise(exerciseId: string): Promise<AttemptRow[]> {
  return db.attempts.where('exerciseId').equals(exerciseId).toArray()
}

export async function getReviewState(cardId: string): Promise<ReviewStateRow | undefined> {
  return db.reviewState.get(cardId)
}

export async function upsertReviewState(row: ReviewStateRow): Promise<void> {
  await db.reviewState.put(row)
}

export async function getAllReviewStates(): Promise<ReviewStateRow[]> {
  return db.reviewState.toArray()
}

export async function getDueReviewStates(now = Date.now()): Promise<ReviewStateRow[]> {
  return db.reviewState.where('due').belowOrEqual(now).toArray()
}

export async function updateMastery(lessonId: string, level: MasteryLevel, ccr: number): Promise<void> {
  const existing = await getProgress(lessonId)
  await upsertProgress({
    lessonId,
    status: level === 'mastered' || level === 'proficient' ? 'completed' : 'in_progress',
    masteryLevel: level,
    ccr,
    updatedAt: Date.now(),
  })
  // Preserve status if it was already completed
  if (existing?.status === 'completed' && level !== 'mastered' && level !== 'proficient') {
    await upsertProgress({ ...existing, masteryLevel: level, ccr, updatedAt: Date.now() })
  }
}
