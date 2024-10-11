import { useState,useEffect } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './assets/css/style.css'
import Navbar from './components/Navbar'
import ProductDescription from './components/ProductDescription'
/*
const router = createBrowserRouter (
  createRoutesFromElements(<Route index element={<h1>Hello</h1>} />)
);
*/


function App() {

  //cart total items....
  const [totalCartItems, setTotalCartItems] = useState();

  const totalItems = () => {
      var total = localStorage.length;
      setTotalCartItems(total);
  }

  //prepare cartItems.....
  const [cartItems, setCartItems] = useState([]);

  const cartItemsData = async()  => {
    const items = []; // Create a new array
    if(cartItems.length == 0) {
      //no records exists yet....
      for(var i=0;i<localStorage.length;i++) {
        var cartItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
        items.push(cartItem); //cartItems = 1  
      }  
    } else {
      //we found records.....
      for(var i=0;i<localStorage.length;i++) {
        var cartItem = JSON.parse(localStorage.getItem(localStorage.key(i)));

        const found = cartItems.some(el=>el.sizeOptID === cartItem.sizeOptID);

        if(!found) {
          items.push(cartItem);
        } else {
          //update qty....
          var objIndex = '';
          objIndex = cartItems.findIndex(el => el.sizeOptID === cartItem.sizeOptID);
          items[objIndex].qty = cartItem.qty;
        }
      }
    }
    setCartItems(items);
   // setCartItems(items);
   console.log(items);
  }


  
  const addToCart = (newPurchase) => {
    var genKey = "cartItem_"+newPurchase.productID+"_"+newPurchase.sizeOptID;
    if(localStorage.length == 0) {
        localStorage.setItem(genKey,[JSON.stringify(newPurchase)]);
    }  else {
      
        var cartItem = JSON.parse(localStorage.getItem(genKey));
        
        if(cartItem === null) {
            //we found a not matched key...so add as new....
            localStorage.setItem(genKey,[JSON.stringify(newPurchase)]);
        } else {
           
            //we found a similar record....
            newPurchase.qty = cartItem.qty+1;
            localStorage.setItem(genKey,[JSON.stringify(newPurchase)]);
        }
    }
    cartItemsData();
    totalItems();
    
  }

  useEffect(() => {
    cartItemsData();
  },[cartItems]);

  useEffect(() => {
    totalItems();
 },[totalCartItems]);
 




  return (
    <>
    <div className="container">

       
        {/*<!--Navigation Bar--> */}
        <Navbar allCartItems={cartItems}  totalItems={totalCartItems} />
  
        {/*<!--Product description addPurchaseSubmit={addToCart}-->*/}
        <ProductDescription addToCartSubmit={addToCart} />

    </div>
    </>
  )
}

export default App
