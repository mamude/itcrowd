import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../../container/LoginPage'
import PersonPage from '../../container/PersonPage'
import MoviePage from '../../container/MoviePage'
import MovieDetailPage from '../../container/MovieDetailPage'
import AddMoviePage from '../../container/AddMoviePage'
import EditMoviePage from '../../container/EditMoviePage'
import AddPersonPage from '../../container/AddPersonPage'
import DeletePersonPage from '../../container/DeletePersonPage/index'

function Navigation() {
  return (
    <Switch>
      <Route exact path="/" component={MoviePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/people" component={PersonPage} />
      <Route exact path="/movies/add" component={AddMoviePage} />
      <Route exact path="/movies/:id" component={MovieDetailPage} />
      <Route exact path="/movies/:id/edit" component={EditMoviePage} />
      <Route exact path="/movies/:id/delete" component={DeletePersonPage} />
      <Route exact path="/movies/:id/:type" component={AddPersonPage} />
    </Switch>
  )
}

export default Navigation
