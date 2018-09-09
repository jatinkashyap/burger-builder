import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders : [],
    loading : false,
    purchased : false
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_INIT:
            return{
                ...state,
                purchased : false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading : false
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            console.log("In success reducer");
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading : false,
                purchased : true,
                orders : state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAILURE:
            console.log("In failure reducer");
            return{
                ...state,
                loading : false
            }
        default:
            return state;
    }
}

export default reducer;