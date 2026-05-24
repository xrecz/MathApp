import type { Lesson } from '../../types'

export const skalarprodukt: Lesson = {
  id: 'p0.skalarprodukt',
  title: 'Skalarprodukt & Cosine-Similarity',
  conceptTags: ['dot-product', 'cosine-similarity', 'orthogonality', 'attention'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Skalarprodukt\n\nDas **Skalarprodukt** zweier Vektoren ergibt eine einzelne Zahl (einen Skalar). Es hat zwei äquivalente Definitionen:',
      },
      {
        kind: 'math',
        content:
          '$$\\vec{a} \\cdot \\vec{b} = \\sum_i a_i b_i = a_1 b_1 + a_2 b_2 + \\ldots \\quad (\\text{algebraisch})$$',
      },
      {
        kind: 'math',
        content:
          '$$\\vec{a} \\cdot \\vec{b} = \\|a\\| \\cdot \\|b\\| \\cdot \\cos(\\theta) \\quad (\\text{geometrisch})$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Attention in Transformern (der Kern von ChatGPT, Claude und allen LLMs) basiert auf Skalarprodukten zwischen Query- und Key-Vektoren. Millionenfach pro Token.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Wichtige Fälle\n\n**Orthogonale Vektoren**: Skalarprodukt = 0 (Winkel 90°)\n\n**Parallele Vektoren**: Skalarprodukt = $\\|a\\| \\cdot \\|b\\|$ (Winkel 0°)\n\n**Cosine-Similarity**: Normiertes Skalarprodukt, misst Ähnlichkeit unabhängig von der Länge:',
      },
      {
        kind: 'math',
        content:
          '$$\\text{cos-sim}(a, b) = \\frac{a \\cdot b}{\\|a\\| \\cdot \\|b\\|} = \\cos(\\theta) \\in [-1, 1]$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $a = (1, 2)$, $b = (3, 4)$\n\n$a \\cdot b = 1 \\cdot 3 + 2 \\cdot 4 = 3 + 8 = 11$\n\n$\\|a\\| = \\sqrt{5}$, $\\|b\\| = \\sqrt{25} = 5$\n\n$\\cos(\\theta) = \\frac{11}{\\sqrt{5} \\cdot 5} = \\frac{11}{5\\sqrt{5}} \\approx 0{,}98$',
      },
    ],
    practice: [
      {
        id: 'p0.dot.ex1',
        difficulty: 1,
        conceptTags: ['dot-product'],
        type: 'numeric',
        prompt: 'Berechne das Skalarprodukt von $(1, 2)$ und $(3, 4)$.',
        answer: 11,
        hints: [
          'Skalarprodukt: komponentenweise multiplizieren und dann addieren.',
          '$1 \\cdot 3 + 2 \\cdot 4 = ?$',
          '$3 + 8 = 11$.',
        ],
        explanation: '$(1, 2) \\cdot (3, 4) = 1 \\cdot 3 + 2 \\cdot 4 = 3 + 8 = 11$.',
      },
      {
        id: 'p0.dot.ex2',
        difficulty: 2,
        conceptTags: ['dot-product', 'orthogonality'],
        type: 'numeric',
        prompt: 'Skalarprodukt von $(1, 0)$ und $(0, 1)$?',
        answer: 0,
        hints: [
          '$1 \\cdot 0 + 0 \\cdot 1 = ?$',
          '$0 + 0 = 0$.',
          'Das Ergebnis 0 bedeutet: die Vektoren sind orthogonal (Winkel $90°$).',
        ],
        explanation: '$(1, 0) \\cdot (0, 1) = 1 \\cdot 0 + 0 \\cdot 1 = 0$. Orthogonal!',
      },
      {
        id: 'p0.dot.ex3',
        difficulty: 2,
        conceptTags: ['orthogonality'],
        type: 'mc',
        prompt: 'Zwei Vektoren mit Skalarprodukt 0 sind?',
        options: ['Orthogonal (senkrecht zueinander)', 'Parallel', 'Identisch', 'Anti-parallel'],
        answer: 'Orthogonal (senkrecht zueinander)',
        hints: [
          '$a \\cdot b = \\|a\\|\\|b\\|\\cos(\\theta) = 0$ bedeutet $\\cos(\\theta) = 0$.',
          '$\\cos(\\theta) = 0$ bei $\\theta = 90°$.',
          '90° = senkrecht = orthogonal.',
        ],
        explanation:
          '$a \\cdot b = 0 \\Rightarrow \\cos(\\theta) = 0 \\Rightarrow \\theta = 90°$: orthogonal.',
      },
      {
        id: 'p0.dot.ex4',
        difficulty: 3,
        conceptTags: ['cosine-similarity'],
        type: 'numeric',
        prompt: 'Cosine-Similarity von $(1, 0)$ und $(1, 0)$?',
        answer: 1,
        hints: [
          '$\\cos\\text{-sim} = \\frac{a \\cdot b}{\\|a\\|\\|b\\|}$',
          '$a \\cdot a = 1 \\cdot 1 + 0 \\cdot 0 = 1$, $\\|a\\| = 1$.',
          '$\\frac{1}{1 \\cdot 1} = 1$.',
        ],
        explanation:
          'Identische Vektoren haben Cosine-Similarity 1 (Winkel 0°, maximale Ähnlichkeit).',
      },
      {
        id: 'p0.dot.ex5',
        difficulty: 3,
        conceptTags: ['cosine-similarity'],
        type: 'numeric',
        prompt: 'Cosine-Similarity von $(1, 0)$ und $(-1, 0)$?',
        answer: -1,
        hints: [
          '$a \\cdot b = 1 \\cdot (-1) + 0 \\cdot 0 = -1$.',
          '$\\|a\\| = 1$, $\\|b\\| = 1$.',
          '$\\frac{-1}{1} = -1$.',
        ],
        explanation:
          '$(1,0) \\cdot (-1,0) = -1$, $\\|a\\|\\|b\\| = 1$. Cosine-Similarity $= -1$: entgegengesetzte Richtungen.',
      },
      {
        id: 'p0.dot.ex6',
        difficulty: 4,
        conceptTags: ['cosine-similarity', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Cosine-Similarity von $a = (0{,}6,\\; 0{,}8)$ und $b = (0{,}8,\\; 0{,}6)$.',
        answer: 0.96,
        acceptedAlternatives: ['0,96'],
        hints: [
          'Beide Vektoren sind normalisiert (Länge 1), also $\\cos\\text{-sim} = a \\cdot b$.',
          '$0{,}6 \\cdot 0{,}8 + 0{,}8 \\cdot 0{,}6 = ?$',
          '$0{,}48 + 0{,}48 = 0{,}96$.',
        ],
        explanation:
          'Da $\\|a\\| = \\|b\\| = 1$: $\\cos\\text{-sim} = a \\cdot b = 0{,}6 \\cdot 0{,}8 + 0{,}8 \\cdot 0{,}6 = 0{,}96$. Sehr ähnliche Vektoren!',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Attention = Skalarprodukt\n\nDas Attention-Mechanism in Transformern berechnet für jedes Token, wie sehr es auf jedes andere Token "achten" soll. Das Herzstück:',
      },
      {
        kind: 'math',
        content:
          '$$\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right) V$$',
      },
      {
        kind: 'callout',
        content:
          '$QK^\\top$ ist eine Matrix von Skalarprodukten: wie ähnlich ist Query $q_i$ zu jedem Key $k_j$? Genau das, was du gerade geübt hast, läuft in jedem Transformer-Layer — für jedes Token, in jedem Head, tausende Male pro Forward Pass.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.dot.card1',
      front: 'Skalarprodukt $(a_1, a_2) \\cdot (b_1, b_2)$?',
      back: '$a_1 b_1 + a_2 b_2$',
      conceptTags: ['dot-product'],
    },
    {
      id: 'p0.dot.card2',
      front: 'Geometrische Form des Skalarprodukts?',
      back: '$a \\cdot b = \\|a\\|\\|b\\|\\cos(\\theta)$',
      conceptTags: ['dot-product'],
    },
    {
      id: 'p0.dot.card3',
      front: 'Cosine-Similarity-Formel?',
      back: '$\\cos\\text{-sim}(a, b) = \\frac{a \\cdot b}{\\|a\\|\\|b\\|} \\in [-1, 1]$',
      conceptTags: ['cosine-similarity'],
    },
  ],

  learningOutcome:
    'Du kannst das Skalarprodukt algebraisch berechnen und geometrisch als Winkel-/Projektionsmaß interpretieren — und verstehst, warum Dot-Product-Attention in Transformers auf genau dieser Operation basiert.',

  description:
    'Das Skalarprodukt misst, wie sehr zwei Vektoren "in dieselbe Richtung zeigen". Es ist die Basis von Cosine-Similarity, geometrischer Projektion und — zentral für ML — dem Attention-Mechanismus in Transformers.',

  conceptSteps: [
    {
      title: 'Definition: Skalarprodukt algebraisch',
      preprompt: 'Was passiert, wenn du zwei Vektoren komponentenweise multiplizierst und alle Produkte addierst?',
      body: 'Das **Skalarprodukt** (dot product) zweier Vektoren ergibt eine einzelne Zahl:\n\n$$\\vec{a} \\cdot \\vec{b} = \\sum_{i=1}^{n} a_i b_i = a_1 b_1 + a_2 b_2 + \\cdots + a_n b_n$$\n\nWichtige Eigenschaften:\n- Kommutativ: $\\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}$\n- Linear: $(c\\vec{a}) \\cdot \\vec{b} = c(\\vec{a} \\cdot \\vec{b})$\n- Positiv: $\\vec{a} \\cdot \\vec{a} = \\|\\vec{a}\\|^2 \\geq 0$',
      miniExample: '$(1, 2, 3) \\cdot (4, 5, 6) = 4 + 10 + 18 = 32$',
      selfCheck: 'Was ist $\\vec{a} \\cdot \\vec{a}$ für $\\vec{a} = (3, 4)$? (Antwort: $9 + 16 = 25 = \\|\\vec{a}\\|^2$.)',
    },
    {
      title: 'Geometrische Bedeutung: Winkel',
      body: 'Die zwei Definitionen des Skalarprodukts sind äquivalent:\n\n$$\\vec{a} \\cdot \\vec{b} = \\sum_i a_i b_i \\quad = \\quad \\|\\vec{a}\\| \\cdot \\|\\vec{b}\\| \\cdot \\cos(\\theta)$$\n\nwobei $\\theta$ der Winkel zwischen den Vektoren ist.\n\n**Intuition**: Das Skalarprodukt ist groß, wenn beide Vektoren lang sind **und** in ähnliche Richtungen zeigen ($\\cos(\\theta) \\approx 1$). Es ist Null, wenn sie senkrecht stehen ($\\cos(90°) = 0$).',
      visual: `<svg viewBox="0 0 260 140" width="260" height="140" aria-label="Skalarprodukt geometrisch">
        <rect x="0" y="0" width="260" height="140" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <defs>
          <marker id="arrdot1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(134 239 172)"/>
          </marker>
          <marker id="arrdot2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(96 165 250)"/>
          </marker>
          <marker id="arrdot3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(251 191 36)"/>
          </marker>
        </defs>
        <line x1="60" y1="110" x2="180" y2="40" stroke="rgb(134 239 172)" stroke-width="2.5" marker-end="url(#arrdot1)"/>
        <text x="128" y="62" fill="rgb(134 239 172)" font-size="11" font-family="monospace">a⃗</text>
        <line x1="60" y1="110" x2="230" y2="90" stroke="rgb(96 165 250)" stroke-width="2.5" marker-end="url(#arrdot2)"/>
        <text x="185" y="95" fill="rgb(96 165 250)" font-size="11" font-family="monospace">b⃗</text>
        <path d="M 90,110 A 30,30 0 0,0 82,87" stroke="rgb(251 191 36)" stroke-width="1.5" fill="none"/>
        <text x="95" y="100" fill="rgb(251 191 36)" font-size="10" font-family="monospace">θ</text>
        <line x1="180" y1="40" x2="175" y2="80" stroke="rgb(248 113 113)" stroke-width="1.5" stroke-dasharray="3"/>
        <line x1="60" y1="110" x2="175" y2="80" stroke="rgb(248 113 113)" stroke-width="1.5" marker-end="url(#arrdot3)"/>
        <text x="100" y="108" fill="rgb(248 113 113)" font-size="9" font-family="monospace">proj</text>
      </svg>`,
      miniExample: '$\\theta = 0°$: $\\cos(0) = 1$ → max Skalarprodukt. $\\theta = 90°$: $\\cos(90°) = 0$ → Skalarprodukt = 0',
      selfCheck: 'Was bedeutet ein negatives Skalarprodukt? (Der Winkel $\\theta > 90°$, die Vektoren zeigen "voneinander weg".)',
    },
    {
      title: 'Projektion: Skalarprodukt als Schatten',
      body: 'Das Skalarprodukt misst die **Projektion** von $\\vec{a}$ auf $\\vec{b}$:\n\n$$\\text{proj}_{\\vec{b}}(\\vec{a}) = \\frac{\\vec{a} \\cdot \\vec{b}}{\\|\\vec{b}\\|^2} \\vec{b}$$\n\nDie skalare Komponente (Länge der Projektion):\n$$\\text{comp}_{\\vec{b}}(\\vec{a}) = \\frac{\\vec{a} \\cdot \\vec{b}}{\\|\\vec{b}\\|} = \\|\\vec{a}\\| \\cos(\\theta)$$\n\n**Intuition**: Wie viel von $\\vec{a}$ zeigt in Richtung $\\vec{b}$? Das ist der "Schatten", den $\\vec{a}$ auf $\\vec{b}$ wirft.',
      miniExample: 'Projektion von $(3, 4)$ auf $(1, 0)$: Skalarprodukt $= 3$, Länge $= 3$ — die x-Komponente!',
    },
    {
      title: 'Orthogonalität: Skalarprodukt = 0',
      body: 'Zwei Vektoren sind **orthogonal** (senkrecht), wenn ihr Skalarprodukt 0 ist:\n\n$$\\vec{a} \\perp \\vec{b} \\quad \\Longleftrightarrow \\quad \\vec{a} \\cdot \\vec{b} = 0$$\n\nWeil $\\vec{a} \\cdot \\vec{b} = \\|\\vec{a}\\| \\|\\vec{b}\\| \\cos(\\theta) = 0$ genau dann, wenn $\\cos(\\theta) = 0$, d.h. $\\theta = 90°$.\n\n**In ML**: Orthogonale Features tragen unabhängige Information. Attention-Gewichte nahe 0 bedeuten: Query und Key zeigen in verschiedene Richtungen — keine Relevanz.',
      miniExample: '$(1, 0) \\perp (0, 1)$: $1 \\cdot 0 + 0 \\cdot 1 = 0$ ✓',
      selfCheck: 'Sind $(1, 2)$ und $(-2, 1)$ orthogonal? ($1 \\cdot (-2) + 2 \\cdot 1 = 0$ ✓ — ja!)',
    },
    {
      title: 'Cosine-Similarity: längenunabhängige Ähnlichkeit',
      body: '**Cosine-Similarity** normiert das Skalarprodukt auf den Bereich $[-1, 1]$:\n\n$$\\text{cos-sim}(\\vec{a}, \\vec{b}) = \\frac{\\vec{a} \\cdot \\vec{b}}{\\|\\vec{a}\\| \\cdot \\|\\vec{b}\\|} = \\cos(\\theta)$$\n\n- $= 1$: identische Richtung (gleiche Bedeutung)\n- $= 0$: orthogonal (keine Ähnlichkeit)\n- $= -1$: entgegengesetzte Richtung (Antonyme)\n\n**Warum Cosine statt euklidischer Distanz?** In hochdimensionalen Embeddings ist die Richtung wichtiger als die Länge. "König" und "Königin" können unterschiedliche Normen haben, aber ähnliche Richtungen.',
      miniExample: 'Embeddings "gut" und "toll": cos-sim $\\approx 0{,}9$ — ähnliche Bedeutung. "gut" und "schlecht": cos-sim $\\approx -0{,}7$',
      selfCheck: 'Warum ist Cosine-Similarity für normalisierte Vektoren ($\\|\\vec{a}\\| = \\|\\vec{b}\\| = 1$) dasselbe wie das Skalarprodukt? (Weil $\\frac{\\vec{a} \\cdot \\vec{b}}{1 \\cdot 1} = \\vec{a} \\cdot \\vec{b}$.)',
    },
    {
      title: 'ML: Dot-Product-Attention in Transformers',
      body: 'Der Kern des Transformer-Attention-Mechanismus:\n\n$$\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right) V$$\n\n$QK^\\top$ ist eine Matrix von Skalarprodukten: für jedes Query $q_i$ mit jedem Key $k_j$:\n$$\\text{Score}_{ij} = q_i \\cdot k_j$$\n\nDer Divisor $\\sqrt{d_k}$ verhindert, dass bei hoher Dimension $d_k$ die Skalarprodukte zu groß werden (Varianz wächst mit $d_k$). Softmax normiert die Scores zu Gewichten für die Value-Vektoren.',
      miniExample: 'Bei $d_k = 64$: Division durch $\\sqrt{64} = 8$ hält Varianzen stabil',
      selfCheck: 'Was bedeutet ein hoher Score $q_i \\cdot k_j$? (Token $i$ "achtet stark" auf Token $j$ — Query und Key zeigen in ähnliche Richtungen.)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Dot-Product-Attention implementieren',
      lang: 'python',
      code: `import torch
import torch.nn.functional as F

# Einfache Skalarprodukt-Berechnung
a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([4.0, 5.0, 6.0])
dot = torch.dot(a, b)   # = 4+10+18 = 32

# Cosine-Similarity
cos_sim = F.cosine_similarity(a.unsqueeze(0), b.unsqueeze(0))
# = dot / (||a|| * ||b||)

# Dot-Product-Attention (vereinfacht)
# Q, K, V: (seq_len, d_model)
seq_len, d_k = 5, 8
Q = torch.randn(seq_len, d_k)   # Query-Vektoren
K = torch.randn(seq_len, d_k)   # Key-Vektoren
V = torch.randn(seq_len, d_k)   # Value-Vektoren

# Schritt 1: Skalarprodukte aller Query-Key-Paare
# QK^T hat Shape (seq_len, seq_len): Score[i,j] = q_i · k_j
scores = Q @ K.T              # @ ist Matrixmultiplikation

# Schritt 2: Skalierung — verhindert zu große Werte bei hohem d_k
scores = scores / (d_k ** 0.5)  # sqrt(d_k) = Wurzel aus 8 ≈ 2.83

# Schritt 3: Softmax → Attention-Gewichte (Summe = 1 pro Query)
attention_weights = F.softmax(scores, dim=-1)

# Schritt 4: Gewichtete Summe der Values
output = attention_weights @ V  # Shape: (seq_len, d_k)
print(f"Attention output shape: {output.shape}")`,
      annotation: '`Q @ K.T` berechnet alle Skalarprodukte auf einmal: das ist $QK^\\top$ aus der Attention-Formel. Die Division durch `d_k ** 0.5` ($= \\sqrt{d_k}$) hält die Varianz der Scores konstant — ohne sie würden Softmax-Gradienten bei großem $d_k$ verschwinden. `F.softmax` normiert zu Gewichten, die dann die Values gewichten.',
    },
  ],

  derivations: [
    {
      claim: 'Äquivalenz der algebraischen und geometrischen Definitionen',
      reasoning:
        'Sei $\\vec{c} = \\vec{a} - \\vec{b}$. Aus dem Kosinussatz gilt: $\\|\\vec{c}\\|^2 = \\|\\vec{a}\\|^2 + \\|\\vec{b}\\|^2 - 2\\|\\vec{a}\\|\\|\\vec{b}\\|\\cos\\theta$. Andererseits: $\\|\\vec{c}\\|^2 = \\vec{c} \\cdot \\vec{c} = (\\vec{a}-\\vec{b})\\cdot(\\vec{a}-\\vec{b}) = \\|\\vec{a}\\|^2 - 2(\\vec{a}\\cdot\\vec{b}) + \\|\\vec{b}\\|^2$. Vergleich ergibt $\\vec{a}\\cdot\\vec{b} = \\|\\vec{a}\\|\\|\\vec{b}\\|\\cos\\theta$.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Skalarprodukt ist ein Vektor',
      correct: 'Skalarprodukt ergibt immer eine **Zahl** (Skalar)',
      explanation:
        'Der Name sagt es: das Ergebnis ist ein Skalar (eine Zahl), kein Vektor. Das Kreuzprodukt (nur in $\\mathbb{R}^3$) ergibt einen Vektor — das ist ein anderes Konzept.',
    },
    {
      wrong: 'Cosine-Similarity 0 bedeutet: Vektoren sind verschieden',
      correct: 'Cosine-Similarity 0 bedeutet: Vektoren sind orthogonal (keine Richtungsähnlichkeit)',
      explanation:
        'Zwei sehr verschiedene Wörter können orthogonale Embeddings haben (cos-sim = 0), aber auch ein Wort und sein Antonyme (-1) sind "sehr verschieden". Orthogonalit ist "neutral", nicht negativ.',
    },
    {
      wrong: 'Skalarprodukt und Cosine-Similarity sind dasselbe',
      correct: 'Cosine-Similarity normiert das Skalarprodukt durch die Produkt der Normen',
      explanation:
        'Skalarprodukt misst sowohl Richtungsähnlichkeit als auch Länge. Cosine-Similarity trennt das: $\\text{cos-sim} = \\frac{a \\cdot b}{\\|a\\|\\|b\\|}$ ist längenunabhängig.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Dot products and duality" (Essence of Linear Algebra)',
      type: 'video',
      note: 'Erklärt geometrisch, warum das Skalarprodukt als Projektion funktioniert — sehr intuitiv',
    },
    {
      title: 'Attention Is All You Need — Original Transformer-Paper',
      type: 'article',
      note: 'Abschnitt 3.2 erklärt Scaled Dot-Product Attention direkt; mit der Formel, die du jetzt verstehst',
    },
    {
      title: 'Serlo: "Skalarprodukt"',
      type: 'article',
      note: 'Deutsche Einführung mit algebraischer und geometrischer Herleitung',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.vektoren',
      relation: 'requires',
      hint: 'Skalarprodukt arbeitet auf Vektoren — Vektoroperationen sind die Voraussetzung.',
    },
    {
      lessonId: 'p0.trigonometrie',
      relation: 'requires',
      hint: 'Die geometrische Formel $a \\cdot b = \\|a\\|\\|b\\|\\cos(\\theta)$ verbindet Skalarprodukt mit Cosinus.',
    },
    {
      lessonId: 'p1.norm-skalarprodukt',
      relation: 'extends',
      hint: 'Phase 1 formalisiert Skalarprodukte als bilineare Formen und führt allgemeine innere Produkte ein.',
    },
    {
      lessonId: 'p1.matrizen-lineare-abbildungen',
      relation: 'see-also',
      hint: '$QK^\\top$ im Attention ist Matrixmultiplikation — jeder Eintrag ist ein Skalarprodukt.',
    },
  ],

  reflection: 'Du hast gelernt: Das **Skalarprodukt** misst Richtungsähnlichkeit — und das ist der Kern von Attention in jedem Transformer. Wenn GPT-4 oder Claude entscheidet, welche vorherigen Tokens für den nächsten Token relevant sind, läuft das auf Millionen von Skalarprodukten hinaus. Welche Eigenschaft des Skalarprodukts war für dich am überraschendsten?',
}
