import {GET_USER, DISMISS_USER, LIST_USERS} from '../action-types'

const initialStore = {
  userData: [],
  userInfo: null
}

export const users = (store = initialStore, action) => {
  switch(action.type){
      case LIST_USERS:
      return{
        ...store,
        userData: action.userData
      }
      case GET_USER:
      return{
        ...store,
        userInfo: action.userInfo
      }
      case DISMISS_USER:
      return{
        ...store,
        userInfo: action.setToNull
      }
     default:
       return store;
  }
}