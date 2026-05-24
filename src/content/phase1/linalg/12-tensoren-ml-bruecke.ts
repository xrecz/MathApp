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

  learningOutcome:
    'Du verstehst Tensoren als Verallgemeinerung von Vektoren und Matrizen, kannst Broadcasting-Regeln anwenden, nutzt `einsum` für beliebige Tensor-Kontraktionen, und erkennst wie Multi-Head Attention als Tensor-Operation implementiert ist.',

  description:
    'Tensoren sind das native Datenformat moderner ML-Frameworks. Alle linearen-algebraischen Konzepte aus Phase 1 — Matrix-Multiplikation, SVD, Eigenwerte — verallgemeinern direkt auf Tensoren mit Batch-Dimensionen. Wer Tensoren beherrscht, kann PyTorch-Code lesen und schreiben wie eine Gleichung.',

  conceptSteps: [
    {
      title: 'Tensoren: Verallgemeinerung von Skalaren, Vektoren, Matrizen',
      body: 'Mathematisch ist ein Tensor eine multilineare Abbildung oder äquivalent ein mehrdimensionales Array. In ML meinen wir meist N-dimensionale Arrays:\n- Stufe 0 (Skalar): eine Zahl, Shape `()`\n- Stufe 1 (Vektor): Shape `(n,)` — $n$ Einträge\n- Stufe 2 (Matrix): Shape `(m, n)` — Gitter aus Zahlen\n- Stufe 3: Shape `(B, m, n)` — Stapel von $B$ Matrizen\n- Stufe 4: Shape `(B, C, H, W)` — Batch von $B$ Bildern mit $C$ Kanälen\n\nAlle linearen Operationen (Matmul, SVD, Norm) lassen sich mit Batch-Dimensionen verallgemeinern.',
      preprompt: 'Wie unterscheidet sich ein 3D-Array von einer Matrix?',
      miniExample:
        'Bild-Tensor: `X.shape = (32, 3, 224, 224)` — 32 Bilder, 3 Farbkanäle (RGB), 224×224 Pixel. Element `X[5, 0, 100, 150]` = Rot-Kanal des 6. Bildes, Pixel (100, 150).',
      selfCheck: 'Wie viele Elemente hat ein Tensor der Shape $(4, 3, 2, 5)$?',
    },
    {
      title: 'Formen, Reshape und Permute: Tensoren umstrukturieren',
      body: '`reshape` ändert die Form, behält aber die Anzahl der Elemente (Gesamtzahl muss gleich bleiben). `permute`/`transpose` ändert die Reihenfolge der Achsen ohne Daten zu kopieren (erzeugt einen View). Vorsicht: `contiguous()` nötig, wenn man nach `permute` weitere Operationen macht. In Transformers: `(B, L, H, d_k)` → `permute(0,2,1,3)` → `(B, H, L, d_k)` — Köpfe als Batch-Dim.',
      preprompt: 'Was ist der Unterschied zwischen `reshape` und `view` in PyTorch?',
      miniExample:
        '```python\nx = torch.randn(4, 6)\ny = x.reshape(2, 12)   # 24 Elemente → 24 Elemente\nz = x.reshape(24)      # Flach (Vektor)\nw = x.reshape(2, 3, 4) # 3D-Tensor\n```\nAlle teilen denselben Speicher, solange x contiguous ist.',
      selfCheck: 'Warum ist `permute` schneller als manuelles Kopieren eines transponierten Tensors?',
    },
    {
      title: 'Broadcasting: automatisches Strecken von Dimensionen',
      body: 'Broadcasting erlaubt Operationen zwischen Tensoren unterschiedlicher Form, indem Dimensionen der Größe 1 virtuell auf die nötige Größe expandiert werden. Regeln (von rechts nach links): (1) Formen werden rechtsbündig ausgerichtet; (2) fehlende führende Dimensionen werden als 1 angenommen; (3) Dimensionen der Größe 1 werden expandiert. Broadcasting erzeugt **keinen** neuen Speicher — nur geänderte Stride-Metadaten.',
      visual: `<svg viewBox="0 0 440 180" xmlns="http://www.w3.org/2000/svg" style="background:rgb(17 24 39);border:1px solid rgb(55 65 81);border-radius:8px;padding:8px">
  <text x="10" y="25" fill="#9ca3af" font-size="12" font-family="monospace">Broadcasting: (3, 1, 4) + (1, 5, 4) → (3, 5, 4)</text>
  <rect x="10" y="40" width="80" height="30" rx="4" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="20" y="60" fill="#60a5fa" font-size="12" font-family="monospace">(3, 1, 4)</text>
  <text x="95" y="57" fill="#6b7280" font-size="16">+</text>
  <rect x="110" y="40" width="80" height="30" rx="4" fill="none" stroke="#34d399" stroke-width="1.5"/>
  <text x="120" y="60" fill="#34d399" font-size="12" font-family="monospace">(1, 5, 4)</text>
  <text x="195" y="57" fill="#6b7280" font-size="16">→</text>
  <rect x="215" y="40" width="80" height="30" rx="4" fill="none" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="225" y="60" fill="#a78bfa" font-size="12" font-family="monospace">(3, 5, 4)</text>
  <text x="10" y="100" fill="#9ca3af" font-size="11">Dim 1 von (3,1,4) expandiert auf 5 →</text>
  <text x="10" y="116" fill="#60a5fa" font-size="11" font-family="monospace">(3, 1, 4) → virtuell (3, 5, 4)</text>
  <text x="10" y="136" fill="#9ca3af" font-size="11">Dim 0 von (1,5,4) expandiert auf 3 →</text>
  <text x="10" y="152" fill="#34d399" font-size="11" font-family="monospace">(1, 5, 4) → virtuell (3, 5, 4)</text>
  <text x="10" y="172" fill="#f59e0b" font-size="10">Kein Speicher kopiert — nur Stride = 0 für expandierte Dims</text>
</svg>`,
      preprompt: 'Was passiert wenn man einen Vektor zu einer Matrix addiert?',
      miniExample:
        'Bias in neuronalen Netzen: `b.shape = (d,)`, `X.shape = (B, L, d)`. `X + b` broadcastet $b$ auf $(B, L, d)$ — dasselbe $b$ wird zu jedem Token jedes Samples addiert. Ohne Broadcasting: `b.unsqueeze(0).unsqueeze(0).expand(B, L, d)` — selbe Operation, mehr Code.',
      selfCheck: 'Sind $(3, 4)$ und $(4,)$ broadcast-kompatibel? Was ist das Ergebnis?',
    },
    {
      title: 'Einsum: Einstein-Summationskonvention',
      body: 'Einsum (Einstein Summation) ist eine kompakte Notation für beliebige Tensor-Kontraktionen. Prinzip: Indizes, die in der Ausgabe fehlen, werden summiert. Indizes, die in der Ausgabe erscheinen, werden beibehalten. Einsum ist oft effizienter als explizite Schleifen und klarer als eine Kette von `matmul`, `transpose` und `sum`.',
      preprompt: 'Wie schreibt man eine Matrix-Multiplikation als Summe?',
      miniExample:
        '```\n"ij,jk->ik"   Matrix-Multiplikation AB\n"bij,bjk->bik" Batched Matmul\n"bld,dk->blk"  Dense Layer: (B,L,d)×(d,k)\n"bhld,bhlk->bhlk" Element-Multiplikation\n"bhl,blk->bhk"  Attention: Score × Values\n```',
      selfCheck: 'Was summiert `einsum("ij->i", A)`? Was ist das Ergebnis?',
    },
    {
      title: 'Batch-Operationen: lineare Algebra auf Tensoren',
      body: 'Alle PyTorch-Linalg-Operationen unterstützen Batch-Dimensionen: `torch.linalg.svd(A)` für `A.shape = (B, m, n)` berechnet $B$ SVDs parallel; `torch.linalg.solve(A, b)` für `A.shape = (B, n, n)` löst $B$ LGS gleichzeitig. Das ist der Schlüssel zur GPU-Effizienz: statt $B$ sequentieller Operationen eine parallelisierbare Batch-Operation. BLAS-Routinen (cuBLAS) sind optimiert für genau diese Muster.',
      preprompt: 'Warum ist es auf einer GPU besser, viele kleine Operationen zu bündeln?',
      miniExample:
        '```python\n# 32 unabhängige 3x3 Matrizen invertieren\nA = torch.randn(32, 3, 3)\nA_inv = torch.linalg.inv(A)  # A_inv.shape = (32, 3, 3)\n# Eine BLAS-Routine, 32× schneller als Schleife\n```',
      selfCheck: 'Was ist der Unterschied zwischen `torch.mm` (Matrix-Matrix) und `torch.bmm` (Batched)?',
    },
    {
      title: 'Tensor-Anatomie eines Transformers: alles auf einmal',
      body: 'Ein kompletter Transformer-Forward-Pass ist eine Sequenz von Tensor-Operationen:\n1. Token-Embeddings: `X ∈ (B, L, d)` — Lookup-Table\n2. Q, K, V: `Q = X @ W_Q` — je `(B, L, d_k)` pro Kopf\n3. Multi-Head: Reshape zu `(B, H, L, d_k)`\n4. Attention: `S = Q @ K.T / sqrt(d_k)` → `(B, H, L, L)`; Softmax → Weighted Sum\n5. FFN: zwei Dense-Layers mit Aktivierung\nAlles: Matmul + Elementweise-Ops + Normalisierung — keine Magie.',
      preprompt: 'Warum teilt man Hidden-Dim durch Anzahl der Köpfe in Multi-Head Attention?',
      miniExample:
        'GPT-2 (small): $B = 1$, $L = 1024$, $d = 768$, $H = 12$, $d_k = 64$. Attention-Scores: $(1, 12, 1024, 1024) \\approx 12M$ Floats pro Layer = 48 MB. Bei 12 Layers: 576 MB — allein für Attention-Scores. Deshalb Gradienten-Checkpointing und FlashAttention.',
      selfCheck: 'Warum ist die Transformer-Aufmerksamkeit $O(L^2)$ in der Sequenzlänge?',
    },
  ],

  codeBridges: [
    {
      title: 'Tensor-Grundoperationen, Broadcasting, Einsum in PyTorch',
      lang: 'python',
      code: `import torch

# === Formen und Reshape ===
x = torch.arange(24, dtype=torch.float32)
print(x.shape)  # (24,) — Vektor

A = x.reshape(4, 6)    # Matrix 4×6
B = x.reshape(2, 3, 4) # 3D-Tensor, 2 Matrizen 3×4
C = x.reshape(2, -1)   # -1: automatisch berechnen → (2, 12)
print(B.shape)  # torch.Size([2, 3, 4])

# === Permute (Achsen tauschen) ===
# Transformer: Köpfe als Batch-Dim
X = torch.randn(2, 8, 512, 64)  # (B, H, L, d_k)
X_t = X.permute(0, 2, 1, 3)    # (B, L, H, d_k)
print(X_t.shape)  # torch.Size([2, 512, 8, 64])

# === Broadcasting ===
mat = torch.randn(4, 5)   # (4, 5)
bias = torch.randn(5)     # (5,) → wird zu (4, 5)
result = mat + bias       # Broadcasting: kein Speicher kopiert
print(result.shape)       # (4, 5)

# Batch + Broadcasting:
X = torch.randn(32, 128, 768)  # (B, L, d) — Transformer-Embeddings
mean = X.mean(dim=-1, keepdim=True)  # (32, 128, 1) — Token-Mittelwerte
X_centered = X - mean  # Broadcasting: (32,128,1) → (32,128,768)

# === Einsum ===
A = torch.randn(4, 5)
B = torch.randn(5, 6)

# Matrix-Multiplikation (drei äquivalente Wege)
C1 = torch.mm(A, B)                    # (4, 6)
C2 = A @ B                             # (4, 6)
C3 = torch.einsum("ij,jk->ik", A, B)  # (4, 6) — explizit
print(torch.allclose(C1, C3))  # True

# Dense Layer auf Batch von Sequenzen:
X = torch.randn(32, 128, 768)  # (B, L, d)
W = torch.randn(768, 256)      # (d, k)
Y = torch.einsum("bld,dk->blk", X, W)  # (32, 128, 256)
print(Y.shape)  # = (X @ W).shape

# Attention-Scores via Einsum:
Q = torch.randn(2, 12, 64, 64)  # (B, H, L, d_k)
K = torch.randn(2, 12, 64, 64)  # (B, H, L, d_k)
# QK^T: Matmul über letzte zwei Dims
scores = torch.einsum("bhld,bhkd->bhlk", Q, K)  # (B, H, L, L)
print(scores.shape)  # torch.Size([2, 12, 64, 64])`,
      annotation:
        '`permute` ist ein "View" — kein Speicher wird kopiert, nur die Metadaten (Strides) ändern sich. `einsum` ist oft lesbarer als eine Kette von `transpose` + `matmul` — und PyTorch optimiert `einsum` intern mit `opt_einsum`.',
    },
    {
      title: 'Multi-Head Attention von Grund auf als Tensor-Operation',
      lang: 'python',
      code: `import torch
import torch.nn.functional as F
import math

def multi_head_attention(X, W_Q, W_K, W_V, W_O, n_heads):
    """
    X: (B, L, d)   — Eingabe-Sequenz
    W_Q, W_K, W_V: (d, d)  — Projektionsmatrizen (alle Köpfe zusammen)
    W_O: (d, d)    — Output-Projektion
    n_heads: int   — Anzahl der Aufmerksamkeitsköpfe
    """
    B, L, d = X.shape
    d_k = d // n_heads  # Dimension pro Kopf

    # === Schritt 1: Projektionen (Dense Layer auf jedes Token) ===
    Q = X @ W_Q  # (B, L, d) @ (d, d) = (B, L, d)
    K = X @ W_K  # (B, L, d)
    V = X @ W_V  # (B, L, d)

    # === Schritt 2: Aufteilen in Köpfe ===
    # (B, L, d) → (B, L, H, d_k) → (B, H, L, d_k)
    Q = Q.reshape(B, L, n_heads, d_k).permute(0, 2, 1, 3)
    K = K.reshape(B, L, n_heads, d_k).permute(0, 2, 1, 3)
    V = V.reshape(B, L, n_heads, d_k).permute(0, 2, 1, 3)
    # Jetzt: Q, K, V jeweils (B, H, L, d_k)

    # === Schritt 3: Scaled Dot-Product Attention ===
    # K^T: letzte zwei Dims transponieren → (B, H, d_k, L)
    scores = Q @ K.transpose(-2, -1) / math.sqrt(d_k)  # (B, H, L, L)
    weights = F.softmax(scores, dim=-1)   # Attention-Gewichte, zeilenweise
    context = weights @ V                  # (B, H, L, L) @ (B, H, L, d_k) = (B, H, L, d_k)

    # === Schritt 4: Köpfe zusammenführen ===
    # (B, H, L, d_k) → (B, L, H, d_k) → (B, L, d)
    context = context.permute(0, 2, 1, 3).contiguous()
    context = context.reshape(B, L, d)    # Köpfe konkateniert

    # === Schritt 5: Output-Projektion ===
    return context @ W_O  # (B, L, d)

# Test
B, L, d, H = 2, 16, 64, 8
X = torch.randn(B, L, d)
W_Q = torch.randn(d, d) / math.sqrt(d)
W_K, W_V, W_O = [torch.randn(d, d) / math.sqrt(d) for _ in range(3)]

out = multi_head_attention(X, W_Q, W_K, W_V, W_O, H)
print(f"Input:  {X.shape}")   # (2, 16, 64)
print(f"Output: {out.shape}") # (2, 16, 64)`,
      annotation:
        'Multi-Head Attention ist vollständig aus `@` (Matmul), `reshape`, `permute` und `softmax` aufgebaut — keine Schleifen, keine Magie. Der Trick: Köpfe als Batch-Dimension behandeln, damit alle $H$ Köpfe parallel berechnet werden.',
    },
  ],

  derivations: [
    {
      claim: 'Warum `contiguous()` nach `permute` nötig sein kann',
      reasoning:
        'Ein Tensor speichert Daten als flaches Array im Speicher + Metadaten (Shape, Strides). `permute` ändert nur die Strides (Schrittweiten zum Zugriff), nicht den Speicher — der Tensor ist dann "non-contiguous". `reshape` benötigt contiguous Daten (zusammenhängend im Speicher), weil es neue Strides berechnen muss. Lösung: `x.permute(0, 2, 1, 3).contiguous().reshape(B, L, d)` — `contiguous()` kopiert Daten in neues Layout. Alternative `reshape` ohne `contiguous()` funktioniert oft auch (PyTorch kopiert intern wenn nötig), aber weniger explizit.',
    },
  ],

  commonMistakes: [
    {
      wrong: '`x.reshape(a, b, -1)` funktioniert immer, wenn die Zieldimension bekannt ist',
      correct: 'Reshape schlägt fehl wenn das Produkt der neuen Dims nicht der Gesamtzahl der Elemente entspricht',
      explanation:
        'Immer prüfen: Produkt aller Dimensionen muss vor und nach `reshape` gleich sein. `x.numel()` gibt die Gesamtzahl zurück. `-1` wird automatisch berechnet — aber nur wenn die anderen Dims passen.',
    },
    {
      wrong: 'Tensoren $(3, 4)$ und $(4, 3)$ sind Broadcasting-kompatibel',
      correct: 'Broadcasting erfordert rechtsbündige Kompatibilität: letzte Dims müssen übereinstimmen oder 1 sein',
      explanation:
        'Rechtsbündig ausrichten: $(3, 4)$ vs $(4, 3)$: letzte Dim $4 \\neq 3$ → Fehler. Verwende `unsqueeze` oder `transpose` um Broadcast-kompatibel zu machen.',
    },
    {
      wrong: '`einsum("ij,ij->ij", A, B)` berechnet die Matrix-Multiplikation von $A$ und $B$',
      correct: '`"ij,ij->ij"` ist elementweise Multiplikation; Matmul braucht geteilten Index: `"ij,jk->ik"`',
      explanation:
        'Geteilte Indizes (die in beiden Inputs vorkommen, aber nicht im Output) werden summiert. Immer Inputs und gewünschten Output skizzieren bevor man einsum schreibt.',
    },
  ],

  furtherResources: [
    {
      title: 'PyTorch Tensor-Dokumentation (official) — pytorch.org/docs/stable/tensors.html',
      type: 'article',
      note: 'Vollständige API mit Erklärungen zu Strides, Broadcasting und Speicherlayout.',
    },
    {
      title: 'Karpathy: "Let\'s reproduce GPT-2" (YouTube)',
      type: 'video',
      note: 'Baut GPT-2 von Grund auf in PyTorch — zeigt alle Tensor-Operationen direkt im Kontext.',
    },
    {
      title: 'Tim Rocktäschel: "Einsum is all you need" — rockt.github.io/2018/04/30/einsum',
      type: 'article',
      note: 'Kompakte Erklärung aller gängigen Einsum-Pattern mit Visualisierungen.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.matrix-multiplikation', relation: 'requires', hint: 'Matmul auf Tensoren ist Batched Matrix-Multiplikation.' },
    { lessonId: 'p1.svd', relation: 'extends', hint: 'SVD funktioniert für batched Matrizen genauso wie für einzelne.' },
    { lessonId: 'p1.vektorraeume-basis-rang', relation: 'see-also', hint: 'Jeder Tensor-Slice liegt in einem Vektorraum — Rang bleibt relevant.' },
    { lessonId: 'p1.multivariate-kettenregel-backprop', relation: 'see-also', hint: 'Backpropagation durch Tensor-Operationen folgt denselben Kettenregel-Prinzipien.' },
  ],

  reflection: 'Multi-Head Attention ist vollständig aus Matmul, Reshape und Softmax aufgebaut. Welche algebraische Eigenschaft macht es sinnvoll, verschiedene "Köpfe" zu verwenden statt einer großen Attention? Und warum skaliert man die Scores mit $1/\\sqrt{d_k}$?',
}
