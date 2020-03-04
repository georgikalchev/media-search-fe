import React, { createContext, useReducer, useEffect } from 'react'
import { uiReducer, initialUiData } from '../reducers/ui/ui-reducer'
import { UI } from '../constants'
import { getSavedData, saveData } from '../reducers/common'

export const UIContext = createContext()

const UIContextProvider = (props) => {
  const [ui, dispatch] = useReducer(uiReducer, initialUiData, () => {
    const uiData = getSavedData(UI.UI_DATA)
    return uiData ? uiData : initialUiData
  })
  useEffect(() => {
    saveData(UI.UI_DATA, ui)
  }, [ui])

  return (
    <UIContext.Provider value={{ui, uiDispatcher: dispatch}}>
      {props.children}
    </UIContext.Provider>
  )
}
export default UIContextProvider