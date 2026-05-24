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
}
