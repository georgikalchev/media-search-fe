import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { Header } from './containers/header'
import { TabBody } from './containers/tab-body'
import './constants/constants.scss'
import { UIContext } from './contexts/ui-context'
import Modal from './containers/modal'
import { closeModalAction } from './reducers/ui/ui-actions'

function App () {
  const {ui, uiDispatcher} = useContext(UIContext)
  const handleCloseModal = () => {
    uiDispatcher(closeModalAction())
  }
  return (
    <div className={styles.app}>
      {ui.displayModal && <Modal data={ui.modalData} closeModal={handleCloseModal}/>}
      <Header/>
      <TabBody/>
    </div>
  )
}

export default App
