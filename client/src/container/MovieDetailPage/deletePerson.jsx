import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

import { useHistory, useParams } from 'react-router-dom'
import { getToken } from '../../utils/secureLocal'
import api from '../../utils/request'
import { UserConsumer } from '../LoginPage/context'

function DeletePerson({ open, title, close }) {
  const history = useHistory()
  const { id } = useParams()

  const deletePerson = async values => {
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
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Movie - {title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePerson} color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </UserConsumer>
  )
}

DeletePerson.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default DeletePerson
