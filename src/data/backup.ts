import { db } from './db'
import type { ProgressRow, ReviewStateRow, AttemptRow, SettingsRow } from '../types'

interface BackupData {
  version: 1
  exportedAt: number
  progress: ProgressRow[]
  reviewState: ReviewStateRow[]
  attempts: AttemptRow[]
  settings: SettingsRow[]
}

export async function exportBackup(): Promise<void> {
  const data: BackupData = {
    version: 1,
    exportedAt: Date.now(),
    progress: await db.progress.toArray(),
    reviewState: await db.reviewState.toArray(),
    attempts: await db.attempts.toArray(),
    settings: await db.settings.toArray(),
  }

  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `mathlab-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importBackup(file: File): Promise<{ success: boolean; error?: string }> {
  try {
    const text = await file.text()
    const data = JSON.parse(text) as Partial<BackupData>

    if (data.version !== 1) {
      return { success: false, error: 'Unbekannte Backup-Version.' }
    }

    if (!validateBackup(data)) {
      return { success: false, error: 'Backup-Datei ist beschädigt oder ungültig.' }
    }

    await db.transaction('rw', [db.progress, db.reviewState, db.attempts, db.settings], async () => {
      await db.progress.clear()
      await db.reviewState.clear()
      await db.attempts.clear()
      await db.settings.clear()

      if (data.progress?.length) await db.progress.bulkPut(data.progress)
      if (data.reviewState?.length) await db.reviewState.bulkPut(data.reviewState)
      if (data.attempts?.length) await db.attempts.bulkPut(data.attempts)
      if (data.settings?.length) await db.settings.bulkPut(data.settings)
    })

    return { success: true }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}

function validateBackup(data: Partial<BackupData>): data is BackupData {
  return (
    typeof data.version === 'number' &&
    typeof data.exportedAt === 'number' &&
    Array.isArray(data.progress) &&
    Array.isArray(data.reviewState) &&
    Array.isArray(data.attempts) &&
    Array.isArray(data.settings)
  )
}

export async function clearAll(): Promise<void> {
  await db.transaction('rw', [db.progress, db.reviewState, db.attempts, db.settings, db.sessions], async () => {
    await db.progress.clear()
    await db.reviewState.clear()
    await db.attempts.clear()
    await db.settings.clear()
    await db.sessions.clear()
  })
}
