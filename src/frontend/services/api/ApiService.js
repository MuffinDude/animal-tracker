import 'whatwg-fetch'

const GET = 'GET'
const POST = 'POST'
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

export function createNewAnimal({ name, location, time, species }) {
  return fetch('/api/v1/animals', {
    method: POST,
    headers,
    body: JSON.stringify({ name, location, time, species }),
  }).then(checkStatus).then(response => response.json())
}

export function getAllAnimals() {
  return fetch('/api/v1/animals', {
    method: GET,
    headers,
  }).then(checkStatus).then(response => response.json())
}
