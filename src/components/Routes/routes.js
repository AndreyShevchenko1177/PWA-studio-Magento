import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useScrollTopOnChange } from '@magento/peregrine/lib/hooks/useScrollTopOnChange';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import HomePage from '@magento/venia-ui/lib/components/HomePage';
import MagentoRoute from '@magento/venia-ui/lib/components/MagentoRoute';

const Andre = lazy(() => import('../Andre'));
const Countries = lazy(() => import('../Countries'));
const Country = lazy(() => import('../Country'));

const Routes = () => {
    const { pathname } = useLocation();
    useScrollTopOnChange(pathname);

    return (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Switch>
                <Route exact path='/andre'> <Andre /> </Route>
                <Route exact path='/countries'> <Countries /> </Route>
                <Route exact path='/country/:id?'> <Country /> </Route>
                {/*
                 * Client-side routes are injected by BabelRouteInjectionPlugin here.
                 * Venia's are defined in packages/venia-ui/lib/targets/venia-ui-intercept.js
                 */}
                <Route>
                    <MagentoRoute />
                    {/*
                     * The Route below is purposefully nested with the MagentoRoute above.
                     * MagentoRoute renders the CMS page, and HomePage adds a stylesheet.
                     * HomePage would be obsolete if the CMS could deliver a stylesheet.
                     */}
                    <Route exact path="/">
                        {/* <HomePage /> */}
                    </Route>
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
const availableRoutes = [];
export { availableRoutes };
