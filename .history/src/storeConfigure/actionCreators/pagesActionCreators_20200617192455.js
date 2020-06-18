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

export const saveOrderRequestGuidForChats = (orderRequestGuid) => {
    return {
        type: acionTypes.SAVE_ORDER_REQUEST_GUID,
        orderRequestGuid
    }
}

export const saveCodeGroupList = (codeGroupGuid) => {
    return {
        type: acionTypes.SAVE_CODE_GROUP_GUID,
        codeGroupGuid
    }
}

export const saveProvincesGuid = (provinceGuid) => {
    return {
        type: acionTypes.SAVE_PROVINCES_GUID,
        provinceGuid
    }
}