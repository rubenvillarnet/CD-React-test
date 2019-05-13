import React, { Component } from 'react'
import {connect} from 'react-redux';
import {increment, decrement} from "../lib/redux/actions"



class Todos extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Todos list</h1>
        <p>Total todos: {this.props.todos}</p>
        <button
        onClick={()=> this.props.increment()}>+</button>
        <br/>
        <button
        onClick={()=> this.props.decrement()}>-</button>
      </div>
    )
  }
}

export default connect((state => state), {increment, decrement})(Todos)
