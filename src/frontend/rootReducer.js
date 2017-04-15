import { combineReducers } from 'redux'
import { reducer as animals } from './animals'
import { reducer as locations } from './animals/animalList/locations'


export default combineReducers({
  animals,
  locations,
})
