import { useQuery } from '@apollo/client'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GET_CART_COUNT, GET_CART_DETAILS } from '../queries/queries'
import "./CustomHeader.css"

const CustomHeader = () => {

  const storeDetails = useSelector((state)=> state)
  const cartId = storeDetails && storeDetails.cart ? storeDetails.cart.cartId : ""

  const {data} = useQuery(GET_CART_COUNT, {
    variables: {
      "cartId":cartId
    }
  })

  const cartIDDetails = useQuery(GET_CART_DETAILS, {
    variables: {
        "cartId": cartId
    }
})

const subTotal = cartIDDetails && cartIDDetails.data && cartIDDetails.data.cart ? cartIDDetails.data.cart.prices.subtotal_excluding_tax.value : 0
const quantity = cartIDDetails && cartIDDetails.data && cartIDDetails.data.cart ? cartIDDetails.data.cart.total_quantity : 0

  console.log(data);

  return (
    <div className='custom-header' >
        <Link to={'/'} className="home-button">
            <button>Home</button>
        </Link>
        <button>T-Shirts</button>
        <button>New Products</button>
        <Link to={'/product-list'}>
            <button
                onClick={()=>console.log("productList")}>
                    Product List
            </button>
        </Link>
        <Link to={'/shopping-cart'} className="cart-button">
          <span
            onClick={()=>console.log(
              "subTotal:", subTotal, 
              "quantity:", quantity
            )}
          >{data && data.cart && data.cart.total_quantity}:Items Cart</span>
        </Link>
    </div>
  )
}

export default CustomHeader