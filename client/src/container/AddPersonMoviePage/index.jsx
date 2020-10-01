import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Box, Button, CircularProgress, TextField } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-material-ui'
import { Autocomplete } from 'formik-material-ui-lab'
import { useHistory, useParams } from 'react-router-dom'
import MainWrapper from '../../components/MainWrapper'
import { UserConsumer } from '../LoginPage/context'
import api from '../../utils/request'
import { getToken } from '../../utils/secureLocal'

function AddPersonMoviePage() {
  const [options, setOptions] = useState([])
  const [roles, setRoles] = useState([])
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    async function listRoles() {
      await api.get('/roles').then(response => {
        setRoles(response.data)
      })
    }
    async function searchPeople() {
      const body = { person: { search: value } }
      await api.post('/people/autocomplete', body).then(response => {
        setOptions(response.data.people)
      })
    }

    listRoles()

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    searchPeople()
  }, [value, inputValue])

  const initialValues = {
    person: '',
    role: '',
  }

  const schema = yup.object({
    role: yup.string().required(),
  })

  async function savePerson() {
    const token = getToken()
    const body = { movie: { person: 1, role: [1, 2, 3] } }
    await api.post(`/movies/${id}/add_person`, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  return (
    <UserConsumer>
      <MainWrapper title="Add Person to Movie">
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async ({ resetForm }) => {
            await savePerson()
            resetForm()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="person"
                component={Autocomplete}
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(event, newValue) => {
                  setOptions(newValue ? [newValue, ...options] : options)
                  setValue(newValue)
                }}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue)
                }}
                options={options}
                // eslint-disable-next-line no-shadow
                getOptionSelected={(option, value) =>
                  option.first_name === value.first_name
                }
                getOptionLabel={option =>
                  option.first_name ? option.first_name : ''
                }
                style={{ paddingBottom: '20px' }}
                fullWidth
                renderOption={option => (
                  <>
                    {option.first_name} {option.last_name}
                  </>
                )}
                renderInput={params => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    required
                    label="Search person..."
                    variant="outlined"
                  />
                )}
              />
              {roles.map(role => (
                <Field
                  fullWidth
                  margin="normal"
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name={role.name}
                  Label={{ label: role.name }}
                />
              ))}
              <Box flexGrow={1} />
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
