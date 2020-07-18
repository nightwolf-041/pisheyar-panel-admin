import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, CircularProgress} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ReactCodeInput from 'react-code-input'
import classes from './loginPage.module.css'

const styles = makeStyles(theme => ({
    wrapper: {
        width: '90%',
        margin: '0 auto',
        marginTop: theme.spacing(3),
        position: 'absolute',
        top: '145%',
        left: '5%'
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
    Step2EndWrapper: {
        width: '90%',
        margin: '0 auto',
        marginTop: theme.spacing(3),
        position: 'relative',
        padding: '7px 10px',
        width: '100px'
    },
    Step2BackWrapper: {},
    buttonDanger: {},
    buttonProgressRed: {},
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
}))

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
                    {/* <button type="button"
                    onClick={props.loginStep2ClickHandler}
                    disabled={props.loginStep2Status.loading}
                    className={classes.loginStep2Button}>
                        ورود
                    </button> */}
                    <div className={classes2.Step2EndWrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.loginStep2ClickHandler}
                            disabled={props.loginStep2Status.loading}
                            className={classes2.buttonSuccess}
                            >
                            ورود
                        </Button>
                        {props.loginStep2Status.loading && <CircularProgress size={24} className={classes2.buttonProgress} />}
                    </div>

                    {/* <button type="button"
                    onClick={props.loginStep2BackHandler}
                    disabled={props.loginStep2Status.loading}
                    className={classes.loginStep2BackButton}>
                        بازگشت
                    </button> */}
                    <div className={classes2.Step2BackWrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.loginStep2BackHandler}
                            disabled={props.loginStep2Status.loading}
                            className={classes2.buttonDanger}
                            >
                            بازگشت
                        </Button>
                        {props.loginStep2Status.loading && <CircularProgress size={24} className={classes2.buttonProgressRed} />}
                    </div>
                </div>
            </div>
            : 
            <div className={classes.loginBoxLoginForm}>
                <TextField
                className={[classes2.fontfamily, classes2.TextField, classes2.marginBottom2].join(' ')}
                inputProps={{style: { textAlign: 'center', direction: 'rtl' }}}
                id="login-number"
                name='loginnumber'
                label="شماره موبایل"
                color="primary"
                error={props.loginPhoneNumberValidMsg}
                onChange={props.loginPhoneNumberChangeHandler}
                />
                {props.loginPhoneNumberValidMsg && (
                    <div className={classes.loginMobileErrorSpan}>
                        {props.loginPhoneNumberValidMsg}
                    </div>
                )}
                <div className={classes2.wrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.handleAdminSubmit('46a09d81-c57f-4655-a8f5-027c66a6cfb1')}
                        disabled={props.loginStatus.loading}
                        className={classes2.buttonSuccess}
                        >
                        ورود
                    </Button>
                    {props.loginStatus.loading && <CircularProgress size={24} className={classes2.buttonProgress} />}
                </div>

            </div>
            }
        </div>
    )
}

export default LoginBixSteps
