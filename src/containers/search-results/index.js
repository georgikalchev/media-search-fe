import React, { useEffect, useRef, useState } from 'react'
import { v1 as uuid } from 'uuid'
import styles from './styles.module.scss'
import VideoThumbnail from '../../components/video-thumbnail'
import ImageThumbnail from '../../components/image-thumbnail'
import { loadMore } from '../../http'
import { FaChevronDown } from 'react-icons/fa'

const SearchResults = ({ui, results, loading, displayModal, updateResults}) => {
  const resultsRef = useRef(null)
  const [shouldLoadMore, setShouldLoadMore] = useState(false)
  useEffect(() => {
    if (shouldLoadMore && results.pageData) {
      loadMore(ui.searchType, ui.term, results.pageData.nextPage).then(
        result => {
          const merged = {pageData: result.data.pageData, items: [...results.items, ...result.data.items]}
          updateResults(merged)
        }
      ).catch(error => {
        updateResults({
          ...results, ['pageData']: {...results.pageData, error: true}
        })
      }).then(() => {
        setShouldLoadMore(false)
      })

    }
  }, [shouldLoadMore, results, ui, updateResults])

  const handleScrolling = (timeOutId) => {
    if (timeOutId.value === null) {
      timeOutId.value = setTimeout(() => {
        if (resultsRef.current) {
          const {scrollHeight, scrollTop, clientHeight} = resultsRef.current
          console.log({scrollHeight, scrollTop, clientHeight})
          if (scrollHeight - scrollTop - clientHeight < 100) {
            setShouldLoadMore(true)
          }
        }
        timeOutId.value = null
      }, 120)
    }
  }
  useEffect(() => {
    const timeOutId = {value: null}
    window.addEventListener('scroll', () => handleScrolling(timeOutId), true)
    return () => {window.removeEventListener('scroll', handleScrolling)}
  }, [])
  const hasItems = results.items && results.items.length > 0

  return (
    <div className={styles.container} ref={resultsRef}>
      {loading && <div className={styles.loader}><h1>LOADING</h1></div>}
      <div className={styles['results-container']}>
        {hasItems && results.items.map(obj => (
          <div
            key={uuid()}
            className={styles.thumbnail}
          >
            {results.pageData.type === 'VIDEO' &&
            <VideoThumbnail data={obj} displayModal={displayModal}/>}
            {results.pageData.type === 'IMAGE' &&
            <ImageThumbnail data={obj} displayModal={displayModal}/>}
          </div>)
        )}
      </div>
      {results.pageData && results.pageData.error ?
        <h1>SORRY, WE COULD NOT FIND {hasItems && <span>MORE OF</span>} WHAT YOU WERE LOOKING FOR ¯\_(ツ)_/¯</h1>
        : hasItems && (
        <div className={styles['load-more']}>
          <h1><FaChevronDown/></h1>
          <h1><FaChevronDown/></h1>
          <h1>SCROLL TO LOAD MORE</h1>
        </div>
      )}
    </div>

  )
}

SearchResults.propTypes = {}

export default SearchResults
