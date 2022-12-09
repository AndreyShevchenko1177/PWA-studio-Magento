import React, { useEffect, useRef } from "react";

const Canvas = (props)=>{

    const {
        src,
        defaultWidth,
        setRatio,
        classes
    } = props

    const canvasRef = useRef(null);

    const _video = document.createElement('video');

    useEffect(() => {

        const loadedmetadata = function () {
            canvasRef.current.width = defaultWidth;
            canvasRef.current.height = Math.floor((defaultWidth) / _video.videoWidth * _video.videoHeight);
            if (setRatio) {
                setRatio(_video.videoWidth / _video.videoHeight)
            }
            _video.currentTime = Math.floor(_video.duration / 2);
        };

        const timeupdate = function () {
            const canvasCtx = canvasRef.current.getContext("2d");
            canvasCtx.drawImage(_video, 0, 0, (defaultWidth), Math.floor((defaultWidth) / _video.videoWidth * _video.videoHeight));
            _video.remove();
        };

        _video.addEventListener('loadedmetadata', loadedmetadata);

        _video.addEventListener('timeupdate', timeupdate)

        _video.setAttribute('src', src);

        return () => {
            _video.removeEventListener('loadedmetadata', loadedmetadata);
            _video.removeEventListener('timeupdate', timeupdate);
        }

    })


    // console.log(classes);
    // console.log('canvas-HOVER:+++', classes.hover);
    return (
        <canvas
            ref = {canvasRef}
            width = {50}
            height = {50}
            className={`${classes.hover}`}
        ></canvas>
    )
};

export default Canvas ;