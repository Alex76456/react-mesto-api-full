import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onEscClose, onAddPlace }) {
	const [ place, setPlace ] = React.useState('');
	const [ link, setLink ] = React.useState('');
	const [ buttonSubmitText, setButtonSubmitText ] = React.useState('Создать');

	// Переменные для валидации --------------------------------------------------------------------------------------------------------------
	const [ inputPlaceErrorText, setInputPlaceErrorText ] = React.useState('Вы пропустили это поле.');
	const [ inputLinkErrorText, setInputLinkErrorText ] = React.useState('Вы пропустили это поле.');

	const [ inputPlaceValid, setInputPlaceValid ] = React.useState(true);
	const [ inputLinkValid, setInputLinkValid ] = React.useState(true);
	const [ formValid, setFormValid ] = React.useState(false);

	const submitButtonClassName = `popup__submit ${formValid ? '' : 'popup__submit_disabled'}`;

	const inputPlaceErrorClassName = `popup__input-error ${inputPlaceValid ? '' : 'popup__input-error_visible'}`;
	const inputPlaceClassName = `popup__input popup__input_type_place ${inputPlaceValid
		? ''
		: 'popup__input_type_error'}`;

	const inputLinkErrorClassName = `popup__input-error ${inputLinkValid ? '' : 'popup__input-error_visible'}`;
	const inputLinkClassName = `popup__input popup__input_type_link ${inputLinkValid ? '' : 'popup__input_type_error'}`;

	//-------------------------------------------------------------------------------------------------------------------------------------

	function handlePlaceChange(e) {
		setPlace(e.target.value);

		setInputPlaceValid(e.target.validity.valid);
		setInputPlaceErrorText(e.target.validationMessage);

		if (e.target.validity.valid && inputLinkValid && link !== '') {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}

	function handleLinkChange(e) {
		setLink(e.target.value);

		setInputLinkValid(e.target.validity.valid);
		setInputLinkErrorText(e.target.validationMessage);

		if (inputPlaceValid && e.target.validity.valid && place !== '') {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		setButtonSubmitText('Создание...');
		onAddPlace({ place: place, link: link });
	}

	React.useEffect(
		() => {
			if (isOpen === false) {
				setPlace('');
				setLink('');
				setButtonSubmitText('Создать');
				setInputPlaceValid(true);
				setInputLinkValid(true);
				setFormValid(false);
			}
		},
		[ isOpen ]
	);

	return (
		<PopupWithForm
			name="add"
			title="Новое место"
			isOpen={isOpen}
			onClose={onClose}
			onEscClose={onEscClose}
			onSubmit={handleSubmit}
		>
			<fieldset className="popup__form-set">
				<label className="popup__form-field">
					<input
						className={inputPlaceClassName}
						type="text"
						name="place"
						id="place-input"
						placeholder="Название"
						required
						minLength="2"
						maxLength="30"
						value={place}
						onChange={handlePlaceChange}
					/>
					<span className={inputPlaceErrorClassName} id="place-input-error">
						{inputPlaceErrorText}
					</span>
				</label>

				<label className="popup__form-field">
					<input
						className={inputLinkClassName}
						type="url"
						name="link"
						id="url-input"
						placeholder="Ссылка на картинку"
						required
						value={link}
						onChange={handleLinkChange}
					/>
					<span className={inputLinkErrorClassName} id="url-input-error">
						{inputLinkErrorText}
					</span>
				</label>
				<button className={submitButtonClassName} type="submit" disabled={formValid ? false : true}>
					{buttonSubmitText}
				</button>
			</fieldset>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
