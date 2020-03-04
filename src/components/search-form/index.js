import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'
import { FaImage, FaSearch, FaVideo } from 'react-icons/fa'
import { makeSearch } from '../../http'
import { SEARCH_TYPE } from '../../constants'

const SearchForm = ({ui, updateLabel, updateResults, updateFilter, setLoading}) => {
  const [searchValue, setSearchValue] = useState(ui.term || '')
  const [searchFilter, setSearchFilter] = useState(ui.searchType)
  useEffect(() => {
    setSearchValue(ui.term)
  }, [ui.term])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchValue !== '') {
      setLoading(true)
      makeSearch(searchFilter, searchValue).then(
        result => {
          updateResults(result.data)
          updateFilter(searchFilter)
        }
      )
        .catch(error => {
          updateResults({pageData: {error: true}})
        })
        .then(() => {
          setLoading(false)
        })
      updateLabel(searchValue)
    }
  }
  const handleUpdateFilter = (to) => {
    setSearchFilter(to)
  }

  const iconStyle = {
    width: '2rem',
    height: '2rem',
    color: 'var(--border-light-transparent-30)'
  }
  const activeIconStyle = {
    ...iconStyle,
    color: 'var(--border-dark)'
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={e => handleSubmit(e)}>
        <input
          className={cx(styles.item, styles['searchField'])}
          type='text'
          value={searchValue}
          placeholder={ui.label}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
          onBlur={() => updateLabel(searchValue)}
        />
        <label>
          <FaImage className={cx(styles.icon, searchFilter === SEARCH_TYPE.IMAGES && styles.active)}/>
          <input
            className={styles.checkbox}
            type='checkbox'
            checked={ui.searchType === SEARCH_TYPE.IMAGES}
            onChange={() => handleUpdateFilter(SEARCH_TYPE.IMAGES)}
          />
        </label>
        <label>
          <FaVideo className={cx(styles.icon, searchFilter === SEARCH_TYPE.VIDEOS && styles.active)}/>
          <input
            className={styles.checkbox}
            type='checkbox'
            checked={ui.searchType === SEARCH_TYPE.VIDEOS}
            onChange={() => handleUpdateFilter(SEARCH_TYPE.VIDEOS)}
          />
        </label>
        <button className={styles.item} type="submit"><FaSearch style={activeIconStyle}/></button>
      </form>
    </div>
  )
}

export default SearchForm