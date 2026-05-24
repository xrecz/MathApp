import { describe, it, expect, beforeEach, vi } from 'vitest'
import { scheduleReview, cardToRow, Rating, rowToCard } from '../src/engine/srs'
import { enrollReviewCards } from '../src/data/progress'
import type { ReviewStateRow } from '../src/types'
import type { Lesson } from '../src/types'

// Mock Dexie to avoid real IndexedDB in tests
vi.mock('../src/data/db', () => ({
  db: {
    reviewState: {
      get: vi.fn().mockResolvedValue(undefined),
      put: vi.fn().mockResolvedValue(undefined),
    },
  },
}))

const mockLesson: Lesson = {
  id: 'test.lesson',
  title: 'Test',
  conceptTags: ['test'],
  estimatedMinutes: 5,
  blocks: { show: [], explain: [], practice: [], deepen: [] },
  reviewCards: [
    { id: 'card.1', front: 'Q1', back: 'A1', conceptTags: [] },
    { id: 'card.2', front: 'Q2', back: 'A2', conceptTags: [] },
  ],
}

describe('SRS Integration', () => {
  beforeEach(() => { vi.clearAllMocks() })

  describe('enrollReviewCards', () => {
    it('creates rows with due = now for new cards', async () => {
      const { db } = await import('../src/data/db')
      const now = Date.now()
      await enrollReviewCards(mockLesson)

      const calls = (db.reviewState.put as ReturnType<typeof vi.fn>).mock.calls
      expect(calls).toHaveLength(2)

      const row = calls[0][0] as ReviewStateRow
      expect(row.cardId).toBe('card.1')
      expect(row.due).toBeGreaterThanOrEqual(now - 1000)
      expect(row.due).toBeLessThanOrEqual(now + 5000)
      expect(row.reps).toBe(0)
    })

    it('does not re-enroll existing cards', async () => {
      const { db } = await import('../src/data/db')
      const existing: ReviewStateRow = {
        cardId: 'card.1', due: Date.now() + 86400000,
        stability: 2, difficulty: 5, elapsedDays: 1, scheduledDays: 1, reps: 1, lapses: 0, state: 2, lastReview: Date.now(),
      }
      ;(db.reviewState.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(existing)

      await enrollReviewCards(mockLesson)
      // card.1 already exists → only card.2 should be put
      const puts = (db.reviewState.put as ReturnType<typeof vi.fn>).mock.calls
      const ids = puts.map((c: unknown[]) => (c[0] as ReviewStateRow).cardId)
      expect(ids).not.toContain('card.1')
      expect(ids).toContain('card.2')
    })
  })

  describe('scheduleReview', () => {
    it('Good rating schedules due in future', () => {
      const { next } = scheduleReview(undefined, Rating.Good)
      const row = cardToRow('c1', next)
      expect(row.due).toBeGreaterThan(Date.now())
    })

    it('Again rating schedules sooner than Good', () => {
      const { next: good }  = scheduleReview(undefined, Rating.Good)
      const { next: again } = scheduleReview(undefined, Rating.Again)
      expect(again.due.getTime()).toBeLessThanOrEqual(good.due.getTime())
    })

    it('card with lapses > 0 re-schedules correctly', () => {
      const stateWithLapse: ReviewStateRow = {
        cardId: 'x', due: Date.now() - 1000,
        stability: 1, difficulty: 7, elapsedDays: 2, scheduledDays: 2,
        reps: 3, lapses: 2, state: 2, lastReview: Date.now() - 86400000,
      }
      const { next } = scheduleReview(stateWithLapse, Rating.Good)
      const row = cardToRow('x', next)
      expect(row.lapses).toBe(2) // lapses stay same on Good
      expect(row.due).toBeGreaterThan(Date.now())
    })

    it('rowToCard → cardToRow round-trip preserves key fields', () => {
      const original: ReviewStateRow = {
        cardId: 'rt', due: Date.now() + 86400000,
        stability: 3.5, difficulty: 5.2, elapsedDays: 1, scheduledDays: 1,
        reps: 2, lapses: 0, state: 2, lastReview: Date.now(),
      }
      const card = rowToCard(original)
      const back = cardToRow('rt', card)
      expect(back.stability).toBeCloseTo(original.stability, 5)
      expect(back.reps).toBe(original.reps)
    })
  })
})
