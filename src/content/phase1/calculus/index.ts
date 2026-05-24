import type { Topic } from '../../../types'
import { grenzwerte } from './01-grenzwerte'
import { ableitungKonzept } from './02-ableitung-konzept'
import { ableitungsregeln } from './03-ableitungsregeln'
import { kettenregel } from './04-kettenregel'
import { mlAbleitungen } from './05-ml-ableitungen'
import { extremaTaylor } from './06-extrema-taylor'
import { multivariableFunktionen } from './07-multivariable-funktionen'
import { partielleAbleitungenGradient } from './08-partielle-ableitungen-gradient'
import { multivariateKettenregelBackprop } from './09-multivariate-kettenregel-backprop'
import { jacobiHesse } from './10-jacobi-hesse'

export const calculusTopic: Topic = {
  id: 'p1.calculus',
  title: 'Calculus / Analysis',
  prerequisites: ['p0.erste-ableitungen', 'p0.exponentialfunktionen', 'p0.logarithmus', 'p1.vektoren-formal'],
  lessons: [
    grenzwerte,
    ableitungKonzept,
    ableitungsregeln,
    kettenregel,
    mlAbleitungen,
    extremaTaylor,
    multivariableFunktionen,
    partielleAbleitungenGradient,
    multivariateKettenregelBackprop,
    jacobiHesse,
  ],
}
