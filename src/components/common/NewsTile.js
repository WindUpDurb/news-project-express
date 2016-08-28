"use strict";

import React, {PropTypes} from "react";
import {NewsModal} from "./NewsModal";

export const NewsTile = ({newsObject, openModal, currentModal,index}) => {
    let openInfo = () => openModal(index);
    let closeInfo = () => openModal(null);
    return (
        <div style={{backgroundImage: `url(${newsObject.image})`}} className="col-xs-4 col-md-3 newsTile">
            <div className="newsTileInfo text-center">
                <span onClick={openInfo} className="tileTitle">{newsObject.title}</span>
                <br/>
                <div className="publishedDiv text-center">
                    <span className="tilePublished">{newsObject.published}</span>
                </div>
            </div>
            <div className="tileIconDiv">
                <img src="/statics/cnnIcon.png" className="newsIcon"/>
            </div>
            <NewsModal closeModal={closeInfo} index={index} currentModal={currentModal} news={newsObject}/>
        </div>

    );
};

NewsTile.propTypes = {
    openModal: PropTypes.func,
    currentModal: PropTypes.number,
    newsObject: PropTypes.object.isRequired,
    index: PropTypes.number
};