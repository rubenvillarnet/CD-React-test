import React, { Component } from 'react'
import {connect} from 'react-redux';
import {nextPage, prevPage, listUsers, getUser, dismissUser, showSnackbar} from "../lib/redux/actions"
import { Redirect } from 'react-router-dom'
import UserDetail from './UserDetail';
import DataProvider from "../lib/dataProvider"

import AppBar from '@material-ui/core/AppBar';
import { Typography, Avatar, Toolbar, Drawer, FormControl, InputLabel, Input, Button, Paper,Table,  TableHead, TableRow, TableCell, TableBody, Modal } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';


class Content extends Component {
  constructor(props){
    super(props)
    this.data = new DataProvider()
    this.state = {
      rightDrawer: false
    }
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
    const { name, job } = e.currentTarget.elements
    this.data.newUser({
      name: name.value,
      job: job.value
    }).then(newUserData => {
      this.toggleDrawer(false)
      if(newUserData.status === 201){
        const timestamp = new Date(newUserData.data.createdAt)
        const now = `${timestamp.getHours()}:${(timestamp.getMinutes()<10?'0':'')}${timestamp.getMinutes()}`
        this.props.showSnackbar(`User created at ${now} with id ${newUserData.data.id}`)
      }else{
        this.props.showSnackbar(`Something wrong has happened. Status: ${newUserData.status}`)
      }
    })
    name.value= ""
    job.value= ""
  }

  toggleDrawer(shown){
    this.setState({
      ...this.state,
      rightDrawer: shown
    })
  }

  render() {
    if(!this.props.user) return <Redirect to='/' />
    return (
      <div className="content">
        <AppBar position="static" >
        <Toolbar className="top-bar">
        <Typography variant="h6" className="title">React Test</Typography>
        <div className="user-info">
          <Typography variant="body1" className="welcome">Welcome, {this.props.user.name}</Typography>
          <Avatar alt={this.props.user.name} src={this.props.user.picture.data.url} className="avatar"/>
        </div>
        </Toolbar>
        </AppBar>
        <Typography component="h1" variant="h3" >Users list</Typography>
        {this.props.userData.data?
        <div>
          <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Second Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.userData.data.map(user =>{
                return <TableRow key={user.id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell><Button onClick={e => this.showUserInfo(e, user.id)}>Info</Button></TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
          <div>
          <Typography variant="caption">Page {this.props.userData.page} of {this.props.userData.total_pages}</Typography>
          {this.props.userData.page > 1? <Button onClick={()=>this.changePage("prev")}>Prev</Button>:null}
        {this.props.userData.page < this.props.userData.total_pages? <Button onClick={()=>this.changePage("next")}>Next</Button>
        :null}
          </div>
        </Paper>
          
        <Fab 
          variant="extended" 
          color="primary" 
          aria-label="Add" 
          className="new-user-button"
          onClick={()=>this.toggleDrawer(true)}>
          <AddIcon />
          New User
        </Fab>
        <Drawer
        anchor="right"
        open={this.state.rightDrawer}
        onClose={()=>this.toggleDrawer(false)}>
        <div className="new-user-container">
        <Typography component="h2" variant="h6" align="center">Create new user</Typography>
        <form 
          className="new-user-form"
          onSubmit={e => this.createUser(e)}>
        <FormControl className="form-control">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input 
            type="text"
            id="name"
            />
        </FormControl>
        <FormControl className="form-control">
          <InputLabel htmlFor="job">Job</InputLabel>
          <Input 
            type="text"
            id="job"
            />
        </FormControl>
        <Button
          type="submit"
          color="primary"
          variant="contained">
          Create User
        </Button>
        </form>
        <Fab 
          color="secondary" 
          className="close-button"
          onClick={()=>this.toggleDrawer(false)}>
        <CloseIcon/>
      </Fab>
        </div>
        </Drawer>
          </div>
         :<p>Loading...</p>}
         <Modal
          open={!!this.props.userInfo}
          onClose={()=> this.props.dismissUser()}>
          <Paper>
          {this.props.userInfo?<UserDetail />:null}
          </Paper>
         </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = {
  nextPage,
  prevPage,
  listUsers,
  getUser,
  dismissUser,
  showSnackbar
}

const mapStateToProps = state => {
  const { auth, pagination, users } = state
  return {
    user: auth.user,
    page: pagination.page,
    userData: users.userData,
    userInfo: users.userInfo
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Content)
