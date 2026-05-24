import type { Topic } from '../../../types'
import { vektorenFormal } from './01-vektoren-formal'
import { normSkalarprodukt } from './02-norm-skalarprodukt'
import { matrizenLineareAbbildungen } from './03-matrizen-lineare-abbildungen'
import { matrixMultiplikation } from './04-matrix-multiplikation'
import { inverseTransponierte } from './05-inverse-transponierte'
import { lgsGauss } from './06-lgs-gauss'
import { vektorraeumeBasisRang } from './07-vektorraeume-basis-rang'
import { determinante } from './08-determinante'
import { eigenwerteEigenvektoren } from './09-eigenwerte-eigenvektoren'
import { spektraltheorem } from './10-spektraltheorem'
import { svd } from './11-svd'
import { tensorenMlBruecke } from './12-tensoren-ml-bruecke'

export const linalgTopic: Topic = {
  id: 'p1.linalg',
  title: 'Lineare Algebra',
  prerequisites: ['p0.vektoren', 'p0.rechenfundament'],
  lessons: [
    vektorenFormal,
    normSkalarprodukt,
    matrizenLineareAbbildungen,
    matrixMultiplikation,
    inverseTransponierte,
    lgsGauss,
    vektorraeumeBasisRang,
    determinante,
    eigenwerteEigenvektoren,
    spektraltheorem,
    svd,
    tensorenMlBruecke,
  ],
}
