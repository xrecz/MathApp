import type { Lesson } from '../../../types'

export const ableitungsregeln: Lesson = {
  id: 'p1.ableitungsregeln',
  title: 'Ableitungsregeln',
  conceptTags: ['power-rule', 'sum-rule', 'product-rule', 'quotient-rule'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Vier zentrale Ableitungsregeln\n\n**Potenzregel**: $(x^n)\' = n \\cdot x^{n-1}$\n\n**Summenregel**: $(f + g)\' = f\' + g\'$\n\n**Produktregel**: $(f \\cdot g)\' = f\'g + fg\'$\n\n**Quotientenregel**: $\\left(\\frac{f}{g}\\right)\' = \\frac{f\'g - fg\'}{g^2}$',
      },
      {
        kind: 'math',
        content:
          '$$(x^n)\' = n x^{n-1} \\qquad (fg)\' = f\'g + fg\' \\qquad \\left(\\frac{f}{g}\\right)\' = \\frac{f\'g - fg\'}{g^2}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Diese vier Regeln plus die Kettenregel sind alles, was PyTorch autograd intern braucht. Für jede elementare Operation ist eine Ableitung hinterlegt — die Regeln verketten sich automatisch.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Potenzregel — Beispiele\n\n$f(x) = x^5 \\Rightarrow f\'(x) = 5x^4$\n\n$f(x) = x^{1/2} = \\sqrt{x} \\Rightarrow f\'(x) = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$\n\n$f(x) = c \\text{ (konstant)} \\Rightarrow f\'(x) = 0$\n\n### Summenregel — Beispiel\n\n$f(x) = 3x^2 + 2x + 1 \\Rightarrow f\'(x) = 6x + 2$\n\n### Produktregel — Beispiel\n\n$f(x) = x \\cdot e^x$: hier $u = x$, $v = e^x$.\n\n$f\'(x) = u\'v + uv\' = 1 \\cdot e^x + x \\cdot e^x = (1+x)e^x$',
      },
      {
        kind: 'worked-example',
        content:
          '**Quotientenregel**: $f(x) = \\frac{x^2}{x+1}$\n\n$u = x^2$, $u\' = 2x$; $v = x+1$, $v\' = 1$.\n\n$f\'(x) = \\frac{2x(x+1) - x^2 \\cdot 1}{(x+1)^2} = \\frac{2x^2 + 2x - x^2}{(x+1)^2} = \\frac{x^2 + 2x}{(x+1)^2} = \\frac{x(x+2)}{(x+1)^2}$',
      },
    ],
    practice: [
      {
        id: 'p1.rules.ex1',
        difficulty: 1,
        conceptTags: ['power-rule'],
        type: 'mc',
        prompt: 'Ableitung von $x^3$?',
        options: ['$3x^2$', '$3x^3$', '$x^2$', '$3$'],
        answer: '$3x^2$',
        hints: [
          'Potenzregel: $(x^n)\' = n \\cdot x^{n-1}$.',
          '$n = 3$, also $3 \\cdot x^{3-1} = ?$',
          '$3x^2$.',
        ],
        explanation: '$(x^3)\' = 3x^{3-1} = 3x^2$.',
      },
      {
        id: 'p1.rules.ex2',
        difficulty: 1,
        conceptTags: ['power-rule'],
        type: 'numeric',
        prompt: 'Ableitung der konstanten Funktion $f(x) = 7$?',
        answer: 0,
        hints: [
          'Eine Konstante ändert sich nicht — keine Steigung.',
          'Formal: $7 = 7 \\cdot x^0$, Potenzregel: $7 \\cdot 0 \\cdot x^{-1} = 0$.',
          '$f\'(x) = 0$.',
        ],
        explanation: 'Konstanten haben Ableitung 0 — eine Horizontale hat Steigung 0.',
      },
      {
        id: 'p1.rules.ex3',
        difficulty: 2,
        conceptTags: ['sum-rule', 'power-rule'],
        type: 'mc',
        prompt: 'Ableitung von $4x^3 + 2x$?',
        options: ['$12x^2 + 2$', '$4x^2 + 2$', '$12x^3 + 2$', '$4x^2$'],
        answer: '$12x^2 + 2$',
        hints: [
          'Summenregel: beide Terme einzeln ableiten.',
          '$(4x^3)\' = 12x^2$ (Potenzregel mit Faktor 4).',
          '$(2x)\' = 2$. Zusammen: $12x^2 + 2$.',
        ],
        explanation: '$(4x^3 + 2x)\' = 12x^2 + 2$ via Summen- und Potenzregel.',
      },
      {
        id: 'p1.rules.ex4',
        difficulty: 3,
        conceptTags: ['product-rule'],
        type: 'mc',
        prompt: 'Ableitung von $x \\cdot e^x$? (Produktregel; $(e^x)\' = e^x$)',
        options: [
          '$(1+x)e^x$',
          '$x e^x$',
          '$e^x$',
          '$x^2 e^x$',
        ],
        answer: '$(1+x)e^x$',
        hints: [
          'Produktregel: $(uv)\' = u\'v + uv\'$.',
          '$u = x$, $u\' = 1$; $v = e^x$, $v\' = e^x$.',
          '$1 \\cdot e^x + x \\cdot e^x = (1+x)e^x$.',
        ],
        explanation: '$(x \\cdot e^x)\' = 1 \\cdot e^x + x \\cdot e^x = (1+x)e^x$.',
        misconceptions: {
          '$x e^x$': 'Produktregel vergessen! Nur $u \\cdot v\' = x e^x$ ist nicht die volle Ableitung.',
        },
      },
      {
        id: 'p1.rules.ex5',
        difficulty: 3,
        conceptTags: ['power-rule'],
        type: 'numeric',
        prompt: '$f(x) = x^4$, $f\'(2) = ?$',
        answer: 32,
        hints: [
          '$f\'(x) = 4x^3$.',
          '$f\'(2) = 4 \\cdot 2^3 = 4 \\cdot 8$.',
          '$= 32$.',
        ],
        explanation: '$f\'(x) = 4x^3$, $f\'(2) = 4 \\cdot 8 = 32$.',
      },
      {
        id: 'p1.rules.ex6',
        difficulty: 4,
        conceptTags: ['product-rule', 'power-rule'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: MSE-Loss $L(w) = (wx - y)^2$ für feste Konstanten $x = 2$, $y = 1$. Also $L(w) = (2w-1)^2$. $\\frac{dL}{dw} = ?$',
        options: [
          '$4(2w-1)$',
          '$2(2w-1)$',
          '$(2w-1)$',
          '$2w - 1$',
        ],
        answer: '$4(2w-1)$',
        hints: [
          'Ausmultiplizieren: $(2w-1)^2 = 4w^2 - 4w + 1$.',
          'Ableiten: $8w - 4 = 4(2w-1)$.',
          'Oder Kettenregel: außen $u^2 \\to 2u$, innen $(2w-1) \\to 2$. Ergibt $2(2w-1) \\cdot 2 = 4(2w-1)$.',
        ],
        explanation:
          '$(2w-1)^2\' = 2(2w-1) \\cdot 2 = 4(2w-1)$. Bei $w = 1$: $L\'(1) = 4(2-1) = 4$, also würde Gradient Descent $w$ um $4\\eta$ verkleinern.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Autograd = Ableitungsregeln automatisiert\n\nPyTorch autograd implementiert für jede elementare Operation deren Ableitung:\n\n- `a + b` → Summenregel: Gradient fließt unverändert zu beiden\n- `a * b` → Produktregel: Gradient zu $a$ ist $b$, zu $b$ ist $a$\n- `a ** n` → Potenzregel: Gradient zu $a$ ist $n \\cdot a^{n-1}$\n\nKarpathys "micrograd" zeigt, wie das in ~150 Zeilen Python implementiert ist — mit genau diesen vier Regeln plus Kettenregel.',
      },
      {
        kind: 'callout',
        content:
          'Die Quotientenregel wird selten direkt gebraucht — meist schreibt man $f/g$ als $f \\cdot g^{-1}$ und nutzt Produkt- plus Kettenregel. Für die Ableitung von $\\sigma(x) = 1/(1+e^{-x})$ kommt genau das zum Einsatz.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.rules.card1',
      front: 'Potenzregel?',
      back: '$(x^n)\' = n x^{n-1}$.',
      conceptTags: ['power-rule'],
    },
    {
      id: 'p1.rules.card2',
      front: 'Produktregel?',
      back: '$(fg)\' = f\'g + fg\'$.',
      conceptTags: ['product-rule'],
    },
    {
      id: 'p1.rules.card3',
      front: 'Quotientenregel?',
      back: '$(f/g)\' = (f\'g - fg\')/g^2$.',
      conceptTags: ['quotient-rule'],
    },
  ],

  learningOutcome:
    'Du beherrschst die vier zentralen Ableitungsregeln (Potenz-, Summen-, Produkt-, Quotientenregel) und kannst sie auf Polynome, Aktivierungsfunktionen und Loss-Funktionen anwenden. Du erkennst wie PyTorch Autograd diese Regeln automatisch einsetzt.',

  description:
    'Ableitungsregeln sind die Werkzeuge, die den Grenzwert-Beweis durch direktes Rechnen ersetzen. In ML sind diese Regeln in PyTorch Autograd eingebettet: für jede Operation (Addition, Multiplikation, Potenz) ist die Ableitung als "backward"-Funktion hinterlegt. Das Verständnis der Regeln erklärt, warum Autograd funktioniert und wie Gradienten fließen.',

  conceptSteps: [
    {
      title: 'Potenzregel: der universelle Starter',
      body: '$(x^n)\' = n \\cdot x^{n-1}$ gilt für alle reellen $n$ — nicht nur ganzzahlige! Damit: $(x^2)\' = 2x$, $(\\sqrt{x})\' = (x^{1/2})\' = \\frac{1}{2}x^{-1/2}$, $(1/x)\' = (x^{-1})\' = -x^{-2}$, $(c)\' = 0$ für Konstante $c$. Kombiniert mit der Summenregel lassen sich alle Polynome und rationalen Funktionen ableiten.',
      preprompt: 'Wie lautet die Potenzregel, und woher kommt sie (Binomialtheorem)?',
      miniExample:
        'Aktivierungsfunktion SiLU/Swish: $f(x) = x \\cdot \\sigma(x)$. Produktregel: $f\'(x) = \\sigma(x) + x \\cdot \\sigma\'(x)$. Für die Ableitung von $\\sigma$ brauchen wir Quotientenregel.',
      selfCheck: 'Berechne $(x^{-2})\'$ und $(x^{3/2})\'$ mit der Potenzregel.',
    },
    {
      title: 'Summen- und Skalierungsregel: Linearität der Ableitung',
      body: '$(f + g)\' = f\' + g\'$ und $(cf)\' = c \\cdot f\'$ für Konstante $c$. Zusammen: Die Ableitung ist linear. Das heißt: man kann Polynome termweise ableiten und Konstanten herausziehen. Diese Linearität ist auch der Grund, warum Gradient einer Linearkombination von Losses die entsprechende Linearkombination der Gradienten ist: $\\nabla(\\alpha L_1 + \\beta L_2) = \\alpha \\nabla L_1 + \\beta \\nabla L_2$.',
      preprompt: 'Was bedeutet "Linearität" in diesem Kontext?',
      miniExample:
        'Regularisierter Loss: $L = L_{\\text{CE}} + \\lambda \\|w\\|^2$. Gradient: $\\frac{\\partial L}{\\partial w} = \\frac{\\partial L_{\\text{CE}}}{\\partial w} + 2\\lambda w$. Summenregel macht das direkt möglich.',
      selfCheck: 'Leite $f(x) = 3x^4 - 2x^2 + 7x - 5$ ab.',
    },
    {
      title: 'Produktregel: $(fg)\' = f\'g + fg\'$',
      body: 'Die Produktregel besagt: die Ableitung eines Produkts ist "erste abgeleitet mal zweite" plus "erste mal zweite abgeleitet". Merkregel: "erste bleibt, zweite leitet; zweite bleibt, erste leitet; addiere." In ML erscheint die Produktregel beim Ableiten von Attention-Scores: $Q K^T / \\sqrt{d_k}$ ist ein Produkt, aber der eigentliche Einsatz ist in zusammengesetzten Verlustfunktionen.',
      preprompt: 'Warum ist $(fg)\' \\neq f\' \\cdot g\'$?',
      miniExample:
        '$f(x) = x \\cdot e^x$: $u = x$, $v = e^x$. $f\'(x) = 1 \\cdot e^x + x \\cdot e^x = (1+x)e^x$. Bei $x = 0$: $f\'(0) = 1$. Bei $x = -1$: $f\'(-1) = 0$ (lokales Minimum).',
      selfCheck: 'Leite $f(x) = x^2 \\cdot \\ln(x)$ ab (mit der Produktregel).',
    },
    {
      title: 'Quotientenregel: $(f/g)\' = (f\'g - fg\')/g^2$',
      body: 'Merkregel: "Zähler abgeleitet mal Nenner minus Zähler mal Nenner abgeleitet, geteilt durch Nenner zum Quadrat." Praxistipp: Oft ist es einfacher, $f/g = f \\cdot g^{-1}$ zu schreiben und Produktregel + Kettenregel zu benutzen. Wichtige Anwendung: Ableitung von $\\sigma(x) = 1/(1+e^{-x})$.',
      preprompt: 'Warum steht $g^2$ im Nenner der Quotientenregel?',
      miniExample:
        'Sigmoid-Ableitung: $\\sigma(x) = \\frac{1}{1+e^{-x}}$. Mit Quotientenregel: $\\sigma\'(x) = \\frac{0 \\cdot (1+e^{-x}) - 1 \\cdot (-e^{-x})}{(1+e^{-x})^2} = \\frac{e^{-x}}{(1+e^{-x})^2} = \\sigma(x)(1-\\sigma(x))$.',
      selfCheck: 'Leite $f(x) = \\frac{x^2}{x+1}$ ab und vereinfache.',
    },
    {
      title: 'Wichtige Ableitungen: $e^x$, $\\ln x$, $\\sin$, $\\cos$',
      body: 'Vier Ableitungen, die man auswendig kennen sollte:\n- $(e^x)\' = e^x$ — $e^x$ ist seine eigene Ableitung\n- $(\\ln x)\' = 1/x$ — taucht in Cross-Entropy auf\n- $(\\sin x)\' = \\cos x$, $(\\cos x)\' = -\\sin x$ — für Positional Encoding in Transformers\n\nIn ML: Cross-Entropy-Loss $L = -\\sum y_i \\ln(\\hat{y}_i)$ — Ableitung nach $\\hat{y}_i$ nutzt $(\\ln x)\'$.',
      preprompt: 'Warum ist $e^x$ die "natürlichste" Exponentialfunktion?',
      miniExample:
        'NLL-Loss: $L = -\\ln(p_y)$ für die wahre Klasse $y$. $\\frac{\\partial L}{\\partial p_y} = -1/p_y$. Mit Softmax-Gradient ergibt sich: $\\frac{\\partial L}{\\partial z_i} = p_i - y_i$ — der Softmax-CE-Gradient ist einfach Vorhersage minus Label.',
      selfCheck: 'Leite die logistische Verlustfunktion $L = -y \\ln(\\hat{p}) - (1-y)\\ln(1-\\hat{p})$ nach $\\hat{p}$ ab.',
    },
    {
      title: 'Autograd: Ableitungsregeln im Computational Graph',
      body: 'PyTorch Autograd speichert für jede Operation eine "backward"-Funktion, die der entsprechenden Ableitungsregel entspricht: `+` → Summenregel (Gradient fließt unverändert), `*` → Produktregel (kreuzweise), `**n` → Potenzregel. `backward()` traversiert den Graph rückwärts und multipliziert lokale Ableitungen (Kettenregel). Jeder Knoten im Graph ist eine der Ableitungsregeln.',
      preprompt: 'Wie kann man einem Computer beibringen, beliebige Funktionen zu differenzieren?',
      miniExample:
        '```python\nimport torch\na = torch.tensor(2.0, requires_grad=True)\nb = torch.tensor(3.0, requires_grad=True)\nc = a * b + a**2  # c = a*b + a^2\nc.backward()\n# dc/da = b + 2a = 3 + 4 = 7 (Produktregel + Potenzregel + Summenregel)\n# dc/db = a = 2 (Produktregel)\nprint(a.grad, b.grad)  # tensor(7.) tensor(2.)\n```',
      selfCheck: 'Welche Ableitungsregeln kombiniert PyTorch für `c = a**2 * (a + 1)`?',
    },
  ],

  codeBridges: [
    {
      title: 'Ableitungsregeln manuell vs. Autograd, Aktivierungsfunktionen',
      lang: 'python',
      code: `import torch
import torch.nn.functional as F
import numpy as np

# === Potenzregel + Summenregel: Polynom ===
x = torch.tensor(2.0, requires_grad=True)
# f(x) = 3x^4 - 2x^2 + 5x - 1
# f'(x) = 12x^3 - 4x + 5
f = 3*x**4 - 2*x**2 + 5*x - 1
f.backward()
analytisch = 12*2**3 - 4*2 + 5  # = 96 - 8 + 5 = 93
print(f"f'(2) analytisch: {analytisch}")
print(f"f'(2) autograd:   {x.grad.item()}")

# === Produktregel: x * e^x ===
x = torch.tensor(1.0, requires_grad=True)
# f(x) = x * e^x → f'(x) = (1+x)*e^x
f = x * torch.exp(x)
f.backward()
analytisch = (1 + 1) * np.e  # 2e ≈ 5.436
print(f"\\n(x*e^x)' bei x=1: {analytisch:.6f}")
print(f"Autograd:          {x.grad.item():.6f}")

# === Sigmoid-Ableitung: Quotientenregel ===
def sigmoid(x):
    return 1 / (1 + torch.exp(-x))

def sigmoid_grad_analytical(x):
    s = sigmoid(x)
    return s * (1 - s)  # σ(x)(1-σ(x))

x = torch.linspace(-4, 4, 9, requires_grad=False)
x_grad = x.clone().requires_grad_(True)
s = sigmoid(x_grad)
s.sum().backward()  # Gradient jedes Elements

print("\\nSigmoid-Ableitungen σ'(x) = σ(x)(1-σ(x)):")
print(f"x:          {x.detach().numpy()}")
print(f"Analytisch: {sigmoid_grad_analytical(x).detach().numpy().round(4)}")
print(f"Autograd:   {x_grad.grad.numpy().round(4)}")
# Maximum bei x=0: σ'(0) = 0.25 — das ist die Obergrenze!

# === ReLU vs. Sigmoid: Gradient-Sättigung ===
x = torch.tensor(10.0, requires_grad=True)
# Sigmoid bei x=10: fast 0 Gradient
sig = torch.sigmoid(x); sig.backward()
print(f"\\nσ'(10) = {x.grad.item():.10f}")  # ~0

x = torch.tensor(10.0, requires_grad=True)
relu = F.relu(x); relu.backward()
print(f"ReLU'(10) = {x.grad.item():.1f}")  # = 1 (kein Vanishing Gradient!)`,
      annotation:
        'Sigmoid hat eine maximale Ableitung von $0{,}25$ bei $x=0$. In einem 10-schichtigen Netz: $0{,}25^{10} \\approx 10^{-6}$ Gradient-Dämpfung. ReLU hat Ableitung $1$ für $x > 0$ — deshalb ist es Standard für tiefe Netze.',
    },
  ],

  derivations: [
    {
      claim: 'Sigmoid-Ableitung: $\\sigma\'(x) = \\sigma(x)(1-\\sigma(x))$',
      reasoning: '$\\sigma(x) = (1+e^{-x})^{-1}$. Quotientenregel (oder Kettenregel): $\\sigma\'(x) = -(1+e^{-x})^{-2} \\cdot (-e^{-x}) = \\frac{e^{-x}}{(1+e^{-x})^2}$. Umformen: $= \\frac{1}{1+e^{-x}} \\cdot \\frac{e^{-x}}{1+e^{-x}} = \\sigma(x) \\cdot \\frac{(1+e^{-x})-1}{1+e^{-x}} = \\sigma(x)(1 - \\sigma(x))$. Das Maximum liegt bei $x=0$: $\\sigma\'(0) = 0{,}5 \\cdot 0{,}5 = 0{,}25$.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Produktregel vergessen: $(fg)\' = f\' \\cdot g\'$.',
      correct: 'Produktregel: $(fg)\' = f\'g + fg\'$. Test: $(x \\cdot x)\' = 1 \\cdot x + x \\cdot 1 = 2x = (x^2)\'$. Korrekt.',
      explanation: 'Das naive Produkt der Ableitungen ist falsch. In Backprop: Produkte von Aktivierungen und Gewichten erfordern die Produktregel — deshalb hat jede Operation ihre eigene `backward()`-Funktion.',
    },
    {
      wrong: 'Bei der Quotientenregel: $(f/g)\' = (fg\' - gf\')/g^2$.',
      correct: 'Richtig: $(f/g)\' = (f\'g - fg\')/g^2$. Merkregel: "Zähler-Ableit mal Nenner minus Zähler mal Nenner-Ableit".',
      explanation: 'Verwechslung von Zähler und Nenner im Minuend führt zu falschem Vorzeichen. Am einfachsten: als $(f \\cdot g^{-1})\'$ via Produkt- und Kettenregel herleiten.',
    },
    {
      wrong: '$(c)\' = c$ für eine Konstante $c$.',
      correct: 'Konstanten haben Ableitung $0$. Eine Konstante ändert sich nicht — ihre Änderungsrate ist null.',
      explanation: 'In PyTorch: `requires_grad=False` für Konstanten/frozen Parameters. Beim Einfrieren von Layers (Transfer Learning) werden deren Parameter nicht differenziert.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: Essence of Calculus — Derivatives of Polynomials',
      type: 'video',
      note: 'Folge 3: geometrische Herleitung von Potenz- und Produktregel — warum diese Formeln so aussehen.',
    },
    {
      title: 'Karpathy: micrograd — backward functions',
      type: 'exercise',
      note: 'Zeigt konkret, wie Potenz-, Produkt- und Summenregel als `backward()`-Funktionen in einer Autograd-Engine implementiert werden.',
    },
    {
      title: 'Paul\'s Math Notes: Differentiation Formulas',
      type: 'article',
      note: 'Kompakte Referenz mit allen wichtigen Ableitungsformeln — als Cheat-Sheet nutzbar.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.ableitung-konzept', relation: 'requires', hint: 'Ableitungsregeln sind Abkürzungen für den Grenzwert-Beweis aus dem Ableitung-Konzept.' },
    { lessonId: 'p1.kettenregel', relation: 'extends', hint: 'Die Kettenregel ergänzt die vier Regeln für zusammengesetzte Funktionen.' },
    { lessonId: 'p1.ml-ableitungen', relation: 'extends', hint: 'Anwendung: Ableitungen von Sigmoid, ReLU, Cross-Entropy-Loss.' },
    { lessonId: 'p1.multivariate-kettenregel-backprop', relation: 'see-also', hint: 'Backprop verallgemeinert diese Regeln auf mehrere Variablen gleichzeitig.' },
  ],

  reflection: 'Warum hat Sigmoid eine maximale Ableitung von nur $0{,}25$, während ReLU für $x > 0$ immer Ableitung $1$ hat? Was bedeutet das für tiefe Netze — und warum haben neuere Aktivierungsfunktionen (GELU, SiLU) oft "weichere" Gradienten als ReLU?',
}
