import { createStore, applyMiddleware } from 'redux'
//import { rootReducer } from './reducer.js';
import reducer from './reducers'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
      ))