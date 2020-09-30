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
import { useHistory, useParams } from 'react-router-dom'
import { getToken } from '../../utils/secureLocal'
import { UserConsumer } from '../LoginPage/context'
import MainWrapper from '../../components/MainWrapper'
import api from '../../utils/request'

function EditPersonPage() {
  const [data, setData] = useState({ person: [] })
  const [countries, setCountries] = useState([])
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    async function getPerson() {
      // get person info
      await api
        .get(`/people/${id}`)
        .then(response => {
          setData(response.data)
        })
        .catch(err => {
          setOpen(true)
          if (err.response.status === 404) {
            setMessage(err.response.statusText)
          } else {
            setMessage(err.response.data.error)
          }
        })
      // get list of countries
      await api.get('/countries').then(response => {
        setCountries(response.data)
      })
    }
    getPerson()
  }, [])

  const initialValues = {
    first_name: data.person.first_name || '',
    last_name: data.person.last_name || '',
    aliases: data.person.aliases || '',
    age: data.person.age || '',
    country: data.person.country || '',
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
      .put(`/people/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        history.push(`/people/${id}`)
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
      <Snackbar
        open={open}
        message={message}
        onClose={() => history.push('/people')}
      />
      <MainWrapper
        title={`Edit Person - ${data.person.first_name} ${data.person.last_name}`}
      >
        <Formik
          enableReinitialize
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async values => {
            await savePerson(values)
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

export default EditPersonPage
