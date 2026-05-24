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

  learningOutcome:
    'Du verstehst die SVD $A = U\\Sigma V^T$ geometrisch als zwei Rotationen und eine Skalierung, kannst Singulärwerte von Eigenwerten abgrenzen, wendest das Eckart-Young-Theorem auf Rang-$k$-Approximationen an und erkennst SVD als gemeinsames Fundament von PCA, LoRA und Recommender-Systemen.',

  description:
    'Die Singulärwertzerlegung ist die mächtigste Matrix-Zerlegung der linearen Algebra: Sie existiert für jede beliebige Matrix (auch rechteckig, auch Rang-defizient) und liefert die optimale Niedrigrang-Approximation. In ML steckt SVD hinter PCA, Latent Semantic Analysis, Matrix Factorization und LoRA-Adaptern — wer SVD versteht, versteht die Datengeometrie moderner Modelle.',

  conceptSteps: [
    {
      title: 'Warum SVD? Die universelle Zerlegung',
      body: 'Eigenwertzerlegung $A = Q\\Lambda Q^{-1}$ existiert nur für quadratische, diagonalisierbare Matrizen. SVD dagegen existiert für **jede** Matrix $A \\in \\mathbb{R}^{m \\times n}$: $A = U\\Sigma V^T$. Damit ist sie das universelle Werkzeug — egal ob Datenmatrix ($m \\gg n$), Gewichtsmatrix (quadratisch) oder Attention-Matrix (rechteckig).',
      visual: `<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" style="background:rgb(17 24 39);border:1px solid rgb(55 65 81);border-radius:8px;padding:8px">
  <text x="10" y="28" fill="#f9fafb" font-size="13" font-family="monospace">A</text>
  <text x="10" y="48" fill="#9ca3af" font-size="11" font-family="monospace">m × n</text>
  <text x="55" y="38" fill="#6b7280" font-size="18">=</text>
  <rect x="80" y="15" width="60" height="70" rx="4" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="95" y="48" fill="#60a5fa" font-size="13" font-family="monospace">U</text>
  <text x="83" y="98" fill="#9ca3af" font-size="10" font-family="monospace">m × m</text>
  <text x="148" y="55" fill="#6b7280" font-size="14">·</text>
  <rect x="160" y="15" width="100" height="70" rx="4" fill="none" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="198" y="48" fill="#a78bfa" font-size="13" font-family="monospace">Σ</text>
  <text x="163" y="98" fill="#9ca3af" font-size="10" font-family="monospace">m × n (diag)</text>
  <text x="268" y="55" fill="#6b7280" font-size="14">·</text>
  <rect x="280" y="15" width="60" height="60" rx="4" fill="none" stroke="#34d399" stroke-width="1.5"/>
  <text x="297" y="43" fill="#34d399" font-size="13" font-family="monospace">V</text>
  <text x="290" y="57" fill="#34d399" font-size="10" font-family="monospace">T</text>
  <text x="283" y="88" fill="#9ca3af" font-size="10" font-family="monospace">n × n</text>
  <text x="360" y="55" fill="#6b7280" font-size="14">=</text>
  <text x="380" y="30" fill="#f9fafb" font-size="11" font-family="monospace">① V^T: Rotation im Input-Raum</text>
  <text x="380" y="50" fill="#f9fafb" font-size="11" font-family="monospace">② Σ:  Strecken/Stauchen</text>
  <text x="380" y="70" fill="#f9fafb" font-size="11" font-family="monospace">③ U:  Rotation im Output-Raum</text>
  <text x="380" y="100" fill="#a78bfa" font-size="10" font-family="monospace">σ₁ ≥ σ₂ ≥ … ≥ 0</text>
  <text x="380" y="118" fill="#60a5fa" font-size="10" font-family="monospace">U, V orthogonal (U^T U = I)</text>
  <text x="380" y="136" fill="#34d399" font-size="10" font-family="monospace">Existiert für jede m×n-Matrix!</text>
</svg>`,
      preprompt: 'Warum reicht Eigenwertzerlegung nicht für alle Matrizen?',
      miniExample:
        'Datenpunkt-Matrix $X \\in \\mathbb{R}^{100 \\times 5}$ (100 Samples, 5 Features): SVD liefert $U \\in \\mathbb{R}^{100 \\times 100}$, $\\Sigma \\in \\mathbb{R}^{100 \\times 5}$, $V \\in \\mathbb{R}^{5 \\times 5}$. Die 5 Singulärwerte beschreiben, wie viel Varianz jede Hauptrichtung erklärt.',
      selfCheck: 'Für welche Matrizen existiert die Eigenwertzerlegung, aber nicht unbedingt eine reelle orthogonale Diagonalisierung?',
    },
    {
      title: 'Geometrie: zwei Rotationen + Skalierung',
      body: 'Jede lineare Abbildung $x \\mapsto Ax$ lässt sich in drei Schritte zerlegen: (1) Rotation $V^T$: dreht den Einheitskreis auf die natürlichen Achsen der Abbildung; (2) Skalierung $\\Sigma$: streckt jede Achse um den Singulärwert $\\sigma_i$; (3) Rotation $U$: dreht das Ergebnis in den Ausgaberaum. Singulärwerte sind also die **Halbachsenlängen** des Bildes der Einheitskugel unter $A$.',
      preprompt: 'Was passiert geometrisch, wenn man einen Einheitskreis mit einer Matrix multipliziert?',
      miniExample:
        'Für $A = \\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$: $U = V = I$, $\\Sigma = \\text{diag}(3, 1)$ — reines Strecken. Für eine Rotation $R$: $\\Sigma = I$, $U = R$, $V = I$ — nur Rotation, keine Skalierung.',
      selfCheck: 'Was bedeutet es geometrisch, wenn $\\sigma_1 \\gg \\sigma_2 \\approx 0$?',
    },
    {
      title: 'Singulärwerte vs. Eigenwerte: der Unterschied',
      body: 'Eigenwerte: nur für quadratische Matrizen; können komplex sein; $Av = \\lambda v$ (selbe Richtung). Singulärwerte: für jede Matrix; immer reell und $\\geq 0$; $\\sigma_i = \\sqrt{\\lambda_i(A^TA)}$. Zusammenhang: Für symmetrische PSD-Matrizen $A = Q\\Lambda Q^T$ gilt $\\sigma_i = \\lambda_i$ — Eigenwerte und Singulärwerte fallen zusammen. Für allgemeines $A$: $\\text{Singulärwerte} \\neq |\\text{Eigenwerte}|$ (nur für normale Matrizen gilt Gleichheit).',
      preprompt: 'Was unterscheidet Eigenvektoren von linken und rechten Singulärvektoren?',
      miniExample:
        '$A = \\begin{pmatrix} 0 & 2 \\\\ 0 & 0 \\end{pmatrix}$: Eigenwerte $\\{0, 0\\}$, Singulärwerte $\\{2, 0\\}$. Die Matrix ist nicht invertierbar, aber $\\sigma_1 = 2$ zeigt, dass sie stark in eine Richtung wirkt.',
      selfCheck: 'Warum sind Singulärwerte für numerische Algorithmen robuster als Eigenwerte?',
    },
    {
      title: 'Rang-k-Approximation: Eckart-Young-Theorem',
      body: 'Das Eckart-Young-Theorem (1936) besagt: Unter allen Rang-$k$-Matrizen $B$ ist $A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$ die beste Approximation von $A$:\n$$\\|A - A_k\\|_F = \\min_{\\text{rang}(B) \\leq k} \\|A - B\\|_F = \\sqrt{\\sigma_{k+1}^2 + \\dots + \\sigma_r^2}$$\nDer Fehler ist vollständig durch die vernachlässigten Singulärwerte bestimmt. Je schneller die Singulärwerte abfallen, desto besser die Approximierbarkeit.',
      preprompt: 'Wie misst man den Abstand zwischen zwei Matrizen?',
      miniExample:
        'Bild $512 \\times 512$: Rang-10-SVD speichert $10 \\cdot (512 + 512 + 1) = 10250$ Zahlen statt $512^2 = 262144$ — Faktor 25 Kompression. Wenn $95\\%$ der Gesamtenergie $\\sum \\sigma_i^2$ in den ersten 10 Singulärwerten liegen, ist der Approximationsfehler nur $5\\%$.',
      selfCheck: 'Wie wählt man $k$ in der Praxis? Was ist ein Scree-Plot?',
    },
    {
      title: 'SVD und PCA: zwei Seiten derselben Medaille',
      body: 'PCA sucht die Richtungen maximaler Varianz in zentrierten Daten $X \\in \\mathbb{R}^{n \\times d}$. Methode 1: Eigenwertzerlegung von $X^TX/n$. Methode 2: SVD von $X = U\\Sigma V^T$ — die rechten Singulärvektoren $v_i$ sind genau die Hauptkomponenten, und $\\sigma_i^2/n = \\lambda_i$ sind die Varianzen. Erklärte Varianz der ersten $k$ Komponenten: $\\frac{\\sum_{i=1}^k \\sigma_i^2}{\\sum_i \\sigma_i^2}$. SVD ist numerisch stabiler, weil $X^TX$ Konditionszahl quadriert.',
      preprompt: 'Was sucht PCA, und wie hängt das mit Singulärwerten zusammen?',
      miniExample:
        'In `sklearn`: `PCA(n_components=k).fit(X)` nutzt intern `TruncatedSVD` von $X$ — berechnet nur die $k$ größten Singulärwerte, nicht alle. Vorteil: $O(ndk)$ statt $O(nd \\cdot \\min(n,d))$.',
      selfCheck: 'Warum ist SVD numerisch stabiler als die Eigenwertzerlegung von $X^TX$?',
    },
    {
      title: 'SVD in Recommender-Systemen und LoRA',
      body: 'Matrix Factorization ($R \\approx UV^T$): User-Rating-Matrix $R \\in \\mathbb{R}^{m \\times n}$ hat Rang-$k$-Faktorisierung in $U \\in \\mathbb{R}^{m \\times k}$ (User-Embeddings) und $V \\in \\mathbb{R}^{n \\times k}$ (Item-Embeddings). LoRA (Low-Rank Adaptation): statt vollen Gewichts-Updates $\\Delta W \\in \\mathbb{R}^{d \\times d}$ zwei kleine Matrizen $A \\in \\mathbb{R}^{d \\times r}$, $B \\in \\mathbb{R}^{r \\times d}$ mit $r \\ll d$. Die Hypothese: relevante Updates für Fine-Tuning haben niedrigen Rang — SVD erklärt, warum das funktioniert.',
      preprompt: 'Warum kann man große Gewichtsmatrizen mit wenigen Parametern approximieren?',
      miniExample:
        'GPT-3 hat Gewichtsmatrizen $\\in \\mathbb{R}^{12288 \\times 12288}$ (151 Mio. Parameter pro Schicht). LoRA mit $r = 16$: nur $2 \\cdot 12288 \\cdot 16 = 393216$ Parameter — $384\\times$ weniger — und Fine-Tuning-Qualität ist nahezu identisch.',
      selfCheck: 'Was sagt es über eine Gewichtsmatrix aus, wenn ihre Singulärwerte schnell abfallen?',
    },
    {
      title: 'Energieinhalt und numerischer Rang',
      body: 'Die Frobenius-Norm hat die schöne Eigenschaft: $\\|A\\|_F^2 = \\text{tr}(A^TA) = \\sum_i \\sigma_i^2$. Damit misst man den "Energieinhalt" jedes Singulärwertes. Der **numerische Rang** ist die Anzahl der Singulärwerte über einem Schwellenwert $\\epsilon \\cdot \\sigma_1$ (typisch $\\epsilon = 10^{-10}$) — robuster als algebraischer Rang bei Rundungsfehlern. Spektralnorm: $\\|A\\|_2 = \\sigma_1$ (größter Singulärwert) — bestimmt die Lipschitz-Konstante neuronaler Schichten.',
      preprompt: 'Wie misst man, wie viel Information in einem Singulärwert steckt?',
      miniExample:
        'Spektral-Normalisierung in GANs: dividiert Gewichtsmatrizen durch $\\sigma_1$, sodass $\\|W\\|_2 = 1$. Das stabilisiert das Training, weil Gradienten nicht explodieren.',
      selfCheck: 'Warum ist der numerische Rang wichtiger als der algebraische Rang für Floating-Point-Berechnungen?',
    },
  ],

  codeBridges: [
    {
      title: 'SVD berechnen und Low-Rank-Approximation in PyTorch',
      lang: 'python',
      code: `import torch
import numpy as np

# === SVD berechnen ===
A = torch.randn(5, 3)  # Rechteckige Matrix (m=5, n=3)
U, S, Vh = torch.linalg.svd(A, full_matrices=True)
# U: (5,5), S: (3,) Singulärwerte, Vh: (3,3)
print(f"Singulärwerte: {S}")  # Immer >= 0, absteigend

# Rekonstruktion prüfen
A_rec = U[:, :3] @ torch.diag(S) @ Vh
print(f"Rekonstruktionsfehler: {torch.norm(A - A_rec):.2e}")  # ~1e-6

# === Rang-k-Approximation (Eckart-Young) ===
def low_rank_approx(A, k):
    U, S, Vh = torch.linalg.svd(A, full_matrices=False)
    # full_matrices=False: U=(m,r), S=(r,), Vh=(r,n) mit r=min(m,n)
    return U[:, :k] @ torch.diag(S[:k]) @ Vh[:k, :]

A_big = torch.randn(100, 80)  # Größere Matrix
for k in [1, 5, 10, 20]:
    A_k = low_rank_approx(A_big, k)
    fehler = torch.norm(A_big - A_k, 'fro')
    # Frobenius-Norm des Fehlers = sqrt(sum_{i>k} sigma_i^2)
    print(f"k={k:2d}: ||A - A_k||_F = {fehler:.3f}")

# === Energieinhalt: Scree-Plot ===
_, S_all, _ = torch.linalg.svd(A_big, full_matrices=False)
energie_kumulativ = torch.cumsum(S_all**2, dim=0) / torch.sum(S_all**2)
# energie_kumulativ[k-1] = erklärte Varianz der ersten k Singulärwerte
k_95 = (energie_kumulativ >= 0.95).nonzero()[0].item() + 1
print(f"k für 95% Energie: {k_95}")

# === Spektralnorm (größter Singulärwert) ===
spektralnorm = torch.linalg.matrix_norm(A_big, ord=2)  # = S_all[0]
print(f"Spektralnorm ||A||_2 = sigma_1 = {spektralnorm:.3f}")`,
      annotation:
        '`torch.linalg.svd` mit `full_matrices=False` liefert die "dünne" SVD — effizienter als volle SVD. `S` enthält die Singulärwerte absteigend sortiert. Das kumulative Energie-Verhältnis ist das Herzstück des Scree-Plots in PCA.',
    },
    {
      title: 'PCA via SVD und LoRA-Prinzip',
      lang: 'python',
      code: `import torch
import numpy as np

# === PCA via SVD (numerisch stabile Variante) ===
n, d = 200, 50  # 200 Datenpunkte, 50 Features
X = torch.randn(n, d)
X = X - X.mean(dim=0)  # Zentrierung

# Methode 1: Eigenwertzerlegung von X^T X (weniger stabil)
cov = X.T @ X / n
eigenvalues, eigenvectors = torch.linalg.eigh(cov)  # nur für sym. Matrizen
# Absteigend sortieren
idx = eigenvalues.argsort(descending=True)
PC_eigh = eigenvectors[:, idx[:5]]  # Erste 5 Hauptkomponenten

# Methode 2: SVD von X (bevorzugt!)
U, S, Vh = torch.linalg.svd(X, full_matrices=False)
# V^T = Vh, Spalten von Vh.T = Hauptkomponenten
PC_svd = Vh[:5].T  # Erste 5 Hauptkomponenten
print(f"Übereinstimmung: {torch.allclose(PC_eigh.abs(), PC_svd.abs(), atol=1e-4)}")

# Projizierte Daten (Scores)
X_proj = X @ PC_svd  # (200, 5) — 5-dimensionale Repräsentation

# === LoRA-Prinzip: Low-Rank Weight Update ===
d_model, r = 512, 8  # Rank r << d_model

# Pretrained weight (eingefroren)
W_pretrained = torch.randn(d_model, d_model)

# LoRA: lerne nur A und B (r << d_model)
A = torch.randn(d_model, r) * 0.01  # Skalierung für stabiles Training
B = torch.zeros(r, d_model)  # Init: B=0, damit Delta W = 0 zu Beginn

# Effektive Gewichtsmatrix
alpha = 16  # Skalierungsfaktor
delta_W = (A @ B) * (alpha / r)  # Low-Rank Update, Rang = r
W_eff = W_pretrained + delta_W

# Parameter-Vergleich:
params_full = d_model * d_model
params_lora = d_model * r + r * d_model
print(f"Volle Matrix: {params_full:,} Parameter")
print(f"LoRA (r={r}): {params_lora:,} Parameter ({params_lora/params_full:.1%} des Originals)")`,
      annotation:
        'SVD von $X$ ist numerisch stabiler als Eigenwertzerlegung von $X^TX$, weil die Konditionszahl quadriert wird. LoRA initialisiert $B=0$, damit der Update $\\Delta W = AB$ zu Beginn null ist — Fine-Tuning startet exakt am Pretrained-Modell.',
    },
  ],

  derivations: [
    {
      claim: 'Beste Rang-1-Approximation via SVD (Eckart-Young)',
      reasoning:
        'Sei $A = U\\Sigma V^T$ mit $\\sigma_1 \\geq \\sigma_2 \\geq \\dots$. Gesucht: $\\min_{\\text{rang}(B)\\leq 1} \\|A - B\\|_F$. Schreibe $B = \\sigma u v^T$ mit $\\|u\\| = \\|v\\| = 1$. Dann: $\\|A - B\\|_F^2 = \\|A\\|_F^2 - 2\\sigma \\langle A, uv^T \\rangle + \\sigma^2$. Maximiere $\\langle A, uv^T \\rangle = u^T A v$. Nach Rayleigh-Quotient: Maximum ist $\\sigma_1$, erreicht bei $u = u_1$, $v = v_1$. Einsetzen: Fehler $= \\sqrt{\\sum_{i \\geq 2} \\sigma_i^2}$ — nur die restlichen Singulärwerte. Durch Induktion folgt Eckart-Young für beliebiges $k$.',
    },
  ],

  commonMistakes: [
    {
      wrong: '`torch.linalg.svd` gibt $V$ zurück, also nehme ich `V` direkt als rechte Singulärvektoren',
      correct: '`torch.linalg.svd` gibt $V^T$ (als `Vh`) zurück — Spalten von $V$ sind `Vh.T`',
      explanation:
        'PyTorch gibt `Vh` (= $V^T$) zurück für effizientere Speicherung. Immer `Vh` aus `torch.linalg.svd` nehmen; `Vh.T` für die rechten Singulärvektoren als Spalten.',
    },
    {
      wrong: 'Singulärwerte sind dieselben wie Eigenwerte',
      correct: '$\\sigma_i = \\sqrt{\\lambda_i(A^TA)} \\geq 0$ immer, aber Eigenwerte können negativ oder komplex sein',
      explanation:
        'Singulärwerte sind Wurzeln der Eigenwerte von $A^TA$ — immer reell und nicht-negativ. Eigenwerte können für beliebige Matrizen komplex oder negativ sein.',
    },
    {
      wrong: '`full_matrices=True` (Standard) ist immer richtig',
      correct: 'Für große $m$ oder $n$ besser `full_matrices=False` für die "dünne" SVD',
      explanation:
        '`full_matrices=True` gibt $U \\in \\mathbb{R}^{m \\times m}$ zurück — für große $m$ sehr speicherintensiv. `full_matrices=False`: $U \\in \\mathbb{R}^{m \\times r}$, $\\Sigma \\in \\mathbb{R}^r$, $V^T \\in \\mathbb{R}^{r \\times n}$ mit $r = \\min(m, n)$.',
    },
  ],

  furtherResources: [
    {
      title: 'Gilbert Strang: "The Story of SVD" (MIT OCW 18.065)',
      type: 'video',
      note: 'Strangs Vorlesung 18.065 widmet SVD mehrere Kapitel — mit Anwendungen in Signal Processing und ML.',
    },
    {
      title: 'Hu et al.: "LoRA: Low-Rank Adaptation of Large Language Models" (2021) — arxiv.org/abs/2106.09685',
      type: 'article',
      note: 'Original-Paper zu LoRA — erklärt explizit den SVD-Zusammenhang und warum Niedrigrang-Updates funktionieren.',
    },
    {
      title: 'NumPy Docs: `numpy.linalg.svd`',
      type: 'article',
      note: 'API-Referenz mit Beispielen zu full vs. economy SVD.',
    },
  ],

  crossLinks: [
    { lessonId: 'p1.spektraltheorem', relation: 'requires', hint: 'SVD verallgemeinert die Spektralzerlegung auf nicht-symmetrische Matrizen.' },
    { lessonId: 'p1.eigenwerte-eigenvektoren', relation: 'requires', hint: 'Singulärwerte sind Wurzeln der Eigenwerte von $A^TA$.' },
    { lessonId: 'p1.vektorraeume-basis-rang', relation: 'requires', hint: 'SVD liefert Orthonormalbasen für alle vier fundamentalen Unterräume.' },
    { lessonId: 'p1.jacobi-hesse', relation: 'see-also', hint: 'Singulärwerte der Jacobi-Matrix beschreiben die lokale Geometrie der Abbildung.' },
  ],

  reflection: 'LoRA fine-tunet große Sprachmodelle mit $r = 8{,}16$ oder $32$ — warum funktioniert das? Was sagt es über die Komplexität der Aufgabe aus, wenn kleinere $r$ ausreichen? Und warum initialisiert man $B = 0$ statt zufällig?',
}
