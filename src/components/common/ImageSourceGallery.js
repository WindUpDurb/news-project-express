"use strict";

import React, {PropTypes} from "react";
import {FillerTile} from "../common/FillerTile";
import {PhotoTile} from "../common/PhotoTile";
import {CustomLightBox} from "../common/CustomLightBox";

export const ImageSourceGallery = ({imageSource, activeLightbox, openLightBox}) => {
    let customLightBox;
    let closeLightbox = () => openLightBox(null);
    let images = imageSource.map(item => {
        return {src: item.image};
    });
    let imageGalley = imageSource.map((item, index) => {
        if (item.fillerImage) {
            return <FillerTile key={index} fillerImage/>;
        } else {
            return (
                <PhotoTile openLightBox={openLightBox} photoObject={item} key={index}/>
            );
        }
    });
    if (activeLightbox) customLightBox = <CustomLightBox closeLightbox={closeLightbox} imageObject={activeLightbox}/>;
    return (
        <div>
            {customLightBox}
            {imageGalley}
        </div>
    );
};

ImageSourceGallery.propTypes = {
    imageSource: PropTypes.array,
    activeLightbox: PropTypes.object,
    openLightBox: PropTypes.func
};