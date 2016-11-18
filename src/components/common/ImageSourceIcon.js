"use strict";

import React, {PropTypes} from "react";

export const ImageSourceIcon = ({imageSource, newsFilters, updateFilter}) => {
    let newsIcon, update = () => updateFilter(imageSource);
    switch(imageSource) {
        case "BGBigPicture":
            newsFilters[imageSource] ? newsIcon = <img onClick={update} className="newsIcon grayScaleNewsSource cursorPointer" src="/statics/bgBigPictureIcon.png"/> :
                newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/bgBigPictureIcon.png"/>;
            break;
        case "source500PXUpcoming":
            newsFilters[imageSource] ? newsIcon = <img onClick={update} className="newsIcon grayScaleNewsSource cursorPointer" src="/statics/500pxicon.png"/> :
                newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/500pxicon.png"/>;
            break;
        default:
            newsIcon = null;
    }
    return (
        <div className="newsSourceIcon">
            {newsIcon}
        </div>
    );
};

ImageSourceIcon.propTypes = {
    imageSource: PropTypes.string,
    updateFilter: PropTypes.func,
    newsFilters: PropTypes.object
};