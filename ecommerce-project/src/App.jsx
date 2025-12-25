import axios from 'axios'
import {Routes,Route} from 'react-router'
import {useState,useEffect} from 'react'
import { HomePage } from './Pages/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrderPage } from './pages/OrderPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'


function App() {
    const [cart,setCart] = useState([]);
      useEffect(()=>{
          axios.get('/api/cart-items')
          .then((response)=>{
            setCart(response.data);
        })
      },[])

   return (

    <Routes>
       <Route path="/" element={ <HomePage cart={cart} />} />
       <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
       <Route path="/orders" element={<OrderPage cart={cart} />} />
       <Route path="/tracking" element={<TrackingPage cart={cart} />} /> 

       <Route path="*" element ={"404 Not found"} />
    </Routes>
      
   )
}

export default App