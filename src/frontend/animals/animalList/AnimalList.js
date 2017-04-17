import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllAnimals, removeAnimal } from '../actions'
import Animal from './animal'

class AnimalList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameInput: '',
      speciesInput: '',
      locationInput: '',
    }
  }

  componentDidMount() {
    if (!this.props.animals) this.props.getAllAnimals()
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search by name"
          onChange={event => this.setState({ nameInput: event.target.value.toLowerCase() })}
        />
        <input
          type="text"
          placeholder="Search by species"
          onChange={event => this.setState({ speciesInput: event.target.value.toLowerCase() })}
        />
        <input
          type="text"
          placeholder="Search by location"
          onChange={event => this.setState({ locationInput: event.target.value.toLowerCase() })}
        />
        <div className="py-3">
          {this.props.animals ? this.props.animals
            .filter(animal => animal.name.toLowerCase().includes(this.state.nameInput))
            .filter(animal => animal.species_name.toLowerCase().includes(this.state.speciesInput))
            .map(animal => (
              <Animal
                hasSpeciesFilter={!!this.state.speciesInput.length}
                locationFilter={this.state.locationInput}
                key={animal.id}
                animal={animal}
                removeAnimal={this.props.removeAnimal}
              />
          )) : ''}
        </div>
      </div>
    )
  }
}

AnimalList.propTypes = {
  getAllAnimals: PropTypes.func.isRequired,
  animals: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
  removeAnimal: PropTypes.func.isRequired,
}

AnimalList.defaultProps = {
  animals: null,
}

const mapStoreToProps = store => ({
  animals: store.animals.animals,
})

const mapDispatchToProps = dispatch => ({
  getAllAnimals: () => dispatch(getAllAnimals()),
  removeAnimal: id => dispatch(removeAnimal(id)),
})

export default connect(mapStoreToProps, mapDispatchToProps)(AnimalList)
