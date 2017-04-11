import {
  SEARCH_ANIMALS_RESULT,
  ANIMALS_SPECIES_RESULT,
  REMOVE_ANIMAL,
  MODIFIED_ANIMAL,
  CREATED_NEW_ANIMAL,
  ERROR,
  IS_FETCHING,
  IS_CREATING_ANIMAL,
  IS_MODIFYING_ANIMAL,
} from './actions'

const initialState = {
  isFetching: false,
  isCreatingAnimal: false,
  isRemovingAnimal: false,
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
    case REMOVE_ANIMAL: {
      return {
        ...state,
        error: null,
        animals: state.animals.filter(animal => animal.id !== result.animal.id),
        isFetching: false,
      }
    }
    case MODIFIED_ANIMAL: {
      return {
        ...state,
        error: null,
        animals: state.animals.map((animal) => {
          if (animal.id === result.animal.id) return result.animal
          return animal
        }),
        isFetching: false,
        isModifyingAnimal: false,
      }
    }
    case ERROR: {
      return {
        ...state,
        error: result.error,
        isFetching: false,
        isCreatingAnimal: false,
        isModifyingAnimal: false,
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
    case IS_MODIFYING_ANIMAL: {
      return {
        ...state,
        isModifyingAnimal: true,
      }
    }
    default:
      return state
  }
}
