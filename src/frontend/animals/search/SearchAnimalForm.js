import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllAnimals, removeAnimal } from '../actions'
import './SearchAnimalForm.css'
import ListItem from './listItem'

class SearchAnimalForm extends Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.state = {
      inputValue: '',
    }
  }

  componentDidMount() {
    if (!this.props.animals) this.props.getAllAnimals()
  }

  onInputChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    return (
      <div>
        <div className="container p-3">
          <input
            type="text"
            placeholder="Search..."
            onChange={event => this.setState({ inputValue: event.target.value.toLowerCase() })}
          />
        </div>
        <div className="container">
          <div>
            {this.props.animals ? this.props.animals
              .filter(animal => animal.name.toLowerCase().includes(this.state.inputValue) ||
                animal.location.toLowerCase().includes(this.state.inputValue) ||
                animal.species_name.toLowerCase().includes(this.state.inputValue) ||
                animal.seen_at.toLowerCase().includes(this.state.inputValue))
              .map(animal => (
                <ListItem
                  key={animal.id}
                  animal={animal}
                  removeAnimal={this.props.removeAnimal}
                />
            )) : ''}
          </div>
        </div>
      </div>
    )
  }
}

SearchAnimalForm.propTypes = {
  getAllAnimals: PropTypes.func.isRequired,
  animals: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
  removeAnimal: PropTypes.func.isRequired,
}

SearchAnimalForm.defaultProps = {
  animals: null,
}

const mapStoreToProps = store => ({
  animals: store.animals.animals,
})

const mapDispatchToProps = dispatch => ({
  getAllAnimals: () => dispatch(getAllAnimals()),
  removeAnimal: id => dispatch(removeAnimal(id)),
})

export default connect(mapStoreToProps, mapDispatchToProps)(SearchAnimalForm)
