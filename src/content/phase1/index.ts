import type { PhaseUnit } from '../../types'
import { linalgTopic } from './linalg/index'

export const phase1: PhaseUnit = {
  phase: 1,
  title: 'Lineare Algebra & Calculus',
  topics: [
    linalgTopic,
    {
      id: 'p1.calculus',
      title: 'Mehrdimensionaler Kalkül',
      prerequisites: ['p1.linalg', 'p0.funktionen'],
      lessons: [],
    },
    {
      id: 'p1.stochastik',
      title: 'Wahrscheinlichkeitstheorie',
      prerequisites: ['p0.statistik'],
      lessons: [],
    },
  ],
}
