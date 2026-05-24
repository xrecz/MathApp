import type { Lesson } from '../../types'

export const ersteAbleitungen: Lesson = {
  id: 'p0.ableitungen',
  title: 'Erste Ableitungen',
  conceptTags: ['derivative', 'calculus', 'rate-of-change'],
  estimatedMinutes: 18,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Was ist eine Ableitung?\n\nDie Ableitung $f\'(x)$ beschreibt die **momentane Änderungsrate** einer Funktion an einem Punkt $x$. Geometrisch ist sie die Steigung der **Tangente** an den Graphen im Punkt $(x, f(x))$.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-20 -80 200 160" width="200" height="160" xmlns="http://www.w3.org/2000/svg">
          <line x1="-10" y1="0" x2="180" y2="0" stroke="#6b7280" stroke-width="1"/>
          <line x1="0" y1="70" x2="0" y2="-70" stroke="#6b7280" stroke-width="1"/>
          <path d="M 10,40 Q 90,-60 170,40" stroke="#6366f1" stroke-width="2" fill="none"/>
          <line x1="50" y1="20" x2="140" y2="-40" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
          <circle cx="90" cy="-10" r="4" fill="#f59e0b"/>
          <text x="95" y="-15" fill="#f59e0b" font-size="10">Tangente</text>
          <text x="100" y="50" fill="#6366f1" font-size="10">f(x)=x²</text>
        </svg>`,
        caption: 'Tangente (gelb) berührt die Kurve im Punkt x',
      },
      {
        kind: 'text',
        content:
          '### Grenzwert-Definition\n\nDie Ableitung entsteht, wenn wir den Abstand zweier Punkte gegen Null gehen lassen (Sekante → Tangente):',
      },
      {
        kind: 'math',
        content:
          "$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$",
      },
    ],
    explain: [
      {
        kind: 'text',
        content: '### Ableitungsregeln\n\nFür den Alltag reichen wenige Regeln aus:',
      },
      {
        kind: 'math',
        content:
          '$$\\frac{d}{dx} x^n = n x^{n-1} \\quad \\text{(Potenzregel)}$$',
      },
      {
        kind: 'math',
        content:
          '$$(f + g)\' = f\' + g\' \\quad \\text{(Summenregel)}$$',
      },
      {
        kind: 'math',
        content: '$$(c \\cdot f)\' = c \\cdot f\' \\quad \\text{(konstanter Faktor)}$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $f(x) = 3x^2 + 2x$\n\n$f\'(x) = 3 \\cdot 2x^{2-1} + 2 \\cdot 1x^{1-1} = 6x + 2$',
      },
    ],
    practice: [
      {
        id: 'p0.ableitungen.ex1',
        difficulty: 1,
        conceptTags: ['derivative', 'power-rule'],
        type: 'mc',
        prompt: 'Was ist die Ableitung von $f(x) = x^2$?',
        options: ['$x$', '$2x$', '$x^3$', '$2$'],
        answer: '$2x$',
        hints: [
          'Nutze die Potenzregel: $\\frac{d}{dx} x^n = nx^{n-1}$.',
          'Mit $n=2$: $\\frac{d}{dx} x^2 = 2 \\cdot x^{2-1}$',
          '$2 \\cdot x^1 = 2x$.',
        ],
        explanation: 'Potenzregel: $\\frac{d}{dx} x^2 = 2x^{2-1} = 2x$.',
        misconceptions: {
          '$x$': 'Das wäre die Ableitung von $\\frac{x^2}{2}$, nicht von $x^2$.',
          '$2$': '$2$ wäre die zweite Ableitung (Ableitung von $2x$).',
        },
      },
      {
        id: 'p0.ableitungen.ex2',
        difficulty: 2,
        conceptTags: ['derivative', 'power-rule'],
        type: 'mc',
        prompt: 'Was ist die Ableitung von $f(x) = 5x^3$?',
        options: ['$5x^2$', '$15x^2$', '$5x^4$', '$15x$'],
        answer: '$15x^2$',
        hints: [
          'Potenzregel: $\\frac{d}{dx}(c \\cdot x^n) = c \\cdot n \\cdot x^{n-1}$.',
          '$5 \\cdot 3 \\cdot x^{3-1}$',
          '$15x^2$.',
        ],
        explanation: '$\\frac{d}{dx}(5x^3) = 5 \\cdot 3 \\cdot x^{3-1} = 15x^2$.',
      },
      {
        id: 'p0.ableitungen.ex3',
        difficulty: 2,
        conceptTags: ['derivative', 'evaluation'],
        type: 'numeric',
        prompt: 'Berechne $f\'(3)$ für $f(x) = x^2$.',
        answer: 6,
        hints: [
          'Bestimme zuerst $f\'(x)$.',
          "$f'(x) = 2x$. Setze $x = 3$ ein.",
          "$f'(3) = 2 \\cdot 3 = 6$.",
        ],
        explanation: "$f'(x) = 2x$, also $f'(3) = 2 \\cdot 3 = 6$.",
      },
      {
        id: 'p0.ableitungen.ex4',
        difficulty: 3,
        conceptTags: ['derivative', 'sum-rule'],
        type: 'symbolic',
        prompt: 'Berechne die Ableitung von $f(x) = 4x^3 + 2x$.',
        answer: '12x^2+2',
        acceptedAlternatives: ['12x²+2', '12x^2 + 2', '2+12x^2'],
        hints: [
          'Leite jeden Term einzeln ab (Summenregel).',
          '$\\frac{d}{dx}(4x^3) = 12x^2$ und $\\frac{d}{dx}(2x) = 2$.',
          "$f'(x) = 12x^2 + 2$.",
        ],
        explanation: "$f'(x) = 4 \\cdot 3x^2 + 2 \\cdot 1 = 12x^2 + 2$.",
      },
      {
        id: 'p0.ableitungen.ex5',
        difficulty: 4,
        conceptTags: ['derivative', 'evaluation', 'negative'],
        type: 'numeric',
        prompt: 'Berechne die Steigung von $f(x) = x^2$ bei $x = -1$.',
        answer: -2,
        hints: [
          "$f'(x) = 2x$.",
          "Setze $x = -1$ ein: $f'(-1) = 2 \\cdot (-1)$.",
          "$f'(-1) = -2$. Negative Steigung = Funktion fällt an dieser Stelle.",
        ],
        explanation:
          "$f'(x) = 2x$, $f'(-1) = 2 \\cdot (-1) = -2$. Die negative Steigung bedeutet, dass die Funktion an $x=-1$ fällt.",
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Gradient Descent — das Herz des ML\n\n**Gradient Descent** ist die Lernregel aller neuronalen Netze. Sie nutzt die Ableitung der Loss-Funktion bezüglich der Gewichte, um diese iterativ zu verbessern.',
      },
      {
        kind: 'math',
        content:
          '$$w \\leftarrow w - \\eta \\frac{\\partial L}{\\partial w}$$',
      },
      {
        kind: 'callout',
        content:
          'Jedes Mal, wenn ein Modell trainiert wird, läuft im Hintergrund nichts anderes als das, was du gerade gelernt hast: **Ableitungen berechnen** und einen kleinen Schritt in Gegenrichtung der Steigung gehen. $\\eta$ (eta) ist die **Lernrate** — wie groß der Schritt ist.',
      },
      {
        kind: 'text',
        content:
          '### Intuition\n\nStell dir vor, du stehst auf einem hügeligen Gelände und willst ins Tal. Du schaust, in welche Richtung es am steilsten bergab geht (Gradient) und machst einen Schritt in genau diese Richtung. Das ist Gradient Descent.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.ableitungen.card1',
      front: 'Was beschreibt die Ableitung $f\'(x)$ geometrisch?',
      back: 'Die Steigung der Tangente an den Graphen von $f$ im Punkt $x$.',
      conceptTags: ['derivative'],
    },
    {
      id: 'p0.ableitungen.card2',
      front: 'Wie lautet die Potenzregel der Differentiation?',
      back: '$\\frac{d}{dx} x^n = n x^{n-1}$',
      conceptTags: ['derivative', 'power-rule'],
    },
    {
      id: 'p0.ableitungen.card3',
      front: 'Was bedeutet eine negative Ableitung an einem Punkt?',
      back: 'Die Funktion fällt (hat eine negative Steigung) an diesem Punkt.',
      conceptTags: ['derivative'],
    },
  ],

  learningOutcome:
    'Du kannst die Ableitung als momentane Änderungsrate deuten, die Potenzregel und Summenregel anwenden und verstehst, warum der Gradient in ML nichts anderes als eine Ableitung ist.',

  description:
    'Die Ableitung misst, wie schnell sich eine Funktion ändert — geometrisch die Steigung der Tangente. Im ML ist der Gradient die Ableitung der Loss-Funktion nach den Gewichten, und Backpropagation ist systematisches Ableiten. Wer die Potenzregel beherrscht, versteht den Kern von Gradient Descent.',

  conceptSteps: [
    {
      title: 'Was misst die Ableitung?',
      preprompt: 'Du fährst mit einem Auto. Die Wegfunktion ist $s(t)$. Was misst dann $s\'(t)$? Und was misst $s\'\'(t)$?',
      body: 'Die **Ableitung** $f\'(x)$ misst die **momentane Änderungsrate** von $f$ an der Stelle $x$.\n\n- Geometrisch: Steigung der **Tangente** an den Graphen von $f$ im Punkt $(x, f(x))$\n- Physikalisch: Wenn $s(t)$ der Weg ist, dann ist $s\'(t)$ die Geschwindigkeit\n- Im ML: Wenn $L(w)$ der Loss ist, dann ist $L\'(w)$ der Gradient',
      miniExample: '$f(x) = x^2$: bei $x = 3$ ist die Tangente steil — $f\'(3) = 6$ (Steigung 6).',
      selfCheck: 'Was sagt $f\'(x) = 0$ aus? (Die Funktion hat an diesem Punkt eine horizontale Tangente — mögliches Minimum oder Maximum.)',
    },
    {
      title: 'Grenzwert des Differenzenquotienten',
      body: 'Die Ableitung entsteht, wenn der Abstand $h$ zwischen zwei Punkten gegen null geht:\n\n$$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$\n\nDer Bruch $\\dfrac{f(x+h) - f(x)}{h}$ heißt **Differenzenquotient** (Sekante). Im Grenzwert $h \\to 0$ wird er zur Tangente.\n\n$$\\frac{\\Delta y}{\\Delta x} \\xrightarrow{h \\to 0} \\frac{dy}{dx}$$',
      visual: `<svg viewBox="0 0 260 100" width="260" height="100" aria-label="Sekante wird zur Tangente">
        <rect x="0" y="0" width="260" height="100" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="10" y1="90" x2="250" y2="90" stroke="rgb(75 85 99)" stroke-width="1"/>
        <line x1="30" y1="10" x2="30" y2="92" stroke="rgb(75 85 99)" stroke-width="1"/>
        <path d="M 30,88 Q 130,20 240,10" stroke="rgb(99 102 241)" stroke-width="2" fill="none"/>
        <line x1="80" y1="72" x2="190" y2="32" stroke="rgb(248 113 113)" stroke-width="1.5" stroke-dasharray="5"/>
        <line x1="110" y1="60" x2="160" y2="44" stroke="rgb(251 191 36)" stroke-width="2"/>
        <circle cx="130" cy="52" r="3" fill="rgb(134 239 172)"/>
        <text x="140" y="35" fill="rgb(251 191 36)" font-size="9" font-family="monospace">Tangente</text>
        <text x="60" y="30" fill="rgb(248 113 113)" font-size="9" font-family="monospace">Sekante</text>
        <text x="95" y="90" fill="rgb(134 239 172)" font-size="9" font-family="monospace">x</text>
      </svg>`,
      miniExample: 'Für $f(x) = x^2$: $\\frac{(x+h)^2 - x^2}{h} = \\frac{2xh + h^2}{h} = 2x + h \\xrightarrow{h\\to 0} 2x$',
    },
    {
      title: 'Potenzregel: die wichtigste Regel',
      body: 'Die **Potenzregel** ist die meistgenutzte Ableitungsregel:\n\n$$\\frac{d}{dx} x^n = n \\cdot x^{n-1}$$\n\nBei konstantem Vorfaktor:\n\n$$\\frac{d}{dx} (c \\cdot x^n) = c \\cdot n \\cdot x^{n-1}$$\n\nUnd für Konstanten: $\\frac{d}{dx} c = 0$',
      miniExample: '$\\frac{d}{dx}(3x^4) = 3 \\cdot 4 \\cdot x^3 = 12x^3$',
      selfCheck: 'Was ist $\\frac{d}{dx}(x) = ?$ (Anwendung: $n=1$: $1 \\cdot x^0 = 1$. Die Ableitung von $x$ ist $1$.)',
    },
    {
      title: 'Summenregel und weitere Grundregeln',
      body: '**Summenregel**: Ableitung einer Summe = Summe der Ableitungen:\n\n$$(f + g)\' = f\' + g\'$$\n\n**Faktorregel**: Konstante Faktoren bleiben:\n\n$$(c \\cdot f)\' = c \\cdot f\'$$\n\n**Kombiniert**: Jedes Polynom lässt sich term-weise ableiten:\n\n$$\\frac{d}{dx}(a_n x^n + \\cdots + a_1 x + a_0) = n a_n x^{n-1} + \\cdots + a_1$$',
      miniExample: "$f(x) = 3x^2 + 2x + 5$: $f'(x) = 6x + 2$",
    },
    {
      title: 'Geometrische Bedeutung: Tangente und Steigung',
      body: 'Die Ableitung $f\'(x_0)$ gibt die **Steigung der Tangente** im Punkt $(x_0, f(x_0))$ an:\n\n- $f\'(x_0) > 0$: Funktion steigt bei $x_0$\n- $f\'(x_0) < 0$: Funktion fällt bei $x_0$\n- $f\'(x_0) = 0$: Funktion hat horizontale Tangente (Extremum möglich)\n\nDie Tangentengleichung lautet:\n\n$$t(x) = f\'(x_0) \\cdot (x - x_0) + f(x_0)$$',
      miniExample: "$f(x) = x^2$, $x_0 = 2$: $f'(2) = 4$. Tangente: $t(x) = 4(x-2) + 4 = 4x - 4$.",
      selfCheck: 'Bei welchem $x$ hat $f(x) = x^2 - 4x$ eine horizontale Tangente? ($f\'(x) = 2x - 4 = 0 \\Rightarrow x = 2$.)',
    },
    {
      title: 'ML-Anwendung: Gradient und Backpropagation',
      body: 'Der **Gradient** eines Loss $L(w)$ ist die Ableitung nach den Gewichten $w$:\n\n$$\\nabla_w L = \\frac{\\partial L}{\\partial w}$$\n\n**Gradient Descent** nutzt diese Ableitung, um Gewichte zu verbessern:\n\n$$w \\leftarrow w - \\eta \\cdot \\frac{\\partial L}{\\partial w}$$\n\n**Backpropagation** ist systematisches Anwenden der Kettenregel — zusammengesetzt aus genau den Ableitungsregeln, die du gerade gelernt hast.\n\nBeispiel: $L = (\\hat{y} - y)^2 = (wx - y)^2$\n$$\\frac{\\partial L}{\\partial w} = 2(wx - y) \\cdot x$$',
      miniExample: '$L(w) = (2w - 3)^2$: $\\frac{dL}{dw} = 2(2w-3) \\cdot 2 = 4(2w-3)$. Bei $w=2$: Gradient $= 4$.',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Autograd berechnet Ableitungen automatisch',
      lang: 'python',
      code: `import torch

# f(x) = x^2 — Ableitung f'(x) = 2x
x = torch.tensor(3.0, requires_grad=True)
f = x ** 2          # f(3) = 9

f.backward()        # berechnet df/dx = 2x = 2*3 = 6
print(x.grad)       # → tensor(6.)  ✓  (Potenzregel: 2 * 3^1 = 6)

# Gradient Descent Schritt (eta = 0.1)
eta = 0.1
# w = w - eta * df/dw
w = torch.tensor(5.0, requires_grad=True)
L = (w - 3) ** 2    # Loss: Parabel mit Minimum bei w=3
L.backward()
print(w.grad)       # → tensor(4.)  (dL/dw = 2*(5-3) = 4)
w_neu = w - eta * w.grad
print(w_neu)        # → 5.0 - 0.1*4 = 4.6  (Schritt Richtung Minimum)`,
      annotation: '`f.backward()` wendet intern die Potenzregel $\\frac{d}{dx} x^n = nx^{n-1}$ an. `x.grad` enthält $f\'(x) = 2x$, ausgewertet bei $x=3$: genau $6$. Der Update-Schritt $w \\leftarrow w - \\eta \\cdot \\frac{dL}{dw}$ ist buchstäblich Gradient Descent — die Ableitung sagt die Richtung.',
    },
  ],

  derivations: [
    {
      claim: 'Die Potenzregel: $\\frac{d}{dx} x^n = n x^{n-1}$',
      reasoning:
        'Mit dem Differenzenquotienten: $\\frac{(x+h)^n - x^n}{h}$. Mit dem Binomialsatz entwickelt man $(x+h)^n = x^n + nx^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\ldots$. Subtrahiert man $x^n$ und teilt durch $h$: $nx^{n-1} + \\binom{n}{2}x^{n-2}h + \\ldots$. Im Grenzwert $h \\to 0$ verschwinden alle Terme mit $h$: Ergebnis $= nx^{n-1}$.',
    },
  ],

  commonMistakes: [
    {
      wrong: "$\\frac{d}{dx}(x^3) = x^2$",
      correct: "$\\frac{d}{dx}(x^3) = 3x^2$",
      explanation:
        'Die Potenzregel: $nx^{n-1}$. Der Exponent $n$ multipliziert als Vorfaktor! $\\frac{d}{dx}(x^3) = 3 \\cdot x^{3-1} = 3x^2$.',
    },
    {
      wrong: "$(f \\cdot g)' = f' \\cdot g'$",
      correct: "$(f \\cdot g)' = f' g + f g'$ (Produktregel)",
      explanation:
        'Ableitungen verteilen sich nicht über Multiplikation! Summen ja (Summenregel), aber Produkte brauchen die Produktregel.',
    },
    {
      wrong: "$\\frac{d}{dx}(5) = 5$",
      correct: "$\\frac{d}{dx}(5) = 0$",
      explanation:
        'Die Ableitung einer Konstante ist immer 0 — eine Konstante hat keine Änderungsrate.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Derivative formulas through geometry" (YouTube)',
      type: 'video',
      note: 'Visuelle Herleitung der Potenzregel — macht intuitiv klar, warum $x^2$ die Ableitung $2x$ hat',
    },
    {
      title: 'Khan Academy: "Basic differentiation rules" (Video-Serie)',
      type: 'video',
      note: 'Schritt-für-Schritt Potenzregel, Summenregel, Faktorregel mit vielen Übungen',
    },
    {
      title: 'Serlo: "Differentialrechnung" — serlo.org/mathe/differentialrechnung',
      type: 'article',
      note: 'Deutsche Referenz mit Ableitungsregeln und Tangenten-Aufgaben',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.lineare-funktionen',
      relation: 'requires',
      hint: 'Die Ableitung einer linearen Funktion ist ihre Steigung — lineare Funktionen zuerst verstehen.',
    },
    {
      lessonId: 'p1.ableitungsregeln',
      relation: 'extends',
      hint: 'Produktregel, Quotientenregel und Kettenregel bauen direkt auf den Grundregeln dieser Lektion auf.',
    },
    {
      lessonId: 'p1.partielle-ableitungen-gradient',
      relation: 'extends',
      hint: 'Partielle Ableitungen verallgemeinern die Ableitung auf mehrere Variablen — das Fundament für den Gradienten in ML.',
    },
    {
      lessonId: 'p0.quadratische-funktionen',
      relation: 'see-also',
      hint: 'Das Minimum einer quadratischen Funktion liegt genau dort, wo die Ableitung null ist.',
    },
  ],

  reflection: 'Die Ableitung ist das mächtigste Werkzeug in der Mathematik des maschinellen Lernens. Backpropagation ist im Kern nichts anderes als systematisches Ableiten — tausende Male pro Sekunde, für Milliarden von Parametern. Was würde passieren, wenn eine Loss-Funktion keine Ableitung hätte?',
}
