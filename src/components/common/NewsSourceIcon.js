"use strict";

import React, {PropTypes} from "react";

export const NewsSourceIcon = ({newsSource, updateFilter}) => {
    let newsIcon, update = () => updateFilter(newsSource);
    switch(newsSource) {
        case "CNN":
            newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/cnnIcon.png"/>;
            break;
        case "IGN":
            newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/ignIcon.png"/>;
            break;
        case "ABCNewsInternational":
            newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/abcNewsIcon.png"/>;
            break;
        case "NYTimes":
            newsIcon = <img onClick={update} className="newsIcon cursorPointer" src="/statics/nyTimesIcon.png"/>;
            break;
        case "NPR":
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
    updateFilter: PropTypes.func
};