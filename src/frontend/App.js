import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CreateAnimalForm from './createAnimalForm'

import './App.css'

const App = () => (
  <Router>
    <div className="App">
      <Route path="/new" component={CreateAnimalForm} />
    </div>
  </Router>
)


export default App
