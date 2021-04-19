import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onEscClose, onUpdateUser }) {
	const user = React.useContext(CurrentUserContext);
	const [ buttonSubmitText, setButtonSubmitText ] = React.useState('Сохранить');

	const [ name, setName ] = React.useState('');
	const [ description, setDescription ] = React.useState('');

	// Переменные для валидации --------------------------------------------------------------------------------------------------------------
	const [ inputNameErrorText, setInputNameErrorText ] = React.useState('Вы пропустили это поле.');
	const [ inputDescriptionErrorText, setInputDescriptionErrorText ] = React.useState('Вы пропустили это поле.');

	const [ inputNameValid, setInputNameValid ] = React.useState(true);
	const [ inputDescriptionValid, setInputDescriptionValid ] = React.useState(true);
	const [ formValid, setFormValid ] = React.useState(false);

	const submitButtonClassName = `popup__submit ${formValid ? '' : 'popup__submit_disabled'}`;

	const inputNameErrorClassName = `popup__input-error ${inputNameValid ? '' : 'popup__input-error_visible'}`;
	const inputNameClassName = `popup__input popup__input_type_name ${inputNameValid ? '' : 'popup__input_type_error'}`;

	const inputDescriptionErrorClassName = `popup__input-error ${inputDescriptionValid
		? ''
		: 'popup__input-error_visible'}`;
	const inputDescriptionClassName = `popup__input popup__input_type_job ${inputDescriptionValid
		? ''
		: 'popup__input_type_error'}`;

	//----------------------------------------------------------------------------------------------------------------------

	function handleNameChange(e) {
		setName(e.target.value);

		setInputNameValid(e.target.validity.valid);
		setInputNameErrorText(e.target.validationMessage);

		if (e.target.validity.valid && inputDescriptionValid && description !== '') {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}

	function handleDescriptionChange(e) {
		setDescription(e.target.value);

		setInputDescriptionValid(e.target.validity.valid);
		setInputDescriptionErrorText(e.target.validationMessage);

		if (inputNameValid && e.target.validity.valid && name !== '') {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}

	React.useEffect(
		() => {
			if (!isOpen) {
				setName(String(user.name));
				setDescription(String(user.about));
				setButtonSubmitText('Сохранить');
				setInputNameValid(true);
				setInputDescriptionValid(true);
				setFormValid(false);
			}
		},
		[ user, isOpen ]
	);

	function handleSubmit(e) {
		e.preventDefault();
		setButtonSubmitText('Сохранение...');
		onUpdateUser({ name: name, about: description });
	}

	return (
		<PopupWithForm
			name="edit"
			title="Редактировать профиль"
			isOpen={isOpen}
			onClose={onClose}
			onEscClose={onEscClose}
			onSubmit={handleSubmit}
		>
			<fieldset className="popup__form-set">
				<label className="popup__form-field">
					<input
						className={inputNameClassName}
						type="text"
						name="name"
						id="name-input"
						placeholder="Имя"
						required
						minLength="2"
						maxLength="40"
						value={name}
						onChange={handleNameChange}
					/>
					<span className={inputNameErrorClassName} id="name-input-error">
						{inputNameErrorText}
					</span>
				</label>

				<label className="popup__form-field">
					<input
						className={inputDescriptionClassName}
						type="text"
						name="description"
						id="job-input"
						placeholder="Профессия"
						required
						minLength="2"
						maxLength="200"
						value={description}
						onChange={handleDescriptionChange}
					/>
					<span className={inputDescriptionErrorClassName} id="job-input-error">
						{inputDescriptionErrorText}
					</span>
				</label>
				<button className={submitButtonClassName} type="submit" disabled={formValid ? false : true}>
					{buttonSubmitText}
				</button>
			</fieldset>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
