import DataProvider from "../dataProvider"
import {NEXT_PAGE, PREV_PAGE, LOGIN, 
  DISMISS_USER, LIST_USERS, GET_USER, SHOW_SNACKBAR, HIDE_SNACKBAR} from './action-types'

const data = new DataProvider()

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
    cty: 1
  }
}

export const prevPage = () => {
  return {
    type: PREV_PAGE, 
    cty: -1
  }
}

export const login = userInfo =>{
  return {
    type: LOGIN,
    userInfo
  }
}

export const dismissUser = () =>{
  return {
    type: DISMISS_USER,
    setToNull: null
  }
}

export const listUsers = page =>{
  return dispatch => {
    return data.listUsers(page)
    .then(userData => dispatch({type:LIST_USERS, userData}))
  }
}

export const getUser = page =>{
  return dispatch => {
    return data.getUser(page)
    .then(userInfo => dispatch({type:GET_USER, userInfo: userInfo.data}))
  }
}

export const showSnackbar = message => {
  return{
    type: SHOW_SNACKBAR,
    message: message
  }
}

export const hideSnackbar = () =>{
  return{
    type: HIDE_SNACKBAR
  }
}
