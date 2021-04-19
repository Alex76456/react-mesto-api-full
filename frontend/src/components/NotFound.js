import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../images/404.jpg';

function NotFound() {
	return (
		<div className="notfound">
			<img className="notfound__image" src={notFound} alt="404" />
			<Link to="/sign-in" className="notfound__link">
				На главную
			</Link>
		</div>
	);
}

export default NotFound;
