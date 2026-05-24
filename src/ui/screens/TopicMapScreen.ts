import { navigate, store } from '../../lib/store'
import { getCourse } from '../../content/index'
import { getAllProgress } from '../../data/progress'
import { masteryLabel } from '../../engine/mastery'
import type { Topic, MasteryLevel } from '../../types'

type AggMastery = 'not_started' | MasteryLevel

const NODE_W = 130
const NODE_H = 44
const GAP_Y  = 80
const PAD    = 40

export async function renderTopicMapScreen(container: HTMLElement, phase?: string): Promise<void> {
  container.innerHTML = `<div class="flex items-center justify-center min-h-screen">
    <div class="text-gray-400 text-sm animate-pulse">Karte laden…</div>
  </div>`

  const phaseNum = phase ? parseInt(phase, 10) : 0
  const [course, allProgress] = await Promise.all([getCourse(), getAllProgress()])
  const progressMap = new Map(allProgress.map(p => [p.lessonId, p]))
  const phaseUnit = course.phases.find(p => p.phase === phaseNum)

  if (!phaseUnit) {
    container.innerHTML = `<div class="screen items-center justify-center">
      <p class="text-red-400 mb-4">Phase nicht gefunden.</p>
      <button id="back-btn" class="btn-secondary">Zurück</button>
    </div>`
    container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))
    return
  }

  const topics = phaseUnit.topics
  const positions = new Map<string, { x: number; y: number }>()
  topics.forEach((topic, i) => {
    positions.set(topic.id, {
      x: PAD,
      y: PAD + i * GAP_Y,
    })
  })

  const topicMastery = (topic: Topic): AggMastery => {
    if (topic.lessons.length === 0) return 'not_started'
    const levels = topic.lessons.map(l => progressMap.get(l.id)?.masteryLevel ?? 'not_started' as AggMastery)
    if (levels.every(l => l === 'mastered'))   return 'mastered'
    if (levels.some(l  => l === 'proficient' || l === 'mastered')) return 'proficient'
    if (levels.some(l  => l === 'familiar'))   return 'familiar'
    if (levels.some(l  => l === 'attempted'))  return 'attempted'
    return 'not_started'
  }

  const svgW = NODE_W + PAD * 2
  const svgH = Math.max(topics.length * GAP_Y + PAD, 200)

  const streak = store.get('streak')

  container.innerHTML = `
    <div class="screen pb-4">
      <div class="top-bar justify-between">
        <button id="back-btn" class="text-gray-400 hover:text-white text-xl no-tap-highlight">←</button>
        <h1 class="text-lg font-bold">Phase ${phaseNum}: ${phaseUnit.title}</h1>
        <streak-badge count="${streak}"></streak-badge>
      </div>

      <!-- Phase selector tabs -->
      <div class="flex gap-1 overflow-x-auto pb-2 mb-2 scrollbar-none">
        ${course.phases.map(pu => `
          <button data-phase="${pu.phase}"
            class="phase-tab flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors no-tap-highlight
            ${pu.phase === phaseNum ? 'bg-brand-600 text-white' : 'bg-surface-700 text-gray-400 hover:bg-surface-600'}">
            P${pu.phase}
          </button>`).join('')}
      </div>

      <!-- SVG Graph with pan -->
      <div id="map-container" class="card overflow-auto mb-4 cursor-grab active:cursor-grabbing"
        style="max-height: 55vh; touch-action: pan-x pan-y;">
        <svg id="topic-svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#4b5563"/>
            </marker>
          </defs>
          ${renderEdges(topics, positions)}
          ${topics.map(topic => renderNode(topic, positions, topicMastery(topic))).join('')}
        </svg>
      </div>

      <!-- Topic list -->
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Themen</h2>
      <div id="topic-list" class="space-y-2 pb-4">
        ${topics.map(topic => renderTopicCard(topic, progressMap, topicMastery(topic))).join('')}
      </div>
    </div>

    <!-- Bottom sheet overlay (hidden) -->
    <div id="sheet-overlay" class="fixed inset-0 bg-black/60 z-40 hidden" aria-hidden="true"></div>
    <div id="bottom-sheet" class="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-surface-800 rounded-t-2xl z-50 hidden max-h-[70vh] overflow-y-auto">
      <div class="w-12 h-1 bg-surface-600 rounded-full mx-auto mt-3 mb-4"></div>
      <div id="sheet-content" class="px-4 pb-8"></div>
    </div>`

  container.querySelectorAll<HTMLElement>('[data-phase]').forEach(btn => {
    btn.addEventListener('click', () => navigate(`/topics/${btn.dataset['phase']}`))
  })
  container.querySelector('#back-btn')?.addEventListener('click', () => navigate('/'))

  // Node taps → bottom sheet
  container.querySelector('#topic-svg')?.addEventListener('click', e => {
    const target = (e.target as Element).closest('[data-topic-id]') as HTMLElement | null
    if (!target) return
    const topicId = target.dataset['topicId']
    const topic = topics.find(t => t.id === topicId)
    if (topic) openSheet(container, topic, progressMap)
  })

  // Topic card taps
  container.querySelector('#topic-list')?.addEventListener('click', e => {
    const btn = (e.target as Element).closest('[data-topic-id]') as HTMLElement | null
    if (!btn) return
    const topic = topics.find(t => t.id === btn.dataset['topicId'])
    if (topic) openSheet(container, topic, progressMap)
  })

  container.querySelector('#sheet-overlay')?.addEventListener('click', () => closeSheet(container))
}

