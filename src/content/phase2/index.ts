import type { PhaseUnit } from '../../types'

export const phase2: PhaseUnit = {
  phase: 2,
  title: 'Stochastik & Statistik',
  topics: [
    {
      id: 'p2.wahrscheinlichkeit',
      title: 'Wahrscheinlichkeitsrechnung',
      prerequisites: ['p0.brueche'],
      lessons: [],
    },
    {
      id: 'p2.statistik',
      title: 'Deskriptive Statistik',
      prerequisites: ['p2.wahrscheinlichkeit'],
      lessons: [],
    },
  ],
}
