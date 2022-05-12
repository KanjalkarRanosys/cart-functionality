import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator'
import ProductListing from '../productListing/productListing'
import { GET_DRESSES } from '../queries/queries'
import "./HomePage.css"

const Homepage = () => {

    const {data, loading} = useQuery(GET_DRESSES, {
        variables: {"currentPage":1,"id":"MzY=","filters":{"category_uid":{"eq":"MzY="}},"pageSize":12,"sort":{"position":"ASC"}}
    })

  return (
    <div>
    {loading ? <div>{fullPageLoadingIndicator}</div>:
    <>
      <div className='home-banner'>
        <div className='home-banner-content'>
          <h1 className='home-banner-content-heading'>Where does it come from?</h1>
          <p className='home-banner-content-details'>
            We are a global digital consulting company, 
            Contrary to popular belief, Lorem Ipsum is not simply random text. 
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
          <button className='home-banner-button'>SHOP NOW</button>
        </div>
      </div>
      <ProductListing data={data} componentName="TOP PRODUCTS" />
      </>
    }
    </div>
  )
}

export default Homepage