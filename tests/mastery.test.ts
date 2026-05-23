import { describe, it, expect } from 'vitest'
import { computeNextMastery, xpForCorrect, N_CCR } from '../src/engine/mastery'
import type { MasteryState } from '../src/engine/mastery'

const initial: MasteryState = {
  level: 'attempted',
  ccr: 0,
  totalCorrect: 0,
  totalAttempts: 0,
}

describe('Mastery Engine', () => {
  it('correct answer increments CCR', () => {
    const next = computeNextMastery(initial, true, 2)
    expect(next.ccr).toBe(1)
  })

  it('incorrect answer resets CCR', () => {
    const state: MasteryState = { ...initial, ccr: 2, level: 'familiar' }
    const next = computeNextMastery(state, false, 2)
    expect(next.ccr).toBe(0)
  })

  it('3 correct in a row → proficient', () => {
    let state = initial
    for (let i = 0; i < N_CCR; i++) {
      state = computeNextMastery(state, true, 2)
    }
    expect(state.level).toBe('proficient')
  })

  it('5 correct in row at difficulty ≥ 4 → mastered', () => {
    let state: MasteryState = { level: 'proficient', ccr: 0, totalCorrect: 5, totalAttempts: 5 }
    for (let i = 0; i < 5; i++) {
      state = computeNextMastery(state, true, 4)
    }
    expect(state.level).toBe('mastered')
  })

  it('incorrect answer downgrades mastered → proficient', () => {
    const state: MasteryState = { level: 'mastered', ccr: 5, totalCorrect: 10, totalAttempts: 10 }
    const next = computeNextMastery(state, false, 3)
    expect(next.level).toBe('proficient')
  })

  it('incorrect answer does not downgrade below familiar', () => {
    const state: MasteryState = { level: 'familiar', ccr: 0, totalCorrect: 3, totalAttempts: 5 }
    const next = computeNextMastery(state, false, 2)
    expect(next.level).toBe('familiar')
  })

  it('accuracy ≥70% on first session → familiar', () => {
    // 7 correct out of 10 attempts
    let state = initial
    for (let i = 0; i < 7; i++) state = computeNextMastery(state, true, 2)
    for (let i = 0; i < 3; i++) state = computeNextMastery(state, false, 2)
    expect(['familiar', 'proficient', 'mastered']).toContain(state.level)
  })

  describe('xpForCorrect', () => {
    it('returns more XP for higher difficulty', () => {
      expect(xpForCorrect(4, false)).toBeGreaterThan(xpForCorrect(2, false))
    })

    it('reduces XP when hint used', () => {
      expect(xpForCorrect(3, true)).toBeLessThan(xpForCorrect(3, false))
    })

    it('minimum XP is 1', () => {
      expect(xpForCorrect(1, true)).toBeGreaterThanOrEqual(1)
    })
  })
})
