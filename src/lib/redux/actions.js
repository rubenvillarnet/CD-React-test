import DataProvider from "../dataProvider"

const data = new DataProvider()

export const nextPage = () => {
  return {
    type: "NEXT_PAGE",
    cty: 1
  }
}

export const prevPage = () => {
  return {
    type: "PREV_PAGE", 
    cty: -1
  }
}

export const login = userInfo =>{
  return {
    type: "LOGIN",
    userInfo
  }
}

export const dismissUser = () =>{
  return {
    type: "DISMISS_USER",
    setToNull: null
  }
}

export const listUsers = page =>{
  return dispatch => {
    return data.listUsers(page)
    .then(userData => dispatch({type:"LIST_USERS", userData}))
  }
}

export const getUser = page =>{
  return dispatch => {
    return data.getUser(page)
    .then(userInfo => dispatch({type:"GET_USER", userInfo: userInfo.data}))
  }
}
