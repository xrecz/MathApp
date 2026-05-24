import type { Lesson } from '../../types'

export const ungleichungen: Lesson = {
  id: 'p0.ungleichungen',
  title: 'Ungleichungen',
  conceptTags: ['inequality', 'constraint', 'interval'],
  estimatedMinutes: 10,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Ungleichungen\n\nUngleichungen beschreiben Wertebereiche statt exakter Gleichheit. Im ML stecken sie überall: Lernrate $\\eta > 0$, Wahrscheinlichkeit $p \\in [0, 1]$, Gewichts-Clipping $w \\in [-c, c]$.',
      },
      {
        kind: 'math',
        content:
          '$$x + 3 > 5 \\quad \\Rightarrow \\quad x > 2 \\qquad \\text{Lösung: alle } x \\text{ rechts von } 2$$',
      },
      {
        kind: 'callout',
        content:
          '**Wichtigste Regel**: Multiplizierst oder dividierst du mit einer **negativen** Zahl, dreht sich das Ungleichungszeichen um! $-x > 2 \\Rightarrow x < -2$.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Lösen wie eine Gleichung — bis auf die Vorzeichen-Regel\n\nSchritt-für-Schritt:\n1. Gleiche Terme zusammenfassen.\n2. Variablen auf eine Seite bringen.\n3. Bei Division/Multiplikation mit $< 0$: **Zeichen umdrehen**.\n\n**Intervall-Notation**:\n- $[a, b]$: beide Enden inklusive ($a \\leq x \\leq b$)\n- $(a, b)$: beide Enden exklusive ($a < x < b$)\n- $[a, \\infty)$: ab $a$ aufwärts',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel 1**: $-2x \\leq 6$\n\nDividiere durch $-2$ — Zeichen dreht sich: $x \\geq -3$\n\n**Beispiel 2**: $3x + 1 < 10$\n\n$3x < 9$ → $x < 3$. Lösung: $(-\\infty, 3)$.',
      },
    ],
    practice: [
      {
        id: 'p0.ineq.ex1',
        difficulty: 1,
        conceptTags: ['inequality'],
        type: 'mc',
        prompt: 'Lösung von $x + 3 > 5$?',
        options: ['$x > 2$', '$x < 2$', '$x > 8$', '$x = 2$'],
        answer: '$x > 2$',
        hints: [
          'Subtrahiere 3 auf beiden Seiten.',
          '$x + 3 - 3 > 5 - 3$',
          '$x > 2$.',
        ],
        explanation: '$x + 3 > 5 \\Rightarrow x > 5 - 3 = 2$.',
        misconceptions: {
          '$x < 2$': 'Das Zeichen dreht sich nur bei Multiplikation/Division durch eine negative Zahl.',
        },
      },
      {
        id: 'p0.ineq.ex2',
        difficulty: 2,
        conceptTags: ['inequality', 'sign-flip'],
        type: 'mc',
        prompt: 'Lösung von $-2x \\leq 6$?',
        options: ['$x \\geq -3$', '$x \\leq -3$', '$x \\geq 3$', '$x \\leq 3$'],
        answer: '$x \\geq -3$',
        hints: [
          'Dividiere durch $-2$ — Zeichen dreht sich!',
          '$-2x \\leq 6 \\div (-2)$: das $\\leq$ wird zu $\\geq$.',
          '$x \\geq -3$.',
        ],
        explanation:
          'Division durch $-2$ (negativ) → Zeichen dreht sich: $x \\geq \\frac{6}{-2} = -3$.',
        misconceptions: {
          '$x \\leq -3$': 'Division durch eine negative Zahl dreht das Ungleichungszeichen um!',
        },
      },
      {
        id: 'p0.ineq.ex3',
        difficulty: 2,
        conceptTags: ['constraint', 'probability'],
        type: 'mc',
        prompt: 'Wahrscheinlichkeiten $p$ erfüllen welche Ungleichung?',
        options: ['$0 \\leq p \\leq 1$', '$0 < p < 1$', '$p \\geq 0$', '$p \\leq 1$'],
        answer: '$0 \\leq p \\leq 1$',
        hints: [
          'Eine Wahrscheinlichkeit von 0 (unmöglich) und 1 (sicher) sind erlaubt.',
          'Also sind beide Grenzen inklusive.',
          '$p \\in [0, 1]$, geschrieben als $0 \\leq p \\leq 1$.',
        ],
        explanation:
          'Wahrscheinlichkeiten dürfen 0 (unmögliches Ereignis) und 1 (sicheres Ereignis) annehmen, daher $0 \\leq p \\leq 1$.',
        misconceptions: {
          '$0 < p < 1$': 'Das würde $p=0$ und $p=1$ ausschließen — beide sind gültige Wahrscheinlichkeiten.',
        },
      },
      {
        id: 'p0.ineq.ex4',
        difficulty: 3,
        conceptTags: ['interval', 'notation'],
        type: 'mc',
        prompt: 'Welches Intervall beschreibt $-1 < x \\leq 5$?',
        options: ['$(-1, 5]$', '$[-1, 5]$', '$(-1, 5)$', '$[-1, 5)$'],
        answer: '$(-1, 5]$',
        hints: [
          'Runde Klammer = exklusive (Grenze nicht enthalten).',
          'Eckige Klammer = inklusive (Grenze enthalten).',
          '$-1$ ist exklusiv (runde Klammer), $5$ ist inklusive (eckige Klammer): $(-1, 5]$.',
        ],
        explanation: '$-1 < x \\leq 5$: linke Grenze offen (runde Klammer), rechte Grenze geschlossen (eckige Klammer).',
        misconceptions: {
          '$[-1, 5]$': '[$-1$ müsste inklusive sein, aber die Bedingung ist $x > -1$, also exklusiv.',
        },
      },
      {
        id: 'p0.ineq.ex5',
        difficulty: 4,
        conceptTags: ['constraint', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Eine Lernrate $\\eta$ muss für Gradient Descent positiv sein. Welche Bedingung gilt?',
        options: ['$\\eta > 0$', '$\\eta \\geq 0$', '$\\eta < 0$', '$\\eta = 0{,}01$'],
        answer: '$\\eta > 0$',
        hints: [
          'Bei $\\eta = 0$ bewegt sich nichts — das ist kein Lernen.',
          'Bei $\\eta < 0$ würde das Modell in die falsche Richtung laufen.',
          'Strikt positiv, also $\\eta > 0$.',
        ],
        explanation:
          '$\\eta > 0$: strikt größer als 0 (nicht nur $\\geq 0$, denn $\\eta = 0$ bedeutet kein Update). Typische Werte: $0{,}001$ bis $0{,}1$.',
        misconceptions: {
          '$\\eta \\geq 0$': '$\\eta = 0$ ist nicht sinnvoll — kein Update, kein Training.',
        },
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Constraints in der Optimierung\n\nML-Optimierung ist oft **Constrained Optimization**: wir minimieren eine Funktion unter Nebenbedingungen, die als Ungleichungen formuliert sind.',
      },
      {
        kind: 'math',
        content:
          '$$\\min_w L(w) \\quad \\text{s.t.} \\quad \\|w\\|_1 \\leq C$$',
      },
      {
        kind: 'callout',
        content:
          'L1-Regularisierung (Lasso) ist genau das: minimiere den Loss, aber bleib unter einem Budget $C$ für die Summe der absoluten Gewichte. Langrange-Multiplikatoren und KKT-Bedingungen sind die Werkzeuge dafür — gebaut auf dem Fundament, das du gerade gelegt hast.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.ineq.card1',
      front: 'Wann dreht eine Ungleichung das Zeichen?',
      back: 'Bei Multiplikation oder Division mit einer negativen Zahl.',
      conceptTags: ['inequality'],
    },
    {
      id: 'p0.ineq.card2',
      front: 'Was bedeutet $x \\in [a, b]$?',
      back: '$a \\leq x \\leq b$ — beide Enden inklusive.',
      conceptTags: ['interval'],
    },
    {
      id: 'p0.ineq.card3',
      front: 'Wertebereich einer Wahrscheinlichkeit?',
      back: '$p \\in [0, 1]$',
      conceptTags: ['constraint', 'probability'],
    },
  ],
}
