import * as actionTypes from '../actionTypes/actionTypes'
// import axios from 'axios'
import axiosConfig from '../../axiosConfigure/axiosConfig'
import anime from 'animejs'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (mobile, code, history) => {
    return dispatch => {
        dispatch(authStart())

        axiosConfig.post('/Account/Authenticate', {
            phoneNumber: mobile,
            smsToken: code,
            roleGuid: '46a09d81-c57f-4655-a8f5-027c66a6cfb1',
            rememberMe: true

        }).then(res => {
            let token = res.data.token
            console.log(token)

            if (res.data.token !== null) {
                dispatch(authSuccess(token))
                toast('عملیات موفقیت آمیز', { type: toast.TYPE.SUCCESS });
                // setTimeout(() => {
                //     history.replace('/')
                // }, 1300);

            } else {
                dispatch(authFail(res.data.message))
                toast(res.data.message, { type: toast.TYPE.ERROR });
            }

        }).catch(err => {
            dispatch(authFail(err.message))
            toast('خطای شبکه', { type: toast.TYPE.ERROR });
        })
    }

}

export const loggedOut = () => {
    return {
        type: actionTypes.LOG_OUT
    }
}