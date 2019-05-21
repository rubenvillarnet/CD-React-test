import React, { Component } from 'react'
import { connect } from 'react-redux';

import { AppBar, Toolbar, Typography, Avatar } from '@material-ui/core';

class Topbar extends Component {
  render() {
    const {name, picture} = this.props.user
    return (
      <AppBar position="static" className="Topbar">
        <Toolbar className="top-bar">
          <Typography variant="h6" className="title">React Test</Typography>
          <div className="user-info">
            <Typography variant="body1" className="welcome">Welcome, {name}</Typography>
            <Avatar alt={name} src={picture.data.url} className="avatar" />
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    user: auth.user
  }
};

export default connect(mapStateToProps)(Topbar)
