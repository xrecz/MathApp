import type { Lesson } from '../../types'

export const quadratischeFunktionen: Lesson = {
  id: 'p0.quadratische-funktionen',
  title: 'Quadratische Funktionen & Parabeln',
  conceptTags: ['function', 'quadratic', 'parabola', 'vertex'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Quadratische Funktionen\n\nEine **quadratische Funktion** hat die Form $f(x) = ax^2 + bx + c$. Ihr Graph ist eine **Parabel**. Der Parameter $a$ bestimmt, ob sie nach oben ($a > 0$, Minimum) oder unten ($a < 0$, Maximum) öffnet.',
      },
      {
        kind: 'math',
        content:
          '$$f(x) = a(x - h)^2 + k \\quad \\text{Scheitelpunktform: Scheitel bei } (h, k)$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Der MSE-Loss als Funktion eines einzelnen Gewichts $w$ ist eine Parabel. Das Minimum der Parabel — der Scheitelpunkt — ist genau das, was Gradient Descent sucht.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Standardform → Scheitelpunktform\n\nDurch **vollständige Quadratergänzung** lässt sich $f(x) = ax^2 + bx + c$ in die Scheitelpunktform $a(x-h)^2 + k$ umschreiben.\n\n**Scheitel**: $h = -\\frac{b}{2a}$, $k = f(h)$\n\n**Symmetrie**: Die Parabel ist symmetrisch um $x = h$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $f(x) = x^2 - 4x + 7$\n\nScheitel: $h = \\frac{4}{2} = 2$, $k = f(2) = 4 - 8 + 7 = 3$\n\nScheitelpunktform: $f(x) = (x-2)^2 + 3$. Minimum: 3.',
      },
    ],
    practice: [
      {
        id: 'p0.parab.ex1',
        difficulty: 1,
        conceptTags: ['function', 'quadratic'],
        type: 'numeric',
        prompt: 'Berechne $f(3)$ für $f(x) = x^2$.',
        answer: 9,
        hints: [
          'Setze $x = 3$ ein.',
          '$f(3) = 3^2$',
          '$3^2 = 9$.',
        ],
        explanation: '$f(3) = 3^2 = 9$.',
      },
      {
        id: 'p0.parab.ex2',
        difficulty: 2,
        conceptTags: ['parabola', 'opening'],
        type: 'mc',
        prompt: 'Öffnet $f(x) = -2x^2 + 1$ nach oben oder nach unten?',
        options: ['Nach unten (Maximum)', 'Nach oben (Minimum)'],
        answer: 'Nach unten (Maximum)',
        hints: [
          'Der Koeffizient vor $x^2$ bestimmt die Öffnungsrichtung.',
          'Ist $a = -2$ positiv oder negativ?',
          '$a = -2 < 0$ → Parabel öffnet nach unten, hat ein Maximum.',
        ],
        explanation: '$a = -2 < 0$ → Parabel öffnet nach unten, Scheitelpunkt ist ein Maximum.',
        misconceptions: {
          'Nach oben (Minimum)': '$a < 0$ bedeutet nach unten geöffnet, nicht oben.',
        },
      },
      {
        id: 'p0.parab.ex3',
        difficulty: 2,
        conceptTags: ['vertex'],
        type: 'numeric',
        prompt: 'Was ist der Minimalwert (y-Wert des Scheitels) von $f(x) = (x-2)^2 + 5$?',
        answer: 5,
        hints: [
          'Die Scheitelpunktform ist $a(x-h)^2 + k$ — der Scheitel ist bei $(h, k)$.',
          'Hier ist $h = 2$ und $k = ?$.',
          '$k = 5$, also ist das Minimum $y = 5$.',
        ],
        explanation: 'Scheitelpunktform: $(x-2)^2 + 5$. Scheitel bei $(2, 5)$, Minimalwert $= 5$.',
      },
      {
        id: 'p0.parab.ex4',
        difficulty: 3,
        conceptTags: ['vertex', 'quadratic'],
        type: 'numeric',
        prompt: 'Berechne den Minimalwert von $f(x) = x^2 - 4x + 7$.',
        answer: 3,
        hints: [
          'Vollständige Quadratergänzung: $x^2 - 4x + 7 = (x-2)^2 + ?$',
          '$(x-2)^2 = x^2 - 4x + 4$, also $x^2 - 4x + 7 = (x-2)^2 + 3$.',
          'Minimalwert ist $k = 3$ (bei $x = 2$).',
        ],
        explanation:
          '$x^2 - 4x + 7 = (x-2)^2 + 3$. Scheitel bei $(2, 3)$, Minimum $= 3$.',
      },
      {
        id: 'p0.parab.ex5',
        difficulty: 4,
        conceptTags: ['quadratic', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Loss-Funktion $L(w) = (w - 2)^2$. Welches $w$ minimiert den Loss?',
        answer: 2,
        hints: [
          'Das ist eine Parabel in Scheitelpunktform.',
          'Scheitel der Parabel $(w-2)^2 + 0$ ist bei $w = 2$.',
          'Das Minimum ist bei $w = 2$, dort ist $L = 0$.',
        ],
        explanation:
          '$L(w) = (w-2)^2$ hat Minimum bei $w = 2$ (Scheitel der Parabel). Dort ist $L = 0$ — perfekte Vorhersage.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Parabeln und Gradient Descent\n\nIm einfachsten Fall — ein Parameter $w$, quadratische Loss-Funktion — sieht Gradient Descent so aus: Du stehst auf der Parabel und gehst immer in Richtung des steilsten Abstiegs, bis du unten bist (beim Scheitelpunkt).',
      },
      {
        kind: 'math',
        content:
          '$$w_{t+1} = w_t - \\eta \\cdot \\underbrace{\\frac{dL}{dw}}_{\\text{Steigung der Parabel}}$$',
      },
      {
        kind: 'callout',
        content:
          'In hochdimensionalen Räumen (Millionen Gewichte in einem LLM) ist die "Parabel" zu einer hochdimensionalen Fläche geworden — aber das Prinzip ist identisch. Der Scheitelpunkt wird zum Minimum in vielen Dimensionen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.parab.card1',
      front: 'Scheitelpunktform einer Parabel?',
      back: '$f(x) = a(x-h)^2 + k$, Scheitel bei $(h, k)$.',
      conceptTags: ['parabola', 'vertex'],
    },
    {
      id: 'p0.parab.card2',
      front: 'Wann öffnet die Parabel nach unten?',
      back: 'Wenn $a < 0$.',
      conceptTags: ['parabola'],
    },
    {
      id: 'p0.parab.card3',
      front: 'Wo liegt das Minimum von $f(x) = (x-c)^2$?',
      back: 'Bei $x = c$ (Scheitelpunkt).',
      conceptTags: ['vertex', 'quadratic'],
    },
  ],

  learningOutcome:
    'Du kannst Parabeln in Standard- und Scheitelpunktform beschreiben, den Scheitelpunkt berechnen und erkennst, warum der MSE-Loss als Parabel ein eindeutiges Minimum hat, das Gradient Descent findet.',

  description:
    'Quadratische Funktionen bilden die Parabel — die einfachste konvexe Funktion. Im ML ist der MSE-Loss als Funktion eines Gewichts genau eine Parabel: nach oben offen ($a > 0$), mit einem eindeutigen globalen Minimum am Scheitelpunkt. Das ist der Grund, warum lineare Regression immer konvergiert.',

  conceptSteps: [
    {
      title: 'Die Form der Parabel',
      preprompt: 'Wenn du einen Ball wirfst, beschreibt sein Weg eine Parabel. Was bestimmt, ob die Parabel weit oder schmal, nach oben oder unten geöffnet ist?',
      body: 'Eine **quadratische Funktion** hat die Form:\n\n$$f(x) = ax^2 + bx + c$$\n\n- $a \\neq 0$: bestimmt Öffnungsrichtung und Streckung\n- $a > 0$: Parabel öffnet **nach oben** (U-Form, Minimum)\n- $a < 0$: Parabel öffnet **nach unten** (∩-Form, Maximum)\n- $c = f(0)$: y-Achsenabschnitt',
      visual: `<svg viewBox="0 0 260 100" width="260" height="100" aria-label="Drei Parabeln">
        <rect x="0" y="0" width="260" height="100" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="10" y1="60" x2="250" y2="60" stroke="rgb(75 85 99)" stroke-width="1"/>
        <path d="M 30,90 Q 70,10 110,90" stroke="rgb(134 239 172)" stroke-width="2" fill="none"/>
        <path d="M 90,15 Q 130,95 170,15" stroke="rgb(248 113 113)" stroke-width="2" fill="none"/>
        <path d="M 150,90 Q 205,20 260,90" stroke="rgb(96 165 250)" stroke-width="2" fill="none"/>
        <text x="58" y="95" fill="rgb(134 239 172)" font-size="9" font-family="monospace">a&gt;0</text>
        <text x="118" y="12" fill="rgb(248 113 113)" font-size="9" font-family="monospace">a&lt;0</text>
        <text x="185" y="95" fill="rgb(96 165 250)" font-size="9" font-family="monospace">a&gt;0,h≠0</text>
      </svg>`,
      miniExample: '$f(x) = 2x^2$: schmal, nach oben. $f(x) = -x^2$: nach unten. $f(x) = 0{,}5x^2$: breit, nach oben.',
      selfCheck: 'Wie öffnet $f(x) = -3x^2 + x + 1$? (Nach unten, weil $a = -3 < 0$.)',
    },
    {
      title: 'Der Scheitelpunkt',
      body: 'Der **Scheitelpunkt** $(h, k)$ ist das Minimum ($a > 0$) oder Maximum ($a < 0$) der Parabel:\n\n$$h = -\\frac{b}{2a} \\qquad k = f(h) = c - \\frac{b^2}{4a}$$\n\nDie Parabel ist **symmetrisch** um $x = h$.\n\nMerkhilfe: $h = -\\frac{b}{2a}$ — minus $b$ durch $2a$.',
      miniExample: '$f(x) = x^2 - 4x + 7$: $h = -\\frac{-4}{2 \\cdot 1} = 2$, $k = f(2) = 4 - 8 + 7 = 3$. Scheitelpunkt: $(2, 3)$.',
      selfCheck: 'Wo liegt der Scheitelpunkt von $f(x) = 2x^2 + 8x + 3$? ($h = -8/(2 \\cdot 2) = -2$, $k = f(-2) = 8 - 16 + 3 = -5$. Scheitelpunkt: $(-2, -5)$.)',
    },
    {
      title: 'Streckung und Stauchung durch $a$',
      body: 'Der Parameter $a$ bestimmt, wie "schmal" oder "breit" die Parabel ist:\n\n- $|a| > 1$: schmal (gestreckt in y-Richtung)\n- $|a| < 1$: breit (gestaucht)\n- $|a| = 1$: Normalparabel\n\n**In ML**: Bei der Loss-Funktion $L(w) = a(w - w^*)^2$ bestimmt $a$ die **Krümmung** — je größer $a$, desto steiler der Loss und desto kleiner sollte $\\eta$ sein.',
      miniExample: '$L_1 = 0{,}1(w-3)^2$: flach, langsame Konvergenz. $L_2 = 10(w-3)^2$: steil, schnelle Konvergenz.',
    },
    {
      title: 'Scheitelpunktform',
      body: 'Die **Scheitelpunktform** macht den Scheitelpunkt direkt ablesbar:\n\n$$f(x) = a(x - h)^2 + k$$\n\n- Scheitelpunkt: $(h, k)$ — direkt aus der Formel\n- Umrechnung aus Standardform: **Quadratische Ergänzung**\n\n$$ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 + c - \\frac{b^2}{4a}$$',
      miniExample: '$x^2 - 4x + 7 = (x-2)^2 + 3$. Scheitelpunktform: $a=1$, $h=2$, $k=3$.',
      selfCheck: 'Schreibe $f(x) = x^2 + 6x + 5$ in Scheitelpunktform. ($(x+3)^2 - 4$, Scheitelpunkt $(-3, -4)$.)',
    },
    {
      title: 'ML-Anwendung: MSE-Loss als Parabel',
      body: 'Der **MSE-Loss** als Funktion eines einzelnen Gewichts $w$:\n\n$$L(w) = \\frac{1}{n} \\sum_{i=1}^n (wx_i - y_i)^2$$\n\nDas ist eine quadratische Funktion in $w$ mit $a = \\frac{1}{n}\\sum x_i^2 > 0$.\n\n- $a > 0$: **nach oben geöffnet** → eindeutiges globales Minimum\n- Scheitelpunkt = optimales $w^*$: $w^* = \\frac{\\sum x_i y_i}{\\sum x_i^2}$\n\nGradient Descent findet diesen Scheitelpunkt, indem er die Steigung der Parabel nutzt: $\\frac{dL}{dw} = 0$ am Scheitelpunkt.',
      miniExample: '$L(w) = (w-3)^2 + (w-1)^2 = 2w^2 - 8w + 10 = 2(w-2)^2 + 2$. Minimum bei $w = 2$.',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: MSE-Loss als quadratische Funktion visualisiert',
      lang: 'python',
      code: `import torch
import matplotlib.pyplot as plt

# MSE-Loss als Parabel: L(w) = (w - w_true)^2
w_true = 3.0          # optimales Gewicht (Scheitelpunkt der Parabel)

# Parabel auswerten für verschiedene w
w_vals = torch.linspace(-1, 7, 100)
L_vals = (w_vals - w_true) ** 2   # Parabel: a=1, h=3, k=0

# Gradient Descent auf der Parabel
w = torch.tensor(6.0, requires_grad=True)  # Startpunkt
eta = 0.3
for schritt in range(10):
    L = (w - w_true) ** 2   # Parabelwert
    L.backward()             # dL/dw = 2*(w - w_true)
    with torch.no_grad():
        w -= eta * w.grad    # Schritt Richtung Scheitelpunkt
    w.grad.zero_()
    print(f"Schritt {schritt+1}: w={w.item():.3f}, L={L.item():.3f}")
# Konvergiert gegen w = 3.0 (Scheitelpunkt)`,
      annotation: '`(w_vals - w_true) ** 2` erzeugt eine Parabel in $w$ mit Scheitelpunkt bei $w_{true}$. `L.backward()` berechnet $\\frac{dL}{dw} = 2(w - w_{true})$ — die Steigung der Parabel. Gradient Descent folgt dieser Steigung nach unten zum Scheitelpunkt. `L.item()` wird $0$ wenn $w = w_{true}$.',
    },
  ],

  derivations: [
    {
      claim: 'Das Minimum von $f(x) = ax^2 + bx + c$ liegt bei $x = -\\frac{b}{2a}$',
      reasoning:
        'Setze die Ableitung gleich null: $f\'(x) = 2ax + b = 0 \\Rightarrow x = -\\frac{b}{2a}$. Da $f\'\'(x) = 2a > 0$ (für $a > 0$) ist dies ein Minimum. Die quadratische Ergänzung bestätigt: $f(x) = a(x + \\frac{b}{2a})^2 + c - \\frac{b^2}{4a}$. Der Scheitelpunkt liegt bei $x = -\\frac{b}{2a}$, $y = c - \\frac{b^2}{4a}$.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Der Scheitelpunkt von $f(x) = (x-3)^2 + 5$ liegt bei $(-3, 5)$',
      correct: 'Scheitelpunkt bei $(3, 5)$',
      explanation:
        'In $f(x) = a(x-h)^2 + k$ ist der Scheitelpunkt $(h, k)$. Das Minuszeichen gehört zur Formel — $x - h = 0$ wenn $x = h = 3$ (nicht $-3$).',
    },
    {
      wrong: '$f(x) = -x^2 + 4$ hat ein Minimum',
      correct: '$f(x) = -x^2 + 4$ hat ein Maximum bei $(0, 4)$',
      explanation:
        '$a = -1 < 0$ → Parabel öffnet nach unten → Scheitelpunkt ist Maximum, kein Minimum.',
    },
    {
      wrong: 'Scheitelpunkt von $x^2 + 4x + 4$: Formel $h = -b/2a = -4/2 = -2$ nicht nötig',
      correct: 'Quadratische Ergänzung zeigt: $(x+2)^2 + 0$ → Scheitelpunkt $(-2, 0)$ — identisch mit $h = -2$',
      explanation:
        'Beide Methoden geben denselben Scheitelpunkt. Die quadratische Ergänzung macht den Weg explizit.',
    },
  ],

  furtherResources: [
    {
      title: 'Khan Academy: "Vertex form of parabolas" (Video)',
      type: 'video',
      note: 'Umrechnung zwischen Standard- und Scheitelpunktform; Minimum und Maximum bestimmen',
    },
    {
      title: 'Serlo: "Quadratische Funktionen" — serlo.org/mathe/quadratische-funktionen',
      type: 'article',
      note: 'Deutsche Referenz mit interaktiven Parabeln und vollständiger Quadratergänzung',
    },
    {
      title: '3Blue1Brown: "Convexity and the loss landscape" (Essence of Calculus)',
      type: 'video',
      note: 'Erklärt, warum konvexe Parabeln für ML-Training so wertvoll sind',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.quadratische-gleichungen',
      relation: 'see-also',
      hint: 'Nullstellen der Parabel $f(x) = 0$ sind die Lösungen der quadratischen Gleichung.',
    },
    {
      lessonId: 'p0.erste-ableitungen',
      relation: 'requires',
      hint: 'Das Minimum der Parabel liegt wo $f\'(x) = 0$ — Ableitungen sind das Werkzeug.',
    },
    {
      lessonId: 'p1.extrema-taylor',
      relation: 'extends',
      hint: 'Taylor-Entwicklung nähert beliebige Funktionen durch Polynome an — die quadratische Näherung (Parabel) ist für Optimierung entscheidend.',
    },
    {
      lessonId: 'p0.termumformungen',
      relation: 'requires',
      hint: 'Quadratische Ergänzung setzt binomische Formeln voraus.',
    },
  ],

  reflection: 'Der MSE-Loss ist eine Parabel — nach oben geöffnet, mit einem einzigen globalen Minimum. Das garantiert, dass Gradient Descent immer konvergiert. Warum hat ein tief neuronales Netz diese schöne Eigenschaft meistens nicht? Und was macht das Training dann so schwierig?',
}
