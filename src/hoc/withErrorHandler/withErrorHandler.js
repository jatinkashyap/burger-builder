import React,{Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent) => {
    return class extends Component {
        render(){
            return (
                <Aux>
                    <Modal show>
                        Something didn't work!
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
};

export default withErrorHandler;