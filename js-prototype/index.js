const Interpreter = require('js-interpreter');

const myInterpreter = new Interpreter('2 * 2');
myInterpreter.run();

console.log(myInterpreter.value);


