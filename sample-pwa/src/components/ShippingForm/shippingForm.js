import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import CustomInput from '../input/customInput'
import { GUEST_ADDRESS, PRICE_SUMMARY } from '../queries/queries'
import "./ShippingForm.css"



const ShippingForm = () => {

    const [address, setAddress]= useState({
        city: "",
        country_code: "",
        firstname: "",
        lastname: "",
        postcode: "",
        region: "",
        street: [],
        telephone: ""
    })
    const [email, setEmail]= useState()

  const storeDetails = useSelector((state)=> state)
  const cartId = storeDetails && storeDetails.cart && storeDetails.cart.cartId

    const priceSummary = useQuery(PRICE_SUMMARY, {
        "cartId": cartId,
    })

    console.log(address);

const subTotal = priceSummary && priceSummary.data && priceSummary.data.cart && priceSummary.data.cart.prices.subtotal_excluding_tax.value
const total = priceSummary && priceSummary.data && priceSummary.data.cart && priceSummary.data.cart.prices.subtotal_including_tax.value

const [setUserAddress, {data}] = useMutation(GUEST_ADDRESS)

const handleSubmit = (e) => {
    e.preventDefault()
    setUserAddress({
        variables: {
            address: address,
            email: email,
            cartId: cartId
        }
    })
}

console.log(data);

  return (
    <div className='shipping'>
        <div className='shipping-form' >
        <h1 className='shipping-heading'>SHIPPING FORM</h1>
            <form onSubmit={handleSubmit}>
            <div className='shipping-input'>
                        <label>Email:</label>
                        <input 
                            type="text"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)} 
                        />
                </div>
                <div className='shipping-form-one-row'>
                    <div className='shipping-input'>
                            <label>Firstname:</label>
                            <input 
                                type="text"
                                value={address.firstname}
                                onChange={(e)=> setAddress({...address, firstname: e.target.value})} 
                            />
                    </div>
                    <div className='shipping-input'>
                            <label>Lastname:</label>
                            <input 
                                type="text"
                                value={address.lastname}
                                onChange={(e)=> setAddress({...address, lastname: e.target.value})} 
                            />
                    </div>
                </div>
                <div className='shipping-input'>
                        <label>Country:</label>
                        <input 
                            type="text"
                            value={address.country_code}
                            onChange={(e)=> setAddress({...address, country_code: e.target.value})} 
                        />
                </div>
                <div className='shipping-input'>
                        <label>street Address:</label>
                        <input 
                            type="text"
                            value={address.street}
                            onChange={(e)=> setAddress({...address, street: e.target.value})} 
                        />
                </div>
                <div className='shipping-input'>
                        <label>street Address 2:</label>
                        <input 
                            type="text"
                            value={address.street}
                            onChange={(e)=> setAddress({...address, street: e.target.value})} 
                        />
                </div>
                <div className='shipping-input'>
                        <label>City:</label>
                        <input 
                            type="text"
                            value={address.city}
                            onChange={(e)=> setAddress({...address, city: e.target.value})} 
                        />
                </div>
                <div className='shipping-input'>
                        <label>State:</label>
                        <input 
                            type="text"
                            value={address.state}
                            onChange={(e)=> setAddress({...address, state: e.target.value})} 
                        />
                </div>
                <div className='shipping-input'>
                        <label>Zip/ Postal Code:</label>
                        <input 
                            type="text"
                            value={address.postcode}
                            onChange={(e)=> setAddress({...address, postcode: e.target.value})} 
                        />
                </div>
                <div className='shipping-input'>
                        <label>Phone Number:</label>
                        <input 
                            type="text"
                            value={address.telephone}
                            onChange={(e)=> setAddress({...address, telephone: e.target.value})} 
                        />
                </div>
                <div className='sign-in-button'>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
        <div className='cart-price'>
            <div className='cart-total-quantity'>
                <div className='desc-quantity-total'>
                    <span className='desc-key'>Sub-Total: </span>
                    <span className='desc-value'>{subTotal}</span>
                </div>
                <br />
                <div className='desc-quantity-total'>
                <span className='desc-key'>Total: </span>
                <span className='desc-value'>{total}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShippingForm