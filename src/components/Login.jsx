import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import {login} from "../lib/redux/actions"
import { withRouter} from "react-router-dom"


 class Login extends Component {

responseFacebook(response){
    this.props.login(response)
    this.props.history.push("/content")
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId="662088070885226"
          autoLoad={false}
          fields="name,email,picture"
          callback={(response)=>this.responseFacebook(response)} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    login: loginInfo => dispatch(login(loginInfo))
  }
}

const mapStateToProps = state => {
  return { state: state };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
