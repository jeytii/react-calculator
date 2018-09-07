import styled from 'styled-components';

const Wrapper = styled.div `
  height: ${window.innerHeight}px;
`;

const Calculator = styled.div `
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
`;

export { Wrapper, Calculator };