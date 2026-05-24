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

  learningOutcome:
    'Du kannst die Kovarianzmatrix berechnen und interpretieren, die multivariate Normalverteilung $\\mathcal{N}(\\boldsymbol{\\mu}, \\Sigma)$ geometrisch verstehen und erklären, warum PCA die Eigenwertzerlegung der Kovarianzmatrix nutzt.',

  description:
    'Kovarianz beschreibt den linearen Zusammenhang zwischen zwei Zufallsvariablen. Die Kovarianzmatrix fasst alle paarweisen Beziehungen eines Vektors zusammen und ist das Herzstück von PCA, multivariater Normalverteilung und Gauss-Prozessen.',

  conceptSteps: [
    {
      title: 'Kovarianz — Zusammenhang zweier Variablen',
      preprompt: 'Körpergröße und Gewicht: wenn jemand größer ist, ist er tendenziell schwerer. Wie misst man diesen "Zusammenhang" mathematisch?',
      body: 'Die **Kovarianz** $\\text{Cov}(X, Y)$ misst den linearen Zusammenhang zwischen zwei ZVn:\n\n$$\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mu_X)(Y - \\mu_Y)]$$\n\nVereinfacht: $\\text{Cov}(X, Y) = \\mathbb{E}[XY] - \\mu_X \\mu_Y$\n\n- $> 0$: tendieren zusammen zu steigen\n- $< 0$: gegenläufige Bewegung\n- $= 0$: **linear unkorreliert** (aber nicht notwendigerweise unabhängig!)',
      miniExample: '$\\text{Cov}(X, X) = \\mathbb{E}[(X-\\mu)^2] = \\text{Var}(X)$ — die Kovarianz einer ZV mit sich selbst ist ihre Varianz.',
      selfCheck: 'Kann $\\text{Cov}(X,Y) = 0$ gelten, obwohl $X$ und $Y$ abhängig sind? (Ja — $Y = X^2$ ist abhängig von $X$, aber unkorrleliert für symmetrische $X$.)',
    },
    {
      title: 'Kovarianzmatrix $\\Sigma$',
      body: 'Für einen $d$-dimensionalen Zufallsvektor $\\mathbf{X} = (X_1, \\ldots, X_d)^\\top$ fasst die **Kovarianzmatrix** alle paarweisen Kovarianzen zusammen:\n\n$$\\Sigma_{ij} = \\text{Cov}(X_i, X_j) \\qquad \\Rightarrow \\qquad \\Sigma \\in \\mathbb{R}^{d \\times d}$$\n\nAls Matrix-Ausdruck: $\\Sigma = \\mathbb{E}[(\\mathbf{X} - \\boldsymbol{\\mu})(\\mathbf{X} - \\boldsymbol{\\mu})^\\top]$\n\n**Diagonale**: $\\Sigma_{ii} = \\text{Var}(X_i)$\n\n**Stichproben-Schätzer** für zentrierte Daten $X \\in \\mathbb{R}^{n \\times d}$:\n$$\\hat{\\Sigma} = \\frac{1}{n-1} X^\\top X$$',
      miniExample: 'Für $\\mathbf{X} = (X_1, X_2)$: $\\Sigma = \\begin{pmatrix}\\text{Var}(X_1) & \\text{Cov}(X_1,X_2) \\\\ \\text{Cov}(X_1,X_2) & \\text{Var}(X_2)\\end{pmatrix}$',
    },
    {
      title: 'Eigenschaften von $\\Sigma$ (PSD, symmetrisch)',
      body: 'Die Kovarianzmatrix hat zwei fundamentale Eigenschaften:\n\n**Symmetrisch**: $\\Sigma = \\Sigma^\\top$ (da $\\text{Cov}(X_i, X_j) = \\text{Cov}(X_j, X_i)$)\n\n**Positiv semidefinit (PSD)**: $v^\\top \\Sigma v \\geq 0$ für alle $v$\n\n**Beweis**: $v^\\top \\Sigma v = \\text{Var}(v^\\top \\mathbf{X}) \\geq 0$ — Varianz ist immer nicht-negativ.\n\nFolgen: Eigenwerte $\\geq 0$; invertierbar (PD) wenn keine lineare Abhängigkeit zwischen Features; Spektralsatz: orthogonale Eigenvektoren.',
      selfCheck: 'Wann ist $\\Sigma$ nicht invertierbar? (Wenn zwei Features perfekt linear abhängig sind — dann ist Rang von $\\Sigma$ < $d$, und $\\Sigma$ ist singulär.)',
    },
    {
      title: 'Multivariate Normalverteilung',
      body: 'Die **multivariate Normalverteilung** $\\mathbf{X} \\sim \\mathcal{N}(\\boldsymbol{\\mu}, \\Sigma)$:\n\n$$f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{d/2}|\\Sigma|^{1/2}} \\exp\\!\\left(-\\frac{1}{2}(\\mathbf{x} - \\boldsymbol{\\mu})^\\top \\Sigma^{-1}(\\mathbf{x} - \\boldsymbol{\\mu})\\right)$$\n\nDer Term $(\\mathbf{x} - \\boldsymbol{\\mu})^\\top \\Sigma^{-1}(\\mathbf{x} - \\boldsymbol{\\mu})$ ist die **Mahalanobis-Distanz²** — er berücksichtigt Kovarianzstruktur.\n\n**Sonderfall**: $\\Sigma = I$ → Konturlinien sind Kreise → $\\mathcal{N}(\\boldsymbol{\\mu}, I) = $ unabhängige univariate Normalverteilungen.',
    },
    {
      title: 'Geometrie: Ellipsen und Eigenvektoren',
      body: 'Konturlinien von $\\mathcal{N}(\\boldsymbol{\\mu}, \\Sigma)$ sind **Ellipsen**:\n\n$$\\{\\mathbf{x} : (\\mathbf{x}-\\boldsymbol{\\mu})^\\top \\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu}) = c\\}$$\n\nDie Ellipsen-Achsen entsprechen den **Eigenvektoren** von $\\Sigma$.\n\nDie Achsenlängen sind proportional zu $\\sqrt{\\lambda_i}$ (Quadratwurzel des Eigenwerts).',
      visual: `<svg viewBox="0 0 300 110" width="300" height="110" aria-label="Gauss Ellipsen verschiedene Korrelationen">
        <rect x="0" y="0" width="300" height="110" rx="6" fill="rgb(17 24 39)" stroke="rgb(55 65 81)" stroke-width="1"/>
        <text x="8" y="12" fill="rgb(156 163 175)" font-size="8">ρ = 0 (Kreis)</text>
        <ellipse cx="50" cy="60" rx="32" ry="32" stroke="rgb(99 102 241)" stroke-width="1.5" fill="none"/>
        <ellipse cx="50" cy="60" rx="18" ry="18" stroke="rgb(99 102 241)" stroke-width="1" fill="none" opacity="0.6"/>
        <circle cx="50" cy="60" r="2" fill="rgb(99 102 241)"/>
        <text x="108" y="12" fill="rgb(156 163 175)" font-size="8">ρ &gt; 0 (diagonal)</text>
        <ellipse cx="150" cy="60" rx="38" ry="20" stroke="rgb(16 185 129)" stroke-width="1.5" fill="none" transform="rotate(-35 150 60)"/>
        <ellipse cx="150" cy="60" rx="22" ry="11" stroke="rgb(16 185 129)" stroke-width="1" fill="none" opacity="0.6" transform="rotate(-35 150 60)"/>
        <circle cx="150" cy="60" r="2" fill="rgb(16 185 129)"/>
        <text x="208" y="12" fill="rgb(156 163 175)" font-size="8">ρ &lt; 0 (anti-diagonal)</text>
        <ellipse cx="250" cy="60" rx="38" ry="20" stroke="rgb(251 191 36)" stroke-width="1.5" fill="none" transform="rotate(35 250 60)"/>
        <ellipse cx="250" cy="60" rx="22" ry="11" stroke="rgb(251 191 36)" stroke-width="1" fill="none" opacity="0.6" transform="rotate(35 250 60)"/>
        <circle cx="250" cy="60" r="2" fill="rgb(251 191 36)"/>
      </svg>`,
      miniExample: '$\\Sigma = \\begin{pmatrix}1 & 0 \\\\ 0 & 1\\end{pmatrix}$: Kreis. $\\Sigma = \\begin{pmatrix}2 & 1 \\\\ 1 & 1\\end{pmatrix}$: Ellipse mit positiver Korrelation.',
    },
    {
      title: 'ML: PCA als Eigenwerte der Kovarianzmatrix',
      body: '**PCA** (Principal Component Analysis) sucht die Richtungen maximaler Varianz:\n\n$$\\underbrace{\\text{maximiere}}_{\\|w\\|=1} \\; w^\\top \\Sigma w \\quad \\xrightarrow{\\text{Lagrange}} \\quad \\Sigma w = \\lambda w$$\n\nDas ist exakt die Eigenvektor-Gleichung! Größter Eigenwert → erste Hauptkomponente.\n\n**Feature-Dekorrelation**: Nach PCA-Transformation sind Features unkorreliert:\n$$\\text{Cov}(Z_i, Z_j) = 0 \\text{ für } i \\neq j$$\n\nDas erklärt Batch Normalization + Whitening in modernen Architekturen.',
      selfCheck: 'Was bedeutet es, dass PCA-Features dekorreliert sind? (Die transformierten Features sind linear unabhängig — Kovarianzmatrix wird diagonal.)',
    },
  ],

  codeBridges: [
    {
      title: 'NumPy Kovarianzmatrix; sklearn PCA; torch.distributions.MultivariateNormal',
      lang: 'python',
      code: `import numpy as np
import torch
from torch.distributions import MultivariateNormal
from sklearn.decomposition import PCA

# --- Stichproben-Kovarianzmatrix ---
np.random.seed(42)
n, d = 200, 3
X = np.random.randn(n, d)
X[:, 1] = 0.8 * X[:, 0] + 0.2 * np.random.randn(n)  # Feature 1 korreliert mit 0

X_centered = X - X.mean(axis=0)                  # Zentrierung (wichtig!)
Sigma = X_centered.T @ X_centered / (n - 1)      # (d×d) Kovarianzmatrix
print("Kovarianzmatrix:")
print(Sigma.round(2))  # Sigma[0,1] ≈ 0.8 × var(X[:,0])

# --- PCA = Eigenwerte von Sigma ---
eigvals, eigvecs = np.linalg.eigh(Sigma)  # eigh: symmetrisch → reelle EW
# eigvecs[:, i] = i-ter Eigenvektor (Spalten!)
# Sortieren: aufsteigend → umkehren für absteigende Varianz
idx = np.argsort(eigvals)[::-1]
eigvals, eigvecs = eigvals[idx], eigvecs[:, idx]
print(f"Erkläre Varianz: {eigvals / eigvals.sum()}")  # [0.6x, 0.2x, 0.1x]

# sklearn PCA (verwendet SVD intern — effizienter)
pca = PCA(n_components=2)
Z = pca.fit_transform(X_centered)  # (n, 2) transformierte Features
print(f"Erklärte Varianz: {pca.explained_variance_ratio_}")

# --- Multivariate Normalverteilung in Torch ---
mu = torch.zeros(2)
Sigma_torch = torch.tensor([[2.0, 1.0], [1.0, 1.0]])  # positive Korrelation

dist = MultivariateNormal(loc=mu, covariance_matrix=Sigma_torch)
samples = dist.sample((1000,))             # 1000 Samples aus N(μ, Σ)
log_p = dist.log_prob(samples[:5])         # Log-Dichte (für Likelihood)

# Mahalanobis-Distanz
x_test = torch.tensor([2.0, 1.0])
mahal_sq = ((x_test - mu) @ Sigma_torch.inverse() @ (x_test - mu))
print(f"Mahalanobis²: {mahal_sq:.2f}")`,
      annotation: '`np.linalg.eigh` (nicht `eig`) für symmetrische Matrizen: numerisch stabiler und garantiert reelle Eigenwerte. PCA nutzt intern SVD ($X = U S V^\\top$) statt Eigenwertzerlegung — effizienter für hohe Dimensionen. `MultivariateNormal` erwartet eine PSD-Kovarianzmatrix — nicht-PSD würde Fehler werfen.',
    },
  ],

  derivations: [
    {
      claim: 'Kovarianzmatrix ist positiv semidefinit',
      reasoning:
        'Für beliebiges $v \\in \\mathbb{R}^d$: $v^\\top \\Sigma v = v^\\top \\mathbb{E}[(\\mathbf{X}-\\boldsymbol{\\mu})(\\mathbf{X}-\\boldsymbol{\\mu})^\\top] v = \\mathbb{E}[v^\\top (\\mathbf{X}-\\boldsymbol{\\mu})(\\mathbf{X}-\\boldsymbol{\\mu})^\\top v] = \\mathbb{E}[\\|v^\\top (\\mathbf{X}-\\boldsymbol{\\mu})\\|^2] \\geq 0$, da Quadrate nicht-negativ sind.',
    },
    {
      claim: 'PCA-Richtungen sind Eigenvektoren von $\\Sigma$',
      reasoning:
        'Maximierungsproblem: $\\max_{\\|w\\|=1} w^\\top \\Sigma w$. Lagrange: $\\mathcal{L}(w, \\lambda) = w^\\top \\Sigma w - \\lambda(w^\\top w - 1)$. Ableitung: $\\nabla_w \\mathcal{L} = 2\\Sigma w - 2\\lambda w = 0 \\Rightarrow \\Sigma w = \\lambda w$. Das ist die Eigenvektor-Gleichung. Der Lagrange-Multiplikator $\\lambda = w^\\top \\Sigma w$ ist die projizierte Varianz. Größter Eigenwert → größte Varianz → erste Hauptkomponente.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Unkorreliertheit ($\\text{Cov}=0$) bedeutet Unabhängigkeit',
      correct: 'Unabhängigkeit impliziert Unkorreliertheit, aber nicht umgekehrt',
      explanation:
        'Klassisches Gegenbeispiel: $X \\sim \\mathcal{N}(0,1)$, $Y = X^2$. Dann $\\text{Cov}(X,Y) = 0$ (wegen Symmetrie von $\\mathcal{N}$), aber $Y$ hängt vollständig von $X$ ab. Nur für multivariate Normalverteilung gilt: unkorreliert ⟺ unabhängig.',
    },
    {
      wrong: 'Kovarianzmatrix ist immer positiv definit',
      correct: 'Kovarianzmatrix ist positiv **semi**definit — kann singuläre Eigenwerte haben',
      explanation:
        'Wenn $d > n$ (mehr Features als Datenpunkte) oder Features linear abhängig sind, ist $\\Sigma$ singulär (Rang $< d$) → nicht invertierbar. Regularisierung $(\\Sigma + \\epsilon I)$ löst das für numerische Stabilität.',
    },
    {
      wrong: 'PCA dekorreliert Features vollständig (macht sie unabhängig)',
      correct: 'PCA macht Features **linear unkorreliert** ($\\text{Cov}=0$), aber nicht notwendigerweise unabhängig',
      explanation:
        'Nach PCA-Transformation gilt $\\text{Cov}(Z_i, Z_j) = 0$. Für normalverteilte Daten impliziert das Unabhängigkeit. Für nicht-normalverteilte Daten kann nichtlineare Abhängigkeit bestehen.',
    },
  ],

  furtherResources: [
    {
      title: 'StatQuest: "PCA Step-by-Step" (YouTube)',
      type: 'video',
      note: 'Schrittweise PCA-Herleitung via Kovarianzmatrix und Eigenvektoren',
    },
    {
      title: 'MML Book, Kapitel 10: "Dimensionality Reduction with Principal Component Analysis"',
      type: 'book',
      note: 'Komplette PCA-Herleitung mit Kovarianzmatrix; kostenloser PDF auf mml-book.github.io',
    },
    {
      title: '3Blue1Brown: "A 2016 ICML talk — PCA as optimization" (YouTube)',
      type: 'video',
      note: 'Geometrische Sicht auf Kovarianzellipsen und Eigenvektoren',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.erwartungswert-varianz',
      relation: 'requires',
      hint: 'Varianz und Kovarianz sind Erwartungswert-Ausdrücke — Lektion 05 legt das Fundament.',
    },
    {
      lessonId: 'p1.eigenwerte-eigenvektoren',
      relation: 'requires',
      hint: 'PCA nutzt die Eigenwertzerlegung der Kovarianzmatrix — Lektion p1.eigenwerte-eigenvektoren.',
    },
    {
      lessonId: 'p1.spektraltheorem',
      relation: 'see-also',
      hint: 'Spektralsatz garantiert orthogonale Eigenvektoren für $\\Sigma$ (symmetrisch) — Basis der PCA-Geometrie.',
    },
    {
      lessonId: 'p1.map-regularisierung-bias-variance',
      relation: 'see-also',
      hint: 'Gauß-Prior auf Gewichten entspricht multivariater Normalverteilung — Kovarianzstruktur bestimmt Regularisierungsform.',
    },
  ],

  reflection: 'Die Kovarianzmatrix ist das Bindeglied zwischen Statistik, linearer Algebra und ML. PCA, Gauß-Prozesse, multivariate Regression, Mahalanobis-Distanz — alle beruhen auf $\\Sigma$. **Was hat dich mehr überrascht: dass PCA direkt aus dem Maximierungsproblem auf $\\Sigma$ folgt, oder die geometrische Ellipsen-Interpretation?**',
}
