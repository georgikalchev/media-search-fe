import React from 'react'
import styles from './styles.module.scss'
import { SEARCH_TYPE } from '../../constants'
import { FiXCircle } from 'react-icons/fi'
import { VideoPreview } from '../../components/video-preview'
import ImagePreview from '../../components/image-preview'

const Modal = ({data = {}, closeModal}) => {
  const getPreviewComponent = (data) => {
    switch (data.type) {
      case SEARCH_TYPE.IMAGES: {
        return <ImagePreview data={data}/>
      }
      case SEARCH_TYPE.VIDEOS: {
        return <VideoPreview data={data}/>
      }
      default :
        return <div>DEFAULT</div>
    }
  }
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div dangerouslySetInnerHTML={{__html: data.title}}/>
        <FiXCircle className={styles.close} onClick={closeModal}/></div>
      <div className={styles.content}>
        {getPreviewComponent(data)}
      </div>

    </div>
  )
}

export default Modal