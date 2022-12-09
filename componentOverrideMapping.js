const veniaUiPackagePath = '@magento/venia-ui';
module.exports = componentOverrideMapping = {
    [`${veniaUiPackagePath}/lib/components/ProductFullDetail/productFullDetail.js`]: 'src/components/ProductFullDetail/productFullDetail.js', 
    ['@magento/peregrine/lib/talons/RootComponents/Product/useProduct.js']: 'src/lib/talons/RootComponents/Product/useProduct.js',
    [`${veniaUiPackagePath}/lib/components/Image/resourceImage.js`]: 'src/components/Image/resourceImage.js',
    [`${veniaUiPackagePath}/lib/components/ProductImageCarousel/carousel.js`]: 'src/components/ProductImageCarousel/carousel.js',
    [`${veniaUiPackagePath}/lib/components/ProductImageCarousel/thumbnail.js`]: 'src/components/ProductImageCarousel/thumbnail.js',
    [`${veniaUiPackagePath}/lib/components/Image/simpleImage.js`]: 'src/components/Image/simpleImage.js',
    [`${veniaUiPackagePath}/lib/components/Image/image.js`]: 'src/components/Image/image.js',
    // add comma-separated files
};


// node_modules/@magento/venia-ui/lib/components/Image/simpleImage.js
// src/components/Image/simpleImage.js

// node_modules/@magento/venia-ui/lib/components/Image/image.js
// src/components/Image/image.js
