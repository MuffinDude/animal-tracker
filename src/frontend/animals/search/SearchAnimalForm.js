import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllAnimals, removeAnimal } from '../actions'
import './SearchAnimalForm.css'

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
        <div className="container">
          <input
            type="text"
            placeholder="Search by name..."
          />
        </div>
        <div className="container">
          <div className="card-columns">
            {this.props.animals ? this.props.animals.map(animal => (
              <div className="card" key={animal.id}>
                <div className="card-block">
                  <h4 className="card-title">{animal.name}</h4>
                  <p>Species: {animal.species_name}</p>
                  <p>Location: {animal.location}</p>
                  <p>Last seen: {animal.seen_at}</p>
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => this.props.removeAnimal(animal.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-outline-info"
                    type="button"
                  >
                    Modify
                  </button>
                </div>
              </div>
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
