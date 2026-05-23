import Dexie, { type Table } from 'dexie'
import type { ProgressRow, ReviewStateRow, AttemptRow, SettingsRow, SessionRow } from '../types'

class MathLabDB extends Dexie {
  progress!: Table<ProgressRow, string>
  reviewState!: Table<ReviewStateRow, string>
  attempts!: Table<AttemptRow, number>
  settings!: Table<SettingsRow, string>
  sessions!: Table<SessionRow, number>

  constructor() {
    super('mathlab-de')
    this.version(1).stores({
      progress:    'lessonId, status, masteryLevel, updatedAt',
      reviewState: 'cardId, due, state',
      attempts:    '++id, exerciseId, ts, correct',
      settings:    'key',
      sessions:    '++id, date',
    })
  }
}

export const db = new MathLabDB()
