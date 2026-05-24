import type { Lesson } from '../../types'

export const lineareFunktionen: Lesson = {
  id: 'p0.lineare-funktionen',
  title: 'Lineare Funktionen',
  conceptTags: ['linear', 'function', 'slope'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Lineare Funktionen\n\nEine **lineare Funktion** hat die Form $f(x) = mx + b$. Dabei ist $m$ die **Steigung** (wie steil die Gerade ist) und $b$ der **y-Achsen-Abschnitt** (wo die Gerade die y-Achse schneidet).',
      },
      {
        kind: 'math',
        content: '$$f(x) = mx + b$$',
      },
      {
        kind: 'text',
        content:
          '### Wertetabelle für $f(x) = 2x + 1$\n\n| x | -2 | -1 | 0 | 1 | 2 |\n|---|----|----|---|---|---|\n| f(x) | -3 | -1 | 1 | 3 | 5 |',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-60 -60 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <line x1="-50" y1="0" x2="140" y2="0" stroke="#6b7280" stroke-width="1"/>
          <line x1="0" y1="-50" x2="0" y2="150" stroke="#6b7280" stroke-width="1"/>
          <line x1="-40" y1="90" x2="80" y2="-150" stroke="#6366f1" stroke-width="2"/>
          <text x="85" y="-5" fill="#6366f1" font-size="12">f(x)=2x+1</text>
          <text x="135" y="15" fill="#9ca3af" font-size="10">x</text>
          <text x="5" y="-45" fill="#9ca3af" font-size="10">y</text>
        </svg>`,
        caption: 'Graph von f(x) = 2x + 1',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Steigung aus zwei Punkten\n\nDie Steigung berechnet man aus zwei Punkten $(x_1, y_1)$ und $(x_2, y_2)$:',
      },
      {
        kind: 'math',
        content: '$$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\Delta y}{\\Delta x}$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: Punkte $(1, 3)$ und $(3, 7)$\n\n$m = \\frac{7-3}{3-1} = \\frac{4}{2} = 2$\n\nMit $b = y_1 - m \\cdot x_1 = 3 - 2 \\cdot 1 = 1$ ergibt sich $f(x) = 2x + 1$.',
      },
      {
        kind: 'text',
        content:
          '### Punkt-Steigungsform\n\nWenn Steigung $m$ und ein Punkt $(x_0, y_0)$ bekannt sind:\n\n$y - y_0 = m(x - x_0)$',
      },
    ],
    practice: [
      {
        id: 'p0.linear.ex1',
        difficulty: 1,
        conceptTags: ['linear'],
        type: 'mc',
        prompt: 'Welche der folgenden Funktionen ist linear?',
        options: ['$f(x) = x^2$', '$f(x) = 3x + 2$', '$f(x) = \\sin(x)$', '$f(x) = \\frac{1}{x}$'],
        answer: '$f(x) = 3x + 2$',
        hints: [
          'Eine lineare Funktion hat die Form $f(x) = mx + b$.',
          'Kein Exponent, keine trigonometrische Funktion, kein Bruch mit x im Nenner.',
          '$3x + 2$ ist vom Typ $mx + b$ mit $m=3, b=2$.',
        ],
        explanation: '$f(x) = 3x + 2$ ist genau vom Typ $mx + b$ — das ist die Definition einer linearen Funktion.',
        misconceptions: {
          '$f(x) = x^2$': '$x^2$ ist eine quadratische, keine lineare Funktion.',
        },
      },
      {
        id: 'p0.linear.ex2',
        difficulty: 2,
        conceptTags: ['linear', 'evaluation'],
        type: 'numeric',
        prompt: 'Berechne $f(3)$ für $f(x) = 2x + 1$.',
        answer: 7,
        hints: [
          'Setze $x = 3$ in $f(x) = 2x + 1$ ein.',
          '$f(3) = 2 \\cdot 3 + 1 = ?$',
          '$6 + 1 = 7$.',
        ],
        explanation: '$f(3) = 2 \\cdot 3 + 1 = 6 + 1 = 7$.',
      },
      {
        id: 'p0.linear.ex3',
        difficulty: 2,
        conceptTags: ['slope'],
        type: 'numeric',
        prompt: 'Berechne die Steigung durch die Punkte $(1, 3)$ und $(4, 9)$.',
        answer: 2,
        hints: [
          'Verwende die Formel $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
          '$m = \\frac{9-3}{4-1} = \\frac{6}{3}$',
          '$\\frac{6}{3} = 2$.',
        ],
        explanation: '$m = \\frac{9-3}{4-1} = \\frac{6}{3} = 2$.',
      },
      {
        id: 'p0.linear.ex4',
        difficulty: 3,
        conceptTags: ['linear', 'intercept'],
        type: 'mc',
        prompt: 'Was ist der y-Achsen-Abschnitt von $f(x) = -3x + 5$?',
        options: ['$-3$', '$5$', '$3$', '$-5$'],
        answer: '$5$',
        hints: [
          'Der y-Achsen-Abschnitt ist der Wert von $f(0)$.',
          '$f(0) = -3 \\cdot 0 + 5 = ?$',
          '$f(0) = 5$, also $b = 5$.',
        ],
        explanation: 'In $f(x) = mx + b$ ist $b = 5$ der y-Achsen-Abschnitt. Probe: $f(0) = -3 \\cdot 0 + 5 = 5$.',
        misconceptions: {
          '$-3$': '$-3$ ist die Steigung $m$, nicht der y-Achsen-Abschnitt.',
        },
      },
      {
        id: 'p0.linear.ex5',
        difficulty: 4,
        conceptTags: ['linear', 'equation'],
        type: 'symbolic',
        prompt: 'Schreibe die Gleichung der Geraden durch $(0, 2)$ und $(1, 5)$ in der Form $f(x) = mx + b$.',
        answer: '3x+2',
        acceptedAlternatives: ['y=3x+2', 'f(x)=3x+2', '3x + 2', 'y = 3x + 2'],
        hints: [
          'Berechne die Steigung: $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
          '$m = \\frac{5-2}{1-0} = 3$. Der y-Achsen-Abschnitt ist $b = 2$ (bei $x=0$).',
          '$f(x) = 3x + 2$.',
        ],
        explanation: '$m = \\frac{5-2}{1-0} = 3$, $b = 2$ (da der Punkt $(0,2)$ direkt auf der y-Achse liegt). Also $f(x) = 3x + 2$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Lineare Funktionen in ML\n\n**Lineare Regression** ist im einfachsten Fall genau eine lineare Funktion $\\hat{y} = mx + b$, deren Parameter $m$ und $b$ aus Daten **gelernt** werden. Das Perceptron — der Urvater aller neuronalen Netze — ist eine lineare Funktion plus Schwellenwert.',
      },
      {
        kind: 'math',
        content:
          '$$\\hat{y} = w_1 x_1 + w_2 x_2 + \\ldots + w_n x_n + b = \\mathbf{w}^\\top \\mathbf{x} + b$$',
      },
      {
        kind: 'callout',
        content:
          'Jedes Neuron in einem neuronalen Netz berechnet im Kern eine **gewichtete Summe** seiner Eingaben — genau dasselbe, was du gerade mit $mx + b$ gelernt hast. Die "Gewichte" $w$ entsprechen der Steigung $m$.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.linear.card1',
      front: 'Was beschreibt die allgemeine Form einer linearen Funktion?',
      back: '$f(x) = mx + b$, wobei $m$ die Steigung und $b$ der y-Achsen-Abschnitt ist.',
      conceptTags: ['linear'],
    },
    {
      id: 'p0.linear.card2',
      front: 'Wie berechnet man die Steigung aus zwei Punkten?',
      back: '$m = \\frac{y_2 - y_1}{x_2 - x_1}$',
      conceptTags: ['slope'],
    },
    {
      id: 'p0.linear.card3',
      front: 'Was ist die Punkt-Steigungsform einer Geraden?',
      back: '$y - y_0 = m(x - x_0)$, wobei $(x_0, y_0)$ ein bekannter Punkt auf der Geraden ist.',
      conceptTags: ['linear', 'slope'],
    },
  ],

  learningOutcome:
    'Du kannst eine lineare Funktion $f(x) = mx + b$ interpretieren, Steigung und y-Achsenabschnitt bestimmen und erkennst, warum jedes lineare Neuron in einem neuronalen Netz genau diese Struktur hat.',

  description:
    'Lineare Funktionen sind das Fundament aller neuronalen Netze: Jedes Neuron berechnet $y = Wx + b$ — die gewichtete Summe der Eingaben plus Bias. Wer Steigung, y-Achsenabschnitt und Nullstelle sicher beherrscht, versteht lineare Regression und das lineare Neuron sofort.',

  conceptSteps: [
    {
      title: 'Was bedeutet "linear"?',
      preprompt: 'Stell dir vor, du läufst eine Treppe hoch: jede Stufe ist gleich hoch. Wie beschreibst du mathematisch, wie hoch du nach $x$ Stufen bist?',
      body: 'Eine **lineare Funktion** hat die Form:\n\n$$f(x) = mx + b$$\n\n- $m$: **Steigung** — wie steil die Gerade ist\n- $b$: **y-Achsenabschnitt** — wo die Gerade die y-Achse schneidet\n- "linear" bedeutet: gleiche Änderung in $x$ → gleiche Änderung in $f(x)$',
      miniExample: '$f(x) = 2x + 1$: Jede Einheit mehr in $x$ erhöht $f(x)$ um genau $2$.',
      selfCheck: 'Ist $f(x) = x^2 + 1$ linear? (Nein — wegen $x^2$ ist die Änderungsrate nicht konstant.)',
    },
    {
      title: 'Die Steigung $m$',
      body: 'Die **Steigung** $m$ gibt an, wie stark $f(x)$ pro Einheit $x$ wächst:\n\n$$m = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}$$\n\n- $m > 0$: Gerade steigt\n- $m < 0$: Gerade fällt\n- $m = 0$: horizontale Gerade\n\nGeometrisch ist $m$ das **Steigungsdreieck**: $\\frac{\\text{Höhe}}{\\text{Breite}}$.',
      visual: `<svg viewBox="0 0 260 100" width="260" height="100" aria-label="Lineare Funktion mit Steigungsdreieck">
        <rect x="0" y="0" width="260" height="100" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="20" y1="90" x2="240" y2="90" stroke="rgb(75 85 99)" stroke-width="1"/>
        <line x1="40" y1="10" x2="40" y2="90" stroke="rgb(75 85 99)" stroke-width="1"/>
        <line x1="40" y1="80" x2="200" y2="20" stroke="rgb(96 165 250)" stroke-width="2"/>
        <line x1="120" y1="50" x2="200" y2="50" stroke="rgb(134 239 172)" stroke-width="1" stroke-dasharray="4"/>
        <line x1="200" y1="50" x2="200" y2="20" stroke="rgb(251 191 36)" stroke-width="1" stroke-dasharray="4"/>
        <text x="150" y="65" fill="rgb(134 239 172)" font-size="10" font-family="monospace">Δx</text>
        <text x="205" y="38" fill="rgb(251 191 36)" font-size="10" font-family="monospace">Δy</text>
        <text x="55" y="72" fill="rgb(156 163 175)" font-size="10" font-family="monospace">b</text>
        <text x="185" y="15" fill="rgb(96 165 250)" font-size="10" font-family="monospace">f(x)=mx+b</text>
      </svg>`,
      miniExample: 'Punkte $(1, 3)$ und $(3, 7)$: $m = \\frac{7-3}{3-1} = \\frac{4}{2} = 2$',
      selfCheck: 'Was bedeutet $m = -0{,}5$? (Die Gerade fällt: pro Einheit $x$ sinkt $f(x)$ um $0{,}5$.)',
    },
    {
      title: 'Der y-Achsenabschnitt $b$',
      body: 'Der **y-Achsenabschnitt** $b$ ist der Wert von $f(0)$ — wo die Gerade die y-Achse schneidet:\n\n$$f(0) = m \\cdot 0 + b = b$$\n\nUm $b$ aus zwei Punkten zu berechnen, erst $m$ bestimmen, dann:\n\n$$b = y_0 - m \\cdot x_0$$\n\nfür irgendeinen bekannten Punkt $(x_0, y_0)$.',
      miniExample: 'Steigung $m = 2$, Punkt $(1, 3)$: $b = 3 - 2 \\cdot 1 = 1$. Funktion: $f(x) = 2x + 1$.',
    },
    {
      title: 'Nullstelle: Wo schneidet die Gerade die x-Achse?',
      body: 'Die **Nullstelle** $x_0$ ist der Wert, bei dem $f(x_0) = 0$. Man setzt den Funktionswert gleich null:\n\n$$mx + b = 0 \\quad \\Rightarrow \\quad x_0 = -\\frac{b}{m} \\quad (m \\neq 0)$$',
      miniExample: '$f(x) = 2x + 1 = 0 \\Rightarrow x_0 = -\\frac{1}{2} = -0{,}5$',
      selfCheck: 'Hat $f(x) = 3$ (konstante Funktion) eine Nullstelle? (Nein — die Gerade liegt immer bei $y = 3$, schneidet die x-Achse nie.)',
    },
    {
      title: 'Schnittpunkt zweier Geraden',
      body: 'Zwei Geraden $f(x) = m_1 x + b_1$ und $g(x) = m_2 x + b_2$ schneiden sich dort, wo gilt:\n\n$$m_1 x + b_1 = m_2 x + b_2 \\quad \\Rightarrow \\quad x = \\frac{b_2 - b_1}{m_1 - m_2}$$\n\nSind $m_1 = m_2$ (gleiche Steigung): die Geraden sind **parallel** — kein Schnittpunkt (oder identisch).',
      miniExample: '$f(x) = x + 1$ und $g(x) = -x + 5$: $x + 1 = -x + 5 \\Rightarrow 2x = 4 \\Rightarrow x = 2$, $y = 3$.',
    },
    {
      title: 'ML-Anwendung: das lineare Neuron',
      body: 'Ein **lineares Neuron** in einem neuronalen Netz berechnet genau $f(x) = mx + b$:\n\n$$y = Wx + b$$\n\n- $W$ (Gewicht): entspricht der Steigung $m$\n- $b$ (Bias): entspricht dem y-Achsenabschnitt\n- **Lineare Regression**: minimiert $\\sum_i (Wx_i + b - y_i)^2$\n\nBei mehreren Eingaben: $y = w_1 x_1 + w_2 x_2 + \\cdots + w_n x_n + b = \\mathbf{w}^\\top \\mathbf{x} + b$\n\nDer **Gradient** $\\frac{\\partial L}{\\partial W}$ ist die Steigung der Loss-Funktion bezüglich $W$ — direkt das, was du als $m$ kennst.',
      miniExample: '`nn.Linear(1, 1)` in PyTorch lernt $W$ und $b$ aus Daten — genau $f(x) = Wx + b$.',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: nn.Linear als f(x) = Wx + b',
      lang: 'python',
      code: `import torch
import torch.nn as nn

# f(x) = mx + b — lineare Funktion als neuronale Schicht
linear = nn.Linear(in_features=1, out_features=1)  # 1 Eingabe, 1 Ausgabe

# Manuell: y = W * x + b (entspricht m*x + b)
x = torch.tensor([[3.0]])      # Eingabe x = 3
W = linear.weight              # entspricht Steigung m
b = linear.bias                # entspricht y-Achsenabschnitt

y_manuell = W * x + b         # direkte Formel
y_pytorch = linear(x)         # identisch, aber kürzer

# Lineare Regression: Loss = (y_hat - y_true)^2
# Gradient dL/dW = Steigung der Loss-Funktion bzgl. W
y_true = torch.tensor([[7.0]])
loss = (y_pytorch - y_true) ** 2
loss.backward()                # berechnet dL/dW und dL/db
# Steigung m wird um eta * dL/dW angepasst`,
      annotation: '`nn.Linear` ist buchstäblich $y = Wx + b$ — das ist keine Metapher. `linear.weight` ist $m$, `linear.bias` ist $b$. Nach `loss.backward()` enthält `linear.weight.grad` die Ableitung $\\frac{\\partial L}{\\partial W}$ — die Steigung der Loss-Funktion, genau wie $m = \\frac{\\Delta y}{\\Delta x}$.',
    },
  ],

  derivations: [
    {
      claim: 'Die Steigungsformel $m = \\frac{y_2 - y_1}{x_2 - x_1}$ folgt aus der Linearität',
      reasoning:
        'Bei einer linearen Funktion $f(x) = mx + b$ gilt für zwei Punkte $(x_1, y_1)$ und $(x_2, y_2)$: $y_2 - y_1 = (mx_2 + b) - (mx_1 + b) = m(x_2 - x_1)$. Division durch $(x_2 - x_1)$ ergibt $m = \\frac{y_2 - y_1}{x_2 - x_1}$. Die Steigung ist also überall dieselbe — das ist das Charakteristikum linearer Funktionen.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Die Steigung von $f(x) = 3x + 2$ ist $2$',
      correct: 'Die Steigung ist $m = 3$, der y-Achsenabschnitt ist $b = 2$',
      explanation:
        'In $f(x) = mx + b$ ist $m$ der Koeffizient vor $x$ (= Steigung), und $b$ der Term ohne $x$ (= y-Achsenabschnitt). Verwechslung dieser beiden ist sehr häufig.',
    },
    {
      wrong: 'Parallele Geraden haben gleichen y-Achsenabschnitt',
      correct: 'Parallele Geraden haben gleiche Steigung $m$, aber unterschiedliche $b$',
      explanation:
        'Parallel bedeutet: identische Steigung. Der y-Achsenabschnitt kann unterschiedlich sein — dann liegen die Geraden verschoben übereinander.',
    },
    {
      wrong: 'Die Nullstelle ist immer positiv',
      correct: 'Die Nullstelle $x_0 = -b/m$ kann negativ, null oder positiv sein',
      explanation:
        'Das Vorzeichen der Nullstelle hängt von den Vorzeichen von $b$ und $m$ ab. Zum Beispiel: $f(x) = 2x + 4$: $x_0 = -4/2 = -2$ (negativ).',
    },
  ],

  furtherResources: [
    {
      title: 'Khan Academy: "Introduction to linear functions" (Video)',
      type: 'video',
      note: 'Klare visuelle Einführung in Steigung und y-Achsenabschnitt; 8 Minuten',
    },
    {
      title: 'Serlo: "Lineare Funktionen" — serlo.org/mathe/lineare-funktionen',
      type: 'article',
      note: 'Deutsche Referenz mit interaktiven Graphen und Übungsaufgaben',
    },
    {
      title: '3Blue1Brown: "But what is a neural network?" (YouTube)',
      type: 'video',
      note: 'Zeigt anschaulich, wie lineare Transformationen $Wx + b$ in Netzwerken kombiniert werden',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.erste-ableitungen',
      relation: 'extends',
      hint: 'Die Steigung $m$ einer linearen Funktion ist ihre Ableitung — konstant überall.',
    },
    {
      lessonId: 'p0.quadratische-funktionen',
      relation: 'extends',
      hint: 'Quadratische Funktionen verallgemeinern lineare Funktionen: $f(x) = ax^2 + bx + c$ enthält $bx + c$ als linearen Anteil.',
    },
    {
      lessonId: 'p1.matrizen-lineare-abbildungen',
      relation: 'extends',
      hint: 'In höheren Dimensionen wird $f(x) = Wx + b$ zu einer Matrizenmultiplikation — die gleiche Struktur, nur vektoriell.',
    },
    {
      lessonId: 'p0.brueche',
      relation: 'requires',
      hint: 'Steigungsberechnung $m = \\frac{\\Delta y}{\\Delta x}$ erfordert sicheres Bruchrechnen.',
    },
  ],

  reflection: 'Die lineare Funktion $f(x) = mx + b$ ist das einfachste Modell der Welt — und gleichzeitig das Herz jedes neuronalen Netzes. Jede Schicht in GPT-4 berechnet im Kern $Wx + b$. Was macht dann neuronale Netze so mächtig? (Antwort: Nichtlinearitäten — Aktivierungsfunktionen — zwischen den linearen Schichten.)',
}
