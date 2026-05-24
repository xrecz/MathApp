import type { Lesson } from '../../../types'

export const grenzwerte: Lesson = {
  id: 'p1.grenzwerte',
  title: 'Grenzwerte (intuitiv)',
  conceptTags: ['limit', 'continuity', 'asymptote', 'infinity'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Grenzwerte — "kommt beliebig nahe heran"\n\n"$x$ strebt gegen $a$" bedeutet: $x$ wird beliebig nahe an $a$ herangebracht, ohne $a$ zu erreichen. Der **Grenzwert** $\\lim_{x \\to a} f(x)$ fragt: Wohin strebt $f(x)$?\n\nKlassisches Beispiel: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ — obwohl der Ausdruck bei $x=0$ nicht definiert ist!',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-70 -50 140 90" width="220" height="140" xmlns="http://www.w3.org/2000/svg">
          <line x1="-65" y1="0" x2="65" y2="0" stroke="#374151" stroke-width="0.5"/>
          <line x1="0" y1="-45" x2="0" y2="40" stroke="#374151" stroke-width="0.5"/>
          <path d="M -60,-30 C -40,-20 -20,-5 -5,-0.5 M 5,0.5 C 20,5 40,20 60,30"
                fill="none" stroke="#6366f1" stroke-width="2"/>
          <circle cx="0" cy="0" r="3" fill="white" stroke="#6366f1" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="1.5" fill="#ef4444"/>
          <text x="5" y="-10" fill="#ef4444" font-size="8">Grenzwert = 1</text>
          <text x="35" y="-28" fill="#6366f1" font-size="8">sin(x)/x</text>
          <text x="-62" y="38" fill="#9ca3af" font-size="7">Funktion bei 0 undefiniert, Grenzwert = 1</text>
        </svg>`,
        caption: 'sin(x)/x → 1 für x → 0: der Grenzwert existiert, obwohl f(0) undefiniert ist',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Sigmoid-Asymptoten, die e-Funktion und Taylor-Approximationen basieren alle auf Grenzwerten. Die Sättigung von $\\sigma(x) \\to 1$ für $x \\to \\infty$ ist die mathematische Wurzel des Vanishing-Gradient-Problems.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Intuition statt $\\varepsilon$-$\\delta$\n\n"$\\lim_{x \\to a} f(x) = L$" bedeutet: je näher $x$ an $a$ kommt, desto näher kommt $f(x)$ an $L$ heran. Wir können $L$ so genau bestimmen wie wir wollen.\n\n### Wichtige Grenzwerte\n\n$\\lim_{x \\to \\infty} \\frac{1}{x} = 0$ \\quad $\\lim_{x \\to \\infty} e^x = \\infty$ \\quad $\\lim_{x \\to -\\infty} e^x = 0$\n\n$\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2{,}718$ — Definition der Euler-Zahl!\n\n### Stetigkeit\n\n"Zeichne den Graphen ohne den Stift abzusetzen." Formal: $f$ stetig in $a$, wenn $\\lim_{x \\to a} f(x) = f(a)$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Sigma-Asymptoten**: $\\sigma(x) = \\frac{1}{1 + e^{-x}}$\n\nFür $x \\to \\infty$: $e^{-x} \\to 0$, also $\\sigma(x) \\to \\frac{1}{1+0} = 1$.\n\nFür $x \\to -\\infty$: $e^{-x} \\to \\infty$, also $\\sigma(x) \\to \\frac{1}{1+\\infty} = 0$.\n\nSigmoid hat also zwei horizontale Asymptoten: $y = 0$ und $y = 1$.',
      },
    ],
    practice: [
      {
        id: 'p1.lim.ex1',
        difficulty: 1,
        conceptTags: ['limit'],
        type: 'numeric',
        prompt: '$\\lim_{x \\to 2} (x + 3) = ?$',
        answer: 5,
        hints: [
          'Stetige Funktion: einfach $x = 2$ einsetzen.',
          '$f(x) = x + 3$ ist ein Polynom — überall stetig.',
          '$2 + 3 = 5$.',
        ],
        explanation: 'Für stetige Funktionen: $\\lim_{x \\to a} f(x) = f(a)$. Also $\\lim_{x \\to 2}(x+3) = 2+3 = 5$.',
      },
      {
        id: 'p1.lim.ex2',
        difficulty: 2,
        conceptTags: ['infinity'],
        type: 'numeric',
        prompt: '$\\lim_{x \\to \\infty} \\frac{1}{x} = ?$',
        answer: 0,
        hints: [
          'Je größer $x$, desto kleiner $1/x$.',
          'Für $x = 1000$: $1/1000 = 0{,}001$. Für $x = 10^6$: $10^{-6}$.',
          'Gegen unendlich: Grenzwert ist 0.',
        ],
        explanation: '$\\frac{1}{x}$ wird beliebig klein, wenn $x$ wächst: $\\lim_{x \\to \\infty} \\frac{1}{x} = 0$.',
      },
      {
        id: 'p1.lim.ex3',
        difficulty: 2,
        conceptTags: ['asymptote'],
        type: 'numeric',
        prompt: '$\\lim_{x \\to \\infty} e^{-x} = ?$',
        answer: 0,
        hints: [
          '$e^{-x} = \\frac{1}{e^x}$.',
          '$e^x \\to \\infty$ für $x \\to \\infty$.',
          '$\\frac{1}{e^x} \\to 0$.',
        ],
        explanation: '$e^{-x} = 1/e^x$. Da $e^x \\to \\infty$, gilt $e^{-x} \\to 0$. Das ist die rechte Asymptote der Sigmoid-Funktion.',
      },
      {
        id: 'p1.lim.ex4',
        difficulty: 3,
        conceptTags: ['limit'],
        type: 'numeric',
        prompt:
          '$\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = ?$ (Näherung auf 2 Nachkommastellen)',
        answer: 2.72,
        acceptedAlternatives: ['2,72', 'e', '2.718', '2,718'],
        hints: [
          'Dieser Grenzwert definiert eine wichtige mathematische Konstante.',
          'Für $n = 100$: $(1{,}01)^{100} \\approx 2{,}705$. Für $n = 1000$: $\\approx 2{,}717$.',
          'Im Grenzwert: $e \\approx 2{,}718$.',
        ],
        explanation:
          '$\\lim_{n \\to \\infty}(1 + 1/n)^n = e \\approx 2{,}718$ — die Euler-Zahl. Eine der wichtigsten Konstanten der Mathematik.',
      },
      {
        id: 'p1.lim.ex5',
        difficulty: 3,
        conceptTags: ['asymptote', 'limit'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: $\\lim_{x \\to \\infty} \\sigma(x) = ?$ für $\\sigma(x) = \\frac{1}{1+e^{-x}}$',
        answer: 1,
        hints: [
          'Für $x \\to \\infty$: was passiert mit $e^{-x}$?',
          '$e^{-x} \\to 0$, also $1 + e^{-x} \\to 1$.',
          '$\\frac{1}{1} = 1$.',
        ],
        explanation:
          'Für $x \\to \\infty$: $e^{-x} \\to 0$, daher $\\sigma(x) = \\frac{1}{1+e^{-x}} \\to \\frac{1}{1} = 1$. Obere Asymptote der Sigmoid-Funktion.',
      },
      {
        id: 'p1.lim.ex6',
        difficulty: 4,
        conceptTags: ['asymptote', 'limit'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: $\\lim_{x \\to -\\infty} \\sigma(x) = ?$',
        answer: 0,
        hints: [
          'Für $x \\to -\\infty$: was passiert mit $e^{-x}$?',
          '$-x \\to +\\infty$, also $e^{-x} \\to \\infty$.',
          '$\\frac{1}{1 + \\infty} = 0$.',
        ],
        explanation:
          'Für $x \\to -\\infty$: $e^{-x} = e^{+|x|} \\to \\infty$, also $\\sigma(x) \\to 0$. Untere Asymptote. Beide Asymptoten ($0$ und $1$) machen Sigmoid ideal für Wahrscheinlichkeits-Ausgaben in $[0,1]$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Sigmoid-Asymptoten und das Vanishing-Gradient-Problem\n\nDie Sigmoid-Funktion hat zwei Asymptoten: $\\sigma(x) \\to 1$ für $x \\to \\infty$ und $\\sigma(x) \\to 0$ für $x \\to -\\infty$. In den Sättigungsbereichen (weit weg von 0) wird die Ableitung sehr klein:\n\n$\\sigma\'(x) = \\sigma(x)(1-\\sigma(x)) \\to 0$ in beiden Richtungen.\n\nIn einem tiefen Netz mit Sigmoid-Aktivierungen wird der Gradient bei jedem Layer durch einen Faktor $\\leq 0{,}25$ multipliziert. Nach 10 Layers ist der Gradient um Faktor $0{,}25^{10} \\approx 10^{-6}$ geschrumpft — der **Vanishing Gradient**.',
      },
      {
        kind: 'callout',
        content:
          '3Blue1Brown "Essence of Calculus" Folge 7 visualisiert Grenzwerte sehr intuitiv — empfehlenswert als Ergänzung.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.lim.card1',
      front: '$\\lim_{n \\to \\infty}(1 + 1/n)^n$?',
      back: '$e \\approx 2{,}718$ — Definition der Euler-Zahl.',
      conceptTags: ['limit'],
    },
    {
      id: 'p1.lim.card2',
      front: '$\\lim_{x \\to \\infty} \\sigma(x)$?',
      back: '$1$ — Sigmoid sättigt nach oben.',
      conceptTags: ['asymptote'],
    },
    {
      id: 'p1.lim.card3',
      front: '$\\lim_{x \\to -\\infty} \\sigma(x)$?',
      back: '$0$ — Sigmoid sättigt nach unten.',
      conceptTags: ['asymptote'],
    },
  ],
}
