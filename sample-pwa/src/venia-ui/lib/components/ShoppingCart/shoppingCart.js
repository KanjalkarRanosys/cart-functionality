import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useSelector } from 'react-redux'
import { useState } from 'react'


const GET_CART_DETAILS = gql`
query MiniCartQuery(
    $cartId:String!
    ){
    cart(
        cart_id:$cartId
        ){
    id ...MiniCartFragment __typename}}fragment MiniCartFragment on Cart{id total_quantity prices{subtotal_excluding_tax{currency value __typename}subtotal_including_tax{
        currency value __typename}__typename}...ProductListFragment __typename}fragment ProductListFragment on Cart{id items{uid product{
            uid name url_key thumbnail{url __typename}stock_status ...on ConfigurableProduct{variants{attributes{uid __typename}product{
                uid thumbnail{url __typename}__typename}__typename}__typename}__typename}prices{price{currency value __typename}__typename}quantity ...on ConfigurableCartItem{
                    configurable_options{
                        configurable_product_option_uid option_label configurable_product_option_value_uid value_label __typename}__typename}__typename}__typename}
`


const DELETE_PRODUCT = gql`
mutation RemoveItemForMiniCart($cartId: String!, $itemId: ID!) {
  removeItemFromCart(input: {cart_id: $cartId, cart_item_uid: $itemId}) {
     cart {
        id
           ...MiniCartFragment
              ...CartPageFragment
                 __typename
                    }
                   __typename
                   }
                  }
                  fragment MiniCartFragment on Cart {
                     id
                       total_quantity
                      prices {
                         subtotal_excluding_tax {
                              currency
                                value
                                   __typename
                                    }
                                      subtotal_including_tax {
                                          currency
                                            value
                                              __typename
                                              }
                                               __typename
                                               }
                                                ...ProductListFragment
                                                 __typename
                                                }
                                                fragment ProductListFragment on Cart {
                                                   id
                                                    items {
                                                          uid
                                                          product {
                                                            uid
                                                            name
                                                            url_key
                                                            thumbnail {
                                                              url
                                                              __typename
                                                          }
                                                          stock_status
                                                          ... on ConfigurableProduct {
                                                              variants {
                                                                attributes {
                                                                  uid
                                                                  __typename
                                                              }
                                                              product {
                                                                  uid
                                                                  thumbnail {
                                                                    url
                                                                    __typename
                                                                }
                                                                __typename
                                                            }
                                                              __typename
                                                          }
                                                            __typename
                                                        }
                                                          __typename
                                                      }
                                                        prices {
                                                            price {
                                                              currency
                                                              value
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        quantity
                                                        ... on ConfigurableCartItem {
                                                            configurable_options {
                                                              configurable_product_option_uid
                                                              option_label
                                                              configurable_product_option_value_uid
                                                              value_label
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment CartPageFragment on Cart {
                                                        id
                                                        total_quantity
                                                        ...AppliedCouponsFragment
                                                        ...GiftCardFragment
                                                        ...ProductListingFragment
                                                        ...PriceSummaryFragment
                                                        __typename
                                                    }
                                                    
                                                    fragment AppliedCouponsFragment on Cart {
                                                        id
                                                        applied_coupons {
                                                          code
                                                          __typename
                                                      }
                                                      __typename
                                                  }
                                                    
                                                    fragment GiftCardFragment on Cart {
                                                        applied_gift_cards {
                                                          code
                                                          current_balance {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        __typename
                                                    }
                                                      id
                                                      __typename
                                                  }
                                                    
                                                    fragment ProductListingFragment on Cart {
                                                        id
                                                        items {
                                                          uid
                                                          product {
                                                            uid
                                                            name
                                                            sku
                                                            url_key
                                                            thumbnail {
                                                              url
                                                              __typename
                                                          }
                                                          small_image {
                                                              url
                                                              __typename
                                                          }
                                                          stock_status
                                                          ... on ConfigurableProduct {
                                                              variants {
                                                                attributes {
                                                                  uid
                                                                  __typename
                                                              }
                                                              product {
                                                                  uid
                                                                  small_image {
                                                                    url
                                                                    __typename
                                                                }
                                                                __typename
                                                            }
                                                              __typename
                                                          }
                                                            __typename
                                                        }
                                                          __typename
                                                      }
                                                        prices {
                                                            price {
                                                              currency
                                                              value
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        quantity
                                                        errors {
                                                            code
                                                            message
                                                            __typename
                                                        }
                                                        ... on ConfigurableCartItem {
                                                            configurable_options {
                                                              id
                                                              configurable_product_option_uid
                                                              option_label
                                                              configurable_product_option_value_uid
                                                              value_label
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment PriceSummaryFragment on Cart {
                                                        id
                                                        items {
                                                          uid
                                                          quantity
                                                          __typename
                                                      }
                                                      ...ShippingSummaryFragment
                                                      prices {
                                                          ...TaxSummaryFragment
                                                          ...DiscountSummaryFragment
                                                          ...GrandTotalFragment
                                                          subtotal_excluding_tax {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        subtotal_including_tax {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        __typename
                                                    }
                                                      ...GiftCardSummaryFragment
                                                      ...GiftOptionsSummaryFragment
                                                      __typename
                                                  }
                                                    
                                                    fragment DiscountSummaryFragment on CartPrices {
                                                        discounts {
                                                          amount {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        label
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment GiftCardSummaryFragment on Cart {
                                                        id
                                                        applied_gift_cards {
                                                          code
                                                          applied_balance {
                                                            value
                                                            currency
                                                            __typename
                                                        }
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment GiftOptionsSummaryFragment on Cart {
                                                        id
                                                        prices {
                                                          gift_options {
                                                            printed_card {
                                                              value
                                                              currency
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment GrandTotalFragment on CartPrices {
                                                        grand_total {
                                                          currency
                                                          value
                                                          __typename
                                                      }
                                                      __typename
                                                  }
                                                    
                                                    fragment ShippingSummaryFragment on Cart {
                                                        id
                                                        shipping_addresses {
                                                          selected_shipping_method {
                                                            amount {
                                                              currency
                                                              value
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        street
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment TaxSummaryFragment on CartPrices {
                                                        applied_taxes {
                                                          amount {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        __typename
                                                    }
                                                      __typename
                                                  }

  `


  const UPDATE_QUANTITY = gql`
  mutation updateItemQuantity($cartId: String!, $itemId: ID!, $quantity: Float!) {
    updateCartItems(
      input: {cart_id: $cartId, cart_items: [{cart_item_uid: $itemId, quantity: $quantity}]}
    ) {
      cart {
        id
        ...CartPageFragment
        ...AvailableShippingMethodsCartFragment
        __typename
      }
      __typename
    }
  }
  
  fragment CartPageFragment on Cart {
    id
    total_quantity
    ...AppliedCouponsFragment
    ...GiftCardFragment
    ...ProductListingFragment
    ...PriceSummaryFragment
    __typename
  }
  
  fragment AppliedCouponsFragment on Cart {
    id
    applied_coupons {
      code
      __typename
    }
    __typename
  }
  
  fragment GiftCardFragment on Cart {
    applied_gift_cards {
      code
      current_balance {
        currency
        value
        __typename
      }
      __typename
    }
    id
    __typename
  }
  
  fragment ProductListingFragment on Cart {
    id
    items {
      uid
      product {
        uid
        name
        sku
        url_key
        thumbnail {
          url
          __typename
        }
        small_image {
          url
          __typename
        }
        stock_status
        ... on ConfigurableProduct {
          variants {
            attributes {
              uid
              __typename
            }
            product {
              uid
              small_image {
                url
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      prices {
        price {
          currency
          value
          __typename
        }
        __typename
      }
      quantity
      errors {
        code
        message
        __typename
      }
      ... on ConfigurableCartItem {
        configurable_options {
          id
          configurable_product_option_uid
          option_label
          configurable_product_option_value_uid
          value_label
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment PriceSummaryFragment on Cart {
    id
    items {
      uid
      quantity
      __typename
    }
    ...ShippingSummaryFragment
    prices {
      ...TaxSummaryFragment
      ...DiscountSummaryFragment
      ...GrandTotalFragment
      subtotal_excluding_tax {
        currency
        value
        __typename
      }
      subtotal_including_tax {
        currency
        value
        __typename
      }
      __typename
    }
    ...GiftCardSummaryFragment
    ...GiftOptionsSummaryFragment
    __typename
  }
  
  fragment DiscountSummaryFragment on CartPrices {
    discounts {
      amount {
        currency
        value
        __typename
      }
      label
      __typename
    }
    __typename
  }
  
  fragment GiftCardSummaryFragment on Cart {
    id
    applied_gift_cards {
      code
      applied_balance {
        value
        currency
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment GiftOptionsSummaryFragment on Cart {
    id
    prices {
      gift_options {
        printed_card {
          value
          currency
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment GrandTotalFragment on CartPrices {
    grand_total {
      currency
      value
      __typename
    }
    __typename
  }
  
  fragment ShippingSummaryFragment on Cart {
    id
    shipping_addresses {
      selected_shipping_method {
        amount {
          currency
          value
          __typename
        }
        __typename
      }
      street
      __typename
    }
    __typename
  }
  
  fragment TaxSummaryFragment on CartPrices {
    applied_taxes {
      amount {
        currency
        value
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment AvailableShippingMethodsCartFragment on Cart {
    id
    shipping_addresses {
      available_shipping_methods {
        amount {
          currency
          value
          __typename
        }
        available
        carrier_code
        carrier_title
        method_code
        method_title
        __typename
      }
      street
      __typename
    }
    __typename
  }
  
  `

