
let options = {
    elms: [{field: document.getElementById('keyboard_input')}],
    defaultTab: 3,
    keys: [
        {   // Tab 2
            name: 'abc',
            lines: [
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                [['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>', ' '], 'z', 'x', 'c', 'v', 'b', 'n', 'm', 
                  [   // Special Key
                      '<i class="material-icons">keyboard_backspace</i>',
                      (elm, cursorPos) => {
                        let value = elm.value;
                        if(cursorPos.start == cursorPos.end) {
                          let a = value.slice(0, cursorPos.start-1);
                          let b = value.slice(cursorPos.end, value.length);
                          elm.value = a+b;
                        } else {
                          let a = value.slice(0, cursorPos.start);
                          let b = value.slice(cursorPos.end, value.length);
                          elm.value = a+b;
                        }
                      }
                  ]
                ],
            ],
            renderer: function(data, elm) {
              elm.innerHTML = data;
            }
        },
        {   // Tab 1
            name: '123',
            lines: [
                ['1', '2', '3', '+'],
                ['4', '5', '6', '-'],
                ['7', '8', '9', '*'],
                ['.', '0', '#', '/']
            ],
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
                ['\\alpha', ' \\beta', ' \\gamma', ' \\rho', ' \\sigma', ' \\epsilon', ' \\lambda', ' \\theta', ' \\psi'], 
                ['  x^2', ' \\frac{a}{b}', ' \\sum_{i=0}^{2n}', ' \\int_{0}^{\\pi}', ' \\frac{\\partial}{\\partial t}', '\\dbinom n k', 
                ' \\infty',  '\\vec{F}', '\\xcancel{ABC}'],
                [' +', '-', ' \\times', ' \\div', ' \\pm', ' =', ' \\geq', ' \\leq', '\\oint'], 
            ],
            renderer: function(data, elm) {
                return katex.render(data, elm, {
                  maxSize: 3
                });
            }
        }
    ]
}
let kb = KeyBoard(options);

window.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM fully loaded and parsed');
    
    let math = document.getElementsByClassName('math');
    for (let i = 0; i < math.length; i++) {
        katex.render(math[i].textContent, math[i]);
    }
});

