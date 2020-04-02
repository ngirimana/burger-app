import React from 'react';
import cleasses from './BackDrop.css'

const backDrop = (props) => (
	props.show ?
		<div
			className={ cleasses.BackDrop }
			onClick={ props.clicked }>
		</div> : null
);
export default backDrop;