import React from 'react'
import styles from './styles.module.scss'
import { SEARCH_TYPE } from '../../constants'

const VideoThumbnail = ({data, displayModal}) => {
  data.type = SEARCH_TYPE.VIDEOS
  return (
    <div className={styles.thumbnail} onClick={() => displayModal(data)}>
      {data.thumbnails && <img src={data.thumbnails.medium.url} alt={data.title}/>}
      <p dangerouslySetInnerHTML={{__html: data.title}}/>
    </div>
  )
}

export default VideoThumbnail