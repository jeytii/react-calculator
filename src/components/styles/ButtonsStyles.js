import styled from 'styled-components';
import { darken } from 'polished';


export default styled.button `
	border: none;
	background: #3f3f3f;
	color: #efefef;
	font-size: 3.5vmax;
	font-family: monospace;
	box-shadow: 1px 1px 1px 1px rgba(255, 255, 255, 0.7);
	cursor: pointer;

	&:hover {
		background: ${darken('0.055', '#3f3f3f')};
	}


	&:nth-child(5),
	&:nth-child(9),
	&:nth-child(13),
	&:nth-child(17),
	&:nth-child(20) {
		background: orange;

		&:hover {
			background: ${darken('0.055', 'orange')}
		}
	}

	&:nth-child(18) {
		grid-column: 1 / span 2;
	}
`;

// export default Button;