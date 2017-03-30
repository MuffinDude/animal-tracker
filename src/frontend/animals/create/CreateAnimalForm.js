import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Select from '../select'
import { getAllSpecies } from '../actions'
import './CreateAnimalForm.css'

class CreateAnimalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSpecies: '',
    }
  }

  componentDidMount() {
    if (!this.props.species) this.props.getAllSpecies()
  }

  render() {
    const { species } = this.props
    const { selectedSpecies } = this.state
    return (
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
            options={species ? species.map(speciesSingular => speciesSingular.name) : []}
            value={!selectedSpecies && species ? species[0].name : selectedSpecies}
            onChange={value => this.setState({ selectedSpecies: value })}
          />
        </form>
      </div>
    )
  }
}

CreateAnimalForm.propTypes = {
  getAllSpecies: PropTypes.func.isRequired,
  species: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
}

CreateAnimalForm.defaultProps = {
  species: null,
}

const mapStoreToProps = store => ({
  species: store.animals.species,
})

const mapDispatchToProps = dispatch => ({
  getAllSpecies: () => dispatch(getAllSpecies()),
})


export default connect(mapStoreToProps, mapDispatchToProps)(CreateAnimalForm)
