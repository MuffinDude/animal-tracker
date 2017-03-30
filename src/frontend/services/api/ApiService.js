import 'whatwg-fetch'

const GET = 'GET'
// const POST = 'POST'
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
  console.log('is calld')
  return fetch('/api/v1/species', {
    method: GET,
    headers,
  }).then(checkStatus).then(response => response.json())
}
