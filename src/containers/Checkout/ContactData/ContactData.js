import React,{Component} from 'react';
import {connect} from 'react-redux';
import classes from './ContactData.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:'fastest',
                validation: {},
                valid: true
            }
        },
        isFormValid: false
    }

    orderHandler = (event)=>{
        event.preventDefault();
        const formData = {};
        for(let inputElement in this.state.orderForm){
            formData[inputElement] = this.state.orderForm[inputElement].value;
        }
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderForm : formData
        };
        this.props.onStartBurger(order,this.props.token);
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedForm = {...this.state.orderForm};
        const updatedElement = {...updatedForm[inputIdentifier]};
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value,updatedElement.validation);
        updatedElement.touched = true;
        updatedForm[inputIdentifier]=updatedElement;

        let isFormValid = true;
        for(let inputIdentifier in updatedForm){
            isFormValid = updatedForm[inputIdentifier].valid && isFormValid;
        }

        this.setState({orderForm : updatedForm, isFormValid: isFormValid});
    }

    checkValidity = (value,rules) => {
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = (value.trim() !== '') && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        if(rules.isEmail){
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid;
        }
        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    render(){
        let formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => {
                    return <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            validationRequired={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event,formElement.id)}/>;
                })}
                <Button btnType="Success" disabled={!this.state.isFormValid}>SUBMIT</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStartBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));