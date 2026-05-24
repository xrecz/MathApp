import type { Lesson } from '../../../types'

export const bedingteWahrscheinlichkeit: Lesson = {
  id: 'p1.bedingte-wahrscheinlichkeit',
  title: 'Bedingte Wahrscheinlichkeit',
  conceptTags: ['conditional-probability', 'independence', 'chain-rule', 'joint-probability'],
  estimatedMinutes: 15,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Bedingte Wahrscheinlichkeit\n\n$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0$$\n\n"Wahrscheinlichkeit von $A$, gegeben dass $B$ bereits eingetreten ist."\n\n**Unabhängigkeit**: $A \\perp B$ genau dann wenn\n$$P(A \\mid B) = P(A) \\quad \\Leftrightarrow \\quad P(A \\cap B) = P(A)\\cdot P(B)$$\n\n**Kettenregel**: $P(A \\cap B) = P(A \\mid B)\\cdot P(B) = P(B \\mid A)\\cdot P(A)$',
      },
      {
        kind: 'math',
        content:
          '$$P(X_1, X_2, \\ldots, X_n) = P(X_1) \\cdot P(X_2 \\mid X_1) \\cdot P(X_3 \\mid X_1, X_2) \\cdots$$\n\n$$= \\prod_{i=1}^n P(X_i \\mid X_1, \\ldots, X_{i-1})$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Das Sprachmodell $p(w_1, w_2, \\ldots, w_T)$ wird via Kettenregel faktorisiert: $\\prod_t P(w_t \\mid w_1, \\ldots, w_{t-1})$. Jedes Autoregressive Modell (GPT, LLaMA) modelliert genau diese bedingten Wahrscheinlichkeiten.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Gesetz der totalen Wahrscheinlichkeit\n\nFür eine Partition $\\{B_1, \\ldots, B_n\\}$ von $\\Omega$:\n\n$$P(A) = \\sum_{i=1}^n P(A \\mid B_i)\\cdot P(B_i)$$\n\n### Bedingte Unabhängigkeit\n\n$X \\perp Y \\mid Z$: $X$ und $Y$ sind unabhängig gegeben $Z$.\n\n$P(X, Y \\mid Z) = P(X \\mid Z) \\cdot P(Y \\mid Z)$\n\n→ Naive-Bayes-Annahme: Features $X_i$ unabhängig gegeben Klasse $Y$.\n\n### Marginalisierung\n\n$$P(X) = \\sum_y P(X, Y=y) = \\sum_y P(X \\mid Y=y)\\cdot P(Y=y)$$',
      },
      {
        kind: 'worked-example',
        content:
          '**Autoregressive Sprachmodellierung**:\n\n$P(\\text{"der Hund bellt"}) = P(\\text{"der"}) \\cdot P(\\text{"Hund"} \\mid \\text{"der"}) \\cdot P(\\text{"bellt"} \\mid \\text{"der Hund"})$\n\nJede bedingte Wahrscheinlichkeit wird durch das Netz berechnet:\n\n$P(w_t \\mid w_{1:t-1}) = \\text{softmax}(W \\cdot h_t)$\n\nTraining: Cross-Entropy-Loss $= -\\sum_t \\ln P(w_t \\mid w_{1:t-1})$.',
      },
    ],
    practice: [
      {
        id: 'p1.bp.ex1',
        difficulty: 1,
        conceptTags: ['conditional-probability'],
        type: 'mc',
        prompt:
          '$P(A \\cap B) = 0{,}12$, $P(B) = 0{,}4$. Was ist $P(A \\mid B)$?',
        options: ['$0{,}3$', '$0{,}048$', '$0{,}52$', '$0{,}12$'],
        answer: '$0{,}3$',
        hints: [
          '$P(A \\mid B) = P(A \\cap B) / P(B)$.',
          '$= 0{,}12 / 0{,}4$.',
          '$= 0{,}3$.',
        ],
        explanation:
          '$P(A \\mid B) = 0{,}12 / 0{,}4 = 0{,}3$. Bedingte Wahrscheinlichkeit = Schnittwahrscheinlichkeit geteilt durch Konditionierungsereignis.',
      },
      {
        id: 'p1.bp.ex2',
        difficulty: 1,
        conceptTags: ['independence'],
        type: 'mc',
        prompt: '$A$ und $B$ sind unabhängig mit $P(A) = 0{,}6$ und $P(B) = 0{,}5$. Was ist $P(A \\cap B)$?',
        options: ['$0{,}3$', '$0{,}6$', '$0{,}55$', '$0{,}1$'],
        answer: '$0{,}3$',
        hints: [
          'Unabhängigkeit: $P(A \\cap B) = P(A) \\cdot P(B)$.',
          '$= 0{,}6 \\cdot 0{,}5$.',
          '$= 0{,}3$.',
        ],
        explanation:
          '$P(A \\cap B) = P(A) \\cdot P(B) = 0{,}6 \\cdot 0{,}5 = 0{,}3$ bei Unabhängigkeit.',
      },
      {
        id: 'p1.bp.ex3',
        difficulty: 2,
        conceptTags: ['chain-rule'],
        type: 'mc',
        prompt: 'Kettenregel: $P(A \\cap B \\cap C) = ?$',
        options: [
          '$P(A) \\cdot P(B \\mid A) \\cdot P(C \\mid A, B)$',
          '$P(A) + P(B) + P(C)$',
          '$P(A \\mid B) \\cdot P(B \\mid C) \\cdot P(C)$',
          '$P(A) \\cdot P(B) \\cdot P(C)$ (immer)',
        ],
        answer: '$P(A) \\cdot P(B \\mid A) \\cdot P(C \\mid A, B)$',
        hints: [
          'Kettenregel: $P(A \\cap B) = P(A) \\cdot P(B \\mid A)$.',
          'Erweiterung auf $C$: $P(A \\cap B \\cap C) = P(A \\cap B) \\cdot P(C \\mid A \\cap B)$.',
          '$= P(A) \\cdot P(B \\mid A) \\cdot P(C \\mid A, B)$.',
        ],
        explanation:
          'Kettenregel: $P(A \\cap B \\cap C) = P(A) \\cdot P(B \\mid A) \\cdot P(C \\mid A, B)$. Letztes Glied $P(C \\mid A,B)$ = Produkt nur bei Unabhängigkeit.',
      },
      {
        id: 'p1.bp.ex4',
        difficulty: 2,
        conceptTags: ['joint-probability', 'chain-rule'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: GPT-Modell für Sequenz $(w_1, w_2, w_3)$. Welche Faktorisierung nutzt es?',
        options: [
          '$P(w_1) \\cdot P(w_2 \\mid w_1) \\cdot P(w_3 \\mid w_1, w_2)$ — autoregressive Kettenregel',
          '$P(w_1) \\cdot P(w_2) \\cdot P(w_3)$ — unabhängige Tokens',
          '$P(w_3 \\mid w_1, w_2) \\cdot P(w_2 \\mid w_1) \\cdot P(w_1 \\mid w_2, w_3)$ — bidirektional',
          '$P(w_1, w_2, w_3)$ direkt — keine Faktorisierung',
        ],
        answer:
          '$P(w_1) \\cdot P(w_2 \\mid w_1) \\cdot P(w_3 \\mid w_1, w_2)$ — autoregressive Kettenregel',
        hints: [
          'Autoregressive Modelle: linkes Kontext.',
          'GPT generiert links nach rechts.',
          'Jedes Token bedingt auf alle vorherigen.',
        ],
        explanation:
          'GPT faktorisiert via Kettenregel: $P(w_{1:T}) = \\prod_t P(w_t \\mid w_{1:t-1})$. Das ist die Grundlage aller autoregressiven Sprachmodelle.',
      },
      {
        id: 'p1.bp.ex5',
        difficulty: 3,
        conceptTags: ['conditional-probability'],
        type: 'mc',
        prompt:
          'Gesetz der totalen Wahrscheinlichkeit: Klassen $C_1$ (40%), $C_2$ (60%). $P(\\text{Fehler} \\mid C_1) = 0{,}1$, $P(\\text{Fehler} \\mid C_2) = 0{,}05$. Was ist $P(\\text{Fehler})$?',
        options: ['$0{,}07$', '$0{,}15$', '$0{,}075$', '$0{,}06$'],
        answer: '$0{,}07$',
        hints: [
          '$P(\\text{Fehler}) = P(\\text{Fehler} \\mid C_1) P(C_1) + P(\\text{Fehler} \\mid C_2) P(C_2)$.',
          '$= 0{,}1 \\cdot 0{,}4 + 0{,}05 \\cdot 0{,}6$.',
          '$= 0{,}04 + 0{,}03 = 0{,}07$.',
        ],
        explanation:
          '$P(\\text{Fehler}) = 0{,}1 \\cdot 0{,}4 + 0{,}05 \\cdot 0{,}6 = 0{,}04 + 0{,}03 = 0{,}07$. 7% Gesamtfehlerrate — gewichteter Durchschnitt über Klassen.',
      },
      {
        id: 'p1.bp.ex6',
        difficulty: 4,
        conceptTags: ['independence', 'conditional-probability'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Naive Bayes nimmt $P(x_1, \\ldots, x_d \\mid y) = \\prod_i P(x_i \\mid y)$ an. Was ist die Annahme?',
        options: [
          'Bedingte Unabhängigkeit der Features gegeben die Klasse: $x_i \\perp x_j \\mid y$',
          'Marginale Unabhängigkeit: $x_i \\perp x_j$',
          'Gleiche Verteilung aller Features',
          'Lineare Abhängigkeit zwischen Features und Klasse',
        ],
        answer:
          'Bedingte Unabhängigkeit der Features gegeben die Klasse: $x_i \\perp x_j \\mid y$',
        hints: [
          'Das Produkt $\\prod_i P(x_i \\mid y)$ ist die Faktorisierung bei bedingter Unabhängigkeit.',
          'Gegeben Klasse $y$ sind Features voneinander unabhängig.',
          '\"Naiv\", weil diese Annahme oft verletzt ist, aber trotzdem gut funktioniert.',
        ],
        explanation:
          'Naive Bayes: $P(x_1,\\ldots,x_d \\mid y) = \\prod_i P(x_i \\mid y)$ ⟺ $x_i \\perp x_j \\mid y$. Trotz grober Vereinfachung effektiv für Textklassifikation.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Bedingte Wahrscheinlichkeit in der Sprachmodellierung\n\n**Perplexität**: $\\text{PP} = 2^{-\\frac{1}{T}\\sum_t \\log_2 P(w_t \\mid w_{1:t-1})}$\n\n= geometrisches Mittel der inversen bedingten Wahrscheinlichkeiten. Niedrige Perplexität = Modell ist weniger überrascht → besser.\n\n**Temperature-Sampling**: $P(w \\mid \\text{context}) \\propto \\exp(z_w / \\tau)$. $\\tau \\to 0$: greedy (maximale Wahrscheinlichkeit). $\\tau \\to \\infty$: uniform. $\\tau = 1$: Basisverteilung.',
      },
      {
        kind: 'callout',
        content:
          'BERT nutzt **bidirektionale** bedingte Modellierung: $P(w_t \\mid w_{\\neq t})$ — Masked Language Model. GPT nutzt **kausale** bedingte Modellierung: $P(w_t \\mid w_{<t})$. Beide sind bedingte Wahrscheinlichkeitsmodelle, faktorisiert via Kettenregel.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.bp.card1',
      front: 'Definition bedingte Wahrscheinlichkeit?',
      back: '$P(A \\mid B) = P(A \\cap B) / P(B)$. \"Wahrscheinlichkeit von $A$ gegeben $B$ ist eingetreten.\"',
      conceptTags: ['conditional-probability'],
    },
    {
      id: 'p1.bp.card2',
      front: 'Kettenregel der Wahrscheinlichkeit?',
      back: '$P(X_1, \\ldots, X_n) = \\prod_{i=1}^n P(X_i \\mid X_1, \\ldots, X_{i-1})$. Basis autoregressiver Sprachmodelle.',
      conceptTags: ['chain-rule'],
    },
    {
      id: 'p1.bp.card3',
      front: 'Naive-Bayes-Annahme?',
      back: 'Bedingte Unabhängigkeit: $P(x_1,\\ldots,x_d \\mid y) = \\prod_i P(x_i \\mid y)$.',
      conceptTags: ['independence'],
    },
  ],

  learningOutcome:
    'Du kannst bedingte Wahrscheinlichkeit formal definieren und geometrisch interpretieren, Unabhängigkeit vs. bedingte Unabhängigkeit unterscheiden und erklären, warum $P(y \\mid x)$ das zentrale Lernziel in ML ist.',

  description:
    'Bedingte Wahrscheinlichkeit ist das Herzstück des maschinellen Lernens: ein Klassifikator lernt $P(y \\mid x)$, ein Sprachmodell lernt $P(w_t \\mid w_{<t})$, und Bayes-Theorem verbindet Prior und Posterior via bedingte Wahrscheinlichkeit.',

  conceptSteps: [
    {
      title: 'Bedingte Wahrscheinlichkeit — geometrische Intuition',
      preprompt: 'Stell dir eine Gruppe von 100 Personen vor. 40 tragen eine Brille. Von diesen 40 arbeiten 30 an einem Computer. Wie wahrscheinlich ist es, am Computer zu arbeiten, wenn man eine Brille trägt?',
      body: 'Bedingte Wahrscheinlichkeit **schränkt den Stichprobenraum ein**:\n\n$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\qquad P(B) > 0$$\n\n"Wahrscheinlichkeit von $A$, wenn wir wissen, dass $B$ eingetreten ist."\n\nGeometrisch: Wir zoomen in die Teilmenge $B$ des Stichprobenraums und fragen, wie viel Platz $A$ darin einnimmt.',
      miniExample: 'Brillen-Beispiel: $P(\\text{Computer} \\mid \\text{Brille}) = \\frac{30/100}{40/100} = \\frac{30}{40} = 0{,}75$.',
    },
    {
      title: 'Formale Definition und Multiplikationsregel',
      body: '**Definition**: $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$ für $P(B) > 0$.\n\n**Multiplikationsregel** (Umstellen der Definition):\n\n$$P(A \\cap B) = P(A \\mid B) \\cdot P(B) = P(B \\mid A) \\cdot P(A)$$\n\n**Wichtig**: $P(A \\mid B) \\neq P(B \\mid A)$ im Allgemeinen!\n\nDiesen Fehler nennt man **Prosecutor\'s Fallacy**: $P(\\text{DNA-Match} \\mid \\text{unschuldig})$ ist sehr klein, aber $P(\\text{unschuldig} \\mid \\text{DNA-Match})$ kann trotzdem groß sein (wenn viele Verdächtige).',
      selfCheck: 'Ein Test für eine seltene Krankheit hat $P(+\\mid \\text{krank}) = 0{,}99$. Ist $P(\\text{krank}\\mid +)$ ebenfalls nahe 1? (Nein — wenn die Krankheit selten ist, sind trotz positivem Test die meisten Positiven gesund.)',
    },
    {
      title: 'Unabhängigkeit',
      body: 'Ereignisse $A$ und $B$ sind **unabhängig** ($A \\perp B$), wenn Wissen über $B$ nichts über $A$ verrät:\n\n$$P(A \\mid B) = P(A) \\quad \\Leftrightarrow \\quad P(A \\cap B) = P(A) \\cdot P(B)$$\n\nFür ZVn: $X \\perp Y$ bedeutet $P(X, Y) = P(X) \\cdot P(Y)$ für alle Werte.\n\n**Bedingte Unabhängigkeit** $X \\perp Y \\mid Z$: gegeben $Z$ sind $X$ und $Y$ unabhängig:\n\n$$P(X, Y \\mid Z) = P(X \\mid Z) \\cdot P(Y \\mid Z)$$\n\nDas ist stärker (und schwächer) als marginale Unabhängigkeit!',
      miniExample: 'Schuhgröße und Lesefähigkeit sind korreliert bei Kindern — aber bedingt auf das Alter sind sie unabhängig.',
    },
    {
      title: 'Satz der totalen Wahrscheinlichkeit',
      body: 'Für eine Partition $\\{B_1, \\ldots, B_n\\}$ von $\\Omega$ (disjunkt, Vereinigung = $\\Omega$):\n\n$$P(A) = \\sum_{i=1}^n P(A \\mid B_i) \\cdot P(B_i)$$\n\nDas ist die **Marginalisierung** von $P(A, B)$ über $B$:\n\n$$P(A) = \\sum_b P(A \\mid B=b) \\cdot P(B=b) = \\sum_b P(A, B=b)$$\n\nIn ML: Durch Marginalisierung über latente Variablen erhält man die beobachtbare Verteilung.',
      miniExample: 'Zwei Klassen $C_1$ (60%) und $C_2$ (40%). Fehlerrate $P(F \\mid C_1) = 0{,}1$, $P(F \\mid C_2) = 0{,}2$. Gesamt: $P(F) = 0{,}1 \\cdot 0{,}6 + 0{,}2 \\cdot 0{,}4 = 0{,}14$.',
    },
    {
      title: 'Kettenregel der Wahrscheinlichkeit',
      body: 'Aus der Multiplikationsregel folgt die **Kettenregel**:\n\n$$P(X_1, X_2, \\ldots, X_n) = \\prod_{i=1}^n P(X_i \\mid X_1, \\ldots, X_{i-1})$$\n\nDas ist eine exakte Faktorisierung — keine Annahmen!\n\nIn ML: Die Kettenregel erlaubt es, die Verbundwahrscheinlichkeit eines Satzes in ein Produkt bedingter Wahrscheinlichkeiten zu zerlegen. Das ist die Grundlage **aller autoregressiven Sprachmodelle** (GPT, LLaMA).',
      miniExample: '$P(\\text{"der Hund bellt"}) = P(\\text{"der"}) \\cdot P(\\text{"Hund"}\\mid\\text{"der"}) \\cdot P(\\text{"bellt"}\\mid\\text{"der Hund"})$',
    },
    {
      title: 'ML: $P(y \\mid x)$ als Ziel des Lernens',
      body: 'Jeder überwachte Lernalgorithmus modelliert $P(y \\mid x)$ — die bedingte Wahrscheinlichkeit des Labels gegeben die Features:\n\n- **Klassifikation**: $P(y = k \\mid x) = \\hat{y}_k$ (Softmax-Output)\n- **Regression**: $P(y \\mid x) = \\mathcal{N}(f_\\theta(x), \\sigma^2)$\n- **Sprachmodell**: $P(w_t \\mid w_1, \\ldots, w_{t-1})$ (Kettenregel)\n- **Generative Modelle**: lernen $P(x)$ oder $P(x \\mid z)$ für latenten Code $z$\n\nTraining = Anpassen von $\\theta$, sodass $P_\\theta(y \\mid x) \\approx P_{\\text{data}}(y \\mid x)$.',
      selfCheck: 'Was lernt ein binärer Klassifikator mit Sigmoid? ($P(y=1 \\mid x) = \\sigma(w^\\top x + b)$ — die bedingte Bernoulli-Wahrscheinlichkeit des Labels.)',
    },
  ],

  derivations: [
    {
      claim: 'Kettenregel folgt aus wiederholter Anwendung der Multiplikationsregel',
      reasoning:
        '$P(X_1, X_2) = P(X_1) \\cdot P(X_2 \\mid X_1)$ (Multiplikationsregel für 2 Ereignisse). Erweiterung: $P(X_1, X_2, X_3) = P(X_1, X_2) \\cdot P(X_3 \\mid X_1, X_2) = P(X_1) \\cdot P(X_2 \\mid X_1) \\cdot P(X_3 \\mid X_1, X_2)$. Durch Induktion gilt für $n$ Variablen: $P(X_1, \\ldots, X_n) = \\prod_{i=1}^n P(X_i \\mid X_1, \\ldots, X_{i-1})$. Diese Faktorisierung ist exakt — keine Annahmen über Unabhängigkeit.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$P(A \\mid B) = P(B \\mid A)$',
      correct: '$P(A \\mid B) = P(B \\mid A) \\cdot P(A) / P(B)$ — das ist Bayes-Theorem',
      explanation:
        'Prosecutor\'s Fallacy: $P(\\text{selten krank} \\mid \\text{positiver Test}) \\neq P(\\text{positiver Test} \\mid \\text{krank})$. Bayes-Theorem korrekt anwenden ist fundamental für Diagnose, Spam-Erkennung, Anomalie-Detektion.',
    },
    {
      wrong: 'Unabhängigkeit ($A \\perp B$) und bedingte Unabhängigkeit ($A \\perp B \\mid C$) implizieren sich gegenseitig',
      correct: 'Marginale und bedingte Unabhängigkeit sind unabhängige Konzepte — keine impliziert die andere',
      explanation:
        'Beispiel: $A \\perp B$ (marginal unabhängig), aber $A \\not\\perp B \\mid C$ ("Erklärungsweg" durch gemeinsamen Effekt $C$). Oder: $A \\not\\perp B$ (korreliert), aber $A \\perp B \\mid C$ (Scheinkorrelation durch gemeinsame Ursache $C$).',
    },
    {
      wrong: 'Die Kettenregel $P(X_1,\\ldots,X_n) = \\prod_i P(X_i \\mid X_{<i})$ setzt Unabhängigkeit voraus',
      correct: 'Die Kettenregel ist exakt und macht keinerlei Unabhängigkeitsannahme',
      explanation:
        'Es ist eine algebraische Identität, die aus wiederholter Anwendung der Multiplikationsregel folgt. Erst die Markov-Annahme (GPT: nur letzten $k$ Tokens) oder Naive-Bayes-Annahme ($X_i \\perp X_j \\mid Y$) führt zu Vereinfachungen.',
    },
  ],

  furtherResources: [
    {
      title: 'StatQuest: "Conditional Probability" (YouTube)',
      type: 'video',
      note: 'Visuell klare Erklärung mit Venn-Diagrammen; Vorsicht vor Prosecutor\'s Fallacy',
    },
    {
      title: 'Khan Academy: "Conditional probability and independence" (Probability unit)',
      type: 'article',
      note: 'Interaktive Übungen; gut für Intuition bedingte Unabhängigkeit',
    },
    {
      title: 'Goodfellow et al., Kapitel 3.5–3.6: "Conditional Probability; Chain Rule"',
      type: 'book',
      note: 'Deep Learning Book; freier Online-Zugang; direkte ML-Anwendungen',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.wahrscheinlichkeit',
      relation: 'requires',
      hint: 'Grundlegende Wahrscheinlichkeitsaxiome und Laplace-Modell sind Voraussetzung.',
    },
    {
      lessonId: 'p1.bayes-theorem',
      relation: 'extends',
      hint: 'Bayes-Theorem kombiniert $P(A \\mid B)$ und $P(B \\mid A)$ — der nächste logische Schritt.',
    },
    {
      lessonId: 'p1.mle',
      relation: 'see-also',
      hint: 'MLE maximiert $P(D \\mid \\theta)$ — die bedingte Wahrscheinlichkeit der Daten gegeben Parameter.',
    },
    {
      lessonId: 'p1.zufallsvariablen',
      relation: 'requires',
      hint: 'Bedingte Wahrscheinlichkeit von ZVn: $P(X \\mid Y)$ setzt Zufallsvariablen-Konzept voraus.',
    },
  ],

  reflection: '$P(y \\mid x)$ ist das Ziel von ML — nicht $P(x)$, nicht $P(y)$, sondern die bedingte Verteilung. Jeder Trainingsstep eines Klassifikators maximiert diese bedingte Wahrscheinlichkeit. Jeder Token eines Sprachmodells ist ein Sample aus $P(w_t \\mid w_{<t})$. **Was war überraschender: der geometrische Zoom-Trick der bedingten Wahrscheinlichkeit, oder dass die Kettenregel keinerlei Annahmen macht?**',
}
