import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {!props.isLoggedIn
            ?<NavigationItem link="/auth">Authenticate</NavigationItem>
            :<NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;