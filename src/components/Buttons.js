import React, { Fragment } from 'react';
import Button from './styles/ButtonsStyles';


export default (props) => {
	const characters = ['C', 'CE', '±', '+', '9', '8', '7', '-', '6', '5', '4', '*', '3', '2', '1', '/', '0', '.', '='];
	
	return(
		<Fragment>
			{characters.map((character, index) => (
				<Button
					key={index}
					data-character={character}
					onClick={props.clickEvent}>
						{character}
				</Button>
			))}
		</Fragment>
	)
}