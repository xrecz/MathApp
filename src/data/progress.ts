import { db } from './db'
import { createEmptyCard } from 'ts-fsrs'
import type { ProgressRow, MasteryLevel, AttemptRow, ReviewStateRow, Lesson } from '../types'

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

/** Enroll a lesson's review cards immediately (due = now). */
export async function enrollReviewCards(lesson: Lesson): Promise<void> {
  const now = new Date()
  for (const card of lesson.reviewCards) {
    const exists = await db.reviewState.get(card.id)
    if (!exists) {
      const empty = createEmptyCard(now)
      const row: ReviewStateRow = {
        cardId:       card.id,
        due:          empty.due.getTime(),
        stability:    empty.stability,
        difficulty:   empty.difficulty,
        elapsedDays:  empty.elapsed_days,
        scheduledDays: empty.scheduled_days,
        reps:         empty.reps,
        lapses:       empty.lapses,
        state:        empty.state as number,
        lastReview:   now.getTime(),
      }
      await db.reviewState.put(row)
    }
  }
}

/** Mark lesson as completed + enroll its review cards. */
export async function completeLesson(
  lessonId: string,
  masteryLevel: MasteryLevel,
  ccr: number,
  lesson: Lesson,
): Promise<void> {
  await upsertProgress({
    lessonId,
    status: 'completed',
    masteryLevel,
    ccr,
    updatedAt: Date.now(),
  })
  await enrollReviewCards(lesson)
}

export async function updateMastery(lessonId: string, level: MasteryLevel, ccr: number): Promise<void> {
  const existing = await getProgress(lessonId)
  await upsertProgress({
    lessonId,
    status: existing?.status ?? 'in_progress',
    masteryLevel: level,
    ccr,
    updatedAt: Date.now(),
  })
}
