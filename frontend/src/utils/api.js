class Api {
  constructor(options) {
    this.options = options;
    this.baseUrl = this.options.baseUrl;
    this.headers = this.options.headers;
  }
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  }
  setUserInfoApi(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({ name, about }),
    }).then(this._checkStatus);
  }
  getNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkStatus(res));
  }
  addLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  }
  removeLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  }
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  }
  changeAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkStatus(res));
  }
}

export const api = new Api({
  baseUrl: "https://api.mesto.natalyakya.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
});
