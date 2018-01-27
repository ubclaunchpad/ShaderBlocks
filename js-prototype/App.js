import React, { Component } from 'react';
import Interpreter from 'js-interpreter';

const PERIOD = 100;
const TIME_STEPS = 100;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            interval: 100,
            run: false,
            lastCodeThatWorked: '',
            code: '',
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
        this.setState({ code: e.target.value });
    }

    render() {
        return (
            <div className="main">
                <canvas ref={this.getCanvasRef.bind(this)} id="canvas" width="100" height="100"></canvas>
                <textarea id="editor" cols="50" rows="10" onChange={this.handleEditorChange.bind(this)}></textarea>
                <button id="button" onClick={this.toggleRun.bind(this)} type="button">Run</button>
            </div>
        );
    }
}

export default App;
