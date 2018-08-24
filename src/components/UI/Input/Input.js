import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;
    if(props.invalid && props.validationRequired && props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid value</p>
    }

    switch(props.elementType){
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}/>;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map(option => {
                        return <option key={option.value} value={option.value}>{option.displayValue}</option>;
                    })}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig}
                onChange={props.changed} 
                value={props.value}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;

