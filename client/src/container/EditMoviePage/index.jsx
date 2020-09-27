import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import { Button, CircularProgress } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { UserConsumer } from '../LoginPage/context'
import MainWrapper from '../../components/MainWrapper'
import api from '../../utils/request'
import { getToken } from '../../utils/secureLocal'

function EditMoviePage() {
  const [data, setData] = useState({ movie: [] })
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    async function getMovie() {
      await api.get(`/movies/${id}`).then(response => {
        setData(response.data)
      })
    }
    getMovie()
  }, [])

  const initialValues = {
    title: data.movie.title || '',
    release_year: data.movie.release_year || '',
  }

  const schema = yup.object({
    title: yup.string().required(),
    release_year: yup.string().required().min(4).max(4),
  })

  const saveMovie = async values => {
    const token = getToken()
    await api
      .put(`/movies/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        history.push(`/movies/${id}`)
      })
  }

  return (
    <UserConsumer>
      <MainWrapper title={`Edit Movie - ${data.movie.title}`}>
        <Formik
          enableReinitialize
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async values => {
            await saveMovie(values)
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

export default EditMoviePage
