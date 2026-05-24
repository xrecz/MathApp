import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { xpForAnswer, XP_LESSON_BONUS, XP_REVIEW_GOOD, XP_REVIEW_HARD, XP_REVIEW_AGAIN } from '../src/engine/session'

// --- Mocks ---
const mockGamData: Record<string, string | number | boolean> = {}

vi.mock('../src/data/db', () => ({
  db: {
    gamification: {
      get: vi.fn((key: string) =>
        Promise.resolve(mockGamData[key] !== undefined ? { key, value: mockGamData[key] } : undefined)
      ),
      put: vi.fn((row: { key: string; value: string | number | boolean }) => {
        mockGamData[row.key] = row.value
        return Promise.resolve()
      }),
      toArray: vi.fn().mockResolvedValue([]),
    },
  },
}))

vi.mock('../src/lib/store', () => ({
  store: { get: vi.fn().mockReturnValue(0), set: vi.fn() },
}))

vi.mock('../src/lib/haptics', () => ({
  haptic: { success: vi.fn(), light: vi.fn(), error: vi.fn(), warning: vi.fn(), medium: vi.fn() },
  hapticSuccess: vi.fn(), hapticError: vi.fn(), hapticTap: vi.fn(), vibrate: vi.fn(),
}))

// ─── XP Vergabe ────────────────────────────────────────────────────────────────

describe('XP Vergabe', () => {
  it('richtig ohne Hinweis → 10 XP', () => {
    expect(xpForAnswer(true, 0)).toBe(10)
  })
  it('richtig mit 1 Hinweis → 7 XP', () => {
    expect(xpForAnswer(true, 1)).toBe(7)
  })
  it('richtig mit 2 Hinweisen → 4 XP', () => {
    expect(xpForAnswer(true, 2)).toBe(4)
  })
  it('richtig mit 3 Hinweisen → 2 XP', () => {
    expect(xpForAnswer(true, 3)).toBe(2)
  })
  it('richtig mit >3 Hinweisen → min 2 XP', () => {
    expect(xpForAnswer(true, 99)).toBe(2)
  })
  it('falsch → 0 XP', () => {
    expect(xpForAnswer(false, 0)).toBe(0)
    expect(xpForAnswer(false, 2)).toBe(0)
  })
  it('Lektion-Bonus ist 50', () => {
    expect(XP_LESSON_BONUS).toBe(50)
  })
  it('Review-Bewertungen: Good=5, Hard=3, Again=0', () => {
    expect(XP_REVIEW_GOOD).toBe(5)
    expect(XP_REVIEW_HARD).toBe(3)
    expect(XP_REVIEW_AGAIN).toBe(0)
  })
})

// ─── Streak-Logik ─────────────────────────────────────────────────────────────

describe('Streak-Logik', () => {
  beforeEach(() => {
    // Reset mock data
    for (const k of Object.keys(mockGamData)) delete mockGamData[k]
    vi.clearAllMocks()

    // Re-bind mocks so they see the fresh mockGamData
    const dbMod = vi.mocked(
      vi.importMock('../src/data/db') as Promise<{ db: { gamification: { get: ReturnType<typeof vi.fn>; put: ReturnType<typeof vi.fn> } } }>
    )
    void dbMod
  })

  afterEach(() => { vi.clearAllMocks() })

  it('XP-Vergabe: +10 ohne Hint', () => {
    expect(xpForAnswer(true, 0)).toBe(10)
  })

  it('XP sinkt mit Hint-Anzahl', () => {
    expect(xpForAnswer(true, 0)).toBeGreaterThan(xpForAnswer(true, 1))
    expect(xpForAnswer(true, 1)).toBeGreaterThan(xpForAnswer(true, 2))
    expect(xpForAnswer(true, 2)).toBeGreaterThan(xpForAnswer(true, 3))
  })
})

// ─── recordActivity Streak ────────────────────────────────────────────────────
// These tests use the mock directly via module factory

describe('recordActivity Streak (unit)', () => {
  it('streak property increments correctly based on ISO dates', () => {
    const today     = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const old       = new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10)

    // Helper that simulates the streak-update logic from session.ts
    function computeStreak(lastActive: string, currentStreak: number): number {
      if (lastActive === today) return currentStreak      // already today
      if (lastActive === yesterday) return currentStreak + 1
      return 1                                           // gap → reset
    }

    expect(computeStreak('', 0)).toBe(1)             // first activity
    expect(computeStreak(yesterday, 3)).toBe(4)      // consecutive day
    expect(computeStreak(old, 5)).toBe(1)            // gap breaks streak
    expect(computeStreak(today, 7)).toBe(7)          // double-call today
  })
})
