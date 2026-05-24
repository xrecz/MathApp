import type { Lesson } from '../../../types'

export const eigenwerteEigenvektoren: Lesson = {
  id: 'p1.eigenwerte-eigenvektoren',
  title: 'Eigenwerte & Eigenvektoren',
  conceptTags: ['eigenvalue', 'eigenvector', 'characteristic-polynomial', 'diagonalization'],
  estimatedMinutes: 17,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Eigenvektoren — Richtungen, die erhalten bleiben\n\nEin Vektor $v \\neq \\vec{0}$ heißt **Eigenvektor** von $A$ zum **Eigenwert** $\\lambda$, wenn:\n\n$$Av = \\lambda v$$\n\nDie Abbildung streckt/staucht $v$ — ändert aber nicht seine Richtung. Das sind die "natürlichen Richtungen" der Abbildung.',
      },
      {
        kind: 'math',
        content:
          '$$Av = \\lambda v \\iff (A - \\lambda I)v = 0 \\iff \\det(A - \\lambda I) = 0 \\quad \\text{(charakteristisches Polynom)}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: **PCA** (Principal Component Analysis) berechnet die Eigenvektoren der Kovarianz-Matrix. Der Eigenvektor zum größten Eigenwert zeigt die Richtung der größten Varianz. GPT-Aktivierungen, t-SNE, Spektral-Clustering — überall Eigenwerte.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Berechnung\n\n1. **Eigenwerte**: löse $\\det(A - \\lambda I) = 0$ (charakteristisches Polynom)\n2. **Eigenvektoren**: für jedes $\\lambda$ löse $(A - \\lambda I)v = 0$ (Nullraum von $A - \\lambda I$)\n\n### Eigenschaften\n\n- $n \\times n$-Matrix hat (über $\\mathbb{C}$) genau $n$ Eigenwerte (mit Vielfachheit)\n- Eigenvektoren zu verschiedenen Eigenwerten sind linear unabhängig\n- $\\det A = \\prod_i \\lambda_i$ und $\\text{Spur}(A) = \\sum_i \\lambda_i$',
      },
      {
        kind: 'worked-example',
        content:
          '**Beispiel**: $A = \\begin{pmatrix}3 & 1\\\\ 0 & 2\\end{pmatrix}$\n\nchar. Polynom: $\\det(A - \\lambda I) = (3-\\lambda)(2-\\lambda) = 0$\n\nEigenwerte: $\\lambda_1 = 3$, $\\lambda_2 = 2$\n\nEigenvektor zu $\\lambda_1 = 3$: $(A - 3I)v = 0 \\Rightarrow \\begin{pmatrix}0&1\\\\0&-1\\end{pmatrix}v = 0 \\Rightarrow v_1 = \\begin{pmatrix}1\\\\0\\end{pmatrix}$\n\nEigenvektor zu $\\lambda_2 = 2$: $(A - 2I)v = 0 \\Rightarrow \\begin{pmatrix}1&1\\\\0&0\\end{pmatrix}v = 0 \\Rightarrow v_2 = \\begin{pmatrix}-1\\\\1\\end{pmatrix}$',
      },
    ],
    practice: [
      {
        id: 'p1.eigen.ex1',
        difficulty: 1,
        conceptTags: ['eigenvector'],
        type: 'mc',
        prompt: 'Was ist ein Eigenvektor von $A = \\begin{pmatrix}2 & 0\\\\ 0 & 3\\end{pmatrix}$ zum Eigenwert 2?',
        options: ['$(1, 0)^T$', '$(0, 1)^T$', '$(1, 1)^T$', '$(2, 3)^T$'],
        answer: '$(1, 0)^T$',
        hints: [
          'Prüfe: $Av = \\lambda v$ für $\\lambda = 2$.',
          '$A \\cdot (1,0)^T = (2, 0)^T = 2 \\cdot (1,0)^T$ ✓',
          '$(1,0)^T$ ist Eigenvektor zum EW $2$.',
        ],
        explanation:
          '$\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}\\begin{pmatrix}1\\\\0\\end{pmatrix} = \\begin{pmatrix}2\\\\0\\end{pmatrix} = 2 \\cdot \\begin{pmatrix}1\\\\0\\end{pmatrix}$ ✓. Standardbasisvektoren sind immer EVs von Diagonalmatrizen.',
      },
      {
        id: 'p1.eigen.ex2',
        difficulty: 2,
        conceptTags: ['eigenvalue'],
        type: 'mc',
        prompt: 'Eigenwerte der Identitätsmatrix $I_n$?',
        options: [
          'Alle Eigenwerte sind $1$',
          'Alle Eigenwerte sind $0$',
          'Die Eigenwerte sind $1, 2, \\dots, n$',
          '$I_n$ hat keine Eigenwerte',
        ],
        answer: 'Alle Eigenwerte sind $1$',
        hints: [
          '$Iv = v = 1 \\cdot v$ für jeden Vektor $v$.',
          'Jeder Vektor ist Eigenvektor zum EW 1.',
          'Einziger Eigenwert: $\\lambda = 1$ (mit Vielfachheit $n$).',
        ],
        explanation: '$Iv = v = 1 \\cdot v$ für alle $v \\neq 0$ → jeder Vektor ist EV, einziger EW ist $\\lambda = 1$.',
      },
      {
        id: 'p1.eigen.ex3',
        difficulty: 2,
        conceptTags: ['characteristic-polynomial'],
        type: 'mc',
        prompt:
          'Charakteristisches Polynom von $A = \\begin{pmatrix}4 & 0\\\\ 0 & 1\\end{pmatrix}$?',
        options: [
          '$(4 - \\lambda)(1 - \\lambda)$',
          '$(4 + \\lambda)(1 + \\lambda)$',
          '$\\lambda^2 - 5\\lambda$',
          '$4 - \\lambda$',
        ],
        answer: '$(4 - \\lambda)(1 - \\lambda)$',
        hints: [
          '$\\det(A - \\lambda I) = \\det\\begin{pmatrix}4-\\lambda & 0\\\\ 0 & 1-\\lambda\\end{pmatrix}$.',
          'Diagonalmatrix: $\\det = $ Produkt der Diagonale.',
          '$(4-\\lambda)(1-\\lambda)$.',
        ],
        explanation:
          '$\\det(A - \\lambda I) = (4-\\lambda)(1-\\lambda)$. Eigenwerte: $\\lambda = 4$ und $\\lambda = 1$.',
      },
      {
        id: 'p1.eigen.ex4',
        difficulty: 3,
        conceptTags: ['eigenvalue'],
        type: 'numeric',
        prompt:
          'Für $A = \\begin{pmatrix}5 & 2\\\\ 0 & 3\\end{pmatrix}$: Spur $= \\sum \\lambda_i$. Was ist die Summe der Eigenwerte?',
        answer: 8,
        hints: [
          '$\\text{Spur}(A) = \\sum_i A_{ii}$ = Summe der Diagonalelemente.',
          '$5 + 3 = ?$',
          '$= 8$.',
        ],
        explanation: '$\\text{Spur}(A) = 5 + 3 = 8 = \\lambda_1 + \\lambda_2$. Die Eigenwerte (ableitbar als $5$ und $3$) summieren zu $8$.',
      },
      {
        id: 'p1.eigen.ex5',
        difficulty: 3,
        conceptTags: ['eigenvalue', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: PCA maximiert die Varianz der projizierten Daten. Welchen Eigenvektor der Kovarianzmatrix $C$ wählt man für die erste Hauptkomponente?',
        options: [
          'Den Eigenvektor zum größten Eigenwert',
          'Den Eigenvektor zum kleinsten Eigenwert',
          'Den Eigenvektor mit der größten Länge',
          'Einen zufälligen Eigenvektor',
        ],
        answer: 'Den Eigenvektor zum größten Eigenwert',
        hints: [
          'Der Eigenwert entspricht der Varianz in Richtung des zugehörigen Eigenvektors.',
          'Größter Eigenwert → größte Varianz in dieser Richtung.',
          'Erste Hauptkomponente = Richtung größter Varianz.',
        ],
        explanation:
          'Für $C v = \\lambda v$: $\\lambda$ ist die Varianz der auf $v$ projizierten Daten. Die erste Hauptkomponente ist der EV zum größten EW — sie erklärt den meisten Datenvarianzanteil.',
      },
      {
        id: 'p1.eigen.ex6',
        difficulty: 4,
        conceptTags: ['eigenvalue', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Beim Training mit Gradient Descent gilt $\\theta_{t+1} = (I - \\eta H)\\theta_t$ (vereinfacht). Was bestimmt die Konvergenzrate?',
        options: [
          'Der größte Eigenwert von $H$ — er limitiert die Lernrate $\\eta$',
          'Der kleinste Eigenwert von $H$',
          'Die Spur von $H$',
          'Der Rang von $H$',
        ],
        answer: 'Der größte Eigenwert von $H$ — er limitiert die Lernrate $\\eta$',
        hints: [
          'Für Konvergenz muss $|1 - \\eta \\lambda_i| < 1$ für alle Eigenwerte $\\lambda_i$ gelten.',
          'Die härteste Bedingung kommt vom größten $\\lambda_{\\max}$: $\\eta < 2/\\lambda_{\\max}$.',
          'Zu große Lernrate → Divergenz entlang der Eigenvektor-Richtung zu $\\lambda_{\\max}$.',
        ],
        explanation:
          'Konvergenzbedingung: $\\eta < 2/\\lambda_{\\max}(H)$. Der größte Eigenwert der Hessischen bestimmt die maximale stabile Lernrate — daher ist Lernraten-Tuning entscheidend.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Diagonalisierung\n\nWenn $A$ $n$ linear unabhängige Eigenvektoren hat (Spalten von $P$), gilt:\n\n$A = P \\Lambda P^{-1}$\n\nwobei $\\Lambda = \\text{diag}(\\lambda_1, \\dots, \\lambda_n)$. Das macht $A^k = P \\Lambda^k P^{-1}$ trivial — z.B. für Zeitreihen, Differentialgleichungen.',
      },
      {
        kind: 'callout',
        content:
          'Neuronale Netze lernen implizit Eigenvektoren der Daten-Kovarianzmatrix. Der erste Layer eines gut trainierten Bildnetzwerks lernt häufig Gabor-Filter — das entspricht den Eigenvektoren von Bild-Korrelationsmatrizen. Visualisierungen zeigen diese Strukturen klar.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.eigen.card1',
      front: 'Definition Eigenvektor/Eigenwert?',
      back: '$Av = \\lambda v$ mit $v \\neq 0$. $\\lambda$ = Eigenwert, $v$ = Eigenvektor.',
      conceptTags: ['eigenvalue', 'eigenvector'],
    },
    {
      id: 'p1.eigen.card2',
      front: 'Wie findet man Eigenwerte?',
      back: 'Löse $\\det(A - \\lambda I) = 0$ (charakteristisches Polynom).',
      conceptTags: ['characteristic-polynomial'],
    },
    {
      id: 'p1.eigen.card3',
      front: 'PCA und Eigenwerte?',
      back: 'Hauptkomponenten = Eigenvektoren der Kovarianzmatrix; Eigenwerte = erklärte Varianz.',
      conceptTags: ['eigenvalue'],
    },
  ],

  description:
    'Eigenvektoren sind die "unveränderlichen Richtungen" einer linearen Abbildung — sie werden nur gestreckt oder gestaucht, nie gekippt. Das ist das Fundament für PCA, spektrales Clustering und die Konvergenzanalyse von Gradient Descent.',

  derivations: [
    {
      claim: 'Warum gilt $\\det(A - \\lambda I) = 0$ für Eigenwerte?',
      reasoning:
        'Gesucht: ein Vektor $v \\neq \\vec{0}$ mit $(A - \\lambda I)v = 0$. Das heißt, die Matrix $(A - \\lambda I)$ bildet $v$ auf den Nullvektor ab — sie "kollabiert" den Raum. Eine Matrix kollabiert Raum genau dann, wenn ihr Determinante null ist (sie verliert eine Dimension, mehrere Vektoren landen auf demselben Punkt). Also: $\\det(A - \\lambda I) = 0$ ist genau die Bedingung, dass ein nicht-trivialer Nullraum existiert — und damit ein Eigenvektor.',
    },
    {
      claim: 'PCA: Warum sind Eigenvektoren der Kovarianzmatrix die Hauptkomponenten?',
      reasoning:
        'Gesucht: Einheitsvektor $w$, der die projizierte Varianz $w^\\top \\Sigma w$ maximiert. Mit der Lagrange-Methode ($\\|w\\|=1$ als Nebenbedingung) ergibt sich $\\Sigma w = \\lambda w$ — das ist exakt die Eigenvektor-Gleichung. Der Lagrange-Multiplikator ist der Eigenwert $\\lambda$, und $w^\\top \\Sigma w = \\lambda$. Größter Eigenwert → größte Varianz → erste Hauptkomponente.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Eigenvektoren sind immer die Standardbasisvektoren $e_1, e_2, \\ldots$',
      correct: 'Eigenvektoren sind nur bei Diagonalmatrizen die Standardbasisvektoren',
      explanation:
        'Für eine allgemeine Matrix zeigen die Eigenvektoren in ganz andere Richtungen — das sind die "natürlichen Richtungen" dieser speziellen Abbildung, nicht die Koordinatenachsen.',
    },
    {
      wrong: 'Geometrische Vielfachheit = algebraische Vielfachheit (immer)',
      correct: 'Geometrische Vielfachheit $\\leq$ algebraische Vielfachheit',
      explanation:
        'Wenn geometrisch < algebraisch, ist die Matrix **nicht diagonalisierbar** — es gibt nicht genug linear unabhängige Eigenvektoren. Für PCA und symmetrische Matrizen (Kovarianz) ist das kein Problem, aber wichtig zu wissen.',
    },
    {
      wrong: 'Eigenwerte reeller Matrizen sind immer reell',
      correct: 'Eigenwerte können komplex sein (z.B. bei Rotationsmatrizen)',
      explanation:
        'Nur für **symmetrische** Matrizen (wie Kovarianzmatrizen) sind alle Eigenwerte garantiert reell. Das ist ein Satz (Spektralsatz) — deshalb ist PCA mathematisch sauber.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Eigenvectors and eigenvalues" (Essence of Linear Algebra, Ep. 14)',
      type: 'video',
      note: 'Beste geometrische Visualisierung; det = Volumen-Stauchung-Argument unvergesslich',
    },
    {
      title: 'MML Book (Deisenroth et al.), Kapitel 4: "Matrix Decompositions" — mml-book.github.io',
      type: 'book',
      note: 'Rigoroses ML-Mathe, kostenloser PDF; Kapitel 10 verbindet Eigenwerte mit PCA',
    },
    {
      title: '3Blue1Brown: "A quick trick for computing eigenvalues" (Ep. 15)',
      type: 'video',
      note: 'Kurzer Trick via Spur + Determinante für 2×2-Matrizen — nützlich für Hessian-Analyse',
    },
  ],
}
