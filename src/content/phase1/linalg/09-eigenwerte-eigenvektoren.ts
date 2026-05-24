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

  learningOutcome:
    'Du kannst Eigenwerte via charakteristischem Polynom berechnen, Eigenvektoren bestimmen und erklären, warum PCA genau die Eigenvektoren der Kovarianzmatrix nutzt.',

  description:
    'Eigenvektoren sind die "unveränderlichen Richtungen" einer linearen Abbildung — sie werden nur gestreckt oder gestaucht, nie gekippt. Das ist das Fundament für PCA, spektrales Clustering und die Konvergenzanalyse von Gradient Descent.',

  conceptSteps: [
    {
      title: 'Die unveränderliche Richtung',
      preprompt: 'Stell dir eine Abbildung vor, die alle Vektoren verändert. Gibt es Richtungen, die dabei erhalten bleiben?',
      body: 'Die meisten Vektoren werden durch eine Matrix **verdreht**. Aber einige besondere Richtungen werden nur **gestreckt oder gestaucht** — ihre Richtung bleibt erhalten.\n\nDas sind die **Eigenvektoren** $v$ zum **Eigenwert** $\\lambda$:\n\n$$Av = \\lambda v$$\n\nLinks: Matrix-Multiplikation (kann Richtung ändern). Rechts: reine Skalierung (Richtung bleibt).',
      visual: `<svg viewBox="0 0 260 100" width="260" height="100" aria-label="Eigenvektor bleibt auf Geraden">
        <rect x="0" y="0" width="260" height="100" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="130" y1="10" x2="130" y2="90" stroke="rgb(99 102 241)" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="10" y1="50" x2="250" y2="50" stroke="rgb(55 65 81)" stroke-width="1"/>
        <line x1="90" y1="80" x2="155" y2="20" stroke="rgb(74 222 128)" stroke-width="1.5" stroke-dasharray="4,2"/>
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(96 165 250)"/>
          </marker>
          <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(251 191 36)"/>
          </marker>
        </defs>
        <line x1="130" y1="50" x2="155" y2="25" marker-end="url(#arr)" stroke="rgb(96 165 250)" stroke-width="2"/>
        <line x1="130" y1="50" x2="172" y2="10" marker-end="url(#arr2)" stroke="rgb(251 191 36)" stroke-width="2"/>
        <text x="158" y="22" fill="rgb(96 165 250)" font-size="10">v</text>
        <text x="175" y="14" fill="rgb(251 191 36)" font-size="10">Av=λv</text>
        <text x="10" y="15" fill="rgb(156 163 175)" font-size="9">Eigenvektor bleibt auf derselben Geraden (nur länger)</text>
      </svg>`,
      miniExample: 'Für $A = \\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$: $A \\cdot \\begin{pmatrix}1\\\\0\\end{pmatrix} = 2 \\cdot \\begin{pmatrix}1\\\\0\\end{pmatrix}$ — Eigenvektor $(1,0)^T$, Eigenwert $\\lambda = 2$.',
    },
    {
      title: 'Das charakteristische Polynom',
      body: 'Wir suchen $v \\neq \\vec{0}$ mit $(A - \\lambda I)v = 0$.\n\nDas ist ein homogenes LGS. Es hat nichttriviale Lösungen **genau dann**, wenn die Matrix $(A - \\lambda I)$ singulär ist:\n\n$$\\det(A - \\lambda I) = 0$$\n\nDas **charakteristische Polynom** liefert alle Eigenwerte — die Nullstellen.',
      miniExample: 'Für $A = \\begin{pmatrix}3&1\\\\0&2\\end{pmatrix}$:\n\n$\\det\\begin{pmatrix}3-\\lambda & 1 \\\\ 0 & 2-\\lambda\\end{pmatrix} = (3-\\lambda)(2-\\lambda) = 0$\n\n$\\Rightarrow \\lambda_1 = 3, \\lambda_2 = 2$',
    },
    {
      title: 'Eigenvektoren berechnen',
      body: 'Für jeden Eigenwert $\\lambda_i$: löse $(A - \\lambda_i I)v = 0$ (Gauß-Elimination).\n\nDas Ergebnis ist ein Unterraum — der **Eigenraum** von $\\lambda_i$:\n\n$$E_{\\lambda_i} = \\ker(A - \\lambda_i I)$$\n\nJede Richtung in diesem Raum ist ein Eigenvektor.',
      miniExample: 'Für $\\lambda_1 = 3$ aus obigem Beispiel:\n\n$(A - 3I)v = \\begin{pmatrix}0&1\\\\0&-1\\end{pmatrix}v = 0 \\Rightarrow v_1 = \\begin{pmatrix}1\\\\0\\end{pmatrix}$',
    },
    {
      title: 'Spur, Determinante und Eigenwerte',
      body: 'Zwei elegante Beziehungen, die oft schneller als der Weg über das Polynom sind:\n\n$$\\text{Spur}(A) = \\sum_i \\lambda_i \\qquad \\det(A) = \\prod_i \\lambda_i$$\n\nFür $2 \\times 2$: Eigenwerte $\\lambda$ erfüllen $\\lambda^2 - \\text{Spur}(A)\\lambda + \\det(A) = 0$.\n\nDas erlaubt einen **Schnell-Trick**: $\\lambda = \\frac{m \\pm \\sqrt{m^2 - p}}{1}$ mit $m = \\frac{\\text{Spur}}{2}$, $p = \\det A$.',
      miniExample: 'Für $\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$: Spur $= 7$, Det $= 10$. Also $\\lambda^2 - 7\\lambda + 10 = 0 \\Rightarrow \\lambda = 5, 2$.',
      selfCheck: 'Warum ist $\\det A = 0$ genau dann, wenn $0$ ein Eigenwert von $A$ ist?',
    },
    {
      title: 'PCA: Warum Eigenvektoren?',
      body: 'PCA sucht die Richtung $w$ (mit $\\|w\\| = 1$), die die **projizierte Varianz** $w^\\top \\Sigma w$ maximiert.\n\nLagrange-Methode mit Nebenbedingung $\\|w\\|^2 = 1$:\n\n$$\\nabla(w^\\top \\Sigma w - \\lambda(w^\\top w - 1)) = 0 \\quad \\Rightarrow \\quad \\Sigma w = \\lambda w$$\n\nDas ist die **Eigenvektor-Gleichung**! Der Lagrange-Multiplikator ist der Eigenwert — und $w^\\top \\Sigma w = \\lambda$. Die erste Hauptkomponente ist der EV zum **größten** Eigenwert.',
      visual: `<svg viewBox="0 0 260 100" width="260" height="100" aria-label="PCA Hauptkomponente">
        <rect x="0" y="0" width="260" height="100" rx="8" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <ellipse cx="130" cy="50" rx="90" ry="35" fill="none" stroke="rgb(99 102 241)" stroke-width="1" opacity="0.5"/>
        <ellipse cx="130" cy="50" rx="60" ry="20" fill="none" stroke="rgb(99 102 241)" stroke-width="0.5" opacity="0.3"/>
        <defs>
          <marker id="pc1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(74 222 128)"/>
          </marker>
          <marker id="pc2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(248 113 113)"/>
          </marker>
        </defs>
        <line x1="40" y1="50" x2="220" y2="50" marker-end="url(#pc1)" stroke="rgb(74 222 128)" stroke-width="2.5"/>
        <line x1="130" y1="15" x2="130" y2="85" marker-end="url(#pc2)" stroke="rgb(248 113 113)" stroke-width="1.5"/>
        <text x="195" y="44" fill="rgb(74 222 128)" font-size="10">PC1 (max. Varianz)</text>
        <text x="134" y="30" fill="rgb(248 113 113)" font-size="10">PC2</text>
      </svg>`,
    },
    {
      title: 'Gradient Descent und Eigenwerte',
      body: 'Die Update-Regel $\\theta_{t+1} = (I - \\eta H)\\theta_t$ konvergiert, wenn alle Eigenwerte von $(I - \\eta H)$ betragsmäßig $< 1$ sind:\n\n$$|1 - \\eta \\lambda_i| < 1 \\quad \\forall i$$\n\nDie härteste Bedingung kommt vom größten Eigenwert $\\lambda_{\\max}$:\n\n$$\\eta < \\frac{2}{\\lambda_{\\max}(H)}$$\n\nDeshalb braucht Adam/AdaGrad weniger Tuning: sie passen $\\eta$ pro Parameter an seine lokale Krümmung an.',
      selfCheck: 'Was passiert geometrisch, wenn $\\eta > 2/\\lambda_{\\max}$? (Der Lernschritt "überspringt" das Minimum — der Algorithmus divergiert.)',
    },
  ],

  codeBridges: [
    {
      title: 'NumPy: Eigenwerte berechnen + PCA',
      lang: 'python',
      code: `import numpy as np
from sklearn.decomposition import PCA

# --- 1. Eigenwerte direkt ---
A = np.array([[3, 1],
              [0, 2]], dtype=float)

eigenvalues, eigenvectors = np.linalg.eig(A)
# eigenvalues  = [3., 2.]
# eigenvectors = Spalten sind die EVs: [[1., -1.], [0., 1.]]

# Verifikation: A @ v == lambda * v
v0 = eigenvectors[:, 0]  # EV zu lambda=3
print(np.allclose(A @ v0, eigenvalues[0] * v0))  # True

# --- 2. PCA = Eigenvektoren der Kovarianzmatrix ---
X = np.random.randn(100, 5)   # 100 Datenpunkte, 5 Features
X -= X.mean(axis=0)            # Zentrierung (wichtig!)

Sigma = (X.T @ X) / (len(X) - 1)  # Kovarianzmatrix (5x5)
vals, vecs = np.linalg.eigh(Sigma) # eigh: symmetrisch → reelle EW

# PCA via sklearn (dasselbe, aber effizient für große Daten)
pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)  # Projektion auf 2 Hauptkomponenten
print(pca.explained_variance_ratio_)  # [0.23, 0.19] — Anteil Varianz`,
      annotation: '`np.linalg.eig` gibt Eigenwerte und -vektoren zurück. Für **symmetrische** Matrizen (wie Kovarianzmatrizen) ist `eigh` stabiler und garantiert reelle Werte. `PCA(n_components=k)` wählt intern die $k$ Eigenvektoren zum größten Eigenwert — identisch zum manuellen $\\Sigma w = \\lambda w$-Ansatz, aber numerisch optimiert (SVD statt eig).',
    },
  ],

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

  crossLinks: [
    {
      lessonId: 'p1.determinante',
      relation: 'requires',
      hint: 'Das charakteristische Polynom $\\det(A - \\lambda I) = 0$ setzt Kenntnisse der Determinante voraus.',
    },
    {
      lessonId: 'p1.spektraltheorem',
      relation: 'extends',
      hint: 'Der Spektralsatz sichert für **symmetrische** Matrizen orthogonale Eigenvektoren — das Fundament von PCA.',
    },
    {
      lessonId: 'p1.svd',
      relation: 'extends',
      hint: 'SVD verallgemeinert Eigenwerte auf nicht-quadratische Matrizen — Singular Values statt Eigenwerte.',
    },
    {
      lessonId: 'p1.kovarianz-multivariate-gauss',
      relation: 'see-also',
      hint: 'Kovarianzmatrizen sind symmetrisch positiv semidefinit — ihre Eigenwerte sind die Varianzen in Hauptrichtungen.',
    },
  ],

  reflection: 'Eigenvektoren zeigen die "natürlichen Richtungen" einer Abbildung — Richtungen, die nur gestreckt, nie gedreht werden. Dieselbe Idee steckt in PCA (maximale Varianz-Richtung), SVD (Singulärwerte), und der Konvergenzanalyse von Gradient Descent. **Welcher Zusammenhang hat dich am meisten überrascht — PCA, Gradient Descent, oder das det = 0 Argument?**',
}