const ShoppingCart = () => {

    const storeDetails = useSelector((state)=> state)
    const cartId = storeDetails && storeDetails.cart && storeDetails.cart.cartId

    
  const cartIDDetails = useQuery(GET_CART_DETAILS, {
    variables: {
        "cartId": cartId,
    }
})


console.log(cartIDDetails);

const [productCount, setProductCount] = useState()
const [updateItem, setUpdateItem] = useState()
const [deleteItem, setDeleteItem] = useState()

const decreaseQuantity = (productCount) => {
  console.log(productCount);
    setProductCount(productCount - 1)

}

const increaseQuantity = (productCount) => {
  console.log(productCount);
    setProductCount(productCount + 1)
}

const [deleteProduct, {data}] = useMutation(DELETE_PRODUCT, {
    variables: {
        "cartId": cartId,
        "itemId": deleteItem
    }
})


const [updateQuantity] = useMutation(UPDATE_QUANTITY, {
  variables: {
    cartId:cartId,
    itemId: updateItem && updateItem,
    quantity:productCount
  }
})

console.log(deleteItem);
console.log(updateItem);


const subTotal = cartIDDetails && cartIDDetails.data && cartIDDetails.data.cart && cartIDDetails.data.cart.prices.subtotal_excluding_tax.value
const quantity = cartIDDetails && cartIDDetails.data && cartIDDetails.data.cart && cartIDDetails.data.cart.total_quantity

  return (
    <div>
        {cartIDDetails && cartIDDetails.data && cartIDDetails.data.cart && cartIDDetails.data.cart.items ?
        <div>
        <div>Sub-Total: {subTotal}</div>
        <div>Total Quantity: {quantity}</div>
        { 
            cartIDDetails.data.cart.items.map((el)=> (
                <div style={{border:"1px solid", margin:"10px"}}>
                    <span>Name: {el.product.name}</span>
                    <img src={el.product.thumbnail.url} style={{width:"150px", height:"150px"}} />
                    <div>Quantity: 
                        <button style={{width:"50px", height:"50px"}}
                            onClick={ async ()=> {
                              await setProductCount(el.quantity - 1)
                              await setUpdateItem(el.uid)
                              await updateQuantity()
                              await setUpdateItem()
                            }}
                        >-</button>
                            {el.quantity }
                        <button style={{width:"50px", height:"50px"}}
                            onClick={ async ()=> {
                              await setProductCount(el.quantity + 1)
                              await setUpdateItem(el.uid)
                              await updateQuantity()
                              await setUpdateItem()
                            } }
                        >+</button>
                    </div>
                    <div>Product Price: ${el.prices.price.value}</div>
                    <div>Fashion Color: {el.configurable_options[0].value_label}</div>
                    <button style={{padding:"30px", background:"RED", color:"#fff"}}
                    onClick={async ()=>{
                      await setDeleteItem(el.uid),
                      await deleteProduct()
                    }}                    
                    >DELETE</button>
                </div>
            ))
        }
        </div> : <span> There are no items in your cart</span>
}
    </div>
  )
}

export default ShoppingCart

