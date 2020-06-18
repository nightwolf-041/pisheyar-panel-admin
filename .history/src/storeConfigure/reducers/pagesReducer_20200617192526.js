import * as actionTypes from '../actionTypes/actionTypes'
import utility from '../utility'

const initialState = {
    postGuid: null,
    orderGuid: null,
    orderRequestGuid: null,
    codeGroupGuid: null,
    provinceGuid: null,
}

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SINGLE_POST:
            return utility(state, { postGuid: action.postGuid })
                // break;

        case actionTypes.SAVE_ORDER_GUID:
            return utility(state, { orderGuid: action.orderGuid })
                // break;

        case actionTypes.SAVE_ORDER_REQUEST_GUID:
            return utility(state, { orderRequestGuid: action.orderRequestGuid })
                // break;

        case actionTypes.SAVE_CODE_GROUP_GUID:
            return utility(state, { codeGroupGuid: action.codeGroupGuid })
                // break;

        case actionTypes.SAVE_PROVINCES_GUID:
            return utility(state, { provinceGuid: action.provinceGuid })
                // break;

        default:
            return state;
    }
}

export default pagesReducer;