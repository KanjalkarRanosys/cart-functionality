import { useLazyQuery, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GET_CART_COUNT, GET_CART_DETAILS } from '../queries/CartQueries/cartQueries'
import { SEARCHING_PRODUCTS } from '../queries/ProductListQueries/productListQueries'
import "./CustomHeader.css"

const CustomHeader = () => {

  const storeDetails = useSelector((state)=> state)
  const cartId = storeDetails && storeDetails.cart ? storeDetails.cart.cartId : ""

  const [isSearchBox, setIsSearchBox] = useState(false)

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

  const [getSearchingProducts, searchingProducts] = useLazyQuery(SEARCHING_PRODUCTS, {
    fetchPolicy: "no-cache"
  })

  const handleSearchProducts = (e) => {
    getSearchingProducts({
      variables: {
        "inputText": e.target.value
      }
    })
  }

  console.log(isSearchBox);

  console.log(searchingProducts);

  const searchingResults = searchingProducts && searchingProducts.data && searchingProducts.data.products && searchingProducts.data.products

  console.log(searchingResults);
  return (
    <div className='custom-header' >
      { isSearchBox && 
        <div className='searching-items'>
          <div className='search-products'>
            <div className='input-search'>
              <input
              placeholder='search' 
                type="text" 
                className='search-input' 
                onChange={(e)=> {handleSearchProducts(e)}}
              />
            </div>
            <div className='searching-list'>
              {searchingResults && searchingResults.items && searchingResults.items.map((el)=> (
                <div className='searching-one-product'>
                  <div><img src={el.small_image.url} /></div>
                  <div>{el.name}</div>
                  <div>${el.price.regularPrice.amount.value}</div>
                </div>
              ))  }
            </div>
          </div>
        </div>
      }


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
        <div className="cart-button" >
          <div className='search-by-filter-button' >
            <button 
              onClick={()=> {
                setIsSearchBox(isSearchBox ? false : true)
              }} 
              className='flex-row'>
              <span className='search-icon'><img src='https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png' /></span>
              <span>Search</span>
            </button>
          </div>
          <Link to={'/shopping-cart'}>
            <span
              onClick={()=>console.log(
                "subTotal:", subTotal, 
                "quantity:", quantity
              )}
            >{data && data.cart && data.cart.total_quantity}:Items Cart</span>
          </Link>
        </div>
    </div>
  )
}

export default CustomHeader