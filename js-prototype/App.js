import React, { Component } from 'react';
import Interpreter from 'js-interpreter';

const PERIOD = 100;
const TIME_STEPS = 100;
const MAX_NUMBER_OF_LINES = 30;
const EDITOR_COLS = 80;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            interval: 100,
            run: false,
            lastCodeThatWorked: '',
            code: '',
            numberOfLines: 1,
            t: 0
        };
    }

    componentDidMount() {
        const run = () => {
            if (this.state.run) {
                let interpreter;
                try {
                    interpreter = new Interpreter(this.state.code, this.initInterpreter.bind(this));
                    interpreter.run();
                    this.setState({ lastCodeThatWorked: this.state.code });
                } catch (e) {
                    interpreter = new Interpreter(this.state.lastCodeThatWorked, this.initInterpreter);
                    interpreter.run();
                }

                this.setState({ t: (this.state.t + 1) % TIME_STEPS });
            }
        };

        setInterval(run.bind(this), PERIOD);
    }

    getCanvasRef(e) {
        if (e) {
            this.canvas = e;
            this.ctx = e.getContext('2d');
        }
    }

    initInterpreter(interpreter, scope) {
        const draw = (x, y, width, height, style) => {
            this.ctx.fillStyle = style;
            this.ctx.fillRect(x, y, width, height, style);
        };

        interpreter.setProperty(scope, 'draw', interpreter.createNativeFunction(draw));
        interpreter.setProperty(scope, 't', interpreter.createPrimitive(this.state.t));
    }

    toggleRun() {
        this.setState({ run: !this.state.run });
    }

    handleEditorChange(e) {
        const value = e.target.value;
        const split = value.split('\n');
        const numberOfLines = Math.min(split.length, MAX_NUMBER_OF_LINES);

        const code = split.slice(0, numberOfLines).join('\n');

        this.setState({
            code
        });
    }

    getLineNumbers() {
        const lines = this.state.code.split('\n');

        let lineNumbers = '';
        let lineNumber = 1;

        lines.forEach((line) => {
            // insert blank lines for lines over column limit
            const linesInLine = Math.ceil(line.length / (EDITOR_COLS - 13));

            lineNumbers += `${lineNumber}\n`;
            for (let i = 0; i < linesInLine - 1; i++) {
                lineNumbers += ' \n';
            }

            lineNumber++;
        });

        return lineNumbers;
    }

    render() {
        return (
            <div className="main">
                <div className="left">
                    <div className="editor-buttons">
                        <input id="block-name" defaultValue="/HelloWorld" type="text" />
                        <button id="button-run" onClick={this.toggleRun.bind(this)} type="button">Run</button>
                        <button id="button-save" onClick={this.toggleRun.bind(this)} type="button">Save</button>
                    </div>
                    <div id="editor">
                        <textarea id="editor-line-numbers" disabled={true} value={this.getLineNumbers()}></textarea>
                        <textarea id="editor-input" value={this.state.code} cols={EDITOR_COLS} rows="10" onChange={this.handleEditorChange.bind(this)}></textarea>
                    </div>
                </div>
                <div className="right">
                    <canvas ref={this.getCanvasRef.bind(this)} id="canvas" width="100" height="100"></canvas>
                </div>
            </div>
        );
    }
}

export default App;
