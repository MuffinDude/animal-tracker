import React, { Component } from 'react'

import ModificationForm from '../modification'

class CreateAnimalForm extends Component { // eslint-disable-line
  render() {
    return (
      <ModificationForm onSubmit={data => console.log(data)} />
    )
  }
}

export default CreateAnimalForm
