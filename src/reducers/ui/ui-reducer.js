import { SEARCH_TYPE, UI } from '../../constants'
import { v1 as uuid } from 'uuid'

const initialTabState = {
  infiniteScroll: false,
  searchType: SEARCH_TYPE.IMAGES,
  label: 'Start Searching',
  term: '',
  loading: false
}
export const initialUUID = uuid()
export const initialUiData = {
  tabs: {
    [initialUUID]: initialTabState
  },
  activeTab: initialUUID,
  shouldShowModal: false
}

export const uiReducer = (state = initialUiData, action) => {
  const {type, payload} = action

  switch (type) {
    case UI.ADD_TAB: {
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [payload]: initialTabState
        },
        activeTab: payload

      }
    }
    case UI.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: payload
      }
    }
    case UI.REMOVE_TAB: {
      const newState = {...state}
      if (state.activeTab === payload) {
        newState.activeTab = findNextActiveTab(state.tabs, payload)
      }

      delete newState.tabs[payload]
      return newState
    }

    case UI.UPDATE_LABEL: {
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [payload.uuid]: {
            ...state.tabs[payload.uuid],
            label: payload.value,
            term: payload.value
          }
        }
      }
    }
    case UI.UPDATE_FILTER: {
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [payload.uuid]: {
            ...state.tabs[payload.uuid],
            searchType: payload.value
          }
        }
      }
    }
    case UI.UPDATE_SETTINGS: {
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [payload.uuid]: {
            ...state.tabs[payload.uuid],
            infiniteScroll: payload.value
          }
        }
      }
    }
    case UI.SET_LOADING: {
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [payload.uuid]: {
            ...state.tabs[payload.uuid],
            loading: payload.value
          }
        }
      }
    }
    case UI.DISPLAY_MODAL: {
      return {
        ...state,
        displayModal: true,
        modalData: payload
      }
    }
    case UI.CLOSE_MODAL:
      return {
        ...state,
        displayModal: false,
        modalData: null
      }
    default:
      return state
  }
}

const findNextActiveTab = (tabs, uuid) => {
  const indexes = Object.keys(tabs)
  const uuidIndex = indexes.indexOf(uuid)
  return uuidIndex === indexes.length - 1 ? indexes[uuidIndex - 1] : indexes[uuidIndex + 1]

}