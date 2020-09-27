import React, { useEffect, useState } from 'react'
import {
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import MainWrapper from '../../components/MainWrapper'
import api from '../../utils/request'
import WrapperDiv from './styles'

function PersonPage() {
  const [data, setData] = useState({
    people: [],
    current_page: 0,
    total_pages: 0,
    total_count: 0,
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50)

  useEffect(() => {
    async function getPeople() {
      await api.get('/people?page=1').then(response => {
        setData(response.data)
      })
    }
    getPeople()
  }, [])

  const handleChangePage = (event, newPage) => {
    async function getPeople() {
      await api.get(`/people?page=${newPage + 1}`).then(response => {
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

  const handleChangeSearch = event => {
    async function searchPeople() {
      const body = { person: { name: event.target.value } }
      await api.post('/people/search', body).then(response => {
        setData(response.data)
      })
    }
    searchPeople()
  }

  return (
    <MainWrapper title="People">
      <WrapperDiv>
        <TextField
          label="Search"
          fullWidth
          onChange={handleChangeSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </WrapperDiv>
      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell align="right">Aliases</TableCell>
              <TableCell align="right">Person Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.people.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>
                  <Link to={`/people/${row.id}`}>{row.first_name}</Link>
                </TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell align="right">{row.aliases}</TableCell>
                <TableCell align="right">{row.person_type}</TableCell>
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

export default PersonPage
