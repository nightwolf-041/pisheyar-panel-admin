// this file is main sidebar of panel and includes all links to routes 

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import anime from 'animejs'
import * as layoutActionCreators from '../../storeConfigure/actionCreators/layoutActionCreators'
import * as authActionCreators from '../../storeConfigure/actionCreators/authActionCreators'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Ripples from 'react-ripples'

import classes from './panelSidebar.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faUser, faCog, faSignOutAlt, faAngleLeft, faTachometerAlt, faFolder, faComments } from '@fortawesome/free-solid-svg-icons'

import avatar from '../../assets/images/male.png'

import './panelSidebar.css'
import axiosConfig from '../../axiosConfigure/axiosConfig';
import { toast } from 'react-toastify';

import maleAvatar from '../../assets/images/male.png'
import femaleAvatar from '../../assets/images/female.png'

class PanelSidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: null,
            userGender: null,
            dropdownToggleClass: false,
            activeLineBefore: null,
            activeClass: this.props.history.location.pathname === '/' ? "lone" : null,
            toggleAngleIcon: false,
            showSettingDropdown: false,
            itemsInSidebar: [
                {
                    name: 'داشبورد', id: 'one',
                    linksInDrop: [
                        { name: 'صفحه اصلی', id: 'lone', path: '/' },
                        { name: 'تغییر رمز', id: 'ltwo', path: '/change' },
                        { name: 'ساخت پست', id: 'lthree', path: '/postCreate' },
                        { name: 'لیست سفارش ها', id: 'lseven', path: '/ordersList' },
                        // { name: 'دسته بندی ها', id: 'lnine', path: '/categoriesList' }
                    ]
                },
                {
                    name: 'مدیریت کاربران', id: 'two',
                    linksInDrop: [
                        { name: 'لیست سرویس دهنده ها', id: 'lone', path: '/contractorsList' },
                        { name: 'لیست سرویس گیرنده ها', id: 'ltwo', path: '/clientsList' },
                    ]
                },
                {
                    name: 'مدیریت مالی', id: 'three',
                    linksInDrop: [
                        { name: 'گزارشات مالی', id: 'lone', path: '/financialReport' },
                        { name: 'لیست تراکنش ها', id: 'ltwo', path: '/paymentsList' },
                    ]
                },
                {
                    name: 'مدیریت بلاگ', id: 'four',
                    linksInDrop: [
                        { name: 'لیست پست ها', id: 'lone', path: '/postsList' },
                        { name: 'لیست منتخبین سردبیر', id: 'ltwo', path: '/suggestedPostsList' },
                        { name: 'لیست اسلایدر', id: 'lthree', path: '/sliderPostsList' },
                        { name: 'لیست تبلیغات', id: 'lfour', path: '/advertisementsList' },
                    ]
                },
                {
                    name: 'پشتیبانی', id: 'five',
                    linksInDrop: [
                        { name: 'انتقادات و پیشنهاد ها', id: 'lone', path: '/suggestionList' },
                        { name: 'شکایات', id: 'ltwo', path: '/complaintsList' },
                        { name: 'ارتباط با ما', id: 'lthree', path: '/contactUsList' },
                    ]
                },
                { name: 'تنظیمات', id: 'six', fa: faCog, path: '/settings' },
            ]
        }
        this.asideRef = React.createRef()
        this.dashDropRef = React.createRef()
        this.dashDropsLinksRef = React.createRef()
    }


    componentDidMount() {
        if (window.innerWidth > 992) {
            this.props.onHideHamburger()
        }
        axiosConfig.get('/Account/GetCurrentAdminUser', {
            headers: { Authorization: "Bearer " + this.props.token }
        })
        .then(res => {
            if(res.data.state === 1) {
                const userGender = {...res.data.user.gender}
                this.setState({
                    userInfo: res.data.user,
                    userGender
                })
            }else{
                toast(res.data.message, {type: toast.TYPE.ERROR});
            }
        }).catch(err => {
            toast('خطای شبکه', {type: toast.TYPE.ERROR});
        })
    }

    showDashboardDropdownHandler = (sendedId) => {
        const currentSatate = this.state.toggleAngleIcon

        if(this.state.dropdownToggleClass !== sendedId) {
            this.setState({
                dropdownToggleClass: sendedId,
                activeLineBefore: sendedId,
                toggleAngleIcon: sendedId,
            })
        }else{
            this.setState({
                dropdownToggleClass: undefined,
                activeLineBefore: undefined,
                toggleAngleIcon: undefined,
            })
        }
    }

    hideBoxesHandler = () => {
        this.props.onHideMessageBox()
        this.props.onHideBellBox()
        this.props.onHideMainHeaderModal()
    }

    showSettingModal = () => {
        const currentState = this.state.showSettingDropdown
        this.setState({ showSettingDropdown: !currentState })
        this.props.onShowSidebarModal()
    }
    
    addLineAndBeforeHandler = (sendedId, sendedPath) => {
        this.setState({activeLineBefore: sendedId, toggleAngleIcon: false, dropdownToggleClass: false, activeClass: null  })
        this.props.history.push(sendedPath)
    }

    toggleActiveClass = (sendedId, sendedPath) => {
        this.setState({ activeClass: sendedId })
        this.props.history.push(sendedPath)
    }

    hideSidebarModalOverlay = () => {
        this.props.onHideSidebarModal()
    }

    loggedOutHandler = () => {
        this.props.loggedOut()
    }

    renderSideLine = sendedItem => {
        const pathes = sendedItem.linksInDrop.map(item => item.path)

        for (let i = 0; i < pathes.length; i++) {
            if( pathes.indexOf(this.props.history.location.pathname) > -1 ) {
                // console.log(this.props.history.location.pathname)
                return(
                    classes.dashboardOrangeLineToggle
                )
            } else{
                return(
                    classes.dashboardOrangeLine
                )
            }
        }
    }

    renderActiveBackground = (sendedItem, sendedId) => {
        const pathes = sendedItem.linksInDrop.map(item => item.path)

        for (let i = 0; i < pathes.length; i++) {
            if( pathes.indexOf(this.props.history.location.pathname) > -1 || 
            this.state.activeLineBefore === sendedId ) {
                return(
                    [classes.layoutSidebarBodyTop1, classes.toggleBack, classes.layoutSidebarBodyClicked].join(' ')
                )
            } else{
                return(
                    [classes.layoutSidebarBodyTop1, classes.toggleBack].join(' ')
                )
            }
        }


        // this.state.activeLineBefore !== item.id &&
        // !pathesMatch ?
        //  :
       
    }

    render() {

        let pathesMatch
        const pathes = this.state.itemsInSidebar[0].linksInDrop.map(item => item.path)

        for (let i = 0; i < pathes.length; i++) {
            if( pathes.indexOf(this.props.history.location.pathname) > -1 ) {
                // console.log(this.props.history.location.pathname)
                pathesMatch = true
            } else{
                pathesMatch = false
            }
        }
        // console.log(pathesMatch)

        if (this.props.showHamburger === true) {
            anime({
                targets: this.asideRef.current,
                right: 0,
                duration: 500,
                easing: 'cubicBezier(.27,.1,.13,2.25)'
            })
        }
        else {
            anime({
                targets: this.asideRef.current,
                right: '-300px',
                duration: 1000,
                easing: 'cubicBezier(.6, -.9, .1, .99)'
            })
        }

        return (
            
                <aside ref={this.asideRef} className={classes.layoutSidebar} onClick={() => this.hideBoxesHandler()}>
                    <PerfectScrollbar>
                    <div className={this.props.showSettingDropdown ?
                        classes.layoutSidebarOverlayToggle :
                        classes.layoutSidebarOverlay
                    } onClick={this.hideSidebarModalOverlay}></div>

                    <div className={classes.layoutSidebarTop}>
                        <FontAwesomeIcon icon={faCaretDown}
                            className={classes.layoutSidebarTopDropdownIcon}
                            onClick={this.showSettingModal} />
                        <div className={classes.layoutSidebarTopDesc}>
                            <p className={classes.layoutSidebarTopText} onClick={this.props.showSettingModal}>
                                {this.state.userInfo !== null ?
                                `${this.state.userInfo.firstName} ${this.state.userInfo.lastName}` 
                                :null
                                }
                            </p>
                        </div>
                        <img
                        src={
                            this.state.userGender !== null && this.state.userGender === "مرد" ?
                            maleAvatar
                            :
                            femaleAvatar
                        }
                        alt="profile" className={classes.layoutSidebarTopProfile} />
                        <div className={!this.props.showSettingDropdown ? classes.layoutSidebarTopModal : classes.layoutSidebarTopModalToggle}>
                            <div className={classes.layoutSidebarTopModalPart}>
                                <button className={classes.layoutSidebarTopModalLink}>پروفایل</button>
                                <FontAwesomeIcon icon={faUser}
                                    className={classes.layoutSidebarTopModalIcon} />
                            </div>
                            <div className={classes.layoutSidebarTopModalPart2}>
                                <button className={classes.layoutSidebarTopModalLink}>تنظیمات</button>
                                <FontAwesomeIcon icon={faCog}
                                    className={classes.layoutSidebarTopModalIcon} />
                            </div>
                            <div className={classes.layoutSidebarTopModalPart}
                            onClick={this.loggedOutHandler}>
                                <button className={classes.layoutSidebarTopModalLink}
                                >
                                    خروج
                                </button>
                                <FontAwesomeIcon icon={faSignOutAlt}
                                    className={classes.layoutSidebarTopModalIcon} />
                            </div>
                        </div>
                    </div>
                    {/* <div className={classes.layoutSidebarMain}> */}
                        {/* <FontAwesomeIcon icon={faBaby}
                            className={classes.layoutSidebarMainText} />
                        <FontAwesomeIcon icon={faBrain}
                            className={classes.layoutSidebarMainText} />
                        <FontAwesomeIcon icon={faKiss}
                            className={classes.layoutSidebarMainText} />
                        <FontAwesomeIcon icon={faAward}
                            className={classes.layoutSidebarMainText} /> */}
                    {/* </div> */}
                    <div className={classes.layoutSidebarBody}>
                        {
                            this.state.itemsInSidebar.map(item => (
                                // <div>
                                <div key={item.id} className={this.state.activeLineBefore === item.id ?
                                    [classes.layoutSidebarBodyTop1Box, classes.layoutSidebarBodyClicked].join(' ') :
                                    classes.layoutSidebarBodyTop1Box
                                }>

                                    {
                                        item.linksInDrop ?
                                            <>
                                            <Ripples>
                                            <div key={item.id} className={
                                                this.renderActiveBackground(item, item.id)
                                                // this.state.activeLineBefore !== item.id &&
                                                // !pathesMatch ?
                                                // [classes.layoutSidebarBodyTop1, classes.toggleBack].join(' ') :
                                                // [classes.layoutSidebarBodyTop1, classes.toggleBack, classes.layoutSidebarBodyClicked].join(' ')
                                            }
                                                onClick={() => this.showDashboardDropdownHandler(item.id)}
                                                >
                                                
                                                <FontAwesomeIcon icon={faAngleLeft}
                                                    className={
                                                        this.state.toggleAngleIcon === item.id ?
                                                        classes.layoutSidebarBodyTop1LeftIcon :
                                                        classes.layoutSidebarBodyTop1LeftIconToggle
                                                    } />
                                                <div className={classes.layoutSidebarBodyTop1Subdiv}>
                                                    <FontAwesomeIcon icon={faTachometerAlt}
                                                        className={classes.layoutSidebarBodyTop1SubdivIcon} />
                                                    <p className={classes.layoutSidebarBodyTop1SubdivText}>
                                                        {item.name}
                                                    </p>
                                                    <div className={
                                                     this.renderSideLine(item)
                                                    }></div>
                                                </div>
                                            </div>
                                            </Ripples>
                                            <div ref={this.dashDropRef} className={this.state.dropdownToggleClass !== item.id ? classes.layoutSidebarBodyTop1Drop : classes.layoutSidebarBodyTop1DropToggle}>
                                                {
                                                    item.linksInDrop.map(link => (
                                                        <Link to={link.path} className={
                                                            this.props.history.location.pathname === link.path ?
                                                                classes.layoutSidebarBodyTop1DropLinkToggle :
                                                                classes.layoutSidebarBodyTop1DropLink}
                                                            onClick={() => this.toggleActiveClass(link.id, link.path)}
                                                            key={link.id}>
                                                            {link.name}
                                                        </Link>
                                                    ))
                                                }

                                            </div>
                                            </>

                                        : 
                                        // <Ripples>
                                        <div key={item.id} className={
                                            this.props.history.location.pathname !== item.path &&
                                            this.state.activeLineBefore !== item.id ?
                                            [classes.layoutSidebarBodyTop2, classes.toggleBack].join(' ') :
                                            [classes.layoutSidebarBodyTop2, classes.toggleBack, classes.layoutSidebarBodyClicked,
                                            classes.toggleBackBefored].join(' ')
                                        }
                                        onClick={() => this.addLineAndBeforeHandler(item.id, item.path)}>
                                            <div className={classes.layoutSidebarBodyTop2Desc}>
                                                <FontAwesomeIcon icon={item.fa}
                                                className={classes.layoutSidebarBodyTop2DescIcon}/>
                                                <Link to={item.path} className={classes.layoutSidebarBodyTop2DescText}>
                                                    {item.name}
                                                </Link>
                                                <div className={
                                                     this.props.history.location.pathname === item.path || this.state.activeLineBefore === item.id ? 
                                                     classes.dashboardOrangeLineToggle :
                                                     classes.dashboardOrangeLine}></div>
                                            </div>
                                        </div>
                                        // </Ripples>
                                    }
                                </div>
                                // </div>
                            ))
                        }
                    </div>
                    </PerfectScrollbar>
                </aside>
        );
    }

}

const mapState = state => {
    return {
        token: state.authReducer.token,
        showHamburger: state.layout.showHamburger,
        showSettingDropdown: state.layout.showSettingDropdown
    }
}

const mapDispatch = dispatch => {
    return {
        onHideMessageBox: () => dispatch(layoutActionCreators.hideMessageBox()),
        onHideBellBox: () => dispatch(layoutActionCreators.hideBellBox()),
        onHideMainHeaderModal: () => dispatch(layoutActionCreators.hideMainHeaderModal()),

        onShowSidebarModal: () => dispatch(layoutActionCreators.showSettingDrop()),
        onHideSidebarModal: () => dispatch(layoutActionCreators.hideSettingDrop()),

        onHideHamburger: () => dispatch(layoutActionCreators.hideHamburger()),

        loggedOut: () => dispatch(authActionCreators.loggedOut())
    }
}

export default connect(mapState, mapDispatch)(withRouter(PanelSidebar))