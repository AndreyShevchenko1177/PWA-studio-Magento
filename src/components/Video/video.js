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


    console.log({talonResourceWidth, talonResourceHeight, resource});



    return (
        // <div style={{border: '2px solid red'}}>VIDEO</div>
        // <iframe width={talonResourceWidth-100} height={400} src={resource} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        // <img
        //     // loading="lazy"
        //     // className={className}
        //     height={height}
        //     src={resource}
        //     width={width}
        //     alt='kartinka'
        // />


        <video 
            controls = "controls"
            width = {talonResourceWidth}
            style = {{'max-width': `${talonResourceWidth-150}px`}}
        >
            <source src={resource}/>
        </video>
    )
}

export default Video;