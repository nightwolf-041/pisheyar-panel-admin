// this file is settings component of panel in /settings route

import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import axiosConfig from '../../../axiosConfigure/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PanelMainSettingshead from '../../panelMain/panelMainHeads/PanelMainSettingshead'
import PanelMain from '../../panelMain/PanelMain';
import WalletSettingModal from '../../UI/Modals/WalletSettingModal'
import './settingsPage.css'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import HomeIcon from '@material-ui/icons/Home';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import DnsIcon from '@material-ui/icons/Dns';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars, faCog } from '@fortawesome/free-solid-svg-icons'



function TabPanel(props) {
    const { children, value, index, ...other } = props;
return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: 'calc(100% + 30px)',
      marginLeft: '-15px',
      marginTop: '-15px',
      backgroundColor: theme.palette.background.paper,
      fontFamily: 'Yekan'
    },
    body: {
        fontFamily: 'Yekan'
    }
  }));

function SettingsPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [showInitialCreditModal, setShowInitialCreditModal] = React.useState(false);
  const [errorOnInitialCreditModal, setErrorOnInitialCreditModal] = React.useState(false);
  const [errorOnNaNInitialCredit, setErrorOnNaNInitialCredit] = React.useState(false);
  const [initialCreditModalLoading, setInitialCreditModalLoading] = React.useState(false);
  
  const [showRequestsPriceModal, setShowRequestsPriceModal] = React.useState(false);
  const [errorOnNaNRequestsPrice, setErrorOnNaNRequestsPrice] = React.useState(false);
  const [errorOnRequestsPriceModal, setErrorOnRequestsPriceModal] = React.useState(false);
  const [requestsPriceModaLoading, setRequestsPriceModaLoading] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // let variable = "fullWidth"
  // if(window.innerWidth < 1400) {
  //     variable = "scrollable"
  // }

  const showInitialCreditModalHandler = () => {
    setShowInitialCreditModal(true)
  }
  const hideInitialCreditModalHandler = () => {
    setShowInitialCreditModal(false)
    setErrorOnInitialCreditModal(false)
    setErrorOnNaNInitialCredit(false)
    setInitialCreditModalLoading(false)
  }


  const showRequestsPriceModalHandler = () => {
    setShowRequestsPriceModal(true)
  }

  const hideRequestsPriceModalHandler = () => {
    setShowRequestsPriceModal(false)
    setErrorOnRequestsPriceModal(false)
    setErrorOnNaNRequestsPrice(false)
    setRequestsPriceModaLoading(false)
  }
  
  
  const changeInitialCredit = value => {
    let reg = /^\d+$/;
    if(value === '' || value === null || value === undefined){
      setErrorOnInitialCreditModal(true)
    }else if((value !== '' || value !== null || value !== undefined) && !reg.test(value)) {
      setErrorOnNaNInitialCredit(true)
    }else{
      setErrorOnInitialCreditModal(false)
      setErrorOnNaNInitialCredit(false)
      setInitialCreditModalLoading(true)
      axiosConfig.post('/Setting/ChangeUsersInitialCredit', {
        credit: value
      }, {
        headers: { Authorization: "Bearer " + props.token }
      }).then(res => {
        setInitialCreditModalLoading(false)
        if(res.data.state === 1) {
          toast(res.data.message, {type: toast.TYPE.SUCCESS})
        }else{
          toast(res.data.message, {type: toast.TYPE.ERROR})
        }
      }).catch(err => {
        setInitialCreditModalLoading(false)
        toast('خطای شبکه', {type: toast.TYPE.ERROR})
      })
    }
  }

  const changeRequestsPrice = value => {
    let reg = /^\d+$/;
    if(value === '' || value === null || value === undefined){
      setErrorOnRequestsPriceModal(true)
    }else if((value !== '' || value !== null || value !== undefined) && !reg.test(value)) {
      setErrorOnNaNRequestsPrice(true)
    }else{
      setErrorOnRequestsPriceModal(false)
      setErrorOnNaNRequestsPrice(false)
      setRequestsPriceModaLoading(true)
      axiosConfig.post('/Setting/ChangeOrderRequestsPrice', {
        price: value
      }, {
        headers: { Authorization: "Bearer " + props.token }
      }).then(res => {
        setRequestsPriceModaLoading(false)
        if(res.data.state === 1) {
          toast(res.data.message, {type: toast.TYPE.SUCCESS})
        }else{
          toast(res.data.message, {type: toast.TYPE.ERROR})
        }
      }).catch(err => {
        setRequestsPriceModaLoading(false)
        toast('خطای شبکه', {type: toast.TYPE.ERROR})
      })
    }
  }

