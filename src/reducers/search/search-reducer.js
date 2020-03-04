import { SEARCH } from '../../constants'
import { initialUUID } from '../ui/ui-reducer'

export const initialSearchState = {
  [initialUUID]: {data: []}
}

export const searchReducer = (state = initialSearchState, action) => {
  const {type, payload} = action

  switch (type) {
    case SEARCH.ATTACH_UUID_TO_SEARCH_CONTAINER:
      return {
        ...state,
        [payload]: {
          data: []
        }
      }
    case SEARCH.SAVE_SEARCH_DATA:
      return {
        ...state,
        [payload.uuid]: {data: payload.results}
      }
    case SEARCH.UPDATE_SEARCH_DATA:
      return {
        ...state
      }
    case SEARCH.CLEAR_SEARCH_RESULTS_DATA:
      const newState = {...state}
      delete newState[payload]
      return newState
    default:
      return state
  }
}

