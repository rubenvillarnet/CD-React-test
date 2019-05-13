import React, { Component } from 'react'
import {connect} from 'react-redux';
import {increment, decrement} from "../lib/redux/actions"
import { Redirect } from 'react-router-dom'




class Content extends Component {
  render() {
    if(!this.props.user) return <Redirect to='/' />
    return (
      <div>
     
      </div>
    )
  }
}

export default connect((state => state), {increment, decrement})(Content)
