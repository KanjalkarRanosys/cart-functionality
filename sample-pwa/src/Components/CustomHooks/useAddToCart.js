import { useMutation } from '@apollo/client';
import React from 'react'
import { ADD_PRODUCT_TO_CART } from '../Queries/CartQueries/cartQueries';

const UseAddToCart = ({cartId, quantity, selected_options, skuValue}) => {

    const [addToCart, { loading: addToCartLoader }] = useMutation(ADD_PRODUCT_TO_CART);


  return (
    addToCart
  )
}

export default UseAddToCart