"use strict";

import React, {PropTypes} from "react";
import Lightbox from "react-images";

export const ImageSourceGallery = ({imageSource}) => {
    let images = imageSource.map(item => {
        return {src: item.image};
    });
    let imageGalley = imageSource.map((item, index) => {
        return (
        <div style={{backgroundImage: `url('${item.image}')`}} key={index} className="col-md-6 imageDiv">
        </div>
        );
    });
    return (
        <div>
            {imageGalley}
            <Lightbox backdropClosesModal images={images}/>
        </div>  
    );
};

ImageSourceGallery.propTypes = {
    imageSource: PropTypes.array
};