import React from 'react'
import { AppBar, Box, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ToolbarStyled, useStyles } from './styles'

function TopBar() {
  const classes = useStyles()
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
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </ToolbarStyled>
    </AppBar>
  )
}

export default TopBar
