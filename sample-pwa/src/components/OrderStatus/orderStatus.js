import React from 'react'
import { useSelector } from 'react-redux'

const OrderStatus = () => {


  // const storeDetails = useSelector((state)=> state)
  // const cartId = storeDetails && storeDetails.cart && storeDetails.cart.cartId

  return (
    <div>
        <div className='order-status-message'>Your order placed successfully</div>
    </div>
  )
}

export default OrderStatus