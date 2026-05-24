import type { Lesson } from '../../types'

export const wahrscheinlichkeit: Lesson = {
  id: 'p0.wahrscheinlichkeit',
  title: 'Wahrscheinlichkeit als relative Häufigkeit',
  conceptTags: ['probability', 'event', 'frequency', 'distribution'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Was ist Wahrscheinlichkeit?\n\nWahrscheinlichkeit misst, wie oft ein Ereignis bei sehr vielen Versuchen auftritt. Sie liegt immer zwischen 0 (unmöglich) und 1 (sicher). Im ML gibt jeder Klassifikator Wahrscheinlichkeiten aus — und du brauchst dieses Fundament, um sie zu interpretieren.',
      },
      {
        kind: 'math',
        content:
          '$$P(A) \\in [0, 1] \\qquad P(\\bar{A}) = 1 - P(A) \\qquad \\sum_i P(A_i) = 1$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Der Output einer Softmax-Schicht ist immer eine gültige Wahrscheinlichkeitsverteilung — alle Werte ≥ 0, Summe = 1. Jeder Klassifikator gibt dir solche Verteilungen.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Laplace-Wahrscheinlichkeit\n\nBei gleich wahrscheinlichen Ergebnissen:\n\n$P(A) = \\frac{\\text{Anzahl günstige Ergebnisse}}{\\text{Anzahl mögliche Ergebnisse}}$\n\n**Beispiel Würfel**: $P(\\text{gerade Zahl}) = \\frac{3}{6} = 0{,}5$\n\n### Komplement\n\n$P(\\bar{A}) = 1 - P(A)$\n\nWenn $P(\\text{Regen}) = 0{,}3$, dann $P(\\text{kein Regen}) = 0{,}7$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Gültige vs. ungültige Verteilung**:\n\n$(0{,}1,\\; 0{,}3,\\; 0{,}6)$: Summe = $1{,}0$ ✓ — gültig\n\n$(0{,}2,\\; 0{,}3,\\; 0{,}6)$: Summe = $1{,}1$ ✗ — ungültig\n\nSoftmax garantiert immer eine gültige Verteilung.',
      },
    ],
    practice: [
      {
        id: 'p0.prob.ex1',
        difficulty: 1,
        conceptTags: ['probability'],
        type: 'mc',
        prompt: 'Wahrscheinlichkeit für "6 würfeln" mit einem fairen Würfel?',
        options: ['$\\frac{1}{6}$', '$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{5}{6}$'],
        answer: '$\\frac{1}{6}$',
        hints: [
          'Ein fairer Würfel hat 6 gleich wahrscheinliche Seiten.',
          'Genau eine Seite zeigt 6.',
          '$P(6) = \\frac{1}{6} \\approx 0{,}167$.',
        ],
        explanation: '$P(6) = \\frac{1 \\text{ günstig}}{6 \\text{ möglich}} = \\frac{1}{6}$.',
      },
      {
        id: 'p0.prob.ex2',
        difficulty: 2,
        conceptTags: ['probability'],
        type: 'numeric',
        prompt: 'Wahrscheinlichkeit für "gerade Zahl" beim Würfeln?',
        answer: 0.5,
        acceptedAlternatives: ['0,5', '1/2', '3/6'],
        hints: [
          'Gerade Zahlen beim Würfel: 2, 4, 6 — das sind 3 von 6.',
          '$P = \\frac{3}{6}$.',
          '$\\frac{3}{6} = 0{,}5$.',
        ],
        explanation: '$P(\\text{gerade}) = \\frac{3}{6} = 0{,}5$.',
      },
      {
        id: 'p0.prob.ex3',
        difficulty: 2,
        conceptTags: ['complement'],
        type: 'numeric',
        prompt: '$P(\\text{Regen}) = 0{,}3$. Wie groß ist $P(\\text{kein Regen})$?',
        answer: 0.7,
        acceptedAlternatives: ['0,7', '7/10'],
        hints: [
          'Komplement-Wahrscheinlichkeit: $P(\\bar{A}) = 1 - P(A)$.',
          '$1 - 0{,}3 = ?$',
          '$1 - 0{,}3 = 0{,}7$.',
        ],
        explanation: '$P(\\text{kein Regen}) = 1 - 0{,}3 = 0{,}7$.',
      },
      {
        id: 'p0.prob.ex4',
        difficulty: 3,
        conceptTags: ['distribution', 'ml'],
        type: 'mc',
        prompt:
          'Klassifikator-Output: $(0{,}1,\\; 0{,}3,\\; 0{,}6)$ für 3 Klassen. Ist das eine gültige Verteilung?',
        options: ['Ja — Summe = 1, alle Werte ≥ 0', 'Nein — Werte sind zu klein', 'Nein — Summe stimmt nicht'],
        answer: 'Ja — Summe = 1, alle Werte ≥ 0',
        hints: [
          'Prüfe: sind alle Werte $\\geq 0$?',
          'Prüfe: $0{,}1 + 0{,}3 + 0{,}6 = ?$',
          '$1{,}0$ — gültig.',
        ],
        explanation: '$0{,}1 + 0{,}3 + 0{,}6 = 1{,}0$ und alle $\\geq 0$ → gültige Wahrscheinlichkeitsverteilung.',
      },
      {
        id: 'p0.prob.ex5',
        difficulty: 3,
        conceptTags: ['distribution'],
        type: 'mc',
        prompt: 'Klassifikator-Output: $(0{,}2,\\; 0{,}3,\\; 0{,}6)$. Gültig?',
        options: ['Nein — Summe ist 1,1', 'Ja — alle Werte ≥ 0', 'Nein — 0,2 ist zu klein'],
        answer: 'Nein — Summe ist 1,1',
        hints: [
          'Prüfe die Summe: $0{,}2 + 0{,}3 + 0{,}6 = ?$',
          '$1{,}1 \\neq 1$.',
          'Die Summe muss genau 1 sein.',
        ],
        explanation: '$0{,}2 + 0{,}3 + 0{,}6 = 1{,}1 \\neq 1$ → ungültig. Softmax garantiert Summe = 1.',
      },
      {
        id: 'p0.prob.ex6',
        difficulty: 4,
        conceptTags: ['probability', 'ml'],
        type: 'numeric',
        prompt:
          '**ML-Aufgabe**: Ein Spam-Filter schätzt $P(\\text{Spam}) = 0{,}95$. Wie groß ist $P(\\text{kein Spam})$?',
        answer: 0.05,
        acceptedAlternatives: ['0,05', '5/100', '1/20'],
        hints: [
          'Komplement-Wahrscheinlichkeit.',
          '$1 - 0{,}95 = ?$',
          '$1 - 0{,}95 = 0{,}05$.',
        ],
        explanation: '$P(\\text{kein Spam}) = 1 - 0{,}95 = 0{,}05$. Das Modell ist zu 95 % sicher, Spam erkannt zu haben.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Wahrscheinlichkeiten in ML\n\nJedes Klassifikationsmodell — von logistischer Regression über Random Forest bis zu GPT — gibt am Ende eine Wahrscheinlichkeitsverteilung über Klassen aus. Softmax garantiert:',
      },
      {
        kind: 'math',
        content: '$$\\sum_i \\hat{y}_i = 1 \\qquad \\hat{y}_i \\geq 0 \\quad \\forall i$$',
      },
      {
        kind: 'callout',
        content:
          'Wenn du sagst "das Modell ist zu 80 % sicher", meinst du: $P(\\text{Klasse A}) = 0{,}8$. Diese Intuition kommt direkt aus dem, was du gerade gelernt hast. Cross-Entropy-Loss bestraft dann Modelle, die bei richtigen Klassen zu niedrige Wahrscheinlichkeiten ausgeben.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.prob.card1',
      front: 'Laplace-Wahrscheinlichkeit?',
      back: '$\\frac{\\text{günstige}}{\\text{mögliche}}$ Ergebnisse.',
      conceptTags: ['probability'],
    },
    {
      id: 'p0.prob.card2',
      front: 'Komplement-Wahrscheinlichkeit?',
      back: '$P(\\bar{A}) = 1 - P(A)$',
      conceptTags: ['complement'],
    },
    {
      id: 'p0.prob.card3',
      front: 'Wertebereich einer Wahrscheinlichkeit?',
      back: '$P(A) \\in [0, 1]$',
      conceptTags: ['probability'],
    },
  ],

  learningOutcome:
    'Du kannst Wahrscheinlichkeiten berechnen und interpretieren, Rechenregeln anwenden und verstehst die Grundidee bedingter Wahrscheinlichkeit — als Fundament für probabilistische ML-Modelle.',

  description:
    'Wahrscheinlichkeit ist die Sprache der Unsicherheit — und ML ist im Kern die Kunst, mit Unsicherheit umzugehen. Von Softmax-Ausgaben bis zu Prior-Wissen in Bayesianischen Modellen: Wahrscheinlichkeit steckt überall.',

  conceptSteps: [
    {
      title: 'Was ist Wahrscheinlichkeit?',
      preprompt: 'Du wirfst eine faire Münze 1000 Mal. Wie oft fällt Kopf näherungsweise? Was passiert, wenn du die Münze 1.000.000 Mal wirfst?',
      body: 'Wahrscheinlichkeit beschreibt, **wie oft ein Ereignis bei vielen Versuchen auftritt**:\n\n$$P(A) = \\lim_{n \\to \\infty} \\frac{\\text{Anzahl Auftreten von } A}{n}$$\n\nAxiome (Kolmogorow):\n1. $P(A) \\geq 0$ — Wahrscheinlichkeit ist nie negativ\n2. $P(\\Omega) = 1$ — irgendetwas passiert immer (Grundraum $\\Omega$)\n3. $P(A \\cup B) = P(A) + P(B)$ für disjunkte $A, B$\n\nDaraus folgt: $P(A) \\in [0, 1]$ und $P(\\bar{A}) = 1 - P(A)$.',
      miniExample: 'Münzwurf: $P(\\text{Kopf}) = 0{,}5$, $P(\\text{Zahl}) = 0{,}5$, $P(\\text{Kopf}) + P(\\text{Zahl}) = 1$ ✓',
      selfCheck: 'Kann $P(A) = 1{,}3$ sein? (Nein — Wahrscheinlichkeit liegt immer in $[0,1]$.)',
    },
    {
      title: 'Wahrscheinlichkeitsraum und Ereignisse',
      body: 'Ein **Wahrscheinlichkeitsraum** besteht aus:\n\n- $\\Omega$: **Grundraum** — alle möglichen Ergebnisse\n- $\\mathcal{F}$: Menge der **Ereignisse** (Teilmengen von $\\Omega$)\n- $P: \\mathcal{F} \\to [0, 1]$: **Wahrscheinlichkeitsmaß**\n\nBeispiel Würfelwurf:\n$$\\Omega = \\{1, 2, 3, 4, 5, 6\\}$$\n$$A = \\{2, 4, 6\\} \\quad \\text{(gerade Zahl)} \\quad P(A) = \\frac{3}{6} = 0{,}5$$\n\n**Laplace-Modell** (gleich wahrscheinliche Ergebnisse):\n$$P(A) = \\frac{|A|}{|\\Omega|}$$',
      miniExample: '$P(\\text{Primzahl beim Würfel}) = P(\\{2,3,5\\}) = \\frac{3}{6} = 0{,}5$',
      selfCheck: 'Wie groß ist $P(\\{1,2,3,4,5,6\\})$ beim fairen Würfel? ($P(\\Omega) = 1$ — einer der sechs Werte kommt sicher.)',
    },
    {
      title: 'Rechenregeln: Addition und Multiplikation',
      body: '**Additionsregel**:\n$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$\n\nBei disjunkten Ereignissen ($A \\cap B = \\emptyset$): $P(A \\cup B) = P(A) + P(B)$\n\n**Multiplikationsregel** (für unabhängige Ereignisse):\n$$P(A \\cap B) = P(A) \\cdot P(B)$$\n\n**Komplement**:\n$$P(\\bar{A}) = 1 - P(A)$$\n\nIn ML: Klassen-Wahrscheinlichkeiten $P(y = k \\mid x)$ summieren zu 1 — Additionsregel über alle Klassen.',
      miniExample: 'Würfel: $P(\\text{gerade oder} < 3) = P(\\{2,4,6\\}) + P(\\{1,2\\}) - P(\\{2\\}) = 0{,}5 + 0{,}33 - 0{,}17 = 0{,}67$',
      selfCheck: 'Zwei unabhängige faire Münzen. $P(\\text{beide Kopf}) = ?$ ($0{,}5 \\cdot 0{,}5 = 0{,}25$)',
    },
    {
      title: 'Bedingte Wahrscheinlichkeit (Grundidee)',
      body: '**Bedingte Wahrscheinlichkeit**: Wie wahrscheinlich ist $A$, wenn wir wissen, dass $B$ eingetreten ist?\n\n$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} \\qquad \\text{(falls } P(B) > 0\\text{)}$$\n\n**Intuition**: $B$ schränkt den Grundraum ein — wir schauen nur noch auf Fälle, in denen $B$ gilt.\n\nBeispiel: $P(\\text{gerade} \\mid \\text{Zahl} > 3) = P(\\{4,6\\} \\mid \\{4,5,6\\}) = \\frac{2/6}{3/6} = \\frac{2}{3}$\n\nIn ML: $P(\\text{Spam} \\mid \\text{enthält "Gewinn"})$ ist typisch für Naive Bayes.',
      miniExample: 'Spam-Filter: $P(\\text{Spam} \\mid \\text{Wort "Gratis"}) \\gg P(\\text{Spam})$ — das Wort ist ein starkes Signal',
      selfCheck: 'Was bedeutet $P(A \\mid B) = P(A)$? (Ereignis $B$ gibt keine neue Information über $A$ — $A$ und $B$ sind unabhängig.)',
    },
    {
      title: 'Unabhängigkeit',
      body: 'Zwei Ereignisse $A$ und $B$ sind **stochastisch unabhängig**, wenn:\n\n$$P(A \\cap B) = P(A) \\cdot P(B)$$\n\nÄquivalent: $P(A \\mid B) = P(A)$ — Kenntnis von $B$ ändert nichts an $P(A)$.\n\n**Naive Bayes-Annahme**: Features $x_1, \\ldots, x_n$ sind unabhängig gegeben der Klasse:\n$$P(x_1, \\ldots, x_n \\mid y) = \\prod_{i=1}^n P(x_i \\mid y)$$\n\nDas macht Berechnung effizient — auch wenn die Annahme in der Praxis selten strikt gilt.',
      miniExample: 'Zwei Würfelwürfe: $P(\\text{6 und 6}) = P(\\text{6}) \\cdot P(\\text{6}) = \\frac{1}{6} \\cdot \\frac{1}{6} = \\frac{1}{36}$',
      selfCheck: 'Sind "Karte ist Ass" und "Karte ist Herz" unabhängig? ($P(\\text{Ass}) = \\frac{4}{52}$, $P(\\text{Herz}) = \\frac{13}{52}$, $P(\\text{Ass und Herz}) = \\frac{1}{52} = \\frac{4}{52} \\cdot \\frac{13}{52}$ ✓ — ja, unabhängig.)',
    },
    {
      title: 'ML: Wahrscheinlichkeiten in Klassifikatoren',
      body: 'Softmax wandelt Logits (rohe Scores) in gültige Wahrscheinlichkeitsverteilungen um:\n\n$$P(y = k \\mid x) = \\frac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}$$\n\nEigenschaften:\n- $P(y = k \\mid x) \\geq 0$ für alle $k$ ✓\n- $\\sum_{k=1}^{K} P(y = k \\mid x) = 1$ ✓\n\n**Entropie** misst die Unsicherheit einer Verteilung:\n$$H(p) = -\\sum_{k=1}^{K} p_k \\ln(p_k)$$\n\nHohe Entropie = viel Unsicherheit (Verteilung breit); niedrige Entropie = sicher (Peak bei einer Klasse).',
      miniExample: '$p = (1, 0, 0)$: $H = 0$ (maximale Sicherheit). $p = (0{,}33, 0{,}33, 0{,}33)$: $H = \\ln(3) \\approx 1{,}10$ (maximale Unsicherheit)',
      selfCheck: 'Warum kann Softmax kein $P(y=k) = 0$ exakt ausgeben? (Weil $e^x > 0$ für alle $x$ — Softmax gibt immer strikt positive Wahrscheinlichkeiten.)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Wahrscheinlichkeiten und Entropie',
      lang: 'python',
      code: `import torch
import torch.distributions as dist

# Kategorische Verteilung (diskrete Klassen)
probs = torch.tensor([0.1, 0.6, 0.3])  # P(Klasse 0, 1, 2)

# Wahrscheinlichkeitsverteilung erstellen
cat = dist.Categorical(probs=probs)

# Stichproben ziehen (wie Modell-Vorhersagen simulieren)
samples = cat.sample((100,))  # 100 Samples
print(f"Klasse 1 Häufigkeit: {(samples == 1).float().mean():.2f}")  # ≈ 0.60

# Entropie: -sum(p_k * log(p_k)) — misst Unsicherheit
entropy = cat.entropy()
print(f"Entropie: {entropy:.3f}")  # nats

# Vergleich: maximale Entropie (Gleichverteilung)
uniform = dist.Categorical(probs=torch.ones(3) / 3)
print(f"Gleichverteilung Entropie: {uniform.entropy():.3f}")  # = log(3) ≈ 1.099

# Log-Wahrscheinlichkeiten (für numerische Stabilität)
log_prob = cat.log_prob(torch.tensor(1))  # log P(Klasse=1) = log(0.6)
print(f"log P(1): {log_prob:.3f}")  # ≈ -0.511`,
      annotation: '`dist.Categorical` modelliert Softmax-Ausgaben: eine Verteilung über $K$ Klassen. `.entropy()` berechnet $H(p) = -\\sum_k p_k \\ln p_k$ — je höher, desto unsicherer das Modell. `.log_prob()` berechnet $\\ln P(y = k)$ — direkt die Komponente im Cross-Entropy-Loss.',
    },
  ],

  derivations: [
    {
      claim: 'Additionsregel: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$',
      reasoning:
        'Die Elemente in $A \\cup B$ setzen sich zusammen aus: Elemente nur in $A$, Elemente nur in $B$, und Elemente in $A \\cap B$. Zählt man $P(A) + P(B)$, werden Elemente in $A \\cap B$ zweimal gezählt. Daher muss man $P(A \\cap B)$ einmal subtrahieren: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$P(A \\text{ und } B) = P(A) + P(B)$',
      correct: '$P(A \\text{ und } B) = P(A) \\cdot P(B)$ (nur bei Unabhängigkeit)',
      explanation:
        'Addition gilt für **disjunkte** Ereignisse ($A$ oder $B$, nicht beides). Multiplikation gilt für **unabhängige** Ereignisse ($A$ und $B$ gleichzeitig). Beide können nicht gleichzeitig gelten (außer $P = 0$).',
    },
    {
      wrong: '$P(A \\mid B) = P(B \\mid A)$',
      correct: 'Im Allgemeinen gilt $P(A \\mid B) \\neq P(B \\mid A)$',
      explanation:
        '"Wenn Regen, dann nasse Straße" $\\neq$ "Wenn nasse Straße, dann Regen". Das ist der Base-Rate-Fehler — wichtig in Bayes-Klassifikatoren.',
    },
    {
      wrong: '$P = 0$ bedeutet "unmöglich", $P = 1$ bedeutet "sicher"',
      correct: 'Strikt: das ist nur für diskrete Räume klar; bei stetigen Verteilungen hat jeder Punkt $P = 0$',
      explanation:
        'Bei kontinuierlichen Zufallsvariablen (z.B. normalverteilte Gewichte) gilt $P(x = c) = 0$ für jeden konkreten Wert — Wahrscheinlichkeit bezieht sich dort auf Intervalle (Integral der Dichte).',
    },
  ],

  furtherResources: [
    {
      title: 'Khan Academy: "Basic probability" (Videoreihe)',
      type: 'video',
      note: 'Vollständige Einführung mit Würfeln, Münzen und Karten — sehr anschaulich',
    },
    {
      title: '3Blue1Brown: "Bayes theorem" (Video)',
      type: 'video',
      note: 'Erklärt bedingte Wahrscheinlichkeit und Bayes visuell — 15 Minuten, unverzichtbar',
    },
    {
      title: 'Serlo: "Stochastik" — serlo.org',
      type: 'article',
      note: 'Deutsche Einführung in Wahrscheinlichkeitsrechnung mit allen Grundregeln',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.logarithmus',
      relation: 'see-also',
      hint: 'Log-Wahrscheinlichkeiten und Cross-Entropy-Loss: Logarithmus angewandt auf Wahrscheinlichkeiten.',
    },
    {
      lessonId: 'p0.histogramme',
      relation: 'extends',
      hint: 'Histogramme schätzen Wahrscheinlichkeitsverteilungen aus Daten empirisch.',
    },
    {
      lessonId: 'p1.bedingte-wahrscheinlichkeit',
      relation: 'extends',
      hint: 'Phase 1 formalisiert bedingte Wahrscheinlichkeit und leitet Bayes-Theorem her.',
    },
    {
      lessonId: 'p1.bayes-theorem',
      relation: 'extends',
      hint: 'Bayes-Theorem kombiniert Prior $P(\\theta)$ und Likelihood $P(x \\mid \\theta)$ zu Posterior $P(\\theta \\mid x)$.',
    },
  ],

  reflection: 'Du hast gelernt: **Wahrscheinlichkeit** ist das Fundament für das Denken über Unsicherheit in ML. Softmax, Cross-Entropy, Bayes-Klassifikatoren — alles baut auf diesen Grundregeln auf. Welches probabilistische Konzept hat sich für dich am überraschendsten als ML-relevant herausgestellt?',
}
