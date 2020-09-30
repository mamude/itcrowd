import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  Typography,
} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Link, useHistory, useParams } from 'react-router-dom'
import api from '../../utils/request'
import MainWrapper from '../../components/MainWrapper/index'
import { Title } from '../../components/MainWrapper/styles'
import { DividerHr } from '../MovieDetailPage/styles'

function PersonDetailPage() {
  const [data, setData] = useState({
    person: {},
    movies: [],
  })
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    async function getPerson() {
      await api
        .get(`/people/${id}`)
        .then(response => {
          setData(response.data)
        })
        .catch(err => {
          setOpen(true)
          if (err.response.status === 404) {
            setMessage(err.response.statusText)
          } else {
            setMessage(err.response.data.error)
          }
        })
    }
    getPerson()
  }, [])

  return (
    <>
      <MainWrapper title="Person Info">
        <Snackbar
          open={open}
          message={message}
          onClose={() => history.push('/people')}
        />
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  history.push(`/people/${id}/edit`)
                }}
              >
                Edit Person
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  history.push(`/people/${id}/delete`)
                }}
              >
                Delete Person
              </Button>
            </Grid>
          </Grid>
        </Box>
        <DividerHr />
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography variant="h4" color="textSecondary" component="p">
                First Name
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.person.first_name}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h4" color="textSecondary" component="p">
                Last Name
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.person.last_name}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h4" color="textSecondary" component="p">
                Aliases
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.person.aliases}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h4" color="textSecondary" component="p">
                Age
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.person.age}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h4" color="textSecondary" component="p">
                Country
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.person.country}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </MainWrapper>
      <Card variant="outlined">
        <CardContent>
          <Title variant="h3">Movies</Title>
          <Box flexGrow={1}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <List>
                  {data.movies.map(row => (
                    <React.Fragment key={row.movie.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <LocalMoviesIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={row.movie.title}
                          secondary={`Release Year ${row.movie.release_year}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            component={Link}
                            to={`/movies/${row.movie.id}`}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {row.roles.map(role => (
                        <Chip
                          key={role.id}
                          variant="outlined"
                          size="small"
                          label={role.name}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default PersonDetailPage
