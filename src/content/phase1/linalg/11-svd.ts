import type { Lesson } from '../../../types'

export const svd: Lesson = {
  id: 'p1.svd',
  title: 'Singular Value Decomposition (SVD)',
  conceptTags: ['svd', 'singular-value', 'low-rank', 'pca', 'compression'],
  estimatedMinutes: 18,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## SVD — die universelle Zerlegung\n\nJede Matrix $A \\in \\mathbb{R}^{m \\times n}$ hat eine **Singulärwertzerlegung**:\n\n$$A = U \\Sigma V^T$$\n\n- $U \\in \\mathbb{R}^{m \\times m}$: orthogonale Matrix ("Output-Basisvektoren")\n- $\\Sigma \\in \\mathbb{R}^{m \\times n}$: Diagonalmatrix der Singulärwerte $\\sigma_1 \\geq \\sigma_2 \\geq \\dots \\geq 0$\n- $V \\in \\mathbb{R}^{n \\times n}$: orthogonale Matrix ("Input-Basisvektoren")',
      },
      {
        kind: 'math',
        content:
          '$$A = \\sum_{i=1}^r \\sigma_i u_i v_i^T \\quad (r = \\text{rang}(A)) \\qquad \\text{Beste Rang-}k\\text{-Approximation: } A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: SVD ist das Fundament von **PCA** (EV der Kovarianzmatrix = rechte SV von $X$), **LSA** (Latent Semantic Analysis), **Recommender-Systemen** (Matrix Factorization), und wird für numerische Stabilität in Attention verwendet. LoRA nutzt implizit Niedrigrang-SVD.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Zusammenhang zu Eigenwerten\n\n- Singulärwerte von $A$: $\\sigma_i = \\sqrt{\\lambda_i(A^T A)}$ (Wurzel der EWe von $A^T A$)\n- Rechtssingulärvektoren $v_i$: EVe von $A^T A$\n- Linkssingulärvektoren $u_i$: EVe von $A A^T$\n\n### Niedrigrang-Approximation (Eckart-Young)\n\nDie beste Rang-$k$-Näherung von $A$ (im Frobenius-Sinn) ist $A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$ — man behält einfach die $k$ größten Singulärwerte.',
      },
      {
        kind: 'worked-example',
        content:
          '**SVD-Intuition**: $A = U \\Sigma V^T$ bedeutet:\n\n1. $V^T$: Koordinatenwechsel im Input-Raum (Rotation)\n2. $\\Sigma$: Strecken/Stauchen entlang der neuen Achsen\n3. $U$: Koordinatenwechsel im Output-Raum (Rotation)\n\nJede lineare Abbildung = zwei Rotationen + Skalierung. Singulärwerte sind die Skalierungsfaktoren.',
      },
    ],
    practice: [
      {
        id: 'p1.svd.ex1',
        difficulty: 1,
        conceptTags: ['singular-value'],
        type: 'mc',
        prompt: 'Was ist ein Singulärwert $\\sigma_i$ von $A$?',
        options: [
          '$\\sigma_i = \\sqrt{\\lambda_i(A^T A)}$ — Wurzel des $i$-ten Eigenwertes von $A^T A$',
          '$\\sigma_i = \\lambda_i(A)$ — Eigenwert von $A$',
          '$\\sigma_i = A_{ii}$ — Diagonaleintrag',
          '$\\sigma_i = \\det(A)^{1/n}$',
        ],
        answer: '$\\sigma_i = \\sqrt{\\lambda_i(A^T A)}$ — Wurzel des $i$-ten Eigenwertes von $A^T A$',
        hints: [
          '$A^T A$ ist symmetrisch PSD → nur nicht-negative EWe.',
          'Singulärwerte: $\\sigma_i = \\sqrt{\\lambda_i(A^T A)} \\geq 0$.',
          'Immer reell und nicht-negativ — auch für nicht-quadratische $A$.',
        ],
        explanation:
          '$A^T A$ ist PSD → EWe $\\lambda_i \\geq 0$. Singulärwerte $\\sigma_i = \\sqrt{\\lambda_i} \\geq 0$. Vorteil: funktioniert für beliebige Rechteck-Matrizen.',
      },
      {
        id: 'p1.svd.ex2',
        difficulty: 2,
        conceptTags: ['svd'],
        type: 'mc',
        prompt: 'Für $A \\in \\mathbb{R}^{5 \\times 3}$ mit $\\text{rang}(A) = 2$: wie viele Singulärwerte $> 0$ hat $A$?',
        options: ['2', '3', '5', '15'],
        answer: '2',
        hints: [
          'Anzahl der Singulärwerte $> 0$ = $\\text{rang}(A)$.',
          '$\\text{rang}(A) = 2$.',
          '2 positive Singulärwerte.',
        ],
        explanation:
          'Anzahl $\\sigma_i > 0$ = $\\text{rang}(A) = 2$. Die restlichen $\\min(m,n) - \\text{rang}(A) = 3 - 2 = 1$ Singulärwerte sind 0.',
      },
      {
        id: 'p1.svd.ex3',
        difficulty: 2,
        conceptTags: ['low-rank'],
        type: 'mc',
        prompt:
          'Rang-1-Approximation $A_1 = \\sigma_1 u_1 v_1^T$ minimiert $\\|A - A_1\\|_F$. Was bleibt im Fehler $\\|A - A_1\\|_F$?',
        options: [
          '$\\sqrt{\\sigma_2^2 + \\sigma_3^2 + \\dots}$ — Beitrag der vernachlässigten Singulärwerte',
          '$\\sigma_1$ — der erste Singulärwert',
          '$\\|A\\|_F$ — keine Verbesserung',
          '$0$ — Rang-1 rekonstruiert $A$ exakt',
        ],
        answer: '$\\sqrt{\\sigma_2^2 + \\sigma_3^2 + \\dots}$ — Beitrag der vernachlässigten Singulärwerte',
        hints: [
          '$\\|A - A_k\\|_F^2 = \\sigma_{k+1}^2 + \\dots + \\sigma_r^2$ (Eckart-Young).',
          'Für $k=1$: Fehler $= \\sqrt{\\sigma_2^2 + \\dots}$.',
          'Je schneller die Singulärwerte abfallen, desto besser die Approximation.',
        ],
        explanation:
          '$\\|A - A_k\\|_F = \\sqrt{\\sum_{i > k} \\sigma_i^2}$ (Eckart-Young-Theorem). Der Fehler hängt nur von den vernachlässigten Singulärwerten ab.',
      },
      {
        id: 'p1.svd.ex4',
        difficulty: 3,
        conceptTags: ['svd', 'pca'],
        type: 'mc',
        prompt: 'Wie hängen SVD von $X$ und Eigenwerte von $X^T X$ zusammen?',
        options: [
          'Rechte Singulärvektoren von $X$ = EVe von $X^T X$; $\\sigma_i^2 = \\lambda_i(X^T X)$',
          'Linke Singulärvektoren von $X$ = EVe von $X^T X$',
          'Singulärwerte von $X$ = Eigenwerte von $X^T X$',
          'Kein direkter Zusammenhang',
        ],
        answer: 'Rechte Singulärvektoren von $X$ = EVe von $X^T X$; $\\sigma_i^2 = \\lambda_i(X^T X)$',
        hints: [
          '$X = U \\Sigma V^T$ → $X^T X = V \\Sigma^T U^T U \\Sigma V^T = V \\Sigma^2 V^T$.',
          '$V \\Sigma^2 V^T$ ist die Eigenzerlegung von $X^T X$.',
          'Rechte SVs $v_i$ = EVe von $X^T X$; $\\sigma_i^2 = \\lambda_i$.',
        ],
        explanation:
          '$X^T X = (U \\Sigma V^T)^T (U \\Sigma V^T) = V \\Sigma^2 V^T$ — das ist genau die Spektralzerlegung von $X^T X$. PCA via $X^T X$ und PCA via SVD von $X$ sind äquivalent (aber SVD ist numerisch stabiler).',
      },
      {
        id: 'p1.svd.ex5',
        difficulty: 3,
        conceptTags: ['compression', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Ein Bild $A \\in \\mathbb{R}^{512 \\times 512}$ hat $\\sigma_1 = 100, \\sigma_2 = 20, \\sigma_3 = \\dots = \\sigma_{512} \\approx 0{,}1$. Wie viel Speicher spart Rang-2-Approximation?',
        options: [
          'Statt $512^2 = 262144$ Zahlen nur $2 \\cdot (512 + 512 + 1) \\approx 2050$ Zahlen',
          'Keine Ersparnis — SVD braucht mehr Speicher',
          'Statt 512 nur 2 Werte',
          '$50\\%$ Ersparnis',
        ],
        answer: 'Statt $512^2 = 262144$ Zahlen nur $2 \\cdot (512 + 512 + 1) \\approx 2050$ Zahlen',
        hints: [
          'Rang-$k$-Approximation speichert: $k$ Vektoren $u_i$ ($m$-dim), $k$ Vektoren $v_i$ ($n$-dim), $k$ Singulärwerte.',
          'Pro Rang: $m + n + 1$ Zahlen.',
          '$k=2$: $2 \\cdot (512 + 512 + 1) = 2050 \\ll 262144$.',
        ],
        explanation:
          '$A_2 = \\sigma_1 u_1 v_1^T + \\sigma_2 u_2 v_2^T$: speichere $2 \\times (512 + 512 + 1) = 2050$ Zahlen statt $512^2 = 262144$ — ca. $128\\times$ Kompression. Möglich weil die Singulärwerte schnell abfallen.',
      },
      {
        id: 'p1.svd.ex6',
        difficulty: 4,
        conceptTags: ['svd', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Matrix Factorization für Recommender-Systeme: $R \\approx UV^T$ mit $U \\in \\mathbb{R}^{m \\times k}$, $V \\in \\mathbb{R}^{n \\times k}$. Was repräsentieren die Spalten von $U$ und $V$?',
        options: [
          '$U$: latente User-Präferenzen; $V$: latente Item-Features — $k$ verborgene Faktoren',
          '$U$: Ähnlichkeitsmatrix zwischen Usern; $V$: Ähnlichkeitsmatrix zwischen Items',
          '$U$: Rohdaten der User; $V$: Rohdaten der Items',
          '$U$ und $V$ sind Rotationen ohne semantische Bedeutung',
        ],
        answer: '$U$: latente User-Präferenzen; $V$: latente Item-Features — $k$ verborgene Faktoren',
        hints: [
          '$(UV^T)_{ij} = u_i \\cdot v_j$ ≈ Bewertung von User $i$ für Item $j$.',
          'Jede Zeile $u_i \\in \\mathbb{R}^k$ beschreibt User $i$ in $k$ latenten Dimensionen.',
          'Netflix-Gewinner: $k = 50$ latente Faktoren genügten für gute Vorhersagen.',
        ],
        explanation:
          '$R_{ij} \\approx u_i \\cdot v_j$: Skalarprodukt von User- und Item-Vektor gibt die Bewertung. $k$ latente Faktoren (z.B. Genre-Präferenzen) können Millionen Bewertungen erklären.',
      },
      {
        id: 'p1.svd.ex7',
        difficulty: 4,
        conceptTags: ['svd', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: $\\|A\\|_F^2 = \\text{tr}(A^T A) = \\sum_i \\sigma_i^2$. Was folgt daraus für den Anteil der ersten $k$ Singulärwerte an der Gesamtenergie?',
        options: [
          '$\\text{Energieanteil} = \\frac{\\sum_{i=1}^k \\sigma_i^2}{\\sum_{i=1}^r \\sigma_i^2}$ — gibt an, wie viel Information $A_k$ enthält',
          '$\\text{Energieanteil} = \\sigma_k / \\sigma_1$',
          '$\\text{Energieanteil} = k/r$',
          '$\\text{Energieanteil} = \\|A_k\\|_F$',
        ],
        answer: '$\\text{Energieanteil} = \\frac{\\sum_{i=1}^k \\sigma_i^2}{\\sum_{i=1}^r \\sigma_i^2}$ — gibt an, wie viel Information $A_k$ enthält',
        hints: [
          '$\\|A\\|_F^2 = \\sum_i \\sigma_i^2$ (Gesamtenergie).',
          '$\\|A_k\\|_F^2 = \\sum_{i=1}^k \\sigma_i^2$ (erhaltene Energie).',
          'Ratio = Anteil der erhaltenen Varianz — wie in PCA "erklärte Varianz".',
        ],
        explanation:
          'In PCA: "erklärte Varianz der ersten $k$ Komponenten" = $\\frac{\\sum_{i=1}^k \\sigma_i^2}{\\sum_i \\sigma_i^2}$. Ein Plot dieses Anteils heißt Scree-Plot — hilft, das optimale $k$ zu wählen.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## SVD in der modernen ML-Praxis\n\n- **PCA**: `sklearn.decomposition.PCA` nutzt intern Truncated SVD — berechnet nur die ersten $k$ Singulärwerte.\n- **Word2Vec/GloVe**: Embeddings entstehen aus SVD von Kookurrenzmatrizen.\n- **LoRA**: $\\Delta W = AB$ mit $r \\ll d$ — explizite Niedrigrang-Faktorisierung, wie SVD bei $k = r$.\n- **Stable Diffusion**: U-Net-Architektur hat Gewichtsmatrizen, die mit SVD-basierten Methoden komprimiert werden.',
      },
      {
        kind: 'callout',
        content:
          'Der Satz von Eckart-Young (1936) besagt: Die Rang-$k$-Approximation via SVD ist die **beste** mögliche im Frobenius-Sinn. Keine andere Rang-$k$-Matrix liegt näher an $A$. Das macht SVD zum gold standard für Kompression, Rauschreduktion und latente Faktorenanalyse.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.svd.card1',
      front: 'SVD-Zerlegung?',
      back: '$A = U \\Sigma V^T$: $U, V$ orthogonal; $\\Sigma$ diagonal mit Singulärwerten $\\sigma_1 \\geq \\sigma_2 \\geq \\dots \\geq 0$.',
      conceptTags: ['svd'],
    },
    {
      id: 'p1.svd.card2',
      front: 'Beste Rang-$k$-Approximation?',
      back: '$A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$ (Eckart-Young). Fehler: $\\|A - A_k\\|_F = \\sqrt{\\sum_{i>k} \\sigma_i^2}$.',
      conceptTags: ['low-rank'],
    },
    {
      id: 'p1.svd.card3',
      front: 'Wie hängen Singulärwerte und Eigenwerte zusammen?',
      back: '$\\sigma_i(A) = \\sqrt{\\lambda_i(A^T A)}$. Rechte SVs = EVe von $A^T A$.',
      conceptTags: ['singular-value'],
    },
  ],
}
