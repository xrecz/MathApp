import type { Lesson } from '../../../types'

export const kovarianzMultivariateGauss: Lesson = {
  id: 'p1.kovarianz-multivariate-gauss',
  title: 'Kovarianz & Multivariate Gauß',
  conceptTags: ['covariance', 'correlation', 'multivariate-gaussian', 'covariance-matrix'],
  estimatedMinutes: 17,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Kovarianz und multivariate Normalverteilung\n\n**Kovarianz**: $\\text{Cov}(X, Y) = E[(X-\\mu_X)(Y-\\mu_Y)] = E[XY] - \\mu_X \\mu_Y$\n\n**Korrelation**: $\\rho(X,Y) = \\frac{\\text{Cov}(X,Y)}{\\text{SD}(X)\\cdot\\text{SD}(Y)} \\in [-1, 1]$\n\n**Kovarianzmatrix**: $\\Sigma_{ij} = \\text{Cov}(X_i, X_j)$ — symmetrisch, positiv semidefinit.\n\n**Multivariate Gaußverteilung**: $\\mathbf{X} \\sim \\mathcal{N}(\\boldsymbol{\\mu}, \\Sigma)$\n$$f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{d/2}|\\Sigma|^{1/2}}\\exp\\!\\left(-\\frac{1}{2}(\\mathbf{x}-\\boldsymbol{\\mu})^T\\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})\\right)$$',
      },
      {
        kind: 'math',
        content:
          '<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px">\n  <text x="5" y="14" font-size="10" fill="#6366f1">Korrelation: ρ ≈ 0,8</text>\n  <line x1="20" y1="110" x2="150" y2="110" stroke="#888" stroke-width="1"/>\n  <line x1="20" y1="110" x2="20" y2="20" stroke="#888" stroke-width="1"/>\n  <circle cx="35" cy="95" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <circle cx="45" cy="85" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <circle cx="55" cy="78" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <circle cx="65" cy="70" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <circle cx="75" cy="63" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <circle cx="85" cy="55" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <circle cx="95" cy="50" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <circle cx="105" cy="42" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <circle cx="115" cy="38" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <circle cx="125" cy="30" r="2.5" fill="#6366f1" opacity="0.7"/>\n  <line x1="28" y1="100" x2="138" y2="25" stroke="#10b981" stroke-width="1.5" opacity="0.8"/>\n  <text x="10" y="124" font-size="9" fill="#888">X₁</text>\n  <text x="160" y="14" font-size="10" fill="#f59e0b">Bivariate Gauß-Kontur</text>\n  <line x1="160" y1="110" x2="310" y2="110" stroke="#888" stroke-width="1"/>\n  <line x1="235" y1="110" x2="235" y2="20" stroke="#888" stroke-width="1"/>\n  <ellipse cx="235" cy="65" rx="55" ry="30" stroke="#f59e0b" stroke-width="1.5" fill="none" transform="rotate(-30 235 65)"/>\n  <ellipse cx="235" cy="65" rx="35" ry="18" stroke="#f59e0b" stroke-width="1.5" fill="none" opacity="0.7" transform="rotate(-30 235 65)"/>\n  <ellipse cx="235" cy="65" rx="15" ry="8" stroke="#f59e0b" stroke-width="1.5" fill="none" opacity="0.5" transform="rotate(-30 235 65)"/>\n  <circle cx="235" cy="65" r="2" fill="#f59e0b"/>\n</svg>',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Die Kovarianzmatrix $\\Sigma$ taucht überall auf — in PCA (Eigenvektoren von $\\Sigma$), in der multivariaten Gauß-Verteilung (Prior in Bayesianischen Netzen, Gauss-Prozesse), in der Mahalanobis-Distanz $d = \\sqrt{(x-\\mu)^T \\Sigma^{-1} (x-\\mu)}$.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Interpretation von $\\rho$\n\n$\\rho = 1$: perfekt positiv linear. $\\rho = -1$: perfekt negativ. $\\rho = 0$: linear unkorreliert (aber nicht unbedingt unabhängig!).\n\n### Kovarianzmatrix — Eigenschaften\n\n$\\Sigma$ ist **symmetrisch** ($\\Sigma = \\Sigma^T$, da $\\text{Cov}(X_i, X_j) = \\text{Cov}(X_j, X_i)$).\n\n$\\Sigma$ ist **positiv semidefinit** ($v^T \\Sigma v \\geq 0$ für alle $v$).\n\n$\\Sigma_{ii} = \\text{Var}(X_i)$ (Diagonale = Varianzen).\n\n### Mahalanobis-Distanz\n\n$$d_M(\\mathbf{x}) = \\sqrt{(\\mathbf{x}-\\boldsymbol{\\mu})^T \\Sigma^{-1} (\\mathbf{x}-\\boldsymbol{\\mu})}$$\n\nNormiert nach Varianz und Korrelation — robuster als euklidische Distanz.',
      },
      {
        kind: 'worked-example',
        content:
          '**PCA und Kovarianzmatrix**:\n\nDaten $X \\in \\mathbb{R}^{n \\times d}$, zentriert. Kovarianzmatrix $\\Sigma = \\frac{1}{n-1}X^TX$.\n\nPCA = Eigenvektoren von $\\Sigma$ (Principal Components).\n\nGroße Eigenwerte → Richtungen mit hoher Varianz.\n\nEigenvektoren von $\\Sigma$ sind orthogonal (Spektraltheorem, Phase 1 LinAlg!) → Hauptkomponenten dekorrelieren die Daten: $\\text{Cov}(Z_i, Z_j) = 0$ für $i \\neq j$.',
      },
    ],
    practice: [
      {
        id: 'p1.kov.ex1',
        difficulty: 1,
        conceptTags: ['covariance'],
        type: 'mc',
        prompt: '$\\text{Cov}(X, Y) = 6$, $\\text{SD}(X) = 3$, $\\text{SD}(Y) = 4$. Was ist die Korrelation $\\rho$?',
        options: ['$0{,}5$', '$0{,}75$', '$2$', '$1{,}5$'],
        answer: '$0{,}5$',
        hints: [
          '$\\rho = \\text{Cov}(X,Y) / (\\text{SD}(X) \\cdot \\text{SD}(Y))$.',
          '$\\rho = 6 / (3 \\cdot 4) = 6/12$.',
          '$\\rho = 0{,}5$.',
        ],
        explanation:
          '$\\rho = 6 / (3 \\cdot 4) = 0{,}5$. Moderate positive Korrelation.',
      },
      {
        id: 'p1.kov.ex2',
        difficulty: 1,
        conceptTags: ['correlation'],
        type: 'mc',
        prompt: '$\\text{Cov}(X, X) = ?$',
        options: ['$\\text{Var}(X)$', '$0$', '$\\rho(X,X)$', '$\\text{SD}(X)$'],
        answer: '$\\text{Var}(X)$',
        hints: [
          '$\\text{Cov}(X, X) = E[(X-\\mu)(X-\\mu)] = E[(X-\\mu)^2]$.',
          'Das ist per Definition die Varianz.',
          'Kovarianz mit sich selbst = Varianz.',
        ],
        explanation:
          '$\\text{Cov}(X,X) = E[(X-\\mu)^2] = \\text{Var}(X)$. Die Diagonale der Kovarianzmatrix enthält die Varianzen.',
      },
      {
        id: 'p1.kov.ex3',
        difficulty: 2,
        conceptTags: ['covariance-matrix'],
        type: 'mc',
        prompt: 'Welche Eigenschaft hat eine Kovarianzmatrix $\\Sigma$ immer?',
        options: [
          'Symmetrisch und positiv semidefinit',
          'Diagonal',
          'Positiv definit',
          'Orthogonal',
        ],
        answer: 'Symmetrisch und positiv semidefinit',
        hints: [
          '$\\Sigma_{ij} = \\text{Cov}(X_i, X_j) = \\text{Cov}(X_j, X_i) = \\Sigma_{ji}$ → symmetrisch.',
          '$v^T \\Sigma v = \\text{Var}(v^T X) \\geq 0$ → PSD.',
          'Nicht notwendigerweise diagonal oder PD.',
        ],
        explanation:
          '$\\Sigma$ ist symmetrisch (da $\\text{Cov}$ symmetrisch) und PSD (da $\\text{Var} \\geq 0$). Nicht unbedingt PD — z. B. wenn Features linear abhängig.',
      },
      {
        id: 'p1.kov.ex4',
        difficulty: 3,
        conceptTags: ['multivariate-gaussian'],
        type: 'mc',
        prompt:
          'Multivariate Gauß $\\mathcal{N}(\\boldsymbol{\\mu}, \\Sigma)$ mit $\\Sigma = \\begin{pmatrix}1 & 0\\\\ 0 & 1\\end{pmatrix}$. Was bedeutet das geometrisch?',
        options: [
          'Kreisförmige Konturlinien — $X_1$ und $X_2$ sind unkorreliert und haben gleiche Varianz',
          'Elliptische Konturlinien mit starker Korrelation',
          'Lineare Abhängigkeit zwischen $X_1$ und $X_2$',
          'Gleiche Mittelwerte für $X_1$ und $X_2$',
        ],
        answer: 'Kreisförmige Konturlinien — $X_1$ und $X_2$ sind unkorreliert und haben gleiche Varianz',
        hints: [
          '$\\Sigma = I$ → $\\text{Var}(X_1) = \\text{Var}(X_2) = 1$, $\\text{Cov}(X_1, X_2) = 0$.',
          'Keine Korrelation + gleiche Varianz → Kreis.',
          'Schräge Ellipsen entstehen durch Kovarianz $\\neq 0$.',
        ],
        explanation:
          '$\\Sigma = I$ → $X_1 \\perp X_2$ mit Varianz 1. Konturlinien der bivariaten Gauß sind Kreise. Allgemein: Ellipsen, deren Achsen den Eigenvektoren von $\\Sigma$ entsprechen.',
      },
      {
        id: 'p1.kov.ex5',
        difficulty: 3,
        conceptTags: ['covariance', 'covariance-matrix'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: PCA berechnet Eigenvektoren von $\\Sigma = \\frac{1}{n-1}X^TX$. Was liefern große Eigenwerte?',
        options: [
          'Richtungen mit maximaler Datenvarianz — erste Hauptkomponente maximiert erklärte Varianz',
          'Richtungen mit minimaler Varianz — rauschärmste Merkmale',
          'Mittelwerte der Features',
          'Korrelationen zwischen Features',
        ],
        answer:
          'Richtungen mit maximaler Datenvarianz — erste Hauptkomponente maximiert erklärte Varianz',
        hints: [
          'Eigenwert $\\lambda_i$ = Varianz in Richtung $v_i$ (Eigenvektor).',
          'Großer Eigenwert → viel Varianz in dieser Richtung.',
          'PC1 = Richtung maximaler Varianz.',
        ],
        explanation:
          'Eigenwert $\\lambda_i$ von $\\Sigma$ = Varianz der Projektion auf Eigenvektor $v_i$. PC1 hat größten Eigenwert → maximale Varianz. PCA wählt die $k$ Eigenvektoren mit größten Eigenwerten.',
      },
      {
        id: 'p1.kov.ex6',
        difficulty: 4,
        conceptTags: ['multivariate-gaussian', 'covariance-matrix'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Mahalanobis-Distanz $d_M = \\sqrt{(x-\\mu)^T \\Sigma^{-1} (x-\\mu)}$. Warum ist sie robuster als euklidische Distanz?',
        options: [
          'Sie normiert nach Kovarianzstruktur — Features mit hoher Varianz werden nicht übermäßig gewichtet, korrelierte Features doppelt gezählt',
          'Sie ist immer kleiner als die euklidische Distanz',
          'Sie funktioniert nur für unkorrelierte Daten',
          'Sie ist einfacher zu berechnen',
        ],
        answer:
          'Sie normiert nach Kovarianzstruktur — Features mit hoher Varianz werden nicht übermäßig gewichtet, korrelierte Features doppelt gezählt',
        hints: [
          '$\\Sigma^{-1}$ \"whitenet\" die Daten: dekorreliert und normiert auf Einheitsvarianz.',
          'Für $\\Sigma = I$: Mahalanobis = euklidisch.',
          'Hohe Varianz in Feature $i$ → $\\Sigma_{ii}$ groß → $\\Sigma^{-1}_{ii}$ klein → weniger Gewicht.',
        ],
        explanation:
          '$d_M$ transformiert in einen unkorrelierten, normierten Raum. Features mit hoher Varianz werden weniger gewichtet (nicht übermäßig dominant). Korrelationen werden berücksichtigt.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Kovarianzmatrix in PyTorch\n\n```python\nimport torch\n\n# Stichproben-Kovarianzmatrix (n×d Daten)\nX_centered = X - X.mean(dim=0)\nSigma = X_centered.T @ X_centered / (X.shape[0] - 1)\n\n# PCA via Eigenwertzerlegung\neigvals, eigvecs = torch.linalg.eigh(Sigma)  # PSD → eigh statt eig\n# Eigenvektoren sortiert nach aufsteigendem Eigenwert\npc = eigvecs[:, -1]  # PC1 (größter Eigenwert)\n\n# Oder direkt via SVD (effizienter):\nU, S, Vt = torch.linalg.svd(X_centered)\n# Hauptkomponenten = Zeilen von Vt\n```',
      },
      {
        kind: 'callout',
        content:
          'Gauss-Prozesse (GP) verallgemeinern die multivariate Gauß auf unendlich-dimensionale Verteilungen über Funktionen. Jeder Satz von $n$ Funktionswerten folgt $\\mathcal{N}(\\boldsymbol{\\mu}, K)$ mit Kovarianzmatrix $K$ aus einer Kernel-Funktion. GPs sind Gaußmodell + Spektraltheorem + PSD-Kovarianz.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.kov.card1',
      front: 'Was ist die Kovarianzmatrix $\\Sigma$?',
      back: '$\\Sigma_{ij} = \\text{Cov}(X_i, X_j)$. Diagonal: Varianzen. Symmetrisch, PSD.',
      conceptTags: ['covariance-matrix'],
    },
    {
      id: 'p1.kov.card2',
      front: 'Was liefert PCA mit der Kovarianzmatrix?',
      back: 'Eigenvektoren = Richtungen maximaler Varianz. Eigenwerte = Varianzen in diesen Richtungen.',
      conceptTags: ['covariance'],
    },
    {
      id: 'p1.kov.card3',
      front: 'Multivariate Gauß $\\mathcal{N}(\\mu, \\Sigma)$ — Form der Konturlinien?',
      back: 'Ellipsen, ausgerichtet entlang Eigenvektoren von $\\Sigma$. Achsenlänge proportional zu $\\sqrt{\\text{Eigenwert}}$.',
      conceptTags: ['multivariate-gaussian'],
    },
  ],
}
