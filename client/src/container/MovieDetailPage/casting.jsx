/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
  Snackbar,
} from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import { getToken } from '../../utils/secureLocal'
import api from '../../utils/request'
import { CardPerson } from './styles'

// eslint-disable-next-line react/prop-types
function Casting({ data }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const { id } = useParams()

  const handleRemovePerson = async values => {
    const token = getToken()
    const body = { movie: { person: values } }
    await api
      .delete(`/movies/${id}/remove_person`, {
        headers: { Authorization: `Bearer ${token}` },
        data: body,
      })
      .catch(err => {
        setOpen(true)
        setMessage(err.response.data.message)
      })
  }

  return (
    <Box flexGrow={1}>
      <Snackbar open={open} message={message} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={10}>
            {data.casting.map(row => (
              <Grid key={row.person.id} item>
                <CardPerson>
                  <CardContent>
                    <Box textAlign="center">
                      <Typography variant="h4">
                        {row.person.first_name} {row.person.last_name}
                      </Typography>
                      <Typography component="div" color="textSecondary">
                        <Box fontStyle="italic" m={1}>
                          Age: {row.person.age}
                        </Box>
                        <Box fontStyle="italic" m={1}>
                          Country: {row.person.country}
                        </Box>
                        <Box fontStyle="italic" m={1}>
                          Roles:{' '}
                          {row.roles.map(role => (
                            <Chip
                              key={role.id}
                              variant="outlined"
                              size="small"
                              label={role.name}
                            />
                          ))}
                        </Box>
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={Link}
                      to={`/people/${row.person.id}`}
                    >
                      Person Info
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleRemovePerson(row.person.id)}
                    >
                      Remove Person
                    </Button>
                  </CardActions>
                </CardPerson>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Casting
