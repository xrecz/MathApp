import { addXp, updateStreak } from '../data/settings'
import { store } from '../lib/store'
import { hapticSuccess } from '../lib/haptics'

export interface SessionResult {
  xpEarned: number
  lessonCompleted: boolean
}

export async function finishLesson(xpEarned: number): Promise<void> {
  await addXp(xpEarned)
  await updateStreak(true)
  hapticSuccess()
}

export function isGoalReached(): boolean {
  return store.get('todayXp') >= store.get('dailyGoalXp')
}

export function goalProgress(): number {
  const goal = store.get('dailyGoalXp')
  if (goal <= 0) return 1
  return Math.min(1, store.get('todayXp') / goal)
}
