import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, CircularProgress} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

  const slideOrder = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

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
            نمایش پست در اسلایدر
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="slideOrder-native-simple">ترتیب</InputLabel>
            <Select
              native
              value={props.slideOrder}
              onChange={props.slideOrderChange}
              inputProps={{
                name: 'slideOrder',
                id: 'slideOrder-native-simple',
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <div className={classes.wrapper}>
              <Button
                  variant="contained"
                  className={classes.buttonDanger}
                  disabled={props.changeInSliderLoading}
                  onClick={props.chekoutOfSliderHandler}
                  >
                  عدم نمایش
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
                  نمایش
              </Button>
              {props.changeInSliderLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}