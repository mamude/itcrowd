import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../../container/LoginPage/index'
import PersonPage from '../../container/PersonPage/index'
import MoviePage from '../../container/MoviePage/index'
import MovieDetailPage from '../../container/MovieDetailPage/index'

function Navigation() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/people" component={PersonPage} />
      <Route path="/movies/:id" component={MovieDetailPage} />
      <Route path="/" component={MoviePage} />
    </Switch>
  )
}

export default Navigation
