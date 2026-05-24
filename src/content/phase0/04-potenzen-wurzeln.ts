import type { Lesson } from '../../types'

export const potenzenWurzeln: Lesson = {
  id: 'p0.potenzen-wurzeln',
  title: 'Potenzen & Wurzeln',
  conceptTags: ['exponent', 'power', 'root', 'algebra'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Potenzen & Wurzeln\n\nEine **Potenz** $a^n$ bedeutet: $a$ wird $n$-mal mit sich selbst multipliziert. Negative Exponenten drehen das um — aus dem Zähler wird ein Nenner. Bruch-Exponenten sind Wurzeln.',
      },
      {
        kind: 'math',
        content:
          '$$a^{-n} = \\frac{1}{a^n} \\qquad a^{1/n} = \\sqrt[n]{a} \\qquad a^0 = 1$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Die L2-Norm $\\|x\\| = \\sqrt{x_1^2 + x_2^2 + \\ldots}$ misst die Länge von Vektoren — z.B. die Distanz zwischen Embeddings in einem Sprachmodell.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content: '### Die 5 Potenzgesetze\n\nDiese Regeln gelten immer, solange die Basis $\\neq 0$ ist:',
      },
      {
        kind: 'math',
        content:
          '$$a^m \\cdot a^n = a^{m+n} \\qquad (a^m)^n = a^{m \\cdot n} \\qquad \\frac{a^m}{a^n} = a^{m-n}$$',
      },
      {
        kind: 'math',
        content: '$$a^{-n} = \\frac{1}{a^n} \\qquad a^{1/n} = \\sqrt[n]{a}$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $2^3 \\cdot 2^2 = 2^{3+2} = 2^5 = 32$\n\n**Beispiel**: $4^{1/2} = \\sqrt{4} = 2$\n\n**Beispiel**: $3^{-2} = \\frac{1}{3^2} = \\frac{1}{9} \\approx 0{,}111$',
      },
    ],
    practice: [
      {
        id: 'p0.potenzen.ex1',
        difficulty: 1,
        conceptTags: ['exponent'],
        type: 'numeric',
        prompt: 'Berechne $3^4$.',
        answer: 81,
        hints: [
          '$3^4$ bedeutet $3 \\cdot 3 \\cdot 3 \\cdot 3$.',
          '$3 \\cdot 3 = 9$, dann $9 \\cdot 9 = ?$',
          '$9 \\cdot 9 = 81$.',
        ],
        explanation: '$3^4 = 3 \\cdot 3 \\cdot 3 \\cdot 3 = 81$.',
      },
      {
        id: 'p0.potenzen.ex2',
        difficulty: 2,
        conceptTags: ['exponent', 'algebra'],
        type: 'mc',
        prompt: 'Vereinfache $a^3 \\cdot a^2$.',
        options: ['$a^5$', '$a^6$', '$2a^5$', '$a^1$'],
        answer: '$a^5$',
        hints: [
          'Beim Multiplizieren von Potenzen mit gleicher Basis addiert man die Exponenten.',
          '$a^m \\cdot a^n = a^{m+n}$',
          '$a^3 \\cdot a^2 = a^{3+2} = a^5$.',
        ],
        explanation: '$a^3 \\cdot a^2 = a^{3+2} = a^5$ (Potenzgesetz: Exponent addieren).',
        misconceptions: {
          '$a^6$': 'Beim Multiplizieren addiert man Exponenten, nicht multipliziert: $3 + 2 = 5$, nicht $6$.',
        },
      },
      {
        id: 'p0.potenzen.ex3',
        difficulty: 2,
        conceptTags: ['root'],
        type: 'numeric',
        prompt: 'Berechne $\\sqrt{144}$.',
        answer: 12,
        hints: [
          'Welche Zahl ergibt quadriert 144?',
          '$10^2 = 100$, $12^2 = ?$',
          '$12 \\cdot 12 = 144$, also $\\sqrt{144} = 12$.',
        ],
        explanation: '$\\sqrt{144} = 12$, weil $12^2 = 144$.',
      },
      {
        id: 'p0.potenzen.ex4',
        difficulty: 3,
        conceptTags: ['exponent', 'negative'],
        type: 'numeric',
        prompt: 'Was ist $2^{-2}$? Gib die Dezimalzahl an.',
        answer: 0.25,
        acceptedAlternatives: ['0,25', '1/4', '0.25'],
        hints: [
          'Negativer Exponent bedeutet: Kehrwert bilden.',
          '$2^{-2} = \\frac{1}{2^2}$',
          '$\\frac{1}{4} = 0{,}25$.',
        ],
        explanation: '$2^{-2} = \\frac{1}{2^2} = \\frac{1}{4} = 0{,}25$.',
      },
      {
        id: 'p0.potenzen.ex5',
        difficulty: 4,
        conceptTags: ['root', 'norm'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Die L2-Norm des Vektors $(3, 4)$ ist $\\sqrt{3^2 + 4^2}$. Berechne sie.',
        answer: 5,
        hints: [
          'Berechne zuerst $3^2$ und $4^2$.',
          '$3^2 + 4^2 = 9 + 16 = 25$.',
          '$\\sqrt{25} = 5$.',
        ],
        explanation:
          '$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. Das ist der bekannte 3-4-5-Pythagoras-Satz.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## L2-Norm in ML\n\nDie L2-Norm $\\|x\\| = \\sqrt{\\sum_i x_i^2}$ ist die Standard-Distanz im ML. Sie steckt in drei wichtigen Konzepten:',
      },
      {
        kind: 'text',
        content:
          '**L2-Regularisierung (Weight Decay)**: Bestraft große Gewichte durch $\\lambda \\|w\\|^2$. Verhindert Overfitting.\n\n**Embedding-Distanz**: Wie ähnlich sind zwei Wörter oder Sätze? Misst man mit dem Abstand ihrer Embedding-Vektoren.\n\n**MSE-Loss**: $\\frac{1}{n} \\sum (\\hat{y}_i - y_i)^2$ ist im Kern das Quadrat der L2-Norm des Fehlers.',
      },
      {
        kind: 'callout',
        content:
          'Potenzen und Wurzeln sind nicht abstrakte Gymnasialstoff — sie stecken in jedem Trainingsschritt eines neuronalen Netzes.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.potenzen.card1',
      front: 'Was bedeutet $a^{-n}$?',
      back: '$\\frac{1}{a^n}$ — der Kehrwert der Potenz.',
      conceptTags: ['exponent'],
    },
    {
      id: 'p0.potenzen.card2',
      front: 'Wie schreibt man $\\sqrt{a}$ als Potenz?',
      back: '$a^{1/2}$',
      conceptTags: ['root'],
    },
    {
      id: 'p0.potenzen.card3',
      front: 'L2-Norm in $\\mathbb{R}^2$?',
      back: '$\\|x\\| = \\sqrt{x_1^2 + x_2^2}$',
      conceptTags: ['norm'],
    },
  ],
}
