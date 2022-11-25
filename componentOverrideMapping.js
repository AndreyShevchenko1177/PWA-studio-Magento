const veniaUiPackagePath = '@magento/venia-ui';
module.exports = componentOverrideMapping = {
    [`${veniaUiPackagePath}/lib/components/ProductFullDetail/productFullDetail.js`]: 'src/components/ProductFullDetail/productFullDetail.js', 
    ['@magento/peregrine/lib/talons/RootComponents/Product/useProduct.js']: 'src/lib/talons/RootComponents/Product/useProduct.js',
    [`${veniaUiPackagePath}/lib/components/Image/resourceImage.js`]: 'src/components/Image/resourceImage.js',
    [`${veniaUiPackagePath}/lib/components/ProductImageCarousel/carousel.js`]: 'src/components/ProductImageCarousel/carousel.js',
    // add comma-separated files
};

