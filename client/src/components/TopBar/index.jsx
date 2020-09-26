import React from 'react'
import { AppBar, Box, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Logo, ToolbarStyled } from './styles'
import LogoImg from '../../assets/logo.png'

function TopBar() {
  return (
    <AppBar color="primary" position="fixed" elevation={0}>
      <ToolbarStyled>
        <Logo src={LogoImg} alt="Movies Database App" />
        <Box flexGrow={1} />
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </ToolbarStyled>
    </AppBar>
  )
}

export default TopBar
