import type { Course, PhaseUnit } from '../types'
import { brueche } from './phase0/01-brueche'
import { lineareFunktionen } from './phase0/02-lineare-funktionen'
import { ersteAbleitungen } from './phase0/03-erste-ableitungen'

const phase0: PhaseUnit = {
  phase: 0,
  title: 'Mathematische Grundlagen',
  topics: [
    {
      id: 'p0.grundrechenarten',
      title: 'Grundrechenarten & Brüche',
      prerequisites: [],
      lessons: [brueche],
    },
    {
      id: 'p0.funktionen',
      title: 'Funktionen & Analysis',
      prerequisites: ['p0.grundrechenarten'],
      lessons: [lineareFunktionen, ersteAbleitungen],
    },
  ],
}

let _course: Course | null = null

export async function getCourse(): Promise<Course> {
  if (_course) return _course

  // Dynamic imports for phases 1–4 (code splitting)
  const [p1, p2, p3, p4] = await Promise.all([
    import('./phase1/index').then(m => m.phase1),
    import('./phase2/index').then(m => m.phase2),
    import('./phase3/index').then(m => m.phase3),
    import('./phase4/index').then(m => m.phase4),
  ])

  _course = {
    id: 'mathlab-de',
    title: 'MathLab DE — Realschule → ML/Deep Learning',
    phases: [phase0, p1, p2, p3, p4],
  }

  return _course
}
