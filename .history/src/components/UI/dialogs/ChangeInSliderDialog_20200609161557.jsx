import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, CircularProgress} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { red, green } from '@material-ui/core/colors';

import './categoryDeleteDialog.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const styles = makeStyles(theme => ({
  dialog: {
    margin: 0
  },
  title: {
    fontSize: '0.9rem',
    textAlign: 'left',
    marginBottom: '0.6rem'
  },
  buttonDanger: {
    width: '8rem',
    color: red[500],
   '&:hover': {
    color: red[700],
    boxShadow: 'none',
    backgroundColor: red[100],
    },
    backgroundColor: '#fff',
    boxShadow: 'none'
  },
  buttonActivator: {
    width: '8rem',
    color: green[500],
   '&:hover': {
    color: green[700],
    boxShadow: 'none',
    backgroundColor: green[100],
    },
    backgroundColor: '#fff',
    boxShadow: 'none',
    marginRight: '0.5rem'
  },
  wrapper: {
    position: 'relative',
    backgroundColor: 'none',
    boxShadow: 'none'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


export default function ChangeInSliderDialog(props) {

  const classes = styles();

  return (
    <div>
      <Dialog
        className={classes.dialog}
        open={props.openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.closeDialogHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText className={classes.title} id="alert-dialog-slide-description">
            انتقال از/به اسلایدر
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className={classes.wrapper}>
              <Button
                  variant="contained"
                  className={classes.buttonDanger}
                  disabled={props.changeInSliderLoading}
                  onClick={props.chekoutOfSliderHandler}
                  >
                  خارج کردن
              </Button>
              {props.changeInSliderLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          <div className={classes.wrapper}>
              <Button
                  variant="contained"
                  className={classes.buttonActivator}
                  disabled={props.changeInSliderLoading}
                  onClick={props.addToSliderHandler}
                  >
                  افزودن
              </Button>
              {props.changeInSliderLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}