import { useMutation } from '@apollo/client';
import React from 'react';
import { ADD_PRODUCT_TO_CART } from '../Queries/CartQueries/cartQueries';

const AddToCart = (
    { el, selectedSize, selectedColor, 
        cartId, skuValue, selected_options, 
        quantity, setSelectedColor, setSelectedSize, 
        setSelectedOptions}
    ) => {

        console.log(el);


    const [addToCart] = useMutation(
        ADD_PRODUCT_TO_CART,
        {
            variables: {
                cartId: cartId,
                cartItem: {
                    quantity: quantity,
                    selected_options: selected_options,
                    sku: skuValue
                }
            }
        }
    );

    return (
        <div>
            <>

            <button
                disabled={
                    el.__typename == 'ConfigurableProduct'
                        ? !selectedColor && !selectedSize
                            ? true
                            : false  &&  el && el.configurable_options && el.configurable_options.length == 1 && selectedSize ?
                            true : false
                        : false
                }
                className={
                    el.__typename == 'ConfigurableProduct'
                        ? selectedColor && selectedSize
                            ? 'add-button'
                            : 'disable-add-button' &&  el && el.configurable_options && el.configurable_options.length == 1 && selectedSize
                            ? 'add-button'
                            : 'disable-add-button'
                        : 'add-button'
                }
                onClick={async () => {
                    el.__typename != 'ConfigurableProduct'
                        ? await addToCart()
                        : selectedColor && selectedSize
                        ? (await addToCart(),
                          setSelectedColor(),
                          setSelectedSize(),
                          setSelectedOptions([]))
                        : selectedSize &&
                          (await addToCart(),
                          setSelectedColor(),
                          setSelectedSize(),
                          setSelectedOptions([]));
                }}
            >
                Add To Cart
            </button>
            </>
        </div>
    );
};

export default AddToCart;
