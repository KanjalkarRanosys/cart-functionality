import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator';
import ProductListing from '../ProductListing/productListing';
import { GET_PRODUCTS } from '../Queries/ProductListQueries/productListQueries';
import "./ProductList.css"

const ProductList = () => {

    const {data, loading} = useQuery(GET_PRODUCTS, {
        variables: {"currentPage":1,"id":"NDA=","filters":{"category_uid":{"eq":"Mzk="}},"pageSize":12,"sort":{"position":"ASC"}},
        fetchPolicy: "no-cache"
    })

  return (
    <div className='product-list'>
      {loading ? <div>{fullPageLoadingIndicator}</div>:
      <div>
        <ProductListing data={data} componentName="PRODUCT LIST" />
      </div>
      }
    </div>
  )
}

export default ProductList