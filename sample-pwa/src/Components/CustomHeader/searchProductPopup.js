import React from 'react';
import { Link } from 'react-router-dom';
import { fullPageLoadingIndicator } from '../../venia-ui/lib/components/LoadingIndicator';

const SearchPopup = ({
    open,
    searchingResults,
    handleClose,
    handleSearchProducts,
    filteredSearchProducts,
    searchingProducts,
    inputValue
}) => {
    if (!open) {
        return null;
    }

    console.log(searchingProducts);

    return (
        <div>
            {/* {searchingProducts && searchingProducts.loading ? <div>{fullPageLoadingIndicator}</div> : */}
            <form onSubmit={filteredSearchProducts}>
                <div className="searching-items">
                    <div
                        className="search-box-close-button"
                        onClick={() => handleClose()}
                    >
                        {' '}
                        <span>✖</span>
                    </div>
                    <div className="search-products">
                        <div className="input-search">
                            <input
                                autoFocus
                                placeholder="search"
                                type="text"
                                className="search-input"
                                onChange={e => {
                                    handleSearchProducts(e);
                                }}
                                value={inputValue}
                            />
                        </div>
                        {searchingProducts && !searchingProducts.loading &&
                        <div className="searching-list">
                            {searchingResults &&
                                searchingResults.items &&
                                searchingResults.items.map(el => (
                                    <div className="searching-one-product">
                                        <div>
                                            <Link
                                                onClick={() => handleClose()}
                                                to={`/view-product/${
                                                    el.url_key
                                                }`}
                                            >
                                                <img src={el.small_image.url} />
                                            </Link>
                                        </div>

                                        <div>{el.name}</div>
                                        <div>
                                            $
                                            {el.price.regularPrice.amount.value}
                                        </div>
                                    </div>
                                ))}
                        </div> 
                        // : <div>Loading...</div>
                        }
                    </div>
                </div>
            </form>
            {/* } */}
        </div>
    );
};

export default SearchPopup;
