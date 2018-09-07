import React, { Component } from 'react';
import CalculatorScreen from './CalculatorScreen';
import Buttons from './Buttons';
import { Wrapper, Calculator } from './styles/AppStyles';


export default class App extends Component {
  state = {
    input: null,
    output: null,
    operator: null,
    chars: []
  }

  componentDidMount() {
    window.addEventListener('keyup', this.inputOnKeyUp);
  }

  changeStates = (input = null, output = null, operator = null, chars = []) => {
    this.setState({ input, output, operator, chars });
  }

  operate = (op, input, output) => {
    output = (output.includes('.')) ? parseFloat(output) : Number(output);
    input = (input.includes('.')) ? parseFloat(input) : Number(input);
    let formula;

    switch (op) {
      case '+':
        formula = output + input;
        break;
      case '-':
        formula = output - input;
        break;
      case '*':
        formula = output * input;
        break;
      case '/':
        formula = output / input;
        break;
      default:
        break;
    }

    return formula;
  }

  inputNumberOrDot = (states, char) => {
    if(
      (char === '.' && states.input) &&
      (/\.$/.test(states.input) || states.input.includes('.'))
    ) return;

    this.setState(prevState => ({
      chars: prevState.chars.concat(((!prevState.input || !prevState.chars.length) && char === '.') ? ['0', '.'] : char)
    }), () => {
      this.setState(prevState => ({
        input: prevState.chars.join('')
      }))
    })
  }

  toggleNegativeValue = (states) => {
    if(!states.input || /^0\.?$/.test(states.input)) return;

    if(!states.chars.length) {
      if(states.input > 0) {
        const negativeValue = states.input.includes('.') ? parseFloat(states.input) * -1 : Number(states.input) * -1;
        this.setState(prevState => ({ input: String(negativeValue) }));
      } else {
        this.setState(prevState => ({ input: String(Math.abs(prevState.input)) }));
      }
      return;
    }

    this.setState(prevState => ({
      chars: (prevState.input > 0) ? ['-'].concat(prevState.chars) : prevState.chars.slice(1)
    }), () => {
      this.setState(prevState => ({
        input: prevState.chars.join('')
      }))
    })
  }

 defineOperator = (states, operatorData) => {
    if(!states.input && !states.output) return;
    
    if(operatorData !== '=') {
      if(states.input) {
        this.changeStates(null, states.input.replace(/\.$/, ''), operatorData);

        if(states.output) {
          this.changeStates(null, String(this.operate(states.operator, states.input, states.output)), states.operator);
        }
      }

      this.setState({ operator: operatorData });

      return;
    }

    if(states.input && states.output) {
      this.changeStates(String(this.operate(states.operator, states.input, states.output)));
    }
  }

  erase = (states) => {
    if(!states.input || !states.chars) return;

    this.setState(prevState => ({
      input: prevState.input.slice(0, -1),
      chars: prevState.chars.slice(0, -1)
    }))

    if(
      /^\-0\.?$/.test(states.chars) ||
      /^\-0\.?$/.test(states.input) ||
      /^\-[1-9]$/.test(states.chars) ||
      /^\-[1-9]$/.test(states.input)
    ) {
      this.clearInput();
    }
  }

  clearInput = () => {
    this.setState({
      input: null,
      chars: []
    });
  }

  validateInput = (states, character) => {
    const charIs = char => character === char;

    if(/^[0-9.]$/.test(character)) {
      this.inputNumberOrDot(states, character);
    }

    if(charIs('CE')) {
      this.clearInput();
    }

    if(charIs('C') || charIs('Escape')) {
      this.changeStates();
    }

    if(charIs('±')) {
      this.toggleNegativeValue(states);
    }

    if(charIs('+') || charIs('-') || charIs('*') || charIs('/') || charIs('=')) {
      this.defineOperator(states, character);
    }

    if(charIs('Backspace')) {
      this.erase(states);
    }
  }

  inputOnClick = (e) => {
    this.validateInput(this.state, e.target.dataset.character);
  }

  inputOnKeyUp = (e) => {
    this.validateInput(this.state, e.key);
  }

  render() {
    const {input, output, operator} = this.state;

    return (
      <Wrapper>
        <Calculator>
          
          <CalculatorScreen
            input={input}
            output={output}
            operator={operator}
          />

          <Buttons clickEvent={this.inputOnClick} />

        </Calculator>
      </Wrapper>
    )
  }
}