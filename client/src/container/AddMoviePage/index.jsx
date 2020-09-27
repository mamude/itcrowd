import React, { useState } from 'react'
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import { Button, CircularProgress, Snackbar } from '@material-ui/core'
import { UserConsumer } from '../LoginPage/context'
import MainWrapper from '../../components/MainWrapper'
import api from '../../utils/request'
import { getToken } from '../../utils/secureLocal'

function AddMoviePage() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()

  const initialValues = {
    title: '',
    release_year: '',
  }

  const schema = yup.object({
    title: yup.string().required(),
    release_year: yup.string().required().min(4).max(4),
  })

  const saveMovie = async values => {
    const token = getToken()
    await api
      .post('/movies', values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setOpen(true)
        setMessage(response.data.message)
      })
      .catch(err => {
        setOpen(true)
        setMessage(err.response.data.error)
      })
  }

  return (
    <UserConsumer>
      <MainWrapper title="Add Movie">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          message={message}
          onClose={() => setOpen(false)}
        />

        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            await saveMovie(values)
            resetForm()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="title"
                label="Title"
                margin="normal"
                fullWidth
                component={TextField}
              />
              <Field
                name="release_year"
                label="Release Year"
                margin="normal"
                fullWidth
                component={TextField}
              />
              <Button
                startIcon={isSubmitting ? <CircularProgress /> : null}
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </MainWrapper>
    </UserConsumer>
  )
}

export default AddMoviePage
