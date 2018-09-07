import styled from 'styled-components';

const Screen = styled.div `
	display: flex;
	flex-direction: column;
	grid-column: 1 / -1;
	font-size: 3.5vmax;
	font-family: monospace;
	color: #333;
	padding: 0 1rem;

	& > div {
		flex: 1;
	}
`;

const Output = styled.div `
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const BottomScreen = styled.div `
	display: flex;
	flex: 1;
`;

const Operator = Output;

const Input = styled(Output) `
	flex: 1;
`;

export { Screen, Output, BottomScreen, Operator, Input };