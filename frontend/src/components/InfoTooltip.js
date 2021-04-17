import React from 'react';
import { useEffect } from 'react';
import SuccesIcon from '../images/SuccesIcon.svg';
import ErrorIcon from '../images/ErrorIcon.svg';

function InfoTooltip({ title, icon, isOpen, onClose, onEscClose }) {
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
		<div className={`popup popup_type_info ${isOpen && 'popup_opened'}`} onClick={onEscClose}>
			<div className="popup__content popup__content_type_info">
				<button type="button" className="popup__close popup__close_place_info" onClick={onClose} />

				{icon ? (
					<img className="popup__succes-image" src={SuccesIcon} alt="успех" />
				) : (
					<img className="popup__error-image" src={ErrorIcon} alt="неудача" />
				)}
				<h2 className="popup__title popup__title_type_info">{`${title}`}</h2>
			</div>
		</div>
	);
}

export default InfoTooltip;
