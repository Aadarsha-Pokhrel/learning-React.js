import {Routes,Route} from 'react-router'

import { HomePage } from './Pages/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrderPage } from './pages/OrderPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'


function App() {
   return (

    <Routes>
       <Route index element={ <HomePage />} />
       <Route path="/checkout" element={<CheckoutPage />} />
       <Route path="/orders" element={<OrderPage />} />
       <Route path="/tracking" element={<TrackingPage />} /> 

       <Route path="*" element ={"404 Not found"} />
    </Routes>
      
   )
}

export default App