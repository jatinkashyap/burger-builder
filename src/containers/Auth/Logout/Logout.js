import React,{Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {

    render(){
        //console.log("Logout component is rendered");
        return <Redirect to="/" />;
    }

    componentDidMount(){
       // console.log("Logout component DidMount is called");
        this.props.onLogout();
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.authLogout())
    };
};

export default connect(null,mapDispatchToProps)(Logout);