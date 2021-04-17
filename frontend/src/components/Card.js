import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
	const user = React.useContext(CurrentUserContext);
	const isOwn = card.owner._id === user._id;

	const cardDeleteButtonClassName = `elements__delete-button ${isOwn
		? 'elements__delete-button_visible'
		: 'elements__delete-button_hidden'}`;

	const isLiked = card.likes.some((i) => i._id === user._id);
	const cardLikeButtonClassName = `elements__caption-like ${isLiked
		? 'elements__caption-like_color_black'
		: 'elements__caption-like_color_white'}`;

	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card, isLiked);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	return (
		<li className="elements__list-item">
			<button className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
			<img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
			<div className="elements__caption-space">
				<h2 className="elements__caption">{card.name}</h2>
				<div className="element__like-container">
					<button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
					<p className="elements__likes-number">{card.likes.length}</p>
				</div>
			</div>
		</li>
	);
}

export default Card;
