import React from 'react';
import classes from './Order.css';

const order = (props)=> {

    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push(
            {
                name : ingredientName,
                amount : props.ingredients[ingredientName]
            }
        );
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span key={ig.name}
            style={{
                display : 'inline-block',
                textTransform : 'capitalize',
                margin : '0 8px',
                border : '1 px soild #ccc'
            }}> {ig.name} = {ig.amount} </span>;
    });


    return (
        <div className={classes.Order}>
            <p>{ingredientsOutput}</p>
            <p>Price: <strong>$ {props.totalPrice.toFixed(2)}</strong></p>
        </div>
    )   
};

export default order;