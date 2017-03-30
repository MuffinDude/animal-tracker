import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import CreateAnimalForm from './createAnimalForm'
import SearchAnimalForm from './searchAnimalForm'
import './App.css'

const App = () => (
  <Router>
    <div className="container-fluid py-5">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 col-xl-6 offset-md-3">
          <div className="d-flex justify-content-space-between">
            <h1>Animal Farm</h1>
            <div className="ml-auto">
              <Link className="mr-3" to="/">Home</Link>
              <Link className="" to="/search">Search</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 col-xl-6 offset-md-3">
          <Route exact path="/" component={CreateAnimalForm} />
          <Route path="/search" component={() => (<SearchAnimalForm />)} />
        </div>
      </div>
    </div>
  </Router>
)

export default App
