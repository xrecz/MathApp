import type { Lesson } from '../../../types'

export const mlAbleitungen: Lesson = {
  id: 'p1.ml-ableitungen',
  title: 'Ableitungen der ML-Aktivierungsfunktionen',
  conceptTags: ['exp', 'log', 'sigmoid', 'tanh', 'relu', 'activation', 'vanishing-gradient'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Die fünf wichtigsten Ableitungen in Deep Learning\n\n$(e^x)\' = e^x$ \\hspace{1em} (sich selbst — einzigartig!)\n\n$(\\ln x)\' = \\tfrac{1}{x}$\n\n$\\sigma\'(x) = \\sigma(x) \\cdot (1 - \\sigma(x))$ \\hspace{1em} (ikonisch!)\n\n$\\tanh\'(x) = 1 - \\tanh^2(x)$\n\n$\\text{ReLU}\'(x) = \\begin{cases}1 & x > 0\\\\ 0 & x < 0\\end{cases}$',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-80 -70 160 140" width="200" height="160" xmlns="http://www.w3.org/2000/svg">
          <line x1="-75" y1="0" x2="75" y2="0" stroke="#374151" stroke-width="0.5"/>
          <line x1="0" y1="-65" x2="0" y2="65" stroke="#374151" stroke-width="0.5"/>
          <path d="M -70,62 C -40,58 -20,30 0,0 C 20,-30 40,-58 70,-62"
                fill="none" stroke="#6366f1" stroke-width="1.5"/>
          <path d="M -70,1 C -50,1 -30,3 -15,10 C -5,15 0,25 5,15 C 15,3 30,1 70,1"
                fill="none" stroke="#ef4444" stroke-width="1.5"/>
          <circle cx="0" cy="25" r="2.5" fill="#ef4444"/>
          <text x="-42" y="-52" fill="#6366f1" font-size="8">σ(x)</text>
          <text x="20" y="28" fill="#ef4444" font-size="8">σ'(x), Peak 0.25</text>
          <line x1="-75" y1="50" x2="75" y2="50" stroke="#9ca3af" stroke-width="0.5" stroke-dasharray="3"/>
          <line x1="-75" y1="-50" x2="75" y2="-50" stroke="#9ca3af" stroke-width="0.5" stroke-dasharray="3"/>
          <text x="50" y="47" fill="#9ca3af" font-size="7">1</text>
          <text x="50" y="-53" fill="#9ca3af" font-size="7">-1</text>
        </svg>`,
        caption: 'Sigmoid σ(x) (blau) und ihre Ableitung σ\'(x) (rot) — Maximum der Ableitung bei x=0 ist 0.25',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Diese fünf Ableitungen tauchen in fast jedem Backprop-Schritt auf. Wer sie kennt, kann einen Backward-Pass manuell nachrechnen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Sigma-Ableitung (Herleitung via Quotientenregel)\n\n$\\sigma(x) = \\frac{1}{1+e^{-x}}$\n\nMit Quotientenregel (oder $\\sigma = (1+e^{-x})^{-1}$ + Kettenregel):\n\n$\\sigma\'(x) = \\sigma(x)(1 - \\sigma(x))$\n\n**Wichtig**: $\\sigma\'(0) = 0{,}5 \\cdot 0{,}5 = 0{,}25$ — das ist der **maximale** Wert!\n\nFür $|x|$ groß: $\\sigma(x) \\approx 0$ oder $\\approx 1$ → $\\sigma\'(x) \\approx 0$ — **Vanishing Gradient**.\n\n### ReLU — kein Vanishing Gradient\n\n$\\text{ReLU}(x) = \\max(0, x)$, also $\\text{ReLU}\'(x) = 1$ für $x > 0$.\n\nKeine Sättigung im positiven Bereich → Gradient bleibt erhalten. Deshalb ReLU-Dominanz in modernen Netzen.',
      },
      {
        kind: 'worked-example',
        content:
          '**Sigmoid-Ableitung elegant**: $\\sigma(x) = \\frac{e^x}{1+e^x}$\n\n$(e^x)\' = e^x$, Nenner-Ableitung $(1+e^x)\' = e^x$.\n\nQuotientenregel: $\\sigma\'(x) = \\frac{e^x(1+e^x) - e^x \\cdot e^x}{(1+e^x)^2} = \\frac{e^x}{(1+e^x)^2} = \\sigma(x)(1-\\sigma(x))$ ✓\n\n**Cache-Vorteil**: Man kann $\\sigma\'$ aus $\\sigma$ berechnen — keine extra Auswertung nötig!',
      },
    ],
    practice: [
      {
        id: 'p1.mlderiv.ex1',
        difficulty: 1,
        conceptTags: ['exp'],
        type: 'mc',
        prompt: 'Ableitung von $e^x$?',
        options: ['$e^x$', '$x e^{x-1}$', '$e^{x-1}$', '$\\ln(x)$'],
        answer: '$e^x$',
        hints: [
          '$e^x$ ist die einzige Funktion, die ihre eigene Ableitung ist.',
          '$(e^x)\' = e^x$.',
          'Diese Eigenschaft macht $e$ so besonders.',
        ],
        explanation: '$(e^x)\' = e^x$ — die einzigartige Eigenschaft der Euler-Zahl. Keine andere Funktion (außer Vielfachen) ist ihre eigene Ableitung.',
      },
      {
        id: 'p1.mlderiv.ex2',
        difficulty: 2,
        conceptTags: ['exp'],
        type: 'mc',
        prompt: 'Ableitung von $e^{3x}$?',
        options: ['$3e^{3x}$', '$e^{3x}$', '$3xe^{3x}$', '$e^{3x-1}$'],
        answer: '$3e^{3x}$',
        hints: [
          'Kettenregel: außen $e^u \\to e^u$, innen $u = 3x \\to 3$.',
          '$e^{3x} \\cdot 3 = ?$',
          '$= 3e^{3x}$.',
        ],
        explanation: '$(e^{3x})\' = e^{3x} \\cdot 3 = 3e^{3x}$. Allgemein: $(e^{ax})\' = ae^{ax}$.',
      },
      {
        id: 'p1.mlderiv.ex3',
        difficulty: 2,
        conceptTags: ['log'],
        type: 'mc',
        prompt: 'Ableitung von $\\ln(x)$?',
        options: ['$1/x$', '$e^x$', '$x$', '$\\ln(x-1)$'],
        answer: '$1/x$',
        hints: [
          '$(\\ln x)\' = 1/x$ ist ein Standardergebnis.',
          'Überprüfung: $\\frac{d}{dx}\\ln(x)$ bei $x=1$: Steigung der Tangente an $\\ln$ bei $x=1$ ist 1.',
          '$1/x$.',
        ],
        explanation: '$(\\ln x)\' = 1/x$. Taucht im Cross-Entropy-Loss auf: $\\frac{d}{dp}(-\\ln p) = -1/p$.',
      },
      {
        id: 'p1.mlderiv.ex4',
        difficulty: 3,
        conceptTags: ['sigmoid', 'vanishing-gradient'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: $\\sigma\'(0) = ?$ (nutze $\\sigma(0) = 0{,}5$ und $\\sigma\'(x) = \\sigma(x)(1-\\sigma(x))$)',
        answer: 0.25,
        acceptedAlternatives: ['0,25', '1/4'],
        hints: [
          '$\\sigma\'(x) = \\sigma(x)(1-\\sigma(x))$.',
          'Bei $x=0$: $\\sigma(0) = 0{,}5$.',
          '$0{,}5 \\cdot (1 - 0{,}5) = 0{,}5 \\cdot 0{,}5 = 0{,}25$.',
        ],
        explanation: '$\\sigma\'(0) = 0{,}5 \\cdot 0{,}5 = 0{,}25$. Das ist der Maximalwert der Sigmoid-Ableitung — überall ist $\\sigma\' \\leq 0{,}25$.',
      },
      {
        id: 'p1.mlderiv.ex5',
        difficulty: 3,
        conceptTags: ['relu'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: $\\text{ReLU}\'(2) = ?$',
        answer: 1,
        hints: [
          '$\\text{ReLU}(x) = \\max(0, x)$.',
          'Für $x > 0$: $\\text{ReLU}(x) = x$, Ableitung = 1.',
          '$2 > 0$, also $\\text{ReLU}\'(2) = 1$.',
        ],
        explanation: 'ReLU ist für $x > 0$ gleich $x$ (Steigung 1). $\\text{ReLU}\'(2) = 1$.',
      },
      {
        id: 'p1.mlderiv.ex6',
        difficulty: 3,
        conceptTags: ['relu'],
        type: 'numeric',
        prompt: '**ML-Aufgabe**: $\\text{ReLU}\'(-3) = ?$',
        answer: 0,
        hints: [
          '$\\text{ReLU}(x) = 0$ für $x < 0$.',
          'Ableitung einer Konstanten ist 0.',
          '$\\text{ReLU}\'(-3) = 0$.',
        ],
        explanation: 'ReLU ist für $x < 0$ konstant 0 — keine Steigung. "Dead ReLU": Ein Neuron, das immer negative Werte sieht, hat Gradient 0 und lernt nicht mehr.',
      },
      {
        id: 'p1.mlderiv.ex7',
        difficulty: 4,
        conceptTags: ['relu', 'vanishing-gradient'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Warum dominiert ReLU Sigmoid in modernen tiefen Netzen?',
        options: [
          'ReLU sättigt nicht für positive Werte — Ableitung bleibt 1, kein Vanishing Gradient',
          'ReLU ist kontinuierlich und überall differenzierbar',
          'ReLU liefert Ausgaben in $[0,1]$, wie Wahrscheinlichkeiten',
          'ReLU ist schneller zu berechnen als Sigmoid',
        ],
        answer: 'ReLU sättigt nicht für positive Werte — Ableitung bleibt 1, kein Vanishing Gradient',
        hints: [
          'Sigmoid: $\\sigma\' \\leq 0{,}25$ — Gradient wird bei jedem Layer um mindestens Faktor 4 gedämpft.',
          'ReLU: $\\text{ReLU}\'(x) = 1$ für $x > 0$ — kein Dämpfungsfaktor.',
          'In tiefen Netzen summiert sich das: 10 Sigmoid-Layer = Faktor $0{,}25^{10} \\approx 10^{-6}$.',
        ],
        explanation:
          'Sigmoid dämpft Gradienten um ≤ Faktor 0.25 pro Layer. Bei 10 Layern: $0{,}25^{10} \\approx 10^{-6}$ — der Gradient ist verschwunden. ReLU dämpft nicht (Ableitung = 1 im positiven Bereich), weshalb tiefe Netze erst mit ReLU praktisch trainierbar wurden.',
        misconceptions: {
          'ReLU ist schneller zu berechnen als Sigmoid': 'Richtig, aber nicht der Hauptgrund. Geschwindigkeit ist ein Bonus, die Gradient-Eigenschaft ist entscheidend.',
        },
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Das Vanishing-Gradient-Problem\n\nIn einem tiefen Netz mit Sigmoid-Aktivierungen multipliziert sich der Gradient bei jedem Backward-Schritt mit $\\sigma\'(x_i) \\leq 0{,}25$. Nach $n$ Layern:\n\n$\\frac{\\partial L}{\\partial w_1} \\approx \\prod_{i=1}^{n} \\sigma\'(x_i) \\leq 0{,}25^n$\n\nFür $n = 20$: $0{,}25^{20} \\approx 10^{-12}$ — de facto Null. Gradient Descent kann $w_1$ nicht mehr anpassen.\n\n**Lösungen** (historisch): ReLU-Aktivierungen (2011), Residual Connections (ResNet, 2015), Batch Normalization (2015), sorgfältige Initialisierung (He-Init).',
      },
      {
        kind: 'callout',
        content:
          'Die Sigmoid-Ableitung $\\sigma\'(x) = \\sigma(x)(1-\\sigma(x))$ ist cache-friendly: beim Forward-Pass ist $\\sigma(x)$ bereits berechnet. Deshalb speichern optimierte Implementierungen $\\sigma(x)$ und berechnen die Ableitung daraus — statt $x$ nochmals durch Sigmoid zu jagen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.mlderiv.card1',
      front: 'Ableitung von $e^x$?',
      back: '$e^x$ — sich selbst!',
      conceptTags: ['exp'],
    },
    {
      id: 'p1.mlderiv.card2',
      front: 'Sigmoid-Ableitung?',
      back: "$\\sigma'(x) = \\sigma(x)(1-\\sigma(x))$, Maximum $0{,}25$ bei $x=0$.",
      conceptTags: ['sigmoid'],
    },
    {
      id: 'p1.mlderiv.card3',
      front: 'ReLU-Ableitung?',
      back: '$1$ für $x > 0$, $0$ für $x < 0$.',
      conceptTags: ['relu'],
    },
  ],
}
