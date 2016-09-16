"use strict";

import React, {PropTypes} from "react";

export const NewsTile = ({newsObject, openModal}) => {
    if (newsObject.photoSource) {
        return (
            <div style={{backgroundImage: `url('${newsObject.image}')`}} className="imageEffect col-md-6 imageDiv">

            </div>
        );
    } else {
        let icon, image;
        let openInfo = () => openModal(newsObject);
        if (newsObject.icon) icon = newsObject.icon;
        if (newsObject.image) image = newsObject.image;
        return (
            <div onClick={openInfo} style={{backgroundImage: `url(${image})`}} className="col-xs-6 col-sm-4 col-md-3 newsTile">
                <div className="newsTileInfo text-center">
                    <span onClick={openInfo} className="tileTitle">{newsObject.title}</span>
                    <br/>
                    <div className="publishedDiv text-center">
                        <span className="tilePublished">{newsObject.published}</span>
                    </div>
                </div>
                <div className="tileIconDiv">
                    <img src={icon} className="newsIcon"/>
                </div>
            </div>

        );
    }
};

NewsTile.propTypes = {
    openModal: PropTypes.func,
    currentModal: PropTypes.number,
    newsObject: PropTypes.object.isRequired,
    index: PropTypes.number
};