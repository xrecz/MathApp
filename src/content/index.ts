import type { Course } from '../types'

let _course: Course | null = null

export async function getCourse(): Promise<Course> {
  if (_course) return _course

  // All phases loaded as lazy chunks (code splitting)
  const [p0, p1, p2, p3, p4] = await Promise.all([
    import('./phase0/index').then(m => m.phase0),
    import('./phase1/index').then(m => m.phase1),
    import('./phase2/index').then(m => m.phase2),
    import('./phase3/index').then(m => m.phase3),
    import('./phase4/index').then(m => m.phase4),
  ])

  _course = {
    id: 'mathlab-de',
    title: 'MathLab DE — Realschule → ML/Deep Learning',
    phases: [p0, p1, p2, p3, p4],
  }

  return _course
}
