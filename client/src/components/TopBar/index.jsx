import React, { useContext, useEffect, useState } from 'react'
import { AppBar, Box, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ToolbarStyled, useStyles } from './styles'
import { UserContext } from '../../container/LoginPage/context'

function TopBar() {
  const classes = useStyles()
  const [state, dispatch] = useContext(UserContext) // eslint-disable-line no-unused-vars

  const loginButton = () => {
    return (
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    )
  }

  const logoutButton = () => {
    return (
      <Button color="inherit" component={Link} to="/logout">
        Logout
      </Button>
    )
  }

  return (
    <AppBar
      className={classes.appBar}
      color="primary"
      position="fixed"
      elevation={0}
    >
      <ToolbarStyled>
        <Typography variant="h3">Movies Database</Typography>
        <Box flexGrow={1} />
        {state.isLogged ? logoutButton() : loginButton()}
      </ToolbarStyled>
    </AppBar>
  )
}

export default TopBar
