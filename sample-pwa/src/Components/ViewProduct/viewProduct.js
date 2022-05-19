import { useQuery } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator';
import AddToCart from '../AddToCart/addToCart';
import UseQuantityCounter from '../CustomHooks/useQuantityCounter';
import { VIEW_PRODUCT } from '../Queries/SingleProductQueries/singleProductQueries';
import './ViewProduct.css';

const ViewProduct = () => {
    const params = useParams();

    const urlKey = params.name.replace(/ /g, '-').toLowerCase();


    const { data, loading } = useQuery(VIEW_PRODUCT, {
        variables: { urlKey: urlKey }
    });

    const [selectedSize, setSelectedSize] = useState(false);
    const [selectedColor, setSelectedColor] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selected_options, setSelectedOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const storeDetails = useSelector(state => state);
    const cartId = storeDetails.cart.cartId;

    const skuGet =
        data && data.products && data.products.items.find(el => (
            urlKey === el.url_key
        ));
    const skuValue = skuGet && skuGet.sku + '';

    // called custom hook for update quantity
    const [increament, decreament, count] = UseQuantityCounter(quantity)

    console.log(increament, decreament, count);

    return (
        <div className="view-product-details">
            {loading ? (
                <div>{fullPageLoadingIndicator}</div>
            ) : (
                <>
                    {data &&
                        data.products &&
                        data.products.items.map(el => (
                            el.url_key === urlKey &&
                            <>
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
                                        {el.__typename == "ConfigurableProduct" &&
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
                                            {el.configurable_options &&
                                                    el.configurable_options.map(
                                                        element =>
                                                            element.attribute_code ==
                                                                'fashion_size' && (
                                                                <div className="detail-text">
                                                                    Fashion
                                                                    Size:
                                                                </div>
                                                            )
                                                    )}
                                                {/* <div className="detail-text">
                                                    Fashion Size:
                                                </div> */}
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
}
                                        <div className="view-product-quantity">
                                            Quantity:
                                            <div className="grp-column">
                                                <button
                                                    className={
                                                        count == 1
                                                            ? 'disableQuantityUpdate'
                                                            : 'quantityButton'
                                                    }
                                                    onClick={decreament}
                                                >
                                                    -
                                                </button>
                                                <div className="quantity-text">
                                                    {count}
                                                </div>
                                                <button
                                                    className="quantityButton"
                                                    onClick={increament}
                                                >   
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <AddToCart 
                                            typename={el.__typename}
                                            selectedColor={selectedColor}
                                            selectedSize={selectedSize}
                                            urlKey={urlKey}
                                            cartId={cartId}
                                            quantity={count}
                                            skuValue={skuValue}
                                            selected_options={selected_options}
                                            setSelectedColor={setSelectedColor}
                                            setSelectedSize={setSelectedSize}
                                            setSelectedOptions={setSelectedOptions}
                                            setIsLoading={setIsLoading}
                                            isLoading={isLoading}
                                            el={el}
                                        />
                                        {/* <button
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
                                                el.__typename !=
                                                'ConfigurableProduct'
                                                    ? await addToCart() : selectedColor &&
                                                      selectedSize ?
                                                      (await addToCart(),
                                                      setSelectedColor(),
                                                      setSelectedSize(),
                                                      setSelectedOptions([]))
                                                    : selectedSize &&
                                                      (await addToCart(),
                                                      setSelectedColor(),
                                                      setSelectedSize(),
                                                      setSelectedOptions([]))
                                            }}
                                        >
                                            Add To Cart
                                        </button> */}
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
</>
                            // </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default ViewProduct;
