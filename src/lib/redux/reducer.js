const initialStore = {
  page: 1,
  user: null,
  userData: [],
  userInfo: null
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
      case 'LIST_USERS':
      return{
        ...store,
        userData: action.userData
      }
      case 'GET_USER':
      return{
        ...store,
        userInfo: action.userInfo
      }
      case "DISMISS_USER":
      return{
        ...store,
        userInfo: action.setToNull
      }
     default:
       return store;
  }
}