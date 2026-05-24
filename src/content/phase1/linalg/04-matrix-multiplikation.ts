import type { Lesson } from '../../../types'

export const matrixMultiplikation: Lesson = {
  id: 'p1.matrix-multiplikation',
  title: 'Matrix-Multiplikation',
  conceptTags: ['matrix-multiplication', 'composition', 'dimension', 'attention'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Matrix-Multiplikation = Komposition von Abbildungen\n\n$AB$ bedeutet: erst $B$ anwenden, dann $A$. Die Eintrags-Formel: $(AB)_{ij}$ ist das Skalarprodukt der $i$-ten Zeile von $A$ mit der $j$-ten Spalte von $B$.',
      },
      {
        kind: 'math',
        content:
          '$$(AB)_{ij} = \\sum_{k=1}^{p} A_{ik} B_{kj} \\qquad (m \\times p) \\cdot (p \\times n) = (m \\times n)$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Attention-Scoring $QK^T$ ist Matrix-Multiplikation. Jeder Forward-Pass eines neuronalen Netzes ist eine Kette von Matrix-Multiplikationen — genau das, wofür GPU-Tensor-Cores optimiert sind.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Wichtige Eigenschaften\n\n**Nicht kommutativ**: $AB \\neq BA$ im Allgemeinen!\n\n**Assoziativ**: $(AB)C = A(BC)$ ✓\n\n**Distributiv**: $A(B+C) = AB + AC$ ✓\n\n**Dimensions-Regel**: $(m \\times k) \\cdot (k \\times n) = (m \\times n)$ — innere Dimensionen müssen übereinstimmen.',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $A = \\begin{pmatrix}1 & 2\\\\ 3 & 4\\end{pmatrix}$, $B = \\begin{pmatrix}5 & 6\\\\ 7 & 8\\end{pmatrix}$\n\n$(AB)_{11} = 1 \\cdot 5 + 2 \\cdot 7 = 19$\n$(AB)_{12} = 1 \\cdot 6 + 2 \\cdot 8 = 22$\n$(AB)_{21} = 3 \\cdot 5 + 4 \\cdot 7 = 43$\n$(AB)_{22} = 3 \\cdot 6 + 4 \\cdot 8 = 50$',
      },
    ],
    practice: [
      {
        id: 'p1.matmul.ex1',
        difficulty: 1,
        conceptTags: ['dimension'],
        type: 'mc',
        prompt: 'Welche Dimension hat $AB$ wenn $A \\in \\mathbb{R}^{3 \\times 4}$ und $B \\in \\mathbb{R}^{4 \\times 2}$?',
        options: ['$3 \\times 2$', '$4 \\times 4$', '$3 \\times 4$', '$2 \\times 3$'],
        answer: '$3 \\times 2$',
        hints: [
          '$(m \\times k) \\cdot (k \\times n) = (m \\times n)$.',
          '$m = 3$, $k = 4$, $n = 2$.',
          '$3 \\times 2$.',
        ],
        explanation: '$(3 \\times 4) \\cdot (4 \\times 2) = (3 \\times 2)$ — innere Dimension $4$ fällt weg.',
      },
      {
        id: 'p1.matmul.ex2',
        difficulty: 2,
        conceptTags: ['dimension'],
        type: 'mc',
        prompt: 'Ist die Multiplikation $A \\cdot B$ definiert, wenn $A \\in \\mathbb{R}^{2 \\times 3}$ und $B \\in \\mathbb{R}^{2 \\times 3}$?',
        options: ['Nein — innere Dimensionen $3 \\neq 2$', 'Ja, Ergebnis $2 \\times 3$', 'Ja, Ergebnis $3 \\times 3$'],
        answer: 'Nein — innere Dimensionen $3 \\neq 2$',
        hints: [
          'Für $AB$ müssen Spalten von $A$ = Zeilen von $B$ sein.',
          '$A$ hat 3 Spalten, $B$ hat 2 Zeilen: $3 \\neq 2$.',
          'Nicht definiert.',
        ],
        explanation: '$A \\in \\mathbb{R}^{2 \\times 3}$: 3 Spalten. $B \\in \\mathbb{R}^{2 \\times 3}$: 2 Zeilen. $3 \\neq 2$ → nicht definiert.',
      },
      {
        id: 'p1.matmul.ex3',
        difficulty: 2,
        conceptTags: ['commutativity'],
        type: 'mc',
        prompt: '"Matrix-Multiplikation ist kommutativ, d.h. $AB = BA$." — Wahr oder falsch?',
        options: ['Falsch — $AB \\neq BA$ im Allgemeinen', 'Wahr'],
        answer: 'Falsch — $AB \\neq BA$ im Allgemeinen',
        hints: [
          'Gegenbeispiel: $A = \\begin{pmatrix}1&2\\\\ 0&0\\end{pmatrix}$, $B = \\begin{pmatrix}0&1\\\\ 0&0\\end{pmatrix}$.',
          '$AB = \\begin{pmatrix}0&1\\\\ 0&0\\end{pmatrix} \\neq BA = \\begin{pmatrix}0&0\\\\ 0&0\\end{pmatrix}$.',
          'Kommutativität gilt generell nicht.',
        ],
        explanation: 'Matrix-Multiplikation ist **nicht** kommutativ. Selbst wenn Dimensionen passen, ist $AB \\neq BA$ typischerweise.',
      },
      {
        id: 'p1.matmul.ex4',
        difficulty: 3,
        conceptTags: ['matrix-multiplication'],
        type: 'numeric',
        prompt:
          'Für $A = \\begin{pmatrix}1 & 2\\\\ 3 & 4\\end{pmatrix}$ und $B = I$ (Identitäts-Matrix): was ist $(AB)_{11}$?',
        answer: 1,
        hints: [
          '$I = \\begin{pmatrix}1 & 0\\\\ 0 & 1\\end{pmatrix}$.',
          '$AI = A$ (Identität ändert nichts).',
          '$(AB)_{11} = A_{11} = 1$.',
        ],
        explanation: '$A \\cdot I = A$, also $(AB)_{11} = A_{11} = 1$.',
      },
      {
        id: 'p1.matmul.ex5',
        difficulty: 3,
        conceptTags: ['attention', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: In Attention: $Q \\in \\mathbb{R}^{10 \\times 64}$, $K \\in \\mathbb{R}^{10 \\times 64}$. Welche Form hat $QK^T$?',
        options: ['$(10, 10)$', '$(64, 64)$', '$(10, 64)$', '$(64, 10)$'],
        answer: '$(10, 10)$',
        hints: [
          '$K^T$ hat Form $(64, 10)$.',
          '$(10 \\times 64) \\cdot (64 \\times 10) = ?$',
          '$(10 \\times 10)$ — die Attention-Score-Matrix.',
        ],
        explanation:
          '$Q \\in (10 \\times 64)$, $K^T \\in (64 \\times 10)$: Ergebnis $QK^T \\in (10 \\times 10)$. Eintrag $(i,j)$ = wie sehr Token $i$ auf Token $j$ achtet.',
      },
      {
        id: 'p1.matmul.ex6',
        difficulty: 4,
        conceptTags: ['attention', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Transformer: Batch-Size 32, Seq-Länge 128, Hidden-Dim 768. Form der Attention-Score-Matrix (pro Batch)?',
        options: ['$(32, 128, 128)$', '$(32, 768, 768)$', '$(128, 768, 768)$', '$(32, 128, 768)$'],
        answer: '$(32, 128, 128)$',
        hints: [
          'Attention-Scores: Ähnlichkeit jedes Tokens mit jedem anderen.',
          'Pro Sample: $128 \\times 128$-Matrix.',
          'Für 32 Samples: $(32, 128, 128)$.',
        ],
        explanation:
          'Attention-Scores: $(B, L, L) = (32, 128, 128)$. Eintrag $(b, i, j)$: wie stark Token $i$ in Sample $b$ auf Token $j$ achtet.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Warum GPUs für ML?\n\nJeder Forward-Pass eines neuronalen Netzes besteht aus hunderten Matrix-Multiplikationen. Für GPT-4 (spekulativ ~1 Trillion Parameter) sind das bei einem einzelnen Forward-Pass Milliarden von Multiplikation-Additions-Operationen.\n\nNVIDIA Tensor Cores, AMD MFMA und Apple Neural Engine sind spezialisierte Hardware, die genau diese Matrix-Multiplikationen in einem Clock-Cycle berechnen — in gemischter Präzision (FP16/BF16).',
      },
      {
        kind: 'callout',
        content:
          'FlashAttention ist eine ausgeklügelte Implementierung von $\\text{softmax}(QK^T/\\sqrt{d})V$, die IO-aware die Matrix-Multiplikationen so anordnet, dass der GPU-Cache optimal genutzt wird — 2–4× schneller als naive Implementierung bei langen Sequenzen.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.matmul.card1',
      front: 'Dimensions-Regel Matrix-Multiplikation?',
      back: '$(m \\times k) \\cdot (k \\times n) = (m \\times n)$ — innere Dimension muss übereinstimmen.',
      conceptTags: ['dimension'],
    },
    {
      id: 'p1.matmul.card2',
      front: 'Eintrags-Formel $(AB)_{ij}$?',
      back: '$\\sum_k A_{ik} B_{kj}$ — Skalarprodukt Zeile $i$ von $A$ mit Spalte $j$ von $B$.',
      conceptTags: ['matrix-multiplication'],
    },
    {
      id: 'p1.matmul.card3',
      front: 'Ist Matrix-Multiplikation kommutativ?',
      back: 'Nein, $AB \\neq BA$ im Allgemeinen.',
      conceptTags: ['commutativity'],
    },
  ],
}
