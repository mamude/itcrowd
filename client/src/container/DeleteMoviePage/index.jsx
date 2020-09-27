import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { UserConsumer } from '../LoginPage/context'
import { getToken } from '../../utils/secureLocal'
import api from '../../utils/request'

function DeleteMoviePage() {
  const history = useHistory()
  const { id } = useParams()

  const deleteMovie = async values => {
    const token = getToken()
    await api
      .delete(`/movies/${id}`, {
        data: values,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        history.push('/')
      })
  }
  return (
    <UserConsumer>
      <Dialog open aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Movie</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary">Cancel</Button>
          <Button onClick={deleteMovie} color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </UserConsumer>
  )
}

export default DeleteMoviePage
