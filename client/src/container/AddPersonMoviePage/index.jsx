import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Snackbar,
  TextField,
} from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { Autocomplete } from 'formik-material-ui-lab'
import { useHistory, useParams } from 'react-router-dom'
import MainWrapper from '../../components/MainWrapper'
import { UserConsumer } from '../LoginPage/context'
import api from '../../utils/request'
import { getToken } from '../../utils/secureLocal'

function AddPersonMoviePage() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const [options, setOptions] = useState([])
  const [roles, setRoles] = useState([])
  const [rolesChecked, setRolesChecked] = useState([])
  const [person, setPerson] = useState(null)
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
      const body = { person: { search: inputValue } }
      await api.post('/people/autocomplete', body).then(response => {
        setOptions(response.data.people)
      })
    }

    listRoles()

    if (inputValue === '') {
      setOptions(person ? [person] : [])
      return undefined
    }

    searchPeople()
  }, [person, inputValue])

  async function savePerson() {
    if (rolesChecked.length === 0) {
      throw new Error('Select a least one Role')
    }

    const token = getToken()
    const roleArray = Object.keys(rolesChecked)
    const body = { movie: { person: person.id, role: roleArray } }

    await api
      .post(`/movies/${id}/add_person`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        history.push(`/movies/${id}`)
      })
  }

  const handleRole = event => {
    setRolesChecked({
      ...rolesChecked,
      [event.target.value]: event.target.checked,
    })
  }

  const initialValues = {
    person: '',
    roles: [],
  }

  return (
    <UserConsumer>
      <MainWrapper title="Add Person to Movie">
        <Snackbar open={open} message={message} />
        <Formik
          initialValues={initialValues}
          onSubmit={async () => {
            await savePerson().catch(err => {
              setOpen(true)
              setMessage(err.message)
            })
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="person"
                component={Autocomplete}
                includeInputInList
                filterSelectedOptions
                value={person}
                onChange={(event, newValue) => {
                  setOptions(newValue ? [newValue, ...options] : options)
                  setPerson(newValue)
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
                <FormControlLabel
                  key={role.id}
                  control={
                    <Checkbox
                      name={role.name}
                      value={role.id}
                      onChange={handleRole}
                    />
                  }
                  label={role.name}
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
