import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Select from '../select'
import { getAllSpecies } from '../actions'
import './ModificationForm.css'

class ModificationForm extends Component {
  constructor(props) {
    super(props)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.onAnimalNameChange = this.onAnimalNameChange.bind(this)
    this.onAnimalLocationChange = this.onAnimalLocationChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      selectedSpecies: null,
      timeError: false,
      animalName: '',
      animalNameError: false,
      animalLocation: '',
      animalLocationError: false,
      sightingTime: new Date().toISOString().substr(0, 16),
      submitError: false,
      success: false,
    }
  }

  componentDidMount() {
    if (!this.props.species) this.props.getAllSpecies()
    else this.setState({ selectedSpecies: this.props.species[0].name }) // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selectedSpecies && nextProps.species) {
      this.setState({ selectedSpecies: nextProps.species[0].name, submitError: false })
    }
    if (this.props.isCreatingAnimal && !nextProps.isCreatingAnimal) {
      if (nextProps.error) {
        this.setState({ success: false })
      } else {
        this.setState({ success: true })
      }
    }
  }

  onTimeChange(event) {
    const timeInMilliseconds = new Date(event.target.value).getTime()
    const maxTimeInMilliseconds = Date.now()
    const minTimeInMilliseconds = new Date('2010-01-01T00:00:00').getTime()
    if (isNaN(timeInMilliseconds) ||
      timeInMilliseconds > maxTimeInMilliseconds ||
      timeInMilliseconds < minTimeInMilliseconds
    ) {
      this.setState({ timeError: true, submitError: false, success: false })
    } else {
      this.setState({
        timeError: false,
        sightingTime:
        timeInMilliseconds,
        submitError: false,
        success: false,
      })
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
    const { timeError, animalNameError, animalLocationError } = this.state
    const { animalName, animalLocation, sightingTime } = this.state
    const hasError = timeError || animalNameError || animalLocationError

    if (!hasError && animalName.length && animalLocation.length) {
      this.props.onSubmit({
        name: animalName,
        species: this.state.selectedSpecies,
        location: animalLocation,
        time: sightingTime,
      })
    } else {
      this.setState({ submitError: true })
    }
  }

  render() {
    const { species } = this.props
    const {
      submitError,
      selectedSpecies,
      timeError,
      animalName,
      animalNameError,
      animalLocation,
      animalLocationError,
      success,
    } = this.state
    return (
      <div>
        <form>
          <div className={`form-group ${animalNameError ? 'has-warning' : ''}`}>
            <label className="form-control-label" htmlFor="animalNameInput">Animal name</label>
            <input
              type="text"
              className={`form-control ${animalNameError ? 'has-warning' : ''}`}
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
          <div className={`form-group ${animalLocationError ? 'has-warning' : ''}`}>
            <label className="form-control-label" htmlFor="locationInput">Location</label>
            <input
              type="text"
              className={`form-control ${animalLocationError ? 'has-warning' : ''}`}
              id="locationInput"
              placeholder="Location..."
              value={animalLocation}
              onChange={this.onAnimalLocationChange}
            />
          </div>
          <div className={`form-group ${timeError ? 'has-warning' : ''}`}>
            <label className="form-control-label" htmlFor="timeInput">Date and time</label>
            <input
              type="datetime-local"
              className={`form-control ${timeError ? 'has-warning' : ''}`}
              id="timeInput"
              defaultValue={new Date().toISOString().substr(0, 16)}
              onChange={this.onTimeChange}
            />
          </div>
          {submitError ? (
            <div className="alert alert-warning">
              You have not filled the form
            </div>
          ) : ''}
          {success ? (
            <div className="alert alert-success">
              Created new animal!
            </div>
          ) : ''}
          {this.props.isCreatingAnimal ? (
            <div className="alert alert-info">
              Creating animal...
            </div>
          ) : ''}
          {this.props.error ? (
            <div className="alert alert-danger">
              {this.props.error}
            </div>
          ) : ''}
          <button
            type="submit"
            disabled={submitError}
            className="btn btn-primary"
            onClick={this.onSubmit}
          >
              Submit
            </button>
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
}

ModificationForm.defaultProps = {
  species: null,
  error: null,
}

const mapStoreToProps = store => ({
  species: store.animals.species,
  isCreatingAnimal: store.animals.isCreatingAnimal,
  error: store.animals.error,
})

const mapDispatchToProps = dispatch => ({
  getAllSpecies: () => dispatch(getAllSpecies()),
})


export default connect(mapStoreToProps, mapDispatchToProps)(ModificationForm)
