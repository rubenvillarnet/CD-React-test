import {NEXT_PAGE, PREV_PAGE} from '../action-types'

const initialStore = {
  page: 1,
}

export const pagination = (store = initialStore, action) => {
  switch(action.type){
    case NEXT_PAGE:
       return {
         ...store,
         page: store.page + action.cty
       }
     case PREV_PAGE:
       return {
        ...store,
        page: store.page + action.cty
      }
     default:
       return store;
  }
}