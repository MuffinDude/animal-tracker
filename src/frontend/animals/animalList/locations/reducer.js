import {
  IS_FETCHING_LOCATION,
  ADD_LOCATION,
  FETCH_ERROR,
  ADD_LOCATIONS,
  DELETE_LOCATION,
  MODIFY_LOCATION,
} from './actions'

const initialState = {
  isFetching: false,
  errorStatusCode: null,
  locations: null,
}

export default function locations(state = initialState, result) {
  switch (result.type) {
    case IS_FETCHING_LOCATION:
      return { ...state, isFetching: true, errorStatusCode: null }
    case ADD_LOCATION: {
      let newLocations = [result.location]
      if (state.locations && state.locations[`${result.location.animal_id}`]) {
        newLocations = newLocations.concat(state.locations[`${result.location.animal_id}`])
      }
      return {
        ...state,
        locations: {
          ...state.locations,
          [`${result.location.animal_id}`]: newLocations,
        },
        isFetching: false,
        errorStatusCode: null,
      }
    }
    case FETCH_ERROR:
      return { ...state, isFetching: false, errorStatusCode: null }
    case ADD_LOCATIONS:
      if (!result.locations.length) {
        return state
      }
      return {
        ...state,
        isFetching: false,
        errorStatusCode: null,
        locations: {
          ...state.locations,
          [result.locations[0].animal_id]: result.locations,
        },
      }
    case DELETE_LOCATION: {
      let newLocations = []
      if (state.locations && state.locations[`${result.location.animal_id}`]) {
        newLocations = state.locations[`${result.location.animal_id}`]
          .filter(location => location.id !== result.location.id)
      }
      return {
        ...state,
        isFetching: false,
        errorStatusCode: null,
        locations: {
          ...state.locations,
          [result.location.animal_id]: newLocations,
        },
      }
    }
    case MODIFY_LOCATION:
      return {
        ...state,
        isFetching: false,
        errorStatusCode: null,
        locations: {
          ...state.locations,
          [result.location.animal_id]: state.locations[`${result.location.animal_id}`]
            .map((location) => {
              if (location.id === result.location.id) {
                return result.location
              }
              return location
            }),
        },
      }
    default:
      return state
  }
}
