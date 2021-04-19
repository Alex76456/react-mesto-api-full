import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isOpen, onClose, onEscClose, onDeleteCard }) {
	const [ buttonSubmitText, setButtonSubmitText ] = React.useState('Да');
	function handleSubmit(e) {
		e.preventDefault();
		setButtonSubmitText('Удаление...');
		onDeleteCard();
	}

	React.useEffect(
		() => {
			if (isOpen === false) {
				setButtonSubmitText('Да');
			}
		},
		[ isOpen ]
	);

	return (
		<PopupWithForm
			name="confirm"
			title="Вы уверены?"
			isOpen={isOpen}
			onClose={onClose}
			onEscClose={onEscClose}
			onSubmit={handleSubmit}
		>
			<fieldset className="popup__form-set">
				<button className="popup__submit" type="submit">
					{buttonSubmitText}
				</button>
			</fieldset>
		</PopupWithForm>
	);
}

export default ConfirmDeletePopup;
