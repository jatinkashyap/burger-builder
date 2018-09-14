import React,{Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component{

    render(){
        let orders = <Spinner/>;
        if(!this.props.loading){
            orders = this.props.orders.map(order => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    totalPrice={+order.totalPrice}
                />
            });
        }
        return(
            <div>
                {orders}
            </div>
        );
    }

    componentDidMount(){
        this.props.onFetchOrders();
    }
}

const mapStateToProps = (state) => {
    return {
        orders : state.order.orders,
        loading : state.order.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders : () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHanlder(Orders,axios));