import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CreateAnimalForm from './createAnimalForm'
import SearchAnimalForm from './searchAnimalForm'

import './App.css'

const App = () => (
  <Router>
    <div className="App">
      <Route path="/new" component={CreateAnimalForm} />
    </div>
<<<<<<< HEAD
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <CreateAnimalForm />
    <p>Time to search: </p>
    <SearchAnimalForm />
  </div>
=======
  </Router>
>>>>>>> origin/master
)


export default App
