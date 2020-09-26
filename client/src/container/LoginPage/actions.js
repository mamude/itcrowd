import { setToken } from '../../utils/secureLocal'

export function loginRequest(payload) {
  return {
    username: payload.username,
  }
}

export function loginSuccess(payload) {
  setToken(payload.token)
  return {
    username: payload.username,
  }
}

export function loginFailure(payload) {
  return {
    payload,
  }
}
