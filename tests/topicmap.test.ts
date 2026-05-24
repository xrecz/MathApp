import { describe, it, expect } from 'vitest'
import type { Topic, MasteryLevel } from '../src/types'

// Topic mastery aggregation logic (mirrors TopicMapScreen)
type AggMastery = 'not_started' | MasteryLevel

function topicMastery(
  topic: Topic,
  progressMap: Map<string, { masteryLevel: string }>,
): AggMastery {
  if (topic.lessons.length === 0) return 'not_started'
  const levels = topic.lessons.map(l => progressMap.get(l.id)?.masteryLevel ?? 'not_started')
  if (levels.every(l => l === 'mastered'))   return 'mastered'
  if (levels.some(l  => l === 'proficient' || l === 'mastered')) return 'proficient'
  if (levels.some(l  => l === 'familiar'))   return 'familiar'
  if (levels.some(l  => l === 'attempted'))  return 'attempted'
  return 'not_started'
}

const lesson = (id: string) => ({
  id, title: id, conceptTags: [], estimatedMinutes: 5,
  blocks: { show: [], explain: [], practice: [], deepen: [] },
  reviewCards: [],
})

describe('TopicMap Mastery-Aggregation', () => {
  const topic: Topic = {
    id: 't1',
    title: 'Test Topic',
    prerequisites: [],
    lessons: [lesson('l1'), lesson('l2'), lesson('l3')],
  }

  it('kein Fortschritt → not_started', () => {
    expect(topicMastery(topic, new Map())).toBe('not_started')
  })

  it('alle mastered → mastered', () => {
    const m = new Map([['l1', { masteryLevel: 'mastered' }], ['l2', { masteryLevel: 'mastered' }], ['l3', { masteryLevel: 'mastered' }]])
    expect(topicMastery(topic, m)).toBe('mastered')
  })

  it('eine proficient, rest not_started → proficient', () => {
    const m = new Map([['l1', { masteryLevel: 'proficient' }]])
    expect(topicMastery(topic, m)).toBe('proficient')
  })

  it('eine familiar, rest not_started → familiar', () => {
    const m = new Map([['l2', { masteryLevel: 'familiar' }]])
    expect(topicMastery(topic, m)).toBe('familiar')
  })

  it('eine attempted, rest not_started → attempted', () => {
    const m = new Map([['l3', { masteryLevel: 'attempted' }]])
    expect(topicMastery(topic, m)).toBe('attempted')
  })

  it('mastered schlägt proficient', () => {
    const m = new Map([['l1', { masteryLevel: 'proficient' }], ['l2', { masteryLevel: 'mastered' }]])
    expect(topicMastery(topic, m)).toBe('proficient') // not all mastered → proficient
  })

  it('leere Lesson-Liste → not_started', () => {
    const emptyTopic: Topic = { id: 'empty', title: '', prerequisites: [], lessons: [] }
    expect(topicMastery(emptyTopic, new Map())).toBe('not_started')
  })
})
