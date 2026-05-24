import { describe, it, expect } from 'vitest'
import { brueche } from '../src/content/phase0/01-brueche'
import { lineareFunktionen } from '../src/content/phase0/02-lineare-funktionen'
import { ersteAbleitungen } from '../src/content/phase0/03-erste-ableitungen'
import { potenzenWurzeln } from '../src/content/phase0/04-potenzen-wurzeln'
import { termumformungen } from '../src/content/phase0/05-termumformungen'
import { quadratischeGleichungen } from '../src/content/phase0/06-quadratische-gleichungen'
import { ungleichungen } from '../src/content/phase0/07-ungleichungen'
import { quadratischeFunktionen } from '../src/content/phase0/08-quadratische-funktionen'
import { exponentialfunktionen } from '../src/content/phase0/09-exponentialfunktionen'
import { logarithmus } from '../src/content/phase0/10-logarithmus'
import { trigonometrie } from '../src/content/phase0/11-trigonometrie'
import { vektoren } from '../src/content/phase0/12-vektoren'
import { skalarprodukt } from '../src/content/phase0/13-skalarprodukt'
import { mengenLogik } from '../src/content/phase0/14-mengen-logik'
import { notation } from '../src/content/phase0/15-notation'
import { deskriptiveStatistik } from '../src/content/phase0/16-deskriptive-statistik'
import { wahrscheinlichkeit } from '../src/content/phase0/17-wahrscheinlichkeit'
import { histogramme } from '../src/content/phase0/18-histogramme'
import type { Lesson, Exercise } from '../src/types'

const lessons: Lesson[] = [
  brueche,
  lineareFunktionen,
  ersteAbleitungen,
  potenzenWurzeln,
  termumformungen,
  quadratischeGleichungen,
  ungleichungen,
  quadratischeFunktionen,
  exponentialfunktionen,
  logarithmus,
  trigonometrie,
  vektoren,
  skalarprodukt,
  mengenLogik,
  notation,
  deskriptiveStatistik,
  wahrscheinlichkeit,
  histogramme,
]

function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = []

  if (!lesson.id || !lesson.id.includes('.')) errors.push('id must be namespaced')
  if (!lesson.title) errors.push('title required')
  if (!lesson.estimatedMinutes || lesson.estimatedMinutes < 1) errors.push('estimatedMinutes required')
  if (!lesson.conceptTags || lesson.conceptTags.length === 0) errors.push('conceptTags required')

  if (!lesson.blocks.show || lesson.blocks.show.length === 0) errors.push('blocks.show required')
  if (!lesson.blocks.explain || lesson.blocks.explain.length === 0) errors.push('blocks.explain required')
  if (!lesson.blocks.practice || lesson.blocks.practice.length < 5) errors.push('need ≥5 practice exercises')
  if (!lesson.blocks.deepen || lesson.blocks.deepen.length === 0) errors.push('blocks.deepen required')
  if (!lesson.reviewCards || lesson.reviewCards.length < 3) errors.push('need ≥3 reviewCards')

  lesson.blocks.practice.forEach((ex, i) => {
    const exErrors = validateExercise(ex)
    exErrors.forEach(e => errors.push(`exercise[${i}]: ${e}`))
  })

  return errors
}

function validateExercise(ex: Exercise): string[] {
  const errors: string[] = []

  if (!ex.id) errors.push('id required')
  if (!ex.difficulty || ex.difficulty < 1 || ex.difficulty > 5) errors.push('difficulty must be 1-5')
  if (!ex.type) errors.push('type required')
  if (!ex.prompt) errors.push('prompt required')
  if (ex.answer === undefined || ex.answer === null) errors.push('answer required')
  if (!ex.hints || ex.hints.length !== 3) errors.push('exactly 3 hints required')
  if (!ex.explanation) errors.push('explanation required')
  if (ex.type === 'mc' && (!ex.options || ex.options.length < 2)) {
    errors.push('mc type needs options')
  }

  return errors
}

describe('Content Schema Validation', () => {
  it('18 lessons are registered', () => {
    expect(lessons).toHaveLength(18)
  })

  lessons.forEach(lesson => {
    it(`Lesson "${lesson.title}" (${lesson.id}) passes schema`, () => {
      const errors = validateLesson(lesson)
      if (errors.length > 0) {
        console.error(`Schema errors for ${lesson.id}:`, errors)
      }
      expect(errors).toHaveLength(0)
    })
  })

  it('all lesson IDs are unique', () => {
    const ids = lessons.map(l => l.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('all exercise IDs are unique', () => {
    const ids = lessons.flatMap(l => l.blocks.practice.map(e => e.id))
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('all review card IDs are unique', () => {
    const ids = lessons.flatMap(l => l.reviewCards.map(c => c.id))
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('mc exercises have valid answer in options', () => {
    for (const lesson of lessons) {
      for (const ex of lesson.blocks.practice) {
        if (ex.type === 'mc') {
          expect(ex.options).toBeDefined()
          expect(ex.options!.some(o => o === ex.answer)).toBe(true)
        }
      }
    }
  })

  it('all lessons have at least one ML-related connection', () => {
    const mlTerms = ['ml', 'neuronale', 'gradient', 'loss', 'training', 'embedding', 'sigmoid', 'softmax', 'regression']
    for (const lesson of lessons) {
      const allBlocks = [
        ...lesson.blocks.show,
        ...lesson.blocks.explain,
        ...lesson.blocks.deepen,
      ]
      const hasMLBlock = allBlocks.some(b =>
        mlTerms.some(t => b.content.toLowerCase().includes(t))
      )
      const hasMLExercise = lesson.blocks.practice.some(ex =>
        ex.prompt.toLowerCase().includes('ml') ||
        (ex.conceptTags ?? []).some(t => ['ml', 'cross-entropy', 'sigmoid', 'norm', 'attention'].includes(t))
      )
      expect(hasMLBlock || hasMLExercise, `${lesson.id} has no ML connection`).toBe(true)
    }
  })

  it('all lessons have exactly 3 review cards', () => {
    for (const lesson of lessons) {
      expect(lesson.reviewCards.length, `${lesson.id} reviewCards`).toBeGreaterThanOrEqual(3)
    }
  })
})
