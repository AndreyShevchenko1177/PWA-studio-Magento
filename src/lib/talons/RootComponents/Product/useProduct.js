import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '@magento/peregrine/lib/context/app';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/RootComponents/Product/product.gql';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that
 * controls the logic for the Product Root Component.
 *
 * @kind function
 *
 * @param {object}      props
 * @param {Function}    props.mapProduct - A function for updating products to the proper shape.
 * @param {GraphQLAST}  props.queries.getStoreConfigData - Fetches storeConfig product url suffix using a server query
 * @param {GraphQLAST}  props.queries.getProductQuery - Fetches product using a server query
 *
 * @returns {object}    result
 * @returns {Bool}      result.error - Indicates a network error occurred.
 * @returns {Bool}      result.loading - Indicates the query is in flight.
 * @returns {Bool}      result.product - The product's details.
 */
export const useProduct = props => {

    // console.log('+++useProduct+++');

    const { mapProduct } = props;

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getStoreConfigData, getProductDetailQuery } = operations;
    const { pathname } = useLocation();
    const [
        ,
        {
            actions: { setPageLoading }
        }
    ] = useAppContext();

    const { data: storeConfigData } = useQuery(getStoreConfigData, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const slug = pathname.split('/').pop();
    const productUrlSuffix = storeConfigData?.storeConfig?.product_url_suffix;
    const urlKey = productUrlSuffix ? slug.replace(productUrlSuffix, '') : slug;

    const { error, loading, data } = useQuery(getProductDetailQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !storeConfigData,
        variables: {
            urlKey
        }
    });

    const isBackgroundLoading = !!data && loading;

    const product = useMemo(() => {
        if (!data) {
            // The product isn't in the cache and we don't have a response from GraphQL yet.
            return null;
        }

        // Note: if a product is out of stock _and_ the backend specifies not to
        // display OOS items, the items array will be empty.

        // Only return the product that we queried for.
        let product = data.products.items.find(
            item => item.url_key === urlKey
        );

        if (!product) {
            return null;
        }

        let {media_gallery_entries: media} = product;

        const videoItem = {
            disabled: false,
            // file: "https://dropmefiles.com.ua/ua/CX9S8zvQ",
            // file: "src/media/ShortVideo.webm",
            // file: 'https://www.youtube.com/embed/Z8Z51no1TD0',
            file: 'https://drive.google.com/uc?export=view&id=1Jr_6LCFkbyOzWwoNq0dY5ray70NDZKMc',
            label: '',
            position: media.length+1,
            uid: Date.now().toString(),
            __typename: "MediaGalleryEntry",
            type: 'video',
        };

        media = [...media, videoItem]; ///+++++++++++++++++++++++++++++++++++

        product = {...product, 'media_gallery_entries': media}

        // console.log('+++DATA+++', product);

        return mapProduct(product);
    }, [data, mapProduct, urlKey]);

    const [, { dispatch }] = useEventingContext();

    // Update the page indicator if the GraphQL query is in flight.
    useEffect(() => {
        setPageLoading(isBackgroundLoading);
    }, [isBackgroundLoading, setPageLoading]);

    useEffect(() => {
        if (!error && !loading && product) {
            dispatch({
                type: 'PRODUCT_PAGE_VIEW',
                payload: {
                    id: product.id,
                    name: product.name,
                    sku: product.sku,
                    currency_code:
                        product?.price_range?.maximum_price?.final_price
                            ?.currency,
                    price_range: {
                        maximum_price: {
                            final_price:
                                product?.price_range?.maximum_price?.final_price
                                    ?.value
                        }
                    },
                    url_key: product.url_key
                }
            });
        }
    }, [error, loading, product, dispatch]);

    return {
        error,
        loading,
        product
    };
};
