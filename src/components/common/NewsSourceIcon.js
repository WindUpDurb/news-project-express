"use strict";

import React, {PropTypes} from "react";

export const NewsSourceIcon = ({newsSource, newsFilters, updateFilter}) => {
    let newsIcon, update = () => updateFilter(newsSource);
    switch(newsSource) {
        case "CNN":
            newsFilters[newsSource] ? newsIcon = <img onClick={update} className="newsIcon grayScaleNewsSource cursorPointer" src="/statics/cnnIcon.png"/> :
                newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/cnnIcon.png"/>;
            break;
        case "IGN":
            newsFilters[newsSource] ? newsIcon = <img onClick={update} className="newsIcon grayScaleNewsSource cursorPointer" src="/statics/ignIcon.png"/> :
                newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/ignIcon.png"/>;
            break;
        case "ABCNewsInternational":
            newsFilters[newsSource] ? newsIcon = <img onClick={update} className="newsIcon grayScaleNewsSource cursorPointer" src="/statics/abcNewsIcon.png"/> :
                newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/abcNewsIcon.png"/>;
            break;
        case "NYTimes":
            newsFilters[newsSource] ? newsIcon = <img onClick={update} className="newsIcon grayScaleNewsSource cursorPointer" src="/statics/nyTimesIcon.png"/> :
                newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/nyTimesIcon.png"/>;
            break;
        case "NPR":
            newsFilters[newsSource] ? newsIcon = <img onClick={update} className="newsIcon grayScaleNewsSource cursorPointer" src="/statics/nprIcon.png"/> :
                newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/nprIcon.png"/>;
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

NewsSourceIcon.propTypes = {
    newsSource: PropTypes.string,
    updateFilter: PropTypes.func,
    newsFilters: PropTypes.object
};