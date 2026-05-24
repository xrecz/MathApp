import type { Lesson } from '../../../types'

export const mapRegularisierungBiasVariance: Lesson = {
  id: 'p1.map-regularisierung-bias-variance',
  title: 'MAP, Regularisierung & Bias-Varianz',
  conceptTags: ['map', 'regularization', 'l2', 'l1', 'bias-variance', 'overfitting'],
  estimatedMinutes: 20,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## MAP, Regularisierung & Bias-Varianz-Dilemma\n\n**MAP-Schätzung** (Maximum A Posteriori):\n$$\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta \\underbrace{P(D \\mid \\theta)}_{\\text{Likelihood}} \\cdot \\underbrace{P(\\theta)}_{\\text{Prior}}$$\n\n**Regularisierte Log-Likelihood**:\n$$\\arg\\max_\\theta \\sum_i \\ln P(x_i \\mid \\theta) + \\ln P(\\theta)$$\n\n- **Gauß-Prior** $P(\\theta) \\propto e^{-\\|\\theta\\|^2/2\\tau^2}$ → **L2-Regularisierung** ($\\lambda\\|\\theta\\|^2$)\n- **Laplace-Prior** $P(\\theta) \\propto e^{-|\\theta|/b}$ → **L1-Regularisierung** ($\\lambda\\|\\theta\\|_1$)',
      },
      {
        kind: 'math',
        content:
          '$$\\underbrace{\\mathcal{L}_{\\text{MAP}}(\\theta)}_{\\text{reg. Loss}} = \\underbrace{-\\sum_i \\ln P(x_i\\mid\\theta)}_{\\text{NLL/CE/MSE}} + \\underbrace{\\lambda\\|\\theta\\|^2}_{\\text{L2 (Ridge)}} \\quad \\text{oder} \\quad + \\underbrace{\\lambda\\|\\theta\\|_1}_{\\text{L1 (Lasso)}}$$\n\n$$\\text{Bias-Varianz: } E[(y-\\hat{f})^2] = \\text{Bias}^2[\\hat{f}] + \\text{Var}[\\hat{f}] + \\sigma^2$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Kernpunkt**: L2-Regularisierung **ist** MAP mit Gauß-Prior. L1-Regularisierung **ist** MAP mit Laplace-Prior. Regularisierungsstärke $\\lambda = 1/\\tau^2$ kontrolliert den Bias-Varianz-Trade-off: großes $\\lambda$ → hoher Bias, niedrige Varianz (Underfitting); kleines $\\lambda$ → niedriger Bias, hohe Varianz (Overfitting).',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### L2 vs. L1 — Geometrie\n\n**L2 (Ridge)**: $\\|\\theta\\|^2 = \\sum_j \\theta_j^2$ — kreisförmige Constraint-Region. Shrinks alle Gewichte, eliminiert kaum Gewichte.\n\n**L1 (Lasso)**: $\\|\\theta\\|_1 = \\sum_j |\\theta_j|$ — rautenförmige Constraint-Region. Fördert **Sparsität** — viele Gewichte genau 0.\n\n### Bias-Varianz-Dekomposition\n\nFür Schätzer $\\hat{f}$ (trainiertes Modell):\n\n$\\text{Bias}[\\hat{f}(x)] = E[\\hat{f}(x)] - f(x)$ — systematische Abweichung.\n\n$\\text{Var}[\\hat{f}(x)] = E[(\\hat{f}(x) - E[\\hat{f}(x)])^2]$ — Instabilität über Trainingssets.\n\nRegularisierung erhöht Bias, reduziert Varianz → optimaler Kompromiss via Cross-Validation.',
      },
      {
        kind: 'worked-example',
        content:
          '**L2-Regularisierung in linearer Regression (Ridge)**:\n\n$\\mathcal{L}(w) = \\|Xw - y\\|^2 + \\lambda\\|w\\|^2$\n\nGeschlossene Lösung: $w^* = (X^TX + \\lambda I)^{-1} X^T y$\n\n$\\lambda = 0$: OLS-Lösung $w = (X^TX)^{-1}X^Ty$ (MLE, kann instabil sein wenn $X^TX$ singulär).\n\n$\\lambda > 0$: $(X^TX + \\lambda I)$ ist immer invertierbar (PD!) — Regularisierung stabilisiert die Lösung.\n\n**Interpretation**: Gauß-Prior $w \\sim \\mathcal{N}(0, \\frac{1}{2\\lambda}I)$ → MAP = Ridge.',
      },
    ],
    practice: [
      {
        id: 'p1.map.ex1',
        difficulty: 1,
        conceptTags: ['map', 'l2'],
        type: 'mc',
        prompt: 'Welcher Prior führt zu L2-Regularisierung?',
        options: [
          'Gauß-Prior $P(\\theta) \\propto e^{-\\|\\theta\\|^2/2\\tau^2}$',
          'Laplace-Prior $P(\\theta) \\propto e^{-|\\theta|/b}$',
          'Uniform-Prior $P(\\theta) = \\text{const}$',
          'Jeffreys-Prior',
        ],
        answer: 'Gauß-Prior $P(\\theta) \\propto e^{-\\|\\theta\\|^2/2\\tau^2}$',
        hints: [
          '$\\ln P(\\theta) \\propto -\\|\\theta\\|^2/(2\\tau^2)$.',
          'MAP: Maximiere $\\ell + \\ln P(\\theta)$ = Minimiere NLL $+ \\lambda\\|\\theta\\|^2$.',
          '$\\lambda = 1/(2\\tau^2)$ — das ist L2.',
        ],
        explanation:
          'Gauß-Prior → $\\ln P(\\theta) \\propto -\\|\\theta\\|^2$ → L2-Regularisierung. Laplace-Prior → $\\ln P(\\theta) \\propto -\\|\\theta\\|_1$ → L1. Uniform-Prior → kein Regularisierungsterm → MLE.',
      },
      {
        id: 'p1.map.ex2',
        difficulty: 1,
        conceptTags: ['l1', 'map'],
        type: 'mc',
        prompt: 'L1-Regularisierung (Lasso) hat welche besondere Eigenschaft?',
        options: [
          'Fördert Sparsität — viele Gewichte werden genau 0',
          'Shrinks alle Gewichte gleichmäßig ohne Nullsetzen',
          'Entspricht einem Gauß-Prior',
          'Hat keine geschlossene Lösung',
        ],
        answer: 'Fördert Sparsität — viele Gewichte werden genau 0',
        hints: [
          'Rautenförmige L1-Constraint-Region hat Ecken auf den Achsen.',
          'Optimum liegt oft an einer Ecke → Koordinate = 0.',
          'L2-Kreis hat keine Ecken → Gewichte werden klein, aber selten 0.',
        ],
        explanation:
          'L1-Rautenregion hat scharfe Ecken auf den Achsen → Lösung landet oft dort → Feature-Selektion durch Nullsetzen. L2 shrinks gleichmäßig, setzt nichts auf null.',
      },
      {
        id: 'p1.map.ex3',
        difficulty: 2,
        conceptTags: ['bias-variance'],
        type: 'mc',
        prompt: 'Ein Modell mit zu kleinem $\\lambda$ (schwache Regularisierung) leidet unter …',
        options: [
          'Hoher Varianz (Overfitting) — passt Training perfekt, generalisiert schlecht',
          'Hohem Bias (Underfitting) — zu einfach für die Daten',
          'Weder Bias noch Varianz — ist immer optimal',
          'Numerischer Instabilität',
        ],
        answer: 'Hoher Varianz (Overfitting) — passt Training perfekt, generalisiert schlecht',
        hints: [
          'Kleines $\\lambda$ → Prior hat wenig Einfluss → fast wie MLE.',
          'MLE-Modell memoriert Trainingsdaten → hohe Varianz.',
          'Neues Daten → Modell generalisiert schlecht.',
        ],
        explanation:
          'Kleines $\\lambda$ = schwacher Prior = fast MLE = Overfitting. Großes $\\lambda$ = starker Prior = viel Regularisierung = Underfitting. Cross-Validation findet optimales $\\lambda$.',
      },
      {
        id: 'p1.map.ex4',
        difficulty: 3,
        conceptTags: ['l2', 'map'],
        type: 'mc',
        prompt: 'Ridge-Regression: $w^* = (X^TX + \\lambda I)^{-1}X^Ty$. Was ändert sich für $\\lambda \\to \\infty$?',
        options: [
          '$w^* \\to 0$ — Prior dominiert, alle Gewichte gegen Null',
          '$w^* \\to (X^TX)^{-1}X^Ty$ — OLS-Lösung',
          '$w^* \\to \\infty$ — numerisch instabil',
          '$w^*$ ändert sich nicht — unabhängig von $\\lambda$',
        ],
        answer: '$w^* \\to 0$ — Prior dominiert, alle Gewichte gegen Null',
        hints: [
          '$w^* = (X^TX + \\lambda I)^{-1}X^Ty$.',
          'Für $\\lambda \\to \\infty$: $(X^TX + \\lambda I)^{-1} \\to 0$.',
          '→ $w^* \\to 0$.',
        ],
        explanation:
          '$\\lambda \\to \\infty$: Prior $\\mathcal{N}(0, \\frac{1}{2\\lambda}I)$ wird sehr eng um 0 → erzwingt $w \\approx 0$. Für $\\lambda = 0$: OLS-Lösung (MLE).',
      },
      {
        id: 'p1.map.ex5',
        difficulty: 3,
        conceptTags: ['bias-variance', 'regularization'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Modell A: Bias$=0{,}5$, Var$=3$. Modell B: Bias$=1{,}5$, Var$=0{,}5$. Rauschen $\\sigma^2=0{,}5$. Welches Modell hat kleineren Gesamtfehler?',
        options: [
          'Modell B: $1{,}5^2+0{,}5+0{,}5 = 3{,}25$ vs. A: $0{,}5^2+3+0{,}5 = 3{,}75$',
          'Modell A: hat kleineren Bias',
          'Gleich: Rauschen dominiert',
          'Modell A wegen niedrigerem Bias',
        ],
        answer:
          'Modell B: $1{,}5^2+0{,}5+0{,}5 = 3{,}25$ vs. A: $0{,}5^2+3+0{,}5 = 3{,}75$',
        hints: [
          'Fehler = Bias² + Varianz + Rauschen.',
          'A: $0{,}25 + 3 + 0{,}5 = 3{,}75$.',
          'B: $2{,}25 + 0{,}5 + 0{,}5 = 3{,}25$.',
        ],
        explanation:
          'A: 0,25+3+0,5=3,75. B: 2,25+0,5+0,5=3,25. Modell B gewinnt trotz höherem Bias — niedrige Varianz kompensiert. Bias-Varianz-Trade-off ist nicht trivial.',
      },
      {
        id: 'p1.map.ex6',
        difficulty: 4,
        conceptTags: ['map', 'regularization', 'bias-variance'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Weight Decay in SGD: $w \\leftarrow w - \\alpha(\\nabla_w \\mathcal{L} + \\lambda w)$. Was ist die probabilistische Interpretation?',
        options: [
          'MAP-Update mit Gauß-Prior $w \\sim \\mathcal{N}(0, 1/\\lambda)$ — Prior zieht Gewichte Richtung 0',
          'MLE-Update ohne Prior — kein Regularisierungseffekt',
          'MAP-Update mit Laplace-Prior',
          'Empirical-Bayes-Update',
        ],
        answer:
          'MAP-Update mit Gauß-Prior $w \\sim \\mathcal{N}(0, 1/\\lambda)$ — Prior zieht Gewichte Richtung 0',
        hints: [
          '$\\nabla_w (\\mathcal{L} + \\lambda\\|w\\|^2) = \\nabla_w \\mathcal{L} + 2\\lambda w$.',
          'Das ist der Gradient der MAP-Zielfunktion.',
          'Gauß-Prior → $\\ln P(w) \\propto -\\lambda\\|w\\|^2$ → Gradient $-2\\lambda w$.',
        ],
        explanation:
          'Weight Decay $\\lambda w$ = Gradient von L2-Regularisierung = MAP-Update mit Gauß-Prior. Jeder SGD-Schritt mit Weight Decay macht einen Schritt in Richtung des MAP-Schätzers.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Regularisierung in der Praxis\n\n**Implizite Regularisierung**: SGD mit Mini-Batches regularisiert implizit — Gradient-Rauschen verhindert Overfitting. Große Batches → weniger implizite Regularisierung → oft explizite Regularisierung nötig.\n\n**Dropout** als Regularisierung: Marginalisierung über Modellensemble. Äquivalent zu L2 für lineare Modelle (Wager et al. 2013).\n\n**Early Stopping**: Effektiv äquivalent zu L2-Regularisierung für gradient-basiertes Training.',
      },
      {
        kind: 'callout',
        content:
          'Der vollständige Kreis: MLE (Lektion 09) → Overfitting → Regularisierung → MAP (Lektion 10) → Prior-Wahl = Regularisierungsform → Bias-Varianz-Trade-off → Cross-Validation für $\\lambda$. Jede Regularisierungsentscheidung ist eine implizite Aussage über den Prior auf $\\theta$.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.map.card1',
      front: 'L2-Regularisierung entspricht welchem Prior?',
      back: 'Gauß-Prior $P(\\theta) \\propto e^{-\\|\\theta\\|^2/2\\tau^2}$. $\\lambda = 1/(2\\tau^2)$.',
      conceptTags: ['map', 'l2'],
    },
    {
      id: 'p1.map.card2',
      front: 'L1 vs. L2 — Hauptunterschied?',
      back: 'L1 (Laplace-Prior): fördert Sparsität, Gewichte werden genau 0. L2 (Gauß-Prior): shrinks alle Gewichte gleichmäßig.',
      conceptTags: ['l1', 'regularization'],
    },
    {
      id: 'p1.map.card3',
      front: 'Bias-Varianz-Dekomposition?',
      back: '$E[(y-\\hat{f})^2] = \\text{Bias}^2 + \\text{Varianz} + \\sigma^2$. Regularisierung ↑ Bias, ↓ Varianz.',
      conceptTags: ['bias-variance'],
    },
  ],
}
