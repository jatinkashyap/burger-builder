import React from 'react';
import logoImage from '../../../src/assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={logoImage} alt="MyBurger"/>
    </div>
);

export default logo;