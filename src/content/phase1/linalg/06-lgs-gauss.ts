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

  learningOutcome:
    'Du kannst lineare Gleichungssysteme geometrisch interpretieren, Gauß-Elimination schrittweise durchführen, die drei Lösungstypen (0, 1, ∞) anhand des Rangs bestimmen und die Verbindung zu linearer Regression und Least-Squares erklären.',

  description:
    'Lineare Gleichungssysteme $Ax = b$ sind das zentrale Berechnungsproblem der Linearen Algebra. Gauß-Elimination ist der systematische Lösungsweg — zugleich die Grundlage für LU-Zerlegung, die in Computern für lineare Algebra verwendet wird. Die Normalengleichung der linearen Regression ist ein LGS.',

  conceptSteps: [
    {
      title: 'LGS geometrisch: Schnitte von Hyperebenen',
      preprompt: 'Zwei Geraden in der Ebene können sich schneiden, parallel laufen oder zusammenfallen. Was sind die drei Fälle?',
      body: 'Ein LGS $A\\mathbf{x} = \\mathbf{b}$ mit $A \\in \\mathbb{R}^{m \\times n}$ beschreibt $m$ **Hyperebenen** im $\\mathbb{R}^n$. Die Lösungsmenge ist ihr Schnitt:\n\n- **2 Geraden, 1 Schnittpunkt**: eindeutige Lösung\n- **2 parallele Geraden**: keine Lösung\n- **2 identische Geraden**: unendlich viele Lösungen\n\nFür $m > n$ (mehr Gleichungen als Unbekannte): überbestimmt — i.A. keine exakte Lösung.',
    },
    {
      title: 'Matrixdarstellung und erweiterte Matrix',
      body: 'Das LGS $A\\mathbf{x} = \\mathbf{b}$ mit $m$ Gleichungen, $n$ Unbekannten:\n\n$$\\begin{pmatrix}a_{11} & \\cdots & a_{1n}\\\\ \\vdots & \\ddots & \\vdots \\\\ a_{m1} & \\cdots & a_{mn}\\end{pmatrix} \\begin{pmatrix}x_1 \\\\ \\vdots \\\\ x_n\\end{pmatrix} = \\begin{pmatrix}b_1 \\\\ \\vdots \\\\ b_m\\end{pmatrix}$$\n\nDie **erweiterte Matrix** $[A | \\mathbf{b}]$ fasst beides zusammen und ist das Arbeitsmittel der Gauß-Elimination.',
    },
    {
      title: 'Gauß-Elimination: elementare Zeilenoperationen',
      body: 'Drei erlaubte Operationen, die die Lösungsmenge **nicht ändern**:\n\n1. **Skalierung**: $Z_i \\leftarrow c \\cdot Z_i$ ($c \\neq 0$)\n2. **Zeilenaddition**: $Z_i \\leftarrow Z_i + c \\cdot Z_j$\n3. **Zeilentausch**: $Z_i \\leftrightarrow Z_j$\n\nZiel: die erweiterte Matrix in **Zeilenstufenform** (oder reduzierte ZSF) bringen — alle Pivots stehen in Treppenform, darunter Nullen.',
      miniExample: '$\\begin{pmatrix}2&1&|&5\\\\4&3&|&11\\end{pmatrix} \\xrightarrow{Z_2-2Z_1} \\begin{pmatrix}2&1&|&5\\\\0&1&|&1\\end{pmatrix}$ → Rücksubstitution: $x_2=1$, $x_1=2$.',
    },
    {
      title: 'Pivot-Analyse und Lösungstypen',
      body: 'Der **Rang** $r = \\text{rang}(A)$ = Anzahl der Pivots in der ZSF.\n\nDrei Lösungstypen für $A\\mathbf{x} = \\mathbf{b}$:\n\n| Bedingung | Lösungstyp |\n|---|---|\n| $\\text{rang}(A) = \\text{rang}([A|b]) = n$ | Eindeutige Lösung |\n| $\\text{rang}(A) = \\text{rang}([A|b]) < n$ | Unendlich viele |\n| $\\text{rang}(A) < \\text{rang}([A|b])$ | Keine Lösung |\n\n"Keine Lösung" entsteht, wenn eine Zeile zu $(0\\,0\\,|\\,c)$ mit $c \\neq 0$ wird — Widerspruch.',
    },
    {
      title: 'Überbestimmte Systeme und Least Squares',
      body: 'Für $m > n$ (mehr Gleichungen als Unbekannte) gibt es i.A. keine exakte Lösung.\n\n**Least-Squares-Lösung**: Minimiere den Fehler:\n\n$$\\hat{\\mathbf{w}} = \\arg\\min_w \\|A\\mathbf{w} - \\mathbf{b}\\|_2^2$$\n\n**Normalengleichung** (notwendige Bedingung, $\\nabla = 0$):\n\n$$A^T A \\hat{\\mathbf{w}} = A^T \\mathbf{b}$$\n\nDas ist ein LGS mit $(n \\times n)$-Matrix $A^T A$.',
      selfCheck: 'Wann ist $A^T A$ invertierbar? Was bedeutet das für die Eindeutigkeit der Least-Squares-Lösung?',
    },
    {
      title: 'ML: Lineare Regression als Least-Squares-LGS',
      body: 'Lineare Regression: $X \\in \\mathbb{R}^{N \\times p}$ (Datenpunkte × Features), $\\mathbf{y} \\in \\mathbb{R}^N$ (Labels).\n\n**Normalengleichung**:\n\n$$X^T X \\hat{w} = X^T \\mathbf{y} \\qquad \\Rightarrow \\qquad \\hat{w} = (X^T X)^{-1} X^T \\mathbf{y}$$\n\n**Multikollinearität**: Wenn Features linear abhängig, ist $\\text{rang}(X^T X) < p$ → nicht invertierbar → unendlich viele Lösungen.\n\n**Ridge-Regularisierung** behebt das: $(X^T X + \\lambda I)^{-1} X^T \\mathbf{y}$ — addiert $\\lambda$ auf Diagonale, macht $\\det > 0$.',
    },
  ],

  codeBridges: [
    {
      title: 'NumPy: LGS lösen und lineare Regression',
      lang: 'python',
      code: `import numpy as np

# --- 1. LGS direkt lösen: Ax = b ---
A = np.array([[2.0, 1.0],
              [1.0, 3.0]])
b = np.array([5.0, 10.0])
x = np.linalg.solve(A, b)   # x ≈ [1.0, 3.0]
# Probe:
print(np.allclose(A @ x, b))  # True

# --- 2. Überbestimmtes System (Least Squares) ---
# 4 Gleichungen, 2 Unbekannte: Ax ≈ b
A_over = np.array([[1.0, 0.0],
                   [1.0, 1.0],
                   [0.0, 1.0],
                   [1.0, 2.0]])
b_over = np.array([1.0, 2.0, 1.0, 4.0])
# Least Squares: minimiert ||Ax - b||^2
x_ls, residuals, rank, sv = np.linalg.lstsq(A_over, b_over, rcond=None)
print(f"Lösung: {x_ls}, Rang: {rank}")

# --- 3. Normalengleichung der linearen Regression ---
np.random.seed(42)
N, p = 100, 3
X = np.random.randn(N, p)
y = X @ np.array([1.0, -0.5, 2.0]) + 0.1*np.random.randn(N)

# Analytische Lösung via Normalengleichung
XTX = X.T @ X                    # (p×p) symmetrisch, PSD
XTy = X.T @ y                    # (p,)
w_normal = np.linalg.solve(XTX, XTy)  # stabiler als np.linalg.inv(XTX) @ XTy

# Ridge-Regularisierung (verhindert Singularität)
lambda_reg = 1e-3
w_ridge = np.linalg.solve(XTX + lambda_reg * np.eye(p), XTy)
print(f"Normal: {w_normal}, Ridge: {w_ridge}")`,
      annotation: '`np.linalg.solve(A, b)` löst $A\\mathbf{x} = \\mathbf{b}$ numerisch stabil (LU-Zerlegung). `np.linalg.lstsq` löst überbestimmte Systeme durch Minimierung von $\\|A\\mathbf{x} - \\mathbf{b}\\|_2^2$ — das ist die Normalengleichung. Verwende `solve` statt `inv(A) @ b` — es ist numerisch stabiler. Ridge-Regularisierung $+\\lambda I$ macht $X^T X$ immer invertierbar ($\\det > 0$) und verbessert die Konditionszahl.',
    },
  ],

  derivations: [
    {
      claim: 'Die Normalengleichung $X^T X w = X^T y$ minimiert $\\|Xw - y\\|_2^2$',
      reasoning:
        'Setze $f(w) = \\|Xw - y\\|_2^2 = (Xw-y)^T(Xw-y) = w^T X^T X w - 2 w^T X^T y + y^T y$. Gradient nach $w$: $\\nabla_w f = 2X^T X w - 2 X^T y$. Setze $\\nabla_w f = 0$: $X^T X w = X^T y$. Die zweite Ableitung ist $2X^T X \\succeq 0$ (PSD) — es ist tatsächlich ein Minimum.',
    },
  ],

  commonMistakes: [
    {
      wrong: 'Gauß-Elimination ändert die Lösungsmenge des LGS',
      correct: 'Elementare Zeilenoperationen ändern die Lösungsmenge nicht',
      explanation: 'Zeilenoperationen entsprechen Äquivalenzumformungen: jede erlaubte Operation ist invertierbar. Die Lösungsmenge bleibt identisch — nur die Darstellung ändert sich.',
    },
    {
      wrong: 'Ein überbestimmtes System ($m > n$) hat keine Lösung',
      correct: 'Ein überbestimmtes System hat meist keine exakte Lösung, aber immer eine Least-Squares-Lösung',
      explanation: 'Die Least-Squares-Lösung $\\hat{w} = \\arg\\min \\|Xw - y\\|_2^2$ existiert immer. Sie ist eindeutig, wenn $\\text{rang}(X) = n$ (linear unabhängige Features).',
    },
    {
      wrong: 'Mehr Gleichungen als Unbekannte bedeutet mehr Information und immer eindeutige Lösung',
      correct: 'Überbestimmte Systeme sind i.A. inkonsistent (keine exakte Lösung)',
      explanation: 'Mehr Messungen als Unbekannte führen zu Widersprüchen, wenn die Daten verrauscht sind. Deshalb löst man im Least-Squares-Sinn: man findet die Lösung, die alle Gleichungen "am besten" erfüllt.',
    },
  ],

  furtherResources: [
    {
      title: '3Blue1Brown: "Nonsquare matrices as transformations between dimensions" (Essence of Linear Algebra)',
      type: 'video',
      note: 'Visualisierung von überbestimmten Systemen als Abbildungen in niedrigere/höhere Dimensionen',
    },
    {
      title: 'MML Book, Kapitel 2.3.3: "Gaussian Elimination"',
      type: 'book',
      note: 'Rigoros; enthält auch Verbindung zu LU-Zerlegung und Pivoting für numerische Stabilität',
    },
    {
      title: 'Strang, Gilbert: "Introduction to Linear Algebra", Kapitel 2 — Lösung linearer Systeme',
      type: 'book',
      note: 'Klassisches Standardwerk; hervorragende Darstellung von Gauß-Elimination und Rang',
    },
  ],

  crossLinks: [
    {
      lessonId: 'p1.matrizen-lineare-abbildungen',
      relation: 'requires',
      hint: 'LGS als $A\\mathbf{x} = \\mathbf{b}$ setzt das Verständnis von Matrizen als lineare Abbildungen voraus.',
    },
    {
      lessonId: 'p1.vektorraeume-basis-rang',
      relation: 'extends',
      hint: 'Rang, Nullraum und Spaltenraum formalisieren die Lösungstypen von LGS.',
    },
    {
      lessonId: 'p1.inverse-transponierte',
      relation: 'see-also',
      hint: 'Die analytische Lösung $\\hat{w} = (X^T X)^{-1} X^T y$ nutzt die Inverse.',
    },
    {
      lessonId: 'p1.determinante',
      relation: 'see-also',
      hint: 'Determinante = 0 ↔ LGS nicht eindeutig lösbar ↔ Matrix singulär.',
    },
  ],

  reflection: 'Lineare Gleichungssysteme stecken überall in ML: Normalengleichungen, Newton-Verfahren, Least-Squares-Probleme. Das Erstaunliche: Gauß-Elimination aus dem 17. Jahrhundert ist immer noch der Kern moderner Numerik. **Welches der drei Szenarios überrascht dich am meisten: 0, 1 oder unendlich viele Lösungen?**',
}
