import { SEARCH_ANIMALS_RESULT, ANIMALS_SPECIES_RESULT, ERROR } from './actions'

const initialState = {
  error: null,
  species: null,
}

export default function animals(state = initialState, result) {
  switch (result.type) {
    case SEARCH_ANIMALS_RESULT: {
      return {
        error: null,
        animals: result.animals,
      }
    }
    case ANIMALS_SPECIES_RESULT: {
      return {
        error: null,
        species: result.species,
      }
    }
    case ERROR: {
      return {
        ...state,
        error: result.error,
      }
    }
    default:
      return state
  }
}
