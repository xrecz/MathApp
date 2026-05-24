import type { PhaseUnit } from '../../types'
import { linalgTopic } from './linalg/index'
import { calculusTopic } from './calculus/index'
import { stochastikTopic } from './stochastik/index'

export const phase1: PhaseUnit = {
  phase: 1,
  title: 'Lineare Algebra & Calculus & Stochastik',
  topics: [linalgTopic, calculusTopic, stochastikTopic],
}
