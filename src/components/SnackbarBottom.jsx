import React, { Component } from 'react'
import {connect} from 'react-redux'
import {hideSnackbar} from '../lib/redux/actions'
import PropTypes from 'prop-types';

import { Snackbar, Button } from '@material-ui/core';

class SnackbarBottom extends Component {

  render() {
    const {status, message, hideSnackbar} = this.props
    return (
      <Snackbar 
            anchorOrigin={{
              horizontal: "center",
              vertical: "bottom"}}
            autoHideDuration={10000}
            open= {status}
            onClose= {()=>hideSnackbar()}
            message={message}
            action={[
              <Button
              color="secondary"
              size="small"
              key="undo"
              onClick={()=>hideSnackbar()}
              >Close
              </Button>
            ]}
              />
    )
  }
}

SnackbarBottom.propTypes = {
  status: PropTypes.bool,
  message: PropTypes.string,
  hideSnackbar: PropTypes.func
}

const mapStateToProps = state => {
  const { snackbar } = state
  return { 
    status: snackbar.status,
    message:snackbar.message };
};

const mapDispatchToProps = {hideSnackbar}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarBottom)
