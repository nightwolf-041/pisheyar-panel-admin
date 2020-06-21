// this file is /list route Add modal ... its imported in PanelMain component and handle with its header 

import React from 'react';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {Modal, Button, CircularProgress, TextareaAutosize } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField, Divider, FormControlLabel, Switch} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
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

import classes from './categoriesInfoModal.module.css'
import './categoryAddModal.css'
import './categoryInfoModal.css'

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
    height: '95vh',
    padding: theme.spacing(0, 0, 3),
    borderRadius: '4px',
    margin: '0 auto',
    overflowX: 'hidden'
  },
  paperInside: {
    width: '100%',
    height: '100%',
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
  margin: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  marginBottom: {
    marginBottom: '30px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

function CreateAdvertisementModal(props) {

  const [counter, setCounter] = React.useState(0);
  
  const [documentGuidForCover, setDocumentGuidForCover] = React.useState(null);
  const [fileForCover, setFileForCover] = React.useState([]);
  const [advertisementAbstract, serAdvertisementAbstract] = React.useState('');
  const [advertisementDescription, setAdvertisementDescription] = React.useState('');
  const [checked, setChecked] = React.useState(true);
  const [advertisementCreateLoading, setAdvertisementCreateLoading] = React.useState(false);

  let pond = React.useRef()

  const classes = styles();

  const categoriesSetDetailsHandler = () => {
    setAdvertisementCreateLoading(true)

    axiosConfig.post('/Advertisement/Create', {
        title: advertisementAbstract,
        description: advertisementDescription,
        isShow: checked,
        documentGuid: documentGuidForCover
    }, {
        headers: { Authorization: "Bearer " + this.props.token }
    }).then(res => {
        console.log(res.data);
        setAdvertisementCreateLoading(false)
        if(res.data.state === 1) {

        }else{
            
        }
    }).catch(err => {
        setAdvertisementCreateLoading(false)
    })
  }

  const advertisementAbstractInputHandler = e => {
    serAdvertisementAbstract(e.target.value)
  }

  const advertisementDescriptionInputHandler = e => {
    setAdvertisementDescription(e.target.value)
  }

  const toggleChecked = e => {
    setChecked(checked => !checked)
  }


  return (
    <>
    <div className={props.showInfoModal ? 
      classes.infoModalBackdrop : 
      classes.infoModalBackdropHidden}
      onClick={props.hideInfoModal}>
    </div>
    <div>
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.showInfoModal}
        onClose={props.hideInfoModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      > */}
      <div className={props.showInfoModal ? classes.modal : classes.modalHidden}>
      
        <Fade in={props.showInfoModal}>
        
          <div className={classes.paper}>
          <PerfectScrollbar>
            <div className={classes.paperInside}>
            <Close className={classes.closeIocn} onClick={props.hideInfoModal} />

                <h5 id="transition-modal-title" className={classes.title}>ساخت تبلیغ</h5>
                <Divider id="transition-modal-divider" className={classes.marginBottom}/>

                <FilePond ref={ref => pond = ref}
                    files={fileForCover}
                    // {...ckFileProp}
                    allowMultiple={false}
                    maxFiles={1}
                    checkValidity={true}
                    allowFilePoster={true}
                    allowFileSizeValidation={true}
                    maxFileSize='7MB'
                    labelMaxFileSizeExceeded="حجم فایل زیاد است"
                    labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                    allowImagePreview={true}
                    imagePreviewMaxHeight={300}
                    allowImageValidateSize={true}
                    imageValidateSizeMinWidth={720}
                    imageValidateSizeMaxWidth={2400}
                    imageValidateSizeMinHeight={480}
                    imageValidateSizeMaxHeight={1400}
                    imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                    imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                    imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                    imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                    imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {maxWidth} × {maxHeight}"
                    allowFileTypeValidation={true}
                    acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                    labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                    server = {{
                    url: 'http://185.94.97.164/api/Uploader',
                    process: '/FilepondProcess',
                    revert: {
                        url: '/FilepondRevert',
                        method: 'POST'
                    }
                    }}
                    onprocessfile={(error, file) => setDocumentGuidForCover(file.serverId)}
                    onupdatefiles={(fileItems) => {
                        setFileForCover(fileItems.map(fileItem => fileItem.file))
                    }}
                    labelIdle="عکس را اینجا رها یا کلیک کنید"
                    labelInvalidField="فایل معنبر نیست"
                    labelFileProcessing="درحال بارگذاری"
                    labelFileProcessingError="خطا در بارگذاری"
                    labelFileLoading="درحال بارگیری"
                    labelFileLoadError="خطا در بارگیری"
                    labelFileProcessingComplete="بارگذاری موفق"
                    labelFileProcessingAborted="لغو بارگذاری"
                    labelFileProcessingRevertError="خطا در بازگشتن"
                    labelFileRemoveError="خطا در حذف"

                    labelTapToCancel="لغو"
                    labelTapToRetry="تلاش مجدد"
                    labelTapToUndo="بازگردانی"
                    labelButtonRemoveItem="حذف"
                    labelButtonRetryItemLoad="تلاش مجدد"
                    labelButtonAbortItemProcessing="لغو"
                    labelButtonUndoItemProcessing="بازنشانی"
                    labelButtonRetryItemProcessing="تلاش مجدد"
                    labelButtonProcessItem="بارگذاری"
                    >
                </FilePond>

                <TextField
                label="توضیح مختصر"
                className={[classes.inputs, "inputsDir", classes.titleMarginTop].join(' ')}
                id="InfoBoxAbstract"
                // error={true}
                variant="outlined"
                onChange={(e) => advertisementAbstractInputHandler(e)}
                />

                <TextareaAutosize
                dir="rtl"
                error={true}
                style={{direction: 'rtl'}}
                className={classes.textareaAutosize}
                aria-label="توضیحات تبلیغ"
                placeholder="توضیحات تبلیغ"
                defaultValue=""
                onChange={(e) => advertisementDescriptionInputHandler(e)}
                />

                <div className={classes.switchBox}>
                    <FormControlLabel
                    className={classes.marginTop}
                    control={<Switch checked={checked} color="primary"
                    onChange={toggleChecked} />}
                    label="قابلیت نمایش"
                    />
                </div>

                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonSuccess}
                        disabled={advertisementCreateLoading}
                        onClick={() => categoriesSetDetailsHandler()}
                        >
                        ارسال
                    </Button>
                    {advertisementCreateLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </div>
            </PerfectScrollbar>

          </div>
        </Fade>
        </div>
    </div>

    <ToastContainer autoClose={4000}
    position={toast.POSITION.BOTTOM_LEFT}
    hideProgressBar={false}
    closeOnClick={true}
    pauseOnVisibilityChange={false}
    pauseOnHover={false}
    rtl={true} />
    </>
  );
}

const mapState = state => {
  return {
    token: state.authReducer.token
  }
}

export default connect(mapState)(CreateAdvertisementModal);