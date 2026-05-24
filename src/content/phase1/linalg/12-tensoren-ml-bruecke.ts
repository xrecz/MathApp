import type { Lesson } from '../../../types'

export const tensorenMlBruecke: Lesson = {
  id: 'p1.tensoren-ml-bruecke',
  title: 'Tensoren & ML-Brücke',
  conceptTags: ['tensor', 'broadcasting', 'einsum', 'batch', 'multi-head-attention'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Von Matrizen zu Tensoren\n\nEin **Tensor** verallgemeinert Skalare, Vektoren und Matrizen auf beliebige Dimensionen:\n\n- Stufe 0: Skalar ($1 \\times 1 \\times \\dots$) — ein Zahl\n- Stufe 1: Vektor $(n)$ — eine Liste\n- Stufe 2: Matrix $(m \\times n)$ — ein Gitter\n- Stufe 3: $(B \\times m \\times n)$ — ein "Stapel" von Matrizen\n\nIn PyTorch/NumPy: `tensor.shape = (B, m, n)` — $B$ unabhängige Matrizen auf einmal.',
      },
      {
        kind: 'math',
        content:
          '$$\\underbrace{(B, L, d)}_{\\text{Token-Embeddings}} \\xrightarrow{W_Q \\in (d, d_k)} \\underbrace{(B, L, d_k)}_{\\text{Queries}} \\qquad Q K^T: (B, L, d_k) \\cdot (B, d_k, L) = (B, L, L)$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Alle modernen Frameworks (PyTorch, JAX, TensorFlow) rechnen auf Tensoren. Der Transformer verarbeitet Batches von Sequenzen: $X \\in \\mathbb{R}^{B \\times L \\times d}$. Lineare Algebra auf Tensoren = die tägliche Arbeit eines ML-Ingenieurs.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Broadcasting\n\nWenn zwei Tensoren unterschiedliche Formen haben, werden kleinere Tensoren automatisch "gestreckt":\n\n$(B, L, d) + (d,)$ → $(d,)$ wird zu $(B, L, d)$ expandiert\n\n$(B, 1, d) \\cdot (1, L, d)$ → beide werden zu $(B, L, d)$\n\n### Einsum-Notation\n\n`einsum("bld,dk->blk", X, W)` = Matrix-Multiplikation über letzten zwei Indizes, Batch-Dimension wird beibehalten.',
      },
      {
        kind: 'worked-example',
        content:
          '**Multi-Head Attention (vereinfacht)**:\n\nEingabe: $X \\in \\mathbb{R}^{B \\times L \\times d}$ (Batch $\\times$ Sequenzlänge $\\times$ Hidden-Dim)\n\nAufteilen in $H$ Köpfe: $X \\to \\mathbb{R}^{B \\times H \\times L \\times d/H}$\n\nPro Kopf: $Q_h = X W_h^Q \\in \\mathbb{R}^{B \\times L \\times d_k}$\n\nAttention-Score: $S_h = Q_h K_h^T / \\sqrt{d_k} \\in \\mathbb{R}^{B \\times L \\times L}$\n\n$H = 12$ Köpfe parallel → $(B, 12, L, L)$ Attention-Maps',
      },
    ],
    practice: [
      {
        id: 'p1.tensor.ex1',
        difficulty: 1,
        conceptTags: ['tensor'],
        type: 'mc',
        prompt: 'Was ist ein Tensor der Stufe 3 mit Form $(4, 3, 2)$?',
        options: [
          'Ein "Stapel" von 4 Matrizen, jede $3 \\times 2$',
          'Ein Vektor mit $4 + 3 + 2 = 9$ Einträgen',
          'Eine $12 \\times 2$-Matrix',
          'Ein Skalar mit Wert $4 \\cdot 3 \\cdot 2 = 24$',
        ],
        answer: 'Ein "Stapel" von 4 Matrizen, jede $3 \\times 2$',
        hints: [
          'Shape $(4, 3, 2)$: erste Dimension = Batch, zweite/dritte = Matrix-Dimensionen.',
          '$4$ Matrizen, jede mit $3$ Zeilen und $2$ Spalten.',
          'Gesamtzahl der Elemente: $4 \\cdot 3 \\cdot 2 = 24$.',
        ],
        explanation: 'Shape $(4, 3, 2)$: 4 unabhängige $3 \\times 2$-Matrizen "gestapelt". Stufe-3-Tensor mit $24$ Elementen.',
      },
      {
        id: 'p1.tensor.ex2',
        difficulty: 2,
        conceptTags: ['batch'],
        type: 'mc',
        prompt:
          'PyTorch: `X.shape = (32, 128, 768)`. Was bedeuten diese drei Dimensionen für einen Transformer?',
        options: [
          'Batch-Größe 32, Sequenzlänge 128, Hidden-Dim 768',
          'Epochs 32, Layers 128, Parameter 768',
          'Channels 32, Height 128, Width 768',
          'Heads 32, Keys 128, Values 768',
        ],
        answer: 'Batch-Größe 32, Sequenzlänge 128, Hidden-Dim 768',
        hints: [
          'Standard-Convention in Transformers: $(B, L, d)$.',
          '$B = 32$: 32 parallele Sequenzen.',
          '$L = 128$: 128 Token pro Sequenz; $d = 768$: Embedding-Dimension.',
        ],
        explanation:
          'Transformer-Konvention: $(B, L, d)$ — Batch × Seq-Länge × Hidden-Dim. Alle 32 Sequenzen werden simultan verarbeitet.',
      },
      {
        id: 'p1.tensor.ex3',
        difficulty: 2,
        conceptTags: ['broadcasting'],
        type: 'mc',
        prompt:
          'Broadcasting: was ist die resultierende Shape wenn man $(3, 1, 4)$ und $(1, 5, 4)$ addiert?',
        options: ['$(3, 5, 4)$', '$(3, 1, 4)$', '$(1, 5, 4)$', 'Fehler — nicht kompatibel'],
        answer: '$(3, 5, 4)$',
        hints: [
          'Broadcasting: Dimension 1 wird auf die andere Größe expandiert.',
          '$(3, 1, 4)$: zweite Dim 1 → expandiert auf 5.',
          '$(1, 5, 4)$: erste Dim 1 → expandiert auf 3. Ergebnis: $(3, 5, 4)$.',
        ],
        explanation:
          'Broadcasting-Regeln: Dim 1 expandiert automatisch. $(3,1,4) + (1,5,4) \\to (3,5,4)$. Kein Speicher wird kopiert — nur virtuelle Expansion.',
      },
      {
        id: 'p1.tensor.ex4',
        difficulty: 3,
        conceptTags: ['multi-head-attention'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: $Q \\in \\mathbb{R}^{B \\times H \\times L \\times d_k}$, $K \\in \\mathbb{R}^{B \\times H \\times L \\times d_k}$. Welche Shape hat $Q K^T$ (Transponierung der letzten zwei Dimensionen)?',
        options: ['$(B, H, L, L)$', '$(B, H, d_k, d_k)$', '$(B, L, L)$', '$(H, L, L)$'],
        answer: '$(B, H, L, L)$',
        hints: [
          '$K^T$: transponiere letzte zwei Indizes → $(B, H, d_k, L)$.',
          '$(B, H, L, d_k) \\cdot (B, H, d_k, L) = ?$',
          'Matmul über letzte zwei Dims: $(L, d_k) \\cdot (d_k, L) = (L, L)$. Batch-Dims bleiben: $(B, H, L, L)$.',
        ],
        explanation:
          '$Q K^T \\in (B, H, L, L)$: für jedes Sample in Batch $B$ und jeden der $H$ Köpfe eine $L \\times L$ Attention-Score-Matrix.',
      },
      {
        id: 'p1.tensor.ex5',
        difficulty: 3,
        conceptTags: ['tensor', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Transformer mit $B = 4$, $H = 8$, $L = 512$, $d_k = 64$. Wie viele Elemente hat die Attention-Score-Matrix (alle Köpfe, alle Batches)?',
        answer: 8388608,
        hints: [
          'Shape: $(B, H, L, L) = (4, 8, 512, 512)$.',
          '$4 \\cdot 8 = 32$; $512 \\cdot 512 = 262144$.',
          '$32 \\cdot 262144 = 8388608$.',
        ],
        explanation:
          '$(4, 8, 512, 512)$: $4 \\cdot 8 \\cdot 512 \\cdot 512 = 8{,}4M$ Elemente. Bei FP32 = 32 MB nur für Attention-Scores — ein Grund warum FlashAttention so wichtig ist.',
      },
      {
        id: 'p1.tensor.ex6',
        difficulty: 4,
        conceptTags: ['einsum', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: `torch.einsum("bld,dk->blk", X, W)` mit $X \\in (B, L, d)$, $W \\in (d, k)$. Was berechnet das?',
        options: [
          'Matrix-Multiplikation $X W$: projiziert jedes Token von $d$-dim auf $k$-dim',
          'Äußeres Produkt von $X$ und $W$',
          'Skalarprodukt über alle Indizes',
          'Transponierung von $X$ mit $W$',
        ],
        answer: 'Matrix-Multiplikation $X W$: projiziert jedes Token von $d$-dim auf $k$-dim',
        hints: [
          '"bld,dk->blk": Summiere über Index $d$ (gemeinsamer Index).',
          'Für festes $b, l$: $\\sum_d X[b,l,d] \\cdot W[d,k]$ = $(XW)_{blk}$.',
          'Batch- und Seq-Dim bleiben; $d \\to k$ ist die Projektion.',
        ],
        explanation:
          '"bld,dk->blk": Index $d$ wird summiert. Ergebnis: $\\text{out}[b,l,k] = \\sum_d X[b,l,d] \\cdot W[d,k]$ — das ist $XW$ (Dense-Layer auf jedem Token in jedem Batch gleichzeitig).',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Lineare Algebra → Tensor-Algebra in der Praxis\n\nDie gesamte Lineare Algebra, die wir gelernt haben, generalisiert auf Tensoren:\n\n- **Matmul**: `torch.matmul(A, B)` — funktioniert für beliebige Batch-Dims\n- **Einsum**: `torch.einsum("ij,jk->ik", A, B)` — lesbare Notation für beliebige Kontraktionen\n- **SVD**: `torch.linalg.svd(A)` — für batched Matrizen $(B, m, n)$\n- **Eigendekomposition**: `torch.linalg.eigh(A)` — für symmetrische batched Matrizen\n\nPyTorch ist im Wesentlichen ein automatisch differenzierbarer Tensor-Rechner.',
      },
      {
        kind: 'callout',
        content:
          'Der gesamte Forward-Pass eines GPT-2-Modells (117M Parameter) lässt sich als ~20 Zeilen Python-Tensor-Code schreiben. Lineare Algebra auf Tensoren — Matrix-Multiplikationen, Softmax, Layer-Norm — das ist alles. Die Magie liegt in den Gewichten, nicht in der Architektur.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.tensor.card1',
      front: 'Was ist ein Tensor der Stufe 3?',
      back: 'Verallgemeinerte Matrix: Shape $(B, m, n)$ = Stapel von $B$ Matrizen $m \\times n$.',
      conceptTags: ['tensor'],
    },
    {
      id: 'p1.tensor.card2',
      front: 'Broadcasting-Regel?',
      back: 'Dimensionen der Größe 1 werden auf die andere Größe expandiert (kein Speicher-Kopie).',
      conceptTags: ['broadcasting'],
    },
    {
      id: 'p1.tensor.card3',
      front: 'Transformer-Tensor-Convention?',
      back: '$(B, L, d)$: Batch × Sequenzlänge × Hidden-Dim.',
      conceptTags: ['batch'],
    },
  ],
}
