import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductListing from '../productListing/productListing';
import { GET_PRODUCTS } from '../queries/queries';
import "./ProductList.css"

const ProductList = props => {

    const {data, loading} = useQuery(GET_PRODUCTS, {
        variables: {"currentPage":1,"id":"NDA=","filters":{"category_uid":{"eq":"Mzk="}},"pageSize":12,"sort":{"position":"ASC"}}
    })

    console.log(loading);

  return (
    <div className='product-list'>
      {loading ? <div>LOADING...</div>:
        <ProductListing data={data} componentName="PRODUCT LIST" />
      }
    </div>
  )
}

export default ProductList