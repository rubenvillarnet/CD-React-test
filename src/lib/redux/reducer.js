const initialStore = {
  todos: 0
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
     default:
       return store;
  }
}