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

  learningOutcome:
    'Du kannst MAP-Schätzung formell definieren, den Unterschied zu MLE erklären, L2-Regularisierung als MAP mit Gauß-Prior herleiten und den Bias-Varianz-Tradeoff formal quantifizieren.',

  description:
    'MAP (Maximum A Posteriori) ist die Brücke zwischen statistischer Inferenz und praktischem ML-Training. Regularisierung ist keine Heuristik — es ist bayesianisches Denken. L2, L1, Dropout, Early Stopping: alle sind probabilistisch begründet. Diese Lektion schließt den Kreis von Wahrscheinlichkeit bis zum Trainings-Loop.',

  conceptSteps: [
    {
      title: 'MAP vs. MLE — was ist der Unterschied?',
      preprompt: '3 Münzwürfe, 3 Mal Kopf. MLE gibt $\\hat{p} = 1{,}0$. Ist das sinnvoll? Was wenn du weißt, dass die meisten Münzen ungefähr fair sind?',
      body: '**MLE** ignoriert Vorwissen:\n\n$$\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta P(D \\mid \\theta)$$\n\n**MAP** (Maximum A Posteriori) nutzt Prior-Wissen:\n\n$$\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta P(\\theta \\mid D) = \\arg\\max_\\theta \\underbrace{P(D \\mid \\theta)}_{\\text{Likelihood}} \\cdot \\underbrace{P(\\theta)}_{\\text{Prior}}$$\n\nIn Log-Form:\n\n$$\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta \\left[\\underbrace{\\ln P(D \\mid \\theta)}_{\\text{Log-Likelihood}} + \\underbrace{\\ln P(\\theta)}_{\\text{Log-Prior}}\\right]$$\n\n**Uniform-Prior** $P(\\theta) = \\text{const}$ → MAP = MLE.',
      miniExample: '3 Kopf von 3 Würfen. MLE: $\\hat{p} = 1{,}0$ (unsinnig). MAP mit Beta$(2,2)$-Prior: $\\hat{p} = 4/6 \\approx 0{,}67$ — Prior zieht Richtung 0,5.',
      selfCheck: 'Was passiert mit dem MAP-Schätzer wenn $n \\to \\infty$? (MAP → MLE, Daten dominieren den Prior.)',
    },
    {
      title: 'Prior-Wahl bestimmt Regularisierung',
      body: 'Der Prior $P(\\theta)$ ist die Regularisierungsfunktion:\n\n$$\\mathcal{L}_{\\text{MAP}}(\\theta) = \\underbrace{-\\ln P(D \\mid \\theta)}_{\\text{NLL (Data Fit)}} - \\underbrace{\\ln P(\\theta)}_{\\text{Regularisierung}}$$\n\nVerschiedene Priors → verschiedene Regularisierungen:\n\n| Prior | $\\ln P(\\theta)$ | Regularisierung |\n|---|---|---|\n| Gauß $\\mathcal{N}(0, \\tau^2)$ | $-\\frac{\\|\\theta\\|^2}{2\\tau^2}$ | L2 (Ridge) |\n| Laplace $\\text{Laplace}(0, b)$ | $-\\frac{\\|\\theta\\|_1}{b}$ | L1 (Lasso) |\n| Uniform | $0$ | keine (MLE) |\n| Spike-and-Slab | komplex | Sparsität + Unsicherheit |',
      selfCheck: 'Was sagt ein enger Prior ($\\tau^2$ klein) über die Gewichte aus? (Wir erwarten, dass die Gewichte nahe 0 sind — starke Regularisierung.)',
    },
    {
      title: 'L2-Regularisierung als MAP-Herleitung (Gauß-Prior)',
      body: 'Gauß-Prior auf Gewichten $\\theta \\sim \\mathcal{N}(0, \\tau^2 I)$:\n\n$$\\ln P(\\theta) = -\\frac{1}{2\\tau^2}\\|\\theta\\|^2 + \\text{const}$$\n\nMAP-Zielfunktion (maximieren):\n\n$$\\ell(\\theta) + \\ln P(\\theta) = \\underbrace{\\sum_i \\ln P(x_i \\mid \\theta)}_{\\text{Log-Likelihood}} - \\frac{1}{2\\tau^2}\\|\\theta\\|^2$$\n\nÄquivalent (minimieren = NLL + L2):\n\n$$\\mathcal{L}_{\\text{MAP}} = \\underbrace{\\mathcal{L}_{\\text{NLL}}}_{\\text{CE oder MSE}} + \\underbrace{\\lambda \\|\\theta\\|^2}_{\\text{L2}} \\qquad \\lambda = \\frac{1}{2\\tau^2}$$\n\n**L2-Regularisierung ist MAP-Training mit Gauß-Prior!**',
      miniExample: 'Ridge-Regression: $\\mathcal{L}(w) = \\|Xw - y\\|^2 + \\lambda\\|w\\|^2$. Geschlossene Lösung: $w^* = (X^\\top X + \\lambda I)^{-1}X^\\top y$ — immer invertierbar ($\\lambda > 0$)!',
    },
    {
      title: 'L1-Regularisierung als Laplace-Prior',
      body: 'Laplace-Prior $\\theta_j \\sim \\text{Laplace}(0, b)$:\n\n$$P(\\theta_j) = \\frac{1}{2b} e^{-|\\theta_j|/b} \\quad \\Rightarrow \\quad \\ln P(\\theta) = -\\frac{\\|\\theta\\|_1}{b} + \\text{const}$$\n\nMAP ergibt:\n\n$$\\mathcal{L}_{\\text{Lasso}} = \\mathcal{L}_{\\text{NLL}} + \\lambda \\|\\theta\\|_1 \\qquad \\lambda = \\frac{1}{b}$$\n\n**Geometrische Intuition**: Die Laplace-Verteilung hat eine scharfe Spitze bei 0 (kein glatter Peak wie Gauß). Das zieht Gewichte **auf genau null** → **Sparsität** (Feature-Selektion).\n\nL1-Optimum liegt oft an einer Ecke des $\\ell_1$-Balls (rautenförmig) — direkt auf einer Koordinatenachse.',
      miniExample: 'Lasso-Regression: Wähle automatisch relevante Features, setze irrelevante auf $0$. L2/Ridge schrumpft alle, löscht keines.',
    },
    {
      title: 'Bias-Varianz-Tradeoff formell',
      body: 'Für beliebigen Schätzer $\\hat{f}$ (trainiertes Modell auf zufälligem Trainingsset $D$):\n\n$$\\mathbb{E}_D[(y - \\hat{f}(x))^2] = \\underbrace{(\\mathbb{E}_D[\\hat{f}(x)] - f(x))^2}_{\\text{Bias}^2} + \\underbrace{\\mathbb{E}_D[(\\hat{f}(x) - \\mathbb{E}_D[\\hat{f}(x)])^2]}_{\\text{Varianz}} + \\underbrace{\\sigma^2}_{\\text{irreduzibles Rauschen}}$$\n\n- **Bias↑, Varianz↓**: einfache Modelle, starke Regularisierung → Underfitting\n- **Bias↓, Varianz↑**: komplexe Modelle, schwache Regularisierung → Overfitting\n\nRegularisierung erhöht Bias, reduziert Varianz — $\\lambda$ steuert den Trade-off.',
      selfCheck: 'Kann man Bias und Varianz gleichzeitig reduzieren? (Ja, durch mehr Daten! Mehr Trainingsdaten reduziert Varianz ohne Bias zu erhöhen.)',
    },
    {
      title: 'ML: Regularisierungsparameter $\\lambda$ wählen',
      body: 'Wie wählt man $\\lambda$ (= $1/(2\\tau^2)$)?\n\n**Cross-Validation**: Teile Daten in $k$ Folds. Für jedes $\\lambda$ trainiere auf $k-1$ Folds, evaluiere auf 1 Fold. Wähle $\\lambda$ mit minimalem Validierungs-Loss.\n\n**Empirische Bayes**: Optimiere $\\lambda$ via Marginal Likelihood $P(D) = \\int P(D \\mid \\theta) P(\\theta \\mid \\lambda)\\, d\\theta$.\n\n**Implizite Regularisierung**: SGD mit kleinem Batch, Dropout, Early Stopping, BatchNorm — all diese regularisieren **ohne explizites $\\lambda$**.\n\nDer Zusammenhang: $\\lambda \\sim \\frac{1}{\\tau^2}$. Kleines $\\tau^2$ (enger Prior, starke Regularisierung, hoher Bias, niedrige Varianz).',
    },
    {
      title: 'Der vollständige Kreis: Statistik → ML',
      body: 'Jetzt sind alle Puzzleteile zusammen:\n\n$$\\underbrace{\\text{Zufallsvariablen}}_{{\\text{Lekt. 01}}} \\to \\underbrace{\\text{PMF/PDF}}_{\\text{02}} \\to \\underbrace{\\text{Verteilungen}}_{\\text{03,04}} \\to \\underbrace{\\mathbb{E}[\\cdot], \\text{Var}}_{\\text{05}} \\to \\underbrace{\\Sigma, \\mathcal{N}(\\boldsymbol{\\mu},\\Sigma)}_{\\text{06}}$$\n\n$$\\to \\underbrace{P(y\\mid x)}_{\\text{07}} \\to \\underbrace{P(\\theta\\mid D) \\propto P(D\\mid\\theta)P(\\theta)}_{\\text{08}} \\to \\underbrace{\\hat{\\theta}_{\\text{MLE}}}_{\\text{09}} \\to \\underbrace{\\hat{\\theta}_{\\text{MAP}} = \\text{NLL} + \\lambda\\|\\theta\\|^2}_{\\text{10}}$$\n\n**Jede Zeile Training-Code ist eine probabilistische Aussage.** Loss-Funktion = Wahrscheinlichkeitsmodell. Regularisierung = Prior. Batch-Größe = Varianz des Gradienten.',
      selfCheck: 'Was ist die probabilistische Bedeutung von Weight Decay $w \\leftarrow w - \\alpha(\\nabla \\mathcal{L} + \\lambda w)$? (MAP-Update mit Gauß-Prior $\\mathcal{N}(0, 1/\\lambda)$ — jeder Schritt drückt Gewichte Richtung 0.)',
    },
  ],

  codeBridges: [
    {
      title: 'Ridge (L2) und Lasso (L1) in sklearn; manuelle MAP-Herleitung',
      lang: 'python',
      code: `import numpy as np
import torch
import torch.nn as nn
from sklearn.linear_model import Ridge, Lasso, LinearRegression
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
n, d = 100, 20
X = np.random.randn(n, d)
# Nur Features 0,1,2 sind relevant; Rest = Rauschen
w_true = np.zeros(d)
w_true[:3] = [2.0, -1.5, 0.8]
y = X @ w_true + np.random.randn(n) * 0.5

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# --- MLE (OLS, kein Prior = Uniform-Prior) ---
ols = LinearRegression().fit(X_scaled, y)
print("OLS Koeffizienten (alle non-zero):", (ols.coef_ != 0).sum())

# --- MAP mit Gauß-Prior = Ridge (L2) ---
ridge = Ridge(alpha=1.0)  # alpha = λ = 1/(2τ²)
ridge.fit(X_scaled, y)
print("Ridge: Max Koeff =", np.abs(ridge.coef_).max().round(3))  # shrinks

# --- MAP mit Laplace-Prior = Lasso (L1) ---
lasso = Lasso(alpha=0.1)
lasso.fit(X_scaled, y)
n_nonzero = (lasso.coef_ != 0).sum()
print(f"Lasso: {n_nonzero}/{d} non-zero Koeffizienten")  # Sparsität!
print("Lasso identifiziert relevante Features:", np.where(lasso.coef_ != 0)[0])

# --- Cross-Validation für λ-Wahl ---
lambdas = [0.001, 0.01, 0.1, 1.0, 10.0]
for lam in lambdas:
    scores = cross_val_score(Ridge(alpha=lam), X_scaled, y, cv=5,
                              scoring='neg_mean_squared_error')
    print(f"λ={lam:5.3f}: Val-MSE = {-scores.mean():.4f} ± {scores.std():.4f}")

# --- Weight Decay in PyTorch = L2 = MAP mit Gauß-Prior ---
model = nn.Linear(d, 1)
optimizer = torch.optim.SGD(model.parameters(), lr=0.01,
                             weight_decay=0.01)  # weight_decay = λ
X_t = torch.FloatTensor(X_scaled)
y_t = torch.FloatTensor(y)
for _ in range(100):
    loss = nn.MSELoss()(model(X_t).squeeze(), y_t)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
print("PyTorch Ridge Gewichte:", model.weight.detach().numpy().round(2))`,
      annotation: 'sklearn `Ridge(alpha=λ)` entspricht MAP mit Gauß-Prior $\\sigma^2 = 1/(2\\lambda)$. `Lasso(alpha=λ)` = MAP mit Laplace-Prior. PyTorch `weight_decay` in SGD/Adam ist äquivalent zu L2-Regularisierung — `weight_decay=λ` addiert $\\lambda \\cdot w$ zum Gradienten, was dem Gradienten von $\\frac{\\lambda}{2}\\|w\\|^2$ entspricht.',
    },
  ],

  derivations: [
    {
      claim: 'L1-Regularisierung (Lasso) fördert Sparsität durch die Geometrie des Laplace-Priors',
      reasoning:
        'Bei Optimierung mit L1-Constraint: Der Loss-Kontur (elliptisch für MSE) trifft die L1-Kugel (rautenförmig) am häufigsten an einer Ecke, weil Ecken auf Koordinatenachsen liegen. An einer Ecke ist eine Koordinate genau null. Im Gegensatz dazu hat die L2-Kugel (kreisförmig) keine Ecken — Loss-Kontur trifft sie selten an einem Punkt mit null-Koordinaten. Probabilistisch: Laplace-Prior $P(\\theta) \\propto e^{-|\\theta|/b}$ hat eine scharfe Spitze bei $\\theta=0$ — er bestraft Abweichungen von null stärker als Gauß.',
    },
    {
      claim: 'Bias-Varianz-Dekomposition des MSE',
      reasoning:
        'MSE $= \\mathbb{E}[(y - \\hat{f})^2]$ mit $y = f(x) + \\varepsilon$, $\\mathbb{E}[\\varepsilon] = 0$. Schreibe $\\hat{f} - y = (\\hat{f} - \\bar{f}) + (\\bar{f} - f) - \\varepsilon$ mit $\\bar{f} = \\mathbb{E}_D[\\hat{f}]$. Quadrieren und Erwartungswert: $\\mathbb{E}[(\\hat{f}-y)^2] = \\mathbb{E}[(\\hat{f}-\\bar{f})^2] + (\\bar{f}-f)^2 + \\sigma^2 + 2 \\cdot 0 = \\text{Var}(\\hat{f}) + \\text{Bias}^2 + \\sigma^2$. Die Kreuzterme verschwinden wegen Unabhängigkeit von $\\varepsilon$ und $D$.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Stärkere Regularisierung (größeres $\\lambda$) ist immer besser',
      correct: 'Zu große $\\lambda$ erhöht Bias zu stark → Underfitting; optimales $\\lambda$ über Cross-Validation',
      explanation:
        'Für $\\lambda \\to \\infty$: alle Gewichte → 0, Modell gibt immer denselben Output → sehr hoher Bias. Für $\\lambda \\to 0$: MLE, potentiell hohes Overfitting → hohe Varianz. Optimum dazwischen.',
    },
    {
      wrong: 'L1 und L2 sind ähnlich — nur die Formel ist verschieden',
      correct: 'L1 produziert sparse Lösungen (viele Gewichte = 0), L2 schrumpft alle Gewichte gleichmäßig',
      explanation:
        'Diese geometrische Eigenschaft ist fundamental: L1 führt zu Feature-Selektion (nützlich bei vielen irrelevanten Features), L2 behält alle Features mit reduzierter Stärke. Für Deep Learning ist L2 (Weight Decay) Standard; L1 findet Anwendung in Sparse Autoencoders.',
    },
    {
      wrong: 'MAP-Schätzung ist dasselbe wie Bayesianische Inferenz',
      correct: 'MAP ist nur der Mode des Posteriors — vollständige Bayesianische Inferenz nutzt die gesamte Posteriorverteilung',
      explanation:
        'MAP gibt einen Punkt-Schätzer $\\hat{\\theta}_{\\text{MAP}}$ — es wird nicht die Unsicherheit über $\\theta$ modelliert. Vollständige Bayesianische Netze behalten die Posteriorverteilung $P(\\theta \\mid D)$ und machen Vorhersagen durch Marginalisierung: $P(y^* \\mid x^*, D) = \\int P(y^* \\mid x^*, \\theta) P(\\theta \\mid D)\\, d\\theta$.',
    },
  ],

  furtherResources: [
    {
      title: 'StatQuest: "Ridge Regression, Clearly Explained" (YouTube)',
      type: 'video',
      note: 'Visuelle Erklärung der L2-Regularisierungsgeometrie; Vergleich mit OLS',
    },
    {
      title: 'Tibshirani (1996): "Regression Shrinkage and Selection via the Lasso" — jstor.org',
      type: 'article',
      note: 'Originalpaper des Lasso; erklärt Sparsitätseigenschaft; historisch bedeutend',
    },
    {
      title: 'MML Book, Kapitel 8.2: "Maximum A Posteriori Estimation"',
      type: 'book',
      note: 'Vollständige MAP-Herleitung mit Prior-Vergleich; kostenloser PDF auf mml-book.github.io',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.bayes-theorem',
      relation: 'requires',
      hint: 'MAP = Mode des Posteriors $P(\\theta \\mid D)$ — Bayes-Theorem liefert die Grundlage.',
    },
    {
      lessonId: 'p1.mle',
      relation: 'requires',
      hint: 'MAP verallgemeinert MLE durch einen Prior — MLE = MAP mit Uniform-Prior.',
    },
    {
      lessonId: 'p1.kontinuierliche-verteilungen',
      relation: 'see-also',
      hint: 'Gauß-Prior (L2) und Laplace-Prior (L1) sind die kontinuierlichen Verteilungen aus Lektion 04.',
    },
    {
      lessonId: 'p1.erwartungswert-varianz',
      relation: 'see-also',
      hint: 'Bias-Varianz-Dekomposition nutzt Erwartungswert und Varianz des Schätzers.',
    },
  ],

  reflection: 'Du hast jetzt den vollständigen Kreis: Zufallsvariablen → Verteilungen → Erwartungswert → Kovarianz → bedingte Wahrscheinlichkeit → Bayes → MLE → MAP. **Jede Regularisierungsentscheidung in deinem Code ist eine probabilistische Aussage**. L2 sagt: "Ich glaube, die Gewichte sind normalverteilt um null." L1 sagt: "Ich glaube, die meisten Gewichte sind genau null." **Welche Lektion hat dir am meisten über ML verraten — die MLE-Loss-Verbindung oder MAP-Regularisierung?**',
}
