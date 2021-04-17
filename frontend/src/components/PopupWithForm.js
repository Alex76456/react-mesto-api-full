import React from 'react';
import { useEffect } from 'react';

function PopupWithForm({ name, title, isOpen, onClose, onEscClose, children, onSubmit }) {
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
		<div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onEscClose}>
			<div className="popup__content">
				<button type="button" className={`popup__close popup__close_place_${name}`} onClick={onClose} />
				<h2 className="popup__title">{`${title}`}</h2>

				<form className="popup__form" name={`${name}-form`} onSubmit={onSubmit} noValidate>
					<fieldset className="popup__form-set">{children}</fieldset>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
