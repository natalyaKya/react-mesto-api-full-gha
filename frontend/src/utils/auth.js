class Auth {
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

  register({ email, password }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkStatus(res));
  }
  authorization({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkStatus(res));
  }
  checkToken() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    }).then((res) => this._checkStatus(res));
  }
  clearCookie() {
    return fetch(`${this.baseUrl}/signout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    }).then((res) => this._checkStatus(res))
  }
}

export const auth = new Auth({
  baseUrl: "https://api.mesto.natalyakya.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
});
