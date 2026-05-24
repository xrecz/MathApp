import type { Lesson } from '../../types'

export const brueche: Lesson = {
  id: 'p0.brueche',
  title: 'Brüche und rationale Zahlen',
  conceptTags: ['fraction', 'rational', 'arithmetic'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Worum geht es?\n\nEin **Bruch** wie $\\frac{3}{4}$ teilt etwas in gleiche Teile auf. Der **Zähler** sagt, wie viele Teile wir nehmen; der **Nenner** sagt, in wie viele Teile wir geteilt haben.',
      },
      {
        kind: 'math',
        content: '$$\\frac{3}{4} \\;=\\; 0{,}75 \\;=\\; 75\\%$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Wahrscheinlichkeiten sind Brüche. Wenn ein Klassifikator zu 75 % auf "Katze" tippt, schreiben wir intern $p = 0{,}75 = \\frac{3}{4}$.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Rechenregeln in einem Satz\n\nGleiche Nenner ⇒ Zähler addieren/subtrahieren. Ungleiche Nenner ⇒ erst auf gemeinsamen Nenner bringen. Multiplikation: Zähler×Zähler, Nenner×Nenner. Division: mit dem Kehrwert multiplizieren.',
      },
      {
        kind: 'math',
        content:
          '$$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a\\,c}{b\\,d}, \\quad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$$',
      },
      {
        kind: 'worked-example',
        content: '**Beispiel**: $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$',
      },
    ],
    practice: [
      {
        id: 'p0.brueche.ex1',
        difficulty: 1,
        conceptTags: ['fraction'],
        type: 'mc',
        prompt: 'Welcher Bruch ist gleich $0{,}5$?',
        options: ['$\\frac{1}{4}$', '$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{2}{3}$'],
        answer: '$\\frac{1}{2}$',
        hints: [
          '0,5 ist die Hälfte von 1.',
          'Welcher Bruch ist genau die Hälfte?',
          '$\\frac{1}{2} = 0{,}5$ — das ist die direkte Übersetzung.',
        ],
        explanation: '$0{,}5$ bedeutet "fünf Zehntel" = $\\frac{5}{10} = \\frac{1}{2}$.',
        misconceptions: {
          '$\\frac{1}{4}$': '$\\frac{1}{4} = 0{,}25$, nicht $0{,}5$.',
          '$\\frac{1}{3}$': '$\\frac{1}{3} \\approx 0{,}333$, nicht $0{,}5$.',
        },
      },
      {
        id: 'p0.brueche.ex2',
        difficulty: 2,
        conceptTags: ['fraction', 'addition'],
        type: 'numeric',
        prompt: 'Berechne $\\frac{1}{4} + \\frac{1}{2}$ als Dezimalzahl.',
        answer: 0.75,
        acceptedAlternatives: ['0,75', '3/4', '0.75'],
        hints: [
          'Bringe beide auf den gleichen Nenner (4).',
          '$\\frac{1}{2} = \\frac{2}{4}$, also $\\frac{1}{4}+\\frac{2}{4} = ?$',
          '$\\frac{3}{4} = 0{,}75$.',
        ],
        explanation: '$\\frac{1}{4} + \\frac{1}{2} = \\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4} = 0{,}75$.',
      },
      {
        id: 'p0.brueche.ex3',
        difficulty: 2,
        conceptTags: ['fraction', 'multiplication'],
        type: 'numeric',
        prompt: 'Berechne $\\frac{2}{3} \\cdot \\frac{3}{4}$ als Dezimalzahl (auf 2 Nachkommastellen).',
        answer: 0.5,
        acceptedAlternatives: ['0,5', '1/2', '0.50', '0,50'],
        hints: [
          'Multipliziere Zähler mit Zähler und Nenner mit Nenner.',
          '$\\frac{2 \\cdot 3}{3 \\cdot 4} = \\frac{6}{12}$',
          '$\\frac{6}{12} = \\frac{1}{2} = 0{,}5$',
        ],
        explanation: '$\\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2} = 0{,}5$.',
      },
      {
        id: 'p0.brueche.ex4',
        difficulty: 3,
        conceptTags: ['fraction', 'simplification'],
        type: 'mc',
        prompt: 'Welcher gekürzte Bruch entspricht $\\frac{12}{18}$?',
        options: ['$\\frac{1}{2}$', '$\\frac{2}{3}$', '$\\frac{3}{4}$', '$\\frac{6}{9}$'],
        answer: '$\\frac{2}{3}$',
        hints: [
          'Suche den größten gemeinsamen Teiler von 12 und 18.',
          'ggT(12, 18) = 6.',
          '$\\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}$.',
        ],
        explanation: 'Zähler und Nenner durch ggT(12,18)=6 teilen ⇒ $\\frac{2}{3}$.',
        misconceptions: {
          '$\\frac{6}{9}$': 'Korrekt halbiert, aber noch nicht vollständig gekürzt: $\\frac{6}{9} = \\frac{2}{3}$.',
        },
      },
      {
        id: 'p0.brueche.ex5',
        difficulty: 4,
        conceptTags: ['fraction', 'probability'],
        type: 'numeric',
        prompt:
          'Ein Klassifikator gibt drei Wahrscheinlichkeiten aus: $\\frac{1}{2}$ Hund, $\\frac{1}{4}$ Katze, $\\frac{1}{4}$ Vogel. Summieren sich diese zu 1? Gib die Summe als Dezimalzahl.',
        answer: 1,
        acceptedAlternatives: ['1.0', '1,0', '1.00'],
        hints: [
          'Wahrscheinlichkeiten müssen sich zu 1 summieren.',
          '$\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{4} = ?$',
          '$\\frac{2}{4} + \\frac{1}{4} + \\frac{1}{4} = \\frac{4}{4} = 1$.',
        ],
        explanation:
          'Ja, jede gültige Wahrscheinlichkeitsverteilung summiert sich zu 1. Hier: $\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{4} = 1$.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Warum das in ML wichtig ist\n\nIn neuronalen Netzen erzeugt die **Softmax-Funktion** am Output-Layer eine Wahrscheinlichkeitsverteilung über Klassen. Diese Wahrscheinlichkeiten sind im Kern dasselbe Konzept wie Brüche: sie summieren sich zu 1, und jede einzelne liegt zwischen 0 und 1.',
      },
      {
        kind: 'math',
        content: '$$\\text{softmax}(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$$',
      },
      {
        kind: 'callout',
        content:
          'Du siehst hier dieselbe Bruchstruktur wie vorhin: ein "Zähler-Teil" (einzelne Klasse) geteilt durch ein "Nenner-Teil" (Summe aller Klassen).',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p0.brueche.card1',
      front: 'Was bedeutet der Nenner eines Bruchs?',
      back: 'Die Anzahl der gleichen Teile, in die das Ganze geteilt wurde.',
      conceptTags: ['fraction'],
    },
    {
      id: 'p0.brueche.card2',
      front: 'Regel für Bruch-Multiplikation?',
      back: 'Zähler × Zähler, Nenner × Nenner: $\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{ac}{bd}$.',
      conceptTags: ['fraction'],
    },
    {
      id: 'p0.brueche.card3',
      front: 'Wozu summieren sich Wahrscheinlichkeiten?',
      back: 'Genau zu 1.',
      conceptTags: ['probability'],
    },
  ],

  learningOutcome:
    'Du kannst Brüche kürzen, erweitern, addieren, subtrahieren, multiplizieren und dividieren — und verstehst, warum Softmax-Ausgaben und Lernraten im Kern Brüche sind.',

  description:
    'Brüche sind das Fundament aller Wahrscheinlichkeitsrechnung und tauchen in ML ständig auf: Softmax normiert Logits zu Wahrscheinlichkeiten (Zähler/Nenner), Lernraten wie $\\eta = \\frac{1}{n}$ sind Brüche, und Gradienten entstehen aus Quotienten. Wer Brüche sicher beherrscht, versteht diese Konzepte auf Anhieb.',

  conceptSteps: [
    {
      title: 'Was ist ein Bruch — Intuition',
      preprompt: 'Du schneidest eine Pizza in 8 gleiche Stücke und nimmst 3. Wie beschreibst du deinen Anteil mathematisch — und was passiert, wenn du noch 2 Stücke dazunimmst?',
      body: 'Ein **Bruch** $\\dfrac{a}{b}$ teilt das Ganze in $b$ gleiche Teile und wählt $a$ davon aus.\n\n- **Zähler** $a$: wie viele Teile wir nehmen\n- **Nenner** $b$: in wie viele gleiche Teile das Ganze geteilt ist\n- $b \\neq 0$ (durch null teilen ist nie erlaubt)\n\n$$\\frac{3}{8} \\;=\\; 3 \\text{ von 8 gleichen Teilen} \\;=\\; 0{,}375$$',
      miniExample: '$\\dfrac{1}{4} = 0{,}25$ — ein Viertel; $\\dfrac{3}{4} = 0{,}75$ — drei Viertel.',
      selfCheck: 'Ist $\\frac{5}{5}$ dasselbe wie $1$? (Ja — Zähler gleich Nenner bedeutet "alles".)',
    },
    {
      title: 'Kürzen und Erweitern',
      body: '**Kürzen**: Zähler und Nenner durch den gleichen Faktor teilen — der Wert bleibt gleich.\n\n$$\\frac{12}{18} = \\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}$$\n\n**Erweitern**: Zähler und Nenner mit dem gleichen Faktor multiplizieren — nützlich, um gleiche Nenner herzustellen.\n\n$$\\frac{1}{4} = \\frac{1 \\cdot 3}{4 \\cdot 3} = \\frac{3}{12}$$\n\nBeides ist erlaubt, weil $\\dfrac{k}{k} = 1$ multiplikativ neutral ist.',
      miniExample: 'Kürze $\\dfrac{6}{9}$: ggT$(6,9) = 3$, also $\\dfrac{6}{9} = \\dfrac{2}{3}$.',
      selfCheck: 'Welcher Bruch ist vollständig gekürzt: $\\frac{4}{6}$ oder $\\frac{2}{3}$? (Beide gleich, aber $\\frac{2}{3}$ ist vollständig gekürzt.)',
    },
    {
      title: 'Addition und Subtraktion',
      body: 'Gleiche Nenner? Einfach die Zähler addieren/subtrahieren.\n\n$$\\frac{1}{5} + \\frac{2}{5} = \\frac{3}{5}$$\n\nUngleiche Nenner? Erst auf den **kleinsten gemeinsamen Nenner (kgV)** bringen:\n\n$$\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$$\n\nAllgemein: $\\dfrac{a}{b} + \\dfrac{c}{d} = \\dfrac{ad + bc}{bd}$',
      miniExample: '$\\dfrac{1}{2} + \\dfrac{1}{6} = \\dfrac{3}{6} + \\dfrac{1}{6} = \\dfrac{4}{6} = \\dfrac{2}{3}$',
      selfCheck: 'Was ist $\\frac{3}{4} - \\frac{1}{3}$? (kgV = 12: $\\frac{9}{12} - \\frac{4}{12} = \\frac{5}{12}$)',
    },
    {
      title: 'Multiplikation und Division',
      body: '**Multiplikation**: Zähler mal Zähler, Nenner mal Nenner — kein gemeinsamer Nenner nötig.\n\n$$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$$\n\n**Division**: Mit dem **Kehrwert** multiplizieren.\n\n$$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{ad}{bc}$$\n\nMerkhilfe: "Dividieren = Kehrwert nehmen und multiplizieren."',
      miniExample: '$\\dfrac{2}{3} \\cdot \\dfrac{3}{4} = \\dfrac{6}{12} = \\dfrac{1}{2}$ \\quad und \\quad $\\dfrac{2}{3} \\div \\dfrac{4}{3} = \\dfrac{2}{3} \\cdot \\dfrac{3}{4} = \\dfrac{1}{2}$',
      selfCheck: 'Warum ist $\\frac{1}{2} \\div \\frac{1}{4} = 2$? (In $\\frac{1}{2}$ passen zwei Viertel — Kehrwert $\\frac{4}{1}$ bestätigt das.)',
    },
    {
      title: 'ML-Anwendung: Softmax und Lernrate',
      body: 'Die **Softmax-Funktion** erzeugt Wahrscheinlichkeiten aus rohen Modell-Ausgaben (Logits):\n\n$$\\text{softmax}(z_i) = \\frac{e^{z_i}}{\\displaystyle\\sum_{j} e^{z_j}}$$\n\nDas ist ein Bruch: Zähler = Exponential eines Logits, Nenner = Summe aller Exponentials. Jeder Ausgabewert liegt in $(0, 1)$, alle summieren sich zu $1$.\n\nDie **Lernrate** $\\eta = \\dfrac{1}{n}$ oder $\\eta = 0{,}01 = \\dfrac{1}{100}$ ist ebenfalls ein Bruch — er bestimmt, wie groß der Schritt im Gradientenabstieg ist.',
      miniExample: 'Logits $z = (2, 1, 0)$: $e^2 \\approx 7{,}39$, $e^1 \\approx 2{,}72$, $e^0 = 1$. Summe $\\approx 11{,}11$. Softmax: $(0{,}665; 0{,}245; 0{,}090)$ — summiert sich zu $1$.',
      selfCheck: 'Warum summieren sich Softmax-Ausgaben immer zu 1? (Zähler und Nenner sind identisch, wenn man alle aufaddiert: $\\frac{\\sum e^{z_j}}{\\sum e^{z_j}} = 1$)',
    },
  ],

  codeBridges: [
    {
      title: 'PyTorch: Softmax als Bruch implementieren',
      lang: 'python',
      code: `import torch

# Softmax = Bruch: Zähler / Nenner
logits = torch.tensor([2.0, 1.0, 0.0])  # rohe Modell-Ausgaben

# Manuell: e^z_i / sum(e^z_j) — direkte Bruchrechnung
exp_logits = torch.exp(logits)          # Zähler-Teile: [7.39, 2.72, 1.00]
summe = exp_logits.sum()                # Nenner: ~11.11
softmax_manuell = exp_logits / summe   # Bruch: jedes Element / Summe
# Ausgabe: tensor([0.6652, 0.2447, 0.0900])

# PyTorch-Version (numerisch stabiler, aber mathematisch identisch)
softmax_pytorch = torch.softmax(logits, dim=0)

# Überprüfung: summiert sich zu 1?
print(softmax_manuell.sum())   # → tensor(1.0000) ✓

# Lernrate als Bruch: eta = 1/100 = 0.01
n = 100
lernrate = 1 / n   # Python: gewöhnliche Division ergibt Bruch als float`,
      annotation: '`exp_logits / summe` ist buchstäblich $\\dfrac{e^{z_i}}{\\sum_j e^{z_j}}$ — der Softmax-Bruch. Python-Division `/` entspricht Bruch-Division: `1/n` berechnet $\\dfrac{1}{n}$. Die Ausgabe `.sum() == 1` beweist die Bruch-Eigenschaft: Zähler und Nenner heben sich auf.',
    },
  ],

  derivations: [
    {
      claim: 'Warum gilt $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{ac}{bd}$?',
      reasoning:
        'Stelle dir $\\frac{a}{b}$ als "$a$ von $b$ gleichen Teilen" vor. Wenn du $\\frac{c}{d}$ davon nimmst, teilst du die $a$ Teile nochmals in $d$ gleiche Stücke und nimmst $c$ davon. Das ergibt $ac$ Teile von insgesamt $bd$ — also $\\frac{ac}{bd}$. Formal: $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a}{1} \\cdot \\frac{1}{b} \\cdot \\frac{c}{1} \\cdot \\frac{1}{d} = \\frac{a \\cdot c}{b \\cdot d}$.',
    },
    {
      claim: 'Softmax-Ausgaben summieren sich zu 1',
      reasoning:
        '$\\sum_i \\text{softmax}(z_i) = \\sum_i \\frac{e^{z_i}}{\\sum_j e^{z_j}} = \\frac{\\sum_i e^{z_i}}{\\sum_j e^{z_j}} = 1$. Die Summe im Zähler ist dieselbe wie die Summe im Nenner — klassisches Kürzen.',
    },
  ],

  commonMistakes: [
    {
      wrong: '$\\frac{1}{2} + \\frac{1}{3} = \\frac{2}{5}$',
      correct: '$\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$',
      explanation:
        'Zähler und Nenner dürfen nicht separat addiert werden! Erst auf gemeinsamen Nenner bringen, dann nur die Zähler addieren.',
    },
    {
      wrong: '$\\frac{a}{b} + \\frac{c}{d} = \\frac{a+c}{b+d}$',
      correct: '$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$',
      explanation:
        'Brüche werden nicht "komponentenweise" addiert. Das kgV oder Kreuzprodukt des Nenners muss gebildet werden.',
    },
    {
      wrong: '$\\frac{12}{18}$ ist schon vollständig gekürzt',
      correct: '$\\frac{12}{18} = \\frac{2}{3}$ (geteilt durch ggT = 6)',
      explanation:
        'Vollständig kürzen heißt: so lange durch gemeinsame Faktoren teilen, bis Zähler und Nenner keinen gemeinsamen Teiler $> 1$ mehr haben.',
    },
  ],

  furtherResources: [
    {
      title: 'Khan Academy: "Adding fractions" (Video-Serie)',
      type: 'video',
      note: 'Schrittweise Erklärung des gemeinsamen Nenners mit visuellen Beispielen',
    },
    {
      title: 'Serlo: "Bruchrechnung" — serlo.org/mathe/bruchrechnung',
      type: 'article',
      note: 'Deutsche Referenz mit allen Rechenregeln und interaktiven Übungen',
    },
    {
      title: 'Deep Learning Book (Goodfellow): Kapitel 3 — Probability and Information Theory',
      type: 'article',
      note: 'Zeigt, wie Wahrscheinlichkeiten (= normierte Brüche) in ML eingesetzt werden',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p0.wahrscheinlichkeit',
      relation: 'extends',
      hint: 'Wahrscheinlichkeiten sind Brüche im Intervall $[0, 1]$ — die Rechenregeln aus dieser Lektion gelten direkt.',
    },
    {
      lessonId: 'p0.exponentialfunktionen',
      relation: 'see-also',
      hint: 'Softmax kombiniert Brüche mit $e^x$ — nach dieser Lektion lohnt sich der Blick auf Exponentialfunktionen.',
    },
    {
      lessonId: 'p1.pmf-pdf-cdf',
      relation: 'extends',
      hint: 'Wahrscheinlichkeitsmassen- und -dichtefunktionen sind normierte Brüche (Integral = 1).',
    },
    {
      lessonId: 'p0.termumformungen',
      relation: 'requires',
      hint: 'Kürzen und Erweitern von Brüchen setzt Termumformungen voraus.',
    },
  ],

  reflection: 'Brüche sind das Alphabet der Wahrscheinlichkeitsrechnung — und damit das Alphabet des maschinellen Lernens. Jede Softmax-Ausgabe, jede Lernrate, jede normierte Wahrscheinlichkeit ist ein Bruch. Wenn du das nächste Mal ein Klassifikationsmodell trainierst: Welcher Bruch steckt in der letzten Schicht?',
}
