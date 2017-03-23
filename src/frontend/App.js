import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CreateAnimalForm from './createAnimalForm'

import './App.css'

const App = () => (
  <Router>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 col-xl-6 offset-md-3">

        </div>
      </div>
      <Route path="/new" component={CreateAnimalForm} />
    </div>
  </Router>
)

export default App
