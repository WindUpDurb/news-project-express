"use strict";

import React, {PropTypes} from "react";
import {NewsModal} from "./NewsModal";

export const NewsTile = ({newsObject, openModal, currentModal,index}) => {
    if (newsObject.photoSource) {
        return (
            <div style={{backgroundImage: `url('${newsObject.image}')`}} className="col-md-6 imageDiv">

            </div>
        );
    } else {
        let icon, image;
        let openInfo = () => openModal(index);
        let closeInfo = () => openModal(null);
        if (newsObject.icon) icon = newsObject.icon;
        if (newsObject.image) image = newsObject.image;
        return (
            <div style={{backgroundImage: `url(${image})`}} className="col-xs-6 col-sm-3 newsTile">
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
                <NewsModal closeModal={closeInfo} index={index} currentModal={currentModal} news={newsObject}/>
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