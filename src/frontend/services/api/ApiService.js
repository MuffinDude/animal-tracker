import 'whatwg-fetch'

const GET = 'GET'
const POST = 'POST'
const DELETE = 'DELETE'
const PUT = 'PUT'
const headers = { 'Content-Type': 'application/json' }

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export function getSpeciesById(id) {
  return fetch(`/api/v1/species/${id}`, {
    method: GET,
    headers,
  }).then(checkStatus).then(response => response.json())
}

export function getAllSpecies() {
  return fetch('/api/v1/species', {
    method: GET,
    headers,
  }).then(checkStatus).then(response => response.json())
}

export function createNewAnimal({ name, species }) {
  return fetch('/api/v1/animals', {
    method: POST,
    headers,
    body: JSON.stringify({ name, species }),
  }).then(checkStatus).then(response => response.json())
}

export function getAllAnimals() {
  return fetch('/api/v1/animals', {
    method: GET,
    headers,
  }).then(checkStatus).then(response => response.json())
}

export function removeAnimal(id) {
  return fetch(`/api/v1/animals/${id}`, {
    method: DELETE,
    headers,
  }).then(checkStatus).then(response => response.json())
}

export function modifyAnimal({ id, species }) {
  return fetch(`/api/v1/animals/${id}`, {
    method: PUT,
    headers,
    body: JSON.stringify({ id, species }),
  }).then(checkStatus).then(response => response.json())
}

export function addLocation(animalId, timeStamp, name) {
  return fetch(`/api/v1/animals/${animalId}/locations`, {
    method: POST,
    headers,
    body: JSON.stringify({ timeStamp, name }),
  }).then(checkStatus).then(response => response.json())
}

export function getLocations(animalId) {
  return fetch(`/api/v1/animals/${animalId}/locations`, {
    method: GET,
    headers,
  }).then(checkStatus).then(response => response.json())
}

export function modifyLocation(animalId, locationId, timeStamp, name) {
  return fetch(`/api/v1/animals/${animalId}/locations/${locationId}`, {
    method: PUT,
    headers,
    body: JSON.stringify({ timeStamp, name }),
  }).then(checkStatus).then(response => response.json())
}

export function deleteLocation(animalId, locationId) {
  return fetch(`/api/v1/animals/${animalId}/locations/${locationId}`, {
    method: DELETE,
    headers,
  }).then(checkStatus).then(response => response.json())
}
