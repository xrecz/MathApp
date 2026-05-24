import Dexie, { type Table } from 'dexie'
import type { ProgressRow, ReviewStateRow, AttemptRow, SettingsRow, SessionRow } from '../types'

export interface GamificationRow {
  key: string
  value: string | number | boolean
}

export interface ErrorRow {
  id?: number
  ts: number
  message: string
  stack?: string
}

class MathLabDB extends Dexie {
  progress!: Table<ProgressRow, string>
  reviewState!: Table<ReviewStateRow, string>
  attempts!: Table<AttemptRow, number>
  settings!: Table<SettingsRow, string>
  sessions!: Table<SessionRow, number>
  gamification!: Table<GamificationRow, string>
  errors!: Table<ErrorRow, number>

  constructor() {
    super('mathlab-de')

    this.version(1).stores({
      progress:    'lessonId, status, masteryLevel, updatedAt',
      reviewState: 'cardId, due, state',
      attempts:    '++id, exerciseId, ts, correct',
      settings:    'key',
      sessions:    '++id, date',
    })

    this.version(2).stores({
      progress:     'lessonId, status, masteryLevel, updatedAt',
      reviewState:  'cardId, due, state',
      attempts:     '++id, exerciseId, ts, correct',
      settings:     'key',
      sessions:     '++id, date',
      gamification: '&key',
      errors:       '++id, ts',
    }).upgrade(async tx => {
      // Migrate XP + streak from settings to gamification
      const xp     = await tx.table('settings').get('totalXp')
      const streak = await tx.table('settings').get('streak')
      const goal   = await tx.table('settings').get('dailyGoalXp')
      const today  = await tx.table('settings').get('todayKey')
      const todayXp = await tx.table('settings').get('todayXp')
      const lastDay = await tx.table('settings').get('lastActiveDay')

      const defaults: GamificationRow[] = [
        { key: 'totalXP',       value: (xp?.value as number)     ?? 0 },
        { key: 'dailyXP',       value: (todayXp?.value as number) ?? 0 },
        { key: 'dailyGoalXP',   value: (goal?.value as number)   ?? 50 },
        { key: 'currentStreak', value: (streak?.value as number) ?? 0 },
        { key: 'longestStreak', value: (streak?.value as number) ?? 0 },
        { key: 'lastActiveDate', value: (lastDay?.value as string)  ?? '' },
        { key: 'lastDailyDate', value: (today?.value as string)  ?? '' },
      ]
      await tx.table('gamification').bulkPut(defaults)
    })
  }
}

export const db = new MathLabDB()
