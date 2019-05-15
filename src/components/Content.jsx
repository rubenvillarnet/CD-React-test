import React, { Component } from 'react'
import {connect} from 'react-redux';
import {nextPage, prevPage, listUsers, getUser} from "../lib/redux/actions"
import { Redirect } from 'react-router-dom'
import UserDetail from './UserDetail';
import DataProvider from "../lib/dataProvider"

class Content extends Component {
  constructor(props){
    super(props)
    this.data = new DataProvider()
  }

  componentDidMount(){
    this.props.listUsers(this.props.page)
  }

  componentDidUpdate(prevProps){
    if(this.props.page !== prevProps.page) this.props.listUsers(this.props.page)
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

  showUserInfo(e, id){
    e.preventDefault()
    this.props.getUser(id)
  }


  createUser(e){
    e.preventDefault()

    this.data.newUser({
      name: this.name.value,
      job: this.job.value
    }).then(newUserData => console.log(newUserData))
    this.name.value= ""
    this.job.value= ""
  }

  render() {
    if(!this.props.user) return <Redirect to='/' />
    return (
      <div>
        <img src={this.props.user.picture.data.url} alt={this.props.user.name}/>
        <p>Bienvenido, {this.props.user.name}</p>
        <form onSubmit={e => this.createUser(e)}>
        <label htmlFor="name">Name</label>
        <input 
          type="text"
          id="name"
          ref={input => this.name = input}/>
        <label htmlFor="job">Job</label>
        <input 
          type="text" 
          id="job"
          ref={input => this.job = input}/>
        <button type="submit">Create User</button>
        </form>
        <h1>Users list</h1>
        {this.props.userData.data?
        <div>
          <ul>
          { this.props.userData.data.map(user =>{
          return <li key={user.id}>{user.first_name} {user.last_name} <button onClick={e => this.showUserInfo(e, user.id)}>info</button></li>
          })}
          </ul>
        <p>Page {this.props.userData.page} of {this.props.userData.total_pages}</p>
        {this.props.userData.page > 1? <button onClick={()=>this.changePage("prev")}>Prev</button>:null}
        {this.props.userData.page < this.props.userData.total_pages? <button onClick={()=>this.changePage("next")}>Next</button>:null}

          </div>
         :<p>Loading...</p>}
         <div>
          {this.props.userInfo?<UserDetail />:null}
         </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  nextPage,
  prevPage,
  listUsers,
  getUser
}

const mapStateToProps = state => {
  const { page, user, userData, userInfo } = state
  return { page, user, userData, userInfo };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content)
