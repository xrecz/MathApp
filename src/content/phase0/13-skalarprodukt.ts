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
}
