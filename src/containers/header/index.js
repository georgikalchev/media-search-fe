import React, { useContext } from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'
import { UIContext } from '../../contexts/ui-context'
import { addTabAction, removeTabAction, setActiveTabAction } from '../../reducers/ui/ui-actions'
import { v1 as uuid } from 'uuid'
import { FiPlus, FiXCircle } from 'react-icons/fi'
import { attachUUIDToSearchContainer, removeResultsForUUIDAction } from '../../reducers/search/search-actions'
import { SearchResultsContext } from '../../contexts/search-results-context'

export const Header = () => {
  const {ui, uiDispatcher} = useContext(UIContext)
  const {searchDispatcher} = useContext(SearchResultsContext)
  const tabs = Object.entries(ui.tabs)
  const canClose = tabs.length > 1
  const addNewTab = () => {
    const uuidValue = uuid()
    uiDispatcher(addTabAction(uuidValue))
    searchDispatcher(attachUUIDToSearchContainer(uuidValue))
  }
  const removeTab = (e, uuid) => {
    e.stopPropagation()
    uiDispatcher(removeTabAction(uuid))
    searchDispatcher(removeResultsForUUIDAction(uuid))
  }
  const selectActiveTab = (uuid) => {
    uiDispatcher(setActiveTabAction(uuid))
  }

  return (
    <div className={styles['header-container']}>
      <ul className={styles.tabs}>
        {tabs.map(([uuid, tab]) => (
          <li
            className={cx(styles.tab, uuid === ui.activeTab ? styles.active : '')}
            key={uuid}
            onClick={() => selectActiveTab(uuid)}
          >
            <span className={styles.label}>{tab.label}</span>
            {canClose &&
            <span onClick={(e) => removeTab(e, uuid)}><FiXCircle/></span>
            }
          </li>))
        }
        <div className={styles.plus} onClick={addNewTab}><FiPlus/></div>
      </ul>
    </div>
  )
}
