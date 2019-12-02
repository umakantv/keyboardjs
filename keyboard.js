!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
        t.KeyBoard = e()
    }
}(function() {
    return function(options) {
        
        var keyboard_div = createKeyboard(options.keys);
        var keyboard = {
            data: options.keys,
            elms: [],
            onKeypress: [],
            activeElm: null,
            unbound: [],
            showKeyboard: function() {
                this.div.style.display = 'block';
            },
            hideKeyboard: function() {
                this.div.style.display = 'none';
            },
            unbind: function(inputElm) {
                function check(elm) {
                    return elm == inputElm;
                }
                var i = this.elms.findIndex(check);
                console.log(i);
                if(i != -1) this.unbound[i] = true;
            },
            bind: function(inputElm, callback) {
                var i = this.elms.length
                if(!this.elms.includes(inputElm)) {
                    this.elms.push(inputElm);
                    this.onKeypress.push(callback);
                    this.unbound.push(false);
                }
                else return;
                inputElm.addEventListener('focus', (e) => {
                    if(this.unbound[i]) return;
                    this.showKeyboard();
                    this.activeElm = i;
                    inputElm.blur();
                });
            },
            switchTabs: function(i) {
                if(i >= this.div.childNodes[1].childNodes.length) return;
                this.div.childNodes[1].childNodes.forEach(elm => {
                    elm.style.display = 'none';
                });
                this.div.childNodes[1].childNodes[i].style.display = 'block';
            },
            div: keyboard_div,
            keyPress: function(value) {
                if(this.activeElm == null) return;
                var i = this.activeElm;
                if(this.unbound[i]) return;
                var past = this.elms[i].value;
                this.elms[i].value = past + this.data[value[0]].lines[value[1]][value[2]];
                this.onKeypress[i](this.elms[i]);
            }
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
                    if(renderer) renderer(value, key);
                    else key.innerText = value;
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
            
            var close = document.createElement('input');
            close.setAttribute('type', 'button');
            close.classList.add('close-button');
            close.setAttribute('value', 'Close');
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
        keyboard.switchTabs(0);
        keyboard.hideKeyboard();
        options.elms.forEach((elm) => {
            keyboard.bind(elm.field, elm.onKeypress);
        });

        return keyboard;
    }
});