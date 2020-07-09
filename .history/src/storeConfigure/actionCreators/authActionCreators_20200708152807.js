import * as actionTypes from '../actionTypes/actionTypes'
import toast from 'react-toastify'
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

export const auth = (phoneNumber, smsToken, history) => {
    return dispatch => {
        dispatch(authStart())

        // const authData = {
        //     email,
        //     password
        // }

        axiosConfig.post('/Account/Authenticate', {
            phoneNumber,
            smsToken,
            roleGuid: '46a09d81-c57f-4655-a8f5-027c66a6cfb1',
            rememberMe: true

        }).then(res => {
            let token = res.data.token
            console.log(token)

            if (res.data.token !== null) {
                dispatch(authSuccess(token))



            } else {
                dispatch(authFail(res.data.message))

            }



        }).catch(err => {
            dispatch(authFail(err.message))

        })
    }

}

export const loggedOut = () => {
    return {
        type: actionTypes.LOG_OUT
    }
}