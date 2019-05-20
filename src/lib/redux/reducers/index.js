import { combineReducers } from 'redux'
import {auth} from './auth'
import {pagination} from './pagination'
import {users} from './users'
import {snackbar} from './snackbar'

export default combineReducers({
  auth,
  pagination,
  users,
  snackbar
})