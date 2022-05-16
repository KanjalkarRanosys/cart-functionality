import { useQuery } from '@apollo/client'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator'
import ProductListing from '../productListing/productListing'
import { GET_FILTERED_PRODUCTS } from '../queries/ProductListQueries/productListQueries'

const FilteredProducts = () => {

    const parseParams = (params = "") => {
        const rawParams = params.replace("?", "").split("&");
        const extractedParams = {};
        rawParams.forEach((item) => {
          item = item.split("=");
          extractedParams[item[0]] = item[1];
        });
        return extractedParams;
      };

    const {search} = useLocation()

    const urlParams = parseParams(search)
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
            <ProductListing 
                data={data? data : null} 
                componentName="FILTERED PRODUCT LIST" 
            />
        }
    </div>
  )
}

export default FilteredProducts