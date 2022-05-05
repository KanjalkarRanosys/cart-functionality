import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import ProductList from '../ProductList/productList'
// import Routes from '../Routes'

const GET_CART_COUNT = gql`
  query getItemCount($cartId:String!){
    cart(cart_id:$cartId){
      id ...CartTriggerFragment __typename}}fragment CartTriggerFragment on Cart{
        id total_quantity __typename}

`



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





const CustomHeader = () => {

  const storeDetails = useSelector((state)=> state)
  const cartId = storeDetails.cart ? storeDetails.cart.cartId : ""
  console.log(storeDetails);

  const {data} = useQuery(GET_CART_COUNT, {
    variables: {
      "cartId":cartId
    }
  })

  console.log(data);



  const cartIDDetails = useQuery(GET_CART_DETAILS, {
    variables: {
        "cartId": cartId
    }
})

console.log(cartIDDetails);

const subTotal = cartIDDetails.data ? cartIDDetails.data.cart.prices.subtotal_excluding_tax.value : 0
const quantity = cartIDDetails.data ? cartIDDetails.data.cart.total_quantity : 0

  

  return (
    <div style={{display: "flex", justifyContent:"space-around", padding: "10px 40px", background:"rgb(213 213 213)"}}>
        <Link to={'/'}>
            <button style={{backgroundColor: "gray", padding:"10px 80px", color: "white"}}>Home</button>
        </Link>
        <button style={{backgroundColor: "gray", padding:"10px 80px", color: "white"}}>T-Shirts</button>
        <button style={{backgroundColor: "gray", padding:"10px 80px", color: "white"}}>Dresses</button>
        <Link to={'/product-list'}>
            <button style={{backgroundColor: "gray", padding:"10px 80px", color: "white"}}
                onClick={()=>console.log("productList")}>
                    Product List
            </button>
        </Link>
        <Link to={'/shopping-cart'} style={{background:"#a5a9d9", display:"flex", justifyContent:"center", padding:"20px", alignItems:"center"}}>
          <span
            onClick={()=>console.log(
              "subTotal:", subTotal, 
              "quantity:", quantity
            )}
          >{data.cart.total_quantity}:Items Cart</span>
        </Link>
    </div>
  )
}

export default CustomHeader