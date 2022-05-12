import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import "./ShoppingCart.css"
import { DELETE_PRODUCT, GET_CART_DETAILS, UPDATE_QUANTITY } from '../queries/queries'
import { Link } from 'react-router-dom'
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator'

const ShoppingCart = () => {

  const storeDetails = useSelector((state)=> state)
  const cartId = storeDetails && storeDetails.cart && storeDetails.cart.cartId


  const [productCount, setProductCount] = useState()
  const [updateItem, setUpdateItem] = useState()
  const [deleteItem, setDeleteItem] = useState()

    
  const cartIDDetails = useQuery(GET_CART_DETAILS, {
    variables: {
        "cartId": cartId,
    }
})

const [deleteProduct, {data}] = useMutation(DELETE_PRODUCT, {
    variables: {
        "cartId": cartId,
        "itemId": deleteItem
    }
})


const [updateQuantity, {loading}] = useMutation(UPDATE_QUANTITY, {
  variables: {
    cartId:cartId,
    itemId: updateItem && updateItem,
    quantity:productCount
  }
})

console.log(cartIDDetails);

const subTotal = cartIDDetails && cartIDDetails.data && cartIDDetails.data.cart && cartIDDetails.data.cart.prices.subtotal_excluding_tax.value
const quantity = cartIDDetails && cartIDDetails.data && cartIDDetails.data.cart && cartIDDetails.data.cart.total_quantity

  return (
    <div className='cart'>
    {loading ? <div>{fullPageLoadingIndicator}</div>:
    <>
        {cartIDDetails && cartIDDetails.data && cartIDDetails.data.cart && cartIDDetails.data.cart.items ?
        <div className='cart-product-list'>

        <h1 className='cart-heading'>CART</h1>
          
        {cartIDDetails.data.cart.items.map((el)=> (
                <div className='cart-one-product'>
                  <div>
                    <Link to={`/view-product/${el.product.name}`}>
                      <img src={el.product.thumbnail.url} className='cart-one-product-img' />
                    </Link>
                  </div>
                  <div className='cart-one-product-desc'>
                    <div className='cart-one-product-desc-detail'>
                      <div>
                        <span className='desc-key'>{el.product.name} </span>
                      </div>
                      <div className='padding-desc'>Product Price: ${el.prices.price.value}</div>
                      <div className='padding-desc'>Fashion Color: {el.configurable_options.map((item)=>(
                        item.option_label == "Fashion Color" && item.value_label
                      ))}</div>
                      <div className='padding-desc'>Fashion Size: {el.configurable_options.map((item)=>(
                        item.option_label == "Fashion Size" && item.value_label
                      ))}</div>
                      <button className='delete-button'
                      onClick={async ()=>{
                        await setDeleteItem(el.uid),
                        await deleteProduct()
                      }}                    
                      >DELETE</button>
                    </div>
                    <div className='cart-quantity-delete'>
                      <div className='cart-quantity'>
                        <button className={el.quantity == 1 ? "disable-cart-Quantity-update" : "cart-quantity-update"}
                            onClick={ async ()=> {
                              el.quantity > 1 && await setProductCount(el.quantity - 1), await setUpdateItem(el.uid), await updateQuantity(), await setUpdateItem()
                              // !el.quantity == 1 && await 
                              // !el.quantity == 1 && await 
                              // !el.quantity == 1 && await 
                            }}
                        >-</button>
                            <span className='cart-single-product-quantity'>{el.quantity }</span>
                        <button className="cart-quantity-update"
                            onClick={ async ()=> {
                              await setProductCount(el.quantity + 1)
                              await setUpdateItem(el.uid)
                              await updateQuantity()
                              await setUpdateItem()
                            } }
                        >+</button>
                      </div>
                    </div>
                  </div>
              </div>
            ))
        }
        </div> : <span> There are no items in your cart</span>
      }
    <div className='cart-price'>
      <div className='cart-total-quantity'>
        <div className='desc-quantity-total'>
            <span className='desc-key'>Sub-Total: </span>
            <span className='desc-value'>{subTotal}</span>
        </div>
        <br />
        <div className='desc-quantity-total'>
          <span className='desc-key'>Total Quantity: </span>
          <span className='desc-value'>{quantity}</span>
        </div>
      </div>

      <div className='checkout-button'>
        <Link to='/checkout'>
          <button> PROCEED TO CHECKOUT</button>
        </Link>
      </div>
    </div>

</>}
    </div>
  )
}

export default ShoppingCart