function openSheet(
  container: HTMLElement,
  topic: Topic,
  progressMap: Map<string, { masteryLevel: string }>,
): void {
  const content = container.querySelector<HTMLElement>('#sheet-content')
  if (!content) return

  content.innerHTML = `
    <h2 class="font-bold text-lg mb-1">${topic.title}</h2>
    ${topic.prerequisites.length
      ? `<p class="text-xs text-gray-400 mb-3">Voraussetzungen: ${topic.prerequisites.join(', ')}</p>`
      : ''}
    <div class="space-y-1">
      ${topic.lessons.length === 0
        ? `<p class="text-gray-500 text-sm py-2">Noch keine Lektionen — kommt bald.</p>`
        : topic.lessons.map(l => {
            const p = progressMap.get(l.id)
            const lvl = p?.masteryLevel ?? 'not_started'
            return `<button class="w-full flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-surface-700 transition-colors no-tap-highlight"
              data-lesson="${l.id}">
              <span class="text-lg">${statusEmoji(lvl)}</span>
              <span class="flex-1 text-sm text-left">${l.title}</span>
              <span class="text-xs text-gray-500">${lvl !== 'not_started' ? masteryLabel(lvl as MasteryLevel) : 'Nicht gestartet'}</span>
            </button>`
          }).join('')}
    </div>`

  container.querySelectorAll<HTMLElement>('[data-lesson]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeSheet(container)
      navigate(`/lesson/${btn.dataset['lesson']}`)
    })
  })

  container.querySelector('#sheet-overlay')?.classList.remove('hidden')
  container.querySelector('#bottom-sheet')?.classList.remove('hidden')
}

function closeSheet(container: HTMLElement): void {
  container.querySelector('#sheet-overlay')?.classList.add('hidden')
  container.querySelector('#bottom-sheet')?.classList.add('hidden')
}

function statusEmoji(level: string): string {
  const map: Record<string, string> = {
    mastered: '🟢', proficient: '🔵', familiar: '🟡',
    attempted: '🟠', not_started: '⚪',
  }
  return map[level] ?? '⚪'
}

function masteryFill(level: AggMastery): string {
  const map: Record<AggMastery, string> = {
    mastered:    '#1e3a5f',
    proficient:  '#1e3a2f',
    familiar:    '#3a3010',
    attempted:   '#3a2010',
    not_started: '#1f2937',
  }
  return map[level]
}

function masteryStroke(level: AggMastery): string {
  const map: Record<AggMastery, string> = {
    mastered:    '#3b82f6',
    proficient:  '#22c55e',
    familiar:    '#eab308',
    attempted:   '#f97316',
    not_started: '#374151',
  }
  return map[level]
}

function renderNode(topic: Topic, positions: Map<string, { x: number; y: number }>, level: AggMastery): string {
  const pos = positions.get(topic.id)
  if (!pos) return ''
  const short = topic.title.length > 16 ? topic.title.slice(0, 15) + '…' : topic.title
  return `<g data-topic-id="${topic.id}" class="cursor-pointer" role="button" aria-label="${topic.title}">
    <rect x="${pos.x}" y="${pos.y}" width="${NODE_W}" height="${NODE_H}" rx="10"
      fill="${masteryFill(level)}" stroke="${masteryStroke(level)}" stroke-width="2"/>
    <text x="${pos.x + NODE_W/2}" y="${pos.y + NODE_H/2 + 5}" text-anchor="middle"
      fill="white" font-size="12" font-family="-apple-system,sans-serif">${short}</text>
  </g>`
}

function renderEdges(topics: Topic[], positions: Map<string, { x: number; y: number }>): string {
  return topics.flatMap(topic =>
    topic.prerequisites
      .filter(prereqId => positions.has(prereqId))
      .map(prereqId => {
        const from = positions.get(prereqId)!
        const to   = positions.get(topic.id)!
        const x1 = from.x + NODE_W / 2
        const y1 = from.y + NODE_H
        const x2 = to.x + NODE_W / 2
        const y2 = to.y
        return `<path d="M${x1},${y1} C${x1},${y1+30} ${x2},${y2-30} ${x2},${y2}"
          fill="none" stroke="#374151" stroke-width="1.5" marker-end="url(#arr)"/>`
      })
  ).join('')
}

function renderTopicCard(
  topic: Topic,
  progressMap: Map<string, { masteryLevel: string }>,
  level: AggMastery,
): string {
  const done = topic.lessons.filter(l => {
    const p = progressMap.get(l.id)
    return p?.masteryLevel === 'mastered' || p?.masteryLevel === 'proficient'
  }).length
  return `<div class="card cursor-pointer hover:bg-surface-700 active:bg-surface-600 transition-colors no-tap-highlight"
    data-topic-id="${topic.id}">
    <div class="flex items-center gap-3">
      <span class="text-xl">${statusEmoji(level)}</span>
      <div class="flex-1 min-w-0">
        <p class="font-medium text-sm truncate">${topic.title}</p>
        <p class="text-xs text-gray-400">${done}/${topic.lessons.length} Lektionen</p>
      </div>
      <span class="text-gray-500 text-sm">›</span>
    </div>
  </div>`
}
