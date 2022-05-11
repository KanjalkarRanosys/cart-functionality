import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GET_REGION, GUEST_ADDRESS, ITEM_COUNT, PRICE_SUMMARY } from '../queries/queries'
import "./ShippingForm.css"
import countriesData from '../../../addressData/addressData.json'
import { useHistory } from 'react-router-dom'


const ShippingForm = () => {
    
    const history = useHistory()

    console.log("countriesData", countriesData);
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

    const itemCount = useQuery(ITEM_COUNT, {
        "cartId": cartId,
    })

const subTotal = priceSummary && priceSummary.data && priceSummary.data.cart && priceSummary.data.cart.prices.subtotal_excluding_tax.value
const total = priceSummary && priceSummary.data && priceSummary.data.cart && priceSummary.data.cart.prices.subtotal_including_tax.value

const [setUserAddress, {data, error}] = useMutation(GUEST_ADDRESS)

const handleSubmit = async (e) => {
    e.preventDefault()
    await setUserAddress({
        variables: {
            address: address,
            email: email,
            cartId: cartId
        }
    })
    await !error && history.push('/payment')
}

const [regionData, lazyResults] = useLazyQuery(GET_REGION, {
    fetchPolicy: 'no-cache',
})

const handleChange = (e) => {
    setAddress({...address, country_code: e})
    regionData({
        variables: {
            countryCode : e
        }
    })
}

const regions = lazyResults && lazyResults.data && lazyResults.data.country && lazyResults.data.country.available_regions

  return (
    <div className='shipping'>
        <div className='shipping-form' >
        <h1 className='shipping-heading'>SHIPPING FORM</h1>
            <form onSubmit={handleSubmit}>
            <div className='shipping-input'>
                        <label>Email:</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            required
                        />
                </div>
                <div className='shipping-form-one-row'>
                    <div className='shipping-input'>
                            <label>Firstname:</label>
                            <input 
                                type="text"
                                value={address.firstname}
                                onChange={(e)=> setAddress({...address, firstname: e.target.value})}
                                required
                            />
                    </div>
                    <div className='shipping-input'>
                            <label>Lastname:</label>
                            <input 
                                type="text"
                                value={address.lastname}
                                onChange={(e)=> setAddress({...address, lastname: e.target.value})}
                                required
                            />
                    </div>
                </div>
                <div className='shipping-input'>
                        <label>Country:</label>
                        <select onChange={(e)=>handleChange(e.target.value)}
                            required
                        >
                            <option>Select Country</option>
                            {
                                countriesData.countries.map((el)=> (
                                    <option value={el.name} >{el.description}</option>
                                ))
                            }
                        </select>
                </div>
                <div className='shipping-input'>
                        <label>street Address:</label>
                        <input 
                            type="text"
                            value={address.street}
                            onChange={(e)=> setAddress({...address, street: e.target.value})}
                            required
                        />
                </div>
                <div className='shipping-input'>
                        <label>City:</label>
                        <input 
                            type="text"
                            value={address.city}
                            onChange={(e)=> setAddress({...address, city: e.target.value})}
                            required
                        />
                </div>
                <div className='shipping-input'>
                        <label>State:</label>
                        <select 
                            disabled={lazyResults.loading ? true : false }
                            className={lazyResults.loading && "disableRegion" }
                            onChange={(e)=> setAddress({...address, region: e.target.value})}
                            required
                        >
                            {
                                regions && regions.map((el)=> (
                                    <option value={el.id}>{el.name}</option>
                                ))
                            }
                        </select>
                </div>
                <div className='shipping-input'>
                        <label>Zip/ Postal Code:</label>
                        <input 
                            type="text"
                            value={address.postcode}
                            onChange={(e)=> setAddress({...address, postcode: e.target.value})}
                            required
                        />
                </div>
                <div className='shipping-input'>
                        <label>Phone Number:</label>
                        <input 
                            type="text"
                            value={address.telephone}
                            onChange={(e)=> setAddress({...address, telephone: e.target.value})}
                            required
                        />
                </div>
                <div className='shipping-button'>
                    <button type="submit">CONTINUE TO SHIPPING METHOD</button>
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