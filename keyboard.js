!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        let t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
        t.KeyBoard = e()
    }
}(function() {
    return function(options) {
        const max = (a, b) => {
            return a > b ? a : b;
        }
        const min = (a, b) => {
            return a > b ? b : a;
        }
        
        const {defaultTab, elms, keys} = options;
        
        let keyboard = {
            data: keys,
            /* Will store the dom object of the input elements */
            elms: [],
            /* Will store callbacks for all input elements */
            onKeypress: [],
            /* Will store the index of the active element */
            activeElm: null,
            /* Will store the bool value true for the unbound elements index 
            and false for the still bound elements
            */
            unbound: [],
            showKeyboard: function() {
                this.div.style.display = 'block';
            },
            hideKeyboard: function() {
                this.div.style.display = 'none';
            },
            toggleKeyboard: function() {
                if(this.div.style.display == 'none') {
                    this.showKeyboard();
                } else {
                    this.hideKeyboard();
                }
            },
            unbind: function(inputElm) {
                function check(elm) {
                    return elm == inputElm;
                }
                var i = this.elms.findIndex(check);
                console.log(i);
                if(i != -1) this.unbound[i] = true;
            },
            bind: function(inputElm, callback=null) {
                var i = this.elms.length
                if(!this.elms.includes(inputElm)) {
                    this.elms.push(inputElm);
                    this.onKeypress.push(callback);
                    this.unbound.push(false);
                }
                else return;
                inputElm.addEventListener('focus', (e) => {
                    if(this.unbound[i]) return;
                    this.lastActiveElm = i;
                    this.showKeyboard();
                });
            },
            switchTabs: function(i) {
                if(i >= this.div.childNodes[1].childNodes.length) return;
                this.div.childNodes[1].childNodes.forEach(elm => {
                    elm.style.display = 'none';
                });
                this.div.childNodes[1].childNodes[i].style.display = 'block';
                this.div.querySelector('#keyboard-tab-buttons').childNodes.forEach(elm => {
                    elm.classList.remove('active');
                })
                this.div.querySelector('#keyboard-tab-buttons').childNodes[i].classList.add('active');
            },
            keyPress: function([tabId, i, j]) {
                if(this.lastActiveElm == null) {
                    alert('Click a valid field first');
                    return;
                }
                var index = this.lastActiveElm;
                if(this.unbound[index]) return;
                
                value = this.data[tabId].lines[i][j];
                if(this.onKeypress[index]) {
                    this.onKeypress[index](this.elms[index], value);
                } else {
                    //  do stuff here
                    if(typeof(value) == "string") {
                        var past = this.elms[index].value;
                        this.elms[index].value = past + value;
                    } else {
                        value(this.elms[index]);
                    }
                }
            }
        }

        let keyboard_div = createKeyboard(options.keys);
        keyboard.div = keyboard_div;

        function createKey(options) {
            let {key, value, onKeypress} = options;
        }

        function createTab(lines, tabId, renderer) {
            var tab = document.createElement('div');
            tab.classList.add('keyboard-tab');
            tab.id = `tab-${tabId}`;
            var rows = document.createElement('div');
            rows.classList.add('rows');
            lines.forEach((line, i) => {
                const row = document.createElement('ul');
                line.forEach((value, j) => {
                    const key = document.createElement('li');
                    key.classList.add('key');

                    key.setAttribute('target', `${tabId}-${i}-${j}`);
                    if(typeof(value) == "string") {
                        if(renderer) renderer(value, key);
                        else key.innerText = value;
                    } else {
                        if(renderer) renderer(value[0], key);
                        else key.innerText = value[0];
                        keyboard.data[tabId].lines[i][j] = value[1];
                    }
                    key.addEventListener('click', ()=> {
                        keyboard.keyPress([tabId, i, j]);
                    })
                    row.appendChild(key);
                });
                rows.appendChild(row);
            });
            tab.appendChild(rows);
            return tab;
        }
        
        function createKeyboard(keys) {
            var keyboard_gui = document.createElement('div');
            keyboard_gui.id = 'keyboard';

            var keyboard_ribbon = document.createElement('div');
            keyboard_ribbon.id = 'keyboard-ribbon';

            var tab_buttons = document.createElement('div');
            tab_buttons.id = 'keyboard-tab-buttons';

            keys.forEach((elm, i) => {
                var key = document.createElement('input');
                key.setAttribute('type', 'button');
                key.classList.add('tab-button');
                // tab->line->index
                key.setAttribute('address', '0');
                key.setAttribute('value', elm.name);

                key.addEventListener('click', () => {
                    keyboard.switchTabs(i);
                });
                
                tab_buttons.appendChild(key);
            });
            keyboard_ribbon.appendChild(tab_buttons);
            
            var close = document.createElement('button');
            close.setAttribute('type', 'button');
            close.classList.add('close-button');
            close.setAttribute('value', 'Close');
            close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 3H4c-1.1 0-1.99.9-1.99 2L2 15c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 3h2v2h-2V6zm0 3h2v2h-2V9zM8 6h2v2H8V6zm0 3h2v2H8V9zm-1 2H5V9h2v2zm0-3H5V6h2v2zm9 7H8v-2h8v2zm0-4h-2V9h2v2zm0-3h-2V6h2v2zm3 3h-2V9h2v2zm0-3h-2V6h2v2zm-7 15l4-4H8l4 4z"/></svg>';

            /* Drag indicator
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            */
            /* Eject icons
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 24V0h24v24H0z" fill="none"/><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"/></svg>
             */
            
            close.addEventListener('click', ()=>{
                keyboard.hideKeyboard();
            })
            keyboard_ribbon.appendChild(close);

            keyboard_gui.appendChild(keyboard_ribbon);
            
            var tabs = document.createElement('div');
            tabs.id = 'keyboard-tabs';
            
            keys.forEach((elm, i) => {
                tabs.appendChild(createTab(elm.lines, i, elm.renderer?elm.renderer: null));
            });
            keyboard_gui.appendChild(tabs);

            // key;

            document.body.appendChild(keyboard_gui);
            return keyboard_gui;
        }
        keyboard.switchTabs(defaultTab ? max(defaultTab, keys.length-1) : 0);
        keyboard.hideKeyboard();
        elms.forEach((elm) => {
            keyboard.bind(elm.field, elm.onKeypress);
        });

        return keyboard;
    }
});