import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ModificationForm from '../../modification'
import { modifyAnimal } from '../../actions'
import './ListItem.css'

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.toggleOpenState = this.toggleOpenState.bind(this)
    this.state = {
      isOpen: false,
    }
  }

  toggleOpenState() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { animal } = this.props
    return (
      <div className="card p-3">
        {this.state.isOpen ? (
          <ModificationForm
            animalName={animal.name}
            animalSpecies={animal.species_name}
            animalLocation={animal.location}
            animalLastSeen={animal.seen_at}
            animalId={animal.id}
            onSubmit={this.props.modifyAnimal}
          />
        ) :
          <div>
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
          </div>
      }
        <div>
          <button
            className="btn btn-outline-info mt-3"
            type="button"
            onClick={this.toggleOpenState}
          >
            Modify
          </button>
        </div>
      </div>
    )
  }
}

ListItem.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    species_name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    seen_at: PropTypes.string,
  }).isRequired,
  removeAnimal: PropTypes.func.isRequired,
  modifyAnimal: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  modifyAnimal: animal => dispatch(modifyAnimal(animal)),
})

ListItem.defaultProps = {
  animals: PropTypes.shape({
    seen_at: null,
  }),
}

export default connect(animal => animal, mapDispatchToProps)(ListItem)
