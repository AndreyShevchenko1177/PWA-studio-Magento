import React, { useMemo, useState } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from 'react-feather';

import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useProductImageCarousel } from '@magento/peregrine/lib/talons/ProductImageCarousel/useProductImageCarousel';

import { useStyle } from '@magento/venia-ui/lib/classify';
import AriaButton from '@magento/venia-ui/lib/components/AriaButton';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Image from '@magento/venia-ui/lib/components/Image';
import defaultClasses from '@magento/venia-ui/lib/components/ProductImageCarousel/carousel.module.css';
import Thumbnail from '@magento/venia-ui/lib/components/ProductImageCarousel/thumbnail';

import Video from '../Video'
import Modal from '../Modal';
import modalChildrenClasses from './modalChildren.module.css'
import hoverClasses from './hover.module.css'
import zoomClasses from './zoom.module.css'

const IMAGE_WIDTH = 640;

/**
 * Carousel component for product images
 * Carousel - Component that holds number of images
 * where typically one image visible, and other
 * images can be navigated through previous and next buttons
 *
 * @typedef ProductImageCarousel
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns {React.Element} React carousel component that displays a product image
 */
const ProductImageCarousel = props => {

    // console.log('+++Carousel+++');

    const { images } = props;
    const { formatMessage } = useIntl();
    const talonProps = useProductImageCarousel({
        images,
        imageWidth: IMAGE_WIDTH
    });

    const {
        currentImage,
        activeItemIndex,
        altText,
        handleNext,
        handlePrevious,
        handleThumbnailClick,
        sortedImages
    } = talonProps;

    const [modalActive, setModalActive] = useState(false);
    const [ratio, setRatio] = useState(1);
    

    // create thumbnail image component for every images in sorted order
    const thumbnails = useMemo(
        () =>
            sortedImages.map((item, index) => (
                <Thumbnail
                    key={item.uid}
                    item={item}
                    itemIndex={index}
                    isActive={activeItemIndex === index}
                    onClickHandler={handleThumbnailClick}
                    classes={hoverClasses}
                />
            )),
        [activeItemIndex, handleThumbnailClick, sortedImages]
    );

    const modalThumbnails = useMemo(
        () =>
            sortedImages.map((item, index) => (
                <Thumbnail
                    key={item.uid}
                    item={item}
                    itemIndex={index}
                    isActive={activeItemIndex === index}
                    onClickHandler={handleThumbnailClick}
                    modalActive={modalActive}
                    classes={modalChildrenClasses}
                    setRatio = {setRatio}
                />
            )),
        [activeItemIndex, handleThumbnailClick, sortedImages, modalActive, setRatio]
    );

    const classes = useStyle(defaultClasses, props.classes);

    // console.log({CarouselClasses: classes});

    let image;


    if (currentImage.type == 'video'){
        console.log("It's video", currentImage.file);
        image = (
            <Video 
                resource={currentImage.file}
                width={IMAGE_WIDTH}
                classes={{
                    image: classes.currentImage,
                    root: modalActive ? modalChildrenClasses.mainImg : classes.imageContainer
                }}
                modalActive = {modalActive}
                ratio = {ratio}
            />
        );
    }else 
    if (currentImage.file) {
        image = (
            <Image
                alt={altText}
                classes={{
                    image: classes.currentImage,
                    root: modalActive  ? modalChildrenClasses.mainImg : classes.imageContainer,
                    // root: modalActive  ? modalChildrenClasses.imageContainer : classes.imageContainer
                }}
                resource={currentImage.file}
                width={IMAGE_WIDTH}
                onClick = {()=>setModalActive(true)}
                shouldZoom = {true}
            />
        );
    } else {
        image = (
            <Image
                alt={altText}
                classes={{
                    image: classes.currentImage_placeholder,
                    root: classes.imageContainer
                }}
                src={transparentPlaceholder}
            />
        );
    }

    const previousButton = formatMessage({
        id: 'productImageCarousel.previousButtonAriaLabel',
        defaultMessage: 'Previous Image'
    });

    const nextButton = formatMessage({
        id: 'productImageCarousel.nextButtonAriaLabel',
        defaultMessage: 'Next Image'
    });

    const chevronClasses = { root: classes.chevron };

    const ModalCarousel = () => {
        return <>
            <div className={modalChildrenClasses.topCarousel}>
                <AriaButton
                    className={modalChildrenClasses.previousButton}
                    onPress={handlePrevious}
                    aria-label={previousButton}
                    type="button"
                >
                    <Icon
                        classes={chevronClasses}
                        src={ChevronLeftIcon}
                        size={40}
                    />
                </AriaButton>
                {/* <Image
                    alt={altText}
                    classes={{
                        image: classes.currentImage,
                        root: modalChildrenClasses.mainImg
                    }}
                    resource={currentImage.file}
                    width={IMAGE_WIDTH}
                    // onClick={() => setModalActive(true)}
                /> */}
                {image}
                <AriaButton
                    className={modalChildrenClasses.nextButton}
                    onPress={handleNext}
                    aria-label={nextButton}
                    type="button"
                >
                    <Icon
                        classes={chevronClasses}
                        src={ChevronRightIcon}
                        size={40}
                    />
                </AriaButton>
            </div>
        </>
    }


    return (
        <div className={classes.root}>
            <div className={classes.carouselContainer}>
                <AriaButton
                    className={classes.previousButton}
                    onPress={handlePrevious}
                    aria-label={previousButton}
                    type="button"
                >
                    <Icon
                        classes={chevronClasses}
                        src={ChevronLeftIcon}
                        size={40}
                    />
                </AriaButton>
               
                {image}
                <AriaButton
                    className={classes.nextButton}
                    onPress={handleNext}
                    aria-label={nextButton}
                    type="button"
                >
                    <Icon
                        classes={chevronClasses}
                        src={ChevronRightIcon}
                        size={40}
                    />
                </AriaButton>
            </div>
            <div className={classes.thumbnailList}>{thumbnails}</div>
            <Modal 
                active = {modalActive} 
                setActive = {setModalActive}
            >
                <ModalCarousel/>
                <div className={modalChildrenClasses.modalThumbnails}>{modalThumbnails}</div>
            </Modal>
        </div>
    );
};

/**
 * Props for {@link ProductImageCarousel}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * ProductImageCarousel component
 * @property {string} classes.currentImage classes for visible image
 * @property {string} classes.imageContainer classes for image container
 * @property {string} classes.nextButton classes for next button
 * @property {string} classes.previousButton classes for previous button
 * @property {string} classes.root classes for root container
 * @property {Object[]} images Product images input for Carousel
 * @property {bool} images[].disabled Is image disabled
 * @property {string} images[].file filePath of image
 * @property {string} images[].uid the id of the image
 * @property {string} images[].label label for image
 * @property {string} images[].position Position of image in Carousel
 */
ProductImageCarousel.propTypes = {
    classes: shape({
        carouselContainer: string,
        currentImage: string,
        currentImage_placeholder: string,
        imageContainer: string,
        nextButton: string,
        previousButton: string,
        root: string
    }),
    images: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            file: string.isRequired,
            uid: string.isRequired
        })
    ).isRequired
};

export default ProductImageCarousel;
