import type { MasteryLevel, Difficulty } from '../types'

export const N_CCR = 3     // Consecutive Correct for proficient
export const N_MASTER = 5  // CCR on max difficulty for mastered

export interface MasteryState {
  level: MasteryLevel
  ccr: number
  totalCorrect: number
  totalAttempts: number
}

export function computeNextMastery(
  current: MasteryState,
  correct: boolean,
  difficulty: Difficulty,
): MasteryState {
  const totalAttempts = current.totalAttempts + 1
  const totalCorrect = current.totalCorrect + (correct ? 1 : 0)
  let ccr = correct ? current.ccr + 1 : 0
  let level = current.level

  if (!correct) {
    // Downgrade at most one step
    if (level === 'mastered') level = 'proficient'
    else if (level === 'proficient') level = 'familiar'
    // 'familiar' and 'attempted' don't downgrade further
  } else {
    const accuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : 0

    if (ccr >= N_MASTER && difficulty >= 4) {
      level = 'mastered'
    } else if (ccr >= N_CCR) {
      level = 'proficient'
    } else if (accuracy >= 0.7) {
      if (level === 'attempted' || level === 'not_started' as MasteryLevel) {
        level = 'familiar'
      }
    } else if (level === 'not_started' as MasteryLevel) {
      level = 'attempted'
    }
  }

  return { level, ccr, totalCorrect, totalAttempts }
}

export function masteryColor(level: MasteryLevel): string {
  const map: Record<MasteryLevel, string> = {
    attempted:  'text-gray-400',
    familiar:   'text-yellow-400',
    proficient: 'text-blue-400',
    mastered:   'text-green-400',
  }
  return map[level]
}

export function masteryLabel(level: MasteryLevel): string {
  const map: Record<MasteryLevel, string> = {
    attempted:  'Versucht',
    familiar:   'Bekannt',
    proficient: 'Geübt',
    mastered:   'Gemeistert',
  }
  return map[level]
}

export function xpForCorrect(difficulty: Difficulty, hintUsed: boolean): number {
  const base = difficulty * 5
  return hintUsed ? Math.max(1, base - 3) : base
}
