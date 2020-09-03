import React from 'react';
import "./Product.css";
import {useStateValue} from './StateProvider';

function Product({id,title,image,price,rating}) {
    const [{},dispatch] =useStateValue();

    const onAddToBasket = () =>{
        //add item to basket
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    };

    return (
        <div className="product">
            <div className="product__info">
            <p><strong>{title}</strong></p>
            <p className="product__price"><small><strong>Rs{price}</strong></small></p>
            <div className="product__rating">
                {
                    Array(rating)
                    .fill()
                    .map((_)=>
                    <span className="star">&#9733;</span>
                    )
                }
            </div>
            </div>
            
            <img className="product__image" src={image} alt=""/>
            <button onClick={onAddToBasket}>Add to Basket</button>
            
        </div>
    )
}

export default Product
