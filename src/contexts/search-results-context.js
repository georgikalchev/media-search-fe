import React, { createContext, useReducer, useEffect } from 'react'
import { getSavedData, saveData } from '../reducers/common'
import { searchReducer, initialSearchState } from '../reducers/search/search-reducer'
import { SEARCH } from '../constants'

export const SearchResultsContext = createContext()

const SearchResultsContextProvider = (props) => {
  const [results, dispatch] = useReducer(searchReducer, initialSearchState, () => {
    const searchData = getSavedData(SEARCH.SEARCH_DATA)
    return searchData ? searchData : initialSearchState
  })
  useEffect(() => {
    saveData(SEARCH.SEARCH_DATA, results)
  }, [results])

  return (
    <SearchResultsContext.Provider value={{results, searchDispatcher: dispatch}}>
      {props.children}
    </SearchResultsContext.Provider>
  )
}

export default SearchResultsContextProvider