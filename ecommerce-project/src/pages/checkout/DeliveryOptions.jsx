
import dayjs from "dayjs";
import axios from 'axios';
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({deliveryOptions,cartItem,loadCart}){    

    return (
        <>
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryOption) => {
                let priceString = 'FREE shipping'

                if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)}
            -shipping`;
                }

                  const deliveryDate = dayjs()
                    .add(deliveryOption.deliveryDays, 'day')
                    .format('dddd, MMM D');

                const updateDeliveryOption = async ()=>{
                    await axios.put(`/api/cart-items/${cartItem.productId}`,{
                    deliveryOptionId:deliveryOption.id
                })
                    await loadCart();
                }

                return (
                        <div key={deliveryOption.id} onClick={ updateDeliveryOption } 
                        className="delivery-option">

                            <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId}  onChange={()=>{}}
                                className="delivery-option-input"
                                name={`{delivery-option-${cartItem.productId}`} />
                            <div>
                                <div className="delivery-option-date">
                                   {deliveryDate}
                                </div>
                                <div className="delivery-option-price">
                                    {priceString}
                                </div>
                            </div>
                        </div>
                        )
             })}
            </div>     
        </>
    )
}