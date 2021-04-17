import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
	const user = useContext(CurrentUserContext);

	function handleCardLike(card, isLiked) {
		onCardLike(card, isLiked);
	}

	function handleCardDelete(card) {
		onCardDelete(card);
	}

	return (
		<main>
			<section className="profile">
				<div className="profile__avatar-container" onClick={onEditAvatar}>
					<img className="profile__avatar" src={user.avatar} alt="аватар" />
				</div>

				<div className="profile__info">
					<h1 className="profile__title">{user.name}</h1>

					<button className="profile__edit-button" type="button" onClick={onEditProfile} />

					<p className="profile__subtitle">{user.about}</p>
				</div>
				<button className="profile__add-button" type="button" onClick={onAddPlace} />
			</section>

			<section className="elements">
				<ul className="elements__list">
					{cards.map((initionalCard) => {
						return (
							<Card
								card={initionalCard}
								onCardClick={onCardClick}
								key={initionalCard._id}
								onCardLike={handleCardLike}
								onCardDelete={handleCardDelete}
							/>
						);
					})}
				</ul>
			</section>
		</main>
	);
}

export default Main;
