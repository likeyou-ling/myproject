/**
 * operate token
 */

const TOKEN = "user_token";
const _setToken = (token) => {
  window.localStorage.setItem(TOKEN, token);
};

const _getToken = () => window.localStorage.getItem(TOKEN);

const _removeToken = () => {
  window.localStorage.removeItem(TOKEN);
};

export { _setToken, _getToken, _removeToken };
