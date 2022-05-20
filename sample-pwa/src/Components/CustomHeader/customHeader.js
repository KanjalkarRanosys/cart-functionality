import { useLazyQuery, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import CheckOutsideClicked from '../CustomHooks/checkOutsideClicked'
import { GET_CART_COUNT, GET_CART_DETAILS } from '../Queries/CartQueries/cartQueries'
import { SEARCHING_PRODUCTS } from '../Queries/ProductListQueries/productListQueries'
import "./CustomHeader.css"
import SearchPopup from './searchProductPopup'

const CustomHeader = () => {

  const storeDetails = useSelector((state)=> state)
  const cartId = storeDetails && storeDetails.cart ? storeDetails.cart.cartId : ""

  const history = useHistory()

  const[open, setOpen]= useState(false)
  const [inputValue, setInputValue] = useState()

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
    setInputValue(e.target.value)
    e.target.value.length > 2 ?
    getSearchingProducts({
      variables: {
        "inputText": e.target.value
      }
    }) : null
  }

  const searchingResults = searchingProducts && searchingProducts.data && searchingProducts.data.products && searchingProducts.data.products

  const handleClosePopup = ()=>{
    setOpen(false)
    setInputValue()
    getSearchingProducts({
      variables: {
        "inputText": null
      }
    })
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
          inputValue={inputValue}
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
              <span className='search-icon'>
                <img src='data:image/webp;base64,UklGRnQDAABXRUJQVlA4WAoAAAAQAAAA4AAA4AAAQUxQSCsCAAARDzD/ERFCdiTJbViRJW8RAkKBMiMykUJhKAwBnzIsXhWB29t93vxE9N+B20iKlN09HOhJD/xh+udyNcsCq5nd8OwnhaZavy7o/zv83/vAwmLjNfO1ja/cHJn+R/njcBhvlze8Am7IkkrBd0AhayoVD4CxSeMTV8d2drKpdWyvkk1tvUvXYyL0ukhXTvC7F9AFU3oXEAClN4NxxXqBnJUSDLTWDuMeDeyCcL8gJTcExcs8IRKTYAhEYm588BwXyEkmsjYjisB0QqQUZnCJWXAMcb4LHto3BWtrccax8C2kytzg5F/osHFUmZuAYOwhm0wkW+H4prRgduwq+cehQN4JlJf36OVHIn9Lyh8BP9BskGfgN527P8l6WcTV/YNglsSNSkTZ/0TEPVdH3udppY0hY77bkbXLJ6F0hsqnr3Zu54iGsrFy3KDEpIgNhdkGwrlS0LBvCBZk8yKiGhBskDiUejIz3PiB2RRynBV9zSVm97HsFO9+iEbRTtKQhfhnF0wZvkfVgBx7mN7MKL/V0EXkbQpIsWBMjgVjSiwY8MoYbqgQY3hFrRyE4QqY+zTjKw4TlC5YOokumDqZLnjRKRObuHNg3CT0SXmnp9LZvpuN5Nd55IKbv8X5uompLtJtmEnENQ5xxTOJ66aQMGuGyr3A3gWzOMEkXjCJF8zxv1xw1gQnTfCNwHv3KwmeBbaeU0XwolC7XkVwljiSxH4j8X4h0WaJbZJ4mf6lXBMAVlA4ICIBAADQHQCdASrhAOEAPpFCm0mlo6KhKn+IALASCWlu4XPeABnZ18/oB/APwA/QD8/e/wXWZmZmZmZmZctuypy+E1lfia70O7u7ttt3VYlZoNBhG2pBVYu7rHugpP/1cQ7NJl0ab2jVKe6Zqqprq9R8SnFMnfChmZlLTozMcTN3d3Dt+TSqfknKQN///Jco02Gi8TjHEC7BywMGsKqqmUlzidOgdBl09FS0YCJNIiGDzx/++Xh6aoa+K57OrNA2/RmZmZmY69zRpvapci1i4xVVVVVUTZU4nTmvso8b293d3d3cUNHr6YPcKaZmZmZmZT9pFVVVVVVVVVPAAP70MiN2e4eNZ93eqiqiMNpL9G/yiaGTXra8L1Uf/vGQJr7xkAAPGHQAAA==' /></span>
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