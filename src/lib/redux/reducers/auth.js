import {LOGIN} from '../action-types'

const initialStore = {
  user: null,
}

export const auth = (store = initialStore, action) => {
  switch(action.type){
      case LOGIN:
      return{
        ...store,
        user: action.userInfo
      }
     default:
       return store;
  }
}