import { navigate } from '../../lib/store'
import { getCourse } from '../../content/index'
import { getAllProgress } from '../../data/progress'
import type { Topic } from '../../types'

export async function renderTopicMapScreen(container: HTMLElement, phase: string): Promise<void> {
  const phaseNum = parseInt(phase, 10)
  const course = await getCourse()
  const phaseUnit = course.phases.find(p => p.phase === phaseNum)

  if (!phaseUnit) {
    container.innerHTML = `<div class="screen items-center justify-center">
      <p class="text-red-400">Phase nicht gefunden.</p>
      <button id="back-btn" class="btn-secondary mt-4">Zurück</button>
    </div>`
    container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
    return
  }

  const allProgress = await getAllProgress()
  const progressMap = new Map(allProgress.map(p => [p.lessonId, p]))

  container.innerHTML = `
    <div class="screen pb-8">
      <div class="top-bar">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl">←</button>
        <h1 class="text-xl font-bold">Phase ${phaseNum}: ${phaseUnit.title}</h1>
      </div>

      <!-- SVG Topic Graph -->
      <div class="card mb-4 overflow-x-auto">
        ${renderTopicSVG(phaseUnit.topics, progressMap)}
      </div>

      <!-- Topic list -->
      <div class="space-y-3">
        ${phaseUnit.topics.map(topic => `
          <div class="card">
            <h3 class="font-semibold mb-2">${topic.title}</h3>
            ${topic.prerequisites.length > 0
              ? `<p class="text-xs text-gray-400 mb-2">Voraussetzungen: ${topic.prerequisites.join(', ')}</p>`
              : ''}
            <div class="space-y-1">
              ${topic.lessons.map(lesson => {
                const p = progressMap.get(lesson.id)
                const status = p?.masteryLevel ?? 'not_started'
                const dot = statusDot(status)
                return `<button class="w-full text-left flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-surface-700 transition-colors"
                  data-lesson="${lesson.id}">
                  <span>${dot}</span>
                  <span class="flex-1 text-sm">${lesson.title}</span>
                  <span class="text-xs text-gray-500">~${lesson.estimatedMinutes} Min.</span>
                </button>`
              }).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>`

  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
  container.querySelectorAll<HTMLElement>('[data-lesson]').forEach(btn => {
    btn.addEventListener('click', () => navigate(`/lesson/${btn.dataset['lesson']}`))
  })
}

function statusDot(status: string): string {
  const map: Record<string, string> = {
    mastered:   '🟢',
    proficient: '🔵',
    familiar:   '🟡',
    attempted:  '🟠',
    not_started: '⚪',
  }
  return map[status] ?? '⚪'
}

function renderTopicSVG(topics: Topic[], progressMap: Map<string, { masteryLevel: string }>): string {
  if (topics.length === 0) return ''

  const nodeW = 120, nodeH = 40, gapX = 150, gapY = 70
  const cols = Math.ceil(Math.sqrt(topics.length))
  const svgW = cols * gapX + 20
  const svgH = Math.ceil(topics.length / cols) * gapY + 20

  const positions = new Map<string, { x: number; y: number }>()
  topics.forEach((topic, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    positions.set(topic.id, { x: col * gapX + 60, y: row * gapY + 30 })
  })

  const lines = topics.flatMap(topic =>
    topic.prerequisites
      .filter(prereq => positions.has(prereq))
      .map(prereq => {
        const from = positions.get(prereq)!
        const to   = positions.get(topic.id)!
        return `<line x1="${from.x + nodeW / 2}" y1="${from.y}" x2="${to.x + nodeW / 2}" y2="${to.y}"
          stroke="#4b5563" stroke-width="1.5" marker-end="url(#arrow)"/>`
      })
  )

  const nodes = topics.map(topic => {
    const pos = positions.get(topic.id)!
    const done = topic.lessons.every(l => {
      const p = progressMap.get(l.id)
      return p?.masteryLevel === 'mastered' || p?.masteryLevel === 'proficient'
    })
    const fill = done ? '#1e3a5f' : '#1f2937'
    const stroke = done ? '#3b82f6' : '#374151'
    const shortTitle = topic.title.length > 14 ? topic.title.slice(0, 13) + '…' : topic.title
    return `<g>
      <rect x="${pos.x}" y="${pos.y - nodeH / 2}" width="${nodeW}" height="${nodeH}"
        rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
      <text x="${pos.x + nodeW / 2}" y="${pos.y + 5}" text-anchor="middle"
        fill="white" font-size="11" font-family="sans-serif">${shortTitle}</text>
    </g>`
  })

  return `<svg viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#4b5563"/>
      </marker>
    </defs>
    ${lines.join('\n')}
    ${nodes.join('\n')}
  </svg>`
}
