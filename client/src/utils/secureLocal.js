import SecureLS from 'secure-ls'

const ls = new SecureLS({ encodingType: 'aes' })

export function setToken(token) {
  ls.set('token', token)
}

export function getToken() {
  return ls.get('token')
}

export function setUserInfo(state) {
  ls.set('userInfo', state)
}

export function getUserInfo() {
  return ls.get('userInfo')
}
