import type { Lesson } from '../../types'

export const wahrscheinlichkeit: Lesson = {
  id: 'p0.wahrscheinlichkeit',
  title: 'Wahrscheinlichkeit als relative Häufigkeit',
  conceptTags: ['probability', 'event', 'frequency', 'distribution'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Was ist Wahrscheinlichkeit?\n\nWahrscheinlichkeit misst, wie oft ein Ereignis bei sehr vielen Versuchen auftritt. Sie liegt immer zwischen 0 (unmöglich) und 1 (sicher). Im ML gibt jeder Klassifikator Wahrscheinlichkeiten aus — und du brauchst dieses Fundament, um sie zu interpretieren.',
      },
      {
        kind: 'math',
        content:
          '$$P(A) \\in [0, 1] \\qquad P(\\bar{A}) = 1 - P(A) \\qquad \\sum_i P(A_i) = 1$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Der Output einer Softmax-Schicht ist immer eine gültige Wahrscheinlichkeitsverteilung — alle Werte ≥ 0, Summe = 1. Jeder Klassifikator gibt dir solche Verteilungen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Laplace-Wahrscheinlichkeit\n\nBei gleich wahrscheinlichen Ergebnissen:\n\n$P(A) = \\frac{\\text{Anzahl günstige Ergebnisse}}{\\text{Anzahl mögliche Ergebnisse}}$\n\n**Beispiel Würfel**: $P(\\text{gerade Zahl}) = \\frac{3}{6} = 0{,}5$\n\n### Komplement\n\n$P(\\bar{A}) = 1 - P(A)$\n\nWenn $P(\\text{Regen}) = 0{,}3$, dann $P(\\text{kein Regen}) = 0{,}7$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Gültige vs. ungültige Verteilung**:\n\n$(0{,}1,\\; 0{,}3,\\; 0{,}6)$: Summe = $1{,}0$ ✓ — gültig\n\n$(0{,}2,\\; 0{,}3,\\; 0{,}6)$: Summe = $1{,}1$ ✗ — ungültig\n\nSoftmax garantiert immer eine gültige Verteilung.',
      },
    ],
    practice: [
      {
        id: 'p0.prob.ex1',
        difficulty: 1,
        conceptTags: ['probability'],
        type: 'mc',
        prompt: 'Wahrscheinlichkeit für "6 würfeln" mit einem fairen Würfel?',
        options: ['$\\frac{1}{6}$', '$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{5}{6}$'],
        answer: '$\\frac{1}{6}$',
        hints: [
          'Ein fairer Würfel hat 6 gleich wahrscheinliche Seiten.',
          'Genau eine Seite zeigt 6.',
          '$P(6) = \\frac{1}{6} \\approx 0{,}167$.',
        ],
        explanation: '$P(6) = \\frac{1 \\text{ günstig}}{6 \\text{ möglich}} = \\frac{1}{6}$.',
      },
      {
        id: 'p0.prob.ex2',
        difficulty: 2,
        conceptTags: ['probability'],
        type: 'numeric',
        prompt: 'Wahrscheinlichkeit für "gerade Zahl" beim Würfeln?',
        answer: 0.5,
        acceptedAlternatives: ['0,5', '1/2', '3/6'],
        hints: [
          'Gerade Zahlen beim Würfel: 2, 4, 6 — das sind 3 von 6.',
          '$P = \\frac{3}{6}$.',
          '$\\frac{3}{6} = 0{,}5$.',
        ],
        explanation: '$P(\\text{gerade}) = \\frac{3}{6} = 0{,}5$.',
      },
      {
        id: 'p0.prob.ex3',
        difficulty: 2,
        conceptTags: ['complement'],
        type: 'numeric',
        prompt: '$P(\\text{Regen}) = 0{,}3$. Wie groß ist $P(\\text{kein Regen})$?',
        answer: 0.7,
        acceptedAlternatives: ['0,7', '7/10'],
        hints: [
          'Komplement-Wahrscheinlichkeit: $P(\\bar{A}) = 1 - P(A)$.',
          '$1 - 0{,}3 = ?$',
          '$1 - 0{,}3 = 0{,}7$.',
        ],
        explanation: '$P(\\text{kein Regen}) = 1 - 0{,}3 = 0{,}7$.',
      },
      {
        id: 'p0.prob.ex4',
        difficulty: 3,
        conceptTags: ['distribution', 'ml'],
        type: 'mc',
        prompt:
          'Klassifikator-Output: $(0{,}1,\\; 0{,}3,\\; 0{,}6)$ für 3 Klassen. Ist das eine gültige Verteilung?',
        options: ['Ja — Summe = 1, alle Werte ≥ 0', 'Nein — Werte sind zu klein', 'Nein — Summe stimmt nicht'],
        answer: 'Ja — Summe = 1, alle Werte ≥ 0',
        hints: [
          'Prüfe: sind alle Werte $\\geq 0$?',
          'Prüfe: $0{,}1 + 0{,}3 + 0{,}6 = ?$',
          '$1{,}0$ — gültig.',
        ],
        explanation: '$0{,}1 + 0{,}3 + 0{,}6 = 1{,}0$ und alle $\\geq 0$ → gültige Wahrscheinlichkeitsverteilung.',
      },
      {
        id: 'p0.prob.ex5',
        difficulty: 3,
        conceptTags: ['distribution'],
        type: 'mc',
        prompt: 'Klassifikator-Output: $(0{,}2,\\; 0{,}3,\\; 0{,}6)$. Gültig?',
        options: ['Nein — Summe ist 1,1', 'Ja — alle Werte ≥ 0', 'Nein — 0,2 ist zu klein'],
        answer: 'Nein — Summe ist 1,1',
        hints: [
          'Prüfe die Summe: $0{,}2 + 0{,}3 + 0{,}6 = ?$',
          '$1{,}1 \\neq 1$.',
          'Die Summe muss genau 1 sein.',
        ],
        explanation: '$0{,}2 + 0{,}3 + 0{,}6 = 1{,}1 \\neq 1$ → ungültig. Softmax garantiert Summe = 1.',
      },
      {
        id: 'p0.prob.ex6',
        difficulty: 4,
        conceptTags: ['probability', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Ein Spam-Filter schätzt $P(\\text{Spam}) = 0{,}95$. Wie groß ist $P(\\text{kein Spam})$?',
        answer: 0.05,
        acceptedAlternatives: ['0,05', '5/100', '1/20'],
        hints: [
          'Komplement-Wahrscheinlichkeit.',
          '$1 - 0{,}95 = ?$',
          '$1 - 0{,}95 = 0{,}05$.',
        ],
        explanation: '$P(\\text{kein Spam}) = 1 - 0{,}95 = 0{,}05$. Das Modell ist zu 95 % sicher, Spam erkannt zu haben.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Wahrscheinlichkeiten in ML\n\nJedes Klassifikationsmodell — von logistischer Regression über Random Forest bis zu GPT — gibt am Ende eine Wahrscheinlichkeitsverteilung über Klassen aus. Softmax garantiert:',
      },
      {
        kind: 'math',
        content: '$$\\sum_i \\hat{y}_i = 1 \\qquad \\hat{y}_i \\geq 0 \\quad \\forall i$$',
      },
      {
        kind: 'callout',
        content:
          'Wenn du sagst "das Modell ist zu 80 % sicher", meinst du: $P(\\text{Klasse A}) = 0{,}8$. Diese Intuition kommt direkt aus dem, was du gerade gelernt hast. Cross-Entropy-Loss bestraft dann Modelle, die bei richtigen Klassen zu niedrige Wahrscheinlichkeiten ausgeben.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.prob.card1',
      front: 'Laplace-Wahrscheinlichkeit?',
      back: '$\\frac{\\text{günstige}}{\\text{mögliche}}$ Ergebnisse.',
      conceptTags: ['probability'],
    },
    {
      id: 'p0.prob.card2',
      front: 'Komplement-Wahrscheinlichkeit?',
      back: '$P(\\bar{A}) = 1 - P(A)$',
      conceptTags: ['complement'],
    },
    {
      id: 'p0.prob.card3',
      front: 'Wertebereich einer Wahrscheinlichkeit?',
      back: '$P(A) \\in [0, 1]$',
      conceptTags: ['probability'],
    },
  ],
}
