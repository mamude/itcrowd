/* eslint-disable react/prop-types */
import React from 'react'
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { CardPerson } from './styles'

// eslint-disable-next-line react/prop-types
function Casting({ data }) {
  return (
    <Box flexGrow={1}>
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
