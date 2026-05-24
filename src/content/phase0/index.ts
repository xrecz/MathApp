import type { PhaseUnit } from '../../types'
import { brueche } from './01-brueche'
import { lineareFunktionen } from './02-lineare-funktionen'
import { ersteAbleitungen } from './03-erste-ableitungen'
import { potenzenWurzeln } from './04-potenzen-wurzeln'
import { termumformungen } from './05-termumformungen'
import { quadratischeGleichungen } from './06-quadratische-gleichungen'
import { ungleichungen } from './07-ungleichungen'
import { quadratischeFunktionen } from './08-quadratische-funktionen'
import { exponentialfunktionen } from './09-exponentialfunktionen'
import { logarithmus } from './10-logarithmus'
import { trigonometrie } from './11-trigonometrie'
import { vektoren } from './12-vektoren'
import { skalarprodukt } from './13-skalarprodukt'
import { mengenLogik } from './14-mengen-logik'
import { notation } from './15-notation'
import { deskriptiveStatistik } from './16-deskriptive-statistik'
import { wahrscheinlichkeit } from './17-wahrscheinlichkeit'
import { histogramme } from './18-histogramme'

export const phase0: PhaseUnit = {
  phase: 0,
  title: 'Brücke: Realschule → Studienreife',
  topics: [
    {
      id: 'p0.rechenfundament',
      title: 'Rechen-Fundament',
      prerequisites: [],
      lessons: [brueche, potenzenWurzeln, termumformungen, quadratischeGleichungen, ungleichungen],
    },
    {
      id: 'p0.funktionen',
      title: 'Funktionen',
      prerequisites: ['p0.rechenfundament'],
      lessons: [lineareFunktionen, ersteAbleitungen, quadratischeFunktionen, exponentialfunktionen, logarithmus, trigonometrie],
    },
    {
      id: 'p0.vektoren',
      title: 'Vektoren',
      prerequisites: ['p0.rechenfundament', 'p0.funktionen'],
      lessons: [vektoren, skalarprodukt],
    },
    {
      id: 'p0.notation',
      title: 'Notation & Logik',
      prerequisites: [],
      lessons: [mengenLogik, notation],
    },
    {
      id: 'p0.statistik',
      title: 'Statistik-Grundlagen',
      prerequisites: ['p0.rechenfundament'],
      lessons: [deskriptiveStatistik, wahrscheinlichkeit, histogramme],
    },
  ],
}
