import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onEscClose, onUpdateAvatar }) {
	const [ avatar, setAvatar ] = React.useState('');

	const [ buttonSubmitText, setButtonSubmitText ] = React.useState('Сохранить');
	const [ inputErrorText, setInputErrorText ] = React.useState('Вы пропустили это поле.');

	const [ inputValid, setInputValid ] = React.useState(true);
	const [ formValid, setFormValid ] = React.useState(false);

	const submitButtonClassName = `popup__submit ${formValid ? '' : 'popup__submit_disabled'}`;
	const inputErrorClassName = `popup__input-error ${inputValid ? '' : 'popup__input-error_visible'}`;
	const inputClassName = `popup__input popup__input_type_avatar-link ${inputValid ? '' : 'popup__input_type_error'}`;

	function handleSubmit(e) {
		e.preventDefault();
		setButtonSubmitText('Сохранение...');
		onUpdateAvatar({ avatar: avatar });
	}

	React.useEffect(
		() => {
			if (isOpen === false) {
				setAvatar('');
				setButtonSubmitText('Сохранить');
				setInputValid(true);
				setFormValid(false);
			}
		},
		[ isOpen ]
	);

	function handleValidation(e) {
		setAvatar(e.target.value);

		setInputValid(e.target.validity.valid);
		setInputErrorText(e.target.validationMessage);

		setFormValid(e.target.validity.valid);
	}

	return (
		<PopupWithForm
			name="avatar"
			title="Обновить аватар"
			isOpen={isOpen}
			onClose={onClose}
			onEscClose={onEscClose}
			onSubmit={handleSubmit}
		>
			<fieldset className="popup__form-set">
				<label className="popup__form-field">
					<input
						className={inputClassName}
						type="url"
						name="avatar-link"
						id="url-avatar-input"
						placeholder="Ссылка на картинку"
						required
						value={avatar}
						onChange={handleValidation}
					/>
					<span className={inputErrorClassName} id="url-avatar-input-error">
						{inputErrorText}
					</span>
				</label>

				<button className={submitButtonClassName} type="submit" disabled={formValid ? false : true}>
					{buttonSubmitText}
				</button>
			</fieldset>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
