// this file is /list route Add modal ... its imported in PanelMain component and handle with its header 

import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { DatePicker } from "jalali-react-datepicker";
import {Modal, Button, CircularProgress, Select, FormControl, InputLabel, Input, MenuItem } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField, Divider} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {FormControlLabel, Switch, Button, CircularProgress, TextField } from '@material-ui/core'

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';

import './allModals.css'


registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateType
  );


let width
if(window.innerWidth > 992) {
  width = '100%'
} else{
  width = '100%'
}

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
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    zIndex: 500,
  },
  modalHidden: {
    position: 'none',
    top: 0,
    left: 0,
    height: '100vh',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    zIndex: -50,
  },
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: 'none',
    width: '90%',
    maxWidth: '1000px',
    height: 'auto',
    // maxHeight: '95vh',
    padding: theme.spacing(0, 0, 3),
    borderRadius: '4px',
    margin: '0 auto',
    overflowX: 'hidden'
  },
  paperInside: {
    width: '100%',
    height: 'auto',
    maxHeight: '90vh',
    padding: theme.spacing(3, 3, 3),
  },
  closeIocn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    color: 'red',
    cursor: 'pointer'
  },
  title: {
    textAlign: 'left',
    marginTop: '10px',
    marginBottom: '15px'
  },
  fontfamily: {
    fontFamily: 'Yekan'
  },
  formControl: {
    direction: 'rtl',
    marginTop: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
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
  textRight: {
      textAlign: 'right'
  },
  margin: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  marginBottom: {
    marginBottom: '30px'
  },
  textareaAutosize: {
    direction: 'rtl',
    width: '100%',
    minHeight: '100px',
    maxHeight: '250px',
    padding: theme.spacing(1),
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
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  inputs: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  titleMarginTop: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  switchBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}));


function DiscountCreateModal(props) {

  const [discountTypes, setDiscountTypes] = React.useState([]);

  const [discountName, setDiscountName] = React.useState('');
  const [discountValue, setDiscountValue] = React.useState('');
  const [discountType, setDiscountType] = React.useState('');
  const [discountTypeGuid, setDiscountTypeGuid] = React.useState('');
  const [discountExpire, setDiscountExpire] = React.useState('');
  const [discountCreateEmptyError, setDiscountCreateEmptyError] = React.useState(false);
  const [discountCreateLoading, setDiscountCreateLoading] = React.useState(false);

  let pond = React.useRef()
  let datePicker = React.useRef()
  const classes = styles();

  useEffect(() => {
    axiosConfig.get('/Code/GetCodesByCodeGroupGuid?guid=43f6d743-3e89-4c5a-9971-625d7648ebdb', {
        headers: { Authorization: "Bearer " + props.token }
    }).then(res => {
        console.log(res.data.codes);
        setDiscountTypes(res.data.codes)
    })
  }, [])

  const discountCreateHandler = () => {

    if(discountName !== '' || discountName !== ' ' || discountName !== null || discountValue !== '' || discountValue !== ' ' || discountValue !== null || discountType !== '' || discountType !== ' ' || discountType !== null || discountExpire !== '' || discountExpire !== ' ' || discountExpire !== null ) {

        setDiscountCreateLoading(true)
        setDiscountCreateEmptyError(false)
        
        axiosConfig.post('/Discount/CreatePublicDiscount', {
            name: discountName,
            value: discountValue,
            typeCodeGuid: discountTypeGuid,
            expirationDate: discountExpire
        }, {
            headers: { Authorization: "Bearer " + props.token }
        }).then(res => {
            console.log(res.data);
            setDiscountCreateLoading(false)
            if(res.data.state === 1) {
                toast('عملیات موفقیت آمیز', {type: toast.TYPE.SUCCESS});
                props.hideDiscountCreateModal()
                props.reloadDataAfterCreate()
            }else{
                toast(res.data.message, {type: toast.TYPE.ERROR});
            }
        }).catch(err => {
            setDiscountCreateLoading(false)
            toast('خطای شبکه', {type: toast.TYPE.ERROR});
        })
    }else if(discountValue >= 4) {

    }else{
        setDiscountCreateEmptyError(true)
        toast('لطفا مقادیر را پر کنید', {type: toast.TYPE.WARNING});
    }
  }

  const discountNameInputHandler = e => {
    setDiscountName(e.target.value)
  }

  const discountValueInputHandler = e => {
    setDiscountValue(e.target.value)
  }

  const discountTypeChangeHandler = e => {
    let {value} = e.target
    for (let type in discountTypes) {
        let typeDisplayName = discountTypes[type].displayName
        let typeGuid = discountTypes[type].codeGuid
        if(e.target.value === typeDisplayName){
          setDiscountTypeGuid(typeGuid)
          value = typeGuid
        }else{
          setDiscountTypeGuid(e.target.value)
          value = value
        }
    }
    setDiscountType(value)
  }

  const discountExpireInputHandler = val => {
    setDiscountExpire(val.value._d)
  }

  return (
    <>
    <div className={props.showDiscountCreateModal ? 
      classes.infoModalBackdrop : 
      classes.infoModalBackdropHidden}
      onClick={props.hideDiscountCreateModal}>
    </div>
    <div>
      <div className={props.showDiscountCreateModal ? classes.modal : classes.modalHidden}>
      
        <Fade in={props.showDiscountCreateModal}>
        
          <div className={classes.paper}>
          <PerfectScrollbar>
            <div className={classes.paperInside}>
            <Close className={classes.closeIocn} onClick={props.hideDiscountCreateModal} />

                <h5 id="transition-modal-title" className={classes.title}>افزودن ادمین</h5>
                <Divider id="transition-modal-divider" className={classes.marginBottom}/>

                <TextField
                label="نام"
                className={[classes.inputs, "inputsDir", classes.titleMarginTop].join(' ')}
                id="discountname"
                variant="outlined"
                onChange={(e) => discountNameInputHandler(e)}
                />

                <TextField
                label="مقدار"
                className={[classes.inputs, "inputsDirCenter", classes.titleMarginTop].join(' ')}
                id="discountvalue"
                variant="outlined"
                onChange={(e) => discountValueInputHandler(e)}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="discountType">نوع تخفیف</InputLabel>
                    <Select
                    labelId="discountType"
                    id="discountType11"
                    label="نوع تخفیف"
                    className="textRight"
                    value={discountType}
                    onChange={discountTypeChangeHandler}
                    >
                    {discountTypes !== null && discountTypes !== undefined  ?
                    discountTypes.map((type, index) => (
                        <MenuItem key={index} className="textRight" value={type.displayName}>
                            {type.displayName}
                        </MenuItem>
                    ))
                    : null}
                    </Select>
                </FormControl>

                <h6 id="discount-label" className="discountDatepickerLabel">تاریخ انقضا</h6>
                <DatePicker ref={datePicker}
                className="discountDatepicker"
                onClickSubmitButton={val => discountExpireInputHandler(val)} />

                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonSuccess}
                        disabled={discountCreateLoading}
                        onClick={() => discountCreateHandler()}
                        >
                        ارسال
                    </Button>
                    {discountCreateLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </div>
            </PerfectScrollbar>

          </div>
        </Fade>
        </div>
    </div>

    {/* <ToastContainer autoClose={4000}
    position={toast.POSITION.BOTTOM_LEFT}
    hideProgressBar={false}
    closeOnClick={true}
    pauseOnVisibilityChange={false}
    pauseOnHover={false}
    rtl={true} /> */}
    </>
  );
}

const mapState = state => {
  return {
    token: state.authReducer.token
  }
}

export default connect(mapState)(DiscountCreateModal);