import React, { useState } from 'react'
import * as yup from 'yup'
import { Button, CircularProgress, Snackbar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import MainWrapper from '../../components/MainWrapper'
import { UserConsumer } from '../LoginPage/context'

function AddPersonMoviePage() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const history = useHistory()

  const initialValues = {
    person: '',
    role: '',
  }

  const schema = yup.object({
    person: yup.number().integer().required(),
    role: yup.number().integer().required(),
  })

  return (
    <UserConsumer>
      <MainWrapper title="Add Person to Movie">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          message={message}
        />
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
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

export default AddPersonMoviePage
