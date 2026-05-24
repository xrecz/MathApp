import type { Lesson } from '../../../types'

export const zufallsvariablen: Lesson = {
  id: 'p1.zufallsvariablen',
  title: 'Zufallsvariablen',
  conceptTags: ['random-variable', 'sample-space', 'probability', 'discrete', 'continuous'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Zufallsvariablen\n\nEine **Zufallsvariable** $X$ ist eine Funktion vom Stichprobenraum $\\Omega$ in die reellen Zahlen:\n\n$$X: \\Omega \\to \\mathbb{R}$$\n\n**Diskret**: nimmt abzählbar viele Werte an (z. B. Würfelwurf, Token-ID).\n\n**Stetig**: nimmt überabzählbar viele Werte an (z. B. Gewicht, Aktivierungswert).',
      },
      {
        kind: 'math',
        content:
          '$$\\Omega = \\{1, 2, 3, 4, 5, 6\\} \\xrightarrow{X} \\mathbb{R} \\qquad X(\\omega) = \\omega$$\n\n$$P(X = k) = \\frac{1}{6} \\quad \\text{für } k = 1, \\dots, 6$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: In ML sind fast alle Größen Zufallsvariablen — Gewichte nach zufälliger Initialisierung, Mini-Batch-Samples, Dropout-Masken. Das Modell $p_\\theta(y \\mid x)$ beschreibt die Verteilung von $Y$ gegeben $X = x$.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Diskret vs. Stetig\n\n**Diskrete ZV** $X$: Wahrscheinlichkeitsmassefunktion (PMF) $P(X = k) \\geq 0$, Summe $= 1$.\n\n**Stetige ZV** $X$: Wahrscheinlichkeitsdichtefunktion (PDF) $f(x) \\geq 0$, Integral $= 1$.\n\n**Verteilung**: vollständige Beschreibung von $X$ via PMF/PDF oder CDF.\n\n### Beispiel — Softmax als diskrete Verteilung\n\nSoftmax-Output $\\hat{y} \\in \\mathbb{R}^K$ mit $\\hat{y}_k \\geq 0$, $\\sum_k \\hat{y}_k = 1$.\n\n→ $\\hat{y}$ definiert eine **Wahrscheinlichkeitsverteilung** über $K$ Klassen. Die Vorhersage ist die ZV $\\hat{Y}$ mit $P(\\hat{Y} = k) = \\hat{y}_k$.',
      },
      {
        kind: 'worked-example',
        content:
          '**Dropout als Bernoulli-ZV**:\n\nJede Aktivierung $a_i$ wird mit Wahrscheinlichkeit $p$ auf 0 gesetzt.\n\nDefine $M_i \\sim \\text{Bernoulli}(1-p)$ (1 = aktiv, 0 = dropout).\n\n$\\tilde{a}_i = M_i \\cdot a_i$\n\n$E[\\tilde{a}_i] = (1-p) \\cdot a_i$ → skaliere mit $\\frac{1}{1-p}$ beim Training (Inverted Dropout).',
      },
    ],
    practice: [
      {
        id: 'p1.zv.ex1',
        difficulty: 1,
        conceptTags: ['random-variable'],
        type: 'mc',
        prompt: 'Was ist eine Zufallsvariable $X$ formal?',
        options: [
          'Eine Funktion $X: \\Omega \\to \\mathbb{R}$ vom Stichprobenraum in die reellen Zahlen',
          'Eine Konstante, die zufällig gewählt wird',
          'Ein Vektor mit zufälligen Einträgen',
          'Eine Wahrscheinlichkeit $P \\in [0, 1]$',
        ],
        answer: 'Eine Funktion $X: \\Omega \\to \\mathbb{R}$ vom Stichprobenraum in die reellen Zahlen',
        hints: [
          '$\\Omega$ ist der Stichprobenraum aller möglichen Ausgänge.',
          '$X$ ordnet jedem Ausgang $\\omega$ eine reelle Zahl zu.',
          'ZV ist eine Funktion — kein fester Wert.',
        ],
        explanation:
          'Eine ZV ist eine Funktion $X: \\Omega \\to \\mathbb{R}$. Sie \"übersetzt\" zufällige Ereignisse in Zahlen, z. B. Würfelergebnis → Augenzahl.',
      },
      {
        id: 'p1.zv.ex2',
        difficulty: 1,
        conceptTags: ['discrete', 'continuous'],
        type: 'mc',
        prompt: 'Welche dieser Zufallsvariablen ist **stetig**?',
        options: [
          'Der Aktivierungswert eines ReLU-Neurons (nach Training)',
          'Die Anzahl der Tokens in einem Satz',
          'Das Ergebnis eines Münzwurfs (Kopf/Zahl)',
          'Die Klassen-ID einer Softmax-Vorhersage',
        ],
        answer: 'Der Aktivierungswert eines ReLU-Neurons (nach Training)',
        hints: [
          'Stetig = überabzählbar viele mögliche Werte (echte reelle Zahlen).',
          'Token-Anzahl ist eine ganze Zahl → diskret.',
          'Aktivierungswerte liegen in einem Intervall → stetig.',
        ],
        explanation:
          'Aktivierungswerte sind reelle Zahlen in einem Intervall → stetig. Tokens, Klassen-IDs und Münzwürfe sind abzählbar → diskret.',
      },
      {
        id: 'p1.zv.ex3',
        difficulty: 2,
        conceptTags: ['probability', 'discrete'],
        type: 'mc',
        prompt: 'Softmax-Output $\\hat{y} = (0{,}7,\\ 0{,}2,\\ 0{,}1)$ für 3 Klassen. Was ist $P(\\hat{Y} = 2)$?',
        options: ['$0{,}2$', '$0{,}7$', '$0{,}1$', '$\\frac{1}{3}$'],
        answer: '$0{,}2$',
        hints: [
          '$\\hat{y}_k = P(\\hat{Y} = k)$ (0-indiziert: $k = 0, 1, 2$).',
          'Klasse 2 entspricht Index 2 → $\\hat{y}_2 = 0{,}1$? Nein, zähle: Index 0→0,7, Index 1→0,2, Index 2→0,1.',
          'Klasse 2 (1-indiziert) = Index 1 → $\\hat{y}_1 = 0{,}2$.',
        ],
        explanation:
          'Softmax-Output $\\hat{y}_k$ ist direkt $P(\\hat{Y} = k)$. Klasse 2 (1-indiziert) entspricht Index 1: $P(\\hat{Y} = 2) = 0{,}2$.',
      },
      {
        id: 'p1.zv.ex4',
        difficulty: 2,
        conceptTags: ['random-variable', 'sample-space'],
        type: 'mc',
        prompt:
          'Ein Sprachmodell erzeugt Token. Der Stichprobenraum $\\Omega$ ist das Vokabular mit 50 000 Tokens. Welcher Typ von ZV beschreibt das nächste Token?',
        options: [
          'Diskrete ZV mit endlichem Wertebereich',
          'Stetige ZV mit Normalverteilung',
          'Stetige ZV mit Gleichverteilung',
          'Diskrete ZV mit unendlichem Wertebereich',
        ],
        answer: 'Diskrete ZV mit endlichem Wertebereich',
        hints: [
          'Das Vokabular hat 50 000 Token-IDs → endlich, abzählbar.',
          'Token-IDs sind ganze Zahlen → diskret.',
          'Endliches Vokabular → endlicher Wertebereich.',
        ],
        explanation:
          'Token-IDs sind ganze Zahlen aus einem endlichen Vokabular → diskrete ZV mit endlichem Wertebereich. Softmax gibt die Wahrscheinlichkeitsverteilung darüber an.',
      },
      {
        id: 'p1.zv.ex5',
        difficulty: 3,
        conceptTags: ['random-variable', 'probability'],
        type: 'mc',
        prompt:
          'Bernoulli-ZV $M \\sim \\text{Bernoulli}(p)$ mit $p = 0{,}5$ (Dropout mit 50%). Welche Aussage stimmt?',
        options: [
          '$P(M = 1) = 0{,}5$ und $P(M = 0) = 0{,}5$',
          '$P(M = 1) = 0{,}5$ und $P(M = 0) = 0$',
          '$E[M] = 1$ für $p = 0{,}5$',
          '$M$ ist eine stetige ZV',
        ],
        answer: '$P(M = 1) = 0{,}5$ und $P(M = 0) = 0{,}5$',
        hints: [
          'Bernoulli$(p)$: $P(M=1) = p$, $P(M=0) = 1-p$.',
          'Mit $p = 0{,}5$: beide Wahrscheinlichkeiten gleich $0{,}5$.',
          '$E[M] = p = 0{,}5 \\neq 1$.',
        ],
        explanation:
          'Bernoulli$(p=0{,}5)$: $P(M=1)=0{,}5$, $P(M=0)=0{,}5$, $E[M]=0{,}5$. Dropout-Maske mit $p=0{,}5$ lässt jeden Neuron mit 50% Chance aktiv.',
      },
      {
        id: 'p1.zv.ex6',
        difficulty: 4,
        conceptTags: ['random-variable', 'probability'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Inverted Dropout skaliert aktivierte Werte mit $\\frac{1}{1-p}$ beim Training. Warum?',
        options: [
          'Damit $E[\\tilde{a}_i] = a_i$ — der Erwartungswert der gedropten Aktivierung stimmt mit dem Original überein',
          'Damit der Gradient kleiner wird',
          'Damit alle Neuronen gleich aktiv sind',
          'Um die Variance zu verdoppeln',
        ],
        answer:
          'Damit $E[\\tilde{a}_i] = a_i$ — der Erwartungswert der gedropten Aktivierung stimmt mit dem Original überein',
        hints: [
          '$\\tilde{a}_i = M_i \\cdot a_i$ mit $M_i \\sim \\text{Bernoulli}(1-p)$.',
          '$E[\\tilde{a}_i] = (1-p) \\cdot a_i$ ohne Skalierung.',
          'Skalierung mit $\\frac{1}{1-p}$: $E = (1-p) \\cdot \\frac{1}{1-p} \\cdot a_i = a_i$.',
        ],
        explanation:
          'Ohne Skalierung wäre $E[\\tilde{a}_i] = (1-p) \\cdot a_i$ — kleiner als $a_i$. Inverted Dropout skaliert mit $\\frac{1}{1-p}$, sodass $E[\\tilde{a}_i] = a_i$. Inference braucht dann keine Anpassung.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Zufallsvariablen in der ML-Praxis\n\n**Gewichts-Initialisierung**: $w_{ij} \\sim \\mathcal{N}(0, \\sigma^2)$ — jedes Gewicht ist eine stetige ZV.\n\n**Data Augmentation**: zufällige Rotation $\\theta \\sim \\text{Uniform}(-15°, 15°)$ — stetige ZV.\n\n**Stochastisches Gradient Descent**: Mini-Batch-Auswahl = diskrete ZV über Datenindex-Menge.\n\n**Bayesianische Netze**: Gewichte sind ZVn mit Posterior-Verteilung statt Punktschätzer.',
      },
      {
        kind: 'callout',
        content:
          'Das Modell $p_\\theta(y \\mid x)$ ist eine bedingte Verteilung — für jeden Input $x$ definiert das Modell eine Wahrscheinlichkeitsverteilung über den Output $y$. Training = Finden von $\\theta$, das diese Verteilung den Trainingsdaten annähert.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.zv.card1',
      front: 'Was ist eine Zufallsvariable formal?',
      back: 'Eine Funktion $X: \\Omega \\to \\mathbb{R}$ vom Stichprobenraum $\\Omega$ in die reellen Zahlen.',
      conceptTags: ['random-variable'],
    },
    {
      id: 'p1.zv.card2',
      front: 'Diskrete vs. stetige Zufallsvariable?',
      back: 'Diskret: abzählbar viele Werte, beschrieben durch PMF. Stetig: überabzählbar viele Werte, beschrieben durch PDF.',
      conceptTags: ['discrete', 'continuous'],
    },
    {
      id: 'p1.zv.card3',
      front: 'Warum Inverted Dropout mit Faktor $\\frac{1}{1-p}$?',
      back: '$E[M_i \\cdot a_i] = (1-p) \\cdot a_i$ → Skalierung stellt $E = a_i$ sicher, kein Anpassungsbedarf bei Inference.',
      conceptTags: ['probability'],
    },
  ],
}
