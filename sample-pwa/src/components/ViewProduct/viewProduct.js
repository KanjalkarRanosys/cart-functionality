import { useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator';
import { ADD_PRODUCT_TO_CART } from '../queries/CartQueries/cartQueries';
import { VIEW_PRODUCT } from '../queries/SingleProductQueries/singleProductQueries';
import './ViewProduct.css';

const ViewProduct = () => {
    const params = useParams();

    const urlKey = params.name.replace(/ /g, '-').toLowerCase();

    const { data, loading } = useQuery(VIEW_PRODUCT, {
        variables: { urlKey: urlKey }
    });

    console.log(data);

    const [selectedSize, setSelectedSize] = useState(false);
    const [selectedColor, setSelectedColor] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selected_options, setSelectedOptions] = useState([]);
    const storeDetails = useSelector(state => state);
    const cartId = storeDetails.cart.cartId;
    const [isColor, setIsColor] = useState(false);
    const [isSize, setIsSize] = useState(false);

    const itemValues =
        data &&
        data.products &&
        data.products.items.map(
            el =>
                el.configurable_options &&
                el.configurable_options.map(el4 => el4.uid)
        );

    const skuGet =
        data && data.products && data.products.items.map(el => el.sku);
    const skuValue = skuGet + '';
    // const configurable_options = itemValues && itemValues.map((e)=> e)

    const [addToCart, { loading: addToCartLoader }] = useMutation(
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
        <div className="view-product-details">
            {addToCartLoader | loading ? (
                <div>{fullPageLoadingIndicator}</div>
            ) : (
                <>
                    {data &&
                        data.products &&
                        data.products.items.map(el => (
                            <div>
                                <div className="view-product-detail">
                                    <img
                                        src={el.small_image.url}
                                        className="view-img"
                                    />
                                    <div className="view-product-desc">
                                        <div className="view-detail-heading">
                                            <span>{el.name}</span>
                                        </div>
                                        <div>
                                            Price: $
                                            {el.price.regularPrice.amount.value}
                                        </div>
                                        {/* {el.__typename == "ConfigurableProduct"} */}
                                        <>
                                            <div>
                                                {el.configurable_options &&
                                                    el.configurable_options.map(
                                                        element =>
                                                            element.attribute_code ==
                                                                'fashion_color' && (
                                                                <div className="detail-text">
                                                                    Fashion
                                                                    Color:
                                                                </div>
                                                            )
                                                    )}
                                                <div className="fashion-size-options">
                                                    {el.configurable_options &&
                                                        el.configurable_options.map(
                                                            element =>
                                                                element.attribute_code ==
                                                                    'fashion_color' &&
                                                                element.values.map(
                                                                    item => (
                                                                        <div>
                                                                            {selectedColor ==
                                                                            item.uid ? (
                                                                                <button
                                                                                    className="selected-color"
                                                                                    style={{
                                                                                        background: `${
                                                                                            item
                                                                                                .swatch_data
                                                                                                .value
                                                                                        }`
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        setSelectedColor(
                                                                                            item.uid
                                                                                        ),
                                                                                            setSelectedOptions(
                                                                                                [
                                                                                                    ...selected_options,
                                                                                                    item.uid
                                                                                                ]
                                                                                            );
                                                                                    }}
                                                                                >
                                                                                    <span className="check">
                                                                                        ✔
                                                                                    </span>
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    className="non-selected-color"
                                                                                    style={{
                                                                                        background: `${
                                                                                            item
                                                                                                .swatch_data
                                                                                                .value
                                                                                        }`
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        setSelectedColor(
                                                                                            item.uid
                                                                                        ),
                                                                                            setSelectedOptions(
                                                                                                [
                                                                                                    ...selected_options,
                                                                                                    item.uid
                                                                                                ]
                                                                                            );
                                                                                    }}
                                                                                >
                                                                                    {/* {item.label} */}
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )
                                                        )}
                                                </div>
                                            </div>

                                            <div className="fashion-size">
                                                <div className="detail-text">
                                                    Fashion Size:
                                                </div>
                                                <div className="fashion-size-options">
                                                    {el.configurable_options &&
                                                        el.configurable_options.map(
                                                            element =>
                                                                element.attribute_code ==
                                                                    'fashion_size' &&
                                                                element.values.map(
                                                                    item => (
                                                                        <div>
                                                                            {selectedSize ==
                                                                            item.uid ? (
                                                                                <button
                                                                                    className="selected-size"
                                                                                    onClick={() => {
                                                                                        setSelectedSize(
                                                                                            item.uid
                                                                                        ),
                                                                                            setSelectedOptions(
                                                                                                [
                                                                                                    ...selected_options,
                                                                                                    item.uid
                                                                                                ]
                                                                                            );
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        item.label
                                                                                    }
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    className="non-selected-size"
                                                                                    onClick={() => {
                                                                                        setSelectedSize(
                                                                                            item.uid
                                                                                        ),
                                                                                            setSelectedOptions(
                                                                                                [
                                                                                                    ...selected_options,
                                                                                                    item.uid
                                                                                                ]
                                                                                            );
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        item.label
                                                                                    }
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )
                                                        )}
                                                </div>
                                            </div>
                                        </>
                                        <div className="view-product-quantity">
                                            Quantity:
                                            <div className="grp-column">
                                                <button
                                                    className={
                                                        quantity == 1
                                                            ? 'disableQuantityUpdate'
                                                            : 'quantityButton'
                                                    }
                                                    onClick={() => {
                                                        quantity > 1
                                                            ? setQuantity(
                                                                  quantity - 1
                                                              )
                                                            : null;
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <div className="quantity-text">
                                                    {quantity}
                                                </div>
                                                <button
                                                    className="quantityButton"
                                                    onClick={() =>
                                                        setQuantity(
                                                            quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        {/* <div className='divider' /> */}
                                        <button
                                            // disabled={!isColor && true}
                                            disabled={
                                                el.__typename ==
                                                'ConfigurableProduct'
                                                    ? !selectedColor &&
                                                      !selectedSize
                                                        ? true
                                                        : false
                                                    : false
                                            }
                                            className={
                                                el.__typename ==
                                                'ConfigurableProduct'
                                                    ? selectedColor &&
                                                      selectedSize
                                                        ? 'add-button'
                                                        : 'disable-add-button' &&
                                                          selectedSize
                                                        ? 'add-button'
                                                        : 'disable-add-button'
                                                    : 'add-button'
                                            }
                                            onClick={async () => {
                                                el.__typename ==
                                                'ConfigurableProduct'
                                                    ? selectedColor &&
                                                      selectedSize &&
                                                      (await addToCart())
                                                    ? selectedSize &&
                                                      (await addToCart(),
                                                      setSelectedColor(),
                                                      setSelectedSize(),
                                                      setSelectedOptions([])) : await addToCart() : await addToCart()
                                            }}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                                <div className="divider" />
                                <div className="desc-details-features">
                                    <div className="desc-features">
                                        <div>
                                            <div className="details-heading">
                                                DESCRIPTION
                                            </div>
                                            <div className="meta-desc">
                                                {el.meta_description}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="details-heading">
                                                FEATURES
                                            </div>
                                            <div>This is features</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="details-heading">
                                            DETAILS
                                        </div>
                                        <div>This is details</div>
                                    </div>
                                </div>
                            </div>

                            // </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default ViewProduct;
