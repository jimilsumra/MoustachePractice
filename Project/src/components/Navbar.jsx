import React from 'react'
import {useState, useEffect} from 'react'
//import Items from './Items'
//import cartItems from '../cart.json'
import '../assets/js/init.js'
import '../assets/js/jQuery.js'

const Navbar = ({allCartItems, totalItems}) => {
  

   console.log("coming here navbar....");

    const [productIDInfo, setProductIDInfo] = useState([]);
    const [productSizeOptions, setProductSizeOption] = useState([]);

    useEffect(() => {
        
    const fetchJob = async(pID) => {
    try{

        //pid can be passed later to access particular product with productID...
        const res = await fetch(`https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product`);
        const data = await res.json();
        //console.log(`https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product?${pID}`);
        console.log(pID);
        //console.log(data);
       
        const tempObj = {};
        tempObj[pID] = {title: data.title, imageURL: data.imageURL, price: data.price};
       // console.log(tempObj);
       // productIDInfo[pID] = tempObj;
        setProductIDInfo(tempObj);
       // console.log(productIDInfo[pID].title);
        //setProductIDInfo(data);
        //console.log(data.sizeOptions);
        setProductSizeOption(data.sizeOptions);

        } catch(error) {
            console.log(error);
        }
    }
    allCartItems.map((cartItem, index) => {
        console.log(cartItem.productID);
        const notRepeatPID = [];
        if(notRepeatPID.includes(cartItem.productID)) {
           // console.log("TRUE");
        } else {
            //console.log("Called...");
            fetchJob(cartItem.productID);
            notRepeatPID[cartItem.productID];
        }
        
    });
    }, [allCartItems]);

    //console.log(productIDInfo);
    //console.log(productSizeOptions);
    


  return (
    <div className="nav-item">
            <div className="dropdown">
                <a className="dropbtn" href="#">My Cart (<span id="cart_item_tot">{ totalItems }</span>)</a>
                <div className="dropdown-content">
                    
                        <ul className="preview-cart">
                        
                        {allCartItems.map((cartItem, index) => (
                            
                            <li className="preview-cart-item" key={index}>        
                                <div className="item-container">
                                    <div className="preview-cart-img">
                                        {productIDInfo[cartItem.productID] && (
                                            <img src={productIDInfo[cartItem.productID].imageURL} />
                                        )}      
                                    </div>
                                    <div className="preview-cart-detail">
                                    {productIDInfo[cartItem.productID] ? (
                                            <>
                                                <h5>{productIDInfo[cartItem.productID].title}</h5>
                                                <div className="item-detail"> 
                                                    <span className="item-qty">{cartItem.qty}</span>&nbsp;x&nbsp;
                                                    <span className="item-price">${productIDInfo[cartItem.productID].price}</span>
                                                    <br /><br/>
                                                    {productSizeOptions.map((sizeInfo, index) => {
                                                        if (Number(cartItem.sizeOptID) === sizeInfo.id) {
                                                            return (
                                                                <div key={index}>
                                                                    Size: <span className="item-size">{sizeInfo.label}</span>
                                                                </div>
                                                            );
                                                        }
                                                        return null; 
                                                    })}
                                                </div>
                                            </>
                                        ) : (
                                            <h5>Loading...</h5> // Display a loading state if not ready....
                                        )}
                                    </div>
                                </div>
                            </li>
                        )

                        )}
                    </ul>
                </div>
            </div>  
        </div>
  )
}

export default Navbar