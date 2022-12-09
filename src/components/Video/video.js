import { useImage } from "@magento/peregrine/lib/talons/Image/useImage";
import React from "react";

const Video = (props) => {

    const {
        alt,
        classes: propsClasses,
        displayPlaceholder,
        height,
        onError,
        onLoad,
        placeholder,
        resource,
        src,
        type,
        width,
        widths,
        ratio,
        modalActive,
        ...rest
    } = props;

    const talonProps = useImage({
        onError,
        onLoad,
        width,
        widths,
        height,
        ratio
    });

    const {
        resourceWidth: talonResourceWidth,
        resourceHeight: talonResourceHeight
    } = talonProps;


    // console.log({talonResourceWidth, talonResourceHeight, resource});


    return (

        <div
            style = {{
                    'width': `${talonResourceWidth-100}px`,
                    'height': `${(talonResourceWidth-100)/ratio}px`,
                    // 'height': `calc(100vh - 450px)`,
                    // 'border': '2px solid red'
                }}
        >
            <video
                controls="controls"
                // width = {`${talonResourceWidth}`}
                // style = {{'max-width': modalActive && false? `${talonResourceWidth+300}px` : `${talonResourceWidth-150}px`}}
                style={{ 'width': '100%', 'height': '100%' }}
            >
                <source src={resource} />
            </video>
        </div>
    )
}

export default Video;