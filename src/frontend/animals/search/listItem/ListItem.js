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
    const { animal } = this.props
    const { isOpen } = this.state
    return (
      <div className="card p-3 mb-3">
        {isOpen ? (
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
            className={`btn btn-outline-${isOpen ? 'danger' : 'info'} mt-3`}
            type="button"
            onClick={this.toggleOpenState}
          >
            {`${isOpen ? 'Cancel' : 'Modify'}`}
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
  isModifyingAnimal: PropTypes.bool.isRequired,
}

const mapDispatchToProps = dispatch => ({
  modifyAnimal: animal => dispatch(modifyAnimal(animal)),
})

const mapStoreToProps = store => ({
  isModifyingAnimal: store.animals.isModifyingAnimal,
})


ListItem.defaultProps = {
  animals: PropTypes.shape({
    seen_at: null,
  }),
}

export default connect(mapStoreToProps, mapDispatchToProps)(ListItem)
