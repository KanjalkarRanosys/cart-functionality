import { useQuery, gql, useMutation } from '@apollo/client'
import { CartTriggerFragment } from '@magento/peregrine/lib/talons/Header/cartTriggerFragments.gql'
import { MiniCartFragment } from '@magento/peregrine/lib/talons/MiniCart/miniCartFragments.gql'
import { element } from 'prop-types'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './ViewProduct.css'

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

    const params = useParams()

    const urlKey = params.name.replace(/ /g,"-").toLowerCase()

    const {data} = useQuery(VIEW_PRODUCT, {
        variables: {"urlKey":urlKey}
    })

    console.log(data);

    const [selectedSize, setSelectedSize] = useState(false)
    const [selectedColor, setSelectedColor] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [sku, setSKU] = useState()
    const [selected_options, setSelectedOptions] = useState([])
    const storeDetails = useSelector((state)=> state)
    const cartId = storeDetails.cart.cartId
    const [isColor, setIsColor] = useState(false)


    const itemValues = data && data.products && data.products.items.map((el) => (
        el.configurable_options && el.configurable_options.map((el4) => el4.uid )
    ))

    const skuGet = data && data.products && data.products.items.map((el)=> (
        el.sku
    ))
    const skuValue = skuGet+""
    const configurable_options = itemValues && itemValues.map((e)=> e)


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

  return (
    <div className='view-product-details'>
        {data && data.products &&
            data.products.items.map((el)=> (
                <div>
                    <div className='view-product-detail'>
                        <img src={el.small_image.url} className="view-img"/>
                        <div className='view-product-desc'>
                            <div className='view-detail-heading'>
                                <span>{el.name}</span>
                            </div>
                                <div>Price: ${el.price.regularPrice.amount.value}</div>
                            <div>

                            {el.configurable_options.map((element)=>(
                                element.attribute_code == "fashion_color" &&
                                    <div className='detail-text'>Fashion Color:</div>
                                    )
                                )
                            }
                                <div className='fashion-size-options'>
                                    {el.configurable_options.map((element)=>(
                                        element.attribute_code == "fashion_color" &&
                                        element.values.map((item)=>(
                                            <div>
                                                {(selectedColor == item.uid) ? 
                                                <button 
                                                    className='selected-color'
                                                    style={{background:`${item.swatch_data.value}`}}
                                                    onClick={()=>{
                                                        setSelectedColor(item.uid),
                                                        setSelectedOptions([...selected_options, item.uid])
                                                    }}
                                                    >
                                                        <span className='check'>✔</span>
                                                </button> : 
                                                <button 
                                                className='non-selected-color'
                                                style={{background:`${item.swatch_data.value}`}}
                                                    onClick={()=>
                                                        {
                                                            setSelectedColor(item.uid),
                                                            setSelectedOptions([...selected_options, item.uid])
                                                        }
                                                    }
                                                    >
                                                        {/* {item.label} */}
                                                </button>
                                                }
                                            </div>
                                        ))
                                    ))}
                                </div>
                            </div>
                            
                            <div className='fashion-size'>
                                            <div className='detail-text' >Fashion Size:</div>
                                            <div className='fashion-size-options'>
                                {el.configurable_options.map((element)=>(
                                    element.attribute_code == "fashion_size" &&
                                    element.values.map((item)=>(
                                        <div>
                                            {(selectedSize == item.uid) ? 
                                            <button 
                                                className='selected-size'
                                                onClick={()=>{
                                                    setSelectedSize(item.uid),
                                                    setSelectedOptions([...selected_options, item.uid])
                                                }}
                                                >
                                                    {item.label}
                                            </button> : 
                                            <button 
                                            className='non-selected-size'
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
                            </div>
                                <div className='view-product-quantity'>

                                Quantity:
                                <div className='grp-column'>
                                    <button
                                        onClick={()=>{
                                            quantity>0 && setQuantity(quantity-1)}
                                        }
                                    >-</button>
                                        <div className='quantity-text'>
                                            {quantity}
                                        </div>
                                    <button
                                        onClick={()=>setQuantity(quantity+1)}
                                    >+</button>
                                    </div>
                                </div>
                            {/* <div className='divider' /> */}
                            <button 
                                disabled={!selectedColor && selectedSize ? true : false} 
                                className={selectedColor && selectedSize ? "add-button" : "disable-add-button" }
                                onClick={()=>{selectedColor && selectedSize && addToCart()}}
                            >Add To Cart</button>
                            </div>
                            {/* <div>
                                {el.media_gallery_entries.map((item)=> (
                                    item.file
                                ))}
                            </div> */}
                        </div>
                        <div className='divider' />
                        <div className='desc-details-features'>
                            <div className='desc-features'>
                                <div>
                                    <div className='details-heading'>DESCRIPTION</div>
                                    <div className='meta-desc'>{el.meta_description}</div>
                                </div>
                                <div>
                                    <div className='details-heading'>FEATURES</div>
                                    <div>This is features</div>
                                </div>
                            </div>
                            <div>
                                <div className='details-heading'>DETAILS</div>
                                <div>This is details</div>
                            </div>
                        </div>
                    </div>

                    // </div>
            ))


        }

    </div>
  )
}

export default ViewProduct