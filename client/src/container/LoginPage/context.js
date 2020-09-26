import React, { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import * as constants from './constants'
import { loginRequest, loginSuccess } from './actions'
import { getUserInfo, setUserInfo } from '../../utils/secureLocal'

const initialState = { username: '' }

export const UserContext = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return loginRequest(initialState)
    case constants.LOGIN_SUCCESS:
      return loginSuccess(action.payload)
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const UserProvider = ({ children }) => {
  const localState = getUserInfo() || ''

  const [state, dispatch] = useReducer(reducer, localState || initialState)

  useEffect(() => {
    setUserInfo(state)
  }, [state])

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserProvider
