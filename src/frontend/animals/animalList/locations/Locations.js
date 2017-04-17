import React, { PropTypes } from 'react'
import moment from 'moment'

import LocationForm from '../animal/LocationForm'

function getFilteredLocations(locations, locationFilter, hasSpeciesFilter) {
  const filteredLocations = locations
    .filter(location => location.name.toLowerCase().includes(locationFilter))
    .sort((a, b) => moment(new Date(a.seen_at)) < moment(new Date(b.seen_at)))
  if ((locationFilter.length || hasSpeciesFilter) && filteredLocations.length) {
    return [filteredLocations[0]]
  }
  return filteredLocations
}

const Locations = ({
  locations, submitLocation, deleteLocation, locationFilter, hasSpeciesFilter,
}) => (
  <div className="my-3">
    {getFilteredLocations(locations, locationFilter, hasSpeciesFilter)
      .map(location => (
        <LocationForm
          key={location.id}
          locationId={location.id}
          location={location.name}
          seenAt={location.seen_at}
          submitLocation={submitLocation}
          deleteLocation={deleteLocation}
        />
      ))
    }
  </div>
)

Locations.propTypes = {
  submitLocation: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  locationFilter: PropTypes.string.isRequired,
  hasSpeciesFilter: PropTypes.bool.isRequired,
}

export default Locations
