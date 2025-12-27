import axios from 'axios'
import {Routes,Route} from 'react-router'
import {useState,useEffect} from 'react'
import { HomePage } from './pages/Home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrderPage } from './pages/orders/OrderPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'


function App() {
    const [cart,setCart] = useState([]);

      const loadCart =async ()=>{
         const response=await axios.get('/api/cart-items?expand=product')
         setCart(response.data);
      }

      useEffect(()=>{
         loadCart();
      },[])

   return (
    <Routes>
       <Route path="/" element={ <HomePage cart={cart} loadCart={loadCart} />} />
       <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
       <Route path="/orders" element={<OrderPage cart={cart} />} />
       <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} /> 

       <Route path="*" element ={"404 Not found"} />
    </Routes>
      
   )
}

export default App