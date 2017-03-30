import ApiService from '../services/api'

export const SEARCH_ANIMALS_RESULT = 'SEARCH_ANIMALS_RESULT'

export default function searchAnimals() {
  return (dispatch) => {
    ApiService.getAllSpecies()
      .then(species => dispatch({ type: SEARCH_ANIMALS_RESULT, animals: species }))
      .catch(error => console.log(error))
  }
}
