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

  learningOutcome:
    'Du kannst Matrix-Vektor-Produkte und Matrix-Matrix-Produkte berechnen, die Nicht-Kommutativität erklären, Batch-Matrix-Multiplikation verstehen und erläutern, warum der Forward-Pass eines neuronalen Netzes eine Kette von Matrizenprodukten ist.',

  description:
    'Matrix-Multiplikation ist die Operation, die das gesamte Deep Learning antreibt. Jeder Forward-Pass, jede Attention-Berechnung, jede Backpropagation: alles sind Matrizenprodukte. Verstehe die Formel $(AB)_{ij} = \\sum_k A_{ik} B_{kj}$ als Komposition von Abbildungen.',

  conceptSteps: [
    {
      title: 'Matrix-Vektor-Produkt: Zeile × Spalte',
      preprompt: 'Du kennst $A\\mathbf{x}$ — jede Zeile von $A$ wird mit $\\mathbf{x}$ als Skalarprodukt kombiniert.',
      body: 'Das **Matrix-Vektor-Produkt** $A\\mathbf{x}$ mit $A \\in \\mathbb{R}^{m \\times n}$, $\\mathbf{x} \\in \\mathbb{R}^n$:\n\n$$(A\\mathbf{x})_i = \\sum_{j=1}^n A_{ij} x_j = \\langle \\text{Zeile}_i(A),\\, \\mathbf{x} \\rangle$$\n\nJede Komponente des Ergebnisses ist ein **Skalarprodukt** einer Zeile von $A$ mit $\\mathbf{x}$.\n\nDimension-Check: $(m \\times n) \\cdot (n \\times 1) = (m \\times 1)$ — innere Dimension muss stimmen!',
    },
    {
      title: 'Matrix-Matrix-Produkt: formale Definition',
      body: 'Das Produkt $C = AB$ mit $A \\in \\mathbb{R}^{m \\times p}$, $B \\in \\mathbb{R}^{p \\times n}$:\n\n$$C_{ij} = \\sum_{k=1}^p A_{ik} B_{kj} \\qquad C \\in \\mathbb{R}^{m \\times n}$$\n\nEintrag $(i,j)$ von $C$ = Skalarprodukt der $i$-ten Zeile von $A$ mit der $j$-ten Spalte von $B$.\n\n**Dimensions-Merkhilfe**: $(m \\times p) \\cdot (p \\times n) = (m \\times n)$ — mittlere Dimension fällt weg.',
      miniExample: '$\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}\\begin{pmatrix}5&6\\\\7&8\\end{pmatrix}$: $(1,1)$-Eintrag $= 1 \\cdot 5 + 2 \\cdot 7 = 19$.',
    },
    {
      title: 'Komposition von Abbildungen',
      body: 'Matrix-Multiplikation $AB$ entspricht der **Komposition**: erst $B$ anwenden, dann $A$.\n\n$$(AB)\\mathbf{x} = A(B\\mathbf{x})$$\n\n**Interpretation**: $B$ transformiert $\\mathbf{x}$ zuerst, dann transformiert $A$ das Ergebnis. Die Reihenfolge ist wichtig!\n\nDeshalb: $(AB)\\mathbf{x} = A(B\\mathbf{x})$, aber im Allgemeinen $(BA)\\mathbf{x} \\neq A(B\\mathbf{x})$.',
    },
    {
      title: 'Nicht-Kommutativität',
      body: 'Ein grundlegender Unterschied zu Zahlen: $AB \\neq BA$ im Allgemeinen!\n\n**Gegenbeispiel**:\n$$A = \\begin{pmatrix}1&1\\\\0&0\\end{pmatrix}, \\quad B = \\begin{pmatrix}1&0\\\\1&0\\end{pmatrix}$$\n\n$AB = \\begin{pmatrix}2&0\\\\0&0\\end{pmatrix} \\neq BA = \\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$\n\n**Gilt immer**: Assoziativgesetz $(AB)C = A(BC)$ ✓, Distributivgesetz $A(B+C) = AB + AC$ ✓.',
      selfCheck: 'Warum darf man bei $(W_2 W_1) \\mathbf{x}$ die Reihenfolge nicht umkehren?',
    },
    {
      title: 'Batch-Verarbeitung in ML',
      body: 'In der Praxis verarbeitet man **Batches**: $N$ Datenpunkte gleichzeitig.\n\nBatch als Matrix $X \\in \\mathbb{R}^{N \\times d}$ (Zeilen = Datenpunkte):\n\n$$XW \\in \\mathbb{R}^{N \\times m} \\qquad (N \\times d) \\cdot (d \\times m) = (N \\times m)$$\n\nAlle $N$ Datenpunkte werden gleichzeitig durch die Gewichtsmatrix $W$ projiziert — ein einziges Matrizenprodukt statt $N$ einzelner Matrix-Vektor-Produkte.',
    },
    {
      title: 'ML: Forward-Pass und Attention-Score $QK^T$',
      body: 'Ein $L$-Layer-Netz (ohne Aktivierung):\n\n$$\\mathbf{y} = W_L W_{L-1} \\cdots W_2 W_1 \\mathbf{x} = \\left(\\prod_{i=1}^L W_i\\right) \\mathbf{x}$$\n\nDas ist ein einziges Matrizenprodukt!\n\n**Attention-Score**: $Q \\in \\mathbb{R}^{L \\times d_k}$, $K \\in \\mathbb{R}^{L \\times d_k}$:\n\n$$\\text{Scores} = \\frac{QK^T}{\\sqrt{d_k}} \\in \\mathbb{R}^{L \\times L}$$\n\nEintrag $(i,j)$: wie stark Token $i$ auf Token $j$ achtet.',
      miniExample: 'Für $L=4$ Token: Attention-Matrix $\\in \\mathbb{R}^{4 \\times 4}$ — 16 Scores, je einer pro Token-Paar.',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: torch.mm, torch.bmm und Batch-Attention',
      lang: 'python',
      code: `import torch

# --- 1. Matrix-Vektor-Produkt ---
A = torch.tensor([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])  # 3×2
x = torch.tensor([1.0, 1.0])                              # 2×1
y = A @ x          # = [3, 7, 11]; (3×2)·(2) = (3)

# --- 2. Matrix-Matrix-Produkt ---
B = torch.tensor([[5.0, 6.0], [7.0, 8.0]])               # 2×2
C = torch.mm(A, B)  # torch.mm: (3×2)·(2×2) = (3×2)
# C[0,0] = 1*5 + 2*7 = 19; C[0,1] = 1*6 + 2*8 = 22

# --- 3. Batch-Matrix-Multiplikation (Attention) ---
batch_size = 4
seq_len = 8
d_k = 16
Q = torch.randn(batch_size, seq_len, d_k)    # (4, 8, 16)
K = torch.randn(batch_size, seq_len, d_k)    # (4, 8, 16)

# Attention-Score: Q·K^T / sqrt(d_k)
# K.transpose(-2, -1): letzte zwei Dims tauschen → (4, 16, 8)
scores = torch.bmm(Q, K.transpose(-2, -1)) / d_k**0.5
# scores.shape = (4, 8, 8) — ein 8×8-Attention-Score pro Batch
attn_weights = torch.softmax(scores, dim=-1)  # normiert über Keys

# Nicht-Kommutativität demonstrieren
M1 = torch.tensor([[1.0, 1.0], [0.0, 0.0]])
M2 = torch.tensor([[1.0, 0.0], [1.0, 0.0]])
print(M1 @ M2)  # [[2,0],[0,0]]
print(M2 @ M1)  # [[1,1],[1,1]]  ← verschieden!`,
      annotation: '`torch.mm(A, B)` ist das Standard-2D-Matrizenprodukt. Für Batches nutzt man `torch.bmm(A, B)` (Batch Matrix Multiply): verarbeitet $(B, m, k) \\cdot (B, k, n) = (B, m, n)$. In Attention: `K.transpose(-2, -1)` tauscht Sequenz- und Feature-Dimension, sodass $QK^T$ die paarweisen Ähnlichkeiten berechnet. `d_k**0.5` entspricht der $1/\\sqrt{d_k}$-Normierung aus "Attention is All You Need".',
    },
  ],

  derivations: [
    {
      claim: '$(AB)C = A(BC)$ — Assoziativität der Matrix-Multiplikation',
      reasoning:
        'Betrachte $((AB)C)_{il} = \\sum_j (AB)_{ij} C_{jl} = \\sum_j (\\sum_k A_{ik} B_{kj}) C_{jl} = \\sum_k A_{ik} (\\sum_j B_{kj} C_{jl}) = \\sum_k A_{ik} (BC)_{kl} = (A(BC))_{il}$. Die Umordnung der endlichen Summen ist immer erlaubt. Assoziativität bedeutet: die Reihenfolge der Auswertung von Klammern spielt keine Rolle — nur die Reihenfolge der Matrizen zählt.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$AB = BA$ (Matrix-Multiplikation ist kommutativ)',
      correct: '$AB \\neq BA$ im Allgemeinen; gilt nur in Ausnahmefällen (z.B. $A = I$)',
      explanation: 'Kommuativität gilt für reelle Zahlen, nicht für Matrizen. Geometrisch: "erst Rotation, dann Streckung" ergibt etwas anderes als "erst Streckung, dann Rotation".',
    },
    {
      wrong: 'Für $AB$ gilt: $A$ und $B$ können beliebige Dimensionen haben',
      correct: 'Die innere Dimension muss übereinstimmen: $A$ hat so viele Spalten wie $B$ Zeilen hat',
      explanation: '$(m \\times k) \\cdot (k \\times n) = (m \\times n)$. Wenn $A \\in \\mathbb{R}^{3 \\times 4}$ und $B \\in \\mathbb{R}^{3 \\times 4}$, ist $AB$ **nicht definiert** (innere Dimensionen $4 \\neq 3$).',
    },
    {
      wrong: 'Bei Batch-Verarbeitung multipliziert man $N$ Mal separat',
      correct: 'Batch-Matrix-Multiplikation verarbeitet alle $N$ Samples gleichzeitig',
      explanation: '$XW$ mit $X \\in \\mathbb{R}^{N \\times d}$ berechnet alle $N$ Outputs in einem einzigen Matrizenprodukt — GPU-Tensor-Cores führen das massiv parallel aus.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Matrix multiplication as composition" (Essence of Linear Algebra, Ep. 4)',
      type: 'video',
      note: 'Visualisierung von Matrizenmultiplikation als Komposition von Transformationen',
    },
    {
      title: 'MML Book, Kapitel 2.2.2: "Matrix-Multiplikation"',
      type: 'book',
      note: 'Rigoros; enthält auch den Zusammenhang mit linearen Gleichungssystemen',
    },
    {
      title: '"Attention is All You Need" (Vaswani et al., 2017) — Abschnitt 3.2',
      type: 'article',
      note: 'Original Transformer-Paper: $\\text{Attention}(Q,K,V) = \\text{softmax}(QK^T/\\sqrt{d_k})V$',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.matrizen-lineare-abbildungen',
      relation: 'requires',
      hint: 'Matrix-Multiplikation ist die Komposition linearer Abbildungen — baut direkt auf Lektion 03 auf.',
    },
    {
      lessonId: 'p1.inverse-transponierte',
      relation: 'extends',
      hint: 'Die Inverse und Transponierte sind mit Multiplikation definiert: $AA^{-1} = I$ und $(AB)^T = B^T A^T$.',
    },
    {
      lessonId: 'p1.tensoren-ml-bruecke',
      relation: 'extends',
      hint: 'Tensoren verallgemeinern Matrix-Multiplikation auf beliebige Batch-Dimensionen.',
    },
    {
      lessonId: 'p1.multivariate-kettenregel-backprop',
      relation: 'see-also',
      hint: 'Backpropagation verwendet Matrizenprodukte mit transponierten Gewichtsmatrizen.',
    },
  ],

  reflection: 'Matrix-Multiplikation ist die Operation, die Deep Learning antreibt. Jeder Transformer-Block, jeder Dense-Layer — eine Kette von Matrizenprodukten, beschleunigt durch spezialisierte Hardware. **Was überrascht dich an der Verbindung zwischen dem abstrakten "$(AB)_{ij} = \\sum_k$" und dem praktischen "GPU berechnet Attention-Scores"?**',
}
