import React from 'react'
import { Drawer, List, ListItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ButtonMenu, DrawerContainer, Span, useStyles } from './styles'

function SideMenu() {
  const classes = useStyles()
  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <DrawerContainer>
        <List className={classes.listMargin}>
          <ListItem disableGutters>
            <ButtonMenu component={Link} to="/">
              <Span>Movies</Span>
            </ButtonMenu>
          </ListItem>
          <ListItem disableGutters>
            <ButtonMenu component={Link} to="/people">
              <Span>People</Span>
            </ButtonMenu>
          </ListItem>
          <ListItem disableGutters>
            <ButtonMenu component={Link} to="/movies/add">
              <Span>Add Movie</Span>
            </ButtonMenu>
          </ListItem>
          <ListItem disableGutters>
            <ButtonMenu component={Link} to="/people/add">
              <Span>Add Person</Span>
            </ButtonMenu>
          </ListItem>
        </List>
      </DrawerContainer>
    </Drawer>
  )
}

export default SideMenu
