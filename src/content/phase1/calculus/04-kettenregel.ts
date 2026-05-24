import type { Lesson } from '../../../types'

export const kettenregel: Lesson = {
  id: 'p1.kettenregel',
  title: 'Kettenregel',
  conceptTags: ['chain-rule', 'composition', 'leibniz', 'backprop-prep'],
  estimatedMinutes: 16,
  blocks: {
    show: [
      {
        kind: 'text',
        content:
          '## Kettenregel — die wichtigste Regel\n\nFür zusammengesetzte Funktionen $y = f(g(x))$:\n\n$(f \\circ g)\'(x) = f\'(g(x)) \\cdot g\'(x)$\n\nIn Leibniz-Notation (intuitiver): $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$ mit $u = g(x)$.\n\n**Rezept**: Erst die äußere Funktion ableiten (innen lassen), dann mit der Ableitung der inneren Funktion multiplizieren.',
      },
      {
        kind: 'math',
        content:
          '$$\\frac{d}{dx} f(g(x)) = \\underbrace{f\'(g(x))}_{\\text{äußere Ableitung}} \\cdot \\underbrace{g\'(x)}_{\\text{innere Ableitung}}$$',
      },
      {
        kind: 'callout',
        content:
          '**ML-Vorausweis**: Backpropagation IST die Kettenregel, systematisch angewandt auf einen Berechnungsgraphen. Mehr nicht. Wer die Kettenregel versteht, versteht Backprop.',
      },
    ],
    explain: [
      {
        kind: 'text',
        content:
          '### Drei Beispiele\n\n**Beispiel 1**: $y = (3x+1)^2$\n\nInnen: $u = 3x+1$, $u\' = 3$. Außen: $u^2$, Ableitung $2u$.\n\n$y\' = 2(3x+1) \\cdot 3 = 6(3x+1)$\n\n**Beispiel 2**: $y = e^{2x}$\n\nInnen: $u = 2x$, $u\' = 2$. Außen: $e^u$, Ableitung $e^u$.\n\n$y\' = e^{2x} \\cdot 2 = 2e^{2x}$\n\n**Beispiel 3 (geschachtelt)**: $y = \\sin(x^2)$\n\nInnen: $u = x^2$, $u\' = 2x$. Außen: $\\sin(u)$, Ableitung $\\cos(u)$.\n\n$y\' = \\cos(x^2) \\cdot 2x$',
      },
      {
        kind: 'worked-example',
        content:
          '**Kettenregel bei Backprop (schematisch)**:\n\nNetz: $x \\xrightarrow{w_1} z_1 \\xrightarrow{\\sigma} a_1 \\xrightarrow{w_2} z_2 \\xrightarrow{\\sigma} a_2 \\xrightarrow{L} \\text{Loss}$\n\n$\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial z_2} \\cdot \\frac{\\partial z_2}{\\partial a_1} \\cdot \\frac{\\partial a_1}{\\partial z_1} \\cdot \\frac{\\partial z_1}{\\partial w_1}$\n\nJeder Faktor ist eine lokale Ableitung — Kettenregel verbindet sie!',
      },
    ],
    practice: [
      {
        id: 'p1.chain.ex1',
        difficulty: 1,
        conceptTags: ['chain-rule'],
        type: 'mc',
        prompt: 'Ableitung von $(2x)^3$?',
        options: ['$24x^2$', '$6x^2$', '$8x^3$', '$3(2x)^2$'],
        answer: '$24x^2$',
        hints: [
          '$(2x)^3 = 8x^3$ — direkt ausmultiplizieren möglich.',
          'Kettenregel: außen $u^3 \\to 3u^2$, innen $2x \\to 2$.',
          '$3(2x)^2 \\cdot 2 = 3 \\cdot 4x^2 \\cdot 2 = 24x^2$.',
        ],
        explanation: '$(2x)^3\' = 3(2x)^2 \\cdot 2 = 12x^2 \\cdot 2 = 24x^2$. Oder direkt: $(8x^3)\' = 24x^2$.',
      },
      {
        id: 'p1.chain.ex2',
        difficulty: 2,
        conceptTags: ['chain-rule'],
        type: 'mc',
        prompt: 'Ableitung von $(3x+1)^2$?',
        options: ['$6(3x+1)$', '$2(3x+1)$', '$6(3x+1)^2$', '$9x + 3$'],
        answer: '$6(3x+1)$',
        hints: [
          'Kettenregel: außen $(\\cdot)^2 \\to 2(\\cdot)$, innen $3x+1 \\to 3$.',
          '$2(3x+1) \\cdot 3 = ?$',
          '$= 6(3x+1)$.',
        ],
        explanation: '$(3x+1)^2\' = 2(3x+1) \\cdot 3 = 6(3x+1) = 18x + 6$.',
      },
      {
        id: 'p1.chain.ex3',
        difficulty: 2,
        conceptTags: ['chain-rule'],
        type: 'mc',
        prompt: 'Ableitung von $e^{2x}$? ($(e^u)\' = e^u$)',
        options: ['$2e^{2x}$', '$e^{2x}$', '$2xe^{2x}$', '$e^{2x-1}$'],
        answer: '$2e^{2x}$',
        hints: [
          'Außen $e^u \\to e^u$, innen $u = 2x \\to 2$.',
          '$e^{2x} \\cdot 2 = ?$',
          '$= 2e^{2x}$.',
        ],
        explanation: '$(e^{2x})\' = e^{2x} \\cdot 2 = 2e^{2x}$. Allgemein: $(e^{ax})\' = a e^{ax}$.',
      },
      {
        id: 'p1.chain.ex4',
        difficulty: 3,
        conceptTags: ['chain-rule'],
        type: 'mc',
        prompt: 'Ableitung von $\\sin(x^2)$? ($(\\sin u)\' = \\cos u$)',
        options: ['$2x \\cos(x^2)$', '$\\cos(x^2)$', '$2x \\sin(x^2)$', '$x^2 \\cos(x^2)$'],
        answer: '$2x \\cos(x^2)$',
        hints: [
          'Außen $\\sin(u) \\to \\cos(u)$, innen $u = x^2 \\to 2x$.',
          '$\\cos(x^2) \\cdot 2x = ?$',
          '$= 2x \\cos(x^2)$.',
        ],
        explanation: '$(\\sin(x^2))\' = \\cos(x^2) \\cdot 2x = 2x\\cos(x^2)$.',
      },
      {
        id: 'p1.chain.ex5',
        difficulty: 3,
        conceptTags: ['chain-rule'],
        type: 'numeric',
        prompt:
          'Ableitung von $(x^2+1)^3$ bei $x = 1$: Außen $u^3 \\to 3u^2$, Innen $u = x^2+1 \\to 2x$. Bei $x=1$: $u=2$, $u\'=2$. $3 \\cdot 2^2 \\cdot 2 = ?$',
        answer: 24,
        hints: [
          'Kettenregel: $3(x^2+1)^2 \\cdot 2x$.',
          'Bei $x=1$: $3 \\cdot (1+1)^2 \\cdot 2 \\cdot 1 = 3 \\cdot 4 \\cdot 2$.',
          '$= 24$.',
        ],
        explanation: '$((x^2+1)^3)\' = 3(x^2+1)^2 \\cdot 2x$. Bei $x=1$: $3 \\cdot 4 \\cdot 2 = 24$.',
      },
      {
        id: 'p1.chain.ex6',
        difficulty: 4,
        conceptTags: ['chain-rule', 'backprop-prep'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: Für $y = \\sigma(wx)$ — Ableitung nach $w$ (bei festem $x$)?',
        options: [
          "$\\sigma'(wx) \\cdot x$",
          "$\\sigma'(wx)$",
          "$\\sigma(wx) \\cdot w$",
          "$x \\cdot \\sigma(wx)(1-\\sigma(wx))$",
        ],
        answer: "$\\sigma'(wx) \\cdot x$",
        hints: [
          'Kettenregel: außen $\\sigma(u) \\to \\sigma\'(u)$, innen $u = wx \\to x$ (nach $w$ abgeleitet).',
          '$\\frac{d}{dw}\\sigma(wx) = \\sigma\'(wx) \\cdot x$.',
          'Der Faktor $x$ kommt von der inneren Ableitung nach $w$.',
        ],
        explanation:
          '$\\frac{d}{dw}\\sigma(wx) = \\sigma\'(wx) \\cdot \\frac{d}{dw}(wx) = \\sigma\'(wx) \\cdot x$. In expliziter Form: $\\sigma(wx)(1-\\sigma(wx)) \\cdot x$.',
        misconceptions: {
          "$x \\cdot \\sigma(wx)(1-\\sigma(wx))$": 'Das ist korrekt! Dasselbe wie $\\sigma\'(wx) \\cdot x$ — beide Formen sind äquivalent.',
        },
      },
      {
        id: 'p1.chain.ex7',
        difficulty: 4,
        conceptTags: ['chain-rule', 'backprop-prep'],
        type: 'mc',
        prompt:
          '**ML-Aufgabe**: 3-Layer-Netz mit Aktivierungen $a_1, a_2, a_3$ und Loss $L(a_3)$. Form von $\\frac{\\partial L}{\\partial a_1}$?',
        options: [
          '$\\frac{\\partial L}{\\partial a_3} \\cdot \\frac{\\partial a_3}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial a_1}$',
          '$\\frac{\\partial L}{\\partial a_1} \\cdot \\frac{\\partial a_2}{\\partial a_1} \\cdot \\frac{\\partial a_3}{\\partial a_2}$',
          '$\\frac{\\partial a_1}{\\partial L}$',
          '$L \\cdot a_1 \\cdot a_2$',
        ],
        answer: '$\\frac{\\partial L}{\\partial a_3} \\cdot \\frac{\\partial a_3}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial a_1}$',
        hints: [
          'Kettenregel: $\\frac{dL}{da_1} = \\frac{dL}{da_3} \\cdot \\frac{da_3}{da_2} \\cdot \\frac{da_2}{da_1}$.',
          'Reihenfolge: von $L$ rückwärts durch den Graphen.',
          'Jeder Term ist eine lokale Ableitung im jeweiligen Layer.',
        ],
        explanation:
          'Kettenregel rückwärts durch den Graphen: $\\frac{\\partial L}{\\partial a_1} = \\frac{\\partial L}{\\partial a_3} \\cdot \\frac{\\partial a_3}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial a_1}$. Das ist Backpropagation in Reinform.',
      },
    ],
    deepen: [
      {
        kind: 'text',
        content:
          '## Kettenregel = Backpropagation\n\nBackpropagation ist die Kettenregel, systematisch auf einen Berechnungsgraphen angewandt. Ein Netz mit 100 Layers erfordert eine 100-fache Kettenregel:\n\n$\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial a_{100}} \\cdot \\frac{\\partial a_{100}}{\\partial a_{99}} \\cdots \\frac{\\partial a_2}{\\partial a_1} \\cdot \\frac{\\partial a_1}{\\partial w_1}$\n\nPyTorch führt das automatisch durch `loss.backward()` durch — rückwärts durch den Berechnungsgraphen, Kettenregel an jedem Knoten.',
      },
      {
        kind: 'callout',
        content:
          'Karpathys "micrograd" (150 Zeilen Python) implementiert genau diese Kettenregel für beliebige Berechnungsgraphen. Sein YouTube-Video "The spelled-out intro to neural networks and backpropagation: building micrograd" ist Pflicht-Ansehen. 3Blue1Brown "Essence of Calculus" Folge 4 visualisiert die Kettenregel.',
      },
    ],
  },
  reviewCards: [
    {
      id: 'p1.chain.card1',
      front: 'Kettenregel?',
      back: '$(f \\circ g)\'(x) = f\'(g(x)) \\cdot g\'(x)$.',
      conceptTags: ['chain-rule'],
    },
    {
      id: 'p1.chain.card2',
      front: 'Leibniz-Form der Kettenregel?',
      back: '$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$.',
      conceptTags: ['leibniz'],
    },
    {
      id: 'p1.chain.card3',
      front: 'Ableitung von $e^{ax}$?',
      back: '$a \\cdot e^{ax}$ (Kettenregel: außen $e^u$, innen $ax \\to a$).',
      conceptTags: ['chain-rule'],
    },
  ],
}
