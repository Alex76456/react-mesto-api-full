import React from 'react';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import NotFound from './NotFound';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
	const history = useHistory();

	//Заполняем контент------------------------------------------------
	const [ currentUser, setCurrentUser ] = useState({});
	const [ cards, setCards ] = useState([]);
	const [ userData, setUserData ] = useState({ email: 'EMAIL' });
	const [ infoToolTipData, setInfoToolTipData ] = useState({
		title: 'Что-то пошло не так! Попробуйте ещё раз.',
		icon: false
	});
	//-----------------------------------------------------------------

	//Переменные статуса ------------------------------------------
	const [ loggedIn, setLoggedIn ] = useState(false);
	const [ regStatus, setRegStatus ] = useState(false);
	//-------------------------------------------------------------

	//Переменные открытия/закрытия попапов ---------------------------------------------------
	const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false);
	const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
	const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false);
	const [ isImagePopupOpen, setIsImagePopupOpen ] = useState(false);
	const [ isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen ] = useState(false);
	const [ isInfoToolTipOpen, setIsInfoToolTipOpen ] = useState(false);
	//----------------------------------------------------------------------------------------

	//Транзитные переменные ------------------------------------------------
	const [ selectedCard, setSelectedCard ] = useState({});
	const [ cardToDelete, setCardToDelete ] = useState({});
	//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	//Функции открытия/закрытия попапов-----------------------------------------------
	function handleInfoToolTip() {
		setIsInfoToolTipOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}

	function handleCardClick(choosenCard) {
		setSelectedCard(choosenCard);
		setIsImagePopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsImagePopupOpen(false);
		setIsConfirmDeletePopupOpen(false);
		setIsInfoToolTipOpen(false);
		setSelectedCard({});
	}

	function handleClick(e) {
		if (e.target.classList.contains('popup')) {
			closeAllPopups();
		}
	}
	//--------------------------------------------------------------------------------

	function handleUpdateUser(inputsValues) {
		api
			.setUser(inputsValues)
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
			});
	}

	function handleUpdateAvatar(newAvatar) {
		api
			.setUserAvatar(newAvatar)
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
			});
	}

	function handleCardLike(card, isLiked) {
		(!isLiked ? api.setLikeCard(card._id) : api.deleteLikeCard(card._id))
			.then((newCard) => {
				const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
				setCards(newCards);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
			});
	}

	function handleCardDelete(card) {
		setIsConfirmDeletePopupOpen(true);
		setCardToDelete(card);
	}

	function handleAddPlaceSubmit(inputsValues) {
		api
			.setNewCard(inputsValues)
			.then((newCard) => {
				setCards([ ...cards, newCard ]);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
			});
	}

	function handleDeleteCardSubmit() {
		api
			.deleteCard(cardToDelete._id)
			.then(() => {
				const newCards = cards.filter((c) => c._id !== cardToDelete._id);
				setCards(newCards);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
				setCardToDelete({});
			});
	}

	//АВТОРИЗАЦИЯ--------------------------------АВТОРИЗАЦИЯ---------------------------------------
	function tokenCheck() {
		const token = localStorage.getItem('token');
		if (token) {
			auth
				.checkToken(token)
				.then((res) => {
					if (res) {
						//setUserData({ email: res.data.email });
						setLoggedIn(true);
						console.log('залогинился?');
					}
				})
				.catch((err) => console.error(err));
		}
	}
	//проверяем токен при загрузке Апп
	useEffect(() => {
		tokenCheck();
	}, []);

	//если залогинились, то сразу грузим данные и перебросит на главную
	useEffect(
		() => {
			if (loggedIn) {
				Promise.all([ api.getUser(), api.getInitialCards() ])
					.then(([ userData, cardsData ]) => {
						setCurrentUser(userData);
						setUserData({ email: userData.email });
						setCards(cardsData);
					})
					.catch((err) => {
						console.error(err);
					});
				history.push('/');
			}
		},
		[ history, loggedIn ]
	);

	function handleLogin(email, password) {
		auth
			.authorize(email, password)
			.then((data) => {
				if (data.token) {
					localStorage.setItem('token', data.token);
					setUserData({ email: email });
					setLoggedIn(true);
					history.push('/');
				}
			})
			.catch((err) => console.error(err));
	}

	function handleRegister(email, password) {
		auth
			.register(email, password)
			.then((res) => {
				if (res.data) {
					setRegStatus(true);
					history.push('/');
					setInfoToolTipData({ icon: true, title: 'Вы успешно зарегистрировались!' });
					handleInfoToolTip();
				} else {
					setRegStatus(false);
					handleInfoToolTip();
				}
			})
			.catch((err) => console.error(err));
	}

	function handleLogout() {
		localStorage.removeItem('token');
		setUserData({ email: '' });
		setLoggedIn(false);
	}
	//---------------------------------------------------------------------------------------------------

	return (
		<div className="root">
			<div className="page">
				<CurrentUserContext.Provider value={currentUser}>
					<Header onSignOut={handleLogout} userEmail={userData.email} />
					<Switch>
						<ProtectedRoute
							exact
							path="/"
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onEditAvatar={handleEditAvatarClick}
							onCardClick={handleCardClick}
							cards={cards}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
							component={Main}
							loggedIn={loggedIn}
						/>
						<Route path="/sign-in">
							<Login onLogin={handleLogin} />
						</Route>

						<Route path="/sign-up">
							<Register onRegister={handleRegister} regStatus={regStatus} />
						</Route>
						<Route exact path="/">
							{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
						</Route>
						<Route path="/*">
							<NotFound />
						</Route>
					</Switch>

					<Footer />
					<InfoTooltip
						onClose={closeAllPopups}
						isOpen={isInfoToolTipOpen}
						onEscClose={handleClick}
						title={infoToolTipData.title}
						icon={infoToolTipData.icon}
					/>
					<ImagePopup
						card={selectedCard}
						onClose={closeAllPopups}
						isOpen={isImagePopupOpen}
						onEscClose={handleClick}
					/>
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onEscClose={handleClick}
						onUpdateUser={handleUpdateUser}
					/>
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onEscClose={handleClick}
						onUpdateAvatar={handleUpdateAvatar}
					/>
					<ConfirmDeletePopup
						isOpen={isConfirmDeletePopupOpen}
						onClose={closeAllPopups}
						onEscClose={handleClick}
						onDeleteCard={handleDeleteCardSubmit}
					/>

					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onEscClose={handleClick}
						onAddPlace={handleAddPlaceSubmit}
					/>
				</CurrentUserContext.Provider>
			</div>
		</div>
	);
}

export default App;
