const Interpreter = require('js-interpreter');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const initFunc = function(interpreter, scope) {

    const draw = (x, y, width, height, style) => {
        ctx.fillStyle = style;
        ctx.fillRect(x, y, width, height, style);
    }

  interpreter.setProperty(scope, 'draw', interpreter.createNativeFunction(draw));
};

const btn = document.getElementById('button');

btn.addEventListener('click', (e) => {
    const editor = document.getElementById('editor');
    const code = editor.value;

    const myInterpreter = new Interpreter(code, initFunc);
    myInterpreter.run();
});