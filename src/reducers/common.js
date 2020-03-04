import { SF_TASK_DATA } from '../constants'

const getAllData = () => {
  const localData = sessionStorage.getItem(SF_TASK_DATA)
  return localData ? JSON.parse(localData) : {}
}
export const getSavedData = (key) => {
  return getAllData()[key]
}

export const saveData = (key, data) => {
  const allSavedData = getAllData()
  allSavedData[key] = data
  sessionStorage.setItem(SF_TASK_DATA, JSON.stringify(allSavedData))
}