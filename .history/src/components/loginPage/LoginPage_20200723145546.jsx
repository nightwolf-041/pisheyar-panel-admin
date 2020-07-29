
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import PerfectScrollbar from 'react-perfect-scrollbar'
import axiosConfig from '../../axiosConfigure/axiosConfig'
import classes from './loginPage.module.css'
import 'react-toastify/dist/ReactToastify.css';
import * as authActionCreators from '../../storeConfigure/actionCreators/authActionCreators'
import LoginBixSteps from './LoginPageSteps'

import loginRightImage from '../../assets/images/Login.png'

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            minutes: 2,
            seconds: 0,

            minutes: 2,
            seconds: 0,

            loginPhoneNumberValue: '',
            loginPhoneNumberValid: true,
            loginPhoneNumberValidMsg: '',

            loginStepTwoSwitch: false,

            loginStep2CodeValue: '',
            loginStep2CodeValid: true,
            loginStep2CodeValidMsg: '',

            loginStatus : {
                loading: null,
                success: null,
                error: null,
                errorMsg: null
            },

            loginStep2Status : {
                loading: null,
                success: null,
                error: null,
                errorMsg: null
            },
        }
    }

    handleAdminSubmit = val => {

        if (!this.state.loginPhoneNumberValue) {
            this.setState({ loginPhoneNumberValid: false, loginPhoneNumberValidMsg: 'الزامیست' })
        } else if (
            !/^\d+$/.test(this.state.loginPhoneNumberValue)) {
            this.setState({ loginPhoneNumberValid: false, loginPhoneNumberValidMsg: 'شماره موبایل معتبر نیست' })
        } else if(this.state.loginPhoneNumberValue.length !== 11) {
            this.setState({ loginPhoneNumberValid: false, loginPhoneNumberValidMsg: 'شماره موبایل صحیح نیست' })
        } else {
            this.setState({ loginPhoneNumberValid: true, loginPhoneNumberValidMsg: '' })
        
            const loginStatus = {...this.state.loginStatus}
            loginStatus.loading = true
            loginStatus.success = false
            loginStatus.error = false

            this.setState({
                loginStatus: loginStatus
            }) 

            axiosConfig.post('/Account/Login', {
                phoneNumber: this.state.loginPhoneNumberValue,
                roleGuid: val
            }).then(res => {

                console.log(res)

                if(res.data.state === 1) {
                    const loginStatus = {...this.state.loginStatus}
                    loginStatus.loading = false
                    loginStatus.success = true
                    loginStatus.error = false

                    this.setState({
                        loginStatus: loginStatus,
                        loginStepTwoSwitch: true,
                        authenticateRoleGuid: val
                    })

                    this.setState({
                        minutes: 2,
                        seconds: 0
                    })
            
                    clearInterval(this.myTimer)
            
                    this.myTimer = setInterval(() => {
                        let { minutes, seconds } = this.state
            
                        if (seconds > 0) {
                            this.setState(({ seconds }) => ({
                                seconds: seconds - 1
                            }))
                        }
                        if (seconds === 0) {
                            if (minutes === 0) {
                                clearInterval(this.myTimer)
                                this.setState({
                                    loginStepTwoSwitch: false
                                })
                            } else {
                                this.setState(({ minutes }) => ({
                                    minutes: minutes - 1,
                                    seconds: 59
                                }))
                            }
                        } 
            
                    }, 1000)
                }

                if(res.data.state === 2 || res.data.state === 3 || res.data.state === 4 || res.data.state === 5 || res.data.state === 6) {
                    const loginStatus = {...this.state.loginStatus}
                    loginStatus.loading = false
                    loginStatus.success = false
                    loginStatus.error = true
                    loginStatus.errorMsg = res.data.message
                    this.setState({
                        loginStatus: loginStatus,
                    })
                    toast(res.data.message, {type: toast.TYPE.INFO});
                }

            }).catch(err => {
                const loginStatus = {...this.state.loginStatus}
                loginStatus.loading = false
                loginStatus.success = false
                loginStatus.error = true
                loginStatus.errorMsg = err.message
                this.setState({loginStatus: loginStatus})

                toast('خطای شبکه', {type: toast.TYPE.ERROR})
            })
        }
    }
    
    loginStep2ClickHandler = () => {
        let loginPhoneNumber = this.state.loginPhoneNumberValue
        let loginCode = this.state.loginStep2CodeValue
        this.props.onLoginAuth(loginPhoneNumber, loginCode, this.props.history)
    }

    loginStep2BackHandler = () => {
        this.setState({loginStepTwoSwitch: false, loginPhoneNumberValue: ''})
    }

    loginCodeInputChangeHandler = (val) => {
        this.setState({loginStep2CodeValue: val})
    }

    loginPhoneNumberChangeHandler = (e) => {
        let loginPhoneNumberValue = { ...this.state.loginPhoneNumberValue }
        loginPhoneNumberValue = e.target.value
        this.setState({ loginPhoneNumberValue: loginPhoneNumberValue })
    }


    render() {
        return(
            <>
            
            {/* <PerfectScrollbar> */}
            <div className={classes.loginPageContainer}>
            <PerfectScrollbar>
                <div className={classes.loginPageMain}>
                    <LoginBixSteps
                    loginPhoneNumberValue={this.state.loginPhoneNumberValue}
                    loginStepTwoSwitch={this.state.loginStepTwoSwitch}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                    loginStep2Status={this.props.loginStep2Status}
                    loginPhoneNumberValidMsg={this.state.loginPhoneNumberValidMsg}
                    loginStatus={this.state.loginStatus}
                    loginCodeInputChangeHandler={val => this.loginCodeInputChangeHandler(val)}
                    loginStep2ClickHandler={this.loginStep2ClickHandler}
                    loginStep2BackHandler={this.loginStep2BackHandler}
                    loginPhoneNumberChangeHandler={this.loginPhoneNumberChangeHandler}
                    handleAdminSubmit={val => this.handleAdminSubmit(val)}
                    />
                    <div className={classes.loginPageLogoSide}>
                        <img src={loginRightImage} alt="pishe plus"
                        className={classes.loginPageLogoSideLogo} />
                    </div>
                </div>
                </PerfectScrollbar>
            </div>
            
            {/* </PerfectScrollbar> */}
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
}

const mapState = state => {
    return {
        loginStep2Status: {
            loading: state.authReducer.loading,
            success: state.authReducer.success,
            error: state.authReducer.error,
            errorMsg: state.authReducer.errorMsg
        },
        loading: state.authReducer.loading,
        token: state.authReducer.token !== null,
        error: state.authReducer.error,
        errorMsg: state.authReducer.errorMsg
    }
}

const mapDispatch = dispatch => {
    return {
        onLoginAuth: (mobile, code, history) => 
            dispatch(authActionCreators.auth(mobile, code, history))
    }
}

export default connect(mapState, mapDispatch)(LoginPage);