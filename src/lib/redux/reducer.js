const initialStore = {
  todos: 0,
  user: null
}

export const rootReducer = (store = initialStore, action) => {
  switch(action.type){
    case 'INCREMENT':
       return {
         ...store,
         todos: store.todos + action.cty
       }
     case 'DECREMENT':
       return {
        ...store,
        todos: store.todos + action.cty
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