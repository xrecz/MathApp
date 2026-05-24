import type { Lesson } from '../../../types'

export const bayesTheorem: Lesson = {
  id: 'p1.bayes-theorem',
  title: 'Bayes-Theorem',
  conceptTags: ['bayes', 'prior', 'posterior', 'likelihood', 'bayesian-inference'],
  estimatedMinutes: 17,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Bayes-Theorem\n\n$$P(H \\mid E) = \\frac{P(E \\mid H) \\cdot P(H)}{P(E)}$$\n\n- $P(H)$: **Prior** — Vorwissen über Hypothese $H$\n- $P(E \\mid H)$: **Likelihood** — wie wahrscheinlich sind Daten $E$ unter $H$?\n- $P(E)$: **Evidenz** — Normierungskonstante\n- $P(H \\mid E)$: **Posterior** — aktualisierter Glaube nach Beobachtung $E$\n\n$$\\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior}$$',
      },
      {
        kind: 'math',
        content:
          '$$P(\\theta \\mid D) = \\frac{P(D \\mid \\theta) \\cdot P(\\theta)}{P(D)} \\qquad P(D) = \\int P(D \\mid \\theta)\\, P(\\theta)\\, d\\theta$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Bayesianisches Training: $\\theta$ ist eine ZV mit Prior $P(\\theta)$. Nach Training auf Daten $D$ ergibt sich Posterior $P(\\theta \\mid D)$. MAP-Schätzung (Lektion 10) = Mode des Posteriors = MLE + Regularisierung.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Klassisches Beispiel: Medizinischer Test\n\nKrankheit prävalent mit $P(K) = 0{,}01$. Test: $P(+\\mid K) = 0{,}95$ (Sensitivität), $P(+\\mid \\bar{K}) = 0{,}05$ (False-Positive-Rate).\n\n$$P(K \\mid +) = \\frac{0{,}95 \\cdot 0{,}01}{0{,}95 \\cdot 0{,}01 + 0{,}05 \\cdot 0{,}99} = \\frac{0{,}0095}{0{,}0095 + 0{,}0495} = \\frac{0{,}0095}{0{,}059} \\approx 0{,}161$$\n\nObwohl Test 95% sensitiv: nur 16% Wahrscheinlichkeit krank bei positivem Test! (Seltene Krankheit → niedriger Prior dominiert.)\n\n### Posterior ist proportional\n\n$P(\\theta \\mid D) \\propto P(D \\mid \\theta) \\cdot P(\\theta)$ — Normierungskonstante $P(D)$ oft unberechnet.',
      },
      {
        kind: 'worked-example',
        content:
          '**Bayesianische Parameterschätzung**:\n\n$n = 10$ Münzwürfe, $k = 7$ Kopf. Modell: $\\theta = P(\\text{Kopf})$.\n\nLikelihood: $P(k=7 \\mid \\theta) = \\binom{10}{7} \\theta^7 (1-\\theta)^3$.\n\n**Uniform-Prior**: $P(\\theta) = 1$ für $\\theta \\in [0,1]$.\n\nPosterior: $P(\\theta \\mid k=7) \\propto \\theta^7(1-\\theta)^3$ — Beta-Verteilung $\\text{Beta}(8, 4)$.\n\nMAP-Schätzer: Mode $= \\frac{7}{10} = 0{,}7 = \\hat{\\theta}_{\\text{MLE}}$.\n\n**Informierter Prior** $\\text{Beta}(3, 3)$ (faire Münze erwartet): Posterior $\\text{Beta}(10, 6)$, MAP $= 9/15 = 0{,}6$ — Prior zieht Schätzung Richtung 0,5.',
      },
    ],
    practice: [
      {
        id: 'p1.bayes.ex1',
        difficulty: 1,
        conceptTags: ['bayes'],
        type: 'mc',
        prompt: 'In $P(H \\mid E) = \\frac{P(E \\mid H) P(H)}{P(E)}$ — was ist $P(H)$?',
        options: [
          'Prior — Vorwissen über Hypothese vor Beobachtung von $E$',
          'Posterior — aktualisierter Glaube nach Beobachtung',
          'Likelihood — Wahrscheinlichkeit der Daten unter $H$',
          'Evidenz — Marginale Wahrscheinlichkeit der Daten',
        ],
        answer: 'Prior — Vorwissen über Hypothese vor Beobachtung von $E$',
        hints: [
          '$P(H)$ steht für die Wahrscheinlichkeit der Hypothese ohne Beobachtung.',
          'Vor dem Experiment — daher \"Prior\" (vorher).',
          'Nach dem Experiment: $P(H \\mid E)$ = Posterior.',
        ],
        explanation:
          '$P(H)$ = Prior: Glaube an $H$ vor der Beobachtung. $P(H \\mid E)$ = Posterior: Glaube nach Beobachtung. Bayes aktualisiert Prior → Posterior.',
      },
      {
        id: 'p1.bayes.ex2',
        difficulty: 2,
        conceptTags: ['bayes', 'prior'],
        type: 'mc',
        prompt:
          'Krankheit $P(K) = 0{,}01$. Test: $P(+\\mid K) = 0{,}95$, $P(+\\mid \\bar{K}) = 0{,}05$. Was ist $P(+)$ (totale Wahrscheinlichkeit eines positiven Tests)?',
        options: ['$0{,}059$', '$0{,}05$', '$0{,}95$', '$0{,}01$'],
        answer: '$0{,}059$',
        hints: [
          '$P(+) = P(+\\mid K)P(K) + P(+\\mid \\bar{K})P(\\bar{K})$.',
          '$= 0{,}95 \\cdot 0{,}01 + 0{,}05 \\cdot 0{,}99$.',
          '$= 0{,}0095 + 0{,}0495 = 0{,}059$.',
        ],
        explanation:
          '$P(+) = 0{,}95 \\cdot 0{,}01 + 0{,}05 \\cdot 0{,}99 = 0{,}0095 + 0{,}0495 = 0{,}059$. Nur 5,9% aller Tests sind positiv.',
      },
      {
        id: 'p1.bayes.ex3',
        difficulty: 2,
        conceptTags: ['posterior', 'likelihood'],
        type: 'mc',
        prompt:
          'Gleiche Krankheit wie oben: $P(K)=0{,}01$, $P(+\\mid K)=0{,}95$, $P(+)=0{,}059$. Was ist $P(K \\mid +)$?',
        options: ['$\\approx 0{,}161$', '$0{,}95$', '$0{,}01$', '$0{,}05$'],
        answer: '$\\approx 0{,}161$',
        hints: [
          '$P(K \\mid +) = P(+\\mid K) P(K) / P(+)$.',
          '$= 0{,}95 \\cdot 0{,}01 / 0{,}059$.',
          '$= 0{,}0095 / 0{,}059 \\approx 0{,}161$.',
        ],
        explanation:
          '$P(K \\mid +) \\approx 0{,}161 = 16{,}1\\%$. Trotz 95% Sensitivität: nur 16% bei positivem Test krank. Seltene Krankheit (Prior 1%) dominiert.',
        acceptedAlternatives: ['$\\approx 0{,}16$', '$16\\%$', '$0{,}16$'],
      },
      {
        id: 'p1.bayes.ex4',
        difficulty: 3,
        conceptTags: ['bayesian-inference', 'prior'],
        type: 'mc',
        prompt:
          'Posterior $P(\\theta \\mid D) \\propto P(D \\mid \\theta) \\cdot P(\\theta)$. Was ist der **MAP-Schätzer**?',
        options: [
          '$\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta P(D \\mid \\theta) \\cdot P(\\theta)$ — Mode des Posteriors',
          '$\\hat{\\theta}_{\\text{MAP}} = E[\\theta \\mid D]$ — Mittelwert des Posteriors',
          '$\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta P(\\theta)$ — Mode des Priors',
          '$\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta P(D \\mid \\theta)$ — MLE',
        ],
        answer:
          '$\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta P(D \\mid \\theta) \\cdot P(\\theta)$ — Mode des Posteriors',
        hints: [
          'MAP = Maximum A Posteriori.',
          'A Posteriori = nach Beobachtung = Posterior.',
          'Mode (Maximum) des Posteriors.',
        ],
        explanation:
          'MAP = $\\arg\\max P(D \\mid \\theta) P(\\theta)$. MLE = $\\arg\\max P(D \\mid \\theta)$ (kein Prior). MAP = MLE + Regularisierung durch $\\ln P(\\theta)$.',
      },
      {
        id: 'p1.bayes.ex5',
        difficulty: 3,
        conceptTags: ['prior', 'posterior'],
        type: 'mc',
        prompt:
          '10 Würfe, 7 Kopf. Prior $\\text{Beta}(3,3)$. Posterior $\\text{Beta}(10, 6)$. Was ist der MAP-Schätzer ($= \\frac{\\alpha-1}{\\alpha+\\beta-2}$ für Beta$(\\alpha,\\beta)$)?',
        options: [
          '$\\frac{9}{14} \\approx 0{,}643$',
          '$0{,}7$',
          '$0{,}5$',
          '$\\frac{10}{16} = 0{,}625$',
        ],
        answer: '$\\frac{9}{14} \\approx 0{,}643$',
        hints: [
          'MAP der Beta$(\\alpha, \\beta)$: $(\\alpha-1)/(\\alpha+\\beta-2)$.',
          'Posterior Beta$(10, 6)$: $(10-1)/(10+6-2) = 9/14$.',
          '$9/14 \\approx 0{,}643$.',
        ],
        explanation:
          'MAP = $(10-1)/(10+6-2) = 9/14 \\approx 0{,}643$. Prior Beta$(3,3)$ zieht von MLE $0{,}7$ Richtung $0{,}5$ — Prior liefert \"virtuelle\" vorherige Beobachtungen.',
        acceptedAlternatives: ['$0{,}64$', '$9/14$'],
      },
      {
        id: 'p1.bayes.ex6',
        difficulty: 4,
        conceptTags: ['bayesian-inference'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Warum ist MAP-Training mit Gauß-Prior $P(\\theta) = \\mathcal{N}(0, \\tau^2)$ äquivalent zu L2-Regularisierung?',
        options: [
          '$\\ln P(D \\mid \\theta) + \\ln P(\\theta) = \\text{NLL} - \\frac{1}{2\\tau^2}\\|\\theta\\|^2$ — Log-Prior ist L2-Penalty',
          'Weil Gauß-Verteilung symmetrisch ist',
          'Nur für Regressionsmodelle, nicht allgemein',
          'Weil der Prior Information über die Daten enthält',
        ],
        answer:
          '$\\ln P(D \\mid \\theta) + \\ln P(\\theta) = \\text{NLL} - \\frac{1}{2\\tau^2}\\|\\theta\\|^2$ — Log-Prior ist L2-Penalty',
        hints: [
          '$\\ln P(\\theta) = \\ln \\mathcal{N}(0, \\tau^2) = -\\frac{\\|\\theta\\|^2}{2\\tau^2} + \\text{const}$.',
          'MAP: Maximiere $\\ell(\\theta) + \\ln P(\\theta) = \\ell(\\theta) - \\frac{\\lambda}{2}\\|\\theta\\|^2$.',
          '= NLL minimieren + L2-Regularisierung.',
        ],
        explanation:
          'MAP mit Gauß-Prior: maximiere $\\ell + \\ln P(\\theta)$. Da $\\ln P(\\theta) \\propto -\\|\\theta\\|^2$, wird L2-Regularisierung addiert. $\\lambda = 1/\\tau^2$ — kleines $\\tau$ (enger Prior) = starke Regularisierung.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Bayes im ML-Toolkit\n\n**Bayesianische Neuronale Netze**: Posterior über Gewichten statt Punktschätzer. Praktisch via Variational Inference (ELBO) oder Monte Carlo Dropout.\n\n**Gaussian Processes**: Posterior-Verteilung über Funktionen. $P(f \\mid D) \\propto P(D \\mid f) P(f)$.\n\n**Empirical Bayes**: Optimiere Hyperparameter (Prior) via Marginal Likelihood $P(D) = \\int P(D \\mid \\theta) P(\\theta \\mid \\phi)\\, d\\theta$.',
      },
      {
        kind: 'callout',
        content:
          'Warum werden Priors oft als \"schwach informativ\" (weakly informative) gewählt? Zu starke Priors → Posterior ignoriert Daten (Prior dominiert). Zu schwache → numerische Probleme. Stan/PyMC empfehlen z. B. $\\mathcal{N}(0, 10)$ für Koeffizienten — breit genug für plausible Werte, schließt Extreme aus.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.bayes.card1',
      front: 'Bayes-Theorem — Formel und Terme?',
      back: '$P(H \\mid E) = P(E \\mid H)P(H)/P(E)$. Prior $P(H)$, Likelihood $P(E\\mid H)$, Posterior $P(H\\mid E)$.',
      conceptTags: ['bayes'],
    },
    {
      id: 'p1.bayes.card2',
      front: 'Was ist der MAP-Schätzer?',
      back: '$\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta P(D\\mid\\theta)\\cdot P(\\theta)$ — Mode des Posteriors.',
      conceptTags: ['bayesian-inference'],
    },
    {
      id: 'p1.bayes.card3',
      front: 'Warum ergibt Gauß-Prior L2-Regularisierung?',
      back: '$\\ln P(\\theta) = -\\|\\theta\\|^2/(2\\tau^2)+\\text{const}$ → MAP-Zielfunktion = NLL + L2-Penalty.',
      conceptTags: ['prior', 'posterior'],
    },
  ],

  learningOutcome:
    'Du kannst Bayes-Theorem herleiten, Prior, Likelihood und Posterior unterscheiden, Bayes-Update durchführen und erklären, warum MAP-Schätzung mit Gauß-Prior äquivalent zu L2-Regularisierung ist.',

  description:
    'Bayes-Theorem ist der Mechanismus, durch den wir Vorwissen (Prior) mit beobachteten Daten (Likelihood) kombinieren, um aktualisiertes Wissen (Posterior) zu erhalten. In ML ist das die probabilistische Grundlage für Regularisierung, Bayesianische Netze und Posterior Inference.',

  conceptSteps: [
    {
      title: 'Herleitung des Bayes-Satzes',
      preprompt: 'Du hast einen medizinischen Test durchgeführt. Der Test ist positiv. Wie wahrscheinlich bist du krank? Das hängt davon ab, wie selten die Krankheit ist — das ist Bayes.',
      body: 'Aus der Multiplikationsregel folgt Bayes-Theorem direkt:\n\n$$P(A \\cap B) = P(A \\mid B) \\cdot P(B) = P(B \\mid A) \\cdot P(A)$$\n\nUmstellen:\n\n$$\\boxed{P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}}$$\n\nFür Hypothese $H$ und Evidenz $E$:\n\n$$P(H \\mid E) = \\frac{P(E \\mid H) \\cdot P(H)}{P(E)}$$',
      miniExample: '$P(E) = \\sum_i P(E \\mid H_i) P(H_i)$ — der Nenner ist die totale Wahrscheinlichkeit der Evidenz.',
      selfCheck: 'Warum brauchen wir $P(E) > 0$? (Division durch null ist nicht definiert — wir dürfen nur auf mögliche Ereignisse konditionieren.)',
    },
    {
      title: 'Prior, Likelihood, Posterior — in Worten',
      body: '$$\\underbrace{P(H \\mid E)}_{\\text{Posterior}} = \\frac{\\underbrace{P(E \\mid H)}_{\\text{Likelihood}} \\cdot \\underbrace{P(H)}_{\\text{Prior}}}{\\underbrace{P(E)}_{\\text{Evidenz (Normierung)}}}$$\n\n- **Prior** $P(H)$: Vorwissen über $H$ **vor** Beobachtung der Daten\n- **Likelihood** $P(E \\mid H)$: Wie wahrscheinlich sind die Daten **unter** Hypothese $H$? Funktion von $H$, nicht von $E$!\n- **Evidenz** $P(E)$: Normierungskonstante, oft schwer zu berechnen\n- **Posterior** $P(H \\mid E)$: Aktualisierter Glaube **nach** Beobachtung\n\n**Schlüsselformel**: $\\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior}$',
      selfCheck: 'Was ist der Unterschied zwischen Likelihood und Wahrscheinlichkeit? (Likelihood $P(D \\mid \\theta)$ ist als Funktion von $\\theta$ betrachtet, nicht von $D$ — sie ist keine Wahrscheinlichkeit über $\\theta$!)',
    },
    {
      title: 'Bayes-Update als Wissens-Update',
      body: 'Bayes-Theorem beschreibt rationales **Lernen aus Daten**:\n\n1. Starte mit Prior $P(\\theta)$ (Vorwissen)\n2. Beobachte Daten $D$\n3. Berechne Posterior $P(\\theta \\mid D) \\propto P(D \\mid \\theta) \\cdot P(\\theta)$\n4. Der Posterior kann als neuer Prior für zukünftige Daten dienen\n\nDas ist **sequenzielles Lernen**: Posterior nach $n$ Datenpunkten = Prior für Datenpunkt $n+1$.\n\nJe mehr Daten, desto mehr dominiert die Likelihood über den Prior — Daten "überschreiben" Vorwissen.',
      miniExample: '10 Münzwürfe, 7 Kopf. Uniform-Prior + Likelihood → Posterior Beta$(8,4)$. Weitere 10 Würfe, 6 Kopf → Beta$(14,8)$ — Prior zieht Richtung 0,5.',
    },
    {
      title: 'Beispiel mit Zahlen: Medizinischer Test',
      body: 'Krankheit: Prävalenz $P(K) = 0{,}01$ (1% der Bevölkerung).\nTest: Sensitivität $P(+\\mid K) = 0{,}95$, Falsch-Positiv-Rate $P(+\\mid \\bar{K}) = 0{,}05$.\n\n$$P(+) = P(+\\mid K)P(K) + P(+\\mid \\bar{K})P(\\bar{K}) = 0{,}0095 + 0{,}0495 = 0{,}059$$\n\n$$P(K \\mid +) = \\frac{0{,}95 \\cdot 0{,}01}{0{,}059} = \\frac{0{,}0095}{0{,}059} \\approx 16{,}1\\%$$\n\n**Ergebnis**: Trotz 95% Sensitivität — nur 16% Wahrscheinlichkeit krank bei positivem Test!\n\nDer niedrige **Prior** (1% Prävalenz) dominiert das Ergebnis.',
      selfCheck: 'Was würde $P(K \\mid +)$ bei höherer Prävalenz $P(K) = 0{,}1$ ergeben? ($P(K \\mid +) \\approx 68\\%$ — Prior hat riesigen Einfluss.)',
    },
    {
      title: 'Verbindung zu MLE',
      body: '**MLE** (Maximum Likelihood Estimation) ignoriert den Prior:\n\n$$\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta P(D \\mid \\theta) \\cdot \\underbrace{P(\\theta)}_{= \\text{const (Uniform-Prior)}}$$\n\n= $\\arg\\max_\\theta P(D \\mid \\theta)$ — nur Likelihood zählt.\n\n**MAP** (Maximum A Posteriori) nutzt den Prior:\n\n$$\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta P(D \\mid \\theta) \\cdot P(\\theta)$$\n\n= $\\arg\\max_\\theta \\left[\\underbrace{\\ln P(D \\mid \\theta)}_{\\text{Log-Likelihood}} + \\underbrace{\\ln P(\\theta)}_{\\text{Log-Prior (Regularisierung)}}\\right]$\n\nMLE mit Uniform-Prior = MAP.',
    },
    {
      title: 'ML: Regularisierung als Prior; Naive Bayes',
      body: '**Gauß-Prior auf Gewichten**:\n\n$$P(\\theta) = \\mathcal{N}(0, \\tau^2) \\quad \\Rightarrow \\quad \\ln P(\\theta) = -\\frac{\\|\\theta\\|^2}{2\\tau^2} + \\text{const}$$\n\nMAP = Maximiere: $\\ell(\\theta) - \\frac{1}{2\\tau^2}\\|\\theta\\|^2$ = **L2-Regularisierung** mit $\\lambda = 1/(2\\tau^2)$.\n\n**Naive Bayes Classifier**:\n$$P(y \\mid \\mathbf{x}) \\propto P(y) \\prod_i P(x_i \\mid y) \\qquad \\text{(bedingte Unabhängigkeit)}$$\n\nDer Prior $P(y)$ (Klassen-Häufigkeit) und die Klassen-bedingten Dichten $P(x_i \\mid y)$ werden aus Daten geschätzt.',
    },
  ],

  codeBridges: [
    {
      title: 'Naive Bayes von Hand + sklearn Vergleich',
      lang: 'python',
      code: `import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.datasets import make_classification

# --- Naive Bayes von Hand (Gauß-Annahme für Features) ---
np.random.seed(42)
# Trainingsdaten: 2 Klassen, 2 Features
X_c0 = np.random.randn(50, 2) + np.array([0, 0])   # Klasse 0: Zentrum (0,0)
X_c1 = np.random.randn(50, 2) + np.array([2, 2])   # Klasse 1: Zentrum (2,2)
X_train = np.vstack([X_c0, X_c1])
y_train = np.array([0]*50 + [1]*50)

# Prior P(y): aus Klassen-Häufigkeit
prior = np.array([0.5, 0.5])  # gleich häufig

# Likelihood P(x_i | y): Gauß-Parameter pro Klasse
mu = np.array([X_c0.mean(0), X_c1.mean(0)])    # Klassenmittelwerte
sigma = np.array([X_c0.std(0), X_c1.std(0)])   # Standardabweichungen

def gaussian_log_prob(x, mu_k, sigma_k):
    """Log-PDF der Gaußverteilung"""
    return -0.5 * ((x - mu_k) / sigma_k)**2 - np.log(sigma_k) - 0.5*np.log(2*np.pi)

# Klassifizierung eines neuen Punkts via Bayes:
x_new = np.array([1.5, 1.5])
log_posteriors = []
for k in range(2):
    # log P(y=k | x) ∝ log P(y=k) + sum_i log P(x_i | y=k)
    log_p = np.log(prior[k]) + gaussian_log_prob(x_new, mu[k], sigma[k]).sum()
    log_posteriors.append(log_p)
pred_class = np.argmax(log_posteriors)
print(f"Vorhersage: Klasse {pred_class}")  # Klasse 1

# --- sklearn GaussianNB (identisch, aber optimiert) ---
gnb = GaussianNB()
gnb.fit(X_train, y_train)
print(f"sklearn: {gnb.predict([x_new])}")   # Klasse 1
# Probability output:
print(f"P(y=0|x) = {gnb.predict_proba([x_new])[0,0]:.3f}")
print(f"P(y=1|x) = {gnb.predict_proba([x_new])[0,1]:.3f}")`,
      annotation: 'Naive Bayes ist ein direktes Anwendungsbeispiel von Bayes-Theorem: $P(y \\mid x) \\propto P(y) \\prod_i P(x_i \\mid y)$. Die Annahme der bedingten Unabhängigkeit der Features vereinfacht massiv — trotzdem oft überraschend effektiv für Textklassifikation.',
    },
  ],

  derivations: [
    {
      claim: 'Bayes-Theorem folgt aus der Multiplikationsregel',
      reasoning:
        'Aus der Multiplikationsregel: $P(A \\cap B) = P(A \\mid B) P(B)$ und $P(A \\cap B) = P(B \\mid A) P(A)$. Da beide gleich $P(A \\cap B)$ sind: $P(A \\mid B) P(B) = P(B \\mid A) P(A)$. Division durch $P(B) > 0$: $P(A \\mid B) = P(B \\mid A) P(A) / P(B)$. Der Nenner $P(B)$ wird mit dem Satz der totalen Wahrscheinlichkeit berechnet: $P(B) = \\sum_i P(B \\mid A_i) P(A_i)$.',
    },
    {
      claim: 'MAP mit Gauß-Prior ergibt L2-Regularisierung',
      reasoning:
        'MAP: $\\hat{\\theta} = \\arg\\max_\\theta [\\ln P(D \\mid \\theta) + \\ln P(\\theta)]$. Gauß-Prior: $P(\\theta) = \\prod_j \\mathcal{N}(\\theta_j; 0, \\tau^2) \\propto \\exp(-\\frac{\\|\\theta\\|^2}{2\\tau^2})$. Log-Prior: $\\ln P(\\theta) = -\\frac{\\|\\theta\\|^2}{2\\tau^2} + \\text{const}$. MAP-Zielfunktion: $\\ln P(D \\mid \\theta) - \\frac{\\|\\theta\\|^2}{2\\tau^2}$. Maximieren = NLL minimieren $+ \\lambda\\|\\theta\\|^2$ mit $\\lambda = 1/(2\\tau^2)$. Das ist genau L2-Regularisierung.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Likelihood $P(D \\mid \\theta)$ ist eine Wahrscheinlichkeit über $\\theta$',
      correct: 'Likelihood ist eine Funktion von $\\theta$ bei festem $D$ — sie ist keine Wahrscheinlichkeit über $\\theta$ und muss nicht auf 1 summieren',
      explanation:
        '$\\int P(D \\mid \\theta)\\, d\\theta \\neq 1$ im Allgemeinen. Die Likelihood gibt an, wie "kompatibel" Parameter $\\theta$ mit den beobachteten Daten $D$ sind. Der Posterior $P(\\theta \\mid D)$ ist eine Wahrscheinlichkeit über $\\theta$ — die Likelihood multipliziert mit dem Prior, normiert.',
    },
    {
      wrong: '$P(H \\mid E) = P(E \\mid H)$',
      correct: '$P(H \\mid E) = P(E \\mid H) \\cdot P(H) / P(E)$ — beide Terme unterscheiden sich durch Prior und Evidenz',
      explanation:
        'Diese Verwechslung (Prosecutor\'s Fallacy) führt zu systematischen Denkfehlern: z.B. $P(\\text{DNA-Match} \\mid \\text{unschuldig})$ ist klein, aber $P(\\text{unschuldig} \\mid \\text{DNA-Match})$ kann trotzdem groß sein, wenn viele Verdächtige vorhanden.',
    },
    {
      wrong: 'Bayesianisches Training ist zu teuer für neuronale Netze',
      correct: 'Approximationen wie Monte Carlo Dropout, Variational Inference (ELBO) oder Laplace-Approximation ermöglichen praktikables Bayesianisches Training',
      explanation:
        'Exakte Posterior-Berechnung ist für große Netze intraktabel. Aber Näherungen liefern Unsicherheitsschätzungen. Zudem ist MAP (Regularisierung) eine deterministische Näherung des Bayesianischen Frameworks.',
    },
  ],

  furtherResources: [
    {
      title: 'StatQuest: "Bayes\' Theorem, Clearly Explained" (YouTube)',
      type: 'video',
      note: 'Visuelle Herleitung mit medizinischem Beispiel; erklärt Prior-Dominanz klar',
    },
    {
      title: '3Blue1Brown: "Bayes theorem, the geometry of changing beliefs" (YouTube)',
      type: 'video',
      note: 'Geometrische Intuition mit Flächendiagrammen; sehr empfehlenswert',
    },
    {
      title: 'MML Book, Kapitel 8.4: "Bayesian Linear Regression"',
      type: 'book',
      note: 'Vollständige bayesianische Herleitung für lineare Regression; zeigt Prior→Posterior-Update',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.bedingte-wahrscheinlichkeit',
      relation: 'requires',
      hint: 'Bayes-Theorem folgt direkt aus der bedingten Wahrscheinlichkeit und der Multiplikationsregel.',
    },
    {
      lessonId: 'p1.mle',
      relation: 'extends',
      hint: 'MLE ist MAP mit Uniform-Prior — Lektion 09 vertieft die MLE-Perspektive.',
    },
    {
      lessonId: 'p1.map-regularisierung-bias-variance',
      relation: 'extends',
      hint: 'MAP mit verschiedenen Priors ergibt L2/L1-Regularisierung — Lektion 10 behandelt das im Detail.',
    },
    {
      lessonId: 'p1.diskrete-verteilungen',
      relation: 'see-also',
      hint: 'Naive Bayes Classifier nutzt bedingte Unabhängigkeit von diskreten/kontinuierlichen Features gegeben Klasse.',
    },
  ],

  reflection: 'Bayes-Theorem verbindet Prior-Wissen mit Daten zu einer konsistenten Überzeugung. Jede Regularisierungsentscheidung (L2, L1, Dropout) ist eine implizite Aussage über den Prior auf Gewichte. **Was hat dich mehr überrascht: dass 16% bei positivem Testergebnis der korrekte Wert ist, oder die direkte Verbindung zwischen Gauß-Prior und L2-Regularisierung?**',
}
