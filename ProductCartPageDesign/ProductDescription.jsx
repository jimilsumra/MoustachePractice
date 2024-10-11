import React from 'react'
import {useState, useEffect} from 'react'
import tshirt from '../assets/images/t-shirt-gray.png';

const ProductDescription = () => { //{ addPurchaseSubmit }

    const[sizeOptID,setSizeOptID] = useState();
    const[productID,setProductID] = useState();
    const[qty,setQty] = useState('1');

    const [productInfo, setProductInfo] = useState([]);
    const [productSizeOptions, setProductSizeOption] = useState([]);

    useEffect(() => {
    const fetchProductInfo = async() => {
        try {
            const res = await fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product");
            //console.log(res);
            const data = await res.json();
            setProductInfo(data);
            setProductID(data.id);
            setQty(1);
            setProductSizeOption(data.sizeOptions);
        } catch(error) {
            console.log("Please try again later!"+error);
        }
    }
   fetchProductInfo();
    }, []);


    //cart total items....
    const totalItems = () => {
        var total = localStorage.length;
        setTotalCartItems(total);
    }


    //Add to Cart & store to localStorage....
//    const [cartItems, setCartItem] = useState();
    const submitAddToCart = (e) => {
        e.preventDefault();
        //console.log(productID);
        const newPurchase = {
            productID,
            sizeOptID,
            qty
        }
        var genKey = "cartItem_"+productID+"_"+sizeOptID;

        if(localStorage.length == 0) {
            localStorage.setItem(genKey,[JSON.stringify(newPurchase)]);
            
        }  else {
            //console.log('second');
            var cartItem = JSON.parse(localStorage.getItem(genKey));
            
            if(cartItem === null) {
                //we found a not matched key...so add as new....
                localStorage.setItem(genKey,[JSON.stringify(newPurchase)]);
            } else {
                //we found a similar record....
                const qty = cartItem.qty+1;
                const updatePurchase = {
                    productID,
                    sizeOptID,
                    qty
                }
                localStorage.setItem(genKey,[JSON.stringify(updatePurchase)]);
            }
        }
        totalItems();
       //setCartItem(qty);
    }

    useEffect(() => {
       totalItems();
    },[totalCartItems]);
    
     
  return (
    <div className="content">
        <section className="product-container">
            <div className="product-img">
                <img src={productInfo.imageURL} />
                 
            </div>
            <div className="product-detail">
                <h2>{productInfo.title}</h2>
                <div className="divider"></div>
                <span className="product-price">${productInfo.price}</span>
                <div className="divider"></div>
                <br/>
                <div className="product-description">
                    <p>
                        {productInfo.description}
                    </p>
                </div>
                <span className="size-label">Size<span className="size-mandatory">*</span>:</span>
                <form onSubmit={submitAddToCart}>
                    <input type="hidden" value={productInfo.id} name="productID" id="productID" />
                    <input type="hidden" value="1" name="qty" id="qty" />
                    <div className="product-variant">
                    {productSizeOptions.map((sizeInfo, index) => (
                        <span key={index}>
                           <input onChange={(e)=>setSizeOptID(e.target.value)} className="form-radio" id={`radio_ractangle_${sizeInfo.id}`}  type="radio" value={sizeInfo.id}  name="variant" />
                           <label className="form-option" htmlFor={`radio_ractangle_${sizeInfo.id}`} >{ sizeInfo.label }</label>
                           </span>
                        )
                        )}
                    </div>

                    <div className="product-add-to-cart">
                        <button className="btn-add-cart" >Add To Cart {totalCartItems}</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
  )
}

export default ProductDescription