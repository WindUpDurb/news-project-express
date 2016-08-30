"use strict";

import React, {PropTypes} from "react";

export const PhotoTile = ({photoObject, openLightBox}) => {
    let open = () => openLightBox(photoObject);
    return (
        <div onClick={open} style={{backgroundImage: `url('${photoObject.image}')`}}
             className="imageEffect col-md-6 imageDiv">
            <div className="photoTileText">
                <span className="photoTitleText">{photoObject.title}</span>
                <br/>
                <span className="photoDateText">{photoObject.published}</span>
            </div>
        </div>
    );
};

PhotoTile.propTypes = {
    photoObject: PropTypes.object,
    openLightBox: PropTypes.func
};