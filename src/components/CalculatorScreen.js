import React from 'react';
import {
  Screen,
  Output,
  BottomScreen,
  Operator,
  Input
} from './styles/CalculatorScreenStyles';


export default (props) => (
  <Screen>
    <Output>{props.output}</Output>
    <BottomScreen>
      <Operator>{props.operator}</Operator>
      <Input style={{color: !props.input ? '#9f9f9f' : '#333'}}>{!props.input ? '0' : props.input}</Input>
    </BottomScreen>
  </Screen>
)