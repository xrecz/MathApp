import type { PhaseUnit } from '../../types'
import { linalgTopic } from './linalg/index'
import { calculusTopic } from './calculus/index'

export const phase1: PhaseUnit = {
  phase: 1,
  title: 'Lineare Algebra & Calculus',
  topics: [
    linalgTopic,
    calculusTopic,
    {
      id: 'p1.stochastik',
      title: 'Wahrscheinlichkeitstheorie',
      prerequisites: ['p0.statistik'],
      lessons: [],
    },
  ],
}
