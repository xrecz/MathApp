import { db } from './db'
import { store } from '../lib/store'
import type { AppState } from '../lib/store'
import { loadGamification } from '../engine/session'

type ThemeSetting = 'dark' | 'light' | 'system'
type FontSizeSetting = 'S' | 'M' | 'L'

const THEME_KEY     = 'theme'
const FONTSIZE_KEY  = 'fontSize'
const HAPTICS_KEY   = 'haptics'
const BACKUP_KEY    = 'lastBackupExport'

export async function loadSettings(): Promise<void> {
  const [themeRow, fontRow, hapticRow] = await Promise.all([
    db.settings.get(THEME_KEY),
    db.settings.get(FONTSIZE_KEY),
    db.settings.get(HAPTICS_KEY),
  ])
  if (themeRow)  store.set('theme',   themeRow.value  as ThemeSetting)
  if (fontRow)   store.set('fontSize', fontRow.value  as FontSizeSetting)
  if (hapticRow) store.set('haptics', hapticRow.value as boolean)
}

export async function loadXpAndStreak(): Promise<void> {
  await loadGamification()
}

export async function saveSetting(
  key: keyof Pick<AppState, 'theme' | 'fontSize' | 'haptics' | 'dailyGoalXp'>,
  value: AppState[typeof key],
): Promise<void> {
  store.set(key, value)
  if (key === 'dailyGoalXp') {
    await db.gamification.put({ key: 'dailyGoalXP', value: value as number })
  } else {
    await db.settings.put({ key, value })
  }
}

export async function getSetting(key: string): Promise<string | number | boolean | undefined> {
  const row = await db.settings.get(key)
  return row?.value
}

export async function setSetting(key: string, value: string | number | boolean): Promise<void> {
  await db.settings.put({ key, value })
}

export async function getLastBackupDate(): Promise<number | null> {
  const row = await db.settings.get(BACKUP_KEY)
  return row ? (row.value as number) : null
}

export async function markBackupExported(): Promise<void> {
  await db.settings.put({ key: BACKUP_KEY, value: Date.now() })
}

// Legacy shim
export async function addXp(amount: number): Promise<void> {
  const { addXP } = await import('../engine/session')
  await addXP(amount)
}

export async function updateStreak(active: boolean): Promise<void> {
  if (!active) return
  const { recordActivity } = await import('../engine/session')
  await recordActivity(0)
}
