import React from 'react'
import styles from './styles.module.scss'
import { SEARCH_TYPE } from '../../constants'

const ImageThumbnail = ({data, displayModal}) => {
  data.type = SEARCH_TYPE.IMAGES
  return (
    <div className={styles.thumbnail} onClick={() => displayModal(data)}>
      <div className={styles.img}
           style={{
             backgroundImage: `url(${data.thumbnail})`,
             height: `${data.thumbnailHeight * 1.5}px`,
             width: `${data.thumbnailWidth * 1.5}px`
           }}/>
      <div className={styles.p} dangerouslySetInnerHTML={{__html: data.title}}/>
    </div>
  )
}

export default ImageThumbnail