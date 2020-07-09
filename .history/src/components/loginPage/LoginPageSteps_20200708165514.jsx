import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import ReactCodeInput from 'react-code-input'
import classes from './loginPage.module.css'

const styles = makeStyles(theme => ({
    fontfamily: {
        fontFamily: 'Yekan'
    },
    TextField: {
        width: '85%',
        textAlign: 'center',
        direction: 'rtl'
    },
    marginBottom2: {
        marginBottom: '20px'
    },
}));

const LoginBixSteps = (props) => {
    const classes2  = styles();

    return (
        <div className={classes.loginBox}>
            <h4 className={classes.loginBoxLoginHead}>
                {props.loginStepTwoSwitch ?
                'کد دریافتی را وارد کنید'
                :
                'ورود'
                }
            </h4>

            {props.loginStepTwoSwitch ?
            
            <div className={classes.loginBoxLoginForm}>

                <ReactCodeInput type='text' fields={6} onChange={val => props.loginCodeInputChangeHandler(val)} />

                <div className={classes.timerBox}>
                    <span>
                        {props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}
                    </span>
                </div>
                
                <div className={classes.registerStep2Buttonsbox}>
                    <button type="button"
                    onClick={props.loginStep2ClickHandler}
                    disabled={props.loginStep2Status.loading}
                    className={classes.loginStep2Button}>
                        ورود
                    </button>

                    <button type="button"
                    onClick={props.loginStep2BackHandler}
                    disabled={props.loginStep2Status.loading}
                    className={classes.loginStep2BackButton}>
                        بازگشت
                    </button>
                </div>
            </div>
                : 
        
            <div className={classes.loginBoxLoginForm}>
                <TextField
                // style={{textAlign: 'center !important'}}
                className={[classes2.fontfamily, classes2.TextField, classes2.marginBottom2].join(' ')}
                inputProps={{style: { textAlign: 'center' }}}
                id="login-number"
                name='loginnumber'
                label="شماره موبایل"
                variant="outlined"
                color="primary"
                // error={props.errorOnAdd ? true : false}
                // defaultValue={nameInputValue}
                // helperText={props.errorOnAdd ? "الزامیست" : null}
                // onChange={(e) => nameInputChangeHandler(e)}
                />
                {/* <input
                className={!props.loginPhoneNumberValidMsg ?
                    classes.loginBoxLoginPhoneNumber
                    : classes.loginBoxLoginPhoneNumberInvalid
                }
                type="text"
                name="loginMobile"
                onChange={props.loginPhoneNumberChangeHandler}
                value={props.loginPhoneNumberValue}
                placeholder="شماره موبایل"
                /> */}
            {props.loginPhoneNumberValidMsg && (
                    <div className={classes.loginMobileErrorSpan}>{props.loginPhoneNumberValidMsg}</div>
                )
            }
            <button type="button"
                onClick={() => props.handleAdminSubmit('959b10a3-b8ed-4a9d-bdf3-17ec9b2ceb15')}
                disabled={props.loginStatus.loading}
                className={classes.loginBoxLoginButton}>
                {props.loginStatus.loading ?
                'صبور باشید' :
                'ورود'}
            </button>
            </div>
            }
        </div>
    )
}

export default LoginBixSteps
