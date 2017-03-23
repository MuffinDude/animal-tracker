import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import CreateAnimalForm from './createAnimalForm'
import './App.css'


const App = () => (
  <Router>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 col-xl-6 offset-md-3">
          <Route path="/new" component={CreateAnimalForm} />
        </div>
      </div>
    </div>
  </Router>
)

export default App
