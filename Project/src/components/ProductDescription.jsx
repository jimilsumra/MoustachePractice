import React from 'react'
import {useState, useEffect} from 'react'


const ProductDescription = ({ addToCartSubmit }) => { //

    const[sizeOptID,setSizeOptID] = useState('');
    const [error, setError] = useState('');
    const[productID,setProductID] = useState('');
    const[qty,setQty] = useState(1); 

    const [productInfo, setProductInfo] = useState({});
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
            setProductSizeOption(data.sizeOptions || []);
        } catch(error) {
            console.log("Please try again later!"+error);
        }
    }
   fetchProductInfo();
    }, []);


    const handleChange = (event) => {
        setSizeOptID(event.target.value);
        setError(''); // Clear the error 
    };

    //Add to Cart & store to localStorage....
    const submitAddToCart = (e) => {
        e.preventDefault();
        //console.log(productID);
        if (!sizeOptID) {
            setError('Please select an option');
        } else {
            console.log('Selected option:', sizeOptID);
            const newPurchase = {
                productID,
                sizeOptID,
                qty
            }
            addToCartSubmit(newPurchase);
        }
        
       //setCartItem(qty);
    }

   
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
                           <input onChange={handleChange}  className="form-radio" id={`radio_ractangle_${sizeInfo.id}`}  type="radio" value={sizeInfo.id}  name="variant" />
                           <label className="form-option" htmlFor={`radio_ractangle_${sizeInfo.id}`} >{ sizeInfo.label }</label>
                           </span>
                        )
                        )}
                    </div>

                    <div className="product-add-to-cart">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button className="btn-add-cart" >Add To Cart </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
  )
}

export default ProductDescription