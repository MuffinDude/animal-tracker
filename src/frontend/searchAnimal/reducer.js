import { SEARCH_ANIMALS_RESULT } from './actions'

const initialState = {
  animals: null,
}

export default function searchAnimal(state = initialState, result) {
  switch (result.type) {
    case SEARCH_ANIMALS_RESULT: {
      return {
        animals: result.animals,
      }
    }
    default:
      return state
  }
}
