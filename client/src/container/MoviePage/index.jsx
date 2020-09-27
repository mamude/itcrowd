import React, { useEffect, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import MainWrapper from '../../components/MainWrapper'
import api from '../../utils/request'

function MoviePage() {
  const [data, setData] = useState({ movies: [] })

  useEffect(() => {
    async function getMovies() {
      await api.get('/movies').then(response => {
        setData(response.data)
      })
    }
    getMovies()
  }, [])

  return (
    <MainWrapper title="Movies">
      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Ttile</TableCell>
              <TableCell align="right">Release Year</TableCell>
              <TableCell align="right">Release Yarn (Roman Numeral)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.movies.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>
                  <Link to={`/movies/${row.id}`}>{row.title}</Link>
                </TableCell>
                <TableCell align="right">{row.release_year}</TableCell>
                <TableCell align="right">{row.release_year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainWrapper>
  )
}

export default MoviePage
