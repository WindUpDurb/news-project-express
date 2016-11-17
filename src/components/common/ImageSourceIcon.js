"use strict";

import React, {PropTypes} from "react";

export const ImageSourceIcon = ({newsSource, newsFilters, updateFilter}) => {
    let newsIcon, update = () => updateFilter(newsSource);
    switch(newsSource) {
        case "TechCrunch":
            newsFilters[newsSource] ? newsIcon = <img onClick={update} className="newsIcon grayScaleNewsSource cursorPointer" src="/statics/techCrunch.jpg"/> :
                newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/techCrunch.jpg"/>;
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
    newsSource: PropTypes.string,
    updateFilter: PropTypes.func,
    newsFilters: PropTypes.object
};