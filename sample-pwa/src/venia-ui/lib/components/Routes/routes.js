import React, { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useScrollTopOnChange } from '@magento/peregrine/lib/hooks/useScrollTopOnChange';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import HomePage from '../HomePage';
import MagentoRoute from '../MagentoRoute';
// import ProductList from '../ProductList/productList';
// import ViewProduct from '../ViewProduct/viewProduct';
// import ShoppingCart from '../ShoppingCart/shoppingCart';
import ProductList from '../../../../Components/ProductList/productList';
import ViewProduct from '../../../../Components/ViewProduct/viewProduct';
import ShoppingCart from '../../../../Components/ShoppingCart/shoppingCart';
import Homepage from '../../../../Components/HomePage/homepage';
import SignIn from '../../../../Components/SignIn/signIn';
import ShippingForm from '../../../../Components/ShippingForm/shippingForm';
import Payment from '../../../../Components/ShippingForm/Payment/payment';
import OrderStatus from '../../../../Components/OrderStatus/orderStatus';
import FilteredProducts from '../../../../Components/FilteredProducts/filteredProducts';
import LandingPage from '../../../../Components/LandingPage/landingPage';
// import LandingPage from '../../../../Components/LandingPage/landingPage';

const Routes = () => {
    const { pathname } = useLocation();
    useScrollTopOnChange(pathname);

    return (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Switch>
                {/*
                 * Client-side routes are injected by BabelRouteInjectionPlugin here.
                 * Venia's are defined in packages/venia-ui/lib/targets/venia-ui-intercept.js
                 */}
                 <Route>
                     <Route exact path="/">
                         <Homepage />
                     </Route>

                    <Route path="/product-list">
                        <ProductList />
                    </Route>

                    <Route exact path="/view-product/:name">
                        <ViewProduct />
                    </Route>

                    <Route path="/shopping-cart">
                        <ShoppingCart />
                    </Route>

                    <Route path="/payment">
                        <Payment />
                    </Route>

                    <Route path="/sign-in">
                        <SignIn />
                    </Route>

                    <Route path="/checkout">
                        <ShippingForm />
                    </Route>

                    <Route path="/order-placed">
                        <OrderStatus />
                    </Route>
                    
                    <Route path="/filtered-products">
                        <FilteredProducts />
                    </Route>

                    <Route path="/landing-page">
                        <LandingPage />
                    </Route>
                    
                 </Route>
                <Route>
                    <MagentoRoute />
                    {/*
                     * The Route below is purposefully nested with the MagentoRoute above.
                     * MagentoRoute renders the CMS page, and HomePage adds a stylesheet.
                     * HomePage would be obsolete if the CMS could deliver a stylesheet.
                     */}
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
const availableRoutes = [];
export { availableRoutes };
