"use strict";

import React, {PropTypes} from "react";
import {FillerTile} from "../common/FillerTile";
import Lightbox from "react-images";

export const ImageSourceGallery = ({imageSource}) => {
    let images = imageSource.map(item => {
        return {src: item.image};
    });
    let imageGalley = imageSource.map((item, index) => {
        if (item.fillerImage) {
            return <FillerTile key={index} fillerImage/>;
        } else {
            return (
                <div style={{backgroundImage: `url('${item.image}')`}} key={index} className="imageEffect col-md-6 imageDiv">
                </div>
            );
        }
    });
    return (
        <div>
            {imageGalley}
        </div>
    );
};

ImageSourceGallery.propTypes = {
    imageSource: PropTypes.array
};