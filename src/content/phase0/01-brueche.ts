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
}
