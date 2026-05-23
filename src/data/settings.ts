import { db } from './db'
import { store } from '../lib/store'
import type { AppState } from '../lib/store'

type SettingKey = keyof Pick<AppState, 'theme' | 'fontSize' | 'haptics' | 'dailyGoalXp'>
const SETTING_KEYS: SettingKey[] = ['theme', 'fontSize', 'haptics', 'dailyGoalXp']

export async function loadSettings(): Promise<void> {
  const rows = await db.settings.toArray()
  for (const row of rows) {
    const key = row.key as SettingKey
    if (SETTING_KEYS.includes(key)) {
      store.set(key, row.value as AppState[SettingKey])
    }
  }
}

export async function saveSetting(key: SettingKey, value: AppState[SettingKey]): Promise<void> {
  store.set(key, value)
  await db.settings.put({ key, value })
}

export async function loadXpAndStreak(): Promise<void> {
  const xpRow = await db.settings.get('totalXp')
  const streakRow = await db.settings.get('streak')
  const todayXpRow = await db.settings.get('todayXp')
  const todayKeyRow = await db.settings.get('todayKey')

  if (xpRow) store.set('xp', xpRow.value as number)
  if (streakRow) store.set('streak', streakRow.value as number)

  const today = new Date().toISOString().slice(0, 10)
  if (todayKeyRow && todayKeyRow.value === today && todayXpRow) {
    store.set('todayXp', todayXpRow.value as number)
  } else {
    store.set('todayXp', 0)
    await db.settings.put({ key: 'todayXp', value: 0 })
    await db.settings.put({ key: 'todayKey', value: today })
  }
}

export async function addXp(amount: number): Promise<void> {
  const newTotal = store.get('xp') + amount
  const newToday = store.get('todayXp') + amount
  store.set('xp', newTotal)
  store.set('todayXp', newToday)
  await db.settings.put({ key: 'totalXp', value: newTotal })
  await db.settings.put({ key: 'todayXp', value: newToday })
}

export async function updateStreak(lessonsCompleted: boolean): Promise<void> {
  if (!lessonsCompleted) return
  const today = new Date().toISOString().slice(0, 10)
  const lastDayRow = await db.settings.get('lastActiveDay')
  const lastDay = lastDayRow?.value as string | undefined

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  let newStreak = store.get('streak')

  if (lastDay === today) return
  newStreak = lastDay === yesterday ? newStreak + 1 : 1

  store.set('streak', newStreak)
  await db.settings.put({ key: 'streak', value: newStreak })
  await db.settings.put({ key: 'lastActiveDay', value: today })
}
