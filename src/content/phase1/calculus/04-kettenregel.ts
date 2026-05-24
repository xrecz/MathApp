import type { Lesson } from '../../../types'

export const kettenregel: Lesson = {
  id: 'p1.kettenregel',
  title: 'Kettenregel',
  conceptTags: ['chain-rule', 'composition', 'leibniz', 'backprop-prep'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Kettenregel — die wichtigste Regel\n\nFür zusammengesetzte Funktionen $y = f(g(x))$:\n\n$(f \\circ g)\'(x) = f\'(g(x)) \\cdot g\'(x)$\n\nIn Leibniz-Notation (intuitiver): $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$ mit $u = g(x)$.\n\n**Rezept**: Erst die äußere Funktion ableiten (innen lassen), dann mit der Ableitung der inneren Funktion multiplizieren.',
      },
      {
        kind: 'math',
        content:
          '$$\\frac{d}{dx} f(g(x)) = \\underbrace{f\'(g(x))}_{\\text{äußere Ableitung}} \\cdot \\underbrace{g\'(x)}_{\\text{innere Ableitung}}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Backpropagation IST die Kettenregel, systematisch angewandt auf einen Berechnungsgraphen. Mehr nicht. Wer die Kettenregel versteht, versteht Backprop.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Drei Beispiele\n\n**Beispiel 1**: $y = (3x+1)^2$\n\nInnen: $u = 3x+1$, $u\' = 3$. Außen: $u^2$, Ableitung $2u$.\n\n$y\' = 2(3x+1) \\cdot 3 = 6(3x+1)$\n\n**Beispiel 2**: $y = e^{2x}$\n\nInnen: $u = 2x$, $u\' = 2$. Außen: $e^u$, Ableitung $e^u$.\n\n$y\' = e^{2x} \\cdot 2 = 2e^{2x}$\n\n**Beispiel 3 (geschachtelt)**: $y = \\sin(x^2)$\n\nInnen: $u = x^2$, $u\' = 2x$. Außen: $\\sin(u)$, Ableitung $\\cos(u)$.\n\n$y\' = \\cos(x^2) \\cdot 2x$',
      },
      {
        kind: 'worked-example',
        content:
          '**Kettenregel bei Backprop (schematisch)**:\n\nNetz: $x \\xrightarrow{w_1} z_1 \\xrightarrow{\\sigma} a_1 \\xrightarrow{w_2} z_2 \\xrightarrow{\\sigma} a_2 \\xrightarrow{L} \\text{Loss}$\n\n$\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial z_2} \\cdot \\frac{\\partial z_2}{\\partial a_1} \\cdot \\frac{\\partial a_1}{\\partial z_1} \\cdot \\frac{\\partial z_1}{\\partial w_1}$\n\nJeder Faktor ist eine lokale Ableitung — Kettenregel verbindet sie!',
      },
    ],
    practice: [
      {
        id: 'p1.chain.ex1',
        difficulty: 1,
        conceptTags: ['chain-rule'],
        type: 'mc',
        prompt: 'Ableitung von $(2x)^3$?',
        options: ['$24x^2$', '$6x^2$', '$8x^3$', '$3(2x)^2$'],
        answer: '$24x^2$',
        hints: [
          '$(2x)^3 = 8x^3$ — direkt ausmultiplizieren möglich.',
          'Kettenregel: außen $u^3 \\to 3u^2$, innen $2x \\to 2$.',
          '$3(2x)^2 \\cdot 2 = 3 \\cdot 4x^2 \\cdot 2 = 24x^2$.',
        ],
        explanation: '$(2x)^3\' = 3(2x)^2 \\cdot 2 = 12x^2 \\cdot 2 = 24x^2$. Oder direkt: $(8x^3)\' = 24x^2$.',
      },
      {
        id: 'p1.chain.ex2',
        difficulty: 2,
        conceptTags: ['chain-rule'],
        type: 'mc',
        prompt: 'Ableitung von $(3x+1)^2$?',
        options: ['$6(3x+1)$', '$2(3x+1)$', '$6(3x+1)^2$', '$9x + 3$'],
        answer: '$6(3x+1)$',
        hints: [
          'Kettenregel: außen $(\\cdot)^2 \\to 2(\\cdot)$, innen $3x+1 \\to 3$.',
          '$2(3x+1) \\cdot 3 = ?$',
          '$= 6(3x+1)$.',
        ],
        explanation: '$(3x+1)^2\' = 2(3x+1) \\cdot 3 = 6(3x+1) = 18x + 6$.',
      },
      {
        id: 'p1.chain.ex3',
        difficulty: 2,
        conceptTags: ['chain-rule'],
        type: 'mc',
        prompt: 'Ableitung von $e^{2x}$? ($(e^u)\' = e^u$)',
        options: ['$2e^{2x}$', '$e^{2x}$', '$2xe^{2x}$', '$e^{2x-1}$'],
        answer: '$2e^{2x}$',
        hints: [
          'Außen $e^u \\to e^u$, innen $u = 2x \\to 2$.',
          '$e^{2x} \\cdot 2 = ?$',
          '$= 2e^{2x}$.',
        ],
        explanation: '$(e^{2x})\' = e^{2x} \\cdot 2 = 2e^{2x}$. Allgemein: $(e^{ax})\' = a e^{ax}$.',
      },
      {
        id: 'p1.chain.ex4',
        difficulty: 3,
        conceptTags: ['chain-rule'],
        type: 'mc',
        prompt: 'Ableitung von $\\sin(x^2)$? ($(\\sin u)\' = \\cos u$)',
        options: ['$2x \\cos(x^2)$', '$\\cos(x^2)$', '$2x \\sin(x^2)$', '$x^2 \\cos(x^2)$'],
        answer: '$2x \\cos(x^2)$',
        hints: [
          'Außen $\\sin(u) \\to \\cos(u)$, innen $u = x^2 \\to 2x$.',
          '$\\cos(x^2) \\cdot 2x = ?$',
          '$= 2x \\cos(x^2)$.',
        ],
        explanation: '$(\\sin(x^2))\' = \\cos(x^2) \\cdot 2x = 2x\\cos(x^2)$.',
      },
      {
        id: 'p1.chain.ex5',
        difficulty: 3,
        conceptTags: ['chain-rule'],
        type: 'numeric',
        prompt:
          'Ableitung von $(x^2+1)^3$ bei $x = 1$: Außen $u^3 \\to 3u^2$, Innen $u = x^2+1 \\to 2x$. Bei $x=1$: $u=2$, $u\'=2$. $3 \\cdot 2^2 \\cdot 2 = ?$',
        answer: 24,
        hints: [
          'Kettenregel: $3(x^2+1)^2 \\cdot 2x$.',
          'Bei $x=1$: $3 \\cdot (1+1)^2 \\cdot 2 \\cdot 1 = 3 \\cdot 4 \\cdot 2$.',
          '$= 24$.',
        ],
        explanation: '$((x^2+1)^3)\' = 3(x^2+1)^2 \\cdot 2x$. Bei $x=1$: $3 \\cdot 4 \\cdot 2 = 24$.',
      },
      {
        id: 'p1.chain.ex6',
        difficulty: 4,
        conceptTags: ['chain-rule', 'backprop-prep'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Für $y = \\sigma(wx)$ — Ableitung nach $w$ (bei festem $x$)?',
        options: [
          "$\\sigma'(wx) \\cdot x$",
          "$\\sigma'(wx)$",
          "$\\sigma(wx) \\cdot w$",
          "$x \\cdot \\sigma(wx)(1-\\sigma(wx))$",
        ],
        answer: "$\\sigma'(wx) \\cdot x$",
        hints: [
          'Kettenregel: außen $\\sigma(u) \\to \\sigma\'(u)$, innen $u = wx \\to x$ (nach $w$ abgeleitet).',
          '$\\frac{d}{dw}\\sigma(wx) = \\sigma\'(wx) \\cdot x$.',
          'Der Faktor $x$ kommt von der inneren Ableitung nach $w$.',
        ],
        explanation:
          '$\\frac{d}{dw}\\sigma(wx) = \\sigma\'(wx) \\cdot \\frac{d}{dw}(wx) = \\sigma\'(wx) \\cdot x$. In expliziter Form: $\\sigma(wx)(1-\\sigma(wx)) \\cdot x$.',
        misconceptions: {
          "$x \\cdot \\sigma(wx)(1-\\sigma(wx))$": 'Das ist korrekt! Dasselbe wie $\\sigma\'(wx) \\cdot x$ — beide Formen sind äquivalent.',
        },
      },
      {
        id: 'p1.chain.ex7',
        difficulty: 4,
        conceptTags: ['chain-rule', 'backprop-prep'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: 3-Layer-Netz mit Aktivierungen $a_1, a_2, a_3$ und Loss $L(a_3)$. Form von $\\frac{\\partial L}{\\partial a_1}$?',
        options: [
          '$\\frac{\\partial L}{\\partial a_3} \\cdot \\frac{\\partial a_3}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial a_1}$',
          '$\\frac{\\partial L}{\\partial a_1} \\cdot \\frac{\\partial a_2}{\\partial a_1} \\cdot \\frac{\\partial a_3}{\\partial a_2}$',
          '$\\frac{\\partial a_1}{\\partial L}$',
          '$L \\cdot a_1 \\cdot a_2$',
        ],
        answer: '$\\frac{\\partial L}{\\partial a_3} \\cdot \\frac{\\partial a_3}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial a_1}$',
        hints: [
          'Kettenregel: $\\frac{dL}{da_1} = \\frac{dL}{da_3} \\cdot \\frac{da_3}{da_2} \\cdot \\frac{da_2}{da_1}$.',
          'Reihenfolge: von $L$ rückwärts durch den Graphen.',
          'Jeder Term ist eine lokale Ableitung im jeweiligen Layer.',
        ],
        explanation:
          'Kettenregel rückwärts durch den Graphen: $\\frac{\\partial L}{\\partial a_1} = \\frac{\\partial L}{\\partial a_3} \\cdot \\frac{\\partial a_3}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial a_1}$. Das ist Backpropagation in Reinform.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Kettenregel = Backpropagation\n\nBackpropagation ist die Kettenregel, systematisch auf einen Berechnungsgraphen angewandt. Ein Netz mit 100 Layers erfordert eine 100-fache Kettenregel:\n\n$\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial a_{100}} \\cdot \\frac{\\partial a_{100}}{\\partial a_{99}} \\cdots \\frac{\\partial a_2}{\\partial a_1} \\cdot \\frac{\\partial a_1}{\\partial w_1}$\n\nPyTorch führt das automatisch durch `loss.backward()` durch — rückwärts durch den Berechnungsgraphen, Kettenregel an jedem Knoten.',
      },
      {
        kind: 'callout',
        content:
          'Karpathys "micrograd" (150 Zeilen Python) implementiert genau diese Kettenregel für beliebige Berechnungsgraphen. Sein YouTube-Video "The spelled-out intro to neural networks and backpropagation: building micrograd" ist Pflicht-Ansehen. 3Blue1Brown "Essence of Calculus" Folge 4 visualisiert die Kettenregel.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.chain.card1',
      front: 'Kettenregel?',
      back: '$(f \\circ g)\'(x) = f\'(g(x)) \\cdot g\'(x)$.',
      conceptTags: ['chain-rule'],
    },
    {
      id: 'p1.chain.card2',
      front: 'Leibniz-Form der Kettenregel?',
      back: '$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$.',
      conceptTags: ['leibniz'],
    },
    {
      id: 'p1.chain.card3',
      front: 'Ableitung von $e^{ax}$?',
      back: '$a \\cdot e^{ax}$ (Kettenregel: außen $e^u$, innen $ax \\to a$).',
      conceptTags: ['chain-rule'],
    },
  ],

  learningOutcome:
    'Du verstehst und anwendest die Kettenregel für zusammengesetzte Funktionen, erkennst den direkten Zusammenhang zwischen Kettenregel und Backpropagation, und kannst manuell durch einen 2-schichtigen Berechnungsgraphen differenzieren.',

  description:
    'Die Kettenregel ist die wichtigste Ableitungsregel in ML — denn Backpropagation ist nichts anderes als die Kettenregel, systematisch auf einen Berechnungsgraphen angewandt. Jede Schicht eines neuronalen Netzes ist eine zusammengesetzte Funktion, und die Gradienten fließen rückwärts durch die Kette lokaler Ableitungen.',

  conceptSteps: [
    {
      title: 'Kettenregel: zusammengesetzte Funktionen ableiten',
      body: 'Für $y = f(g(x))$ gilt: $\\frac{dy}{dx} = f\'(g(x)) \\cdot g\'(x)$. In Leibniz-Notation: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$ mit $u = g(x)$. Rezept: (1) Identifiziere äußere und innere Funktion. (2) Leite äußere Funktion ab (lasse Innen unverändert). (3) Multipliziere mit Ableitung der inneren Funktion.',
      preprompt: 'Was ist eine zusammengesetzte Funktion? Gib ein Beispiel.',
      miniExample:
        '$y = \\sin(x^2)$: äußere Funktion $\\sin(u)$ mit $u = x^2$. Außen: $\\sin(u)\' = \\cos(u)$. Innen: $(x^2)\' = 2x$. Kettenregel: $y\' = \\cos(x^2) \\cdot 2x$.',
      selfCheck: 'Was ist die innere und äußere Funktion in $y = e^{-x^2}$?',
    },
    {
      title: 'Leibniz-Notation: Brüche kürzen (heuristisch)',
      body: 'Die Leibniz-Notation $\\frac{dy}{du} \\cdot \\frac{du}{dx} = \\frac{dy}{dx}$ sieht aus, als würde man $du$ kürzen. Das ist nicht exakt wahr (Ableitungen sind Grenzwerte, keine Brüche), aber als Merkregel perfekt. Bei mehrfach geschachtelten Funktionen $y = f(g(h(x)))$: $\\frac{dy}{dx} = \\frac{dy}{df} \\cdot \\frac{df}{dg} \\cdot \\frac{dg}{dx}$ — einfach die Kette verlängern.',
      preprompt: 'Wie schreibt man die Ableitung von $f(g(h(x)))$ auf?',
      miniExample:
        '$y = \\sigma(wx + b)$: drei Funktionen geschachtelt. $u_1 = wx+b$, $u_2 = \\sigma(u_1)$, $y = u_2$. $\\frac{dy}{dx} = \\frac{dy}{du_2} \\cdot \\frac{du_2}{du_1} \\cdot \\frac{du_1}{dx} = 1 \\cdot \\sigma\'(wx+b) \\cdot w = w \\cdot \\sigma\'(wx+b)$.',
      selfCheck: 'Welche Kette von Ableitungen ergibt $\\frac{d}{dx} \\ln(\\sin(x^2))$?',
    },
    {
      title: 'Kettenregel und Berechnungsgraph: lokale Ableitungen',
      body: 'Ein Berechnungsgraph stellt eine Funktion als gerichteten Graph dar: Knoten = Operationen, Kanten = Datenwerte. Die Kettenregel besagt: der Gradient eines Outputs bezüglich eines Inputs ist das **Produkt der lokalen Ableitungen** entlang des Pfades. Bei mehreren Pfaden (Verzweigungen): Gradienten werden summiert (Summenregel im Graph).',
      preprompt: 'Was ist ein Berechnungsgraph, und wie modelliert er eine Funktion?',
      miniExample:
        'Graph: $x \\xrightarrow{\\cdot w} z \\xrightarrow{\\sigma} a \\xrightarrow{\\text{MSE}} L$. Lokale Ableitungen: $\\frac{\\partial z}{\\partial w} = x$, $\\frac{\\partial a}{\\partial z} = \\sigma\'(z)$, $\\frac{\\partial L}{\\partial a} = 2(a - y)$. Kettenregel: $\\frac{\\partial L}{\\partial w} = 2(a-y) \\cdot \\sigma\'(z) \\cdot x$.',
      selfCheck: 'Was passiert mit dem Gradienten, wenn ein Knoten zwei Ausgabe-Kanten hat (Verzweigung)?',
    },
    {
      title: 'Backpropagation: die Kettenregel rückwärts',
      body: 'Backprop ist effizienter als Forward-Differentiation für viele Inputs: statt den Gradienten für jeden Parameter einzeln zu berechnen, traversiert man den Graph einmal rückwärts und berechnet alle Gradienten gleichzeitig. Das ist der Grund, warum Training tiefer Netze (Millionen Parameter) überhaupt möglich ist. Die Schlüssel-Einsicht: gemeinsame Teilausdrücke werden nur einmal berechnet und gecacht.',
      preprompt: 'Warum ist Rückwärtsdifferentiation effizienter als Vorwärtsdifferentiation für viele Parameter?',
      miniExample:
        'Netz mit $n = 10^6$ Parametern und 1 Loss: Forward-Diff würde $n$ Graph-Traversierungen brauchen (einmal pro Parameter). Backprop: 1 Traversierung rückwärts → alle $n$ Gradienten auf einmal. Faktor $n$ Speedup.',
      selfCheck: 'Wann wäre Forward-Differentiation effizienter als Backprop?',
    },
    {
      title: 'Aktivierungsfunktionen durch die Kettenregel',
      body: 'In neuronalen Netzen ist jeder Layer $a^{(l)} = \\sigma(W^{(l)} a^{(l-1)} + b^{(l)})$. Die Kettenregel durch $L$ Layers ergibt:\n$$\\frac{\\partial L}{\\partial W^{(1)}} = \\frac{\\partial L}{\\partial a^{(L)}} \\cdot \\prod_{l=2}^{L} \\left(\\frac{\\partial a^{(l)}}{\\partial a^{(l-1)}}\\right) \\cdot \\frac{\\partial a^{(1)}}{\\partial W^{(1)}}$$\nJeder Faktor enthält $\\sigma\' = \\sigma(1-\\sigma) \\leq 0{,}25$. Bei $L = 10$ Layers: $0{,}25^{10} \\approx 10^{-6}$ — Vanishing Gradient. ReLU hat $\\sigma\' = 1$ für $x > 0$, deshalb ResNets + ReLU.',
      preprompt: 'Warum verstärkt die Kettenregel das Vanishing-Gradient-Problem?',
      miniExample:
        'ResNet: statt $a^{(l)} = \\sigma(W^{(l)} a^{(l-1)})$ schreibt man $a^{(l)} = \\sigma(W^{(l)} a^{(l-1)}) + a^{(l-1)}$. Kettenregel: $\\frac{\\partial a^{(l)}}{\\partial a^{(l-1)}} = W^{(l)} \\sigma\'(\\dots) + I$. Der $+I$ Term (Skip Connection) sichert Gradient-Fluss.',
      selfCheck: 'Wie verhindert eine Skip Connection das Vanishing-Gradient-Problem mathematisch?',
    },
  ],

  codeBridges: [
    {
      title: 'Kettenregel manuell vs. PyTorch Autograd für 2-schichtiges Netz',
      lang: 'python',
      code: `import torch
import torch.nn.functional as F

# === Einfaches Beispiel: y = σ(wx + b) ===
w = torch.tensor(0.5, requires_grad=True)
b = torch.tensor(-0.3, requires_grad=True)
x = torch.tensor(2.0)
y_true = torch.tensor(1.0)

# Forward Pass
z = w * x + b        # z = wx + b
a = torch.sigmoid(z) # a = σ(z)
L = (a - y_true)**2  # MSE-Loss

# Backward: PyTorch Autograd
L.backward()
print(f"w.grad (autograd): {w.grad.item():.6f}")
print(f"b.grad (autograd): {b.grad.item():.6f}")

# === Manuell via Kettenregel ===
# dL/da = 2(a - y_true)
# da/dz = σ(z)(1-σ(z))  [Quotientenregel von Sigmoid]
# dz/dw = x
# dz/db = 1
# Kettenregel: dL/dw = dL/da * da/dz * dz/dw
a_val = torch.sigmoid(z).item()
dL_da = 2 * (a_val - y_true.item())
da_dz = a_val * (1 - a_val)  # Sigmoid-Ableitung
dz_dw = x.item()
dz_db = 1.0

dL_dw_manual = dL_da * da_dz * dz_dw  # Kettenregel!
dL_db_manual = dL_da * da_dz * dz_db

print(f"w.grad (manuell):  {dL_dw_manual:.6f}")
print(f"b.grad (manuell):  {dL_db_manual:.6f}")
# Sollte identisch sein!

# === 2-schichtiges Netz: Kettenregel durch 2 Layers ===
torch.manual_seed(42)
w1 = torch.tensor([[0.5, -0.3]], requires_grad=True)  # (1, 2)
w2 = torch.tensor([[0.8], [0.4]], requires_grad=True)  # (2, 1)
x_in = torch.tensor([[1.0, 2.0]])  # (1, 2)
y_target = torch.tensor([[1.0]])

# Forward
h = torch.sigmoid(x_in @ w1.T)  # (1, 1): Layer 1
y_out = torch.sigmoid(h @ w2)    # (1, 1): Layer 2
loss = F.mse_loss(y_out, y_target)

# Backward via Autograd
loss.backward()
print(f"\\n2-Layer-Netz:")
print(f"w1.grad: {w1.grad}")
print(f"w2.grad: {w2.grad}")
# Diese Gradienten entstehen durch Kettenregel über beide Layers`,
      annotation:
        'Der manuelle Kettenregel-Schritt zeigt, dass Autograd exakt dasselbe berechnet. Die Multiplikation $dL/da \\cdot da/dz \\cdot dz/dw$ ist die Kettenregel — PyTorch automatisiert genau das für beliebig tiefe Netze.',
    },
  ],

  derivations: [
    {
      claim: 'Backpropagation für ein 2-schichtiges Netz via Kettenregel',
      reasoning: 'Netz: $z^{(1)} = w^{(1)} x$, $a^{(1)} = \\sigma(z^{(1)})$, $z^{(2)} = w^{(2)} a^{(1)}$, $a^{(2)} = \\sigma(z^{(2)})$, $L = (a^{(2)} - y)^2$. Kettenregel rückwärts: $\\frac{\\partial L}{\\partial a^{(2)}} = 2(a^{(2)} - y)$; $\\frac{\\partial a^{(2)}}{\\partial z^{(2)}} = \\sigma\'(z^{(2)})$; $\\frac{\\partial z^{(2)}}{\\partial w^{(2)}} = a^{(1)}$; $\\frac{\\partial z^{(2)}}{\\partial a^{(1)}} = w^{(2)}$. Für $w^{(1)}$: $\\frac{\\partial L}{\\partial w^{(1)}} = 2(a^{(2)}-y) \\cdot \\sigma\'(z^{(2)}) \\cdot w^{(2)} \\cdot \\sigma\'(z^{(1)}) \\cdot x$. Das ist Backpropagation — eine wiederholte Anwendung der Kettenregel.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Die innere Ableitung vergessen: $(\\sin(x^2))\' = \\cos(x^2)$.',
      correct: 'Kettenregel: immer die äußere Ableitung mit der inneren Ableitung multiplizieren. Richtig: $(\\sin(x^2))\' = \\cos(x^2) \\cdot 2x$.',
      explanation: 'In Backprop entspricht das dem lokalen Gradienten (äußere Ableitung) mal dem einlaufenden Gradienten (innere Ableitung). Vergisst man den lokalen Gradienten, ist der gesamte Backprop falsch.',
    },
    {
      wrong: 'Bei Verzweigungen im Computational Graph werden die Gradienten aller Pfade multipliziert.',
      correct: 'Wenn ein Wert in mehreren Pfaden verwendet wird, werden die Gradienten summiert (Summenregel des Graphen).',
      explanation: 'Das ist der Grund, warum `w.grad` akkumuliert: PyTorch addiert bei jedem `backward()`-Aufruf den neuen Gradienten. Für Verzweigungen ist das korrekt — für mehrere Steps ohne `zero_grad()` nicht.',
    },
    {
      wrong: '`backward()` mehrfach aufrufen ohne `zero_grad()` liefert immer den richtigen aktuellen Gradienten.',
      correct: 'Gradienten akkumulieren sich in `param.grad`. Vor jedem neuen Schritt `optimizer.zero_grad()` oder `param.grad.zero_()` aufrufen.',
      explanation: 'Das akkumulierende Verhalten ist für Gradient Accumulation (großer effektiver Batch) nützlich — aber im Standard-Training-Loop ein häufiger Bug.',
    },
  ],

  furtherResources: [
    {
      title: 'Karpathy: Building micrograd from scratch',
      type: 'video',
      note: 'Baut Autograd von Grund auf — zeigt konkret wie Kettenregel in `backward()`-Funktionen implementiert wird. Pflichtansehen für tiefes Verständnis.',
    },
    {
      title: '3Blue1Brown: Essence of Calculus — Chain Rule',
      type: 'video',
      note: 'Folge 4: geometrische Intuition für die Kettenregel und warum "außen mal innen" funktioniert.',
    },
    {
      title: 'Colah: Calculus on Computational Graphs: Backpropagation',
      type: 'article',
      note: 'Klassischer Blog-Post der zeigt, wie Computational Graphs und Kettenregel zusammenhängen — Grundlage für modernes Autograd.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.ableitungsregeln', relation: 'requires', hint: 'Kettenregel ergänzt die vier Grundregeln für zusammengesetzte Funktionen.' },
    { lessonId: 'p1.ml-ableitungen', relation: 'extends', hint: 'Vollständiger Forward/Backward Pass eines Neurons mit Kettenregel.' },
    { lessonId: 'p1.multivariate-kettenregel-backprop', relation: 'extends', hint: 'Verallgemeinerung der Kettenregel auf mehrere Variablen: Backpropagation.' },
    { lessonId: 'p1.partielle-ableitungen-gradient', relation: 'see-also', hint: 'Partielle Ableitungen + Kettenregel = multivariates Backpropagation.' },
  ],

  reflection: 'Ein ResNet-Block addiert die Eingabe zur Ausgabe: $a^{(l)} = F(a^{(l-1)}) + a^{(l-1)}$. Wie verändert das die Kettenregel durch den Block? Und warum ermöglicht das Training von Netzen mit 100+ Layers, während reine Sigmoid-Netze bei 10 Layers scheitern?',
}
