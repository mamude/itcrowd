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
