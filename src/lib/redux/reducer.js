const initialStore = {
  page: 1,
  user: null
}

export const rootReducer = (store = initialStore, action) => {
  switch(action.type){
    case 'NEXT_PAGE':
       return {
         ...store,
         page: store.page + action.cty
       }
     case 'PREV_PAGE':
       return {
        ...store,
        page: store.page + action.cty
      }
      case 'LOGIN':
      return{
        ...store,
        user: action.userInfo
      }
     default:
       return store;
  }
}