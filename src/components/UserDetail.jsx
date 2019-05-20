import React, { Component } from 'react'
import {connect} from 'react-redux';
import {dismissUser, showSnackbar} from "../lib/redux/actions"
import DataProvider from "../lib/dataProvider"
import { Button, Typography, List, ListItem, ListItemText, FormControl, InputLabel, Input } from '@material-ui/core';


class UserDetail extends Component {
  constructor(props){
    super(props)
    this.data = new DataProvider()
    this.state={
      edit: false,
    }
  }

  closeUserInfo(e){
    e.preventDefault()
    this.props.dismissUser()
  }

  editUser(e){
    e.preventDefault()
    const {name, job} = e.currentTarget.elements
    this.data.edituser({
      id: this.props.userInfo.id,
      name: name.value,
      job: job.value
    }).then(editUserData => {
      if(editUserData.status === 200){
        const timestamp = new Date(editUserData.data.updatedAt)
        const now = `${timestamp.getHours()}:${(timestamp.getMinutes()<10?'0':'')}${timestamp.getMinutes()}`
        this.props.showSnackbar(`User updated at ${now}`)
      }else{
        this.props.showSnackbar(`Something wrong has happened. Status: ${editUserData.status}`)
      }
    })
    name.value= ""
    job.value= ""
    this.toggleEdit()
  }

  toggleEdit(){
    this.setState({
      ...this.state,
      edit: !this.state.edit
    })
  }

  render() {
    const { email, first_name, last_name, avatar } = this.props.userInfo
    return (
      <div>
        <Typography variant="h5">User info</Typography>
        <img src={avatar} alt={first_name}/>
        {this.state.edit?
          <form onSubmit={e => this.editUser(e)}>
            <FormControl className="form-control">
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                required={true}
                type="text"
                id="name"/>
            </FormControl>
            <FormControl className="form-control">
          <InputLabel htmlFor="job">Job</InputLabel>
          <Input 
            required={true}
            type="text"
            id="job"
            />
        </FormControl>
        <Button
          type="submit"
          color="primary"
          variant="contained">
          Update User
        </Button>
          </form>
          :<List>
          <ListItem><ListItemText primary="Email:" secondary={email}/> </ListItem>
          <ListItem><ListItemText primary="First name:" secondary={first_name}/></ListItem>
          <ListItem><ListItemText primary="Last name:" secondary={last_name}/></ListItem>
        </List>}
        
        <Button
          variant="contained"
          color="primary"
          onClick={e=> this.toggleEdit()}
          >{this.state.edit?"Cancel":"Edit"}</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={e => this.closeUserInfo(e)}
          >Close</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { users } = state
  return { userInfo: users.userInfo };
};

const mapDispatchToProps = {
  dismissUser,
  showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
