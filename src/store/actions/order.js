import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    console.log("In start");
    return {
        type : actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurgerInit = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_INIT,
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name,orderData));
            })
            .catch(error => {
                console.log(error);
                console.log("In catch");
                dispatch(purchaseBurgerFailure(error))
            });
    };
};

export const purchaseBurgerSuccess = (id,orderData) => {
    console.log("In success");
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    };
};

export const purchaseBurgerFailure = (error) => {
    console.log("In failure");
    return {
        type : actionTypes.PURCHASE_BURGER_FAILURE,
        error : error
    }
}
