import React from 'react'
import { Link } from 'react-router-dom'
import "./OrderStatus.css"

const OrderStatus = () => {


  // const storeDetails = useSelector((state)=> state)
  // const cartId = storeDetails && storeDetails.cart && storeDetails.cart.cartId

  return (
    <div>
      <div className='order-status'>
        <div className='order-status-content'>
          <div className='order-status-img'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6UDaciCjE0HSz34x3Smqx-LP2Y_JFx_RbgqMbDzl4RfqKpIfjpp0WHh3sbwwMIy79qJ4&usqp=CAU' />
          </div>
          <div className='order-status-message'>
            <h2>Your order placed successfully</h2>
            <span>You will be receiving a email with confirmation details</span>
          </div>
          <div className='explore-more'>
            <Link to="/">
              <button>Explore more Dresses</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus