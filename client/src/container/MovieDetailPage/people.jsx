import React from 'react'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PropTypes from 'prop-types'

function PeopleList({ data }) {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
    </List>
  )
}

PeopleList.propTypes = {
  data: PropTypes.element.isRequired,
}

export default PeopleList
