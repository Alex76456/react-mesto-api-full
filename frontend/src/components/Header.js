import React from 'react';
//import { Route, Switch, Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import burger from '../images/burger-icon.svg';
import close from '../images/close-icon.svg';
import HeaderBar from './HeaderBar';

function Header({ onSignOut, userEmail }) {
	const [ burgerOpen, setBurgerOpen ] = React.useState(false);

	function handleBurgerChange(e) {
		setBurgerOpen(!burgerOpen);
	}

	return (
		<header className="header">
			{burgerOpen && (
				<div className="header__bar-for-small">
					<HeaderBar onSignOut={onSignOut} userEmail={userEmail} />
				</div>
			)}
			<div className="header__wrapper">
				<img className="logo" src={logo} alt="Место-логотип" />
				<div className="header__burger">
					{burgerOpen ? (
						<img className="header__burger-close" src={close} alt="закрыть" onClick={handleBurgerChange} />
					) : (
						<img className="header__burger-icon" src={burger} alt="бургер" onClick={handleBurgerChange} />
					)}
				</div>
				<div className="header__bar-for-big">
					<HeaderBar onSignOut={onSignOut} userEmail={userEmail} />
				</div>
			</div>
		</header>
	);
}

export default Header;
