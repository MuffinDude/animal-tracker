import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import CreateAnimalForm from './animals/create'
import SearchAnimalForm from './animals/search'
import './App.css'

const App = () => (
  <Router>
    <div className="container-fluid py-5">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
          <div className="d-flex justify-content-space-between">
            <h1>Animal Farm</h1>
            <div className="ml-auto">
              <Link className="mr-3" to="/">Home</Link>
              <Link className="mr-3" to="/search">Search</Link>
              <Link className="" to="/new">New</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
          <Route path="/new" component={CreateAnimalForm} />
          <Route path="/search" component={SearchAnimalForm} />
        </div>
      </div>
    </div>
  </Router>
)

export default connect(value => value)(App)
