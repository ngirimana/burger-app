import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle'

const toolBar = (props) => (
	<header className={ classes.ToolBar }>
		<DrawToggle clicked={ props.drawToggleClicked } />
		<div className={ classes.Logo }>
			<Logo />
		</div>
		<nav className={ classes.DeskTopOnly }>
			<NavigationItems />
		</nav>
	</header>
);

export default toolBar;