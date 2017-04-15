import ApiService from '../../../services/api'

export const IS_FETCHING_LOCATION = 'IS_FETCHING_LOCATION'
export const ADD_LOCATION = 'ADD_LOCATION'
export const FETCH_ERROR = 'FETCH_ERROR'
export const ADD_LOCATIONS = 'ADD_LOCATIONS'
export const DELETE_LOCATION = 'DELETE_LOCATION'
export const MODIFY_LOCATION = 'MODIFY_LOCATION'

export function submitLocation(animalId, timeStamp, name) {
  return (dispatch) => {
    dispatch({ type: IS_FETCHING_LOCATION })
    ApiService.addLocation(animalId, timeStamp, name)
      .then(location => dispatch({ type: ADD_LOCATION, location }))
      .catch(error => dispatch({ type: FETCH_ERROR, error }))
  }
}

export function getLocations(animalId) {
  return (dispatch) => {
    dispatch({ type: IS_FETCHING_LOCATION })
    ApiService.getLocations(animalId)
      .then(locations => dispatch({ type: ADD_LOCATIONS, locations }))
      .catch(error => dispatch({ type: FETCH_ERROR, error }))
  }
}

export function deleteLocation(animalId, locationId) {
  return (dispatch) => {
    dispatch({ type: IS_FETCHING_LOCATION })
    ApiService.deleteLocation(animalId, locationId)
      .then(location => dispatch({ type: DELETE_LOCATION, location }))
      .catch(error => dispatch({ type: FETCH_ERROR, error }))
  }
}

export function modifyLocation(animalId, locationId, timeStamp, name) {
  return (dispatch) => {
    dispatch({ type: IS_FETCHING_LOCATION })
    ApiService.modifyLocation(animalId, locationId, timeStamp, name)
      .then(location => dispatch({ type: MODIFY_LOCATION, location }))
      .catch(error => dispatch({ type: FETCH_ERROR, error }))
  }
}
