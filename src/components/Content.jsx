import React, { Component } from 'react'
import {connect} from 'react-redux';
import {nextPage, prevPage} from "../lib/redux/actions"
import { Redirect } from 'react-router-dom'
import DataProvider from '../lib/dataProvider'


class Content extends Component {

  constructor(props){
    super(props)
    this.data = new DataProvider()
    this.state = {
      userData: null
    }
  }

  getUsers(){
    this.data.listUsers(this.props.page)
    .then(data =>{
      this.setState({
        ...this.state,
        userData: data
      })
    })
  }

  componentDidMount(){
    this.getUsers()

  }

  componentDidUpdate(prevProps){
    if(this.props.page !== prevProps.page) this.getUsers()
  }

  changePage(button){
    switch(button){
      case "prev":
      this.props.prevPage()
      break
      case "next":
      this.props.nextPage()
      break
      default:
      break
    }
  }

  render() {
    /* if(!this.props.user) return <Redirect to='/' /> */
    return (
      <div>
        <h1>Users list</h1>
        {this.state.userData?
        <div>
          { this.state.userData.data.map(user =>{
          return <p key={user.id}>{user.first_name}</p>
        })}
        <p>Page {this.state.userData.page} of {this.state.userData.total_pages}</p>
        {this.state.userData.page > 1? <button onClick={()=>this.changePage("prev")}>Prev</button>:null}
        {this.state.userData.page < this.state.userData.total_pages? <button onClick={()=>this.changePage("next")}>Next</button>:null}

          </div>
         :<p>Loading...</p>}

      </div>
    )
  }
}

const mapDispatchToProps = {
  nextPage,
  prevPage
}

const mapStateToProps = state => {
  const { page, user } = state
  return { page, user };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content)
