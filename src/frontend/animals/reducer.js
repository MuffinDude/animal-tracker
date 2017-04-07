import {
  SEARCH_ANIMALS_RESULT,
  ANIMALS_SPECIES_RESULT,
  CREATED_NEW_ANIMAL,
  ERROR,
  IS_FETCHING,
  IS_CREATING_ANIMAL,
} from './actions'

const initialState = {
  isFetching: false,
  isCreatingAnimal: false,
  error: null,
  species: null,
  animals: null,
}

export default function animals(state = initialState, result) {
  switch (result.type) {
    case SEARCH_ANIMALS_RESULT: {
      return {
        ...state,
        error: null,
        animals: result.animals,
        isFetching: false,
      }
    }
    case ANIMALS_SPECIES_RESULT: {
      return {
        ...state,
        error: null,
        species: result.species,
        isFetching: false,
      }
    }
    case CREATED_NEW_ANIMAL: {
      return {
        ...state,
        error: null,
        animals: state.animals ? state.animals.concat([result.animal]) : [result.animal],
        isCreatingAnimal: false,
      }
    }
    case ERROR: {
      return {
        ...state,
        error: result.error,
        isFetching: false,
        isCreatingAnimal: false,
      }
    }
    case IS_FETCHING: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case IS_CREATING_ANIMAL: {
      return {
        ...state,
        isCreatingAnimal: true,
      }
    }
    default:
      return state
  }
}
