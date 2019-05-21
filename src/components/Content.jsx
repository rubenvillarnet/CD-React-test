import React, { Component } from 'react'
import { connect } from 'react-redux';
import { nextPage, prevPage, listUsers, getUser, dismissUser, showSnackbar } from "../lib/redux/actions"
import { Redirect } from 'react-router-dom'
import UserDetail from './UserDetail';
import Topbar from './Topbar';
import DataProvider from "../lib/dataProvider"
import classNames from 'classnames'
import PropTypes from 'prop-types';


import {
  Typography, Drawer, FormControl, InputLabel,
  Input, Button, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, Modal, Fab
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';


class Content extends Component {
  constructor(props) {
    super(props)
    this.data = new DataProvider()
    this.state = {
      rightDrawer: false
    }
  }

  componentDidMount() {
    this.props.listUsers(this.props.page)
  }

  componentDidUpdate(prevProps) {
    if (this.props.page !== prevProps.page) this.props.listUsers(this.props.page)
  }

  changePage(button) {
    switch (button) {
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

  showUserInfo(e, id) {
    e.preventDefault()
    this.props.getUser(id)
  }

  createUser(e) {
    e.preventDefault()
    const { name, job } = e.currentTarget.elements
    this.data.newUser({
      name: name.value,
      job: job.value
    }).then(newUserData => {
      this.toggleDrawer(false)
      if (newUserData.status === 201) {
        const timestamp = new Date(newUserData.data.createdAt)
        const now = `${timestamp.getHours()}:${(timestamp.getMinutes() < 10 ? '0' : '')}${timestamp.getMinutes()}`
        this.props.showSnackbar(`User created at ${now} with id ${newUserData.data.id}`)
      } else {
        this.props.showSnackbar(`Something wrong has happened. Status: ${newUserData.status}`)
      }
    })
    name.value = ""
    job.value = ""
  }

  toggleDrawer(shown) {
    this.setState({
      ...this.state,
      rightDrawer: shown
    })
  }

  render() {

    const { user, userData, userInfo} = this.props

    if (!user) return <Redirect to='/' />
    return (
      <React.Fragment>
       <Topbar />
        <div className="Content">
          {userData.data ?
            <div className="table-container">
              <Typography component="h1" variant="h4" className="title">Users list</Typography>
              <Paper className="paper">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="row-title">First Name</TableCell>
                      <TableCell className="row-title">Second Name</TableCell>
                      <TableCell className="row-title">More Info</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.data.map(user => {
                      return <TableRow key={user.id}>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell><Button 
                          onClick={e => this.showUserInfo(e, user.id)}
                          color="primary"><AddIcon />Info</Button></TableCell>
                      </TableRow>
                    })}
                  </TableBody>
                </Table>
              </Paper>
                <div className="table-pagination">
                <Button 
                  variant="outlined" color="primary"
                  onClick={() => this.changePage("prev")}
                  className = {classNames({"hide-button": userData.page === 1})}
                  >Prev</Button> 
                <Typography variant="caption">Page {userData.page} of {userData.total_pages}</Typography>
                <Button 
                  variant="outlined" color="primary"
                  onClick={() => this.changePage("next")}
                  className = {classNames({"hide-button": userData.page === userData.total_pages})}
                  >Next</Button>
                </div>

              <Fab
                variant="extended"
                color="primary"
                aria-label="Add"
                className="new-user-button"
                onClick={() => this.toggleDrawer(true)}>
                <AddIcon />
                New User
              </Fab>
              <Drawer
                className="drawer"
                anchor="right"
                open={this.state.rightDrawer}
                onClose={() => this.toggleDrawer(false)}>
                <div className="new-user-container">
                  <Paper className="form-container">
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
                  </Paper>
                  <Fab
                    color="secondary"
                    className="close-button"
                    onClick={() => this.toggleDrawer(false)}>
                    <CloseIcon />
                  </Fab>
                </div>
              </Drawer>
            </div>
            : <p>Loading...</p>}
          <Modal
            open={!!userInfo}
            onClose={() => this.props.dismissUser()}
            className="modal-overlay">
            <Paper className="modal-box">
              {userInfo ? <UserDetail /> : null}
            </Paper>
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}

Content.propTypes = {
  user: PropTypes.object,
  page: PropTypes.number,
  userData: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string
    })),
    page: PropTypes.number,
    total_pages: PropTypes.number
  }),
  userInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  nextPage: PropTypes.func,
  prevPage: PropTypes.func,
  listUsers: PropTypes.func,
  getUser: PropTypes.func,
  dismissUser: PropTypes.func,
  showSnackbar: PropTypes.func 
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
