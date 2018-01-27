const Interpreter = require('js-interpreter');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const INTERVAL = 100;
const MAX_I = 100;
let i = 0;
let RUN = false;
let ERROR = false;
let lastCodeThatWorked = "";

const initFunc = function(interpreter, scope) {

    const draw = (x, y, width, height, style) => {
        ctx.fillStyle = style;
        ctx.fillRect(x, y, width, height, style);
    }

  interpreter.setProperty(scope, 'draw', interpreter.createNativeFunction(draw));
  interpreter.setProperty(scope, 't', interpreter.createPrimitive(i));
};

const btn = document.getElementById('button');

btn.addEventListener('click', () => {
    RUN = !RUN;
});

setInterval(() => {
    if (RUN) {
        const editor = document.getElementById('editor');
        const code = editor.value;
        let interpreter;
        try {
            interpreter = new Interpreter(code, initFunc);
            interpreter.run();
            lastCodeThatWorked = code;
        }
        catch (e) {
            interpreter = new Interpreter(lastCodeThatWorked, initFunc);
            interpreter.run();
        }

        i = (i + 1) % MAX_I;
    }
}, INTERVAL)