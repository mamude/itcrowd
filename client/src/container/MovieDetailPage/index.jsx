import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import api from '../../utils/request'
import MainWrapper from '../../components/MainWrapper/index'
import { Title } from '../../components/MainWrapper/styles'
import PeopleList from './people'

function MovieDetailPage() {
  const [data, setData] = useState({
    movie: [],
    actors: [],
    producers: [],
    directors: [],
  })
  const { id } = useParams()

  useEffect(() => {
    async function getMovie() {
      await api.get(`/movies/${id}`).then(response => {
        setData(response.data)
      })
    }
    getMovie()
  }, [])

  return (
    <>
      <MainWrapper title="Movie Detail">
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
                {data.movie.release_year}
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
