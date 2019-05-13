import React, { Component } from 'react'
import {connect} from 'react-redux';
import {increment, decrement} from "../lib/redux/actions"
import { Redirect } from 'react-router-dom'



class Content extends Component {
  render() {
    if(!this.props.user) return <Redirect to='/' />
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

export default connect((state => state), {increment, decrement})(Content)
