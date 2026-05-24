import type { Lesson } from '../../types'

export const trigonometrie: Lesson = {
  id: 'p0.trigonometrie',
  title: 'Trigonometrie & Einheitskreis',
  conceptTags: ['trigonometry', 'sine', 'cosine', 'unit-circle', 'radian'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Einheitskreis & Winkelfunktionen\n\nDer **Einheitskreis** hat Radius 1. Für jeden Punkt auf dem Kreis gilt: $x = \\cos(\\theta)$ und $y = \\sin(\\theta)$, wobei $\\theta$ der Winkel ist.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-80 -80 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="60" stroke="#4b5563" stroke-width="1" fill="none"/>
          <line x1="-70" y1="0" x2="70" y2="0" stroke="#6b7280" stroke-width="1"/>
          <line x1="0" y1="-70" x2="0" y2="70" stroke="#6b7280" stroke-width="1"/>
          <line x1="0" y1="0" x2="42" y2="-42" stroke="#6366f1" stroke-width="2"/>
          <circle cx="42" cy="-42" r="3" fill="#f59e0b"/>
          <line x1="42" y1="0" x2="42" y2="-42" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3"/>
          <line x1="0" y1="0" x2="42" y2="0" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3"/>
          <text x="22" y="12" fill="#ef4444" font-size="9">cos θ</text>
          <text x="46" y="-20" fill="#10b981" font-size="9">sin θ</text>
          <text x="5" y="-20" fill="#6366f1" font-size="9">1</text>
        </svg>`,
        caption: 'Einheitskreis: cos = x-Koordinate, sin = y-Koordinate',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Sinusoidal Positional Encodings in Transformern (die Basis von ChatGPT, Claude, allen LLMs) nutzen $\\sin$ und $\\cos$ mit verschiedenen Frequenzen, um Tokens ihre Position in der Sequenz mitzugeben.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Bogenmaß vs. Grad\n\nWinkel lassen sich in Grad ($°$) oder **Bogenmaß** (Radiant) messen.\n\n$180° = \\pi$ Radiant $\\approx 3{,}14159$ Radiant\n\n$360° = 2\\pi$ Radiant\n\nML-Code nutzt immer Bogenmaß (z.B. `np.sin(np.pi / 2)`).',
      },
      {
        kind: 'text',
        content:
          '### Wichtige Werte\n\n| Winkel | Radiant | $\\sin$ | $\\cos$ |\n|--------|---------|--------|---------|\n| $0°$ | $0$ | $0$ | $1$ |\n| $90°$ | $\\pi/2$ | $1$ | $0$ |\n| $180°$ | $\\pi$ | $0$ | $-1$ |\n| $270°$ | $3\\pi/2$ | $-1$ | $0$ |\n\n**Pythagoras im Einheitskreis**: $\\sin^2(\\theta) + \\cos^2(\\theta) = 1$',
      },
    ],
    practice: [
      {
        id: 'p0.trig.ex1',
        difficulty: 1,
        conceptTags: ['sine'],
        type: 'numeric',
        prompt: 'Was ist $\\sin(0)$?',
        answer: 0,
        hints: [
          'Schaue auf den Einheitskreis: bei $\\theta = 0$ liegt der Punkt auf der x-Achse.',
          'Die y-Koordinate des Punktes ist $\\sin(0)$.',
          'y-Koordinate bei $\\theta = 0$: y = 0.',
        ],
        explanation: 'Bei $\\theta = 0$ liegt der Punkt bei $(1, 0)$ auf dem Einheitskreis. $\\sin(0) = 0$.',
      },
      {
        id: 'p0.trig.ex2',
        difficulty: 1,
        conceptTags: ['cosine'],
        type: 'numeric',
        prompt: 'Was ist $\\cos(0)$?',
        answer: 1,
        hints: [
          'Bei $\\theta = 0$ liegt der Punkt bei $(1, 0)$.',
          'Die x-Koordinate ist $\\cos(0)$.',
          '$x = 1$, also $\\cos(0) = 1$.',
        ],
        explanation: 'Bei $\\theta = 0$: Punkt ist $(1, 0)$. $\\cos(0) = 1$.',
      },
      {
        id: 'p0.trig.ex3',
        difficulty: 2,
        conceptTags: ['sine', 'radian'],
        type: 'numeric',
        prompt: 'Was ist $\\sin(\\pi/2)$?',
        answer: 1,
        hints: [
          '$\\pi/2$ entspricht $90°$.',
          'Bei $90°$ zeigt der Punkt gerade nach oben: $(0, 1)$.',
          '$\\sin(\\pi/2) = 1$ (die y-Koordinate ist 1).',
        ],
        explanation: 'Bei $\\theta = \\pi/2 = 90°$: Punkt ist $(0, 1)$. $\\sin(\\pi/2) = 1$.',
      },
      {
        id: 'p0.trig.ex4',
        difficulty: 3,
        conceptTags: ['pythagorean-identity'],
        type: 'mc',
        prompt: 'Was gilt für $\\sin^2(x) + \\cos^2(x)$ für beliebiges $x$?',
        options: ['Immer 1', 'Immer 0', 'Hängt von $x$ ab', 'Immer 2'],
        answer: 'Immer 1',
        hints: [
          'Das ist der Satz des Pythagoras im Einheitskreis.',
          'Der Radius des Einheitskreises ist 1: $x^2 + y^2 = 1^2$.',
          '$\\cos^2(\\theta) + \\sin^2(\\theta) = 1$ für alle $\\theta$.',
        ],
        explanation: '$\\sin^2(x) + \\cos^2(x) = 1$ — immer. Das ist der trigonometrische Pythagoras.',
      },
      {
        id: 'p0.trig.ex5',
        difficulty: 3,
        conceptTags: ['radian'],
        type: 'mc',
        prompt: '$180°$ in Bogenmaß?',
        options: ['$\\pi$', '$2\\pi$', '$\\pi/2$', '$\\pi/4$'],
        answer: '$\\pi$',
        hints: [
          '$360° = 2\\pi$ — ein voller Kreis.',
          '$180° = $ halber Kreis $= \\pi$.',
          '$180° = \\pi \\approx 3{,}14$ Radiant.',
        ],
        explanation: '$180°$ entspricht dem halben Vollwinkel: $180° = \\pi$ Radiant.',
      },
      {
        id: 'p0.trig.ex6',
        difficulty: 4,
        conceptTags: ['cosine-similarity', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Zwei Vektoren haben Cosine-Similarity = 1. Was bedeutet das geometrisch?',
        options: [
          'Sie zeigen in dieselbe Richtung (Winkel 0)',
          'Sie sind orthogonal (Winkel 90°)',
          'Sie zeigen in entgegengesetzte Richtungen',
          'Sie haben dieselbe Länge',
        ],
        answer: 'Sie zeigen in dieselbe Richtung (Winkel 0)',
        hints: [
          'Cosine-Similarity ist $\\cos(\\theta)$, wobei $\\theta$ der Winkel zwischen den Vektoren ist.',
          '$\\cos(0) = 1$ — Winkel 0.',
          '$\\cos(0°) = 1$ bedeutet: Vektoren zeigen in dieselbe Richtung.',
        ],
        explanation:
          'Cosine-Similarity $= \\cos(\\theta)$. Für $\\theta = 0°$ gilt $\\cos(0) = 1$ — maximale Ähnlichkeit, identische Richtung.',
        misconceptions: {
          'Sie sind orthogonal (Winkel 90°)': '$\\cos(90°) = 0$, nicht 1. Orthogonale Vektoren haben Cosine-Similarity 0.',
        },
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Sinusoidal Positional Encodings\n\nIn Transformer-Modellen bekommt jeder Token eine **Positionscodierung** — eine Information, wo er in der Sequenz steht. Die Formel:',
      },
      {
        kind: 'math',
        content:
          '$$PE(\\text{pos}, 2i) = \\sin\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right) \\qquad PE(\\text{pos}, 2i+1) = \\cos\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)$$',
      },
      {
        kind: 'callout',
        content:
          'Jedes Mal, wenn du mit GPT chattest, werden die Tokens durch diese Sinus- und Cosinus-Funktionen mit ihrer Position kodiert. Die Periodizität von $\\sin$ und $\\cos$ erlaubt es dem Modell, relative Abstände zwischen Tokens zu erkennen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.trig.card1',
      front: 'Pythagorean Identity?',
      back: '$\\sin^2(x) + \\cos^2(x) = 1$',
      conceptTags: ['trigonometry'],
    },
    {
      id: 'p0.trig.card2',
      front: '$180°$ in Bogenmaß?',
      back: '$\\pi$ Radiant',
      conceptTags: ['radian'],
    },
    {
      id: 'p0.trig.card3',
      front: 'Cosine-Similarity = 1 bedeutet?',
      back: 'Vektoren zeigen in dieselbe Richtung (Winkel 0°).',
      conceptTags: ['cosine-similarity'],
    },
  ],

  learningOutcome:
    'Du kannst sin, cos und tan am Einheitskreis ablesen, zwischen Grad und Bogenmaß umrechnen und verstehst, warum Transformer-Modelle sin/cos für Positional Encodings nutzen.',

  description:
    'Sinus und Cosinus beschreiben periodische Phänomene — Schwingungen, Wellen, rotierende Koordinaten. In modernen Sprachmodellen (Transformers) stecken genau diese Funktionen im Positional Encoding, das Tokens ihre Position in der Sequenz mitteilt.',

  conceptSteps: [
    {
      title: 'Der Einheitskreis als Koordinatensystem',
      preprompt: 'Stell dir vor, du läufst gegen den Uhrzeigersinn auf einem Kreis mit Radius 1. Dein Start ist rechts bei (1, 0). Wie lauten deine Koordinaten nach einem Viertelkreis?',
      body: 'Der **Einheitskreis** hat Mittelpunkt $(0, 0)$ und Radius $1$. Für jeden Winkel $\\theta$ (gegen den Uhrzeigersinn gemessen) gilt:\n\n$$x = \\cos(\\theta), \\quad y = \\sin(\\theta)$$\n\nDer Punkt auf dem Kreis ist also immer $(\\cos(\\theta), \\sin(\\theta))$.',
      visual: `<svg viewBox="0 0 260 240" width="260" height="240" aria-label="Einheitskreis mit sin und cos">
        <rect x="0" y="0" width="260" height="240" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="30" y1="120" x2="230" y2="120" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="130" y1="20" x2="130" y2="220" stroke="rgb(55 65 81)" stroke-width="1"/>
        <circle cx="130" cy="120" r="80" stroke="rgb(99 102 241)" stroke-width="1.5" fill="none"/>
        <line x1="130" y1="120" x2="187" y2="63" stroke="rgb(156 163 175)" stroke-width="1.5"/>
        <circle cx="187" cy="63" r="4" fill="rgb(251 191 36)"/>
        <line x1="187" y1="120" x2="187" y2="63" stroke="rgb(134 239 172)" stroke-width="2" stroke-dasharray="4"/>
        <line x1="130" y1="120" x2="187" y2="120" stroke="rgb(248 113 113)" stroke-width="2" stroke-dasharray="4"/>
        <text x="152" y="135" fill="rgb(248 113 113)" font-size="10" font-family="monospace">cos θ</text>
        <text x="191" y="96" fill="rgb(134 239 172)" font-size="10" font-family="monospace">sin θ</text>
        <text x="143" y="85" fill="rgb(156 163 175)" font-size="10" font-family="monospace">1</text>
        <path d="M 160,120 A 30,30 0 0,0 150,103" stroke="rgb(251 191 36)" stroke-width="1" fill="none"/>
        <text x="161" y="110" fill="rgb(251 191 36)" font-size="9" font-family="monospace">θ</text>
        <text x="220" y="124" fill="rgb(156 163 175)" font-size="9">x</text>
        <text x="133" y="16" fill="rgb(156 163 175)" font-size="9">y</text>
      </svg>`,
      miniExample: 'Bei $\\theta = 45°$: Punkt $= (\\cos 45°, \\sin 45°) \\approx (0{,}71,\\; 0{,}71)$',
      selfCheck: 'Welche Koordinaten hat der Punkt bei $\\theta = 90°$? (Antwort: $(0, 1)$)',
    },
    {
      title: 'sin und cos: Eigenschaften',
      body: 'Beide Funktionen haben dieselbe Form, nur **phasenverschoben**:\n\n$$\\sin(0) = 0, \\quad \\sin(\\pi/2) = 1, \\quad \\sin(\\pi) = 0, \\quad \\sin(3\\pi/2) = -1$$\n$$\\cos(0) = 1, \\quad \\cos(\\pi/2) = 0, \\quad \\cos(\\pi) = -1, \\quad \\cos(3\\pi/2) = 0$$\n\nWichtigste Identität (Pythagoras im Einheitskreis):\n$$\\sin^2(\\theta) + \\cos^2(\\theta) = 1 \\quad \\text{für alle } \\theta$$\n\nBeide sind **periodisch** mit Periode $2\\pi$: $\\sin(\\theta + 2\\pi) = \\sin(\\theta)$.',
      miniExample: '$\\sin(\\pi/6) = 0{,}5$, $\\cos(\\pi/3) = 0{,}5$ — beide geben $0{,}5$ bei verschiedenen Winkeln',
      selfCheck: 'Zeige, dass $\\sin^2(\\pi/4) + \\cos^2(\\pi/4) = 1$. ($(\\frac{\\sqrt{2}}{2})^2 + (\\frac{\\sqrt{2}}{2})^2 = \\frac{1}{2} + \\frac{1}{2} = 1$ ✓)',
    },
    {
      title: 'Bogenmaß statt Grad',
      preprompt: 'Warum misst man Winkel nicht einfach in Grad (0°–360°)?',
      body: 'Das **Bogenmaß** (Radiant) misst Winkel als Bogenlänge auf dem Einheitskreis:\n\n$$\\text{Radiant} = \\frac{\\text{Grad} \\cdot \\pi}{180°}$$\n\nUmrechnungstabelle:\n$$0° = 0 \\qquad 90° = \\frac{\\pi}{2} \\qquad 180° = \\pi \\qquad 360° = 2\\pi$$\n\nML-Code und alle Mathematik nutzen **immer** Radiant. Gradient von $\\sin(x)$ ist genau $\\cos(x)$ — aber nur im Bogenmaß.',
      miniExample: '$45° = \\frac{\\pi}{4} \\approx 0{,}785$ Radiant',
      selfCheck: 'Was ist $270°$ in Radiant? (Antwort: $\\frac{3\\pi}{2}$)',
    },
    {
      title: 'Wichtige Winkelwerte auswendig',
      body: 'Diese Werte tauchen ständig auf — lohnt sich, sie zu kennen:\n\n$$\\begin{array}{c|c|c|c}\n\\theta & 0 & \\pi/6 & \\pi/4 & \\pi/3 & \\pi/2 \\\\\n\\hline\n\\sin\\theta & 0 & \\frac{1}{2} & \\frac{\\sqrt{2}}{2} & \\frac{\\sqrt{3}}{2} & 1 \\\\\n\\cos\\theta & 1 & \\frac{\\sqrt{3}}{2} & \\frac{\\sqrt{2}}{2} & \\frac{1}{2} & 0\n\\end{array}$$\n\nMerkhilfe: $\\sin$ von $0, \\pi/6, \\pi/4, \\pi/3, \\pi/2$ sind $\\frac{\\sqrt{0}}{2}, \\frac{\\sqrt{1}}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}, \\frac{\\sqrt{4}}{2}$.',
      selfCheck: 'Warum ist $\\sin(30°) = 0{,}5$ und nicht $0{,}3$? (Schau auf den Einheitskreis bei $30°$: y-Koordinate = Hälfte des Radius = $0{,}5$)',
    },
    {
      title: 'Trigonometrische Identitäten',
      body: 'Drei wichtige Identitäten für ML und Analysis:\n\n$$\\sin^2(\\theta) + \\cos^2(\\theta) = 1 \\qquad \\text{(Pythagoras)}$$\n\n$$\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta \\qquad \\text{(Addition)}$$\n\n$$\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta \\qquad \\text{(Addition)}$$\n\nRotary Position Embeddings (RoPE) in LLMs nutzen genau diese Additions-Formeln, um Token-Rotationen darzustellen.',
      miniExample: '$\\sin(2\\alpha) = 2\\sin(\\alpha)\\cos(\\alpha)$ — aus der Additionsformel mit $\\alpha = \\beta$',
    },
    {
      title: 'ML: Positional Encoding in Transformers',
      body: 'Transformers haben keine eingebaute Positionsinformation. Das **Sinusoidal Positional Encoding** löst das:\n\n$$PE(\\text{pos}, 2i) = \\sin\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)$$\n$$PE(\\text{pos}, 2i+1) = \\cos\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)$$\n\nJede Dimension benutzt eine andere Frequenz — hohe Dimensionen ändern sich langsam, niedrige schnell. Das erlaubt dem Modell, **relative Abstände** zwischen Tokens zu berechnen: $\\sin(\\text{pos} + k)$ lässt sich durch $\\sin(\\text{pos})$ und $\\cos(\\text{pos})$ ausdrücken (Additionsformel!).',
      miniExample: 'Token an Position 0: alle sin-Komponenten = 0; Token an Position 1: erste Komponente = $\\sin(1) \\approx 0{,}841$',
      selfCheck: 'Warum reicht eine einzige sin-Funktion nicht aus, um alle Positionen eindeutig zu codieren? (sin ist periodisch — nach $2\\pi$ wiederholen sich Werte. Verschiedene Frequenzen zusammen vermeiden das.)',
    },
  ],

  codeBridges: [
    {
      title: 'Python: Positional Encoding mit sin/cos',
      lang: 'python',
      code: `import torch
import math

def positional_encoding(max_len: int, d_model: int) -> torch.Tensor:
    """Sinusoidal Positional Encoding (Attention is All You Need, 2017)."""
    pe = torch.zeros(max_len, d_model)

    # Position: 0, 1, 2, ..., max_len-1
    position = torch.arange(0, max_len).unsqueeze(1).float()

    # Teiler: 10000^(2i/d_model) — verschiedene Frequenzen pro Dimension
    div_term = torch.exp(
        torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
    )
    # Gerade Dimensionen: sin(pos / 10000^(2i/d))
    pe[:, 0::2] = torch.sin(position * div_term)
    # Ungerade Dimensionen: cos(pos / 10000^(2i/d))
    pe[:, 1::2] = torch.cos(position * div_term)

    return pe  # Shape: (max_len, d_model)

# Beispiel: 10 Positionen, 8-dimensionales Embedding
pe = positional_encoding(10, 8)
print(f"Shape: {pe.shape}")           # torch.Size([10, 8])
print(f"Pos 0: {pe[0, :4].tolist()}")  # [0.0, 1.0, 0.0, 1.0] (sin/cos bei pos=0)
print(f"Pos 1: {pe[1, :4].tolist()}")  # [sin(1), cos(1), sin(0.01), cos(0.01)]`,
      annotation: '`torch.sin` und `torch.cos` arbeiten im **Bogenmaß** — genau wie die Mathematik. Der Faktor $10000^{2i/d}$ verteilt die Frequenzen exponentiell: niedrige Indizes = hohe Frequenz (ändert sich schnell über Positionen), hohe Indizes = niedrige Frequenz (ändert sich langsam). Zusammen codieren sie jede Position eindeutig.',
    },
  ],

  derivations: [
    {
      claim: '$\\sin^2(\\theta) + \\cos^2(\\theta) = 1$ für alle $\\theta$',
      reasoning:
        'Der Punkt $(\\cos\\theta, \\sin\\theta)$ liegt auf dem Einheitskreis mit Radius 1. Die Kreisgleichung lautet $x^2 + y^2 = r^2$, also mit $r = 1$: $\\cos^2(\\theta) + \\sin^2(\\theta) = 1^2 = 1$. Das ist direkt Pythagoras im rechtwinkligen Dreieck innerhalb des Einheitskreises.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\sin(90) = 0$ (ohne Einheit)',
      correct: '$\\sin(90°) = 1$, aber $\\sin(90) \\approx 0{,}894$ im Bogenmaß',
      explanation:
        'Python/NumPy/PyTorch erwarten Bogenmaß! `np.sin(90)` gibt $\\sin(90 \\text{ rad}) \\approx 0{,}894$. Für 90° schreibt man `np.sin(np.pi / 2)` = 1.',
    },
    {
      wrong: '$\\sin(\\alpha + \\beta) = \\sin\\alpha + \\sin\\beta$',
      correct: '$\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$',
      explanation:
        'Winkelfunktionen verteilen sich **nicht** über Addition — das ist die häufigste Fehlerquelle in der Trigonometrie.',
    },
    {
      wrong: '$\\cos$ und $\\sin$ haben verschiedene Wertebereiche',
      correct: 'Beide haben Wertebereich $[-1, 1]$',
      explanation:
        '$\\sin$ und $\\cos$ sind beide auf den Einheitskreis beschränkt. Für alle $\\theta$: $-1 \\leq \\sin(\\theta) \\leq 1$ und $-1 \\leq \\cos(\\theta) \\leq 1$.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Euler\'s formula with introductory group theory" (Video)',
      type: 'video',
      note: 'Verbindet Trigonometrie mit komplexen Zahlen und Euler-Formel — tiefes Verständnis',
    },
    {
      title: 'The Illustrated Transformer — Jay Alammar',
      type: 'article',
      note: 'Zeigt Positional Encoding visuell im Transformer-Kontext; sehr empfohlen',
    },
    {
      title: 'Serlo: "Sinus und Kosinus am Einheitskreis"',
      type: 'article',
      note: 'Deutsche Einführung mit interaktivem Einheitskreis',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.skalarprodukt',
      relation: 'extends',
      hint: 'Cosine-Similarity ist $\\cos(\\theta)$ des Winkels zwischen Vektoren — direkt aus dem Einheitskreis.',
    },
    {
      lessonId: 'p0.vektoren',
      relation: 'requires',
      hint: 'Rotary Embeddings rotieren Vektoren mithilfe von sin/cos — Vektoren sind die Grundlage.',
    },
    {
      lessonId: 'p1.norm-skalarprodukt',
      relation: 'see-also',
      hint: 'Skalarprodukt und Cosine-Similarity formalisieren den geometrischen Winkel zwischen Vektoren.',
    },
  ],

  reflection: 'Du hast gelernt: **sin und cos** sind keine abstrakten Schulfunktionen — sie stecken im Herzen der Transformer-Architektur, die GPT, Claude und alle modernen Sprachmodelle antreibt. Jedes Token in einem LLM bekommt eine sin/cos-codierte Positionsinformation. Welcher Aspekt des Positional Encodings hat dich am meisten überrascht?',
}
