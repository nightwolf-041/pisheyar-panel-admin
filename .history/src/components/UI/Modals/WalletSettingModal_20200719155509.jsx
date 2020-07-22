// this file is /list route Add modal ... its imported in PanelMain component and handle with its header 

import React from 'react';
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField, Divider} from '@material-ui/core';

import './categoryAddModal.css'


let width
if(window.innerWidth > 992) {
  width = 'calc(100% - 250px)'
} else{
  width = '100%'
}

const styles = makeStyles(theme => ({
  modal: {
    position: 'fixed',
    top: '10%',
    left: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: width
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: 'none',
    width: '90%',
    maxWidth: '500px',
    height: 'auto',
    padding: theme.spacing(2, 2, 2.5),
    borderRadius: '4px',
  },
  title: {
    textAlign: 'left',
    marginTop: '10px',
    marginBottom: '15px'
  },
  topDesc: {
    textAlign: 'left',
    fontFamily: 'Yekan',
    marginTop: '15px'
  },
  fontfamily: {
    fontFamily: 'Yekan'
  },
  // TextFieldd: {

  // },
  TextField: {
    textAlign: 'right',
    direction: 'rtl'
  },
  input: {
    direction: 'rtl',
    textAlign: 'right',
    fontFamily: 'Yekan',
    fontSize: '13px'
  },
  switchpart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Yekan',
    marginTop: '20px',
    marginBottom: '25px',
  },
  switchLable: {
    marginRight: 0
  },
  select: {
    direction: 'rtl',
    textAlign: 'right',
    fontFamily: 'Yekan'
  },
  margin: {
    marginTop: '0px',
    marginBottom: '0px'
  },
  marginBottom: {
    marginBottom: '30px'
  },
  marginBottom2: {
    marginBottom: '20px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
      width: '100%',
      marginTop: theme.spacing(2),
  },
  wrapper: {
    width: '100%',
    marginTop: theme.spacing(3),
    position: 'relative',
  },
  buttonSuccess: {
      width: '100%',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
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

function WalletSettingModal(props) {
    
  const [initialCreditInputValue, setInitialCreditInputValue] = React.useState('');
  const [requestsPriceInputValue, setRequestsPriceInputValue] = React.useState('');

  React.useEffect(() => {
    // if(props.removeInputsValue) {
    //     setInputValue('')
    //   }
    // if(props.)
    axiosConfig.get('/Setting/GetUsersInitialCredit', {
      headers: { Authorization: "Bearer " + props.token }
    }).then(res => {
      if(res.data.state === 1) {
        setInitialCreditInputValue(res.data.credit)
      }else{
        
      }
    })

    axiosConfig.get('/Setting/GetOrderRequestsPrice', {
      headers: { Authorization: "Bearer " + props.token }
    }).then(res => {
      if(res.data.state === 1) {
        setRequestsPriceInputValue(res.data.price)
      }else{

      }
    })

  }, [])

  const renderHeelperText = () => {
    if(props.errorOnNaN === true){
      return 'ورودی باید عدد باشد'
    }else if(props.errorOnWalletSetting === true) {
      return 'الزامیست'
    }else{
      return null
    }
  }

  const renderError = () => {
    if(props.errorOnNaN === true){
      return true
    }else if(props.errorOnWalletSetting === true) {
      return true
    }else{
      return false
    }
  }
  

  const initialCreditInputChangeHandler = (e) => {
    setInitialCreditInputValue(e.target.value)
  }
  const requestsPriceInputChangeHandler = (e) => {
    setRequestsPriceInputValue(e.target.value)
  }

  const classes = styles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.showWalletSettingModal}
        onClose={props.hideWalletSettingModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.showWalletSettingModal}>
            {props.forCredit ?
            <div className={classes.paper}>
                <h5 id="transition-modal-title" className={classes.title}>
                    شارژ اولیه حساب ها
                </h5>
                <Divider id="transition-modal-divider" className={classes.marginBottom}/>
                <TextField fullWidth className={[classes.fontfamily, classes.TextField, classes.marginBottom2].join(' ')}
                    id="wltVal"
                    name='walletValue'
                    label="مقدار"
                    variant="outlined"
                    color="primary"
                    error={renderError()}
                    defaultValue={initialCreditInputValue}
                    helperText={renderHeelperText()}
                    onChange={(e) => initialCreditInputChangeHandler(e)}
                />

                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonSuccess}
                        disabled={props.WalletSettingLoading}
                        onClick={() => props.changeInitialCredit(initialCreditInputValue)}
                        >
                        تغییر
                    </Button>
                    {props.WalletSettingLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>

            </div>
            : 
            <div className={classes.paper}>
                <h5 id="transition-modal-title" className={classes.title}>
                    فی هر سفارش
                </h5>
                <Divider id="transition-modal-divider" className={classes.marginBottom}/>
                <TextField fullWidth className={[classes.fontfamily, classes.TextField, classes.marginBottom2].join(' ')}
                    id="wltVal"
                    name='walletValue'
                    label="مقدار"
                    variant="outlined"
                    color="primary"
                    error={renderError()}
                    defaultValue={requestsPriceInputValue}
                    helperText={renderHeelperText()}
                    onChange={(e) => requestsPriceInputChangeHandler(e)}
                />

                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonSuccess}
                        disabled={props.WalletSettingLoading}
                        onClick={() => props.changeRequestsPrice(requestsPriceInputValue)}
                        >
                        تغییر
                    </Button>
                    {props.WalletSettingLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>

            </div>
            }
        </Fade>
      </Modal>
    </div>
  );
}

const mapState = state => {
  return {
    token: state.authReducer.token
  }
}

export default connect(mapState)(WalletSettingModal);