import React, { useState } from 'react'
import * as yup from 'yup'
import { Button, CircularProgress, Snackbar } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import { useHistory, useParams } from 'react-router-dom'
import { getToken } from '../../utils/secureLocal'
import { UserConsumer } from '../LoginPage/context'
import MainWrapper from '../../components/MainWrapper'
import api from '../../utils/request'

function AddPersonPage() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const { id, type } = useParams()
  const history = useHistory()

  const initialValues = {
    first_name: '',
    last_name: '',
    aliases: '',
  }

  const schema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
  })

  const savePerson = async values => {
    const token = getToken()
    await api
      .post(`/movies/${id}/people/${type}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setOpen(true)
        setMessage(response.data.message)
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

  return (
    <UserConsumer>
      <MainWrapper title={`Add ${type}`}>
        <Snackbar
          open={open}
          message={message}
          onClose={() => history.push(`/movies/${id}`)}
        />
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            await savePerson(values)
            resetForm()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="first_name"
                label="First name"
                margin="normal"
                fullWidth
                component={TextField}
              />
              <Field
                name="last_name"
                label="Last name"
                margin="normal"
                fullWidth
                component={TextField}
              />
              <Field
                name="aliases"
                label="Aliases"
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

export default AddPersonPage
