import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../../container/LoginPage/index'
import PersonPage from '../../container/PersonPage/index'
import MoviePage from '../../container/MoviePage/index'
import MovieDetailPage from '../../container/MovieDetailPage/index'
import AddMovie from '../../container/AddMovie/index'

function Navigation() {
  return (
    <Switch>
      <Route exact path="/" component={MoviePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/people" component={PersonPage} />
      <Route exact path="/movies/add" component={AddMovie} />
      <Route exact path="/movies/:id" component={MovieDetailPage} />
    </Switch>
  )
}

export default Navigation
