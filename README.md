# Keyboard.js

Creates a keyboard with multiple tabs that can then be assigned to different input elements.
Keyboard appears when the input elements are brought to focus and the key-value is inserted at the end of the input element.

> Note: Keyboard needs to be closed explicitly. It does not close when input element goes out of focus.  

> In case of multiple input elements it inserts into the last focused element.

## Input
It takes `options` as the only input which should contain the following properties:  
### `elms`
`elms` is the array of objects that represent an input field.  

```javascript
{
    field: document.querySelector('#elm-id'),
    onKeypress: function(field){
        // do something
    }
}
```

### `keys`
`keys` is an array of objects each of which represents a tab.  
Each tab object should contain `name`, `lines`, and an optional `renderer` method for specific rendering engine like katex.
Example:
```javascript
keys: [
    {
        name: 'ABC',
        lines: [
            ['q', 'w', 'e', 'r'],
            ['a', 's', 'd', 'f'],
            ['z', 'x', 'c', 'v']
        ],
        renderer: function(data, elm) {
            elm.textContent = data;
        }
    },
    {
        name: 'LaTex',
        lines: [
            ['\\sigma', '\\rho', '\\theta'],
            ['\\sin', '\\cos', '\\tan'],
            ['\\phi', '\\epsilon', '\\lambda']
        ],
        renderer: function(data, elm) {
            return katex.render(data, elm);
        }
    }
];
```

## Initialization
```javascript
var options = {
    'keys': keys,
    'elms': elms
}
var kb = KeyBoard(options)
```
## Methods
| Method                        | Purpose|
|---                            | --- |
| `hideKeyboard()`              | Hides the keyboard |
| `showKeyboard()`              | Shows the keyboard |
| `switchTabs(i)`               | Switches keyboard to i-th tab (0-based) |
| `bind(inputElm, callback)`    | Binds a new input to the keyboard |
| `unbind(inputElm)`            | Unbinds an old input. Doesn't delete the element from the array of elms |

## To Do

0. Better key-level handling - take data in an object instead of an array, support key level styling with className option
1. Store cursor positions for all inputs to pass into callback as second parameter
2. Make draggable, optionally.
3. Better home page