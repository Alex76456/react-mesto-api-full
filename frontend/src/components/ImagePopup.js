import React from 'react';
import { useEffect } from 'react';

function ImagePopup({ card, isOpen, onClose, onEscClose }) {
	useEffect(
		() => {
			if (!isOpen) return;
			const handleEscapeClose = (event) => {
				if (event.key === 'Escape') {
					onClose();
				}
			};
			document.addEventListener('keydown', handleEscapeClose);
			return () => {
				document.removeEventListener('keydown', handleEscapeClose);
			};
		},
		[ isOpen, onClose ]
	);

	return (
		<div className={`popup popup_type_image  ${isOpen && 'popup_opened'}`} onClick={onEscClose}>
			<figure className="popup__image-container">
				<button type="button" className="popup__close" onClick={onClose} />
				<img className="popup__image" src={`${card.link}`} alt={card.name} />
				<figcaption className="popup__image-caption">{card.name}</figcaption>
			</figure>
		</div>
	);
}

export default ImagePopup;
