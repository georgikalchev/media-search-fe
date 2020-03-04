import React from 'react'
import styles from './styles.module.scss'

export const VideoPreview = ({data}) => {
  return (
    <div className={styles['embed-container']}>
      <iframe
        src={`https://www.youtube.com/embed/${data.id}`}
        frameBorder='0'
        allow='autoplay; encrypted-media'
        allowFullScreen
        title='video'
      />
    </div>
  )
}
