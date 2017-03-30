import ApiService from '../services/api'

export const SEARCH_ANIMALS_RESULT = 'SEARCH_ANIMALS_RESULT'
export const ANIMALS_SPECIES_RESULT = 'ANIMALS_SPECIES_RESULT'
export const ERROR = 'ERROR'

export function searchAnimals() {
  return (dispatch) => {
    ApiService.getAllSpecies()
      .then(species => dispatch({ type: SEARCH_ANIMALS_RESULT, animals: species }))
      .catch(error => dispatch({ type: ERROR, error }))
  }
}

export function getAllSpecies() {
  return (dispatch) => {
    ApiService.getAllSpecies()
      .then(species => dispatch({ type: ANIMALS_SPECIES_RESULT, species }))
      .catch(error => dispatch({ type: ERROR, error }))
  }
}
