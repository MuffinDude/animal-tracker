import React from 'react'

import CreateAnimalForm from './createAnimalForm'
import SearchAnimalForm from './searchAnimalForm'

import logo from './logo.svg'
import './App.css'

const App = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <CreateAnimalForm />
    <p>Time to search: </p>
    <SearchAnimalForm />
  </div>
)


export default App
