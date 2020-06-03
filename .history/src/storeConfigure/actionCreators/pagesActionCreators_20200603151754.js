import * as acionTypes from '../actionTypes/actionTypes'

export const saveSinglePost = (postGuid) => {
    return {
        type: acionTypes.SAVE_SINGLE_POST,
        postGuid
    }
}

export const saveOrderRequest = (orderGuid) => {
    return {
        type: acionTypes.SAVE_ORDER_GUID,
        orderGuid
    }
}

export const saveOrderRequest = (orderRequestGuid) => {
    return {
        type: acionTypes.SAVE_ORDER_REQUEST_GUID,
        orderRequestGuid
    }
}