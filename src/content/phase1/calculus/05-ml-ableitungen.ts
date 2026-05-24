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

  learningOutcome:
    'Du kannst den Forward und Backward Pass eines einzelnen Neurons vollständig von Hand durchführen, kennst die Ableitungen von Sigmoid, ReLU, Tanh und Cross-Entropy, und verstehst das Vanishing-Gradient-Problem mathematisch.',

  description:
    'Diese Lektion verbindet Ableitungsregeln und Kettenregel mit dem Kern des ML: dem Trainieren neuronaler Netze. Der Forward Pass ist eine Hintereinanderausführung von Funktionen, der Backward Pass ist Kettenregel durch diesen Berechnungsgraphen. Hier werden alle Ableitungsregeln zusammengeführt und auf die vier wichtigsten ML-Aktivierungsfunktionen angewandt.',

  conceptSteps: [
    {
      title: 'Forward Pass: Funktion durch ein Neuron',
      body: 'Ein einzelnes Neuron berechnet: (1) Linearkombination $z = w^T x + b$; (2) Aktivierung $a = \\sigma(z)$; (3) Loss $L = \\ell(a, y)$. Das ist ein Hintereinanderausführen von Funktionen — Composition. Der Forward Pass ist einfach: von links nach rechts durch den Berechnungsgraphen.',
      preprompt: 'Was berechnet ein einzelnes Neuron mathematisch?',
      miniExample:
        'Eines: $x = 2$, $w = 0{,}5$, $b = -0{,}3$. $z = 0{,}5 \\cdot 2 - 0{,}3 = 0{,}7$. $a = \\sigma(0{,}7) = 1/(1+e^{-0{,}7}) \\approx 0{,}668$. $y = 1$. $L = (0{,}668-1)^2 \\approx 0{,}110$.',
      selfCheck: 'Welche drei Schritte hat ein Forward Pass durch ein einzelnes Neuron?',
    },
    {
      title: 'Wichtige Ableitungen: $e^x$, $\\ln(x)$, Sigmoid, ReLU, Tanh',
      body: 'Auswendig kennen (in ML täglich gebraucht):\n- $(e^x)\' = e^x$ — $e^x$ leitet sich selbst ab\n- $(\\ln x)\' = 1/x$ — taucht in Cross-Entropy auf\n- $\\sigma\'(x) = \\sigma(x)(1-\\sigma(x)) \\leq 0{,}25$ — Vanishing Gradient\n- $\\text{ReLU}\'(x) = \\mathbf{1}[x > 0]$ — entweder $0$ oder $1$\n- $(\\tanh x)\' = 1 - \\tanh^2(x) \\leq 1$ — wie Sigmoid, aber zentriert\n- $(\\text{GELU})\'$: komplexer, aber überall differenzierbar',
      preprompt: 'Was sind die wichtigsten Aktivierungsfunktionen und ihre Eigenschaften?',
      miniExample:
        'ReLU bei $x = -5$: $\\text{ReLU}(-5) = 0$, $\\text{ReLU}\'(-5) = 0$ — toter Neuron. ReLU bei $x = 3$: $\\text{ReLU}(3) = 3$, $\\text{ReLU}\'(3) = 1$ — Gradient fließt unverändert.',
      selfCheck: 'Warum ist $\\sigma\'(x) \\leq 0{,}25$ für alle $x$?',
    },
    {
      title: 'Backward Pass: Kettenregel durch das Neuron',
      body: 'Backward Pass berechnet $\\frac{\\partial L}{\\partial w}$ und $\\frac{\\partial L}{\\partial b}$ via Kettenregel:\n$$\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}$$\nJeder Faktor ist eine lokale Ableitung: $\\frac{\\partial L}{\\partial a} = 2(a-y)$ (MSE), $\\frac{\\partial a}{\\partial z} = \\sigma\'(z)$, $\\frac{\\partial z}{\\partial w} = x$. Zusammen: $\\frac{\\partial L}{\\partial w} = 2(a-y) \\cdot \\sigma\'(z) \\cdot x$.',
      preprompt: 'In welcher Reihenfolge werden die Faktoren in der Kettenregel multipliziert?',
      miniExample:
        'Weiter aus Schritt 1: $a \\approx 0{,}668$, $y = 1$, $z = 0{,}7$, $x = 2$. $\\frac{\\partial L}{\\partial a} = 2(0{,}668-1) = -0{,}664$. $\\sigma\'(0{,}7) = 0{,}668 \\cdot 0{,}332 \\approx 0{,}222$. $\\frac{\\partial L}{\\partial w} = -0{,}664 \\cdot 0{,}222 \\cdot 2 \\approx -0{,}295$.',
      selfCheck: 'Was ist $\\frac{\\partial z}{\\partial b}$ und warum?',
    },
    {
      title: 'Cross-Entropy-Loss: Ableitung und Vereinfachung',
      body: 'Binärer Cross-Entropy-Loss: $L = -[y \\ln a + (1-y) \\ln(1-a)]$. Ableitung: $\\frac{\\partial L}{\\partial a} = -\\frac{y}{a} + \\frac{1-y}{1-a} = \\frac{a-y}{a(1-a)}$. Kombiniert mit Sigmoid-Aktivierung und Kettenregel ergibt sich das berühmte Ergebnis:\n$$\\frac{\\partial L}{\\partial z} = \\frac{\\partial L}{\\partial a} \\cdot \\sigma\'(z) = \\frac{a-y}{a(1-a)} \\cdot a(1-a) = a - y$$\nDie $a(1-a)$-Terme kürzen sich heraus — der Gradient ist einfach Vorhersage minus Label.',
      preprompt: 'Warum ist Cross-Entropy typischerweise besser als MSE für Klassifikation?',
      miniExample:
        'Cross-Entropy-Gradient: $a - y = 0{,}668 - 1 = -0{,}332$. Das ist viel einfacher als der MSE-Gradient ($-0{,}664 \\cdot 0{,}222 \\approx -0{,}147$). Und für sehr falsches Netz ($a = 0{,}01$, $y = 1$): $\\frac{\\partial L_{CE}}{\\partial z} = 0{,}01 - 1 = -0{,}99$ — starker Gradient. $\\frac{\\partial L_{MSE}}{\\partial z} = 2(0{,}01-1) \\cdot 0{,}01 \\cdot 0{,}99 \\approx -0{,}020$ — schwacher Gradient.',
      selfCheck: 'Warum hat Cross-Entropy mit Sigmoid ein einfacheres Gradient als MSE mit Sigmoid?',
    },
    {
      title: 'Vanishing Gradient: wenn die Kette zu lang wird',
      body: 'Bei $L$ Sigmoid-Layers multipliziert jeder Layer den Gradienten mit $\\sigma\'(x_l) \\leq 0{,}25$:\n$$\\frac{\\partial L}{\\partial w^{(1)}} \\propto \\prod_{l=1}^{L} \\sigma\'(x_l) \\leq 0{,}25^L$$\nFür $L = 10$: $\\leq 10^{-6}$. Frühe Layers lernen nichts. Lösungen: ReLU (Ableitung $\\in \\{0, 1\\}$, kein Shrinking), Skip Connections (Gradient durch Addition, kein Multiplikator), BatchNorm (stabilisiert Aktivierungen).',
      preprompt: 'Warum ist das Produkt vieler kleiner Zahlen so problematisch?',
      miniExample:
        '$0{,}25^{10} = 9{,}5 \\times 10^{-7}$. Das bedeutet: der Gradient des Loss bezüglich $w^{(1)}$ ist $10^6$ mal kleiner als beim letzten Layer. Mit einer typischen Lernrate $\\eta = 0{,}001$ bewegt sich $w^{(1)}$ pro Schritt um $10^{-9}$ — effektiv eingefroren.',
      selfCheck: 'Wie verhindert die Verwendung von ReLU das Vanishing-Gradient-Problem?',
    },
  ],

  codeBridges: [
    {
      title: 'Vollständiger Forward und Backward Pass eines einzelnen Neurons',
      lang: 'python',
      code: `import torch
import torch.nn.functional as F

# === Forward + Backward eines einzelnen Neurons von Hand ===
# Model: z = wx + b, a = σ(z), L = MSE(a, y)

x = torch.tensor(2.0)
y = torch.tensor(1.0)
w = torch.tensor(0.5, requires_grad=True)
b = torch.tensor(-0.3, requires_grad=True)

# Forward Pass
z = w * x + b          # z = wx + b = 0.7
a = torch.sigmoid(z)   # a = σ(0.7) ≈ 0.668
L = (a - y)**2         # MSE-Loss ≈ 0.110
print(f"Forward: z={z.item():.3f}, a={a.item():.3f}, L={L.item():.4f}")

# Backward Pass (PyTorch)
L.backward()
print(f"w.grad (autograd): {w.grad.item():.6f}")
print(f"b.grad (autograd): {b.grad.item():.6f}")

# Manueller Backward (Kettenregel)
a_val = a.item()
z_val = z.item()
dL_da = 2 * (a_val - y.item())           # MSE-Gradient
da_dz = a_val * (1 - a_val)              # σ'(z) = σ(z)(1-σ(z))
dz_dw = x.item()                          # ∂z/∂w = x
dz_db = 1.0                               # ∂z/∂b = 1
dL_dw = dL_da * da_dz * dz_dw            # Kettenregel!
dL_db = dL_da * da_dz * dz_db
print(f"w.grad (manuell): {dL_dw:.6f}")  # Identisch!

# === Cross-Entropy mit Sigmoid: vereinfachter Gradient ===
w2 = torch.tensor(0.5, requires_grad=True)
b2 = torch.tensor(-0.3, requires_grad=True)
z2 = w2 * x + b2
a2 = torch.sigmoid(z2)  # a2 ≈ 0.668

# BCE-Loss: -[y*log(a) + (1-y)*log(1-a)]
L_bce = F.binary_cross_entropy(a2, y)
L_bce.backward()
print(f"\\nBCE w.grad: {w2.grad.item():.6f}")  # = (a-y)*x

# Manuell: ∂L_BCE/∂z = a - y (wunderbare Vereinfachung!)
grad_bce_manual = (a2.item() - y.item()) * x.item()
print(f"(a-y)*x manue ll: {grad_bce_manual:.6f}")  # Identisch!

# === Aktivierungsfunktionen und ihre Ableitungen ===
x_test = torch.tensor([-2.0, -1.0, 0.0, 1.0, 2.0])
print("\\nAbleitungen der Aktivierungsfunktionen:")
for name, fn in [("sigmoid", torch.sigmoid), ("tanh", torch.tanh), ("relu", F.relu)]:
    x_req = x_test.clone().requires_grad_(True)
    out = fn(x_req).sum()
    out.backward()
    print(f"  {name:8s}: {x_req.grad.numpy().round(4)}")`,
      annotation:
        'Der BCE-Gradient vereinfacht sich wunderbar zu $a - y$ wenn Sigmoid und Cross-Entropy kombiniert werden — kein Vanishing Gradient-Term $\\sigma\'(z)$ bleibt übrig! Das ist ein wichtiger Grund, warum Sigmoid+BCE besser konvergiert als Sigmoid+MSE.',
    },
  ],

  derivations: [
    {
      claim: 'Sigmoid + Cross-Entropy: Gradient vereinfacht sich zu $a - y$',
      reasoning:
        '$L = -[y \\ln(a) + (1-y) \\ln(1-a)]$ mit $a = \\sigma(z)$. Partiell nach $a$: $\\frac{\\partial L}{\\partial a} = -\\frac{y}{a} + \\frac{1-y}{1-a} = \\frac{a-y}{a(1-a)}$. Mit $\\frac{\\partial a}{\\partial z} = \\sigma\'(z) = a(1-a)$ ergibt die Kettenregel: $\\frac{\\partial L}{\\partial z} = \\frac{a-y}{a(1-a)} \\cdot a(1-a) = a - y$. Die "schwierigen" Terme kürzen sich heraus — Ergebnis: Vorhersage minus Label.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'ReLU ist nicht differenzierbar bei $x = 0$ — deshalb hat Autograd einen Fehler.',
      correct: 'Autograd definiert ReLU\'(0) = 0 per Konvention (Subgradient).',
      explanation: 'Die Menge $\\{x = 0\\}$ hat Maß null — in der Praxis trifft ein Gradient diesen Punkt nie exakt. Alle Frameworks verwenden diese Konvention problemlos.',
    },
    {
      wrong: '$\\sigma\'(x)$ muss man immer neu berechnen.',
      correct: 'Im Forward Pass ist $\\sigma(x)$ bereits berechnet — cachen und wiederverwenden.',
      explanation: '$\\sigma\'(x) = \\sigma(x)(1-\\sigma(x))$. Wenn $a = \\sigma(z)$ gecacht ist, kostet der Backward Pass nur `a * (1 - a)` — keine erneute exp-Berechnung.',
    },
    {
      wrong: 'Vanishing Gradient tritt nur bei sehr tiefen Netzen auf.',
      correct: 'Schon bei 5–10 Sigmoid-Layers ist der Gradient auf $< 10^{-3}$ reduziert.',
      explanation: '$\\sigma\'(x) \\leq 0{,}25$ überall. Bei 10 Layers: $(0{,}25)^{10} \\approx 10^{-6}$. Deshalb sind ReLU und Residual-Verbindungen Standard.',
    },
  ],

  furtherResources: [
    {
      title: 'Karpathy: "The spelled-out intro to neural networks and backpropagation" (YouTube)',
      type: 'video' as const,
      note: 'Baut ein neuronales Netz von Hand inkl. Forward/Backward Pass — Pflichtansehen.',
    },
    {
      title: 'CS231n: "Backpropagation, Intuitions" (Stanford)',
      type: 'article' as const,
      note: 'Stanford-Skript zum Thema Backprop mit detaillierten Berechnungsgraph-Visualisierungen.',
    },
    {
      title: 'Goodfellow et al.: Deep Learning, Kapitel 6.5 (Backpropagation)',
      type: 'book' as const,
      note: 'Kanonische Darstellung von Backprop mit formalen Herleitungen.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.kettenregel', relation: 'requires', hint: 'Der Backward Pass ist Kettenregel durch den Berechnungsgraphen.' },
    { lessonId: 'p1.ableitungsregeln', relation: 'requires', hint: 'Ableitungen von $e^x$, $\\ln$, Sigmoid werden direkt angewandt.' },
    { lessonId: 'p1.multivariate-kettenregel-backprop', relation: 'extends', hint: 'Verallgemeinerung auf mehrere Layer und Matrixoperationen.' },
    { lessonId: 'p1.partielle-ableitungen-gradient', relation: 'see-also', hint: 'Mehrere Gewichte → partielle Ableitungen → Gradient-Vektor.' },
  ],

  reflection: 'Warum konvergiert Sigmoid+Cross-Entropy schneller als Sigmoid+MSE? Und was passiert genau bei einem "sterbenden ReLU"-Neuron — warum kann es sich nicht erholen?',
}
