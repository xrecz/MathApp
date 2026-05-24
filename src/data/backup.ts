import { db } from './db'
import type { ProgressRow, ReviewStateRow, AttemptRow, SettingsRow } from '../types'
import type { GamificationRow } from './db'

interface BackupV2 {
  version: 2
  app: 'MathLab DE'
  exportedAt: string
  progress: ProgressRow[]
  reviewState: ReviewStateRow[]
  attempts: AttemptRow[]
  gamification: GamificationRow[]
  settings: SettingsRow[]
}

type BackupAny = BackupV2 | { version: 1; exportedAt: number; progress: ProgressRow[]; reviewState: ReviewStateRow[]; attempts: AttemptRow[]; settings: SettingsRow[] }

export async function exportBackup(): Promise<void> {
  const data: BackupV2 = {
    version: 2,
    app: 'MathLab DE',
    exportedAt: new Date().toISOString(),
    progress:     await db.progress.toArray(),
    reviewState:  await db.reviewState.toArray(),
    attempts:     await db.attempts.toArray(),
    gamification: await db.gamification.toArray(),
    settings:     await db.settings.toArray(),
  }

  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `mathlab-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importBackup(file: File): Promise<{ success: boolean; error?: string; report?: string }> {
  let data: BackupAny
  try {
    const text = await file.text()
    data = JSON.parse(text) as BackupAny
  } catch {
    return { success: false, error: 'Datei konnte nicht gelesen werden (kein gültiges JSON).' }
  }

  if (!validateBackup(data)) {
    return { success: false, error: 'Backup-Datei ist beschädigt oder ungültig.' }
  }

  // Normalize v1 → v2
  const normalized = data.version === 1 ? v1toV2(data) : data

  try {
    await db.transaction('rw', [db.progress, db.reviewState, db.attempts, db.gamification, db.settings], async () => {
      await db.progress.clear()
      await db.reviewState.clear()
      await db.attempts.clear()
      await db.gamification.clear()
      await db.settings.clear()

      if (normalized.progress.length)     await db.progress.bulkPut(normalized.progress)
      if (normalized.reviewState.length)  await db.reviewState.bulkPut(normalized.reviewState)
      if (normalized.attempts.length)     await db.attempts.bulkPut(normalized.attempts)
      if (normalized.gamification.length) await db.gamification.bulkPut(normalized.gamification)
      if (normalized.settings.length)     await db.settings.bulkPut(normalized.settings)
    })
  } catch (err) {
    return { success: false, error: String(err) }
  }

  return {
    success: true,
    report: `Importiert: ${normalized.progress.length} Lektionen, ${normalized.reviewState.length} Karten`,
  }
}

function validateBackup(data: unknown): data is BackupAny {
  if (typeof data !== 'object' || data === null) return false
  const d = data as Record<string, unknown>
  return (
    (d['version'] === 1 || d['version'] === 2) &&
    Array.isArray(d['progress']) &&
    Array.isArray(d['reviewState']) &&
    Array.isArray(d['attempts']) &&
    Array.isArray(d['settings'])
  )
}

function v1toV2(v1: BackupAny & { version: 1 }): BackupV2 {
  const xpRow     = v1.settings.find(s => s.key === 'totalXp')
  const streakRow = v1.settings.find(s => s.key === 'streak')
  const goalRow   = v1.settings.find(s => s.key === 'dailyGoalXp')

  return {
    version: 2,
    app: 'MathLab DE',
    exportedAt: typeof v1.exportedAt === 'number'
      ? new Date(v1.exportedAt).toISOString()
      : new Date().toISOString(),
    progress:    v1.progress,
    reviewState: v1.reviewState,
    attempts:    v1.attempts,
    settings:    v1.settings,
    gamification: [
      { key: 'totalXP',        value: (xpRow?.value     as number) ?? 0 },
      { key: 'dailyXP',        value: 0 },
      { key: 'dailyGoalXP',    value: (goalRow?.value   as number) ?? 50 },
      { key: 'currentStreak',  value: (streakRow?.value as number) ?? 0 },
      { key: 'longestStreak',  value: (streakRow?.value as number) ?? 0 },
      { key: 'lastActiveDate', value: '' },
      { key: 'lastDailyDate',  value: '' },
    ],
  }
}

export async function clearAll(): Promise<void> {
  await db.transaction('rw', [db.progress, db.reviewState, db.attempts, db.gamification, db.settings, db.sessions, db.errors], async () => {
    await Promise.all([
      db.progress.clear(),
      db.reviewState.clear(),
      db.attempts.clear(),
      db.gamification.clear(),
      db.settings.clear(),
      db.sessions.clear(),
      db.errors.clear(),
    ])
  })
}
