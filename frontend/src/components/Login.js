import React from 'react';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
//import * as auth from '../utils/auth';

function Login({ onLogin }) {
	const [ email, setEmail ] = React.useState('');
	const [ password, setPassword ] = React.useState('');
	//const [ buttonSubmitText, setButtonSubmitText ] = React.useState('Сохранить');

	// Переменные для валидации --------------------------------------------------------------------------------------------------------------
	const [ inputEmailErrorText, setInputEmailErrorText ] = React.useState('Вы пропустили это поле.');
	const [ inputPasswordErrorText, setInputPasswordErrorText ] = React.useState('Вы пропустили это поле.');

	const [ inputEmailValid, setInputEmailValid ] = React.useState(true);
	const [ inputPasswordValid, setInputPasswordValid ] = React.useState(true);
	const [ formValid, setFormValid ] = React.useState(false);

	const submitButtonClassName = `sign__submit ${formValid ? '' : 'sign__submit_disabled'}`;

	const inputEmailErrorClassName = `sign__input-error ${inputEmailValid ? '' : 'sign__input-error_visible'}`;
	const inputEmailClassName = `sign__input sign__input_type_name ${inputEmailValid ? '' : 'sign__input_type_error'}`;

	const inputPasswordErrorClassName = `sign__input-error ${inputPasswordValid ? '' : 'sign__input-error_visible'}`;
	const inputPasswordClassName = `sign__input sign__input_type_job ${inputPasswordValid
		? ''
		: 'sign__input_type_error'}`;

	//----------------------------------------------------------------------------------------------------------------------

	function handleEmailChange(e) {
		setEmail(e.target.value);

		setInputEmailValid(e.target.validity.valid);
		setInputEmailErrorText(e.target.validationMessage);

		if (e.target.validity.valid && inputPasswordValid && password !== '') {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);

		setInputPasswordValid(e.target.validity.valid);
		setInputPasswordErrorText(e.target.validationMessage);

		if (inputEmailValid && e.target.validity.valid && email !== '') {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}

	useEffect(() => {
		setFormValid(false);
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		onLogin(email, password);
	}

	return (
		<div className="sign">
			<div className="sign__content">
				<h2 className="sign__title">Вход</h2>

				<form className="sign__form" onSubmit={handleSubmit} noValidate>
					<fieldset className="sign__form-set">
						<label className="sign__form-field">
							<input
								className={inputEmailClassName}
								type="email"
								name="email"
								placeholder="Email"
								required
								minLength="2"
								maxLength="40"
								value={email}
								onChange={handleEmailChange}
							/>
							<span className={inputEmailErrorClassName}>{inputEmailErrorText}</span>
						</label>

						<label className="sign__form-field">
							<input
								className={inputPasswordClassName}
								type="password"
								name="password"
								placeholder="Пароль"
								required
								minLength="2"
								maxLength="200"
								value={password}
								onChange={handlePasswordChange}
							/>
							<span className={inputPasswordErrorClassName}>{inputPasswordErrorText}</span>
						</label>
						<button className={submitButtonClassName} type="submit" disabled={formValid ? false : true}>
							Войти
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
}

export default withRouter(Login);
