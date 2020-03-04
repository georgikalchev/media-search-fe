import { UI } from '../../constants'

export const addTabAction = (payload) => {
  return {
    type: UI.ADD_TAB,
    payload
  }
}

export const removeTabAction = (payload) => {
  return {
    type: UI.REMOVE_TAB,
    payload
  }
}

export const setActiveTabAction = (payload) => {
  return {
    type: UI.SET_ACTIVE_TAB,
    payload
  }
}

export const updateLabelAction = (payload) => {
  return {
    type: UI.UPDATE_LABEL,
    payload
  }
}
export const updateFilterAction = (payload) => {
  return {
    type: UI.UPDATE_FILTER,
    payload
  }
}
export const setLoadingAction = (payload) => {
  return {
    type: UI.SET_LOADING,
    payload
  }
}
export const updateSettingsAction = (payload) => {
  return {
    type: UI.UPDATE_SETTINGS,
    payload
  }
}

export const displayModalAction = (payload) => {
  return {
    type: UI.DISPLAY_MODAL,
    payload
  }
}
export const closeModalAction = (payload) => {
  return {
    type: UI.CLOSE_MODAL,
    payload
  }
}
