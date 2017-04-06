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
      sightingTime: null,
    }
  }

  componentWillMount() {
    if (!this.props.species) this.props.getAllSpecies()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selectedSpecies && nextProps.species) {
      this.setState({ selectedSpecies: nextProps.species[0].name })
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
      this.setState({ timeError: true })
    } else {
      this.setState({ timeError: false, sightingTime: timeInMilliseconds })
    }
  }

  onAnimalNameChange(event) {
    const animalNameError = event.target.value === ''
    this.setState({ animalName: event.target.value, animalNameError })
  }

  onAnimalLocationChange(event) {
    const animalLocationError = event.target.value === ''
    this.setState({ animalLocation: event.target.value, animalLocationError })
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.onSubmit({
      name: this.state.animalName,
      species: this.state.selectedSpecies,
      location: this.state.animalLocation,
      time: this.state.sightingTime,
    })
  }

  render() {
    const { species } = this.props
    const {
      selectedSpecies,
      timeError,
      animalName,
      animalNameError,
      animalLocation,
      animalLocationError,
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
          <button
            type="submit"
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
}

ModificationForm.defaultProps = {
  species: null,
}

const mapStoreToProps = store => ({
  species: store.animals.species,
})

const mapDispatchToProps = dispatch => ({
  getAllSpecies: () => dispatch(getAllSpecies()),
})


export default connect(mapStoreToProps, mapDispatchToProps)(ModificationForm)
