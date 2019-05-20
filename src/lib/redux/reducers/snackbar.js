import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../action-types'

const initialStore = {
    status: false,
    message: ""
}

export const snackbar = (store = initialStore, action) => {
  switch(action.type){
    case SHOW_SNACKBAR:
      return{
        ...store, 
        status: true,
        message: action.message
      }
    case HIDE_SNACKBAR:
      return{
        ...store,
        status: false,
        message: ""
      }
    default:
      return store
  }
}