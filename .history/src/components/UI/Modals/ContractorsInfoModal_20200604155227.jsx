// this file is /list route Add modal ... its imported in PanelMain component and handle with its header 

import React from 'react';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {Modal, Button, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField, Divider} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {FormControlLabel, Switch, Button, CircularProgress, TextField } from '@material-ui/core'

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Undo from '@ckeditor/ckeditor5-undo/src/undo';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency';
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui';
import ParagraphButtonUI from '@ckeditor/ckeditor5-paragraph/src/paragraphbuttonui';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Font from '@ckeditor/ckeditor5-font/src/font';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import CKfinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder'
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import list from '@ckeditor/ckeditor5-list/src/list';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Blockquote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Codeblock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';


import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
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
  FilePondPluginFilePoster,
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateType
  );


let width
if(window.innerWidth > 1025) {
  width = '50%'
} else{
  width = '80%'
}

let left
if(window.innerWidth > 1025) {
  left = '25%'
} else{
  left = '10%'
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
    top: '15vh',
    // left: '25%',
    left: left,
    height: '70vh',
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
  contractorPaper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: 'none',
    width: '100%',
    maxWidth: '1000px',
    height: '100%',
    // padding: theme.spacing(3, 3, 3),
    borderRadius: '4px',
    margin: '0 auto',
    overflowX: 'hidden'
  },
  contractorPaperInside: {
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
  title2: {
    textAlign: 'left',
    marginTop: '30px',
    marginBottom: '7px',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  contractorProfileImageBox: {
    textAlign: 'center',
    width: '100%',
    height: '120px',
    marginTop: '5px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  contractorProfileImageBoxInside: {
    width: '60%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  contractorProfileImage: {
    width: '100%',
    height: '100%'
  },
  contractorBusiness: {
    textAlign: 'left',
    width: '100%',
    marginTop: '5px',
    marginBottom: '20px',
    color: 'rgba(11, 16, 51, 0.75)',
    fontSize: '0.9rem',
    lineHeight: '23px'
  }, 
  ratingBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  averageRate: {
    textAlign: 'center',
    width: '100%',
    marginTop: '10px',
    marginBottom: '20px',
    color: 'rgba(11, 16, 51, 0.75)',
    fontSize: '0.9rem',
    lineHeight: '23px',
    fontWeight: 'bold'
  }, 
}));

function ContractorsInfoModal(props) {

  const classes = styles();

  console.log(props.contractorInfoModalData);

  let profileImage = null
  if(props.contractorInfoModalData !== null) {
    if(props.contractorInfoModalData.profileImage !== null){
      profileImage = props.contractorInfoModalData.profileImage
    }else{
      profileImage = null
    }
  }

  let business = null
  if(props.contractorInfoModalData !== null) {
    if(props.contractorInfoModalData.business !== null){
      business = props.contractorInfoModalData.business
    }
  }

  let averageRate = null
  if(props.contractorInfoModalData !== null) {
    if(props.contractorInfoModalData.averageRate !== null){
      averageRate = props.contractorInfoModalData.averageRate
    }else{
      averageRate = 0
    }
  }

  let latitude = null
  if(props.contractorInfoModalData !== null) {
    if(props.contractorInfoModalData.latitude !== null){
      latitude = props.contractorInfoModalData.latitude
    }else{
      // latitude = 'چت بسته نشده است'
    }
  }

  let longitude = null
  if(props.contractorInfoModalData !== null) {
    if(props.contractorInfoModalData.longitude !== null){
      longitude = props.contractorInfoModalData.longitude
    }else{
      // longitude = 'چت بسته نشده است'
    }
  }
  
  return (
    <>
    <div onClick={props.hideContractorInfoModal}
    className={props.showContractorInfoModal ? 
      classes.infoModalBackdrop : 
      classes.infoModalBackdropHidden}>
    </div>

    <div className={props.showContractorInfoModal ? classes.modal : classes.modalHidden}>
        <Fade in={props.showContractorInfoModal}>
        
        <div className={classes.contractorPaper}>
            <PerfectScrollbar>
                <div className={classes.contractorPaperInside}>
                    <h5 id="transition-modal-title" className={classes.title}>اطلاعات</h5>
                    <Divider id="transition-modal-divider" className={classes.marginBottom}/>
                    {/* <h5 id="transition-modal-title" className={classes.title2}>:توضیح</h5> */}
                    <div className={classes.contractorProfileImageBox}>
                      <div className={classes.contractorProfileImageBoxInside}>
                      {profileImage !== null ?
                        <img src={profileImage} alt="" className={classes.contractorProfileImage}/> 
                        :
                        'عکسی آپلود نشده است' 
                      }
                      </div>
                    </div>
                    <h5 id="transition-modal-title" className={classes.title2}>:نوع کسب و کار</h5>
                    <p className={classes.contractorBusiness}>
                        {business}
                    </p>
                    <h5 id="transition-modal-title" className={classes.title2}>:امتیاز</h5>
                    <div className={classes.ratingBox}>
                      <Rating 
                      emptySymbol={<FontAwesomeIcon icon={faStar} style={{color: '#ffd41746', fontSize: '1.4rem', margin: '0 0.1rem'}} /> }
                      fullSymbol={<FontAwesomeIcon icon={faStar} style={{color: '#ffd617', fontSize: '1.5rem', margin: '0 0.1rem'}} /> }
                      start={0}
                      stop={5}
                      step={1}
                      initialRating={averageRate}
                      readonly
                      />
                      <p className={classes.averageRate}>
                        {averageRate}
                      </p>
                    </div>
                    <h5 id="transition-modal-title" className={classes.title2}>:ناحیه تحت پوشش</h5>
                    {/* <h4 className={classes.cost}>
                      {cost}
                    </h4> */}
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

export default connect(mapState)(ContractorsInfoModal);