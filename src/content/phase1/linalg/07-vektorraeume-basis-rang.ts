import type { Lesson } from '../../../types'

export const vektorraeumeBasisRang: Lesson = {
  id: 'p1.vektorraeume-basis-rang',
  title: 'Vektorräume, Basis, Dimension, Rang',
  conceptTags: ['subspace', 'basis', 'dimension', 'rank', 'null-space', 'column-space'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Struktur von Vektorräumen\n\nEin **Unterraum** von $\\mathbb{R}^n$ ist eine Teilmenge, die unter Addition und Skalarmultiplikation abgeschlossen ist (enthält $\\vec{0}$, Summen und Skalare).\n\nZwei wichtige Unterräume einer Matrix $A$:\n\n- **Spaltenraum** $\\text{col}(A)$: Span der Spalten von $A$ — alle erreichbaren Outputs $Ax$\n- **Nullraum** $\\text{null}(A)$: alle Lösungen von $Ax = 0$',
      },
      {
        kind: 'math',
        content:
          '$$\\text{rang}(A) + \\dim(\\text{null}(A)) = n \\quad \\text{(Dimensionssatz)}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Der Rang einer Gewichts-Matrix beschreibt die effektive Kapazität eines Layers. **LoRA** (Low-Rank Adaptation) fine-tuned LLMs, indem man Gewichtsänderungen $\\Delta W = AB$ mit niedrigem Rang $r \\ll d$ darstellt — spart 99%+ Parameter.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Basis und Dimension\n\nEine **Basis** eines Vektorraums $V$ ist eine linear unabhängige Menge, die $V$ aufspannt. Alle Basen haben gleich viele Elemente — das ist die **Dimension** $\\dim V$.\n\n### Rang\n\n$\\text{rang}(A)$ = Anzahl der Pivots in der Zeilenstufenform von $A$ = $\\dim(\\text{col}(A))$.\n\n**Dimensionssatz**: $\\text{rang}(A) + \\dim(\\text{null}(A)) = n$ (Spaltenanzahl von $A$).',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $A = \\begin{pmatrix}1 & 2 & 3\\\\ 2 & 4 & 6\\end{pmatrix}$\n\nGauß: $Z_2 - 2Z_1 \\to \\begin{pmatrix}1 & 2 & 3\\\\ 0 & 0 & 0\\end{pmatrix}$\n\n$\\text{rang}(A) = 1$, $\\dim(\\text{null}(A)) = 3 - 1 = 2$.\n\nNullraum: $x_1 = -2x_2 - 3x_3$ — zwei freie Variablen, 2D-Unterraum.',
      },
    ],
    practice: [
      {
        id: 'p1.basis.ex1',
        difficulty: 1,
        conceptTags: ['dimension'],
        type: 'numeric',
        prompt: 'Wie viele Basisvektoren hat $\\mathbb{R}^5$?',
        answer: 5,
        hints: [
          '$\\dim(\\mathbb{R}^n) = n$.',
          'Standardbasis: $e_1, \\dots, e_n$.',
          '$\\dim(\\mathbb{R}^5) = 5$.',
        ],
        explanation: 'Die Standardbasis $\\{e_1, e_2, e_3, e_4, e_5\\}$ hat 5 Elemente → $\\dim(\\mathbb{R}^5) = 5$.',
      },
      {
        id: 'p1.basis.ex2',
        difficulty: 2,
        conceptTags: ['rank'],
        type: 'numeric',
        prompt:
          'Rang der Matrix $\\begin{pmatrix}1 & 0 & 2\\\\ 0 & 1 & 3\\\\ 0 & 0 & 0\\end{pmatrix}$?',
        answer: 2,
        hints: [
          'Rang = Anzahl der Pivotzeilen (Zeilen $\\neq \\vec{0}$ in Zeilenstufenform).',
          'Die dritte Zeile ist die Nullzeile.',
          '2 Pivotszeilen → Rang 2.',
        ],
        explanation: 'Die Matrix ist bereits in Zeilenstufenform. 2 Nicht-Nullzeilen → $\\text{rang} = 2$.',
      },
      {
        id: 'p1.basis.ex3',
        difficulty: 2,
        conceptTags: ['null-space', 'rank'],
        type: 'numeric',
        prompt:
          'Für $A \\in \\mathbb{R}^{4 \\times 6}$ mit $\\text{rang}(A) = 4$: was ist $\\dim(\\text{null}(A))$?',
        answer: 2,
        hints: [
          'Dimensionssatz: $\\text{rang}(A) + \\dim(\\text{null}(A)) = n$.',
          '$n = 6$ (Spaltenanzahl).',
          '$4 + \\dim(\\text{null}) = 6 \\Rightarrow \\dim(\\text{null}) = 2$.',
        ],
        explanation: 'Dimensionssatz: $4 + \\dim(\\text{null}(A)) = 6 \\Rightarrow \\dim(\\text{null}(A)) = 2$.',
      },
      {
        id: 'p1.basis.ex4',
        difficulty: 3,
        conceptTags: ['subspace'],
        type: 'mc',
        prompt: '"Die Menge $\\{(x, y) : x + y = 1\\}$ ist ein Unterraum von $\\mathbb{R}^2$." — Wahr oder falsch?',
        options: ['Falsch — enthält nicht $\\vec{0}$', 'Wahr — zwei Freiheitsgrade', 'Wahr — Gerade durch den Ursprung'],
        answer: 'Falsch — enthält nicht $\\vec{0}$',
        hints: [
          'Unterraum muss $\\vec{0}$ enthalten.',
          '$0 + 0 = 0 \\neq 1$.',
          '$(0,0)$ liegt nicht auf der Geraden $x + y = 1$.',
        ],
        explanation:
          'Ein Unterraum muss den Nullvektor enthalten. Aber $0 + 0 = 0 \\neq 1$, also ist $(0,0) \\notin$ dieser Menge — kein Unterraum.',
      },
      {
        id: 'p1.basis.ex5',
        difficulty: 3,
        conceptTags: ['rank', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Eine Gewichts-Matrix $W \\in \\mathbb{R}^{512 \\times 512}$ hat $\\text{rang}(W) = 8$. Was bedeutet das für die Abbildung $y = Wx$?',
        options: [
          'Der Output lebt in einem 8-dimensionalen Unterraum — 504 Dimensionen werden auf 0 kollabiert',
          'Die Matrix ist invertierbar',
          'Der Output hat 8 von 512 Einträgen $\\neq 0$',
          'Die Matrix hat 8 Eigenwerte',
        ],
        answer: 'Der Output lebt in einem 8-dimensionalen Unterraum — 504 Dimensionen werden auf 0 kollabiert',
        hints: [
          '$\\text{col}(W) = $ Spaltenraum von $W$.',
          '$\\dim(\\text{col}(W)) = \\text{rang}(W) = 8$.',
          'Alle Outputs $Wx$ liegen im 8D-Spaltenraum.',
        ],
        explanation:
          '$\\text{rang}(W) = 8$: der Spaltenraum hat Dimension 8. Alle Outputs $y = Wx$ liegen in diesem 8D-Unterraum — das ist eine extreme Informationskompression.',
        misconceptions: {
          'Die Matrix ist invertierbar': '$\\text{rang} = 8 \\neq 512$ → nicht voll rangig → nicht invertierbar.',
        },
      },
      {
        id: 'p1.basis.ex6',
        difficulty: 4,
        conceptTags: ['rank', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: LoRA stellt $\\Delta W = AB$ dar mit $A \\in \\mathbb{R}^{d \\times r}$, $B \\in \\mathbb{R}^{r \\times d}$, $r = 8$, $d = 4096$. Welchen Rang hat $\\Delta W$ maximal?',
        options: ['$r = 8$', '$d = 4096$', '$d^2 = 16777216$', '$2r = 16$'],
        answer: '$r = 8$',
        hints: [
          '$\\text{rang}(AB) \\leq \\min(\\text{rang}(A), \\text{rang}(B))$.',
          '$A$ hat maximal Rang $\\min(d, r) = r = 8$.',
          'Also $\\text{rang}(\\Delta W) \\leq 8$.',
        ],
        explanation:
          '$\\text{rang}(AB) \\leq \\min(\\text{rang}(A), \\text{rang}(B)) \\leq r = 8$. LoRA parametrisiert genau diese Niederrang-Änderungen — statt $d^2 = 16.7M$ Parameter nur $2dr = 65536$ Parameter.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Niederrang-Approximationen in ML\n\nDas Konzept des Rangs ist in modernen LLMs allgegenwärtig:\n\n- **LoRA** (Low-Rank Adaptation): $\\Delta W = AB$, $r \\ll d$. GPT-3-fine-tuning mit 0.01% der Parameter.\n- **Attention**: Bei Full Attention ist $W_Q W_K^T \\in \\mathbb{R}^{d \\times d}$. Multi-Head teilt in $h$ Köpfe — implizite Niedrigrang-Struktur.\n- **Matrix Factorization**: Recommender-Systeme (Netflix-Prize) sind genau Niedrigrang-Faktorisierungen.',
      },
      {
        kind: 'callout',
        content:
          'Der Dimensionssatz $\\text{rang}(A) + \\dim(\\text{null}(A)) = n$ ist einer der elegantesten Sätze der Linearen Algebra. Er sagt: Information, die in den Nullraum fließt, geht verloren. Niederrangige Matrizen haben große Nullräume — das ist sowohl Schwäche (Informationsverlust) als auch Stärke (Regularisierung, Effizienz).',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.basis.card1',
      front: 'Dimensionssatz?',
      back: '$\\text{rang}(A) + \\dim(\\text{null}(A)) = n$ (Spaltenanzahl).',
      conceptTags: ['rank', 'null-space'],
    },
    {
      id: 'p1.basis.card2',
      front: 'Spaltenraum $\\text{col}(A)$?',
      back: 'Span der Spalten von $A$ = alle erreichbaren Outputs $Ax$. Dimension = $\\text{rang}(A)$.',
      conceptTags: ['column-space'],
    },
    {
      id: 'p1.basis.card3',
      front: 'Wann ist ein Unterraum gültig?',
      back: 'Enthält $\\vec{0}$, abgeschlossen unter Addition und Skalarmultiplikation.',
      conceptTags: ['subspace'],
    },
  ],

  learningOutcome:
    'Du kannst lineare Unterräume identifizieren, Rang und Dimension berechnen, den Dimensionssatz anwenden und erklären, warum latente Räume in Autoencodern und LoRA-Adaptionen direkte Anwendungen des Rang-Konzepts sind.',

  description:
    'Vektorräume, Basen und Rang bilden die strukturelle Grundlage der Linearen Algebra. Der Rang einer Matrix verrät, wie viel Information sie wirklich trägt. Niederrang-Strukturen sind überall in ML: Autoencoder komprimieren in niederrangige latente Räume, LoRA approximiert Gewichtsänderungen durch Rang-$r$-Matrizen.',

  conceptSteps: [
    {
      title: 'Linearer Unterraum: abgeschlossen unter den Vektorraum-Operationen',
      preprompt: 'Welche geometrischen Mengen in $\\mathbb{R}^2$ sind unter Addition und Skalierung abgeschlossen?',
      body: 'Eine Teilmenge $U \\subseteq \\mathbb{R}^n$ ist ein **linearer Unterraum**, wenn:\n1. $\\vec{0} \\in U$\n2. $\\mathbf{u}, \\mathbf{v} \\in U \\Rightarrow \\mathbf{u} + \\mathbf{v} \\in U$ (abgeschlossen unter Addition)\n3. $\\mathbf{u} \\in U, c \\in \\mathbb{R} \\Rightarrow c\\mathbf{u} \\in U$ (abgeschlossen unter Skalierung)\n\n**Beispiele**: Gerade durch den Ursprung, Ebene durch den Ursprung, $\\{\\vec{0}\\}$, ganz $\\mathbb{R}^n$.\n\n**Kein Unterraum**: Gerade, die nicht durch den Ursprung geht (enthält $\\vec{0}$ nicht).',
    },
    {
      title: 'Lineare Unabhängigkeit und Basis',
      body: 'Eine **Basis** von $U$ ist eine Menge linear unabhängiger Vektoren, die $U$ aufspannt.\n\n**Alle Basen** eines Unterraums haben gleich viele Elemente — das ist die **Dimension** $\\dim U$.\n\n**Standardbasis** von $\\mathbb{R}^n$: $\\{e_1, \\dots, e_n\\}$ — $n$ Vektoren, also $\\dim \\mathbb{R}^n = n$.\n\nJeder Vektor in $U$ lässt sich **eindeutig** als Linearkombination der Basisvektoren schreiben.',
      selfCheck: 'Warum haben alle Basen gleich viele Vektoren? Könnte eine Basis von $\\mathbb{R}^2$ aus 3 Vektoren bestehen?',
    },
    {
      title: 'Spaltenraum und Nullraum einer Matrix',
      body: 'Für $A \\in \\mathbb{R}^{m \\times n}$ definieren wir zwei wichtige Unterräume:\n\n**Spaltenraum** $\\text{col}(A) \\subseteq \\mathbb{R}^m$: Span aller Spalten von $A$.\n\n$$\\text{col}(A) = \\{A\\mathbf{x} : \\mathbf{x} \\in \\mathbb{R}^n\\} = \\text{alle erreichbaren Outputs}$$\n\n**Nullraum** $\\text{null}(A) \\subseteq \\mathbb{R}^n$: alle $\\mathbf{x}$ mit $A\\mathbf{x} = \\vec{0}$.\n\n$$\\text{null}(A) = \\{\\mathbf{x} : A\\mathbf{x} = \\vec{0}\\}$$',
    },
    {
      title: 'Rang: die effektive Dimension',
      body: 'Der **Rang** von $A$ ist die Dimension des Spaltenraums:\n\n$$\\text{rang}(A) = \\dim(\\text{col}(A)) = \\text{Anzahl der Pivots in ZSF}$$\n\nEr misst, wie viele "wirklich unabhängige" Richtungen die Abbildung $A$ erzeugt.\n\n**Maximalrang**: $\\text{rang}(A) \\leq \\min(m, n)$. "Voll rangig" ($= \\min(m,n)$) ↔ so viel Information wie möglich.',
    },
    {
      title: 'Dimensionssatz: Rang + Nullraum',
      body: '**Dimensionssatz** (Rank-Nullity Theorem):\n\n$$\\text{rang}(A) + \\dim(\\text{null}(A)) = n \\quad \\text{(Spaltenanzahl)}$$\n\nIntuition: Der Input $\\mathbb{R}^n$ teilt sich in zwei orthogonale Teile:\n- **Spalten richtung**: $\\text{rang}(A)$-dimensionaler Teil, der informationshaltend abgebildet wird\n- **Nullraum**: $\\dim(\\text{null})$-dimensionaler Teil, der auf $\\vec{0}$ kollabiert',
      miniExample: '$A \\in \\mathbb{R}^{3 \\times 5}$ mit $\\text{rang}(A) = 3$: $\\dim(\\text{null}) = 5-3 = 2$. Zwei Freiheitsgrade im Nullraum.',
    },
    {
      title: 'ML: Latente Räume und LoRA',
      body: '**Autoencoder**: Encoder $E: \\mathbb{R}^n \\to \\mathbb{R}^k$ mit $k \\ll n$ komprimiert auf einen $k$-dimensionalen latenten Raum. Der latente Raum ist ein Unterraum in $\\mathbb{R}^k$.\n\n**LoRA** (Low-Rank Adaptation): Fine-tuning eines LLMs mit Gewichtsänderungen niedriger Ranges:\n\n$$\\Delta W = AB, \\quad A \\in \\mathbb{R}^{d \\times r}, \\quad B \\in \\mathbb{R}^{r \\times d}, \\quad r \\ll d$$\n\n$\\text{rang}(\\Delta W) \\leq r$ — statt $d^2$ Parameter nur $2dr$ Parameter.\n\nFür $d = 4096$, $r = 8$: $16.7M$ → $65k$ Parameter ($0{,}4\\%$).',
      miniExample: 'LoRA mit $r=8$: $\\text{rang}(\\Delta W) \\leq 8$ — die Gewichtsänderung lebt in einem 8-dimensionalen Unterraum.',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Rang berechnen und LoRA-Prinzip',
      lang: 'python',
      code: `import torch
import torch.linalg as LA

# --- 1. Rang einer Matrix ---
A = torch.tensor([[1.0, 2.0, 3.0],
                  [2.0, 4.0, 6.0],   # = 2 * Zeile 1 (abhängig)
                  [0.0, 1.0, 0.0]])
rank_A = LA.matrix_rank(A)
print(f"Rang: {rank_A}")  # 2 (nicht 3)

# --- 2. Nullraum via SVD ---
# SVD: A = U Σ V^T; Nullraum = Spalten von V zu σ=0
U, S, Vh = LA.svd(A)
# Spalten von V^T (= Vh) mit Singulärwert ≈ 0 → Nullraum
tolerance = 1e-6
null_mask = S < tolerance
# In diesem Beispiel: 1 Singulärwert ≈ 0 → 1D Nullraum

# --- 3. LoRA-Prinzip: Niederrang-Gewichtsänderung ---
d = 256    # Modell-Dimension
r = 4      # LoRA-Rang (viel kleiner als d)

# Originale Gewichtsmatrix (eingefroren)
W = torch.randn(d, d)

# LoRA-Adapter: Delta_W = A @ B (Rang-r-Matrix)
A_lora = torch.randn(d, r) * 0.01   # Initialisierung nahe 0
B_lora = torch.zeros(r, d)           # B starts at 0 → Delta_W=0 am Anfang

# Forward-Pass mit LoRA
x = torch.randn(d)
delta_W = A_lora @ B_lora             # (d×d) mit rang ≤ r=4
y = (W + delta_W) @ x                # nur A_lora, B_lora werden trainiert

# Parameter-Vergleich
full_params = d * d                   # = 65536
lora_params = 2 * d * r               # = 2048 (3.1% davon)
print(f"Full: {full_params}, LoRA: {lora_params} ({100*lora_params/full_params:.1f}%)")`,
      annotation: '`LA.matrix_rank(A)` zählt die linear unabhängigen Spalten (= Anzahl Singulärwerte > Toleranz). Der Rang entspricht direkt $\\dim(\\text{col}(A))$. Im LoRA-Code: `A_lora @ B_lora` erzeugt eine $(d \\times d)$-Matrix mit $\\text{rang} \\leq r$ — der Dimensionssatz erklärt warum: $A_{\\text{lora}} \\in \\mathbb{R}^{d \\times r}$ hat maximal Rang $r$, also hat auch $A_{\\text{lora}} B_{\\text{lora}}$ maximal Rang $r$.',
    },
  ],

  derivations: [
    {
      claim: 'Dimensionssatz: $\\text{rang}(A) + \\dim(\\text{null}(A)) = n$',
      reasoning:
        'Sei $r = \\text{rang}(A)$ und $k = \\dim(\\text{null}(A))$. Wähle eine Basis $\\{v_1, \\dots, v_k\\}$ des Nullraums und ergänze zu einer Basis $\\{v_1, \\dots, v_k, u_1, \\dots, u_r\\}$ von $\\mathbb{R}^n$ ($k + r = n$ folgt aus der Basisergänzung). Die Bilder $A(u_1), \\dots, A(u_r)$ sind linear unabhängig (wäre $\\sum c_i A(u_i) = 0$, so $A(\\sum c_i u_i) = 0$, also $\\sum c_i u_i \\in \\text{null}(A)$, Widerspruch). Damit spannen sie den Spaltenraum auf: $\\dim(\\text{col}(A)) = r$.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Eine Gerade (nicht durch den Ursprung) in $\\mathbb{R}^2$ ist ein Unterraum',
      correct: 'Nur Geraden durch den Ursprung sind Unterräume',
      explanation: 'Ein Unterraum muss $\\vec{0}$ enthalten. Jede Gerade $\\{x : ax + by = c\\}$ mit $c \\neq 0$ enthält den Nullvektor nicht — kein Unterraum.',
    },
    {
      wrong: 'Rang = Anzahl der Zeilen',
      correct: 'Rang = Anzahl linear unabhängiger Zeilen = Anzahl linear unabhängiger Spalten = Anzahl Pivots',
      explanation: 'Ein Rang-Satz der Linearen Algebra: Zeilenrang = Spaltenrang. Der Rang kann kleiner als $\\min(m,n)$ sein, wenn Zeilen/Spalten linear abhängig sind.',
    },
    {
      wrong: 'LoRA mit Rang $r$ kann nur $r$ neue Aufgaben lernen',
      correct: 'LoRA mit Rang $r$ kann Gewichtsänderungen in einem $r$-dimensionalen Unterraum lernen',
      explanation: 'Die Kapazität von LoRA hängt von der Komplexität der Aufgabe ab, nicht direkt von der Zahl der Aufgaben. In der Praxis reichen $r = 4$ bis $r = 64$ für die meisten Fine-Tuning-Aufgaben.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "The column space, row space, and null space" (Essence of Linear Algebra)',
      type: 'video',
      note: 'Visualisierung von Spaltenraum, Nullraum und dem Rank-Nullity Theorem',
    },
    {
      title: 'Hu et al. (2021): "LoRA: Low-Rank Adaptation of Large Language Models"',
      type: 'article',
      note: 'Originalpaper; erklärt warum Gewichtsänderungen in pre-trained LLMs intrinsisch niederrangig sind',
    },
    {
      title: 'MML Book, Kapitel 2.6: "Basis and Rank"',
      type: 'book',
      note: 'Rigorose Behandlung mit Dimensionssatz und Anwendungen',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.lgs-gauss',
      relation: 'requires',
      hint: 'Gauß-Elimination bestimmt den Rang (Anzahl der Pivots) und den Nullraum (freie Variablen).',
    },
    {
      lessonId: 'p1.eigenwerte-eigenvektoren',
      relation: 'see-also',
      hint: 'Eigenvektoren zu $\\lambda = 0$ bilden den Nullraum der Matrix — direkter Zusammenhang.',
    },
    {
      lessonId: 'p1.svd',
      relation: 'extends',
      hint: 'SVD liefert die optimale Niederrang-Approximation einer Matrix — Eckart-Young-Theorem.',
    },
  ],

  reflection: 'Rang ist die "echte Dimension" einer Abbildung — wie viel Information sie wirklich transportiert. LoRA setzt darauf, dass pre-trained LLMs für neue Aufgaben nur niederrangige Anpassungen brauchen. Der Dimensionssatz macht das präzise: Was in den Nullraum geht, geht verloren. **Was bedeutet es für ein neuronales Netz, wenn eine Gewichtsschicht niedriger Rang hat?**',
}
