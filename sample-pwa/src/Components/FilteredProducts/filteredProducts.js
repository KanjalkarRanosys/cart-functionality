import { useQuery } from '@apollo/client'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator'
import UseParseParams from '../CustomHooks/useParseParams'
import NoFilteredProducts from '../NoFilteredProducts/noFilteredProducts'
import ProductListing from '../ProductListing/productListing'
import { GET_FILTERED_PRODUCTS } from '../Queries/ProductListQueries/productListQueries'

const FilteredProducts = () => {

    const {search} = useLocation()

    const urlParams = UseParseParams(search)
    console.log(urlParams.query);

    const filteredProductsList = useQuery(GET_FILTERED_PRODUCTS, {
        variables: {"currentPage":1,"pageSize":12,"filters":{},"inputText":urlParams.query,"sort":{"relevance":"DESC"}},
        fetchPolicy: "no-cache"
    })


    console.log(filteredProductsList);
    console.log(urlParams);

    const data = filteredProductsList && filteredProductsList.data

  return (
    <div>
        {filteredProductsList.loading ? <div>{fullPageLoadingIndicator}</div>:
        data && data.products && data.products.items && data.products.items.length !==0 ?
            <ProductListing 
                data={data? data : null} 
                componentName="FILTERED PRODUCT LIST" 
            />
            : <NoFilteredProducts />
        }
    </div>
  )
}

export default FilteredProducts