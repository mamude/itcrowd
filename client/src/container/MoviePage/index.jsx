import React, { useEffect, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import MainWrapper from '../../components/MainWrapper'
import api from '../../utils/request'

function MoviePage() {
  const [data, setData] = useState({
    movies: [],
    current_page: 0,
    total_pages: 0,
    total_count: 0,
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50)

  useEffect(() => {
    async function getMovies() {
      await api.get('/movies').then(response => {
        setData(response.data)
      })
    }
    getMovies()
  }, [])

  const handleChangePage = (event, newPage) => {
    async function getPeople() {
      await api.get(`/movies?page=${newPage + 1}`).then(response => {
        setData(response.data)
        setPage(newPage)
      })
    }
    getPeople()
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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
      <TablePagination
        count={data.total_count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        component="div"
      />
    </MainWrapper>
  )
}

export default MoviePage
