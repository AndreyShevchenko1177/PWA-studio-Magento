import React, { useEffect, useMemo, useRef } from 'react';
import { bool, func, number, shape, string } from 'prop-types';

import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useWindowSize } from '@magento/peregrine';
import { useThumbnail } from '@magento/peregrine/lib/talons/ProductImageCarousel/useThumbnail';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/ProductImageCarousel/thumbnail.module.css';
import Image from '@magento/venia-ui/lib/components/Image';

import Canvas from './Canvas'


const DEFAULT_THUMBNAIL_HEIGHT = 170;
const DEFAULT_THUMBNAIL_WIDTH = 135;

/**
 * The Thumbnail Component is used for showing thumbnail preview image for ProductImageCarousel
 * Shows up only in desktop devices
 *
 * @typedef Thumbnail
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns {React.Element} React thumbnail component that displays product thumbnail
 */
const Thumbnail = props => {

    // console.log({ThumbDEF_classes: JSON.parse(JSON.stringify(defaultClasses))});
    // console.log({ThumbPROP_classes_1: JSON.parse(JSON.stringify(props.classes))});

    const classes = useStyle(defaultClasses, props.classes);

    // console.log({ThumbRES_classes: JSON.parse(JSON.stringify(classes))});

    const {
        isActive,
        item: { file, label, type },
        onClickHandler,
        itemIndex,
        modalActive,
        setRatio
    } = props;

    

    const talonProps = useThumbnail({
        onClickHandler,
        itemIndex
    });

    const { handleClick } = talonProps;

    const windowSize = useWindowSize();
    const isDesktop = windowSize.innerWidth >= 1024;




    const canvas = useMemo(() => {

        if (!isDesktop && !modalActive) {
            return null;
        }

        // console.log('canvasHOVER:', classes.hover);

        return <Canvas
            src={file}
            defaultWidth={modalActive ? 80 : DEFAULT_THUMBNAIL_WIDTH}
            setRatio = {setRatio}
            classes ={classes}
        />
    }, [file, isDesktop, modalActive, setRatio, classes])
    





    const thumbnailImage = useMemo(() => {
        if (!isDesktop && !modalActive) {
            return null;
        }

        return file ? (
            <Image
                alt={label}
                classes={{ image: classes.image + ' ' + classes.hover}}
                height={DEFAULT_THUMBNAIL_HEIGHT}
                resource={file}
                width={DEFAULT_THUMBNAIL_WIDTH}
            />
        ) : (
            <Image
                alt={label}
                classes={{ image: classes.image }}
                src={transparentPlaceholder}
            />
        );
    }, [file, isDesktop, label, classes.image, modalActive]);
    // console.log('1',{file, handleClick})

    return (
        <span
            className={isActive ? classes.rootSelected : classes.root}
            onClick={handleClick}
            role="button"
            aria-hidden="true"
        >
            {type == 'video' ? 
                canvas
                : thumbnailImage}
        </span>
    );
};

/**
 * Props for {@link Thumbnail}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the Thumbnail component
 * @property {string} classes.root classes for root container
 * @property {string} classes.rootSelected classes for the selected thumbnail item
 * @property {bool} isActive is image associated is active in carousel
 * @property {string} item.label label for image
 * @property {string} item.file filePath of image
 * @property {number} itemIndex index number of thumbnail
 * @property {func} onClickHandler A callback for handling click events on thumbnail
 */
Thumbnail.propTypes = {
    classes: shape({
        root: string,
        rootSelected: string
    }),
    isActive: bool,
    item: shape({
        label: string,
        file: string.isRequired
    }),
    itemIndex: number,
    onClickHandler: func.isRequired
};

export default Thumbnail;
