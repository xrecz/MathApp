import type { Lesson } from '../../../types'

export const extremaTaylor: Lesson = {
  id: 'p1.extrema-taylor',
  title: 'Extrema & Taylor-Approximation',
  conceptTags: ['extremum', 'critical-point', 'taylor-series', 'newton-method'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Extrema und lokale Approximation\n\n**Stationärer Punkt**: $f\'(x) = 0$ — notwendige Bedingung für ein Extremum.\n\n**2. Ableitungstest**: $f\'\'(x) > 0$ → lokales Minimum; $f\'\'(x) < 0$ → lokales Maximum.\n\n**Taylor-Reihe**: $f(x) \\approx f(a) + f\'(a)(x-a) + \\frac{1}{2}f\'\'(a)(x-a)^2 + \\dots$\n\nJede glatte Funktion kann lokal durch ein Polynom approximiert werden.',
      },
      {
        kind: 'math',
        content:
          '$$f(x) = \\sum_{k=0}^{\\infty} \\frac{f^{(k)}(a)}{k!}(x-a)^k \\approx f(a) + f\'(a)(x-a) + \\frac{f\'\'(a)}{2}(x-a)^2$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Gradient Descent = Taylor 1. Ordnung. Newton-Verfahren = Taylor 2. Ordnung (nutzt auch die Krümmung). Adam approximiert die 2. Ordnung diagonal.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Minimum finden\n\n1. $f\'(x) = 0$ lösen → stationäre Punkte\n2. $f\'\'(x) > 0$? → Minimum; $f\'\'(x) < 0$? → Maximum\n\n### Taylor-Approximationen\n\n**1. Ordnung** (linear): $f(x) \\approx f(a) + f\'(a)(x-a)$ — beste Gerade durch $(a, f(a))$\n\n**2. Ordnung** (quadratisch): $f(x) \\approx f(a) + f\'(a)(x-a) + \\frac{f\'\'(a)}{2}(x-a)^2$ — beste Parabel\n\n**Newton-Verfahren**: Minimiere die quadratische Approximation:\n\n$x_{n+1} = x_n - \\frac{f\'(x_n)}{f\'\'(x_n)}$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $f(x) = x^3 - 3x$\n\n$f\'(x) = 3x^2 - 3 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$\n\n$f\'\'(x) = 6x$\n\nBei $x = 1$: $f\'\'(1) = 6 > 0$ → **lokales Minimum**.\nBei $x = -1$: $f\'\'(-1) = -6 < 0$ → **lokales Maximum**.\n\n**Taylor um $x=0$**: $\\sin(x) \\approx x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$. Für $x$ nahe 0: $\\sin(x) \\approx x$.',
      },
    ],
    practice: [
      {
        id: 'p1.taylor.ex1',
        difficulty: 1,
        conceptTags: ['critical-point'],
        type: 'numeric',
        prompt: '$f(x) = (x-3)^2$. Bei welchem $x$ ist $f\'(x) = 0$?',
        answer: 3,
        hints: [
          '$f\'(x) = 2(x-3)$.',
          '$2(x-3) = 0 \\Rightarrow x-3 = 0$.',
          '$x = 3$.',
        ],
        explanation: '$f\'(x) = 2(x-3) = 0 \\Rightarrow x = 3$. Das Minimum von $(x-3)^2$ liegt bei $x = 3$.',
      },
      {
        id: 'p1.taylor.ex2',
        difficulty: 2,
        conceptTags: ['critical-point', 'extremum'],
        type: 'mc',
        prompt: '$f(x) = x^3$ bei $x = 0$: $f\'(0) = 0$. Was liegt vor?',
        options: [
          'Kein Extremum — Sattelpunkt / Wendepunkt',
          'Lokales Minimum ($f\'\'(0) > 0$)',
          'Lokales Maximum ($f\'\'(0) < 0$)',
          'Globales Minimum',
        ],
        answer: 'Kein Extremum — Sattelpunkt / Wendepunkt',
        hints: [
          '$f\'(x) = 3x^2$, $f\'\'(x) = 6x$.',
          '$f\'\'(0) = 0$ — der Test versagt.',
          'Für $x^3$: links von 0 fallend, rechts von 0 steigend — Wendepunkt.',
        ],
        explanation: '$f\'\'(0) = 0$: der 2. Ableitungstest liefert keine Entscheidung. Für $x^3$ gibt es kein Extremum bei 0 — es ist ein Wendepunkt (Funktion wechselt die Krümmung).',
      },
      {
        id: 'p1.taylor.ex3',
        difficulty: 2,
        conceptTags: ['taylor-series'],
        type: 'mc',
        prompt: 'Taylor-Approximation 1. Ordnung von $f$ in $a$?',
        options: [
          '$f(a) + f\'(a)(x-a)$',
          '$f(a) + f\'\'(a)(x-a)^2$',
          '$f\'(a)(x-a)$',
          '$f(a) \\cdot f\'(a)$',
        ],
        answer: '$f(a) + f\'(a)(x-a)$',
        hints: [
          'Taylor 1. Ordnung = Tangentengleichung = lineare Approximation.',
          'Term 0: $f(a)$. Term 1: $f\'(a)(x-a)$.',
          '$f(a) + f\'(a)(x-a)$.',
        ],
        explanation: 'Taylor 1. Ordnung ist die Tangentengleichung: $y = f(a) + f\'(a)(x-a)$. Gradient Descent macht genau das — lokale Linearisierung.',
      },
      {
        id: 'p1.taylor.ex4',
        difficulty: 3,
        conceptTags: ['extremum', 'critical-point'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: MSE-Loss $L(w) = (w-5)^2$. Minimum bei $w = ?$',
        answer: 5,
        hints: [
          '$L\'(w) = 2(w-5)$.',
          'Minimum bei $L\'(w) = 0$: $w = 5$.',
          '$L\'\'(w) = 2 > 0$ → Minimum bestätigt.',
        ],
        explanation: '$L\'(w) = 2(w-5) = 0 \\Rightarrow w = 5$. $L\'\'(w) = 2 > 0$ → Minimum. Der Loss ist 0 bei $w = 5$ — Modell-Vorhersage stimmt exakt.',
      },
      {
        id: 'p1.taylor.ex5',
        difficulty: 3,
        conceptTags: ['taylor-series'],
        type: 'mc',
        prompt:
          'Taylor von $e^x$ in $0$ bis zur 2. Ordnung: $e^x \\approx 1 + x + ?$. Was steht für $?$?',
        options: ['$x^2/2$', '$x^2$', '$2x^2$', '$x^3/6$'],
        answer: '$x^2/2$',
        hints: [
          'Taylor 2. Ordnung: $f(0) + f\'(0) x + \\frac{f\'\'(0)}{2} x^2$.',
          '$(e^x)\'= e^x$, also $f\'\'(0) = e^0 = 1$.',
          '$\\frac{1}{2} x^2$.',
        ],
        explanation: '$e^x \\approx 1 + x + \\frac{x^2}{2}$. Für $x = 0{,}1$: $e^{0{,}1} \\approx 1{,}105$ — Näherung: $1 + 0{,}1 + 0{,}005 = 1{,}105$ ✓.',
      },
      {
        id: 'p1.taylor.ex6',
        difficulty: 4,
        conceptTags: ['newton-method'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Newton-Verfahren konvergiert quadratisch (sehr schnell). Warum wird es trotzdem kaum in Deep Learning genutzt?',
        options: [
          'Die Hesse-Matrix bei Millionen Parametern ist viel zu groß und teuer zu berechnen',
          'Newton-Verfahren divergiert immer bei nicht-konvexen Problemen',
          'Newton-Verfahren erfordert exakte Second-Order Gradienten, die nicht existieren',
          'Gradient Descent ist schneller pro Iteration',
        ],
        answer: 'Die Hesse-Matrix bei Millionen Parametern ist viel zu groß und teuer zu berechnen',
        hints: [
          'Newton: $x \\leftarrow x - H^{-1} \\nabla f$. $H$ = Hesse-Matrix.',
          'Bei $n$ Parametern: $H \\in \\mathbb{R}^{n \\times n}$, also $n^2$ Einträge.',
          'Für $n = 10^9$: $H$ hat $10^{18}$ Einträge — unvorstellbar groß.',
        ],
        explanation:
          'Bei einem Netz mit $10^9$ Parametern hat die Hesse-Matrix $10^{18}$ Einträge. Speichern (Float32): $4 \\times 10^{18}$ Bytes = $4$ Exabyte. Unmöglich. Quasi-Newton-Methoden (L-BFGS) approximieren $H^{-1}$ — trotzdem nur für mittelgroße Probleme praktisch.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Optimierungsalgorithmen als Taylor-Approximationen\n\n- **Gradient Descent**: Minimiere Taylor-Linearisierung → $w \\leftarrow w - \\eta \\nabla f$\n- **Newton**: Minimiere Taylor-Quadratisierung → $w \\leftarrow w - H^{-1} \\nabla f$\n- **Adam**: Approximiere $H$ diagonal via $\\hat{v}_t$ (EMA quadrierter Gradienten) → $w \\leftarrow w - \\eta \\nabla f / \\sqrt{\\hat{v}_t + \\varepsilon}$\n\nAdam ist der pragmatische Kompromiss: bessere Konvergenz als reines GD, aber ohne die quadratische Hesse-Matrix zu benötigen.',
      },
      {
        kind: 'callout',
        content:
          'Die Taylor-Entwicklung von $\\log(1-p)$ erklärt den Cross-Entropy-Loss: für kleine Fehler $(p \\approx y)$ ist $-\\log(1-p) \\approx p + p^2/2 + \\dots$ — die ersten Terme sind der L1/L2-Loss. Cross-Entropy und MSE sind lokal äquivalent für sehr kleine Fehler.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.taylor.card1',
      front: 'Notwendige Bedingung für Extremum?',
      back: "$f'(x) = 0$.",
      conceptTags: ['critical-point'],
    },
    {
      id: 'p1.taylor.card2',
      front: 'Hinreichende Bedingung für Minimum?',
      back: "$f'(x) = 0$ und $f''(x) > 0$.",
      conceptTags: ['extremum'],
    },
    {
      id: 'p1.taylor.card3',
      front: 'Taylor 1. Ordnung in $a$?',
      back: "$f(x) \\approx f(a) + f'(a)(x - a)$.",
      conceptTags: ['taylor-series'],
    },
  ],
}
