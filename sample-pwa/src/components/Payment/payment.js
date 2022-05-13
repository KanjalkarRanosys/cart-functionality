import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DELETE_CART, PRICE_SUMMARY, SHIPPING_METHOD } from '../queries/queries'
import "./Payment.css"

const Payment = (props) => {

    const history = useHistory()

    console.log(props);
    
    const storeDetails = useSelector((state)=> state)
    const cartId = storeDetails && storeDetails.cart && storeDetails.cart.cartId

    // console.log(storeDetails);

    // const priceSummary = useQuery(PRICE_SUMMARY, {
    //     "cartId": cartId,
    // })

    // console.log(priceSummary);

    // const subTotal = priceSummary && priceSummary.data && priceSummary.data.cart && priceSummary.data.cart.prices.subtotal_excluding_tax.value
    // const total = priceSummary && priceSummary.data && priceSummary.data.cart && priceSummary.data.cart.prices.subtotal_including_tax.value

    const handleSubmit = async (e) => {
        e.preventDefault()
        history.push('/order-placed')
    }

  return (
    <div>
        <div className='payment'>
            <div className='payment-form'>
                <form onSubmit={handleSubmit} >
                    <h1>PAYMENT FORM</h1>
                    <div className='payment-one-field'>
                        <label>Card Holder Name</label>
                        <input required type="text"/>
                    </div>
                    <div className='payment-one-field'>
                        <label>Card Number</label>
                        <input required type="text" className='number-without-up-down' 
                        maxLength="16" minLength="16"
                            // onChange={(e)=>{cardNumberChange(e, 16)}}
                        />
                    </div>
                    <div className='payment-one-field'>
                        <label>Expiry Date</label>
                        <input required type="month" />
                    </div>
                    <div className='payment-one-field'>
                        <label>CVV Number</label>
                        <input required type="text" 
                        maxLength="3" minLength="3" 
                        // onChange={(e)=>{cardNumberChange(e, 3)}} 
                        />
                    </div>
                    <div className='plcae-order-button'>
                        <button type='submit'>PLACE ORDER</button>
                    </div>
                </form>
            </div>
            <div className='cart-price'>
                <div className='cart-total-quantity'>
                        <div className='desc-quantity-total'>
                            <span className='desc-key'>Sub-Total: </span>
                            <span className='desc-value'>{props.subTotal}</span>
                        </div>
                    <br />
                    {/* <div className='desc-quantity-total'>
                        <span className='desc-key'>Shipping: </span>
                        <span className='desc-value'>Free</span>
                    </div> */}
                    <br />
                    <div className='desc-quantity-total'>
                        <span className='desc-key'>Total: </span>
                        <span className='desc-value'>{props.total}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment