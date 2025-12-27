import {Link} from 'react-router'
import axios from 'axios'
import dayjs from 'dayjs'
import { useParams } from 'react-router'
import './TrackingPage.css'
import {Header} from '../components/Header'
import { useEffect,useState } from 'react'


function TrackingPage({cart}){
  const {orderId,productId} = useParams();
  const [order,setOrder] = useState(null);
    useEffect(()=>{
       const fetchOrder =  async ()=>{
          const response =await axios.get(`api/orders/${orderId}?expand=products`);
         setOrder(response.data);
       }    

       fetchOrder();
   },[orderId,productId]);
   
    if (!order || !order.products) {
    return null; // or loading UI
    }

    const orderProduct = order.products.find(function (item) {
        if(item.product.id === productId){
            return true;
        }else{
            return false;
        }
    });

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf()-order.orderTimeMs;
    const deliveryProgress = (timePassedMs/totalDeliveryTimeMs)*100;
    
    const deliveryPercent = (deliveryProgress>100)?100:deliveryProgress;

    let isDelivered,isPreparing,isShipped;

    if(deliveryPercent<33){
        isPreparing = true;
    }else if(deliveryPercent>=33 && deliveryPercent<100){
        isShipped = true;
    }else{
      isDelivered=true;
    }
   
    return (
        <>
     
            <title>Tracking</title>  
            <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
             <Header cart={cart}/>

            <div className="tracking-page">
            <div className="order-tracking">
                <Link className="back-to-orders-link link-primary" to="/orders">
                View all orders
                </Link>

                <div className="delivery-date">
                  Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                </div>

                <div className="product-info">
                    {orderProduct.product.name}
                </div>

                <div className="product-info">
                Quantity: {orderProduct.quantity}
                </div>

                <img className="product-image" src={orderProduct.product.image} />

                <div className="progress-labels-container">
                <div className={`progress-label ${isPreparing && 'current-status'}`}>
                    Preparing
                </div>
                <div className={`progress-label ${isShipped && 'current-status'}`}>
                    Shipped
                </div>
                <div className={`progress-label ${isDelivered && 'current-status'}`}>
                    Delivered
                </div>
                </div>

                <div className="progress-bar-container">
                <div className="progress-bar" style = {{width:`${deliveryPercent}%`}}></div>
                </div>
            </div>
            </div>          
        </>
    )
}

export {TrackingPage}