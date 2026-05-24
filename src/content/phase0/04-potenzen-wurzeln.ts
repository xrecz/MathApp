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

  description:
    'Du lernst die fünf Potenzgesetze sowie negative und gebrochene Exponenten kennen — und vor allem *warum* sie gelten. Das ist das Fundament für L2-Norm, Weight Decay und MSE-Loss in jedem ML-Modell.',

  derivations: [
    {
      claim: '$a^0 = 1$ gilt für alle $a \\neq 0$',
      reasoning:
        'Schau auf das absteigende Muster: $a^3 \\to a^2 \\to a^1$ — jeder Schritt dividiert durch $a$. Der nächste Schritt: $a^1 \\div a = a/a = 1$. Algebraisch: $\\frac{a^n}{a^n} = 1$ (Bruch kürzen) und gleichzeitig $\\frac{a^n}{a^n} = a^{n-n} = a^0$ (Potenzgesetz). Beides muss gleich sein → $a^0 = 1$.',
    },
    {
      claim: '$a^{1/n} = \\sqrt[n]{a}$ für $a \\geq 0$',
      reasoning:
        'Wende das Potenz-von-Potenz-Gesetz an: $(a^{1/n})^n = a^{\\frac{1}{n} \\cdot n} = a^1 = a$. Die Zahl, die $n$-mal mit sich selbst multipliziert $a$ ergibt, ist per Definition $\\sqrt[n]{a}$. Also muss $a^{1/n} = \\sqrt[n]{a}$ sein.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$a^3 \\cdot a^4 = a^{12}$',
      correct: '$a^3 \\cdot a^4 = a^7$',
      explanation:
        'Bei Multiplikation gleicher Basen werden Exponenten **addiert** ($3+4=7$), nicht multipliziert. Multiplizieren gilt nur beim Potenz-von-Potenz-Gesetz: $(a^3)^4 = a^{12}$.',
    },
    {
      wrong: '$(a + b)^2 = a^2 + b^2$',
      correct: '$(a + b)^2 = a^2 + 2ab + b^2$',
      explanation:
        'Potenzen verteilen sich **nicht** über Addition! Das ist eine der häufigsten Fehlerquellen — auch im ML, z.B. beim Ausmultiplizieren von Termen im Gradientenabstieg.',
    },
    {
      wrong: '$(a^3)^4 = a^{3+4} = a^7$',
      correct: '$(a^3)^4 = a^{3 \\cdot 4} = a^{12}$',
      explanation:
        'Potenz-von-Potenz: Exponenten **multiplizieren** ($3 \\times 4 = 12$). Verwechslung mit dem Produkt-Gesetz ($a^m \\cdot a^n = a^{m+n}$) ist sehr häufig.',
    },
  ],

  furtherResources: [
    {
      title: 'BetterExplained: "Understanding Exponents (Why does 0^0 = 1?)"',
      type: 'article',
      note: 'Das "Expand-o-tron"-Modell macht Null- und Bruch-Exponenten wirklich intuitiv',
    },
    {
      title: 'Khan Academy: "The zeroth power" (Video)',
      type: 'video',
      note: 'Visuelles Abstiegs-Pattern; 3 Minuten',
    },
    {
      title: 'Serlo: "Potenzgesetze" — serlo.org/mathe/1867/potenzgesetze',
      type: 'article',
      note: 'Deutsche Referenz mit allen Regeln und Übungsaufgaben',
    },
  ],
}
