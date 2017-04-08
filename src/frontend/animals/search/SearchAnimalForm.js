import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllAnimals } from '../actions'
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
            placeholder="Enter a name..."
          />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>species</th>
            </tr>
          </thead>
          <tbody>
            {this.props.animals ? this.props.animals.map(animal => (
              <tr key={animal.name}>
                <td>{animal.name}</td>
                <td>{animal.location}</td>
                <td>{animal.species_name}</td>
              </tr>
            )) : ''}
          </tbody>
        </table>
      </div>
    )
  }
}

SearchAnimalForm.propTypes = {
  getAllAnimals: PropTypes.func.isRequired,
  animals: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
}

SearchAnimalForm.defaultProps = {
  animals: null,
}

const mapStoreToProps = store => ({
  animals: store.animals.animals,
})

const mapDispatchToProps = dispatch => ({
  getAllAnimals: () => dispatch(getAllAnimals()),
})

export default connect(mapStoreToProps, mapDispatchToProps)(SearchAnimalForm)
