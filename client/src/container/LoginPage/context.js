import React, { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
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

export const UserConsumer = ({ children }) => {
  return (
    <UserContext.Consumer>
      {context => {
        if (context[0].username === '') {
          return <Redirect to="/login" />
        }
        return children
      }}
    </UserContext.Consumer>
  )
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

UserConsumer.propTypes = {
  children: PropTypes.node.isRequired,
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserProvider
