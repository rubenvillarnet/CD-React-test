import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import {login} from "../lib/redux/actions"
import { withRouter} from "react-router-dom"

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class Login extends Component {

async responseFacebook(response){
    this.props.login(response)
    this.props.history.push("/content")
  }

  render() {
    return (
      <div className="Login">
      <Paper className="login-box">
      <Typography component="h1" variant="h4" className="login-title">React test</Typography>
        <Typography variant="body1" className="login-subtitle">Please log in to continue</Typography>
        <FacebookLogin
          appId="662088070885226"
          autoLoad={false}
          fields="name,email,picture"
          callback={(response)=>this.responseFacebook(response)} />
          </Paper>
      </div>


    )
  }
}

const mapDispatchToProps = {
  login
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
