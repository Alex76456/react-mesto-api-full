class Api {
	constructor(config) {
		this._url = config.baseUrl;
		this._contentType = config.headers['Content-type'];
	}

	_getResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getInitialCards() {
		return fetch(`${this._url}/cards`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}

	setNewCard({ place, link }) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				name: place,
				link: link
			})
		}).then(this._getResponse);
	}

	deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}

	setLikeCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes/`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}

	deleteLikeCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes/`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}

	getUser() {
		return fetch(`${this._url}/users/me`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json'
			}
		}).then(this._getResponse);
	}

	setUser({ name, about }) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				about: about
			})
		}).then(this._getResponse);
	}

	setUserAvatar({ avatar }) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				avatar: avatar
			})
		}).then(this._getResponse);
	}
}

const api = new Api({
	baseUrl: 'https://api.logvenkin.students.nomoredomains.club',
	headers: {
		'Content-type': 'application/json'
		//authorization: `Bearer ${localStorage.getItem('token')}`,
		//authorization: 'd4ad1f5c-6d3d-4923-9666-f0281ec3ce2e',
	}
});

export default api;
