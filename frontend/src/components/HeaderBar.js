import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function HeaderBar({ onSignOut, userEmail }) {
	return (
		<div className="header__bar-container">
			<Switch>
				<Route exact path="/">
					<div className="header__container">
						<p className="header__email">{userEmail}</p>
						<Link to="/sign-in" className="header__link" onClick={onSignOut}>
							Выйти
						</Link>
					</div>
				</Route>
				<Route path="/sign-in">
					<Link to="/sign-up" className="header__link">
						Регистрация
					</Link>
				</Route>

				<Route path="/sign-up">
					<Link to="/sign-in" className="header__link">
						Войти
					</Link>
				</Route>
			</Switch>
		</div>
	);
}

export default HeaderBar;
