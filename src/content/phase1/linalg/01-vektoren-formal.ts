import type { Lesson } from '../../../types'

export const vektorenFormal: Lesson = {
  id: 'p1.vektoren-formal',
  title: 'Vektoren (formal)',
  conceptTags: ['vector', 'span', 'linear-combination', 'vector-space'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Vektoren — formal betrachtet\n\nEin Vektor ist ein Element eines **Vektorraums**. Drei äquivalente Sichtweisen: Liste $(v_1, \\dots, v_n)$, Pfeil im Raum, Punkt. Eine **Linearkombination** kombiniert Vektoren mit Skalaren:',
      },
      {
        kind: 'math',
        content:
          '$$c_1 \\vec{v}_1 + c_2 \\vec{v}_2 + \\dots + c_k \\vec{v}_k \\quad c_i \\in \\mathbb{R}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Word2Vec entdeckte, dass semantische Beziehungen Linearkombinationen sind: $\\vec{\\text{König}} - \\vec{\\text{Mann}} + \\vec{\\text{Frau}} \\approx \\vec{\\text{Königin}}$. Embeddings (768D, 1024D, 4096D) sind Vektoren in hochdimensionalen Vektorräumen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Span und lineare Unabhängigkeit\n\nDer **Span** einer Menge $\\{v_1, \\dots, v_k\\}$ ist die Menge aller ihrer Linearkombinationen:\n\n$\\text{span}\\{v_1, \\dots, v_k\\} = \\{c_1 v_1 + \\dots + c_k v_k : c_i \\in \\mathbb{R}\\}$\n\n**Linear unabhängig**: Die Menge $\\{v_1, \\dots, v_k\\}$ ist linear unabhängig, wenn die einzige Linearkombination, die $\\vec{0}$ ergibt, die triviale ist: $c_1 = c_2 = \\dots = c_k = 0$.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-80 -80 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
          <line x1="-70" y1="0" x2="70" y2="0" stroke="#374151" stroke-width="0.5"/>
          <line x1="0" y1="-70" x2="0" y2="70" stroke="#374151" stroke-width="0.5"/>
          <line x1="-60" y1="-60" x2="60" y2="60" stroke="#6366f1" stroke-width="0.5" stroke-dasharray="4" opacity="0.4"/>
          <line x1="-60" y1="60" x2="60" y2="-60" stroke="#6366f1" stroke-width="0.5" stroke-dasharray="4" opacity="0.4"/>
          <line x1="-70" y1="-35" x2="70" y2="35" stroke="#6366f1" stroke-width="0.5" stroke-dasharray="4" opacity="0.3"/>
          <line x1="-70" y1="35" x2="70" y2="-35" stroke="#6366f1" stroke-width="0.5" stroke-dasharray="4" opacity="0.3"/>
          <line x1="0" y1="0" x2="50" y2="0" stroke="#ef4444" stroke-width="2" marker-end="url(#arr1)"/>
          <line x1="0" y1="0" x2="0" y2="-40" stroke="#10b981" stroke-width="2" marker-end="url(#arr2)"/>
          <line x1="0" y1="0" x2="30" y2="-20" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5"/>
          <defs>
            <marker id="arr1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444"/>
            </marker>
            <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#10b981"/>
            </marker>
          </defs>
          <text x="52" y="4" fill="#ef4444" font-size="10">v₁</text>
          <text x="4" y="-42" fill="#10b981" font-size="10">v₂</text>
          <text x="32" y="-22" fill="#f59e0b" font-size="9">lin.komb.</text>
        </svg>`,
        caption: 'Span von v₁, v₂ (nicht-parallel) füllt ℝ²',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $v_1 = (1, 0)$, $v_2 = (0, 1)$: linear unabhängig, $\\text{span}\\{v_1, v_2\\} = \\mathbb{R}^2$.\n\n$v_1 = (1, 2)$, $v_2 = (2, 4) = 2v_1$: linear **abhängig**, $\\text{span}$ ist nur eine Gerade.',
      },
    ],
    practice: [
      {
        id: 'p1.vecformal.ex1',
        difficulty: 1,
        conceptTags: ['linear-combination'],
        type: 'mc',
        prompt: 'Was ist $2 \\cdot (1, 2) + 3 \\cdot (0, 1)$?',
        options: ['$(2, 7)$', '$(2, 4)$', '$(5, 7)$', '$(2, 5)$'],
        answer: '$(2, 7)$',
        hints: [
          'Skalare einzeln anwenden: $2 \\cdot (1,2) = (2,4)$.',
          '$3 \\cdot (0,1) = (0,3)$. Dann addieren.',
          '$(2,4) + (0,3) = (2,7)$.',
        ],
        explanation: '$2(1,2) + 3(0,1) = (2,4) + (0,3) = (2,7)$.',
        misconceptions: {
          '$(2, 4)$': 'Der zweite Term $3 \\cdot (0,1) = (0,3)$ wurde vergessen.',
        },
      },
      {
        id: 'p1.vecformal.ex2',
        difficulty: 2,
        conceptTags: ['span'],
        type: 'mc',
        prompt: 'Welche Vektormenge spannt ganz $\\mathbb{R}^2$ auf?',
        options: [
          '$\\{(1,0),\\; (0,1)\\}$',
          '$\\{(1,0),\\; (2,0)\\}$',
          '$\\{(1,1)\\}$',
          '$\\{(1,1),\\; (2,2)\\}$',
        ],
        answer: '$\\{(1,0),\\; (0,1)\\}$',
        hints: [
          'Um $\\mathbb{R}^2$ zu spannen, braucht man 2 linear unabhängige Vektoren.',
          'Sind $(1,0)$ und $(2,0)$ linear unabhängig?',
          '$(2,0) = 2 \\cdot (1,0)$ — abhängig! Span ist nur die x-Achse.',
        ],
        explanation:
          '$(1,0)$ und $(0,1)$ sind linear unabhängig und spannen $\\mathbb{R}^2$. Die anderen Mengen haben entweder parallele Vektoren oder nur einen.',
        misconceptions: {
          '$\\{(1,0),\\; (2,0)\\}$': 'Diese Vektoren sind linear abhängig — $(2,0) = 2(1,0)$. Span ist nur die x-Achse.',
        },
      },
      {
        id: 'p1.vecformal.ex3',
        difficulty: 2,
        conceptTags: ['linear-independence'],
        type: 'mc',
        prompt: '"$\\{(1,2),\\; (2,4)\\}$ ist linear unabhängig." — Wahr oder falsch?',
        options: ['Falsch — zweiter Vektor ist doppelter erster', 'Wahr'],
        answer: 'Falsch — zweiter Vektor ist doppelter erster',
        hints: [
          'Lineare Abhängigkeit: kann man einen Vektor als Linearkombination der anderen schreiben?',
          '$(2,4) = 2 \\cdot (1,2)$ — ja!',
          'Also sind sie linear abhängig.',
        ],
        explanation: '$(2,4) = 2 \\cdot (1,2)$: linear abhängig. Span ist nur eine Gerade durch den Ursprung.',
      },
      {
        id: 'p1.vecformal.ex4',
        difficulty: 3,
        conceptTags: ['linear-combination', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe** (Word2Vec-Analogie): $\\vec{a} = (5, 2)$ (König), $\\vec{b} = (3, 1)$ (Mann), $\\vec{c} = (3, 3)$ (Frau). Berechne $\\vec{a} - \\vec{b} + \\vec{c}$, x-Komponente.',
        answer: 5,
        hints: [
          'Komponentenweise rechnen: x-Komponente: $5 - 3 + 3$.',
          '$5 - 3 = 2$, dann $2 + 3 = ?$',
          '$2 + 3 = 5$.',
        ],
        explanation: '$\\vec{a} - \\vec{b} + \\vec{c} = (5-3+3, 2-1+3) = (5, 4)$. x-Komponente: 5.',
      },
      {
        id: 'p1.vecformal.ex5',
        difficulty: 3,
        conceptTags: ['linear-independence'],
        type: 'mc',
        prompt:
          'Drei beliebige Vektoren in $\\mathbb{R}^2$ — sind sie immer linear abhängig?',
        options: [
          'Ja — in $\\mathbb{R}^2$ gibt es maximal 2 linear unabhängige Vektoren',
          'Nein — es kommt auf die Vektoren an',
          'Nein — 3 Vektoren können immer linear unabhängig sein',
        ],
        answer: 'Ja — in $\\mathbb{R}^2$ gibt es maximal 2 linear unabhängige Vektoren',
        hints: [
          'Wie viele linear unabhängige Vektoren passen maximal in $\\mathbb{R}^2$?',
          'Die Dimension von $\\mathbb{R}^2$ ist 2.',
          'Mehr als 2 Vektoren in einem 2D-Raum müssen linear abhängig sein.',
        ],
        explanation:
          'Dimension von $\\mathbb{R}^2$ ist 2 — es passen maximal 2 linear unabhängige Vektoren. Ein dritter Vektor ist immer Linearkombination der anderen.',
      },
      {
        id: 'p1.vecformal.ex6',
        difficulty: 4,
        conceptTags: ['vector-space', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Ein Embedding-Vektor hat Dimension 768. Was beschreibt das geometrisch?',
        options: [
          'Der Vektor ist ein Punkt in einem 768-dimensionalen Vektorraum',
          'Der Vektor hat 768 verschiedene Eigenwerte',
          'Das Modell hat 768 Parameter',
          'Der Vektor ist eine $768 \\times 1$-Matrix',
        ],
        answer: 'Der Vektor ist ein Punkt in einem 768-dimensionalen Vektorraum',
        hints: [
          'Dimension 768 bedeutet: 768 Komponenten.',
          'Ein Vektor mit $n$ Komponenten ist ein Element von $\\mathbb{R}^n$.',
          '$\\mathbb{R}^{768}$ ist ein 768-dimensionaler Vektorraum.',
        ],
        explanation:
          'BERT-base-Embeddings leben in $\\mathbb{R}^{768}$. Jedes Token entspricht einem Punkt in diesem 768D-Raum, wobei semantische Ähnlichkeit ≈ geometrische Nähe.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Embeddings sind Vektorräume\n\nDie semantische Arithmetic von Word2Vec ($\\vec{König} - \\vec{Mann} + \\vec{Frau} \\approx \\vec{Königin}$) war eine Sensation — ein Hinweis, dass Sprache lineare Struktur hat.\n\nModerne LLM-Embeddings sind noch mächtiger:\n- **Ähnlichkeit**: $\\cos\\text{-sim}(\\vec{v}_1, \\vec{v}_2)$ misst semantische Verwandtschaft.\n- **Arithmetik**: Analogy-Tasks ("Paris ist zu Frankreich wie Berlin zu __") via Linearkombination.\n- **Clustering**: Vektoren ähnlicher Konzepte clustern natürlich zusammen.',
      },
      {
        kind: 'callout',
        content:
          '3Blue1Brown "Essence of Linear Algebra" Folge 2 visualisiert Linearkombinationen und Span. Der Span-Begriff ist der Schlüssel zum Verständnis von Embedding-Räumen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.vecformal.card1',
      front: 'Definition Linearkombination?',
      back: '$c_1 v_1 + c_2 v_2 + \\dots + c_k v_k$ mit Skalaren $c_i \\in \\mathbb{R}$.',
      conceptTags: ['linear-combination'],
    },
    {
      id: 'p1.vecformal.card2',
      front: 'Definition Span?',
      back: 'Menge aller Linearkombinationen einer Vektormenge.',
      conceptTags: ['span'],
    },
    {
      id: 'p1.vecformal.card3',
      front: 'Definition lineare Unabhängigkeit?',
      back: 'Einzige Linearkombination $= \\vec{0}$ ist die triviale: $c_i = 0$ für alle $i$.',
      conceptTags: ['linear-independence'],
    },
  ],
}
