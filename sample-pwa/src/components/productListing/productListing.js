import React from 'react'
import { Link } from 'react-router-dom';
import NoFilteredProducts from '../NoFilteredProducts/noFilteredProducts';
import "./ProductListing.css"

const ProductListing = (props) => {

  return (
  <div className='product-listing'>
    {props.data && props.data.products && props.data.products.items.length != 0 ? 
    <>
    <div className='component-header'>
      <h2>{props.componentName}</h2>   
    </div>
    <div className='product-list'>
        {console.log(props.data)}
        { props.data && props.data.products && props.data.products.items.map((el)=>(
        <div className='row-product'>
            <Link to={`/view-product/${el.url_key}`}>
                <div><img src={el.small_image.url} className="row-product-img"/> </div>
                <div className='detail-text-desc'>{el.name}</div>
            </Link>
            <div className='detail-text-desc'>${el.price_range.maximum_price.regular_price.value}</div>
            <Link to={`/view-product/${el.url_key}`}>
                <button className='list-add-button'>ADD TO CART</button>
            </Link>
        </div>
        ))
        } 
    </div>
    </>
    : <div><NoFilteredProducts componentName= {props.componentName}/></div>
    }
    </div>
  )
}

export default ProductListing