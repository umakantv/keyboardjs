var inputelm = document.querySelector('#keyboard_input');
var keys = [
    {   // Tab 2
        name: 'abc',
        lines: [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            ['z', 'x', 'c', 'v', 'b', 'n', 'm', ' '],
        ]
    },
    {   // Tab 1
        name: '123',
        lines: [
            ['1', '2', '3', '+'],
            ['4', '5', '6', '-'],
            ['7', '8', '9', '*'],
            [' ', '0', '#', '/']
        ]
    },
    {
        name: '😆😎',
        lines: [
            [':)', ':(', ':/'],
            ['😂','😎','🎶','💖','👏','🐱‍👤','🖐',],
            ['👉','👈','✔','😃','😆','🤔']
        ]
    },
    {
        name: 'TeX',
        lines: [
            [' \\alpha', ' \\beta', ' \\gamma', ' \\rho', ' \\sigma', ' \\epsilon', ' \\lambda', ' \\theta', ' \\psi'], 
            ['  x^2', ' \\frac{a}{b}', ' \\sum_{i=0}^{2n}', ' \\int_{0}^{\\pi}', ' \\frac{\\partial}{\\partial t}'],
            [' +', '-', ' \\times', ' \\div', ' \\pm', ' ='], 
        ]
    }
];
var kb = KeyBoard(keys, inputelm);

window.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM fully loaded and parsed');
    
    var math = document.getElementsByClassName('math');
    for (var i = 0; i < math.length; i++) {
        katex.render(math[i].textContent, math[i]);
    }
});

