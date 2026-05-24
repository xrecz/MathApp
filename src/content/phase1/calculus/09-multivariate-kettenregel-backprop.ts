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

  learningOutcome:
    'Du verstehst Backpropagation als multivariate Kettenregel auf Berechnungsgraphen, kannst Forward und Backward Pass für ein 2-Layer-Netz vollständig von Hand durchführen, und erklärt den Unterschied zwischen Reverse-Mode und Forward-Mode Automatic Differentiation.',

  description:
    'Backpropagation ist die multivariate Kettenregel — systematisch auf Berechnungsgraphen angewandt. Es ist der Algorithmus, der das Training tiefer neuronaler Netze überhaupt erst möglich macht. Diese Lektion verbindet alle vorherigen Konzepte (Kettenregel, partielle Ableitungen, Gradient) zu einem vollständigen Bild von Backprop: vom Computational Graph bis zu `loss.backward()` in PyTorch.',

  conceptSteps: [
    {
      title: 'Multivariate Kettenregel: Gradienten durch zusammengesetzte Funktionen',
      body: 'Wenn $L = L(a)$ mit $a = f(z)$ und $z = g(w)$, dann:\n$$\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}$$\nBei Vektoren: $\\frac{\\partial L}{\\partial w_i} = \\sum_j \\frac{\\partial L}{\\partial a_j} \\cdot \\frac{\\partial a_j}{\\partial w_i}$ — Summe über alle Pfade. In Matrix-Form: $\\frac{\\partial L}{\\partial w} = J^T \\frac{\\partial L}{\\partial a}$ mit Jacobi-Matrix $J$.',
      preprompt: 'Was ist die univariate Kettenregel, und wie verallgemeinert sie sich auf Vektoren?',
      miniExample:
        'Softmax-Schicht: $a = \\text{softmax}(z)$ mit $a_i = e^{z_i}/\\sum_j e^{z_j}$. $\\frac{\\partial a_i}{\\partial z_k} = a_i(\\delta_{ik} - a_k)$ — Jacobi der Softmax. Für CE-Loss: $\\frac{\\partial L}{\\partial z_i} = a_i - y_i$ (bekannte Vereinfachung).',
      selfCheck: 'Warum summiert man über alle Pfade bei Verzweigungen im Graphen?',
    },
    {
      title: 'Berechnungsgraph: formale Darstellung von Forward Pass',
      body: 'Ein Berechnungsgraph (Computational Graph) ist ein gerichteter azyklischer Graph (DAG): Knoten = Operationen oder Variablen, Kanten = Datenwerte. Forward Pass: Werte von Links nach Rechts propagieren. Backward Pass: Gradienten von Rechts nach Links propagieren (Kettenregel an jedem Knoten). Jeder Knoten kennt seine "backward"-Funktion — die lokale Ableitung.',
      preprompt: 'Wie modelliert man eine mathematische Funktion als Graph?',
      miniExample:
        'Berechnung $L = (wx - y)^2$: Graph hat Knoten für $\\cdot$ (Multiplikation), $-$ (Subtraktion), $()^2$ (Quadrat). Backward: $\\frac{\\partial L}{\\partial (wx-y)} = 2(wx-y)$, $\\frac{\\partial (wx-y)}{\\partial w} = x$, also $\\frac{\\partial L}{\\partial w} = 2(wx-y) \\cdot x$.',
      selfCheck: 'Was bedeutet "azyklisch" für einen Berechnungsgraphen, und warum ist das wichtig?',
    },
    {
      title: 'Reverse-Mode AD: einmal rückwärts, alle Gradienten',
      body: 'Reverse-Mode Automatic Differentiation (= Backpropagation) berechnet $\\nabla_w L$ für alle Parameter $w$ in einem einzigen Rückwärtsdurchlauf. Effizienz: $O(C)$ Operationen, wobei $C$ die Komplexität des Forward Passes ist — unabhängig von der Parameteranzahl $n$! Deshalb ist Training mit $n = 10^9$ Parametern möglich: Backprop kostet pro Schritt nur konstante Vielfache des Forward Passes.',
      preprompt: 'Warum wäre es ineffizient, für jeden Parameter separat zu differenzieren?',
      miniExample:
        'Netz mit $n = 10^6$ Parametern: Forward-Differentiation bräuchte $10^6$ Vorwärtsdurchläufe. Backprop: 1 Rückwärtsdurchlauf. Speedup-Faktor $10^6$. Genau das macht Deep Learning praktisch.',
      selfCheck: 'Wann wäre Forward-Mode AD effizienter als Reverse-Mode?',
    },
    {
      title: 'Vollständiger Backprop durch ein 2-Layer-Netz: Hand-Berechnung',
      body: 'Netz: $z^{(1)} = W^{(1)}x + b^{(1)}$, $a^{(1)} = \\sigma(z^{(1)})$, $z^{(2)} = W^{(2)}a^{(1)} + b^{(2)}$, $\\hat{y} = \\sigma(z^{(2)})$, $L = \\text{BCE}(\\hat{y}, y)$. Backward:\n1. $\\delta^{(2)} = \\hat{y} - y$ (BCE+Sigmoid-Vereinfachung)\n2. $\\frac{\\partial L}{\\partial W^{(2)}} = \\delta^{(2)} (a^{(1)})^T$\n3. $\\delta^{(1)} = (W^{(2)})^T \\delta^{(2)} \\odot \\sigma\'(z^{(1)})$\n4. $\\frac{\\partial L}{\\partial W^{(1)}} = \\delta^{(1)} x^T$',
      preprompt: 'Was bedeutet das $\\odot$ (Hadamard-Produkt) in Schritt 3?',
      miniExample:
        'Zahlenwerte: $x = [1, 2]^T$, $W^{(1)} = \\begin{pmatrix}0{,}5 & -0{,}3 \\\\ 0{,}2 & 0{,}8\\end{pmatrix}$. Forward: $z^{(1)} = [0{,}5-0{,}6, 0{,}2+1{,}6]^T = [-0{,}1, 1{,}8]^T$. $a^{(1)} = [0{,}475, 0{,}858]^T$.',
      selfCheck: 'Warum ist $\\frac{\\partial L}{\\partial W^{(l)}} = \\delta^{(l)} (a^{(l-1)})^T$ und nicht $\\delta^{(l)} \\cdot a^{(l-1)}$?',
    },
    {
      title: 'Vanishing/Exploding Gradients: multivariate Perspektive',
      body: 'Backprop multipliziert bei jedem Layer die Jacobi-Matrix $J^{(l)} = \\frac{\\partial a^{(l)}}{\\partial a^{(l-1)}} = \\text{diag}(\\sigma\'(z^{(l)})) W^{(l)}$. Für $L$ Layers: $\\frac{\\partial L}{\\partial a^{(1)}} = \\frac{\\partial L}{\\partial a^{(L)}} \\prod_{l=2}^{L} J^{(l)}$. Das Produkt von $L$ Matrizen: wenn $\\|J^{(l)}\\| < 1$ (Vanishing) oder $\\|J^{(l)}\\| > 1$ (Exploding). Lösungen: ReLU ($\\sigma\' \\in \\{0, 1\\}$), He-Init (Varianz-erhaltende Initialisierung), ResNets (Skip Connection = +I).',
      preprompt: 'Was passiert, wenn man viele Matrizen mit kleinen Einträgen multipliziert?',
      miniExample:
        'He-Initialisierung: $W \\sim \\mathcal{N}(0, 2/n_{\\text{in}})$. Ziel: Varianz der Aktivierungen bleibt nach dem Layer erhalten. Herleitung: $\\text{Var}(Wx) = n_{\\text{in}} \\cdot \\text{Var}(w_i) \\cdot \\text{Var}(x_i) = n_{\\text{in}} \\cdot \\frac{2}{n_{\\text{in}}} \\cdot 1 = 2 \\approx 1$ (für ReLU korrigiert).',
      selfCheck: 'Wie verhindert eine ResNet Skip Connection Vanishing Gradients mathematisch?',
    },
    {
      title: 'Gradient Checkpointing und Mixed Precision: praktische Backprop',
      body: 'Backprop braucht alle Zwischenaktivierungen (für den Backward Pass). Bei großen Netzen: Speicherproblem. Lösungen: (1) Gradient Checkpointing — berechne Aktivierungen beim Backward Pass neu, spare Speicher auf Kosten von Compute; (2) Mixed Precision (FP16/BF16) — halbes Speicher für Aktivierungen, Gradienten in FP32 akkumuliert; (3) Gradient Accumulation — simuliere große Batches durch mehrere kleine `backward()`-Aufrufe.',
      preprompt: 'Warum braucht Backprop Speicher proportional zur Netztiefe?',
      miniExample:
        'GPT-3 Training: 175B Parameter × 4 Bytes (FP32) = 700 GB nur für Parameter. Plus Gradienten: 700 GB. Plus Optimizer-Zustände (Adam: 2× = 1{,}4 TB). Plus Aktivierungen. Deshalb: Mixed Precision, Gradient Checkpointing, Model Parallelism.',
      selfCheck: 'Was ist der Trade-off bei Gradient Checkpointing?',
    },
    {
      title: 'PyTorch Computational Graph: dynamisch und effizient',
      body: 'PyTorch erstellt den Berechnungsgraphen dynamisch ("define-by-run"): während des Forward Passes wird ein Tape aufgezeichnet, das alle Operationen und ihre lokalen Ableitungen enthält. `loss.backward()` traversiert dieses Tape rückwärts. `torch.no_grad()` deaktiviert das Tape — wichtig bei Inferenz (kein Speicher für Tape). `detach()` trennt einen Tensor vom Graph.',
      preprompt: 'Was ist der Unterschied zwischen einem statischen und dynamischen Computational Graph?',
      miniExample:
        '```python\n# Grad-Tape wird während Forward Pass aufgebaut:\nx = torch.randn(3, requires_grad=True)\ny = x.sum()  # Operation aufgezeichnet\ny.backward()  # Tape rückwärts traversiert\nprint(x.grad)  # tensor([1., 1., 1.])\n\n# Kein Tape bei Inferenz:\nwith torch.no_grad():\n    y = x.sum()  # Kein Grad-Tape\n```',
      selfCheck: 'Warum setzt man `model.eval()` und `torch.no_grad()` bei der Evaluation?',
    },
  ],

  codeBridges: [
    {
      title: 'Backprop durch 2-Layer-Netz: manuell vs. PyTorch',
      lang: 'python',
      code: `import torch
import torch.nn.functional as F

torch.manual_seed(0)

# === Netz-Setup ===
# 2-Layer-Netz: x(2) -> W1(2x3) -> h(3) -> W2(3x1) -> y_hat(1)
x = torch.tensor([[1.0, 2.0]])       # (1, 2) Eingabe
y = torch.tensor([[1.0]])            # (1, 1) Ziel

W1 = torch.randn(2, 3, requires_grad=True) * 0.3  # (2, 3)
b1 = torch.zeros(1, 3, requires_grad=True)         # (1, 3)
W2 = torch.randn(3, 1, requires_grad=True) * 0.3  # (3, 1)
b2 = torch.zeros(1, 1, requires_grad=True)         # (1, 1)

# === Forward Pass ===
z1 = x @ W1 + b1         # (1, 3)
a1 = torch.sigmoid(z1)   # (1, 3)
z2 = a1 @ W2 + b2        # (1, 1)
y_hat = torch.sigmoid(z2) # (1, 1)
loss = F.binary_cross_entropy(y_hat, y)

# === Backward Pass (PyTorch Autograd) ===
loss.backward()
W1_grad_autograd = W1.grad.clone()
W2_grad_autograd = W2.grad.clone()
print(f"Loss: {loss.item():.4f}")

# === Manueller Backward Pass ===
# Schritt 1: δ² = ŷ - y (BCE + Sigmoid Vereinfachung)
delta2 = y_hat.detach() - y           # (1, 1)

# Schritt 2: ∂L/∂W2 = a1^T · δ²
dW2 = a1.detach().T @ delta2          # (3, 1)

# Schritt 3: Gradient zurück zu Layer 1
# ∂L/∂a1 = δ² · W2^T
da1 = delta2 @ W2.detach().T          # (1, 3)
# Hadamard mit σ'(z1) = a1*(1-a1)
a1_val = a1.detach()
delta1 = da1 * a1_val * (1 - a1_val) # (1, 3) elementweise!

# Schritt 4: ∂L/∂W1 = x^T · δ¹
dW1 = x.T @ delta1                    # (2, 3)

print(f"\\nW1.grad autograd:  {W1_grad_autograd.numpy().round(6)}")
print(f"W1.grad manuell:   {dW1.numpy().round(6)}")
print(f"Identisch: {torch.allclose(W1_grad_autograd, dW1, atol=1e-5)}")

print(f"\\nW2.grad autograd:  {W2_grad_autograd.numpy().ravel().round(6)}")
print(f"W2.grad manuell:   {dW2.numpy().ravel().round(6)}")
print(f"Identisch: {torch.allclose(W2_grad_autograd, dW2, atol=1e-5)}")`,
      annotation:
        'Der manuelle Backward Pass implementiert exakt die Backpropagation-Formeln — und ist identisch mit PyTorch Autograd. `delta2 = y_hat - y` ist die BCE+Sigmoid-Vereinfachung (kein Gradient-Dämpfungsterm). `delta1` verwendet das Hadamard-Produkt $\\odot$ für die Element-weise Multiplikation mit $\\sigma\'(z_1)$.',
    },
    {
      title: 'Gradient Tape, torch.no_grad und Gradient Checkpointing',
      lang: 'python',
      code: `import torch
import torch.nn as nn
from torch.utils.checkpoint import checkpoint

# === Grad-Tape: dynamischer Berechnungsgraph ===
x = torch.tensor([2.0, 3.0], requires_grad=True)
y = x[0]**2 + x[1]**3  # y = x0^2 + x1^3
y.backward()
print(f"∂y/∂x0 = {x.grad[0].item()} (erwartet: 2*2=4)")
print(f"∂y/∂x1 = {x.grad[1].item()} (erwartet: 3*9=27)")

# === torch.no_grad: kein Tape → weniger Speicher ===
print("\\nSpeicher-Test (vereinfacht):")
x = torch.randn(1000, 1000, requires_grad=True)

with torch.no_grad():
    y_no_grad = (x**2).sum()
    print(f"no_grad: grad_fn={y_no_grad.grad_fn}")  # None!

y_with_grad = (x**2).sum()
print(f"with_grad: grad_fn={y_with_grad.grad_fn}")  # PowBackward...

# === Gradient Accumulation: große Batch-Größen simulieren ===
model = nn.Linear(10, 1)
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

accumulation_steps = 4  # Simuliere Batch-Größe 4×

for step in range(accumulation_steps):
    # Kleiner Mini-Batch
    mini_batch = torch.randn(8, 10)
    target = torch.randn(8, 1)

    pred = model(mini_batch)
    loss = nn.MSELoss()(pred, target) / accumulation_steps  # Skalieren!
    loss.backward()  # Gradienten akkumulieren (kein zero_grad!)

    if step == accumulation_steps - 1:
        # Nach allen Mini-Batches: Update
        optimizer.step()
        optimizer.zero_grad()
        print(f"Nach {accumulation_steps} Akkumulierungsschritten: Update durchgeführt")

# === autograd.grad: für benutzerdefinierte Gradienten-Flows ===
x = torch.tensor([3.0], requires_grad=True)
y = x**3  # y = x^3, dy/dx = 3x^2
# Berechne Gradient explizit (ohne .backward()):
grad_x = torch.autograd.grad(y, x, create_graph=True)[0]
print(f"\\n∂(x³)/∂x bei x=3: {grad_x.item()} (erwartet: 27)")
# create_graph=True: erlaubt zweite Ableitung
grad_xx = torch.autograd.grad(grad_x, x)[0]
print(f"∂²(x³)/∂x² bei x=3: {grad_xx.item()} (erwartet: 18)")`,
      annotation:
        '`torch.no_grad()` deaktiviert den Grad-Tape vollständig — kein Speicher für Zwischenaktivierungen. Bei Inferenz spart das je nach Modell 30-50% Speicher. Gradient Accumulation ist ein Standard-Trick um effektiv größere Batch-Größen zu simulieren ohne GPU-Speicher-Overflow.',
    },
  ],

  derivations: [
    {
      claim: 'Backprop-Update für vollverbundene Schicht: $\\frac{\\partial L}{\\partial W^{(l)}} = \\delta^{(l)} (a^{(l-1)})^T$',
      reasoning:
        'Schicht: $z^{(l)}_i = \\sum_k W^{(l)}_{ik} a^{(l-1)}_k + b^{(l)}_i$. Daher $\\frac{\\partial z^{(l)}_i}{\\partial W^{(l)}_{ij}} = a^{(l-1)}_j$. Kettenregel: $\\frac{\\partial L}{\\partial W^{(l)}_{ij}} = \\delta^{(l)}_i \\cdot a^{(l-1)}_j$. In Matrix-Form: $\\frac{\\partial L}{\\partial W^{(l)}} = \\delta^{(l)} (a^{(l-1)})^T$ — äußeres Produkt von Fehler und Aktivierung. Interpretation: wie stark beeinflusst $a^{(l-1)}_j$ den Fehler $\\delta^{(l)}_i$ über die Verbindung $W_{ij}$?',
    },
  ],

  commonMistakes: [
    {
      wrong: '`backward()` kann beliebig oft hintereinander aufgerufen werden.',
      correct: 'Nach dem ersten `backward()` wird der Graph freigegeben. Für mehrfache Aufrufe: `backward(retain_graph=True)` (teuer!).',
      explanation:
        'PyTorch gibt den Computational Graph nach `backward()` frei, um Speicher zu sparen. `retain_graph=True` verhindert das — nur in Spezialfällen sinnvoll (z.B. Higher-Order-Gradienten).',
    },
    {
      wrong: 'Gradienten akkumulieren sich nach mehreren `backward()`-Aufrufen — das ist ein Bug.',
      correct: 'Das ist eine bewusste Designentscheidung (Gradient Accumulation ist manchmal gewollt). Im Standardfall: immer `zero_grad()` aufrufen.',
      explanation:
        'Gradient Accumulation ist ein Standard-Trick für große effektive Batch-Größen. Wenn ungewollt, addieren sich Gradienten über mehrere Batches — das verändert das Lernverhalten drastisch.',
    },
    {
      wrong: '`model.eval()` deaktiviert automatisch Gradienten.',
      correct: '`model.eval()` betrifft nur Dropout und BatchNorm (Inference-Modus). Für keine Gradienten: zusätzlich `torch.no_grad()`.',
      explanation:
        'Für korrekte Inferenz: `model.eval()` + `with torch.no_grad()`. Ersteres stellt Schichten auf Eval-Modus, Letzteres deaktiviert das Grad-Tape.',
    },
  ],

  furtherResources: [
    {
      title: 'Karpathy: "The spelled-out intro to neural networks and backpropagation: building micrograd" (YouTube)',
      type: 'video',
      note: 'Das beste verfügbare Tutorial zu Backprop — baut vollständiges Autograd-System von Null auf in ~150 Zeilen Python. Pflichtansehen.',
    },
    {
      title: 'Colah: "Calculus on Computational Graphs: Backpropagation"',
      type: 'article',
      note: 'Klassischer Blog-Post mit Visualisierungen des Gradienten-Flusses durch Berechnungsgraphen.',
    },
    {
      title: 'Rumelhart, Hinton, Williams: "Learning representations by back-propagating errors" (1986)',
      type: 'article',
      note: 'Das Original-Backprop-Paper — historisch bedeutsam, erstaunlich lesbar und kompakt.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.kettenregel', relation: 'requires', hint: 'Backprop ist die multivariate Kettenregel — diese Lektion vertieft und verallgemeinert.' },
    { lessonId: 'p1.partielle-ableitungen-gradient', relation: 'requires', hint: 'Partielle Ableitungen: das Werkzeug für Gradienten in mehreren Variablen.' },
    { lessonId: 'p1.jacobi-hesse', relation: 'extends', hint: 'Jacobi-Matrix: die formale Verallgemeinerung des Gradienten für vektorwertige Funktionen.' },
    { lessonId: 'p1.ml-ableitungen', relation: 'requires', hint: 'Sigmoid-, ReLU-, Cross-Entropy-Ableitungen werden direkt in Backprop genutzt.' },
  ],

  reflection: 'Reverse-Mode AD ist effizienter als Forward-Mode für viele Parameter und einen Skalar-Loss. Aber für welchen Anwendungsfall wäre Forward-Mode besser? Und was bedeutet "Jacobian-free optimization" — wie kann man optimieren ohne die Jacobi-Matrix je zu berechnen?',
}
