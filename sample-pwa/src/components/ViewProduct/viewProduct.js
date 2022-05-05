import { useQuery, gql, useMutation } from '@apollo/client'
import { CartTriggerFragment } from '@magento/peregrine/lib/talons/Header/cartTriggerFragments.gql'
import { MiniCartFragment } from '@magento/peregrine/lib/talons/MiniCart/miniCartFragments.gql'
import { element } from 'prop-types'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// import { MiniCartFragment, MINI_CART_QUERY } from '../MiniCart/miniCart.gql'

const VIEW_PRODUCT = gql`
query getProductDetailForProductPage($urlKey:String!){
    products(filter:{url_key:{eq:$urlKey}}){
        items{
            id uid ...ProductDetailsFragment __typename}__typename}}fragment ProductDetailsFragment on ProductInterface{__typename categories{
                uid breadcrumbs{category_uid __typename}__typename}description{html __typename}short_description{html __typename}id uid media_gallery_entries{
                    uid label position disabled file __typename}meta_description name price{
                        regularPrice{amount{currency value __typename}__typename}__typename}price_range{
                            maximum_price{final_price{currency value __typename}__typename}__typename}sku small_image{url __typename}stock_status url_key custom_attributes{
                                selected_attribute_options{attribute_option{uid label is_default __typename}__typename}entered_attribute_value{value __typename}attribute_metadata{
                                    uid code label attribute_labels{store_code label __typename
                                    }data_type is_system entity_type ui_input{
                                        ui_input_type is_html_allowed __typename}...on ProductAttributeMetadata{
                                            used_in_components __typename}__typename}__typename}...on ConfigurableProduct{
                                                configurable_options{attribute_code attribute_id uid label values{
                                                    uid default_label label store_label use_default_value value_index swatch_data{
                                                        ...on ImageSwatchData{thumbnail __typename}value __typename}__typename}__typename}variants{attributes{
                                                            code value_index __typename}product{
                                                                uid media_gallery_entries{
                                                                    uid disabled file label position __typename}sku stock_status price{
                                                                        regularPrice{amount{currency value __typename}__typename}__typename}price_range{
                                                                            maximum_price{final_price{currency value __typename}__typename}__typename}custom_attributes{
                                                                                selected_attribute_options{
                                                                                    attribute_option{
                                                                                        uid label is_default __typename}__typename}entered_attribute_value{
                                                                                            value __typename}attribute_metadata{
                                                                                                uid code label attribute_labels{store_code label __typename}data_type is_system entity_type ui_input{
                                                                                                    ui_input_type is_html_allowed __typename}...on ProductAttributeMetadata{
                                                                                                        used_in_components __typename}__typename}__typename}__typename}__typename}__typename}}
`



const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductToCartFromDialog(
        $cartId: String!
        $cartItem: CartItemInput!
    ) {
        addProductsToCart(cartId: $cartId, cartItems: [$cartItem]) {
            cart {
                id
                ...CartTriggerFragment
                ...MiniCartFragment
            }
        }
    }
    ${CartTriggerFragment}
    ${MiniCartFragment}
`;


const ViewProduct = () => {

    const dispatch = useDispatch()

    const params = useParams()
    console.log(params);

    const urlKey = params.name.replace(/ /g,"-").toLowerCase()

    console.log(urlKey);

    const {data} = useQuery(VIEW_PRODUCT, {
        variables: {"urlKey":urlKey}
    })

    console.log(data);

    const [selectedSize, setSelectedSize] = useState(false)

    const [quantity, setQuantity] = useState(1)
    const [sku, setSKU] = useState()
    const [selected_options, setSelectedOptions] = useState([])

    const storeDetails = useSelector((state)=> state)
    console.log(storeDetails);
    const cartId = storeDetails.cart.cartId
    const [confi,setConfi] = useState([])

    const itemValues = data && data.products && data.products.items.map((el) => (
        el.configurable_options && el.configurable_options.map((el4) => el4.uid )
    ))

    const skuGet = data && data.products && data.products.items.map((el)=> (
        el.sku
    ))

    // const selectedOptionsGet = data.products.items && data.products.items.configurable_options.map((el)=> (
    //     el.uid
    // ))

    // const selectedOptions = selectedOptionsGet+""

    const skuValue = skuGet+""

    console.log(itemValues);
    console.log(skuValue);
    // console.log(selectedOptionsGet);

    const configurable_options = itemValues && itemValues.map((e)=> e)

    console.log(configurable_options);


    const [addToCart, {loading, error}] = useMutation(ADD_PRODUCT_TO_CART, {
        variables:{
            "cartId":cartId,
            cartItem: {
                quantity: quantity,
                selected_options: selected_options,
                sku: skuValue
            }
        }
    })
    
    console.log(selected_options);

  return (
    <div>
        {data && data.products &&
            data.products.items.map((el)=> (
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    
                    <img src={el.small_image.url} style={{height:"350px", width:"350px"}} />
                    <span>Price: ${el.price.regularPrice.amount.value}</span>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <div>Fashion Size</div>
                        {el.configurable_options.map((element)=>(
                            element.values.map((item)=>(
                                <div>
                                    {(selectedSize == item.uid) ? 
                                    <button 
                                        style={{padding:"15px", color:"#fff", background:"rgb(169 169 181)", margin:"2px"}}
                                        onClick={()=>{
                                            setSelectedSize(item.uid),
                                            setSelectedOptions([...selected_options, item.uid])
                                        }}
                                        >
                                            {item.label}
                                    </button> : 
                                    <button 
                                        style={{padding:"15px", color:"#fff", background:"#2828a1", margin:"2px"}}
                                        onClick={()=>
                                            {
                                                setSelectedSize(item.uid),
                                                setSelectedOptions([...selected_options, item.uid])
                                            }
                                        }
                                        >
                                            {item.label}
                                    </button>
                                    }
                                </div>
                            ))
                        ))}
                    </div>
                    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                        <button style={{background:"rgb(169 169 181)", padding:"10px 30px"}}
                            onClick={()=>{
                                quantity>0 && setQuantity(quantity-1)}
                            }
                        >-</button>
                            <div>
                                Quantity: {quantity}
                            </div>
                        <button style={{background:"rgb(169 169 181)", padding:"10px 30px"}}
                            onClick={()=>setQuantity(quantity+1)}
                        >+</button>
                    </div>
                    <button
                        onClick={()=>addToCart()}
                    >Add To Cart</button>
                    </div>

                </div>
            ))
        }
    </div>
  )
}

export default ViewProduct