import { useLazyQuery, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import CheckOutsideClicked from '../CustomHooks/checkOutsideClicked'
import { GET_CART_COUNT, GET_CART_DETAILS } from '../queries/CartQueries/cartQueries'
import { SEARCHING_PRODUCTS } from '../queries/ProductListQueries/productListQueries'
import "./CustomHeader.css"
import SearchPopup from './searchPopup'

const CustomHeader = () => {

  const storeDetails = useSelector((state)=> state)
  const cartId = storeDetails && storeDetails.cart ? storeDetails.cart.cartId : ""

  const history = useHistory()

  const [isSearchBox, setIsSearchBox] = useState(false)
  const [isSearchingResults, setIsSearchingResults]= useState()
  const[open, setOpen]= useState(false)

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
    setSearchResult(e.target.value)
    getSearchingProducts({
      variables: {
        "inputText": e.target.value
      }
    })
  }

  console.log(isSearchBox);

  console.log(searchingProducts);

  const [searchingData, setSearchingData] = useState()

  // !isSearchBox && searchingResults

  const searchingResults = searchingProducts && searchingProducts.data && searchingProducts.data.products && searchingProducts.data.products

  const handleClosePopup = ()=>{
    setOpen(false)
  }

  const handleOpenPopup = () => {
    {
      open ? setOpen(false) : setOpen(true)
    }
  }

  const [searchResult, setSearchResult] = useState()

  const filteredSearchProducts = async (e) => {
    e.preventDefault()
    await history.push("/filtered-products?query="+ searchResult)
    await setOpen(false)
  }

  console.log(searchingResults);
  return (
    <div className='custom-header' >
      <CheckOutsideClicked onClickOutside={handleClosePopup}>
        <SearchPopup 
          open={open} 
          handleClose={handleClosePopup} 
          searchingResults= {searchingResults} 
          handleSearchProducts={handleSearchProducts} 
          filteredSearchProducts={filteredSearchProducts}
          searchingProducts={searchingProducts}
        />
      </CheckOutsideClicked>


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
            <span 
              onClick={handleOpenPopup} 
              className='search-header'>
              <span className='search-icon'><img src='https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png' /></span>
              <span>Search</span>
            </span>
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