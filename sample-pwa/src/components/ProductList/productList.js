import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator';
import ProductListing from '../productListing/productListing';
import { GET_PRODUCTS } from '../queries/ProductListQueries/productListQueries';
import "./ProductList.css"

const ProductList = () => {

    const {data, loading} = useQuery(GET_PRODUCTS, {
        variables: {"currentPage":1,"id":"NDA=","filters":{"category_uid":{"eq":"Mzk="}},"pageSize":12,"sort":{"position":"ASC"}},
        fetchPolicy: "no-cache"
    })

  return (
    <div className='product-list'>
      {loading ? <div>{fullPageLoadingIndicator}</div>:
        <ProductListing data={data} componentName="PRODUCT LIST" />
      }
    </div>
  )
}

export default ProductList