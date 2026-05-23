import type { PhaseUnit } from '../../types'

export const phase1: PhaseUnit = {
  phase: 1,
  title: 'Lineare Algebra & Calculus',
  topics: [
    {
      id: 'p1.vektoren',
      title: 'Vektoren',
      prerequisites: ['p0.lineare-funktionen'],
      lessons: [],
    },
    {
      id: 'p1.matrizen',
      title: 'Matrizen',
      prerequisites: ['p1.vektoren'],
      lessons: [],
    },
    {
      id: 'p1.partielle-ableitungen',
      title: 'Partielle Ableitungen',
      prerequisites: ['p0.ableitungen'],
      lessons: [],
    },
  ],
}
