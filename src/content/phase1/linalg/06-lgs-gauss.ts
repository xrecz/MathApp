import type { Lesson } from '../../../types'

export const lgsGauss: Lesson = {
  id: 'p1.lgs-gauss',
  title: 'Lineare Gleichungssysteme & Gauß-Elimination',
  conceptTags: ['linear-system', 'gauss', 'pivot', 'back-substitution', 'rank'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Lineare Gleichungssysteme\n\nEin LGS $Ax = b$ mit $A \\in \\mathbb{R}^{m \\times n}$, $x \\in \\mathbb{R}^n$, $b \\in \\mathbb{R}^m$. Die **Gauß-Elimination** bringt die erweiterte Matrix $[A|b]$ auf Zeilenstufenform durch elementare Zeilenoperationen.',
      },
      {
        kind: 'math',
        content:
          '$$\\begin{pmatrix}2 & 1 & | & 5\\\\ 4 & 3 & | & 11\\end{pmatrix} \\xrightarrow{Z_2 - 2Z_1} \\begin{pmatrix}2 & 1 & | & 5\\\\ 0 & 1 & | & 1\\end{pmatrix}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Die Normalengleichung $(X^T X)w = X^T y$ der linearen Regression ist ein LGS. Für große Daten löst man es iterativ (Gradient Descent), nicht mit Gauß — aber das Verständnis von LGS ist die Grundlage.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Elementare Zeilenoperationen\n\n1. Zeile skalieren: $Z_i \\leftarrow c \\cdot Z_i$ ($c \\neq 0$)\n2. Zeilen addieren: $Z_i \\leftarrow Z_i + c \\cdot Z_j$\n3. Zeilen tauschen: $Z_i \\leftrightarrow Z_j$\n\nDiese Operationen ändern **nicht** die Lösungsmenge.\n\n### Lösungsfälle\n\n- **Eindeutige Lösung**: $\\text{rang}(A) = \\text{rang}([A|b]) = n$\n- **Unendlich viele Lösungen**: $\\text{rang}(A) = \\text{rang}([A|b]) < n$\n- **Keine Lösung**: $\\text{rang}(A) < \\text{rang}([A|b])$',
      },
      {
        kind: 'worked-example',
        content:
          '**Vollständige Gauß-Elimination**:\n\n$\\begin{pmatrix}1 & 2 & | & 5\\\\ 2 & 3 & | & 8\\end{pmatrix} \\xrightarrow{Z_2 - 2Z_1} \\begin{pmatrix}1 & 2 & | & 5\\\\ 0 & -1 & | & -2\\end{pmatrix} \\xrightarrow{Z_2 \\cdot (-1)} \\begin{pmatrix}1 & 2 & | & 5\\\\ 0 & 1 & | & 2\\end{pmatrix}$\n\nRücksubstitution: $x_2 = 2$, $x_1 = 5 - 2 \\cdot 2 = 1$.',
      },
    ],
    practice: [
      {
        id: 'p1.lgs.ex1',
        difficulty: 1,
        conceptTags: ['linear-system'],
        type: 'mc',
        prompt: 'Wie viele Gleichungen und Unbekannte hat $Ax = b$ mit $A \\in \\mathbb{R}^{3 \\times 2}$?',
        options: ['3 Gleichungen, 2 Unbekannte', '2 Gleichungen, 3 Unbekannte', '3 Gleichungen, 3 Unbekannte', '2 Gleichungen, 2 Unbekannte'],
        answer: '3 Gleichungen, 2 Unbekannte',
        hints: [
          '$m \\times n$-Matrix: $m$ Zeilen (Gleichungen), $n$ Spalten (Unbekannte).',
          '$3 \\times 2$: 3 Zeilen, 2 Spalten.',
          '3 Gleichungen, 2 Unbekannte.',
        ],
        explanation: '$A \\in \\mathbb{R}^{3 \\times 2}$: 3 Zeilen = 3 Gleichungen; 2 Spalten = 2 Unbekannte $x_1, x_2$.',
      },
      {
        id: 'p1.lgs.ex2',
        difficulty: 2,
        conceptTags: ['gauss'],
        type: 'numeric',
        prompt:
          'Nach Gauß-Elimination: $\\begin{pmatrix}2 & 4 & | & 10\\\\ 0 & 1 & | & 3\\end{pmatrix}$. Was ist $x_2$?',
        answer: 3,
        hints: [
          'Zeilenstufenform: unterste Zeile zuerst lösen.',
          '$0 \\cdot x_1 + 1 \\cdot x_2 = 3$.',
          '$x_2 = 3$.',
        ],
        explanation: 'Aus der zweiten Zeile: $x_2 = 3$ direkt ablesbar.',
      },
      {
        id: 'p1.lgs.ex3',
        difficulty: 2,
        conceptTags: ['back-substitution'],
        type: 'numeric',
        prompt:
          'LGS in Zeilenstufenform: $\\begin{pmatrix}1 & 2 & | & 7\\\\ 0 & 1 & | & 2\\end{pmatrix}$. Was ist $x_1$?',
        answer: 3,
        hints: [
          'Zuerst $x_2$ aus Zeile 2 ablesen.',
          '$x_2 = 2$.',
          'Rücksubstitution: $x_1 + 2 \\cdot 2 = 7 \\Rightarrow x_1 = 3$.',
        ],
        explanation: '$x_2 = 2$ (Zeile 2). Rücksubstitution: $x_1 = 7 - 2 \\cdot 2 = 3$.',
      },
      {
        id: 'p1.lgs.ex4',
        difficulty: 3,
        conceptTags: ['rank'],
        type: 'mc',
        prompt: 'Das System $\\begin{pmatrix}1 & 2 & | & 3\\\\ 2 & 4 & | & 7\\end{pmatrix}$ nach Gauß-Elimination: welcher Fall?',
        options: [
          'Keine Lösung — $\\text{rang}(A) < \\text{rang}([A|b])$',
          'Eindeutige Lösung',
          'Unendlich viele Lösungen',
        ],
        answer: 'Keine Lösung — $\\text{rang}(A) < \\text{rang}([A|b])$',
        hints: [
          '$Z_2 - 2 Z_1$: was ergibt die zweite Zeile?',
          '$\\begin{pmatrix}0 & 0 & | & 1\\end{pmatrix}$ — d.h. $0 = 1$.',
          'Widerspruch → keine Lösung.',
        ],
        explanation:
          'Nach $Z_2 - 2Z_1$: $(0, 0 | 1)$ → Widerspruch $0 = 1$. Die Zeile 2 ist $2 \\times$ Zeile 1 in $A$, aber $7 \\neq 2 \\times 3$.',
      },
      {
        id: 'p1.lgs.ex5',
        difficulty: 3,
        conceptTags: ['linear-system'],
        type: 'mc',
        prompt: 'Wann hat $Ax = b$ unendlich viele Lösungen?',
        options: [
          '$\\text{rang}(A) = \\text{rang}([A|b]) < n$',
          '$\\text{rang}(A) < \\text{rang}([A|b])$',
          '$\\text{rang}(A) = n$',
          '$\\det A \\neq 0$',
        ],
        answer: '$\\text{rang}(A) = \\text{rang}([A|b]) < n$',
        hints: [
          'Unendlich viele Lösungen: System ist lösbar, aber unterbestimmt.',
          '"Lösbar" bedeutet $\\text{rang}(A) = \\text{rang}([A|b])$.',
          '"Unterbestimmt" bedeutet weniger Pivots als Unbekannte: $\\text{rang} < n$.',
        ],
        explanation:
          'System lösbar ($\\text{rang}(A) = \\text{rang}([A|b])$) + unterbestimmt ($< n$ Pivots) → freie Variablen → unendlich viele Lösungen.',
      },
      {
        id: 'p1.lgs.ex6',
        difficulty: 4,
        conceptTags: ['linear-system', 'ml'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Die Normalengleichung der linearen Regression ist $(X^T X)w = X^T y$. Wann ist sie eindeutig lösbar?',
        options: [
          'Wenn $X^T X$ invertierbar ist, d.h. die Features linear unabhängig sind',
          'Wenn $X$ quadratisch ist',
          'Immer — Normalengleichungen haben stets eine Lösung',
          'Nur wenn $y = 0$',
        ],
        answer: 'Wenn $X^T X$ invertierbar ist, d.h. die Features linear unabhängig sind',
        hints: [
          '$X^T X$ ist eine $n \\times n$-Matrix ($n$ = Anzahl Features).',
          'Eindeutige Lösung $\\Leftrightarrow$ $X^T X$ invertierbar $\\Leftrightarrow$ $\\det(X^T X) \\neq 0$.',
          'Das versagt bei multikollinearen Features.',
        ],
        explanation:
          'Wenn Features linear abhängig (Multikollinearität), ist $\\text{rang}(X^T X) < n$ → nicht invertierbar → unendlich viele Lösungen. Regularisierung ($X^T X + \\lambda I$) behebt das.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Gauß-Elimination und numerische Stabilität\n\nIn der Praxis wird **Partial Pivoting** verwendet: man wählt die Zeile mit dem betragsmäßig größten Pivotelement, um numerische Fehler zu minimieren. Das ist der Grund, warum `numpy.linalg.solve` oft stabiler ist als die naive Gauß-Elimination.',
      },
      {
        kind: 'callout',
        content:
          'Für überbestimmte Systeme ($m > n$, mehr Gleichungen als Unbekannte) gibt es i.A. keine exakte Lösung. Man sucht das $w$ das $\\|Xw - y\\|_2^2$ minimiert — das ist lineare Regression! Lösung: $w = (X^T X)^{-1} X^T y$.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.lgs.card1',
      front: 'Drei Lösungsfälle eines LGS?',
      back: 'Eindeutig ($\\text{rang}=n$), unendlich viele ($\\text{rang}<n$, konsistent), keine Lösung (inkonsistent).',
      conceptTags: ['linear-system'],
    },
    {
      id: 'p1.lgs.card2',
      front: 'Gauß-Elimination — erlaubte Operationen?',
      back: 'Zeile skalieren, Vielfaches einer Zeile addieren, Zeilen tauschen.',
      conceptTags: ['gauss'],
    },
    {
      id: 'p1.lgs.card3',
      front: 'Normalengleichung der linearen Regression?',
      back: '$(X^T X)w = X^T y$ — löst das überbestimmte System $Xw \\approx y$ im Least-Squares-Sinn.',
      conceptTags: ['linear-system'],
    },
  ],
}
