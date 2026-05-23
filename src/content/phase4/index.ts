import type { PhaseUnit } from '../../types'

export const phase4: PhaseUnit = {
  phase: 4,
  title: 'Deep Learning & Spezialthemen',
  topics: [
    {
      id: 'p4.cnn',
      title: 'Convolutional Neural Networks',
      prerequisites: ['p3.neuronale-netze'],
      lessons: [],
    },
    {
      id: 'p4.transformer',
      title: 'Transformer & Attention',
      prerequisites: ['p4.cnn'],
      lessons: [],
    },
  ],
}
