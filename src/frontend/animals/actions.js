import ApiService from '../services/api'

export const SEARCH_ANIMALS_RESULT = 'SEARCH_ANIMALS_RESULT'
export const ANIMALS_SPECIES_RESULT = 'ANIMALS_SPECIES_RESULT'
export const CREATED_NEW_ANIMAL = 'CREATED_NEW_ANIMAL'
export const IS_FETCHING = 'IS_FETCHING'
export const IS_CREATING_ANIMAL = 'IS_CREATING_ANIMAL'
export const ERROR = 'ERROR'

export function getAllSpecies() {
  return (dispatch) => {
    dispatch({ type: IS_FETCHING })
    ApiService.getAllSpecies()
      .then(species => dispatch({ type: ANIMALS_SPECIES_RESULT, species }))
      .catch(error => dispatch({ type: ERROR, error }))
  }
}

export function getAllAnimals() {
  return (dispatch) => {
    dispatch({ type: IS_FETCHING })
    ApiService.getAllAnimals()
      .then(animals => dispatch({ type: SEARCH_ANIMALS_RESULT, animals }))
      .catch(error => dispatch({ type: ERROR, error }))
  }
}

export function createNewAnimal(data) {
  return (dispatch) => {
    dispatch({ type: IS_CREATING_ANIMAL })
    ApiService.createNewAnimal(data)
      .then(animal => dispatch({ type: CREATED_NEW_ANIMAL, animal }))
      .catch((error) => {
        dispatch({ type: ERROR, error: error.response.status })
      })
  }
}
