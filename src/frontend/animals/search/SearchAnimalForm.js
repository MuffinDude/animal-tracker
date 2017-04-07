import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllAnimals } from '../actions'

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
        <div>
          <input
            placeholder="Enter a name..."
          />
        </div>
        {this.props.animals ? this.props.animals.map(animal => (
          <div key={animal.name}>
            {animal.name} {animal.location} {animal.species_name}
          </div>
        )) : ''}
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
