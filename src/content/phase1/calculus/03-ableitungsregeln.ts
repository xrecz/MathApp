import type { Lesson } from '../../../types'

export const ableitungsregeln: Lesson = {
  id: 'p1.ableitungsregeln',
  title: 'Ableitungsregeln',
  conceptTags: ['power-rule', 'sum-rule', 'product-rule', 'quotient-rule'],
  estimatedMinutes: 14,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Vier zentrale Ableitungsregeln\n\n**Potenzregel**: $(x^n)\' = n \\cdot x^{n-1}$\n\n**Summenregel**: $(f + g)\' = f\' + g\'$\n\n**Produktregel**: $(f \\cdot g)\' = f\'g + fg\'$\n\n**Quotientenregel**: $\\left(\\frac{f}{g}\\right)\' = \\frac{f\'g - fg\'}{g^2}$',
      },
      {
        kind: 'math',
        content:
          '$$(x^n)\' = n x^{n-1} \\qquad (fg)\' = f\'g + fg\' \\qquad \\left(\\frac{f}{g}\\right)\' = \\frac{f\'g - fg\'}{g^2}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Diese vier Regeln plus die Kettenregel sind alles, was PyTorch autograd intern braucht. Für jede elementare Operation ist eine Ableitung hinterlegt — die Regeln verketten sich automatisch.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Potenzregel — Beispiele\n\n$f(x) = x^5 \\Rightarrow f\'(x) = 5x^4$\n\n$f(x) = x^{1/2} = \\sqrt{x} \\Rightarrow f\'(x) = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$\n\n$f(x) = c \\text{ (konstant)} \\Rightarrow f\'(x) = 0$\n\n### Summenregel — Beispiel\n\n$f(x) = 3x^2 + 2x + 1 \\Rightarrow f\'(x) = 6x + 2$\n\n### Produktregel — Beispiel\n\n$f(x) = x \\cdot e^x$: hier $u = x$, $v = e^x$.\n\n$f\'(x) = u\'v + uv\' = 1 \\cdot e^x + x \\cdot e^x = (1+x)e^x$',
      },
      {
        kind: 'worked-example',
        content:
          '**Quotientenregel**: $f(x) = \\frac{x^2}{x+1}$\n\n$u = x^2$, $u\' = 2x$; $v = x+1$, $v\' = 1$.\n\n$f\'(x) = \\frac{2x(x+1) - x^2 \\cdot 1}{(x+1)^2} = \\frac{2x^2 + 2x - x^2}{(x+1)^2} = \\frac{x^2 + 2x}{(x+1)^2} = \\frac{x(x+2)}{(x+1)^2}$',
      },
    ],
    practice: [
      {
        id: 'p1.rules.ex1',
        difficulty: 1,
        conceptTags: ['power-rule'],
        type: 'mc',
        prompt: 'Ableitung von $x^3$?',
        options: ['$3x^2$', '$3x^3$', '$x^2$', '$3$'],
        answer: '$3x^2$',
        hints: [
          'Potenzregel: $(x^n)\' = n \\cdot x^{n-1}$.',
          '$n = 3$, also $3 \\cdot x^{3-1} = ?$',
          '$3x^2$.',
        ],
        explanation: '$(x^3)\' = 3x^{3-1} = 3x^2$.',
      },
      {
        id: 'p1.rules.ex2',
        difficulty: 1,
        conceptTags: ['power-rule'],
        type: 'numeric',
        prompt: 'Ableitung der konstanten Funktion $f(x) = 7$?',
        answer: 0,
        hints: [
          'Eine Konstante ändert sich nicht — keine Steigung.',
          'Formal: $7 = 7 \\cdot x^0$, Potenzregel: $7 \\cdot 0 \\cdot x^{-1} = 0$.',
          '$f\'(x) = 0$.',
        ],
        explanation: 'Konstanten haben Ableitung 0 — eine Horizontale hat Steigung 0.',
      },
      {
        id: 'p1.rules.ex3',
        difficulty: 2,
        conceptTags: ['sum-rule', 'power-rule'],
        type: 'mc',
        prompt: 'Ableitung von $4x^3 + 2x$?',
        options: ['$12x^2 + 2$', '$4x^2 + 2$', '$12x^3 + 2$', '$4x^2$'],
        answer: '$12x^2 + 2$',
        hints: [
          'Summenregel: beide Terme einzeln ableiten.',
          '$(4x^3)\' = 12x^2$ (Potenzregel mit Faktor 4).',
          '$(2x)\' = 2$. Zusammen: $12x^2 + 2$.',
        ],
        explanation: '$(4x^3 + 2x)\' = 12x^2 + 2$ via Summen- und Potenzregel.',
      },
      {
        id: 'p1.rules.ex4',
        difficulty: 3,
        conceptTags: ['product-rule'],
        type: 'mc',
        prompt: 'Ableitung von $x \\cdot e^x$? (Produktregel; $(e^x)\' = e^x$)',
        options: [
          '$(1+x)e^x$',
          '$x e^x$',
          '$e^x$',
          '$x^2 e^x$',
        ],
        answer: '$(1+x)e^x$',
        hints: [
          'Produktregel: $(uv)\' = u\'v + uv\'$.',
          '$u = x$, $u\' = 1$; $v = e^x$, $v\' = e^x$.',
          '$1 \\cdot e^x + x \\cdot e^x = (1+x)e^x$.',
        ],
        explanation: '$(x \\cdot e^x)\' = 1 \\cdot e^x + x \\cdot e^x = (1+x)e^x$.',
        misconceptions: {
          '$x e^x$': 'Produktregel vergessen! Nur $u \\cdot v\' = x e^x$ ist nicht die volle Ableitung.',
        },
      },
      {
        id: 'p1.rules.ex5',
        difficulty: 3,
        conceptTags: ['power-rule'],
        type: 'numeric',
        prompt: '$f(x) = x^4$, $f\'(2) = ?$',
        answer: 32,
        hints: [
          '$f\'(x) = 4x^3$.',
          '$f\'(2) = 4 \\cdot 2^3 = 4 \\cdot 8$.',
          '$= 32$.',
        ],
        explanation: '$f\'(x) = 4x^3$, $f\'(2) = 4 \\cdot 8 = 32$.',
      },
      {
        id: 'p1.rules.ex6',
        difficulty: 4,
        conceptTags: ['product-rule', 'power-rule'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: MSE-Loss $L(w) = (wx - y)^2$ für feste Konstanten $x = 2$, $y = 1$. Also $L(w) = (2w-1)^2$. $\\frac{dL}{dw} = ?$',
        options: [
          '$4(2w-1)$',
          '$2(2w-1)$',
          '$(2w-1)$',
          '$2w - 1$',
        ],
        answer: '$4(2w-1)$',
        hints: [
          'Ausmultiplizieren: $(2w-1)^2 = 4w^2 - 4w + 1$.',
          'Ableiten: $8w - 4 = 4(2w-1)$.',
          'Oder Kettenregel: außen $u^2 \\to 2u$, innen $(2w-1) \\to 2$. Ergibt $2(2w-1) \\cdot 2 = 4(2w-1)$.',
        ],
        explanation:
          '$(2w-1)^2\' = 2(2w-1) \\cdot 2 = 4(2w-1)$. Bei $w = 1$: $L\'(1) = 4(2-1) = 4$, also würde Gradient Descent $w$ um $4\\eta$ verkleinern.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Autograd = Ableitungsregeln automatisiert\n\nPyTorch autograd implementiert für jede elementare Operation deren Ableitung:\n\n- `a + b` → Summenregel: Gradient fließt unverändert zu beiden\n- `a * b` → Produktregel: Gradient zu $a$ ist $b$, zu $b$ ist $a$\n- `a ** n` → Potenzregel: Gradient zu $a$ ist $n \\cdot a^{n-1}$\n\nKarpathys "micrograd" zeigt, wie das in ~150 Zeilen Python implementiert ist — mit genau diesen vier Regeln plus Kettenregel.',
      },
      {
        kind: 'callout',
        content:
          'Die Quotientenregel wird selten direkt gebraucht — meist schreibt man $f/g$ als $f \\cdot g^{-1}$ und nutzt Produkt- plus Kettenregel. Für die Ableitung von $\\sigma(x) = 1/(1+e^{-x})$ kommt genau das zum Einsatz.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.rules.card1',
      front: 'Potenzregel?',
      back: '$(x^n)\' = n x^{n-1}$.',
      conceptTags: ['power-rule'],
    },
    {
      id: 'p1.rules.card2',
      front: 'Produktregel?',
      back: '$(fg)\' = f\'g + fg\'$.',
      conceptTags: ['product-rule'],
    },
    {
      id: 'p1.rules.card3',
      front: 'Quotientenregel?',
      back: '$(f/g)\' = (f\'g - fg\')/g^2$.',
      conceptTags: ['quotient-rule'],
    },
  ],
}
