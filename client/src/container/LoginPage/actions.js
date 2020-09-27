import { clearToken, setToken } from '../../utils/secureLocal'

export function loginSuccess(payload) {
  setToken(payload.token)
  return {
    isLogged: true,
    username: payload.username,
  }
}

export function logoutSuccess(payload) {
  clearToken()
  return payload
}
