import type { Lesson } from '../../types'

export const exponentialfunktionen: Lesson = {
  id: 'p0.exponentialfunktionen',
  title: 'Exponentialfunktionen & die Zahl e',
  conceptTags: ['function', 'exponential', 'growth', 'euler'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Exponentialfunktionen\n\nBei $f(x) = a^x$ steht die Variable im **Exponenten** — das ist das Gegenteil von $f(x) = x^a$ (Potenzfunktion). Exponentialfunktionen wachsen dramatisch schnell. Die wichtigste Basis ist die **Euler-Zahl** $e \\approx 2{,}71828$.',
      },
      {
        kind: 'math',
        content: '$$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n \\approx 2{,}71828$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Die Sigmoid-Funktion $\\sigma(x) = \\frac{1}{1+e^{-x}}$ und Softmax basieren beide auf $e^x$. Sie sind die wichtigsten Aktivierungsfunktionen in neuronalen Netzen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Warum $e$?\n\n$e^x$ ist seine eigene Ableitung: $\\frac{d}{dx} e^x = e^x$. Das macht Ableitungen von Modellen (Backpropagation!) einfach berechenbar.\n\n**Verhalten**:\n- $e^0 = 1$\n- $e^x \\to \\infty$ für $x \\to +\\infty$\n- $e^{-x} \\to 0$ für $x \\to +\\infty$ (fällt zu 0)',
      },
      {
        kind: 'worked-example',
        content:
          '**Sigmoid**: $\\sigma(x) = \\frac{1}{1+e^{-x}}$\n\n$\\sigma(0) = \\frac{1}{1+e^0} = \\frac{1}{1+1} = 0{,}5$\n\n$\\sigma(\\infty) \\to \\frac{1}{1+0} = 1$ (wächst gegen 1)\n\n$\\sigma(-\\infty) \\to \\frac{1}{1+\\infty} = 0$ (fällt gegen 0)',
      },
    ],
    practice: [
      {
        id: 'p0.exp.ex1',
        difficulty: 1,
        conceptTags: ['exponential', 'euler'],
        type: 'numeric',
        prompt: 'Welchen Wert hat $e$ ungefähr? Gib auf 2 Nachkommastellen.',
        answer: 2.72,
        acceptedAlternatives: ['2.71', '2,71', '2,72', '2.718', '2,718'],
        hints: [
          '$e$ ist eine mathematische Konstante, ähnlich wie $\\pi$.',
          '$e \\approx 2{,}7...$',
          '$e \\approx 2{,}71828$, gerundet auf 2 Stellen: $2{,}72$.',
        ],
        explanation: '$e \\approx 2{,}71828$. Gerundet: $2{,}72$.',
      },
      {
        id: 'p0.exp.ex2',
        difficulty: 1,
        conceptTags: ['exponential'],
        type: 'numeric',
        prompt: 'Was ist $e^0$?',
        answer: 1,
        hints: [
          'Jede Basis hoch 0 ergibt 1.',
          '$a^0 = 1$ für alle $a \\neq 0$.',
          '$e^0 = 1$.',
        ],
        explanation: '$e^0 = 1$ — gilt für jede Basis: $a^0 = 1$.',
      },
      {
        id: 'p0.exp.ex3',
        difficulty: 2,
        conceptTags: ['exponential', 'growth'],
        type: 'mc',
        prompt: 'Welche Funktion wächst langfristig schneller als jedes Polynom?',
        options: ['$e^x$', '$x^{100}$', '$x^2 + 1000x$', '$\\ln(x)$'],
        answer: '$e^x$',
        hints: [
          'Polynome haben einen festen Grad, Exponentialfunktionen nicht.',
          '$e^x$ verdoppelt sich alle ~0,7 Einheiten.',
          'Für sehr großes $x$ überholt $e^x$ jedes Polynom.',
        ],
        explanation:
          '$e^x$ wächst schneller als jedes Polynom $x^n$, egal wie groß $n$ ist.',
      },
      {
        id: 'p0.exp.ex4',
        difficulty: 3,
        conceptTags: ['exponential', 'sigmoid', 'ml'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: Berechne $\\sigma(0) = \\frac{1}{1 + e^0}$.',
        answer: 0.5,
        acceptedAlternatives: ['0,5', '1/2', '0.50'],
        hints: [
          '$e^0 = 1$.',
          '$\\sigma(0) = \\frac{1}{1+1} = \\frac{1}{2}$.',
          '$\\frac{1}{2} = 0{,}5$.',
        ],
        explanation: '$\\sigma(0) = \\frac{1}{1+e^0} = \\frac{1}{1+1} = \\frac{1}{2} = 0{,}5$.',
      },
      {
        id: 'p0.exp.ex5',
        difficulty: 4,
        conceptTags: ['sigmoid', 'asymptote'],
        type: 'mc',
        prompt: 'Gegen welchen Wert nähert sich $\\sigma(x) = \\frac{1}{1+e^{-x}}$ für sehr großes positives $x$?',
        options: ['1', '0', '$\\infty$', '0,5'],
        answer: '1',
        hints: [
          'Für großes $x$ wird $e^{-x}$ sehr klein.',
          '$e^{-x} \\to 0$, also $\\sigma(x) = \\frac{1}{1+0} = ?$',
          '$\\frac{1}{1} = 1$.',
        ],
        explanation:
          'Für $x \\to +\\infty$: $e^{-x} \\to 0$, daher $\\sigma(x) \\to \\frac{1}{1+0} = 1$.',
        misconceptions: {
          '$\\infty$': 'Sigmoid ist beschränkt: $\\sigma(x) \\in (0, 1)$ für alle $x$.',
        },
      },
      {
        id: 'p0.exp.ex6',
        difficulty: 4,
        conceptTags: ['sigmoid', 'asymptote'],
        type: 'mc',
        prompt: 'Gegen welchen Wert nähert sich $\\sigma(x)$ für sehr großes negatives $x$?',
        options: ['0', '1', '$-\\infty$', '0,5'],
        answer: '0',
        hints: [
          'Für großes negatives $x$ wird $e^{-x} = e^{|x|}$ sehr groß.',
          '$\\sigma(x) = \\frac{1}{1 + \\text{(sehr große Zahl)}}$',
          'Nähert sich 0.',
        ],
        explanation:
          'Für $x \\to -\\infty$: $e^{-x} \\to \\infty$, daher $\\sigma(x) \\to 0$. Sigmoid liegt immer in $(0, 1)$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Sigmoid und Softmax\n\n**Sigmoid** bringt eine beliebige reelle Zahl in $(0, 1)$ — perfekt für binäre Klassifikation (Wahrscheinlichkeit für eine Klasse).\n\n**Softmax** verallgemeinert das auf mehrere Klassen:',
      },
      {
        kind: 'math',
        content:
          '$$\\text{softmax}(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$$',
      },
      {
        kind: 'callout',
        content:
          'Jedes Klassifikationsmodell — von logistischer Regression bis GPT — endet mit Softmax oder Sigmoid. Du hast gerade die mathematische Grundlage dieser Funktionen verstanden.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.exp.card1',
      front: 'Wert von $e$?',
      back: '$e \\approx 2{,}71828$',
      conceptTags: ['euler'],
    },
    {
      id: 'p0.exp.card2',
      front: 'Sigmoid-Formel?',
      back: '$\\sigma(x) = \\frac{1}{1+e^{-x}}$',
      conceptTags: ['sigmoid'],
    },
    {
      id: 'p0.exp.card3',
      front: 'Sigmoid-Wertebereich?',
      back: '$(0, 1)$ — offen an beiden Enden.',
      conceptTags: ['sigmoid'],
    },
  ],
}
