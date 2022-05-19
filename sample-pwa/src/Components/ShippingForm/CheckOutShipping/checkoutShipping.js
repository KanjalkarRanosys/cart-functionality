import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { GET_REGION, GUEST_ADDRESS } from '../../Queries/ShippingQueries/shippingQueries'
// import countriesData from '../../../AddressData/addressData.json'
import countriesData from '../../../../AddressData/addressData.json'
import { PRICE_SUMMARY } from '../../Queries/CartQueries/cartQueries'
import { useSelector } from 'react-redux'
import ShippingBill from '../ShippingBill/shippingBill'

const CheckoutShipping = ({showBilling, setShowBilling, setIsDisable, setIsLoading, total, subTotal, cartId }) => {

const [setUserAddress, {data, loading: setUserLoading, error}] = useMutation(GUEST_ADDRESS)

setUserLoading && setIsLoading(true)

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


const handleSubmit = async (e) => {
    e.preventDefault()
    await setUserAddress({
        variables: {
            address: address,
            email: email,
            cartId: cartId
        }
    })
    await setIsDisable(true)
    await setShowBilling(true)
}

const [regionData, regionResults] = useLazyQuery(GET_REGION, {
    fetchPolicy: 'no-cache',
})

const handleChange = async (e) => {
    await setAddress({...address, country_code: e})
    await regionData({
        variables: {
            countryCode : e
        }
    })
}



const regions = regionResults && regionResults.data && regionResults.data.country && regionResults.data.country.available_regions


  return (
    <div className='shipping'>
        <>
        <div className='shipping-form' >
        <h1 className='shipping-heading'>SHIPPING FORM</h1>
            <form onSubmit={handleSubmit}>
            <div className='shipping-input'>
                        <label>Email:</label>
                        <input 
                            type="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                            disabled={regionResults.loading ? true : false }
                            className={regionResults.loading && "disableRegion" }
                            onChange={(e)=> setAddress({...address, region: e.target.value})}
                            required
                        >
                        <option value={null} >{regionResults.loading ? "Loading" : "Select State"}</option>
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
                    <button type="submit" className={setUserLoading ? "disable-shipping" : "not-disable-shipping"}
                        disabled={setUserLoading && true}
                    >CONTINUE TO SHIPPING METHOD</button>
                </div>
            </form>
        </div>
        <div className='cart-price'>
            
        <ShippingBill total= {total} subTotal={subTotal} cartId={cartId} />
        </div>
        </>
    </div>
  )
}

export default CheckoutShipping