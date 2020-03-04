import { SEARCH } from '../../constants'

export const saveSearchDataAction = (payload) => {
  return {
    type: SEARCH.SAVE_SEARCH_DATA,
    payload
  }
}

export const attachUUIDToSearchContainer = (payload) => {
  return {
    type: SEARCH.ATTACH_UUID_TO_SEARCH_CONTAINER,
    payload
  }
}
export const removeResultsForUUIDAction = (payload) => {
  return {
    type: SEARCH.CLEAR_SEARCH_RESULTS_DATA,
    payload
  }
}