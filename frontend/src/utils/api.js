class Api {
	constructor(config) {
		this._url = config.baseUrl;
		this._headers = config.headers;
	}

	_getResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getInitialCards() {
		return fetch(`${this._url}/cards`, {
			headers: this._headers
		}).then(this._getResponse);
	}

	setNewCard({ place, link }) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: place,
				link: link
			})
		}).then(this._getResponse);
	}

	deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		}).then(this._getResponse);
	}

	setLikeCard(cardId) {
		return fetch(`${this._url}/cards/likes/${cardId}`, {
			method: 'PUT',
			headers: this._headers
		}).then(this._getResponse);
	}

	deleteLikeCard(cardId) {
		return fetch(`${this._url}/cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		}).then(this._getResponse);
	}

	getUser() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers
		}).then(this._getResponse);
	}

	setUser({ name, about }) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				about: about
			})
		}).then(this._getResponse);
	}

	setUserAvatar({ avatar }) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatar
			})
		}).then(this._getResponse);
	}
}

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
	headers: {
		authorization: 'd4ad1f5c-6d3d-4923-9666-f0281ec3ce2e',
		'Content-Type': 'application/json'
	}
});

export default api;
