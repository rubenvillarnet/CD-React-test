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

export const login = (userInfo) =>{
  return {
    type: "LOGIN",
    userInfo
  }
}