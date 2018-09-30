import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurgerInit = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_INIT,
    };
};

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name,orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailure(error))
            });
    };
};

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    };
};

export const purchaseBurgerFailure = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAILURE,
        error : error
    }
}


export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth='+token)
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err =>{
                dispatch(fetchOrdersFailure(err));
            });
    };
};

export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    };
};

export const fetchOrdersFailure = (error) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAILURE,
        error : error
    }
}


