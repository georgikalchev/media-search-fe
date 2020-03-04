import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

const ImagePreview = ({data}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const calculateImageSize = (imageWidth, imageHeight) => {
    const innerW = window.innerWidth
    const innerH = window.innerHeight
    const ratio = imageWidth / imageHeight
    if (innerH > innerW) {
      return {width: innerW * 0.7 * ratio, height: innerW * 0.7}
    } else {
      return {width: innerH * 0.7 * ratio, height: innerH * 0.7}
    }
  }

  const [imageSize, setImageSize] = useState(() => {
      if (data.image) {
        return calculateImageSize(data.image.width, data.image.height)
      }
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  )
  const handleResize = (id) => {
    if (id.value === null) {
      id.value = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        })
        id.value = null
      }, 120)
    }
  }
  useEffect(() => {
    if (data.image) {
      setImageSize(calculateImageSize(data.image.width, data.image.height))
    }
  }, [dimensions, data.image])

  useEffect(() => {
    const id = {value: null}
    window.addEventListener('resize', () => handleResize(id))
    return () => {
      window.removeEventListener('resize', () => handleResize(id))
    }
  }, [])

  return (
    <div className={styles.preview}>
      {data.image ? <>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(${data.image && data.image.link})`,
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`
          }}
          title={data.title}/>
        <div className={styles.p} dangerouslySetInnerHTML={{__html: data.title}}/>
      </> : <h1>SORRY WE CAN'T DISPLAY THE IMAGE</h1>
      }
    </div>

  )
}

export default ImagePreview