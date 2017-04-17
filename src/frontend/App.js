import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import CreateAnimalForm from './animals/create'
import AnimalList from './animals/animalList'

const App = () => (
  <Router>
    <div className="container-fluid py-5">
      <div className="row">
        <div className="col-12 col-md-10 offset-md-1 col-xl-6 offset-xl-3">
          <div className="d-flex justify-content-between">
            <h1>Animl</h1>
            <div className="ml-auto">
              <Link className="mr-3" to="/animals">Animals</Link>
              <Link className="" to="/new">New</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-10 offset-md-1 col-xl-6 offset-xl-3">
          <Route exact path="/" render={() => (<Redirect to="/animals" />)} />
          <Route path="/new" component={CreateAnimalForm} />
          <Route path="/animals" component={AnimalList} />
        </div>
      </div>
    </div>
  </Router>
)

export default connect(value => value)(App)
