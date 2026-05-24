import type { Lesson } from '../../../types'

export const normSkalarprodukt: Lesson = {
  id: 'p1.norm-skalarprodukt',
  title: 'Norm & Skalarprodukt (vertieft)',
  conceptTags: ['norm', 'dot-product', 'l1', 'l2', 'frobenius', 'cauchy-schwarz'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Normen — verschiedene Abstands-Konzepte\n\nEine **Norm** misst die Länge eines Vektors. Die drei wichtigsten für ML:',
      },
      {
        kind: 'math',
        content:
          '$$\\|v\\|_1 = \\sum_i |v_i| \\qquad \\|v\\|_2 = \\sqrt{\\sum_i v_i^2} \\qquad \\|v\\|_\\infty = \\max_i |v_i|$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: L1-Norm → Lasso-Regularisierung (sparse Gewichte), L2-Norm → Weight Decay (schrumpft alle Gewichte gleichmäßig), Frobenius-Norm → MSE für Matrizen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Geometrie der Einheitskugeln\n\nDie Einheitskugel $\\{v : \\|v\\| = 1\\}$ hat je nach Norm eine andere Form:',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-90 -60 180 120" width="180" height="120" xmlns="http://www.w3.org/2000/svg">
          <text x="-80" y="-48" fill="#9ca3af" font-size="9">L1</text>
          <text x="-20" y="-48" fill="#9ca3af" font-size="9">L2</text>
          <text x="42" y="-48" fill="#9ca3af" font-size="9">L∞</text>
          <polygon points="-70,0 -50,-20 -30,0 -50,20" fill="none" stroke="#ef4444" stroke-width="1.5"/>
          <circle cx="-20" cy="0" r="22" fill="none" stroke="#6366f1" stroke-width="1.5"/>
          <rect x="38" y="-22" width="44" height="44" fill="none" stroke="#10b981" stroke-width="1.5"/>
          <line x1="-90" y1="0" x2="90" y2="0" stroke="#374151" stroke-width="0.5"/>
        </svg>`,
        caption: 'Einheitskugeln von L1 (Raute), L2 (Kreis), L∞ (Quadrat)',
      },
      {
        kind: 'text',
        content:
          '### Cauchy-Schwarz-Ungleichung\n\n$|a \\cdot b| \\leq \\|a\\|_2 \\cdot \\|b\\|_2$\n\nGleichheit genau dann, wenn $a$ und $b$ parallel sind. Das ist die mathematische Grundlage dafür, dass Cosine-Similarity in $[-1, 1]$ liegt.\n\n### Frobenius-Norm für Matrizen\n\n$\\|A\\|_F = \\sqrt{\\sum_{i,j} a_{ij}^2}$ — L2-Norm aller Einträge.',
      },
    ],
    practice: [
      {
        id: 'p1.norm.ex1',
        difficulty: 1,
        conceptTags: ['l1'],
        type: 'numeric',
        prompt: 'L1-Norm von $(3, -4)$?',
        answer: 7,
        hints: [
          'L1-Norm: Summe der Beträge.',
          '$|3| + |-4| = ?$',
          '$3 + 4 = 7$.',
        ],
        explanation: '$\\|(3,-4)\\|_1 = |3| + |-4| = 3 + 4 = 7$.',
      },
      {
        id: 'p1.norm.ex2',
        difficulty: 1,
        conceptTags: ['l2'],
        type: 'numeric',
        prompt: 'L2-Norm von $(3, -4)$?',
        answer: 5,
        hints: [
          'L2-Norm: $\\sqrt{3^2 + (-4)^2}$.',
          '$9 + 16 = 25$.',
          '$\\sqrt{25} = 5$.',
        ],
        explanation: '$\\|(3,-4)\\|_2 = \\sqrt{9+16} = \\sqrt{25} = 5$.',
      },
      {
        id: 'p1.norm.ex3',
        difficulty: 1,
        conceptTags: ['norm'],
        type: 'numeric',
        prompt: 'L∞-Norm von $(3, -4)$?',
        answer: 4,
        hints: [
          'L∞-Norm: größter Betrag unter den Komponenten.',
          'Beträge: $|3| = 3$, $|-4| = 4$.',
          'Maximum: $4$.',
        ],
        explanation: '$\\|(3,-4)\\|_\\infty = \\max(3, 4) = 4$.',
      },
      {
        id: 'p1.norm.ex4',
        difficulty: 2,
        conceptTags: ['norm', 'ml'],
        type: 'mc',
        prompt: 'Welche Regularisierung produziert **sparse** Gewichte (viele exakt 0)?',
        options: ['L1 (Lasso)', 'L2 (Ridge / Weight Decay)', 'L∞', 'Keine'],
        answer: 'L1 (Lasso)',
        hints: [
          'L1-Regularisierung bestraft die Summe der Beträge der Gewichte.',
          'Die Rauten-Form der L1-Einheitskugel führt dazu, dass Optima auf Ecken liegen.',
          'Ecken der L1-Kugel → genau 0 Koordinaten → Sparsity.',
        ],
        explanation:
          'L1-Regularisierung (Lasso) erzeugt sparse Lösungen: viele Gewichte werden exakt 0. Grund: geometrisch treffen Niveau-Linien der Loss-Funktion die Rauten-förmige L1-Kugel oft an Ecken.',
        misconceptions: {
          'L2 (Ridge / Weight Decay)': 'L2 schrumpft alle Gewichte gleichmäßig in Richtung 0, aber nicht auf exakt 0.',
        },
      },
      {
        id: 'p1.norm.ex5',
        difficulty: 3,
        conceptTags: ['frobenius', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Frobenius-Norm der Matrix $\\begin{pmatrix}1 & 2\\\\ 2 & 1\\end{pmatrix}$? Auf 2 Nachkommastellen.',
        answer: 3.16,
        acceptedAlternatives: ['3,16', '3.162', '3,162'],
        hints: [
          'Frobenius-Norm: $\\|A\\|_F = \\sqrt{\\sum_{ij} a_{ij}^2}$.',
          '$1^2 + 2^2 + 2^2 + 1^2 = 1 + 4 + 4 + 1 = 10$.',
          '$\\sqrt{10} \\approx 3{,}162$.',
        ],
        explanation: '$\\|A\\|_F = \\sqrt{1+4+4+1} = \\sqrt{10} \\approx 3{,}16$.',
      },
      {
        id: 'p1.norm.ex6',
        difficulty: 4,
        conceptTags: ['l1', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Lasso-Regression fügt L1-Regularisierung zum MSE-Loss hinzu: $L = \\|Xw - y\\|_2^2 + \\lambda \\|w\\|_1$. Was bewirkt ein sehr großes $\\lambda$?',
        options: [
          'Fast alle Gewichte werden 0 (Überregularisierung)',
          'Der Loss wird minimiert ohne Einschränkung',
          'Alle Gewichte werden gleich groß',
          'Das Modell wird komplexer',
        ],
        answer: 'Fast alle Gewichte werden 0 (Überregularisierung)',
        hints: [
          'Großes $\\lambda$ gewichtet die L1-Strafe stark.',
          'Je größer $\\lambda$, desto stärker wird $\\|w\\|_1 = \\sum |w_i|$ bestraft.',
          'Extrem: $w = 0$ minimiert $\\|w\\|_1$ vollständig.',
        ],
        explanation:
          'Sehr großes $\\lambda$: die L1-Strafe dominiert, fast alle Gewichte werden auf 0 getrieben — das Modell underfittet (zu sparsam).',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Normen als Design-Entscheidungen in ML\n\nDie Wahl der Norm ist eine fundamentale Design-Entscheidung:\n\n- **L2 (Weight Decay)**: Standard in neuronalen Netzen. Glatte Lösung, alle Gewichte klein, aber $\\neq 0$. In PyTorch: `optimizer = Adam(..., weight_decay=1e-4)`.\n- **L1 (Lasso)**: Feature-Selektion, sparse Repräsentationen. In Sparse Autoencodern (SAE) für LLM-Interpretability zentral.\n- **Frobenius**: Beim Matrix-Fine-Tuning (z.B. Adapter-Methoden) als Abstandsmaß.',
      },
      {
        kind: 'callout',
        content:
          'Cauchy-Schwarz garantiert $\\cos\\theta = \\frac{a \\cdot b}{\\|a\\|\\|b\\|} \\in [-1,1]$. Ohne Cauchy-Schwarz wäre Cosine-Similarity kein sinnvolles Ähnlichkeitsmaß.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.norm.card1',
      front: 'L1-Norm?',
      back: '$\\|v\\|_1 = \\sum_i |v_i|$ (Summe der Beträge).',
      conceptTags: ['l1'],
    },
    {
      id: 'p1.norm.card2',
      front: 'L2-Norm?',
      back: '$\\|v\\|_2 = \\sqrt{\\sum_i v_i^2}$ (euklidische Länge).',
      conceptTags: ['l2'],
    },
    {
      id: 'p1.norm.card3',
      front: 'Cauchy-Schwarz-Ungleichung?',
      back: '$|a \\cdot b| \\leq \\|a\\|_2 \\cdot \\|b\\|_2$.',
      conceptTags: ['cauchy-schwarz'],
    },
  ],
}
