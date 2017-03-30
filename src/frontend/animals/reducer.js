import { SEARCH_ANIMALS_RESULT, ERROR } from './actions'

const initialState = {
  error: null,
  animals: null,
}

export default function animals(state = initialState, result) {
  switch (result.type) {
    case SEARCH_ANIMALS_RESULT: {
      return {
        error: null,
        animals: result.animals,
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