// render() {
    return (
      <>
        <PanelMain header={<PanelMainSettingshead />} >

          <div className={classes.root} dir="rtl">
            <AppBar position="static" color="default">
              <Tabs
                // centered
                styles={{zIndex: 50}}
                value={value}
                onChange={handleChange}
                variant= "scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs"
              >
                <Tab label="عمومی" icon={<HomeIcon />} {...a11yProps(0)} />
                <Tab label="استان ها" icon={<ImportContactsIcon />} {...a11yProps(1)} />
                <Tab label="کاربران" icon={<PeopleIcon />} {...a11yProps(2)} />
                <Tab label="مالی" icon={<SettingsInputAntennaIcon />} {...a11yProps(3)} />
                <Tab label="سرور" icon={<DnsIcon />} {...a11yProps(4)} />
                <Tab label="پنل" icon={<DashboardIcon />} {...a11yProps(5)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Link to="/categoriesList" className="layout-nav-setting-box-item">
                <div className="layout-nav-setting-box-item-left">
                </div>
                <div className="layout-nav-setting-box-item-right">
                <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                    <p className="layout-nav-setting-box-item-right-text">دسته بندی</p>
                </div>
              </Link>
              <Link to="/codeGroupesList" className="layout-nav-setting-box-item">
                <div className="layout-nav-setting-box-item-left">
                </div>
                <div className="layout-nav-setting-box-item-right">
                <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                    <p className="layout-nav-setting-box-item-right-text">مقادیر اولیه</p>
                </div>
              </Link>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Link to="/provincesList" className="layout-nav-setting-box-item">
                <div className="layout-nav-setting-box-item-left">
                </div>
                <div className="layout-nav-setting-box-item-right">
                <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                    <p className="layout-nav-setting-box-item-right-text">استان ها</p>
                </div>
              </Link>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Link to="/adminsList" className="layout-nav-setting-box-item">
                <div className="layout-nav-setting-box-item-left">
                </div>
                <div className="layout-nav-setting-box-item-right">
                <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                    <p className="layout-nav-setting-box-item-right-text">لیست ادمین</p>
                </div>
              </Link>
              <Link to="/rolesList" className="layout-nav-setting-box-item">
                <div className="layout-nav-setting-box-item-left">
                </div>
                <div className="layout-nav-setting-box-item-right">
                <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                    <p className="layout-nav-setting-box-item-right-text">لیست نقش</p>
                </div>
              </Link>
              <Link to="/permissionsList" className="layout-nav-setting-box-item">
                <div className="layout-nav-setting-box-item-left">
                </div>
                <div className="layout-nav-setting-box-item-right">
                <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                    <p className="layout-nav-setting-box-item-right-text">لیست دسترسی ها</p>
                </div>
              </Link>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <div className="layout-nav-setting-box-item"
              onClick={showInitialCreditModalHandler}>
                <div className="layout-nav-setting-box-item-left">
                </div>
                <div className="layout-nav-setting-box-item-right">
                <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                    <p className="layout-nav-setting-box-item-right-text">شارژ اولیه حساب ها</p>
                </div>
              </div>
              <div className="layout-nav-setting-box-item"
              onClick={showRequestsPriceModalHandler}>
                <div className="layout-nav-setting-box-item-left">
                </div>
                <div className="layout-nav-setting-box-item-right">
                <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                    <p className="layout-nav-setting-box-item-right-text">فی هر سفارش</p>
                </div>
              </div>
              <Link to="/discountList" className="layout-nav-setting-box-item">
                <div className="layout-nav-setting-box-item-left">
                </div>
                <div className="layout-nav-setting-box-item-right">
                <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                    <p className="layout-nav-setting-box-item-right-text">کد تخفیف</p>
                </div>
              </Link>
            </TabPanel>
            <TabPanel value={value} index={4}>
              دسترسی ندارید
            </TabPanel>
            <TabPanel value={value} index={5}>
            <div className="layout-nav-setting-box-item">
              <div className="layout-nav-setting-box-item-left">
                  <div className="layout-nav-setting-box-item-left-plusbox">
                  <FontAwesomeIcon icon={faPlus} className="layout-nav-setting-box-item-left-plus"/>
                  </div>
                  <div className="layout-nav-setting-box-item-left-menubox">
                  <FontAwesomeIcon icon={faBars} className="layout-nav-setting-box-item-left-menu"/>
                  </div>
              </div>
              <div className="layout-nav-setting-box-item-right">
              <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                  <p className="layout-nav-setting-box-item-right-text">محل اصلی</p>
              </div>
          </div>
            </TabPanel>
          </div>

        </PanelMain>

        <WalletSettingModal
        forCredit={true}
        showWalletSettingModal={showInitialCreditModal}
        errorOnWalletSetting={errorOnInitialCreditModal}
        errorOnNaN={errorOnNaNInitialCredit}
        WalletSettingLoading={initialCreditModalLoading}
        hideWalletSettingModal={hideInitialCreditModalHandler}
        changeInitialCredit={initialCreditInputValue => changeInitialCredit(initialCreditInputValue)}
         />

        <WalletSettingModal
        showWalletSettingModal={showRequestsPriceModal}
        errorOnWalletSetting={errorOnRequestsPriceModal}
        errorOnNaN={errorOnNaNRequestsPrice}
        WalletSettingLoading={requestsPriceModaLoading}
        hideWalletSettingModal={hideRequestsPriceModalHandler}
        changeRequestsPrice={requestsPriceInputValue => changeRequestsPrice(requestsPriceInputValue)}
        />

        <ToastContainer
        autoClose={4000}
        position={toast.POSITION.TOP_RIGHT}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnVisibilityChange={false}
        pauseOnHover={false}
        rtl={true} />
        </>
    )
}

const mapState = state => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapState)(SettingsPage)