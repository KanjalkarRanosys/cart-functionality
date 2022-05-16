import React, { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useScrollTopOnChange } from '@magento/peregrine/lib/hooks/useScrollTopOnChange';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import HomePage from '../HomePage';
import MagentoRoute from '../MagentoRoute';
// import ProductList from '../ProductList/productList';
// import ViewProduct from '../ViewProduct/viewProduct';
// import ShoppingCart from '../ShoppingCart/shoppingCart';
import ProductList from '../../../../components/ProductList/productList';
import ViewProduct from '../../../../components/ViewProduct/viewProduct';
import ShoppingCart from '../../../../components/ShoppingCart/shoppingCart';
import Homepage from '../../../../components/homePage/homepage';
import SignIn from '../../../../components/SignIn/signIn';
import ShippingForm from '../../../../components/ShippingForm/shippingForm';
import Payment from '../../../../components/Payment/payment';
import OrderStatus from '../../../../components/OrderStatus/orderStatus';
import FilteredProducts from '../../../../components/FilteredProducts/filteredProducts';

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
