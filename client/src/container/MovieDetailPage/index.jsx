import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Typography,
} from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../utils/request'
import MainWrapper from '../../components/MainWrapper/index'
import { Title } from '../../components/MainWrapper/styles'
import { DividerHr } from './styles'
import PeopleList from './people'

function MovieDetailPage() {
  const [data, setData] = useState({
    movie: [],
    actors: [],
    producers: [],
    directors: [],
  })
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    async function getMovie() {
      await api
        .get(`/movies/${id}`)
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
    getMovie()
  }, [])

  return (
    <>
      <MainWrapper title="Movie Detail">
        <Snackbar
          open={open}
          message={message}
          onClose={() => history.push('/')}
        />
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/movies/${id}/actor`)}
              >
                Add Actor
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/movies/${id}/producer`)}
              >
                Add Producer
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/movies/${id}/director`)}
              >
                Add Director
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  history.push(`/movies/${id}/edit`)
                }}
              >
                Edit Movie
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  history.push(`/movies/${id}/delete`)
                }}
              >
                Delete Movie
              </Button>
            </Grid>
          </Grid>
        </Box>
        <DividerHr />
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography variant="h4" color="textSecondary" component="p">
                Title
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.movie.title}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h4" color="textSecondary" component="p">
                Release Year
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.movie.release_year}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h4" color="textSecondary" component="p">
                Release Year (Roman Number)
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.movie.roman_numerals}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </MainWrapper>
      <Card variant="outlined">
        <CardContent>
          <Title variant="h3">People</Title>
          <Box flexGrow={1}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Typography variant="h4" color="textSecondary" component="p">
                  Actors / Actress
                </Typography>
                <PeopleList data={data.actors} />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" color="textSecondary" component="p">
                  Producers
                </Typography>
                <PeopleList data={data.producers} />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" color="textSecondary" component="p">
                  Directors
                </Typography>
                <PeopleList data={data.directors} />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default MovieDetailPage
