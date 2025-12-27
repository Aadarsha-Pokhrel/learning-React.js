import { useState } from "react";
import { formatMoney } from "../../utils/money"
import { DeliveryOptions } from "./DeliveryOptions"
import axios from 'axios'

export function CartItemDetail({cartItem, deliveryOptions,loadCart}){
    const [updating,setUpdating] = useState(false);
    const [quantity,setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async()=>{
      await axios.delete(`/api/cart-items/${cartItem.productId}`);
      await loadCart();
    }

    const updatingCartItem = ()=>{
        setUpdating(true);
    }

    const updateCartItem = async ()=>{
       await axios.put(`/api/cart-items/${cartItem.productId}`,{
          quantity,
       })
       await loadCart();
       setUpdating(false);
    }

    const discardUpdate = ()=>{
        setQuantity(cartItem.quantity)
        setUpdating(false);
    }

    return (
        <>
         
        <div className="cart-item-details-grid">
                <img className="product-image"
                    src={cartItem.product.image} />

                <div className="cart-item-details">
                    <div className="product-name">
                        {cartItem.product.name}
                    </div>
                    <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                    </div>
                    <div className="product-quantity">
                        <span>
                            Quantity:
                            {updating?<input type='text' className = "update-quantity" value={quantity}
                            onChange={(event)=>{
                                const inputQuantity= event.target.value;
                                setQuantity(Number(inputQuantity));
                            }}
                            onKeyDown={(event)=>{
                             event.key==='Enter' && updateCartItem();
                             event.key === 'Escape' && discardUpdate();
                            }}
                            />
                            :<span className="quantity-label">{cartItem.quantity}</span>}
                             
                        </span>
                        <span className="update-quantity-link link-primary" onClick={
                            updating? updateCartItem : updatingCartItem
                            }>
                            Update
                        </span>
                        <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                            Delete
                        </span>
                    </div>
                </div>
                
                    <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} 
                    loadCart={loadCart} />
            </div>        

        </>
    )
}