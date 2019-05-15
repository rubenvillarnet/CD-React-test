import React, { Component } from 'react'
import {connect} from 'react-redux';
import {dismissUser} from "../lib/redux/actions"
import DataProvider from "../lib/dataProvider"


class UserDetail extends Component {
  constructor(props){
    super(props)
    this.data = new DataProvider()
  }

  closeUserInfo(e){
    e.preventDefault()
    this.props.dismissUser()
  }

  editUser(e){
    e.preventDefault()

    this.data.edituser({
      id: this.props.userInfo.id,
      name: this.name.value,
      job: this.job.value
    }).then(editUserData => console.log(editUserData))
    this.name.value= ""
    this.job.value= ""
  }

  render() {
    const { email, first_name, last_name, avatar } = this.props.userInfo
    return (
      <div>
        <h1>User info</h1>
        <img src={avatar} alt={first_name}/>
        <ul>
          <li>Email: {email}</li>
          <li>First name: {first_name}</li>
          <li>Last name: {last_name}</li>
        </ul>

        <form onSubmit={e => this.editUser(e)}>
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
        <button type="submit">Edit user</button>
        </form>

        <button onClick={e => this.closeUserInfo(e)}>Close</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { userInfo } = state
  return { userInfo };
};

const mapDispatchToProps = {
  dismissUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
