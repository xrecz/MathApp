import type { Lesson } from '../../../types'

export const multivariableFunktionen: Lesson = {
  id: 'p1.multivariable-funktionen',
  title: 'Funktionen mehrerer Variablen',
  conceptTags: ['multivariable', 'level-set', 'contour', 'loss-landscape'],
  estimatedMinutes: 12,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## $f: \\mathbb{R}^n \\to \\mathbb{R}$ — Funktion mehrerer Variablen\n\nEine Funktion $f(x_1, \\dots, x_n)$ nimmt einen Vektor $x \\in \\mathbb{R}^n$ entgegen und gibt eine reelle Zahl zurück.\n\n**Beispiel**: $f(x, y) = x^2 + y^2$ — der Abstand zum Ursprung im Quadrat.\n\nFür $n \\leq 2$ noch visualisierbar; für größere $n$ rein algebraisch behandelt.',
      },
      {
        kind: 'svg',
        content: `<svg viewBox="-70 -70 140 140" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="60" fill="none" stroke="#e5e7eb" stroke-width="1"/>
          <circle cx="0" cy="0" r="45" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0.4"/>
          <circle cx="0" cy="0" r="30" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0.6"/>
          <circle cx="0" cy="0" r="15" fill="none" stroke="#6366f1" stroke-width="1.5" opacity="0.9"/>
          <circle cx="0" cy="0" r="4" fill="#6366f1"/>
          <line x1="-65" y1="0" x2="65" y2="0" stroke="#374151" stroke-width="0.5"/>
          <line x1="0" y1="-65" x2="0" y2="65" stroke="#374151" stroke-width="0.5"/>
          <text x="16" y="-13" fill="#6366f1" font-size="8">f=1</text>
          <text x="31" y="-28" fill="#6366f1" font-size="8">f=4</text>
          <text x="46" y="-43" fill="#6366f1" font-size="8">f=9</text>
          <text x="48" y="10" fill="#374151" font-size="8">x</text>
          <text x="5" y="-55" fill="#374151" font-size="8">y</text>
          <text x="-65" y="75" fill="#9ca3af" font-size="7">Konturplot f(x,y)=x²+y²: konzentrische Kreise</text>
        </svg>`,
        caption: 'Konturplot von f(x,y) = x²+y²: Höhenlinien sind konzentrische Kreise um das Minimum bei (0,0)',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Eine Loss-Funktion mit $n$ Modell-Gewichten ist $L: \\mathbb{R}^n \\to \\mathbb{R}$. Für GPT-3 mit 175 Milliarden Parametern: $L: \\mathbb{R}^{175 \\times 10^9} \\to \\mathbb{R}$.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Level-Sets (Höhenlinien)\n\nEin **Level-Set** zur Höhe $c$ ist die Menge $\\{(x,y) : f(x,y) = c\\}$.\n\nFür $f(x,y) = x^2 + y^2$: Level-Sets bei $c = 1, 4, 9$ sind Kreise mit Radius $1, 2, 3$.\n\nKonturplots zeigen diese Level-Sets in der 2D-Draufsicht — wie Höhenschichtlinien auf Landkarten.\n\n### Loss-Landschaft\n\nDie "Loss-Landschaft" ist der Graph von $L$ über dem Parameterraum. Gradient Descent navigiert diese Landschaft bergab. In $> 2D$ nicht visualisierbar — aber dieselbe Mathematik.',
      },
      {
        kind: 'worked-example',
        content:
          '**Drei Funktionen $\\mathbb{R}^2 \\to \\mathbb{R}$**:\n\n$f_1(x,y) = x^2 + y^2$ — Paraboloid, Minimum bei Ursprung\n\n$f_2(x,y) = xy$ — Sattel-Fläche, kein globales Minimum/Maximum\n\n$f_3(x,y) = \\sin(x) \\cos(y)$ — periodische Wellenlandschaft, viele lokale Extrema\n\n$f_3$ ist wie die Loss-Landschaft eines nicht-konvexen Netzes — viele lokale Minima.',
      },
    ],
    practice: [
      {
        id: 'p1.multi.ex1',
        difficulty: 1,
        conceptTags: ['multivariable'],
        type: 'numeric',
        prompt: '$f(x, y) = x^2 + y^2$, $f(3, 4) = ?$',
        answer: 25,
        hints: [
          'Einsetzen: $3^2 + 4^2 = ?$',
          '$9 + 16 = ?$',
          '$= 25$.',
        ],
        explanation: '$f(3,4) = 9 + 16 = 25$. Geometrisch: das Quadrat des Abstands von $(3,4)$ zum Ursprung.',
      },
      {
        id: 'p1.multi.ex2',
        difficulty: 2,
        conceptTags: ['level-set'],
        type: 'mc',
        prompt: 'Level-Sets von $f(x,y) = x^2 + y^2$ sind?',
        options: [
          'Konzentrische Kreise um den Ursprung',
          'Horizontale Geraden',
          'Parallele Geraden mit Steigung 1',
          'Parabeln',
        ],
        answer: 'Konzentrische Kreise um den Ursprung',
        hints: [
          '$f(x,y) = c$ bedeutet $x^2 + y^2 = c$.',
          'Das ist die Gleichung eines Kreises mit Radius $\\sqrt{c}$.',
          'Verschiedene $c$ → verschiedene Kreise mit gemeinsamem Mittelpunkt.',
        ],
        explanation: '$x^2 + y^2 = c$ definiert Kreise mit Radius $\\sqrt{c}$ — konzentrisch um den Ursprung.',
      },
      {
        id: 'p1.multi.ex3',
        difficulty: 2,
        conceptTags: ['multivariable'],
        type: 'numeric',
        prompt: '$f(x, y) = xy$, $f(2, 3) = ?$',
        answer: 6,
        hints: [
          'Einsetzen: $2 \\cdot 3 = ?$',
          '$= 6$.',
          'Einfaches Produkt.',
        ],
        explanation: '$f(2,3) = 2 \\cdot 3 = 6$.',
      },
      {
        id: 'p1.multi.ex4',
        difficulty: 3,
        conceptTags: ['contour'],
        type: 'mc',
        prompt: 'Welche Form hat ein 3D-Plot von $f(x,y) = x^2 + y^2$?',
        options: [
          'Paraboloid — Schale/Trichter nach oben, Minimum bei $(0,0,0)$',
          'Sattel — hat kein globales Minimum',
          'Ebene — linearer Anstieg',
          'Kugel — sphärische Oberfläche',
        ],
        answer: 'Paraboloid — Schale/Trichter nach oben, Minimum bei $(0,0,0)$',
        hints: [
          'Bei $(0,0)$: $f = 0$ — kleinster Wert.',
          'Je weiter vom Ursprung: $f$ wächst quadratisch.',
          'Rotationssymmetrische Schale = Paraboloid.',
        ],
        explanation: '$x^2 + y^2 \\geq 0$ mit Gleichheit nur bei $(0,0)$. Der 3D-Graph ist ein nach oben geöffnetes Paraboloid.',
      },
      {
        id: 'p1.multi.ex5',
        difficulty: 4,
        conceptTags: ['loss-landscape'],
        type: 'mc',
        prompt: '**ML-Aufgabe**: Die Loss-Funktion eines Netzes mit 1M Gewichten ist eine Funktion:',
        options: [
          '$L: \\mathbb{R}^{1{,}000{,}000} \\to \\mathbb{R}$',
          '$L: \\mathbb{R} \\to \\mathbb{R}^{1{,}000{,}000}$',
          '$L: \\mathbb{R}^{1{,}000{,}000} \\to \\mathbb{R}^{1{,}000{,}000}$',
          '$L: \\mathbb{R}^{1{,}000{,}000 \\times 1{,}000{,}000} \\to \\mathbb{R}$',
        ],
        answer: '$L: \\mathbb{R}^{1{,}000{,}000} \\to \\mathbb{R}$',
        hints: [
          'Input: alle Gewichte — ein Vektor im $\\mathbb{R}^n$.',
          'Output: ein Skalar (der Loss-Wert).',
          '$L: \\mathbb{R}^n \\to \\mathbb{R}$ mit $n = 1.000.000$.',
        ],
        explanation: '$L$ nimmt alle Gewichte (ein Punkt im $\\mathbb{R}^n$) und gibt eine Zahl (den Loss) zurück. Gradient Descent navigiert durch diesen $n$-dimensionalen Raum.',
      },
      {
        id: 'p1.multi.ex6',
        difficulty: 4,
        conceptTags: ['loss-landscape'],
        type: 'mc',
        prompt: '**ML-Aufgabe**: Konturplot der Loss-Landschaft — was zeigen die Höhenlinien?',
        options: [
          'Bereiche gleichen Loss-Werts',
          'Richtungen des Gradienten',
          'Punkte, an denen der Loss gleich 0 ist',
          'Lernkurven über die Zeit',
        ],
        answer: 'Bereiche gleichen Loss-Werts',
        hints: [
          'Höhenlinien / Level-Sets: $\\{w : L(w) = c\\}$ für verschiedene $c$.',
          'Analog zu Höhenschichtlinien auf einer Landkarte.',
          'Dicht liegende Linien → steiler Gradient; weite Linien → flacher Gradient.',
        ],
        explanation:
          'Konturlinien verbinden Punkte gleichen Loss-Werts. Gradient Descent bewegt sich orthogonal zu den Konturlinien bergab. Enge Kurven = steiler Hang; weite Kurven = flaches Gelände.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Die Loss-Landschaft\n\nDie Loss-Landschaft eines neuronalen Netzes ist eine hochdimensionale Funktion. Mathematische Forschung zeigt:\n\n- Viele lokale Minima, aber die meisten sind ähnlich gut (für hinreichend überparametrisierte Netze)\n- Sattelpunkte sind häufiger als lokale Maxima — "echte" Fallen sind selten\n- Gradient Descent endet typischerweise in "flachen" Regionen (großer Nullraum der Hessischen) — das korreliert mit guter Generalisierung\n\nAll das spielt sich in einem Raum ab, den wir nicht visualisieren können, aber dessen Mathematik direkt aus dieser Lektion folgt.',
      },
      {
        kind: 'callout',
        content:
          'Die "Loss-Landschaft"-Visualisierungen (z.B. das berühmte Bild von Li et al. 2018) sind Projektionen des hochdimensionalen Raums auf 2D — sie zeigen also nur einen winzigen Ausschnitt. Trotzdem geben sie intuitive Einsichten in Regularisierung und Batch-Größe.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.multi.card1',
      front: 'Notation für Funktion mehrerer Variablen?',
      back: '$f: \\mathbb{R}^n \\to \\mathbb{R}$ — nimmt Vektor, gibt Skalar.',
      conceptTags: ['multivariable'],
    },
    {
      id: 'p1.multi.card2',
      front: 'Was ist ein Level-Set?',
      back: 'Menge $\\{x : f(x) = c\\}$ — Bereich gleichen Funktionswerts.',
      conceptTags: ['level-set'],
    },
    {
      id: 'p1.multi.card3',
      front: 'Was ist die Loss-Landschaft?',
      back: 'Loss als Funktion aller Modell-Gewichte: $L: \\mathbb{R}^n \\to \\mathbb{R}$.',
      conceptTags: ['loss-landscape'],
    },
  ],
}
