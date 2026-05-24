import type { Lesson } from '../../types'

export const vektoren: Lesson = {
  id: 'p0.vektoren',
  title: 'Vektoren im Raum',
  conceptTags: ['vector', 'addition', 'scalar-multiplication', 'norm'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Vektoren\n\nEin **Vektor** $\\vec{v} = (v_1, v_2, \\ldots, v_n)$ ist eine geordnete Liste von Zahlen. Du kannst ihn als Pfeil im Raum, als Punkt oder als Liste denken — je nach Kontext.\n\nIn ML sind Vektoren das Grundobjekt: jedes Wort, jeder Satz, jedes Bild wird als Vektor dargestellt.',
      },
      {
        kind: 'math',
        content:
          '$$\\vec{a} + \\vec{b} = (a_1 + b_1,\\; a_2 + b_2) \\qquad c \\cdot \\vec{a} = (c \\cdot a_1,\\; c \\cdot a_2)$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Embeddings sind Vektoren — ein Wort wie "Berlin" wird auf einen Punkt in einem 768-dimensionalen Raum abgebildet. Wörter mit ähnlicher Bedeutung liegen nahe beieinander.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Vektoroperationen\n\n**Addition**: komponentenweise — $(1, 2) + (3, 4) = (4, 6)$\n\n**Skalarmultiplikation**: jede Komponente mit der gleichen Zahl multiplizieren — $3 \\cdot (1, 2) = (3, 6)$\n\n**Länge (Norm)** via Pythagoras:',
      },
      {
        kind: 'math',
        content:
          '$$\\|\\vec{v}\\| = \\sqrt{v_1^2 + v_2^2 + \\ldots + v_n^2}$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $\\vec{a} = (3, 4)$\n\n$\\|\\vec{a}\\| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$\n\nEin **normalisierter Vektor** hat Länge 1: $\\hat{a} = \\frac{\\vec{a}}{\\|\\vec{a}\\|} = (0{,}6,\\; 0{,}8)$.',
      },
    ],
    practice: [
      {
        id: 'p0.vec.ex1',
        difficulty: 1,
        conceptTags: ['vector', 'addition'],
        type: 'mc',
        prompt: 'Ergebnis von $(1, 2) + (3, 4)$?',
        options: ['$(4, 6)$', '$(3, 8)$', '$(4, 8)$', '$(2, 6)$'],
        answer: '$(4, 6)$',
        hints: [
          'Vektoren werden komponentenweise addiert.',
          '$1 + 3 = ?$ und $2 + 4 = ?$',
          '$1 + 3 = 4$, $2 + 4 = 6$: $(4, 6)$.',
        ],
        explanation: '$(1, 2) + (3, 4) = (1+3, 2+4) = (4, 6)$.',
        misconceptions: {
          '$(4, 8)$': 'Nur die erste Komponente stimmt. Zweite: $2 + 4 = 6$, nicht 8.',
        },
      },
      {
        id: 'p0.vec.ex2',
        difficulty: 2,
        conceptTags: ['vector', 'scalar-multiplication'],
        type: 'mc',
        prompt: 'Ergebnis von $3 \\cdot (2, -1)$?',
        options: ['$(6, -3)$', '$(5, 2)$', '$(6, 3)$', '$(6, -1)$'],
        answer: '$(6, -3)$',
        hints: [
          'Skalarmultiplikation: jede Komponente mit 3 multiplizieren.',
          '$3 \\cdot 2 = 6$ und $3 \\cdot (-1) = ?$',
          '$3 \\cdot (-1) = -3$: $(6, -3)$.',
        ],
        explanation: '$3 \\cdot (2, -1) = (3 \\cdot 2, 3 \\cdot (-1)) = (6, -3)$.',
      },
      {
        id: 'p0.vec.ex3',
        difficulty: 2,
        conceptTags: ['norm'],
        type: 'numeric',
        prompt: 'Länge des Vektors $(3, 4)$?',
        answer: 5,
        hints: [
          'Verwende die Norm-Formel: $\\|v\\| = \\sqrt{v_1^2 + v_2^2}$.',
          '$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16}$',
          '$\\sqrt{25} = 5$.',
        ],
        explanation: '$\\|(3,4)\\| = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
      },
      {
        id: 'p0.vec.ex4',
        difficulty: 3,
        conceptTags: ['norm'],
        type: 'numeric',
        prompt: 'Länge des Vektors $(1, 2, 2)$ in 3D?',
        answer: 3,
        hints: [
          '$\\|v\\| = \\sqrt{1^2 + 2^2 + 2^2}$',
          '$\\sqrt{1 + 4 + 4} = \\sqrt{9}$',
          '$\\sqrt{9} = 3$.',
        ],
        explanation: '$\\|(1,2,2)\\| = \\sqrt{1+4+4} = \\sqrt{9} = 3$.',
      },
      {
        id: 'p0.vec.ex5',
        difficulty: 4,
        conceptTags: ['norm', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Ein Embedding-Vektor hat Komponenten $(0{,}6,\\; 0{,}8)$. Was ist seine Länge?',
        answer: 1,
        acceptedAlternatives: ['1.0', '1,0', '1.00'],
        hints: [
          '$\\|v\\| = \\sqrt{0{,}6^2 + 0{,}8^2}$',
          '$0{,}36 + 0{,}64 = 1{,}00$',
          '$\\sqrt{1} = 1$. Das ist ein normalisierter Vektor!',
        ],
        explanation:
          '$\\sqrt{0{,}6^2 + 0{,}8^2} = \\sqrt{0{,}36 + 0{,}64} = \\sqrt{1} = 1$. Normalisierte Embedding-Vektoren haben immer Länge 1.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Embeddings sind Vektoren\n\nJedes LLM — GPT, Claude, Llama — verarbeitet Text als Vektoren. Ein Token wird in einen Embedding-Vektor umgewandelt. Das gesamte Modell rechnet dann nur noch mit Vektoroperationen:',
      },
      {
        kind: 'text',
        content:
          '- **Embedding-Schicht**: Wort → Vektor (z.B. $\\mathbb{R}^{768}$)\n- **Attention**: Skalarprodukte von Vektoren\n- **Feed-Forward**: Matrixmultiplikationen (Vektoren × Matrizen)\n- **Output**: Vektor → Wahrscheinlichkeitsverteilung über Tokens',
      },
      {
        kind: 'callout',
        content:
          'Alles, was in einem Sprachmodell passiert — von "Was kommt nach diesem Wort?" bis zu "Übersetze diesen Satz" — lässt sich als Abfolge von Vektoroperationen schreiben.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.vec.card1',
      front: 'Vektoraddition (Regel)?',
      back: 'Komponentenweise: $(a_1, a_2) + (b_1, b_2) = (a_1+b_1, a_2+b_2)$.',
      conceptTags: ['vector', 'addition'],
    },
    {
      id: 'p0.vec.card2',
      front: 'Norm in $\\mathbb{R}^n$?',
      back: '$\\|v\\| = \\sqrt{v_1^2 + v_2^2 + \\ldots + v_n^2}$',
      conceptTags: ['norm'],
    },
    {
      id: 'p0.vec.card3',
      front: 'Was ist ein normalisierter Vektor?',
      back: 'Ein Vektor mit Länge (Norm) 1.',
      conceptTags: ['norm'],
    },
  ],
}
