import { db } from '../data/db'
import { haptic } from '../lib/haptics'
import { store } from '../lib/store'

// XP per correct answer based on hint count used
export function xpForAnswer(correct: boolean, hintCount: number): number {
  if (!correct) return 0
  const table = [10, 7, 4, 2] as const
  return table[Math.min(hintCount, 3)] ?? 2
}

export const XP_LESSON_BONUS = 50
export const XP_REVIEW_GOOD  = 5
export const XP_REVIEW_HARD  = 3
export const XP_REVIEW_AGAIN = 0

async function getGam(key: string): Promise<number | string | boolean> {
  const row = await db.gamification.get(key)
  return row?.value ?? 0
}
async function setGam(key: string, value: number | string | boolean): Promise<void> {
  await db.gamification.put({ key, value })
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}
function yesterdayISO(): string {
  return new Date(Date.now() - 86400000).toISOString().slice(0, 10)
}

export async function recordActivity(xpEarned: number): Promise<void> {
  const today     = todayISO()
  const yesterday = yesterdayISO()
  const lastDay   = (await getGam('lastActiveDate')) as string

  let streak = (await getGam('currentStreak')) as number
  if (lastDay !== today) {
    streak = lastDay === yesterday ? streak + 1 : 1
    await setGam('lastActiveDate', today)
    await setGam('currentStreak', streak)
    const longest = (await getGam('longestStreak')) as number
    if (streak > longest) await setGam('longestStreak', streak)
  }

  await addXP(xpEarned, today)
  store.set('streak', streak)
}

export async function addXP(amount: number, today = todayISO()): Promise<void> {
  if (amount <= 0) return

  const total   = ((await getGam('totalXP')) as number) + amount
  const dailyKey = (await getGam('lastDailyDate')) as string
  let daily: number

  if (dailyKey !== today) {
    daily = amount
    await setGam('lastDailyDate', today)
  } else {
    daily = ((await getGam('dailyXP')) as number) + amount
  }

  await setGam('totalXP', total)
  await setGam('dailyXP', daily)

  store.set('xp', total)
  store.set('todayXp', daily)

  // Check daily goal
  const goal = (await getGam('dailyGoalXP')) as number
  const prev = daily - amount
  if (daily >= goal && prev < goal) {
    showGoalToast()
    haptic.success()
  }
}

export async function loadGamification(): Promise<void> {
  const [total, daily, streak, goal, lastDay, dailyDate] = await Promise.all([
    getGam('totalXP'),
    getGam('dailyXP'),
    getGam('currentStreak'),
    getGam('dailyGoalXP'),
    getGam('lastActiveDate'),
    getGam('lastDailyDate'),
  ])

  const today = todayISO()
  store.set('xp', total as number)
  store.set('streak', streak as number)
  store.set('dailyGoalXp', (goal as number) || 50)
  store.set('todayXp', dailyDate === today ? (daily as number) : 0)

  // Reset daily XP if new day
  if (dailyDate !== today) {
    await setGam('dailyXP', 0)
    await setGam('lastDailyDate', today)
  }

  // Check for streak break
  const yesterday = yesterdayISO()
  if (lastDay && lastDay !== today && lastDay !== yesterday) {
    await setGam('currentStreak', 0)
    store.set('streak', 0)
  }
}

export async function setDailyGoal(xp: number): Promise<void> {
  await setGam('dailyGoalXP', xp)
  store.set('dailyGoalXp', xp)
}

export async function getGamStats(): Promise<{
  totalXP: number
  dailyXP: number
  dailyGoalXP: number
  currentStreak: number
  longestStreak: number
}> {
  const [totalXP, dailyXP, dailyGoalXP, currentStreak, longestStreak] = await Promise.all([
    getGam('totalXP'),
    getGam('dailyXP'),
    getGam('dailyGoalXP'),
    getGam('currentStreak'),
    getGam('longestStreak'),
  ])
  return {
    totalXP: totalXP as number,
    dailyXP: dailyXP as number,
    dailyGoalXP: (dailyGoalXP as number) || 50,
    currentStreak: currentStreak as number,
    longestStreak: longestStreak as number,
  }
}

export function isGoalReached(): boolean {
  return store.get('todayXp') >= store.get('dailyGoalXp')
}

export function goalProgress(): number {
  const goal = store.get('dailyGoalXp')
  if (goal <= 0) return 1
  return Math.min(1, store.get('todayXp') / goal)
}

function showGoalToast(): void {
  const toast = document.createElement('div')
  toast.className = [
    'fixed top-4 left-1/2 -translate-x-1/2 z-50',
    'bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg',
    'text-sm font-semibold animate-bounce',
  ].join(' ')
  toast.textContent = '🎯 Tagesziel erreicht! Weiter so.'
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}
