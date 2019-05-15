import { combineReducers } from 'redux'
import {auth} from './auth'
import {pagination} from './pagination'
import {users} from './users'

export default combineReducers({
  auth,
  pagination,
  users
})