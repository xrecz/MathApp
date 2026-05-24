import type { Lesson } from '../../../types'

export const multivariateKettenregelBackprop: Lesson = {
  id: 'p1.multivariate-kettenregel-backprop',
  title: 'Multivariate Kettenregel = Backpropagation',
  conceptTags: ['chain-rule', 'backpropagation', 'computational-graph', 'autograd', 'vjp'],
  estimatedMinutes: 20,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Das Herzstück der ML-Mathematik\n\nBackpropagation ist **nichts anderes** als die Kettenregel, systematisch angewandt auf einen Berechnungsgraphen.\n\nFür $L = h(g(f(x)))$ (Komposition):\n\n$\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial h} \\cdot \\frac{\\partial h}{\\partial g} \\cdot \\frac{\\partial g}{\\partial f} \\cdot \\frac{\\partial f}{\\partial x}$\n\nJeder Faktor ist eine **lokale** Ableitung eines Knotens. Rückwärts verketten → globaler Gradient.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-10 -20 240 120" width="240" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="30" width="40" height="25" rx="4" fill="#e0e7ff" stroke="#6366f1" stroke-width="1"/>
          <text x="20" y="46" text-anchor="middle" fill="#312e81" font-size="9">x, w</text>
          <rect x="60" y="30" width="40" height="25" rx="4" fill="#e0e7ff" stroke="#6366f1" stroke-width="1"/>
          <text x="80" y="43" text-anchor="middle" fill="#312e81" font-size="8">z=wx+b</text>
          <rect x="120" y="30" width="40" height="25" rx="4" fill="#e0e7ff" stroke="#6366f1" stroke-width="1"/>
          <text x="140" y="43" text-anchor="middle" fill="#312e81" font-size="9">a=σ(z)</text>
          <rect x="180" y="30" width="40" height="25" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
          <text x="200" y="43" text-anchor="middle" fill="#92400e" font-size="9">L=(a−y)²</text>
          <line x1="40" y1="42" x2="60" y2="42" stroke="#6366f1" stroke-width="1.5" marker-end="url(#fw)"/>
          <line x1="100" y1="42" x2="120" y2="42" stroke="#6366f1" stroke-width="1.5" marker-end="url(#fw)"/>
          <line x1="160" y1="42" x2="180" y2="42" stroke="#6366f1" stroke-width="1.5" marker-end="url(#fw)"/>
          <line x1="180" y1="75" x2="160" y2="75" stroke="#ef4444" stroke-width="1.5" marker-end="url(#bw)"/>
          <line x1="120" y1="75" x2="100" y2="75" stroke="#ef4444" stroke-width="1.5" marker-end="url(#bw)"/>
          <line x1="60" y1="75" x2="40" y2="75" stroke="#ef4444" stroke-width="1.5" marker-end="url(#bw)"/>
          <text x="170" y="88" fill="#ef4444" font-size="7">∂L/∂a</text>
          <text x="110" y="88" fill="#ef4444" font-size="7">∂L/∂z</text>
          <text x="50" y="88" fill="#ef4444" font-size="7">∂L/∂w</text>
          <text x="30" y="12" fill="#6366f1" font-size="8">→ Vorwärts</text>
          <text x="130" y="100" fill="#ef4444" font-size="8">← Rückwärts (Backprop)</text>
          <defs>
            <marker id="fw" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#6366f1"/></marker>
            <marker id="bw" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#ef4444"/></marker>
          </defs>
        </svg>`,
        caption: 'Berechnungsgraph: Vorwärts (blau) berechnet Werte, Rückwärts (rot) überträgt Gradienten via Kettenregel',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Wer diese Lektion verstanden hat, versteht warum jedes neuronale Netz funktioniert. `loss.backward()` in PyTorch führt genau diese Berechnung durch.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Beispiel: Ein-Schicht-Netz\n\n**Forward**: $z = wx + b \\to a = \\sigma(z) \\to L = (a - y)^2$\n\n**Backward** (Kettenregel rückwärts):\n\n$\\frac{\\partial L}{\\partial a} = 2(a - y)$\n\n$\\frac{\\partial L}{\\partial z} = \\frac{\\partial L}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} = \\frac{\\partial L}{\\partial a} \\cdot \\sigma\'(z)$\n\n$\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w} = \\frac{\\partial L}{\\partial z} \\cdot x$\n\n$\\frac{\\partial L}{\\partial b} = \\frac{\\partial L}{\\partial z} \\cdot 1$\n\n### Reverse-Mode Autograd\n\n**Effizienz**: Loss ist skalar ($1$ Output), Gewichte sind $n$ Inputs. Reverse-Mode berechnet alle $n$ Gradienten in einem Rückwärts-Durchlauf — $O(n)$ statt $O(n^2)$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Numerisches Beispiel**: $x = 1$, $w = 0$, $b = 0$, $y = 1$.\n\nForward: $z = 0 \\cdot 1 + 0 = 0$, $a = \\sigma(0) = 0{,}5$, $L = (0{,}5 - 1)^2 = 0{,}25$\n\nBackward:\n$\\frac{\\partial L}{\\partial a} = 2(0{,}5 - 1) = -1$\n\n$\\frac{\\partial L}{\\partial z} = -1 \\cdot \\sigma\'(0) = -1 \\cdot 0{,}25 = -0{,}25$\n\n$\\frac{\\partial L}{\\partial w} = -0{,}25 \\cdot x = -0{,}25 \\cdot 1 = -0{,}25$\n\nGradient Descent ($\\eta = 0{,}1$): $w \\leftarrow 0 - 0{,}1 \\cdot (-0{,}25) = 0{,}025$.',
      },
    ],
    practice: [
      {
        id: 'p1.backprop.ex1',
        difficulty: 2,
        conceptTags: ['backpropagation'],
        type: 'mc',
        prompt: 'Backpropagation berechnet im Kern?',
        options: [
          'Den Gradienten der Loss-Funktion bezüglich aller Modell-Parameter',
          'Den Vorwärts-Pass des Netzes',
          'Die optimalen Gewichte direkt',
          'Die Aktivierungen aller Schichten',
        ],
        answer: 'Den Gradienten der Loss-Funktion bezüglich aller Modell-Parameter',
        hints: [
          'Backprop liefert $\\partial L / \\partial w_i$ für jeden Parameter $w_i$.',
          'Gradient Descent nutzt diese Gradienten für den Update.',
          'Backprop = Berechnung aller Gradienten.',
        ],
        explanation: 'Backprop berechnet $\\nabla_w L = (\\partial L/\\partial w_1, \\dots, \\partial L/\\partial w_n)$ — den Gradient der Loss-Funktion nach **allen** Parametern.',
      },
      {
        id: 'p1.backprop.ex2',
        difficulty: 2,
        conceptTags: ['computational-graph'],
        type: 'mc',
        prompt: 'Backpropagation läuft durch den Computational Graph?',
        options: [
          'Rückwärts — vom Loss zu den Parametern',
          'Vorwärts — von den Inputs zum Loss',
          'Beide Richtungen gleichzeitig',
          'In zufälliger Reihenfolge',
        ],
        answer: 'Rückwärts — vom Loss zu den Parametern',
        hints: [
          '"Back"-propagation = Rückwärts-Propagation.',
          'Loss ist der Start; Gewichte sind das Ziel.',
          'Kettenregel rückwärts durch den Graphen.',
        ],
        explanation: 'Backprop beginnt beim Loss und überträgt Gradienten rückwärts — daher der Name. Jeder Knoten bekommt den Gradienten vom Ausgang und multipliziert mit seiner lokalen Ableitung.',
      },
      {
        id: 'p1.backprop.ex3',
        difficulty: 3,
        conceptTags: ['chain-rule', 'backpropagation'],
        type: 'mc',
        prompt:
          'Für $L = (\\sigma(wx) - y)^2$ mit festem $x, y$: $\\frac{\\partial L}{\\partial w} = ?$',
        options: [
          "$2(\\sigma(wx) - y) \\cdot \\sigma'(wx) \\cdot x$",
          "$2(\\sigma(wx) - y)$",
          "$\\sigma'(wx) \\cdot x$",
          "$2 \\sigma(wx) \\cdot x$",
        ],
        answer: "$2(\\sigma(wx) - y) \\cdot \\sigma'(wx) \\cdot x$",
        hints: [
          'Kettenregel: $\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}$.',
          '$\\frac{\\partial L}{\\partial a} = 2(a-y)$, $\\frac{\\partial a}{\\partial z} = \\sigma\'(wx)$, $\\frac{\\partial z}{\\partial w} = x$.',
          'Produkt: $2(\\sigma(wx)-y) \\cdot \\sigma\'(wx) \\cdot x$.',
        ],
        explanation:
          'Drei-fache Kettenregel: äußere Ableitung $(a-y)^2 \\to 2(a-y)$, dann $\\sigma(z) \\to \\sigma\'(z)$, dann $wx \\to x$. Produkt der drei lokalen Ableitungen.',
      },
      {
        id: 'p1.backprop.ex4',
        difficulty: 3,
        conceptTags: ['backpropagation'],
        type: 'numeric',
        prompt:
          '**Numerisches Beispiel**: $x=1$, $w=0$, $y=1$. $\\sigma(0)=0{,}5$, $\\sigma\'(0)=0{,}25$. $\\frac{\\partial L}{\\partial w} = 2(0{,}5-1) \\cdot 0{,}25 \\cdot 1 = ?$',
        answer: -0.25,
        acceptedAlternatives: ['-0,25', '-1/4'],
        hints: [
          '$2(0{,}5 - 1) = 2 \\cdot (-0{,}5) = -1$.',
          '$-1 \\cdot 0{,}25 = -0{,}25$.',
          '$-0{,}25 \\cdot 1 = -0{,}25$.',
        ],
        explanation:
          '$\\frac{\\partial L}{\\partial w} = -0{,}25$. Gradient Descent ($\\eta = 0{,}1$): $w \\leftarrow 0 - 0{,}1 \\cdot (-0{,}25) = +0{,}025$. $w$ wächst — richtige Richtung!',
      },
      {
        id: 'p1.backprop.ex5',
        difficulty: 4,
        conceptTags: ['autograd', 'vjp'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Warum verwendet PyTorch Reverse-Mode statt Forward-Mode Autodiff?',
        options: [
          'Loss ist ein Skalar, Inputs sind Millionen Parameter — Reverse-Mode berechnet alle Gradienten in einem Durchlauf',
          'Forward-Mode ist nicht korrekt für nichtlineare Funktionen',
          'Reverse-Mode ist schneller pro Rechenoperation',
          'Forward-Mode funktioniert nur für lineare Netze',
        ],
        answer: 'Loss ist ein Skalar, Inputs sind Millionen Parameter — Reverse-Mode berechnet alle Gradienten in einem Durchlauf',
        hints: [
          'Forward-Mode: ein Durchlauf pro Input-Dimension.',
          '$n = 10^9$ Parameter → $10^9$ Vorwärts-Durchläufe für alle Gradienten.',
          'Reverse-Mode: ein Rückwärts-Durchlauf für alle Gradienten gleichzeitig.',
        ],
        explanation:
          'Forward-Mode: Kosten $O(n)$ Durchläufe für $n$ Parameter. Reverse-Mode: ein Rückwärts-Durchlauf für **alle** $n$ Gradienten. Bei $n = 10^9$ ist Reverse-Mode $10^9$-mal effizienter.',
      },
      {
        id: 'p1.backprop.ex6',
        difficulty: 4,
        conceptTags: ['autograd'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Was tut `loss.backward()` in PyTorch?',
        options: [
          'Berechnet $\\partial L/\\partial p$ für jeden Parameter $p$ mit `requires_grad=True` via Kettenregel',
          'Führt den Vorwärts-Pass nochmals aus',
          'Optimiert die Gewichte direkt',
          'Berechnet den Loss-Wert',
        ],
        answer: 'Berechnet $\\partial L/\\partial p$ für jeden Parameter $p$ mit `requires_grad=True` via Kettenregel',
        hints: [
          '`backward()` befüllt `param.grad` für alle Parameter.',
          'Es wird kein Gewicht-Update durchgeführt — das macht `optimizer.step()`.',
          'Kettenregel rückwärts durch den gespeicherten Berechnungsgraphen.',
        ],
        explanation:
          '`loss.backward()` befüllt `param.grad = ∂L/∂param` für alle Parameter mit `requires_grad=True`. Der eigentliche Update-Schritt $w \\leftarrow w - \\eta \\nabla L$ folgt dann mit `optimizer.step()`.',
      },
      {
        id: 'p1.backprop.ex7',
        difficulty: 4,
        conceptTags: ['vjp'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Im VJP (Vector-Jacobian-Product) wird die volle Jacobi-Matrix explizit konstruiert?',
        options: [
          'Nein — $J^T v$ wird direkt berechnet, ohne $J$ zu materialisieren',
          'Ja — die Jacobi-Matrix wird einmalig berechnet und gecacht',
          'Nur für quadratische Matrizen',
          'Ja, aber nur bei einfachen Operationen',
        ],
        answer: 'Nein — $J^T v$ wird direkt berechnet, ohne $J$ zu materialisieren',
        hints: [
          '$J \\in \\mathbb{R}^{m \\times n}$ braucht $O(mn)$ Speicher — für $m=n=10^9$ unmöglich.',
          'VJP: gegeben $v$, berechne $J^T v$ direkt.',
          'Reverse-Mode implementiert genau das: Gradient-Fluss ohne explizite Jacobi-Matrix.',
        ],
        explanation:
          'Für $f: \\mathbb{R}^n \\to \\mathbb{R}^m$ hätte $J$ die Größe $m \\times n$. VJP berechnet $J^T v$ in $O(n + m)$ — die Jacobi-Matrix wird nie explizit gebaut. Das ist der Kern von Reverse-Mode AD.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Geschichte und Implementierung\n\nBackpropagation wurde mehrfach unabhängig entdeckt. Der entscheidende Durchbruch für ML: Rumelhart, Hinton und Williams 1986.\n\nHeute:\n- PyTorch: dynamischer Berechnungsgraph ("define-by-run") — Gradient-Tape wird zur Laufzeit aufgebaut\n- JAX: funktionale AD, jit-kompiliert, besonders effizient\n- TensorFlow: statischer Graph (TF1) bzw. Eager Mode + `@tf.function` (TF2)\n\nAlle implementieren dasselbe: Kettenregel über einen Berechnungsgraphen.',
      },
      {
        kind: 'callout',
        content:
          'Karpathys "micrograd" (github.com/karpathy/micrograd): vollständiges Autograd-System in ~150 Zeilen Python. Wer micrograd selbst implementiert, hat danach kein Mysterium mehr in Backprop. Das YouTube-Video "The spelled-out intro to neural networks and backpropagation: building micrograd" ist das beste verfügbare Tutorial dazu.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.backprop.card1',
      front: 'Was ist Backpropagation in einem Satz?',
      back: 'Systematische Anwendung der Kettenregel auf einen Berechnungsgraphen, um Gradienten effizient zu berechnen.',
      conceptTags: ['backpropagation'],
    },
    {
      id: 'p1.backprop.card2',
      front: 'Reverse-Mode vs. Forward-Mode AD?',
      back: 'Reverse-Mode (= Backprop) effizient bei skalarem Loss und vielen Parametern: ein Rückwärts-Durchlauf für alle Gradienten.',
      conceptTags: ['autograd'],
    },
    {
      id: 'p1.backprop.card3',
      front: 'Was tut `loss.backward()` in PyTorch?',
      back: 'Befüllt `param.grad` für alle Parameter mit `requires_grad=True`.',
      conceptTags: ['autograd'],
    },
  ],
}
