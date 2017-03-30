import React, { Component, PropTypes } from 'react'

import './Select.css'

class Select extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
    this.renderSearchBox = this.renderSearchBox.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.state = {
      query: '',
      open: false,
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.hideMenu, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideMenu, false)
  }

  onChange(event) {
    this.setState({ query: event.target.value })
  }

  onButtonClick(event) {
    this.stopPropagation(event)
    this.setState({ open: !this.state.open })
  }

  onOptionClick(event, selectedOptionKey) {
    this.stopPropagation(event)
    this.props.onChange(selectedOptionKey)
  }

  stopPropagation(event) { // eslint-disable-line
    event.stopPropagation()
    event.preventDefault()
    event.nativeEvent.stopImmediatePropagation()
  }

  hideMenu() {
    if (this.state.open) {
      this.setState({ open: false })
    }
  }

  renderSearchBox() {
    return (
      <div>
        <input
          type="text"
          autoFocus
          className="dropdown-item form-control dropdown-search"
          placeholder="Otsi..."
          onClick={this.stopPropagation}
          onChange={this.onChange}
          value={this.state.query}
        />
        <div className="dropdown-divider" />
      </div>
    )
  }

  renderOptions() {
    const isActive = optionKey => this.props.value === optionKey
    return this.props.options
      .filter(option => option.toLowerCase().includes(this.state.query.toLowerCase()))
      .map(option => (
        <li // eslint-disable-line jsx-a11y/no-static-element-interactions
          className={`dropdown-item ${isActive(option) ? 'active' : ''}`}
          onClick={event => this.onOptionClick(event, option)}
          key={option}
        >
          {option}
        </li>
      ))
  }

  render() {
    const { open } = this.state
    const noneValue = (
      <li // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={`dropdown-item ${this.props.value === '-' ? 'active' : ''}`}
        onClick={event => this.onOptionClick(event, '-')}
      >
        -
      </li>
    )
    return (
      <div className="col-12">
        <div className="row">
          <button
            className="form-control dropdown-toggle"
            style={{ whiteSpace: 'nowrap' }}
            type="button"
            aria-expanded={open}
            onClick={this.onButtonClick}
          >
            <div style={{ display: 'inline-block', width: '100%', textAlign: 'left' }}>
              {this.props.value}
            </div>
            <span className="caret" />
          </button>
        </div>
        {
          open ? (
            <div className={`dropdown-menu ${open ? 'show' : ''} mb-5`} role="menu">
              {this.renderSearchBox()}
              <div className="dropdown-scrollable-list">
                {this.props.isNoneValueAllowed ? noneValue : ''}
                {this.renderOptions()}
              </div>
            </div>
          ) : ''
        }
      </div>
    )
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isNoneValueAllowed: PropTypes.bool,
}

Select.defaultProps = {
  isNoneValueAllowed: true,
}

export default Select
