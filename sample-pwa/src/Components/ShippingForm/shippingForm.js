import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import "./ShippingForm.css"
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator'
import Payment from './Payment/payment'
import { PRICE_SUMMARY } from '../Queries/CartQueries/cartQueries'
import CheckoutShipping from './CheckOutShipping/checkoutShipping'


const ShippingForm = () => {

    const [showBilling, setShowBilling] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

  const storeDetails = useSelector((state)=> state)
  const cartId = storeDetails && storeDetails.cart && storeDetails.cart.cartId

    const priceSummary = useQuery(PRICE_SUMMARY, {
        "cartId": cartId,
    })

const subTotal = priceSummary && priceSummary.data && priceSummary.data.cart && priceSummary.data.cart.prices.subtotal_excluding_tax.value
const total = priceSummary && priceSummary.data && priceSummary.data.cart && priceSummary.data.cart.prices.subtotal_including_tax.value


  return (
    <div>
    {priceSummary.loading ? <div>{fullPageLoadingIndicator}</div>:
    !showBilling ? 
    <div>
    <CheckoutShipping showBilling={showBilling} setShowBilling={setShowBilling} setIsDisable={setIsDisable} setIsLoading={setIsLoading} total= {total} subTotal={subTotal} cartId={cartId} />
    </div> :
        <>
        <div className='shipping'>
            <Payment total= {total} subTotal={subTotal} cartId={cartId} />
            </div>
        {/* } */}
        </>
        }
    </div>
  )
}

export default ShippingForm