import React,{Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {

    render(){
        return <Redirect to="/" />;
    }

    componentDidMoint(){
        this.props.onLogout();
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.authLogout)
    };
};

export default connect(null,mapDispatchToProps)(Logout);