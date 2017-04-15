import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ModificationForm from '../../modification'
import LocationForm from './LocationForm'
import { modifyAnimal } from '../../actions'
import { submitLocation, getLocations, deleteLocation, modifyLocation } from '../locations/actions'
import Locations from '../locations'

class Animal extends Component {
  constructor(props) {
    super(props)
    this.toggleOpenState = this.toggleOpenState.bind(this)
    this.state = {
      isOpen: false,
      isAddingOrModifyingLocation: false,
    }
  }

  componentDidMount() {
    this.props.getLocations(this.props.animal.id)
  }

  componentWillReceiveProps(nextProps) {
    const { isModifyingAnimal } = this.props
    if (isModifyingAnimal && !nextProps.isModifyingAnimal) {
      if (nextProps.error) {
        this.setState({ isOpen: true })
      } else {
        this.setState({ isOpen: false })
      }
    }
  }

  toggleOpenState() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { animal, locations } = this.props
    const { isOpen, isAddingOrModifyingLocation } = this.state
    return (
      <div className="card p-3 mb-3">
        {isOpen ? (
          <ModificationForm
            canModifyName={false}
            animalName={animal.name}
            animalSpecies={animal.species_name}
            animalId={animal.id}
            onSubmit={this.props.modifyAnimal}
            onCancel={this.toggleOpenState}
          />
        ) : (
          <div>
            <div>
              <h4 className="card-title">{animal.name}</h4>
              <p>Species: {animal.species_name}</p>
            </div>
            {locations && locations[animal.id] ? (
              <Locations
                locations={locations[animal.id]}
                submitLocation={(timeStamp, location, locationId) => {
                  console.log(timeStamp, location, locationId)
                  this.props.modifyLocation(animal.id, locationId, timeStamp, location)
                }}
                deleteLocation={locationId => this.props.deleteLocation(animal.id, locationId)}
              />
            ) : ''}
            {isAddingOrModifyingLocation ? (
              <LocationForm
                submitLocation={(timeStamp, location) => (
                  this.props.submitLocation(animal.id, timeStamp, location)
                )}
                cancel={() => (
                  this.setState({ isAddingOrModifyingLocation: !isAddingOrModifyingLocation })
                )}
              />
            ) : ''}
            <div className="d-flex justify-content-end">
              {!isAddingOrModifyingLocation ? (
                <button
                  className="btn btn-primary mr-3"
                  type="button"
                  onClick={() => (
                    this.setState({ isAddingOrModifyingLocation: !isAddingOrModifyingLocation })
                  )}
                >
                  Add location
                </button>
              ) : ''}
              <button
                className={`btn btn-${isOpen ? 'danger' : 'info'}`}
                type="button"
                onClick={this.toggleOpenState}
              >
                {`${isOpen ? 'Cancel' : 'Modify'}`}
              </button>
              <button
                className="btn btn-danger ml-3"
                type="button"
                onClick={() => this.props.removeAnimal(animal.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

Animal.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    species_name: PropTypes.string.isRequired,
  }).isRequired,
  locations: PropTypes.object, // eslint-disable-line
  removeAnimal: PropTypes.func.isRequired,
  modifyAnimal: PropTypes.func.isRequired,
  isModifyingAnimal: PropTypes.bool.isRequired,
  submitLocation: PropTypes.func.isRequired,
  getLocations: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  modifyLocation: PropTypes.func.isRequired,
}

Animal.defaultProps = {
  locations: null,
}

const mapDispatchToProps = dispatch => ({
  modifyAnimal: animal => dispatch(modifyAnimal(animal)),
  deleteLocation: (animalId, locationId) => dispatch(deleteLocation(animalId, locationId)),
  submitLocation: (animalId, timeStamp, location) => (
    dispatch(submitLocation(animalId, timeStamp, location))
  ),
  modifyLocation: (animalId, locationId, timeStamp, location) => (
    dispatch(modifyLocation(animalId, locationId, timeStamp, location))
  ),
  getLocations: id => dispatch(getLocations(id)),
})

const mapStoreToProps = store => ({
  isModifyingAnimal: store.animals.isModifyingAnimal,
  locations: store.locations.locations,
})

export default connect(mapStoreToProps, mapDispatchToProps)(Animal)
