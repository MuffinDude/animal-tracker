import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ModificationForm from '../modification'
import { actions } from '../'

const CreateAnimalForm = ({ createNewAnimal }) => (
  <ModificationForm canModifyName onSubmit={createNewAnimal} />
)

CreateAnimalForm.propTypes = {
  createNewAnimal: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  createNewAnimal: animal => dispatch(actions.createNewAnimal(animal)),
})

export default connect(value => value, mapDispatchToProps)(CreateAnimalForm)
