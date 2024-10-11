import React from 'react'
import {useState, useEffect} from 'react'

//import cartItems from '../cart.json'

const Items = (props) => {

    
   console.log("coming here...items:");
   
  return (


    <ul className="preview-cart">
    
        {props.cartItems.map((cartItem, index) => (

            <li className="preview-cart-item" key={index}>        
                <div className="item-container">
                    <div className="preview-cart-img">
                        <img src={cartItem.imageURL} />        
                    </div>
                    <div className="preview-cart-detail">
                        <h5>{ cartItem.title }</h5>
                        <div className="item-detail"> 
                            <span className="item-qty">{ cartItem.qty }</span>&nbsp;x&nbsp;<span className="item-price">${ cartItem.price }</span>
                            <br /><br/>
                            Size:<span className="item-size">{ cartItem.sizeOptID }</span>
                            
                        </div>
                    </div>
                </div>
            </li>
        )

        )}
    </ul>
  )
}

export default Items