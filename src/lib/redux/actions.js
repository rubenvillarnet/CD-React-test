export const increment = () => {
  return {
    type: "INCREMENT",
    cty: 1
  }
}


export const decrement = () => {
  return {
    type: "DECREMENT", 
    cty: -1
  }
}