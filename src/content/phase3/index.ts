import type { PhaseUnit } from '../../types'

export const phase3: PhaseUnit = {
  phase: 3,
  title: 'ML-Kern',
  topics: [
    {
      id: 'p3.regression',
      title: 'Lineare Regression',
      prerequisites: ['p1.matrizen', 'p2.statistik'],
      lessons: [],
    },
    {
      id: 'p3.neuronale-netze',
      title: 'Neuronale Netze',
      prerequisites: ['p3.regression'],
      lessons: [],
    },
  ],
}
