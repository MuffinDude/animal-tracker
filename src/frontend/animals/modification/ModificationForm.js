import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Select from '../select'
import { getAllSpecies } from '../actions'
import './ModificationForm.css'

class ModificationForm extends Component {
  constructor(props) {
    super(props)
    this.onAnimalNameChange = this.onAnimalNameChange.bind(this)
    this.onAnimalLocationChange = this.onAnimalLocationChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      selectedSpecies: this.props.animalSpecies,
      animalName: this.props.animalName,
      animalNameError: false,
      animalId: this.props.animalId,
      submitError: false,
      success: false,
    }
  }

  componentDidMount() {
    if (!this.props.species) this.props.getAllSpecies()
    else this.setState({ selectedSpecies: this.props.animalSpecies || this.props.species[0].name }) // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selectedSpecies && nextProps.species) {
      this.setState({ selectedSpecies: nextProps.species[0].name, submitError: false })
    }
    const { isCreatingAnimal, isModifyingAnimal } = this.props
    if ((isCreatingAnimal && !nextProps.isCreatingAnimal) ||
      (isModifyingAnimal && !nextProps.isModifyingAnimal)) {
      if (nextProps.error) {
        this.setState({ success: false })
      } else {
        this.setState({ success: true })
      }
    }
  }

  onAnimalNameChange(event) {
    const animalNameError = event.target.value === ''
    this.setState({
      animalName: event.target.value,
      animalNameError,
      submitError: false,
      success: false,
    })
  }

  onAnimalLocationChange(event) {
    const animalLocationError = event.target.value === ''
    this.setState({
      animalLocation: event.target.value,
      animalLocationError,
      submitError: false,
      success: false,
    })
  }

  onSubmit(event) {
    event.preventDefault()
    this.setState({ success: false })
    const { animalName, animalId, animalNameError } = this.state

    if (!animalNameError && animalName.length) {
      this.props.onSubmit({
        name: animalName,
        species: this.state.selectedSpecies,
        id: animalId,
      })
    } else {
      this.setState({ submitError: true })
    }
  }

  render() {
    const { species } = this.props
    const { submitError, selectedSpecies, animalName, animalNameError, success } = this.state
    return (
      <div>
        <form>
          <div className={`form-group ${animalNameError ? 'has-warning' : ''}`}>
            <label className="form-control-label" htmlFor="animalNameInput">Animal name</label>
            <input
              type="text"
              className={`form-control ${animalNameError ? 'has-warning' : ''}`}
              disabled={!this.props.canModifyName}
              id="animalNameInput"
              placeholder="Name..."
              value={animalName}
              onChange={this.onAnimalNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="animalNameInput">Animal species</label>
            <Select
              options={species ? species.map(speciesSingular => speciesSingular.name) : []}
              value={!selectedSpecies && species ? species[0].name : selectedSpecies}
              onChange={value => this.setState({ selectedSpecies: value })}
            />
          </div>
          {submitError ? (
            <div className="alert alert-warning">You have not filled the form</div>
          ) : ''}
          {success ? (
            <div className="alert alert-success">Created new animal!</div>
          ) : ''}
          {this.props.isCreatingAnimal ? (
            <div className="alert alert-info">Creating animal...</div>
          ) : ''}
          {this.props.error ? (
            <div className="alert alert-danger">{this.props.error}</div>
          ) : ''}
          <div className="d-flex justify-content-end">
            {!this.props.canModifyName ? (
              <button
                type="submit"
                className="btn btn-danger"
                onClick={this.props.onCancel}
              >
                Cancel
              </button>
            ) : ''}
            <button
              type="submit"
              disabled={submitError}
              className="btn btn-success ml-3"
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

ModificationForm.propTypes = {
  getAllSpecies: PropTypes.func.isRequired,
  species: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.number, // eslint-disable-line
  isCreatingAnimal: PropTypes.bool.isRequired,
  isModifyingAnimal: PropTypes.bool.isRequired,
  animalName: PropTypes.string,
  animalId: PropTypes.number,
  animalSpecies: PropTypes.string,
  canModifyName: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
}

ModificationForm.defaultProps = {
  species: null,
  error: null,
  animalName: '',
  animalId: null,
  animalSpecies: null,
  onCancel: null,
}

const mapStoreToProps = store => ({
  species: store.animals.species,
  isCreatingAnimal: store.animals.isCreatingAnimal,
  isModifyingAnimal: store.animals.isModifyingAnimal,
  error: store.animals.error,
})

const mapDispatchToProps = dispatch => ({
  getAllSpecies: () => dispatch(getAllSpecies()),
})


export default connect(mapStoreToProps, mapDispatchToProps)(ModificationForm)
