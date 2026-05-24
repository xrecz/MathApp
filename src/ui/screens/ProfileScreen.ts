import { navigate, store } from '../../lib/store'
import { exportBackup, importBackup, clearAll } from '../../data/backup'
import { saveSetting, markBackupExported } from '../../data/settings'
import { getAllProgress } from '../../data/progress'
import { db } from '../../data/db'
import { getGamStats, setDailyGoal } from '../../engine/session'
import type { AppState } from '../../lib/store'

export async function renderProfileScreen(container: HTMLElement): Promise<void> {
  container.innerHTML = `<div class="flex items-center justify-center min-h-screen">
    <div class="text-gray-400 text-sm animate-pulse">Lade Statistiken…</div>
  </div>`

  const [allProgress, gam, attempts, correct, totalTime] = await Promise.all([
    getAllProgress(),
    getGamStats(),
    db.attempts.count(),
    db.attempts.where('correct').equals(1).count(),
    db.attempts.toArray().then(arr => arr.reduce((s, a) => s + (a.timeMs || 0), 0)),
  ])

  const completed = allProgress.filter(p => p.status === 'completed').length
  const accuracy  = attempts > 0 ? Math.round((correct / attempts) * 100) : 0
  const timeMin   = Math.round(totalTime / 60000)

  const theme    = store.get('theme')
  const fontSize = store.get('fontSize')
  const haptics  = store.get('haptics')
  const goal     = gam.dailyGoalXP

  let storageInfo = ''
  try {
    const { usage = 0, quota = 0 } = await navigator.storage.estimate()
    const usedMB = (usage / 1048576).toFixed(1)
    const quotaGB = quota > 1e9 ? `${(quota / 1e9).toFixed(0)} GB` : `${(quota / 1e6).toFixed(0)} MB`
    storageInfo = `Speicher: ${usedMB} MB von ca. ${quotaGB}`
  } catch { /* ignore */ }

  container.innerHTML = `
    <div class="screen pb-8">
      <div class="top-bar">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl no-tap-highlight">←</button>
        <h1 class="text-xl font-bold">Profil &amp; Einstellungen</h1>
      </div>

      <!-- Stats -->
      <section class="card mb-4">
        <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Statistiken</h2>
        <div class="grid grid-cols-2 gap-3">
          ${stat('🔥 Aktueller Streak', `${gam.currentStreak} Tage`)}
          ${stat('🏆 Längster Streak', `${gam.longestStreak} Tage`)}
          ${stat('⭐ Gesamt-XP', String(gam.totalXP))}
          ${stat('📚 Abgeschlossen', `${completed} Lektionen`)}
          ${stat('🎯 Genauigkeit', accuracy > 0 ? `${accuracy} %` : '—')}
          ${stat('⏱ Lernzeit', timeMin > 0 ? `${timeMin} Min.` : '—')}
        </div>
      </section>

      <!-- Backup -->
      <section class="card mb-4">
        <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Datensicherung</h2>
        <div class="space-y-2">
          <button id="export-btn" class="btn-secondary w-full no-tap-highlight">📥 Backup exportieren</button>
          <label class="btn-secondary w-full text-center cursor-pointer block no-tap-highlight">
            📤 Backup importieren
            <input id="import-input" type="file" accept=".json" class="hidden">
          </label>
          <button id="clear-btn"
            class="w-full py-2.5 px-5 rounded-xl font-medium text-red-400 bg-red-900/20 border border-red-500/30 hover:bg-red-900/40 transition-colors no-tap-highlight">
            🗑 Alles löschen
          </button>
        </div>
        <p id="backup-msg" class="text-sm mt-2 hidden"></p>
      </section>

      <!-- Settings -->
      <section class="card mb-4">
        <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Einstellungen</h2>
        <div class="space-y-5">

          <!-- Theme -->
          <div>
            <label class="text-sm text-gray-400 block mb-2">Design</label>
            <div class="flex gap-2">
              ${(['dark', 'light', 'system'] as const).map(t => `
                <button data-theme="${t}" class="setting-btn flex-1 py-2 rounded-lg text-sm border transition-colors no-tap-highlight
                  ${theme === t ? 'border-brand-500 bg-brand-900/30 text-brand-300' : 'border-surface-600 bg-surface-700 text-gray-300'}">
                  ${t === 'dark' ? '🌙 Dunkel' : t === 'light' ? '☀️ Hell' : '🔄 System'}
                </button>`).join('')}
            </div>
          </div>

          <!-- Font size -->
          <div>
            <label class="text-sm text-gray-400 block mb-2">Schriftgröße</label>
            <div class="flex gap-2">
              ${(['S', 'M', 'L'] as const).map(s => `
                <button data-fontsize="${s}" class="setting-btn flex-1 py-2 rounded-lg text-sm border transition-colors no-tap-highlight
                  ${fontSize === s ? 'border-brand-500 bg-brand-900/30 text-brand-300' : 'border-surface-600 bg-surface-700 text-gray-300'}">
                  ${s}
                </button>`).join('')}
            </div>
          </div>

          <!-- Haptics -->
          <div class="flex items-center justify-between">
            <span class="text-sm">Vibration (Haptics)</span>
            <button id="haptics-toggle" aria-label="Haptics ein/ausschalten"
              class="relative inline-flex w-12 h-6 rounded-full transition-colors no-tap-highlight ${haptics ? 'bg-brand-600' : 'bg-surface-600'}">
              <span class="absolute top-1 transition-all w-4 h-4 bg-white rounded-full ${haptics ? 'right-1' : 'left-1'}"></span>
            </button>
          </div>

          <!-- Daily goal -->
          <div>
            <label class="text-sm text-gray-400 block mb-2">
              Tagesziel: <span id="goal-val" class="text-white font-semibold">${goal} XP</span>
            </label>
            <div class="flex gap-2">
              ${[20, 50, 100, 200].map(v => `
                <button data-goal="${v}" class="goal-btn flex-1 py-2 rounded-lg text-sm border transition-colors no-tap-highlight
                  ${goal === v ? 'border-brand-500 bg-brand-900/30 text-brand-300' : 'border-surface-600 bg-surface-700 text-gray-300'}">
                  ${v}
                </button>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Storage info -->
      ${storageInfo ? `<p class="text-xs text-gray-500 text-center mb-4">${storageInfo}</p>` : ''}
    </div>`

  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))

  container.querySelector('#export-btn')?.addEventListener('click', async () => {
    await exportBackup()
    await markBackupExported()
    showMsg(container, '✓ Backup exportiert.', true)
  })

  container.querySelector('#import-input')?.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    const confirmed = confirm('Dies ersetzt deinen aktuellen Fortschritt. Fortfahren?')
    if (!confirmed) return
    const result = await importBackup(file)
    showMsg(container, result.success ? `✓ ${result.report}` : `✗ ${result.error}`, result.success)
  })

  container.querySelector('#clear-btn')?.addEventListener('click', async () => {
    if (!confirm('Wirklich ALLE Daten löschen? Dies ist nicht rückgängig zu machen.')) return
    await clearAll()
    store.set('xp', 0); store.set('streak', 0); store.set('todayXp', 0)
    navigate('/')
  })

  container.querySelectorAll<HTMLElement>('[data-theme]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const t = btn.dataset['theme'] as AppState['theme']
      await saveSetting('theme', t)
      applyTheme(t)
      navigate('/profile')
    })
  })

  container.querySelectorAll<HTMLElement>('[data-fontsize]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const s = btn.dataset['fontsize'] as AppState['fontSize']
      await saveSetting('fontSize', s)
      document.body.className = document.body.className.replace(/\bfs-[SML]\b/g, '') + ` fs-${s}`
      navigate('/profile')
    })
  })

  container.querySelector('#haptics-toggle')?.addEventListener('click', async () => {
    await saveSetting('haptics', !store.get('haptics'))
    navigate('/profile')
  })

  container.querySelectorAll<HTMLElement>('[data-goal]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const v = parseInt(btn.dataset['goal'] ?? '50', 10)
      await setDailyGoal(v)
      navigate('/profile')
    })
  })
}

function stat(label: string, value: string): string {
  return `<div class="bg-surface-700 rounded-xl p-3 text-center">
    <p class="text-xs text-gray-400 mb-1">${label}</p>
    <p class="font-bold">${value}</p>
  </div>`
}

function showMsg(container: HTMLElement, msg: string, ok: boolean): void {
  const el = container.querySelector('#backup-msg')
  if (!el) return
  el.textContent = msg
  el.className = `text-sm mt-2 ${ok ? 'text-green-400' : 'text-red-400'}`
}

function applyTheme(theme: AppState['theme']): void {
  const html = document.documentElement
  if (theme === 'dark') html.classList.add('dark')
  else if (theme === 'light') html.classList.remove('dark')
  else html.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
}
