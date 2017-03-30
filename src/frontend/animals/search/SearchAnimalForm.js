import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchAnimals } from '../actions'

class SearchAnimalForm extends Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.state = {
      inputValue: '',
    }
  }

  onInputChange(event) {
    this.props.searchAnimals()
    this.setState({ inputValue: event.target.value })
  }

  render() {
    const { inputValue } = this.state
    return (
      <div>
        {inputValue}
        {this.props.animals ? this.props.animals.map(animal => (
          <div key={animal.name}>{animal.name}</div>
        )) : ''}
        <input
          onChange={this.onInputChange}
        />
      </div>
    )
  }
}

SearchAnimalForm.propTypes = {
  searchAnimals: PropTypes.func.isRequired,
  animals: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
}

SearchAnimalForm.defaultProps = {
  animals: null,
}

const mapStoreToProps = store => ({
  animals: store.animals.animals,
})

const mapDispatchToProps = dispatch => ({
  searchAnimals: () => dispatch(searchAnimals()),
})

export default connect(mapStoreToProps, mapDispatchToProps)(SearchAnimalForm)
