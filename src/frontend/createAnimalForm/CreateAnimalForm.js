import React, { PropTypes, Component } from 'react'

import './CreateAnimalForm.css'

class CreateAnimalForm extends Component {
  constructor(props) {
    super(props)
    this.changeProperty = this.changeProperty.bind(this)
    this.state = { property: 'default' }
  }
  changeProperty(event) {
    this.setState({ property: event.target.value })
  }
  render() {
    return (
      <div>
        <textarea onChange={this.changeProperty} />
        CreateAnimalForm{ this.props.prop }{ this.state.property }
      </div>
    )
  }
}
CreateAnimalForm.propTypes = { prop: PropTypes.string.isRequired }

export default CreateAnimalForm
