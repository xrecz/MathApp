import './ui/styles.css'
import { initApp } from './app'
import { db } from './data/db'
import { getLastBackupDate } from './data/settings'

// Persistent storage on first launch
if (navigator.storage?.persist) {
  navigator.storage.persist().catch(() => { /* non-critical */ })
}

// Global error boundary
window.addEventListener('error', async (event) => {
  logError(event.message, event.error?.stack)
})
window.addEventListener('unhandledrejection', async (event) => {
  logError(String(event.reason), (event.reason as Error)?.stack)
})

async function logError(message: string, stack?: string): Promise<void> {
  try {
    await db.errors.add({ ts: Date.now(), message: message.slice(0, 500), stack: stack?.slice(0, 1000) })
    // Keep rolling max 50 entries
    const count = await db.errors.count()
    if (count > 50) {
      const oldest = await db.errors.orderBy('ts').limit(count - 50).primaryKeys()
      await db.errors.bulkDelete(oldest)
    }
    showErrorToast(message)
  } catch { /* don't recurse */ }
}

function showErrorToast(msg: string): void {
  const toast = document.createElement('div')
  toast.className = [
    'fixed bottom-4 left-4 right-4 max-w-lg mx-auto z-50',
    'bg-red-900/90 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl',
    'text-sm shadow-xl',
  ].join(' ')
  toast.textContent = `⚠ ${msg.slice(0, 120)}`
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 5000)
}

// Check backup reminder (> 14 days)
async function checkBackupReminder(): Promise<void> {
  const last = await getLastBackupDate()
  const daysSince = last ? (Date.now() - last) / 86400000 : Infinity
  if (daysSince <= 14) return

  const days = Math.floor(daysSince)
  const banner = document.createElement('div')
  banner.id = 'global-backup-banner'
  banner.className = [
    'fixed top-0 left-0 right-0 z-40',
    'bg-orange-900/90 border-b border-orange-500/40',
    'px-4 py-2 flex items-center justify-between gap-3',
    'text-sm text-orange-200',
  ].join(' ')
  banner.innerHTML = `
    <span>⚠ Letztes Backup: ${Number.isFinite(days) ? `vor ${days} Tagen` : 'noch nie'}</span>
    <div class="flex gap-2">
      <button id="backup-now-btn" class="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg text-xs font-medium no-tap-highlight">
        Jetzt sichern
      </button>
      <button id="backup-dismiss-btn" class="text-orange-400 hover:text-orange-200 px-2 no-tap-highlight">✕</button>
    </div>`

  document.body.prepend(banner)

  document.getElementById('backup-now-btn')?.addEventListener('click', () => {
    banner.remove()
    window.history.pushState({}, '', '/profile')
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
  document.getElementById('backup-dismiss-btn')?.addEventListener('click', () => banner.remove())
}

// SW update notification
function setupSWUpdateNotification(): void {
  if (!('serviceWorker' in navigator)) return
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    const banner = document.createElement('div')
    banner.className = [
      'fixed top-0 left-0 right-0 z-50',
      'bg-brand-700 text-white px-4 py-2',
      'flex items-center justify-between gap-3 text-sm',
    ].join(' ')
    banner.innerHTML = `
      <span>🔄 Neue Version verfügbar.</span>
      <button id="sw-reload-btn" class="bg-white text-brand-700 font-semibold px-3 py-1 rounded-lg text-xs no-tap-highlight">
        Jetzt aktualisieren
      </button>`
    document.body.prepend(banner)
    document.getElementById('sw-reload-btn')?.addEventListener('click', () => window.location.reload())
  })
}

setupSWUpdateNotification()

initApp().then(() => {
  // Check backup reminder after app is ready
  checkBackupReminder().catch(() => { /* non-critical */ })
})
