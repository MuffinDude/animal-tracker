import React, { Component, PropTypes } from 'react'

class SearchAnimalForm extends Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.state = {
      inputValue: '',
    }
  }

  onInputChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    const { inputValue } = this.state
    return (
      <div>
        {this.props.myStringProp}
        {inputValue}
        <input
          onChange={this.onInputChange}
        />
      </div>
    )
  }
}

SearchAnimalForm.propTypes = {
  myStringProp: PropTypes.string,
}

SearchAnimalForm.defaultProps = {
  myStringProp: 'noku',
}

export default SearchAnimalForm
