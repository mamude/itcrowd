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

function PersonPage() {
  const [data, setData] = useState({ people: [] })

  useEffect(() => {
    async function getPeople() {
      await api.get('/people').then(response => {
        setData(response.data)
      })
    }
    getPeople()
  }, [])

  return (
    <MainWrapper title="People">
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
    </MainWrapper>
  )
}

export default PersonPage
