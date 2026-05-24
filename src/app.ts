import { store, navigate, toLogicalPath } from './lib/store'
import { loadSettings, loadXpAndStreak } from './data/settings'
import { renderHomeScreen } from './ui/screens/HomeScreen'
import { renderLessonScreen } from './ui/screens/LessonScreen'
import { renderReviewScreen } from './ui/screens/ReviewScreen'
import { renderProfileScreen } from './ui/screens/ProfileScreen'
import { renderTopicMapScreen } from './ui/screens/TopicMapScreen'
import { haptic } from './lib/haptics'

// Register custom elements eagerly
import './ui/components/StreakBadge'
import './ui/components/ProgressBar'
import './ui/components/MathRender'
import './ui/components/MathKeyboard'
import './ui/components/HintsAccordion'
import './ui/components/Button'
import './ui/components/Card'

function setLessonMode(active: boolean): void {
  document.body.dataset['inLesson'] = String(active)
}

async function route(path: string, container: HTMLElement): Promise<void> {
  setLessonMode(path.startsWith('/lesson/'))

  // Skeleton loader
  container.innerHTML = `<div class="flex items-center justify-center min-h-screen">
    <div class="animate-pulse text-gray-500 text-sm">Laden…</div>
  </div>`

  // Update bottom nav active state
  updateBottomNav(path)

  try {
    if (path === '/' || path === '') {
      await renderHomeScreen(container)
    } else if (path === '/review') {
      await renderReviewScreen(container)
    } else if (path === '/profile') {
      await renderProfileScreen(container)
    } else if (path.startsWith('/lesson/')) {
      const id = decodeURIComponent(path.slice('/lesson/'.length))
      await renderLessonScreen(container, id)
    } else if (path.startsWith('/topics/')) {
      const phase = path.slice('/topics/'.length)
      await renderTopicMapScreen(container, phase)
    } else if (path === '/topics') {
      await renderTopicMapScreen(container, '0')
    } else {
      container.innerHTML = `<div class="screen items-center justify-center text-center py-20">
        <p class="text-gray-400 mb-4">Seite nicht gefunden</p>
        <button class="btn-secondary" id="home-btn">Startseite</button>
      </div>`
      container.querySelector('#home-btn')?.addEventListener('click', () => navigate('/'))
    }
  } catch (err) {
    console.error('Routing error:', err)
    container.innerHTML = `<div class="screen items-center justify-center text-center py-20 px-4">
      <p class="text-4xl mb-4">😵</p>
      <p class="text-red-400 mb-2 font-semibold">Fehler beim Laden</p>
      <pre class="text-xs text-gray-500 mb-6 overflow-auto max-w-full text-left bg-surface-800 rounded-lg p-3">${String(err)}</pre>
      <button class="btn-secondary" id="home-btn">Zurück zur Startseite</button>
    </div>`
    container.querySelector('#home-btn')?.addEventListener('click', () => navigate('/'))
  }
}

function updateBottomNav(path: string): void {
  document.querySelectorAll<HTMLElement>('.bottom-nav-btn').forEach(btn => {
    const target = btn.dataset['route'] ?? ''
    const isActive = path === target || (target !== '/' && path.startsWith(target))
    btn.classList.toggle('text-brand-400', isActive)
    btn.classList.toggle('text-gray-500', !isActive)
  })
}

function createBottomNav(): HTMLElement {
  const nav = document.createElement('nav')
  nav.className = [
    'bottom-nav',
    'fixed bottom-0 left-0 right-0 max-w-lg mx-auto',
    'bg-surface-900/95 backdrop-blur-md border-t border-surface-700',
    'grid grid-cols-4 pb-safe',
    'z-30',
  ].join(' ')
  nav.setAttribute('aria-label', 'Hauptnavigation')

  const tabs = [
    { icon: '🏠', label: 'Start',       route: '/' },
    { icon: '📋', label: 'Wiederholen', route: '/review' },
    { icon: '🗺',  label: 'Karte',      route: '/topics/0' },
    { icon: '👤', label: 'Profil',      route: '/profile' },
  ]

  nav.innerHTML = tabs.map(tab => `
    <button data-route="${tab.route}"
      class="bottom-nav-btn flex flex-col items-center justify-center py-2 gap-0.5 text-gray-500 transition-colors no-tap-highlight active:scale-90 transition-transform"
      aria-label="${tab.label}">
      <span class="text-xl leading-none" aria-hidden="true">${tab.icon}</span>
      <span class="text-[10px] font-medium">${tab.label}</span>
    </button>`).join('')

  nav.addEventListener('click', e => {
    const btn = (e.target as Element).closest('[data-route]') as HTMLElement | null
    if (!btn) return
    haptic.light()
    navigate(btn.dataset['route'] ?? '/')
  })

  return nav
}

export async function initApp(): Promise<void> {
  await loadSettings()
  await loadXpAndStreak()

  applyThemeFromStore()
  const fs = store.get('fontSize')
  document.body.classList.add(`fs-${fs}`)

  const appEl = document.getElementById('app')!

  // Create layout: content + bottom nav
  const content = document.createElement('div')
  content.id = 'content'
  content.className = 'pb-16' // space for bottom nav
  appEl.appendChild(content)
  appEl.appendChild(createBottomNav())

  const currentPath = toLogicalPath(window.location.pathname)
  store.set('route', currentPath)
  updateBottomNav(currentPath)
  await route(currentPath, content)

  store.subscribe('route', async (path) => {
    await route(path, content)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  })

  window.addEventListener('popstate', () => {
    const path = toLogicalPath(window.location.pathname)
    store.set('route', path)
  })
}

function applyThemeFromStore(): void {
  const theme = store.get('theme')
  const html  = document.documentElement
  if (theme === 'dark')       html.classList.add('dark')
  else if (theme === 'light') html.classList.remove('dark')
  else html.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
}
