import React from 'react'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import PersonIcon from '@material-ui/icons/Person'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Link } from 'react-router-dom'

function PeopleList({ data }) {
  return (
    <List>
      {data.map(row => (
        <ListItem key={row.id}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${row.last_name} ${row.first_name}`}
            secondary={`${row.aliases}`}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" component={Link} to={`/people/${row.id}`}>
              <VisibilityIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

PeopleList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      last_name: PropTypes.string,
      first_name: PropTypes.string,
      aliases: PropTypes.string,
    })
  ).isRequired,
}

export default PeopleList
