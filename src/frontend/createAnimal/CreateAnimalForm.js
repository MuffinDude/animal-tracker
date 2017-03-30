import React from 'react'

import Select from './select'

import './CreateAnimalForm.css'

const CreateAnimalForm = () => (
  <div>
    <form>
      <div className="form-group">
        <label htmlFor="animalNameInput">Animal name</label>
        <input
          type="text"
          className="form-control"
          id="animalNameInput"
          aria-describedby="emailHelp"
          placeholder="name"
        />
        <small id="animalNameInput" className="form-text text-muted">
          We will never share your animal with anyone else.
        </small>
      </div>
      <Select
        options={['soku', 'poku', 'loku']}
        value={'soku'}
        onChange={asd => console.log(asd)}
      />
    </form>
  </div>
)

export default CreateAnimalForm
