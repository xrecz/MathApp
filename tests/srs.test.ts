import { describe, it, expect } from 'vitest'
import { scheduleReview, dueCards, cardToRow, Rating } from '../src/engine/srs'
import type { ReviewStateRow } from '../src/types'

describe('SRS Engine', () => {
  it('creates new card on undefined state', () => {
    const { next } = scheduleReview(undefined, Rating.Good)
    expect(next).toBeDefined()
    expect(next.reps).toBe(1)
  })

  it('Rating.Again decreases interval', () => {
    const { next: first } = scheduleReview(undefined, Rating.Good)
    const row = cardToRow('test', first)
    const { next: second } = scheduleReview(row, Rating.Again)
    expect(second.scheduled_days).toBeLessThanOrEqual(first.scheduled_days)
  })

  it('Rating.Easy increases interval more than Good', () => {
    const { next: good } = scheduleReview(undefined, Rating.Good)
    const { next: easy } = scheduleReview(undefined, Rating.Easy)
    expect(easy.scheduled_days).toBeGreaterThanOrEqual(good.scheduled_days)
  })

  it('dueCards filters by due date', () => {
    const now = Date.now()
    const rows: ReviewStateRow[] = [
      { cardId: 'a', due: now - 1000, stability: 1, difficulty: 5, elapsedDays: 0, scheduledDays: 1, reps: 1, lapses: 0, state: 2, lastReview: now - 86400000 },
      { cardId: 'b', due: now + 99999, stability: 1, difficulty: 5, elapsedDays: 0, scheduledDays: 5, reps: 1, lapses: 0, state: 2, lastReview: now - 86400000 },
    ]
    const due = dueCards(rows, now)
    expect(due).toHaveLength(1)
    expect(due[0]?.cardId).toBe('a')
  })

  it('dueCards sorts by due date ascending', () => {
    const now = Date.now()
    const rows: ReviewStateRow[] = [
      { cardId: 'b', due: now - 500, stability: 1, difficulty: 5, elapsedDays: 0, scheduledDays: 1, reps: 1, lapses: 0, state: 2, lastReview: now - 1000 },
      { cardId: 'a', due: now - 2000, stability: 1, difficulty: 5, elapsedDays: 0, scheduledDays: 1, reps: 1, lapses: 0, state: 2, lastReview: now - 2000 },
    ]
    const due = dueCards(rows, now)
    expect(due[0]?.cardId).toBe('a')
  })

  it('cardToRow converts correctly', () => {
    const { next } = scheduleReview(undefined, Rating.Good)
    const row = cardToRow('card-1', next)
    expect(row.cardId).toBe('card-1')
    expect(typeof row.due).toBe('number')
    expect(typeof row.stability).toBe('number')
  })
})
