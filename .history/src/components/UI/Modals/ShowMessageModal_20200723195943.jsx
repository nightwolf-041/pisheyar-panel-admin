// this file is /list route Add modal ... its imported in PanelMain component and handle with its header 

import React from 'react';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Fade from '@material-ui/core/Fade';

import moduleClasses from './allModals.module.css'

// let width
// if(window.innerWidth > 1025) {
//   width = '34rem'
// } else{
//   width = '80%'
// }

// let left
// if(window.innerWidth > 1025) {
//   left = 'calc(50% - 17rem)'
// } else{
//   left = '10%'
// }

const styles = makeStyles(theme => ({
  infoModalBackdrop: {
    position: 'fixed',
    left:0,
    top: 0,
    display: 'block',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 450
  },
  infoModalBackdropHidden: {
    position: 'none',
    left:0,
    top: 0,
    display: 'none',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: -50
  },
//   modal: {
//     position: 'fixed',
//     top: '15vh',
//     // left: '25%',
//     left: left,
//     height: '70vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: width,
//     zIndex: 500,
//   },
//   modalHidden: {
//     position: 'none',
//     top: 0,
//     left: 0,
//     height: '100vh',
//     display: 'none',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: width,
//     zIndex: -50,
//   },
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: 'none',
    width: '100%',
    maxWidth: '1000px',
    height: '100%',
    borderRadius: '4px',
    margin: '0 auto',
    overflowX: 'hidden'
  },
  paperInside: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(3, 3, 3),
  },
  title: {
    textAlign: 'left',
    marginTop: '10px',
    marginBottom: '15px',
    fontSize: '1.2rem'
  },
  description: {
    textAlign: 'left',
    width: '100%',
    marginTop: '5px',
    marginBottom: '20px',
    color: 'rgba(11, 16, 51, 0.75)',
    fontSize: '0.9rem',
    lineHeight: '25px'
  },
}));

function ShowMessageModal(props) {

  const classes = styles();
  
  return (
    <>
    <div onClick={props.hideMessageModal}
    className={props.showMessageModal ? 
      classes.infoModalBackdrop : 
      classes.infoModalBackdropHidden}>
    </div>

    <div className={props.showMessageModal ? moduleClasses.modal : moduleClasses.modalHidden}>
        <Fade in={props.showMessageModal}>
            <div className={classes.paper}>
                <PerfectScrollbar>
                    <div className={classes.paperInside}>
                        <h6 className={classes.title}>پیام ارسالی</h6>
                        <p className={classes.description}>
                            {props.message}
                        </p>
                    </div>
                </PerfectScrollbar>
            </div>
        </Fade>
    </div>
    </>
  );
}

const mapState = state => {
  return {
    token: state.authReducer.token
  }
}

export default connect(mapState)(ShowMessageModal);