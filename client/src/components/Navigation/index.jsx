import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../../container/LoginPage'
import LogoutPage from '../../container/LogoutPage'
import PersonPage from '../../container/PersonPage'
import MoviePage from '../../container/MoviePage'
import MovieDetailPage from '../../container/MovieDetailPage'
import AddMoviePage from '../../container/AddMoviePage'
import EditMoviePage from '../../container/EditMoviePage'
import AddPersonPage from '../../container/AddPersonPage'
import PersonDetailPage from '../../container/PersonDetailPage'
import EditPersonPage from '../../container/EditPersonPage'
import DeleteMoviePage from '../../container/DeleteMoviePage'
import DeletePersonPage from '../../container/DeletePersonPage'

function Navigation() {
  return (
    <Switch>
      <Route exact path="/" component={MoviePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/logout" component={LogoutPage} />
      <Route exact path="/people" component={PersonPage} />
      <Route exact path="/people/:id" component={PersonDetailPage} />
      <Route exact path="/people/:id/edit" component={EditPersonPage} />
      <Route exact path="/people/:id/delete" component={DeletePersonPage} />
      <Route exact path="/movies/add" component={AddMoviePage} />
      <Route exact path="/movies/:id" component={MovieDetailPage} />
      <Route exact path="/movies/:id/edit" component={EditMoviePage} />
      <Route exact path="/movies/:id/delete" component={DeleteMoviePage} />
      <Route exact path="/movies/:id/:type" component={AddPersonPage} />
    </Switch>
  )
}

export default Navigation
