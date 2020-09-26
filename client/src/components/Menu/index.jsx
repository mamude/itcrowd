import { Button, List, ListItem } from '@material-ui/core'
import React from 'react'

function Menu() {
  return (
    <List>
      <ListItem>
        <Button>
          <span>Movies</span>
        </Button>
      </ListItem>
      <ListItem>
        <Button>
          <span>People</span>
        </Button>
      </ListItem>
    </List>
  )
}

export default Menu
