"use strict";

import React, {PropTypes} from "react";

export const NewsTile = ({newsObject}) => {
    console.log(newsObject);
    return (
        <div style={{backgroundImage: `url(${newsObject.image})`}} className="col-md-3 newsTile">
            <div className="newsTileInfo text-center">
                <span className="tileTitle">{newsObject.title}</span>
            </div>
            <div className="tileIconDiv">
                <img src="/statics/cnnIcon.png" className="newsIcon"/>
            </div>
        </div>

    );
};

NewsTile.propTypes = {
    newsObject: PropTypes.object.isRequired
};