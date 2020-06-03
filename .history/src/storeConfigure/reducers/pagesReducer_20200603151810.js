import * as actionTypes from '../actionTypes/actionTypes'
import utility from '../utility'

const initialState = {
    postGuid: null,
    orderGuid: null,
    orderRequestGuid: null,
}

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SINGLE_POST:
            return utility(state, { postGuid: action.postGuid })
                // break;

        case actionTypes.SAVE_ORDER_REQUEST:
            return utility(state, { orderRequestGuid: action.orderGuid })
                // break;

        case actionTypes.SAVE_ORDER_REQUEST:
            return utility(state, { orderRequestGuid: action.orderRequestGuid })
                // break;

        default:
            return state;
    }
}

export default pagesReducer;