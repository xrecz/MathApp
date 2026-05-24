import type { Topic } from '../../../types'
import { zufallsvariablen } from './01-zufallsvariablen'
import { pmfPdfCdf } from './02-pmf-pdf-cdf'
import { diskreteVerteilungen } from './03-diskrete-verteilungen'
import { kontinuierlicheVerteilungen } from './04-kontinuierliche-verteilungen'
import { erwartungswertVarianz } from './05-erwartungswert-varianz'
import { kovarianzMultivariateGauss } from './06-kovarianz-multivariate-gauss'
import { bedingteWahrscheinlichkeit } from './07-bedingte-wahrscheinlichkeit'
import { bayesTheorem } from './08-bayes-theorem'
import { mle } from './09-mle'
import { mapRegularisierungBiasVariance } from './10-map-regularisierung-bias-variance'

export const stochastikTopic: Topic = {
  id: 'p1.stochastik',
  title: 'Wahrscheinlichkeitstheorie & Statistik',
  prerequisites: ['p0.wahrscheinlichkeit', 'p0.deskriptive-statistik', 'p1.linalg'],
  lessons: [
    zufallsvariablen,
    pmfPdfCdf,
    diskreteVerteilungen,
    kontinuierlicheVerteilungen,
    erwartungswertVarianz,
    kovarianzMultivariateGauss,
    bedingteWahrscheinlichkeit,
    bayesTheorem,
    mle,
    mapRegularisierungBiasVariance,
  ],
}
