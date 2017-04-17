import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import 'moment/locale/et'

const emojis = [
  '🐀', '🐁', '🐂', '🐃', '🐄', '🐅', '🐆', '🐇', '🐈', '👽', '👾', '💐',
  '🐉', '🐊', '🐋', '🐌', '🐍', '🐎', '🐏', '🐐', '🐑', '🐒', '🐓', '🐔',
  '🐕', '🐖', '🐗', '🐘', '🐙', '🐚', '🐛', '🐜', '🐝', '🐞', '🐟', '🐠',
  '🐣', '🐤', '🐥', '🐪', '🐫', '🐭', '🐮', '🐯', '🐰', '🐱', '🐲', '🐳',
  '🐴', '🐵', '🐶', '🐷', '🐸', '🐹', '🐺', '🐻', '🐼', '🐽', '🐾', '🐿',
]

class LocationForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.emojis = emojis.sort(() => 0.5 - Math.random()).slice(0, 5)
    const seenAt = () => {
      if (this.props.seenAt) {
        return moment(new Date(this.props.seenAt)).format('DD.MM.YYYY HH:mm')
      }
      return moment().format('DD.MM.YYYY HH:mm')
    }
    this.state = {
      location: this.props.location || '',
      seenAt: seenAt(),
      isModifying: false,
    }
  }

  onSubmit(event) {
    event.preventDefault()
    const { seenAt, location } = this.state
    const timeStamp = moment(seenAt, 'DD.MM.YYYY HH:mm').format()
    if (timeStamp === 'Invalid date' || !location.length) return
    this.props.submitLocation(timeStamp, location, this.props.locationId)
  }

  render() {
    const { cancel, isForAdding } = this.props
    const { location, seenAt, isModifying } = this.state
    const type = () => {
      if (isForAdding) return '-danger'
      if (isModifying) return '-primary'
      return ''
    }
    return (
      <div className={`card card-outline${type()} p-2 my-2`}>
        <form className="form">
          <div className="d-flex justify-content-between" style={{ width: '100%' }}>
            <div className="form-group row mx-0">
              <div>
                <label htmlFor="locationInput">Location</label>
                <div className="mr-3">
                  <input
                    type="text"
                    className="form-control"
                    disabled={!isModifying && !cancel}
                    id="locationInput"
                    placeholder="Tallinn"
                    value={location}
                    onChange={event => this.setState({ location: event.target.value })}
                  />
                </div>
              </div>
              <div className="mr-3">
                <label htmlFor="dateTimeInput">Seen at</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    disabled={!isModifying && !cancel}
                    id="dateTimeInput"
                    value={seenAt}
                    onChange={event => this.setState({ seenAt: event.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="formButtons">
                {this.emojis}
              </label>
              <div className="d-flex flex-row" id="formButtons">
                {
                  <button
                    id="cancelButton"
                    className={`btn btn-${cancel || isModifying ? 'danger' : 'info'}`}
                    type="button"
                    onClick={cancel || (() => this.setState({ isModifying: !isModifying }))}
                  >
                    {`${cancel || isModifying ? 'Cancel' : 'Modify'}`}
                  </button>
                }
                {isModifying || cancel ? (
                  <button
                    className="btn btn-success ml-3"
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="btn btn-danger ml-3"
                    type="submit"
                    onClick={(event) => {
                      event.preventDefault()
                      this.props.deleteLocation(this.props.locationId)
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
LocationForm.propTypes = {
  cancel: PropTypes.func,
  submitLocation: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func,
  location: PropTypes.string,
  seenAt: PropTypes.string,
  locationId: PropTypes.number,
  isForAdding: PropTypes.bool,
}

LocationForm.defaultProps = {
  cancel: null,
  deleteLocation: null,
  location: null,
  seenAt: null,
  locationId: null,
  isForAdding: false,
}

export default LocationForm
