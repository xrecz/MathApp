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
}
