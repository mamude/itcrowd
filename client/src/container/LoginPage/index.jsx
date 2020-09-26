import React, { useContext, useState } from 'react'
import * as yup from 'yup'
import { CircularProgress, Container, Grid, Snackbar } from '@material-ui/core'
import { Field, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import { useHistory } from 'react-router-dom'
import { Wrapper, FormStyled, Submit } from './style'
import { LOGIN_SUCCESS } from './constants'
import { UserContext } from './context'
import api from '../../utils/request'

function LoginPage() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const [state, dispatch] = useContext(UserContext) // eslint-disable-line no-unused-vars
  const history = useHistory()
  const initialValues = {
    username: '',
    password: '',
  }

  const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required().min(5),
  })

  const authentication = async values => {
    await api
      .post('/authentication', values)
      .then(response => {
        const payload = response.data
        dispatch({
          type: LOGIN_SUCCESS,
          payload,
        })
        history.push('/')
      })
      .catch(err => {
        setOpen(true)
        setMessage(err.response.data.error)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Wrapper>
        <Snackbar
          open={open}
          message={message}
          onClose={() => setOpen(false)}
        />
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async values => {
            await authentication(values)
          }}
        >
          {({ isSubmitting }) => (
            <FormStyled autoComplete="off">
              <Field
                name="username"
                label="Username"
                margin="normal"
                fullWidth
                autoFocus
                component={TextField}
              />
              <Field
                name="password"
                type="password"
                label="Password"
                margin="normal"
                fullWidth
                component={TextField}
              />
              <Submit
                startIcon={isSubmitting ? <CircularProgress /> : null}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                Log In
              </Submit>
              <Grid>
                <Grid item xs>
                  Username: admin | Password: admin
                </Grid>
              </Grid>
            </FormStyled>
          )}
        </Formik>
      </Wrapper>
    </Container>
  )
}
export default LoginPage
