import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  timeout: 1500
})

function makeGet (url) {
  return instance.get(url)
}

export function makeSearch (type, query) {
  const url = `/${type}/?query=${encodeURI(query)}`
  return makeGet(url)
}

export function loadMore (type, query, nextPage) {
  const url = `/${type}/next/?query=${encodeURI(query)}&nextPage=${nextPage}`
  return makeGet(url)
}

