import { navigate, store } from '../../lib/store'
import { exportBackup, importBackup, clearAll } from '../../data/backup'
import { saveSetting } from '../../data/settings'
import { getAllProgress } from '../../data/progress'
import { db } from '../../data/db'
import type { AppState } from '../../lib/store'

export async function renderProfileScreen(container: HTMLElement): Promise<void> {
  const allProgress = await getAllProgress()
  const completed = allProgress.filter(p => p.status === 'completed').length
  const attempts = await db.attempts.count()
  const correct  = await db.attempts.where('correct').equals(1).count()
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0

  const xp     = store.get('xp')
  const streak = store.get('streak')
  const theme  = store.get('theme')
  const fontSize = store.get('fontSize')
  const haptics = store.get('haptics')
  const goal   = store.get('dailyGoalXp')

  container.innerHTML = `
    <div class="screen pb-8">
      <div class="top-bar">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl">←</button>
        <h1 class="text-xl font-bold">Profil &amp; Einstellungen</h1>
      </div>

      <!-- Stats -->
      <section class="card mb-4">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Statistiken</h2>
        <div class="grid grid-cols-2 gap-3">
          ${stat('🔥 Streak', `${streak} Tage`)}
          ${stat('⭐ Gesamt-XP', String(xp))}
          ${stat('📚 Abgeschlossen', `${completed} Lektionen`)}
          ${stat('🎯 Genauigkeit', `${accuracy} %`)}
        </div>
      </section>

      <!-- Backup -->
      <section class="card mb-4">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Datensicherung</h2>
        <div class="space-y-2">
          <button id="export-btn" class="btn-secondary w-full">📥 Backup exportieren</button>
          <label class="btn-secondary w-full text-center cursor-pointer block">
            📤 Backup importieren
            <input id="import-input" type="file" accept=".json" class="hidden">
          </label>
          <button id="clear-btn" class="w-full py-2.5 px-5 rounded-xl font-medium text-red-400 bg-red-900/20 border border-red-500/30 hover:bg-red-900/40 transition-colors">
            🗑 Alles löschen
          </button>
        </div>
        <p id="backup-msg" class="text-sm mt-2 hidden"></p>
      </section>

      <!-- Settings -->
      <section class="card">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Einstellungen</h2>

        <div class="space-y-4">
          <!-- Theme -->
          <div>
            <label class="text-sm text-gray-400 block mb-1">Design</label>
            <div class="flex gap-2">
              ${(['dark', 'light', 'system'] as const).map(t =>
                `<button data-theme="${t}" class="setting-theme flex-1 py-2 rounded-lg text-sm border transition-colors
                  ${theme === t ? 'border-brand-500 bg-brand-900/30 text-brand-300' : 'border-surface-600 bg-surface-700 text-gray-300'}">
                  ${t === 'dark' ? '🌙 Dunkel' : t === 'light' ? '☀️ Hell' : '🔄 System'}
                </button>`
              ).join('')}
            </div>
          </div>

          <!-- Font size -->
          <div>
            <label class="text-sm text-gray-400 block mb-1">Schriftgröße</label>
            <div class="flex gap-2">
              ${(['S', 'M', 'L'] as const).map(s =>
                `<button data-fontsize="${s}" class="setting-fontsize flex-1 py-2 rounded-lg text-sm border transition-colors
                  ${fontSize === s ? 'border-brand-500 bg-brand-900/30 text-brand-300' : 'border-surface-600 bg-surface-700 text-gray-300'}">
                  ${s}
                </button>`
              ).join('')}
            </div>
          </div>

          <!-- Haptics -->
          <div class="flex items-center justify-between">
            <span class="text-sm">Vibration (Haptics)</span>
            <button id="haptics-toggle"
              class="relative inline-flex w-12 h-6 rounded-full transition-colors ${haptics ? 'bg-brand-600' : 'bg-surface-600'}">
              <span class="absolute top-1 ${haptics ? 'right-1' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all"></span>
            </button>
          </div>

          <!-- Daily goal -->
          <div>
            <label class="text-sm text-gray-400 block mb-1">Tagesziel XP: <span id="goal-val">${goal}</span></label>
            <input type="range" min="10" max="200" step="10" value="${goal}" id="goal-slider"
              class="w-full accent-brand-500">
          </div>
        </div>
      </section>
    </div>`

  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))

  container.querySelector('#export-btn')?.addEventListener('click', exportBackup)

  container.querySelector('#import-input')?.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    const msg = container.querySelector('#backup-msg')!
    msg.classList.remove('hidden', 'text-green-400', 'text-red-400')
    const result = await importBackup(file)
    msg.textContent = result.success ? '✓ Import erfolgreich.' : `✗ ${result.error}`
    msg.classList.add(result.success ? 'text-green-400' : 'text-red-400')
    msg.classList.remove('hidden')
  })

  container.querySelector('#clear-btn')?.addEventListener('click', async () => {
    if (!confirm('Wirklich ALLE Daten löschen? Diese Aktion ist nicht rückgängig zu machen.')) return
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
      document.body.classList.remove('fs-S', 'fs-M', 'fs-L')
      document.body.classList.add(`fs-${s}`)
      navigate('/profile')
    })
  })

  container.querySelector('#haptics-toggle')?.addEventListener('click', async () => {
    await saveSetting('haptics', !store.get('haptics'))
    navigate('/profile')
  })

  const goalSlider = container.querySelector<HTMLInputElement>('#goal-slider')
  const goalVal = container.querySelector<HTMLElement>('#goal-val')
  goalSlider?.addEventListener('input', () => {
    if (goalVal) goalVal.textContent = goalSlider.value
  })
  goalSlider?.addEventListener('change', async () => {
    await saveSetting('dailyGoalXp', parseInt(goalSlider.value, 10))
  })
}

function stat(label: string, value: string): string {
  return `<div class="bg-surface-700 rounded-xl p-3 text-center">
    <p class="text-xs text-gray-400">${label}</p>
    <p class="font-bold text-lg">${value}</p>
  </div>`
}

function applyTheme(theme: AppState['theme']): void {
  const html = document.documentElement
  if (theme === 'dark') {
    html.classList.add('dark')
  } else if (theme === 'light') {
    html.classList.remove('dark')
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    html.classList.toggle('dark', prefersDark)
  }
}
