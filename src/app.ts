import { store, navigate } from './lib/store'
import { loadSettings, loadXpAndStreak } from './data/settings'
import { renderHomeScreen } from './ui/screens/HomeScreen'
import { renderLessonScreen } from './ui/screens/LessonScreen'
import { renderReviewScreen } from './ui/screens/ReviewScreen'
import { renderProfileScreen } from './ui/screens/ProfileScreen'
import { renderTopicMapScreen } from './ui/screens/TopicMapScreen'

// Register custom elements eagerly
import './ui/components/StreakBadge'
import './ui/components/ProgressBar'
import './ui/components/MathRender'
import './ui/components/MathKeyboard'
import './ui/components/HintsAccordion'
import './ui/components/Button'
import './ui/components/Card'

async function route(path: string, container: HTMLElement): Promise<void> {
  container.innerHTML = `<div class="flex items-center justify-center min-h-screen">
    <div class="animate-pulse text-gray-400">Laden…</div>
  </div>`

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
    } else {
      container.innerHTML = `<div class="screen items-center justify-center text-center py-20">
        <p class="text-gray-400 mb-4">Seite nicht gefunden: ${path}</p>
        <button class="btn-secondary" id="home-btn">Zur Startseite</button>
      </div>`
      container.querySelector('#home-btn')?.addEventListener('click', () => navigate('/'))
    }
  } catch (err) {
    console.error('Routing error:', err)
    container.innerHTML = `<div class="screen items-center justify-center text-center py-20">
      <p class="text-red-400 mb-4">Fehler beim Laden der Seite.</p>
      <pre class="text-xs text-gray-500 mb-4 overflow-auto max-w-full">${String(err)}</pre>
      <button class="btn-secondary" id="home-btn">Zur Startseite</button>
    </div>`
    container.querySelector('#home-btn')?.addEventListener('click', () => navigate('/'))
  }
}

export async function initApp(): Promise<void> {
  // Load persisted settings
  await loadSettings()
  await loadXpAndStreak()

  // Apply theme
  applyThemeFromStore()

  // Apply font size
  const fs = store.get('fontSize')
  document.body.classList.add(`fs-${fs}`)

  const container = document.getElementById('app')!

  // Initial route
  const currentPath = window.location.pathname
  store.set('route', currentPath)
  await route(currentPath, container)

  // Listen to navigation
  store.subscribe('route', async (path) => {
    await route(path, container)
    window.scrollTo(0, 0)
  })

  // Browser back/forward
  window.addEventListener('popstate', () => {
    store.set('route', window.location.pathname)
  })
}

function applyThemeFromStore(): void {
  const theme = store.get('theme')
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
