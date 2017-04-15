import React, { PropTypes } from 'react'

import LocationForm from '../animal/LocationForm'

const Locations = ({ locations, submitLocation, deleteLocation }) => (
  <div className="my-3">
    {locations.map(location => (
      <LocationForm
        key={location.id}
        locationId={location.id}
        location={location.name}
        seenAt={location.seen_at}
        submitLocation={submitLocation}
        deleteLocation={deleteLocation}
      />
    ))}
  </div>
)

Locations.propTypes = {
  submitLocation: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
}

export default Locations
