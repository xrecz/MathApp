import type { Lesson } from '../../types'

export const notation: Lesson = {
  id: 'p0.notation',
  title: 'Mathematische Notation (ML-Spezifisch)',
  conceptTags: ['notation', 'sigma', 'sum', 'expectation', 'argmax'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## ML-Notation lesen\n\nML-Papers nutzen kompakte mathematische Notation. Die häufigsten Symbole: $\\sum$ (Summe), $\\prod$ (Produkt), $\\mathbb{E}[\\cdot]$ (Erwartungswert), $\\arg\\max$, $\\arg\\min$, $\\propto$ (proportional zu).',
      },
      {
        kind: 'math',
        content:
          '$$\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\ldots + x_n \\qquad f: \\mathbb{R}^n \\to \\mathbb{R}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: "$\\hat{y} = \\arg\\max_y P(y \\mid x)$" — Vorhersage = die Klasse mit höchster bedingter Wahrscheinlichkeit. Jeder Klassifikator macht das bei der Inferenz.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Summen-Zeichen $\\sum$\n\n$\\sum_{i=1}^{n} a_i = a_1 + a_2 + \\ldots + a_n$\n\n**Lauf-Index** $i$: von 1 bis $n$. Jedes Mal wird $a_i$ addiert.\n\n### Funktionssignaturen\n\n$f: \\mathbb{R}^n \\to \\mathbb{R}$: nimmt einen $n$-dimensionalen Vektor, gibt einen Skalar zurück (typisch für Loss-Funktionen).\n\n$f: \\mathbb{R}^{m \\times n} \\to \\mathbb{R}^m$: nimmt eine Matrix, gibt einen Vektor zurück.',
      },
      {
        kind: 'worked-example',
        content:
          '**MSE-Loss als Summe**: $L(w) = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2$\n\nDas ist der Durchschnitt der quadrierten Fehler über alle $n$ Datenpunkte.\n\n**$\\arg\\max$**: $\\hat{y} = \\arg\\max_j p_j$ — wähle den Index $j$ mit dem größten $p_j$.',
      },
    ],
    practice: [
      {
        id: 'p0.nota.ex1',
        difficulty: 1,
        conceptTags: ['sum'],
        type: 'numeric',
        prompt: 'Berechne $\\sum_{i=1}^{4} i$ (Summe von 1 bis 4).',
        answer: 10,
        hints: [
          '$\\sum_{i=1}^{4} i = 1 + 2 + 3 + 4$',
          '$1 + 2 = 3$, dann $3 + 3 = 6$, dann $6 + 4 = ?$',
          '$6 + 4 = 10$.',
        ],
        explanation: '$\\sum_{i=1}^{4} i = 1 + 2 + 3 + 4 = 10$.',
      },
      {
        id: 'p0.nota.ex2',
        difficulty: 2,
        conceptTags: ['sum'],
        type: 'numeric',
        prompt: 'Berechne $\\sum_{i=1}^{3} i^2$ (Summe der Quadrate von 1 bis 3).',
        answer: 14,
        hints: [
          '$1^2 + 2^2 + 3^2$',
          '$1 + 4 + 9 = ?$',
          '$1 + 4 + 9 = 14$.',
        ],
        explanation: '$\\sum_{i=1}^{3} i^2 = 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14$.',
      },
      {
        id: 'p0.nota.ex3',
        difficulty: 2,
        conceptTags: ['notation', 'function'],
        type: 'mc',
        prompt: 'Was bedeutet $f: \\mathbb{R}^2 \\to \\mathbb{R}$?',
        options: [
          'Eine Funktion, die einen 2D-Vektor nimmt und eine Zahl zurückgibt',
          'Eine Funktion, die eine Zahl nimmt und einen 2D-Vektor zurückgibt',
          'Eine Funktion von reellen Zahlen zu reellen Zahlen',
          'Eine Funktion, die zwei Zahlen nimmt und zwei zurückgibt',
        ],
        answer: 'Eine Funktion, die einen 2D-Vektor nimmt und eine Zahl zurückgibt',
        hints: [
          '$\\mathbb{R}^2$ ist die Eingabe (ein 2D-Vektor).',
          '$\\to \\mathbb{R}$ ist die Ausgabe (eine einzelne reelle Zahl).',
          'Typisches Beispiel: eine Loss-Funktion mit 2 Parametern.',
        ],
        explanation:
          '$f: \\mathbb{R}^2 \\to \\mathbb{R}$ nimmt einen 2-dimensionalen Vektor und gibt einen Skalar aus.',
      },
      {
        id: 'p0.nota.ex4',
        difficulty: 3,
        conceptTags: ['argmax'],
        type: 'mc',
        prompt: 'Was bedeutet $\\arg\\max_x f(x)$?',
        options: [
          'Das $x$, bei dem $f$ am größten ist',
          'Der maximale Wert von $f$',
          'Das $x$, bei dem $f$ am kleinsten ist',
          'Die Ableitung von $f$',
        ],
        answer: 'Das $x$, bei dem $f$ am größten ist',
        hints: [
          '$\\arg$ steht für "Argument" — nicht den Wert, sondern die Eingabe.',
          '$\\max$ steht für Maximum.',
          '$\\arg\\max_x f(x)$ = das $x$, für das $f(x)$ maximal ist.',
        ],
        explanation:
          '$\\arg\\max_x f(x)$ gibt das $x$ zurück, nicht den Maximalwert. Beispiel: bei $f(x) = -(x-3)^2$ ist $\\arg\\max_x f(x) = 3$.',
        misconceptions: {
          'Der maximale Wert von $f$': 'Das wäre $\\max_x f(x)$. $\\arg\\max$ gibt das Argument (Eingabe), nicht den Wert.',
        },
      },
      {
        id: 'p0.nota.ex5',
        difficulty: 3,
        conceptTags: ['argmax', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Softmax-Output ist $(0{,}1,\\; 0{,}7,\\; 0{,}2)$ für (Hund, Katze, Vogel). Was ergibt $\\arg\\max$?',
        options: ['Katze (Index 1)', 'Hund (Index 0)', 'Vogel (Index 2)', '0,7'],
        answer: 'Katze (Index 1)',
        hints: [
          '$\\arg\\max$ sucht das Element mit dem höchsten Wert.',
          'Die Werte sind $0{,}1$, $0{,}7$, $0{,}2$. Welcher ist am größten?',
          '$0{,}7$ ist am größten, das ist Index 1 (Katze).',
        ],
        explanation:
          '$\\arg\\max(0{,}1, 0{,}7, 0{,}2) = 1$ (Index der Katze). Die Vorhersage ist "Katze".',
        misconceptions: {
          '0,7': 'Das ist $\\max$, nicht $\\arg\\max$. $\\arg\\max$ gibt den Index zurück, nicht den Wert.',
        },
      },
      {
        id: 'p0.nota.ex6',
        difficulty: 4,
        conceptTags: ['sum', 'cross-entropy'],
        type: 'mc',
        prompt:
          'Was bedeutet $\\sum_{i=1}^{n} y_i \\log \\hat{y}_i$ im Kontext von Cross-Entropy?',
        options: [
          'Summe der Log-Likelihoods: wie gut das Modell die Labels erklärt',
          'Summe aller Vorhersagen',
          'Mittelwert der Fehler',
          'Produkt aller Wahrscheinlichkeiten',
        ],
        answer: 'Summe der Log-Likelihoods: wie gut das Modell die Labels erklärt',
        hints: [
          '$y_i$ sind die wahren Labels, $\\hat{y}_i$ die Vorhersagen.',
          '$\\log \\hat{y}_i$ ist negativ (da $0 < \\hat{y}_i \\leq 1$), summiert über Klassen.',
          'Die Cross-Entropy ist $-\\sum y_i \\log \\hat{y}_i$ — negiert, damit wir minimieren.',
        ],
        explanation:
          '$\\sum y_i \\log \\hat{y}_i$ ist die Log-Likelihood. Cross-Entropy ist das Negative davon, damit wir minimieren können (weniger = besser).',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Notation als Sprache\n\nEin typischer Satz aus einem ML-Paper: "$\\hat{y} = \\arg\\max_y P(y \\mid x)$". Übersetzt: "Die Vorhersage ist diejenige Klasse $y$, für die die bedingte Wahrscheinlichkeit gegeben $x$ maximal ist."',
      },
      {
        kind: 'text',
        content:
          'Oder aus dem Transformer-Paper: "$\\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V$"\n\nJetzt kannst du lesen: das ist ein Softmax auf dem Produkt zweier Matrizen $Q$ und $K$, skaliert durch $\\sqrt{d_k}$, multipliziert mit $V$.',
      },
      {
        kind: 'callout',
        content:
          'Mit dieser Lektion hast du das Werkzeug, um ML-Papers zu lesen. Das ist eine echte Superkraft — die meisten Informatiker können ML-Code schreiben, aber nicht ML-Papers verstehen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.nota.card1',
      front: 'Was bedeutet $\\sum_{i=1}^{n} x_i$?',
      back: '$x_1 + x_2 + \\ldots + x_n$ — Summe aller $x_i$.',
      conceptTags: ['sum'],
    },
    {
      id: 'p0.nota.card2',
      front: '$f: \\mathbb{R}^n \\to \\mathbb{R}$ — was beschreibt das?',
      back: 'Funktion: $n$-dim Vektor → Skalar (typisch: Loss-Funktion).',
      conceptTags: ['notation', 'function'],
    },
    {
      id: 'p0.nota.card3',
      front: 'Was tut $\\arg\\max_x f(x)$?',
      back: 'Gibt das $x$ zurück, bei dem $f$ maximal ist (nicht den Maximalwert).',
      conceptTags: ['argmax'],
    },
  ],
}
