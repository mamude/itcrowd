import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
} from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { Select, TextField } from 'formik-material-ui'
import { useHistory } from 'react-router-dom'
import { getToken } from '../../utils/secureLocal'
import { UserConsumer } from '../LoginPage/context'
import MainWrapper from '../../components/MainWrapper'
import api from '../../utils/request'

function AddPersonPage() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const [countries, setCountries] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function getCountries() {
      // get list of countries
      await api.get('/countries').then(response => {
        setCountries(response.data)
      })
    }
    getCountries()
  }, [])

  const initialValues = {
    first_name: '',
    last_name: '',
    aliases: '',
    age: '',
    country: '',
  }

  const schema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    age: yup.number().max(70).required(),
    country: yup.string().required(),
  })

  const savePerson = async values => {
    const token = getToken()
    await api
      .post('/people', values, {
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
      <MainWrapper title="Add Person">
        <Snackbar
          open={open}
          message={message}
          onClose={() => history.push('/people')}
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
                name="age"
                label="Age"
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
              <FormControl margin="normal" fullWidth variant="outlined">
                <InputLabel htmlFor="country">Country</InputLabel>
                <Field
                  name="country"
                  label="Country"
                  inputProps={{
                    id: 'country',
                  }}
                  component={Select}
                >
                  {countries.map(country => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

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
