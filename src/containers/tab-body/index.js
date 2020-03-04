import React, { useContext } from 'react'
import styles from './styles.module.scss'
import SearchResults from '../search-results'
import SearchForm from '../../components/search-form'
import { UIContext } from '../../contexts/ui-context'
import { SearchResultsContext } from '../../contexts/search-results-context'
import {
  displayModalAction,
  setLoadingAction,
  updateFilterAction,
  updateLabelAction
} from '../../reducers/ui/ui-actions'
import { saveSearchDataAction } from '../../reducers/search/search-actions'

export const TabBody = () => {
  const {ui: {tabs, activeTab}, uiDispatcher} = useContext(UIContext)
  const {results, searchDispatcher} = useContext(SearchResultsContext)
  const handleUpdateLabel = (value) => {
    uiDispatcher(updateLabelAction({uuid: activeTab, value}))
  }
  const handleUpdateResults = (results) => {
    searchDispatcher(saveSearchDataAction({uuid: activeTab, results}))
  }
  const handleUpdateFilter = (value) => {
    uiDispatcher(updateFilterAction({uuid: activeTab, value}))
  }
  const handleSettingLoading = (value) => {
    uiDispatcher(setLoadingAction({uuid: activeTab, value}))
  }
  const handleDisplayModal = (data) => {
    uiDispatcher(displayModalAction(data))
  }

  return (
    <div className={styles.container}>
      <SearchForm
        ui={tabs[activeTab]}
        updateLabel={handleUpdateLabel}
        updateResults={handleUpdateResults}
        updateFilter={handleUpdateFilter}
        setLoading={handleSettingLoading}
      />
      <SearchResults
        ui={tabs[activeTab]}
        results={results[activeTab].data}
        loading={tabs[activeTab].loading}
        displayModal={handleDisplayModal}
        updateResults={handleUpdateResults}
      />
    </div>
  )
}
