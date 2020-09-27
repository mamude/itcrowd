import React, { useContext, useEffect } from 'react'
import { Container, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import ContainerDiv from './styles'
import { UserContext } from '../LoginPage/context'
import { LOGOUT_SUCCESS } from '../LoginPage/constants'
import { getToken } from '../../utils/secureLocal'
import api from '../../utils/request'

function LogoutPage() {
  const history = useHistory()
  const [state, dispatch] = useContext(UserContext) // eslint-disable-line no-unused-vars

  useEffect(() => {
    async function logoutServer() {
      const token = getToken()
      await api.delete(`/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    }

    logoutServer()
    const timer = setTimeout(() => {
      dispatch({
        type: LOGOUT_SUCCESS,
      })
      history.push('/')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <ContainerDiv>
        <Typography variant="h2">Logout...</Typography>
      </ContainerDiv>
    </Container>
  )
}

export default LogoutPage
