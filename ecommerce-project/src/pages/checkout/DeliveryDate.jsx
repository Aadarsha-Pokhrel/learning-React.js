import dayjs from "dayjs"

export function DeliveryDate({selectedDeliveryOption}){

    return (
        <>
            <div className="delivery-date">
                    Delivery date: {dayjs()
                    .add(selectedDeliveryOption.deliveryDays,'day')
                    .format('dddd, MMMM D')}
                </div>       
        </>
    )
}