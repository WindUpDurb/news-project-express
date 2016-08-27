"use strict";

import React, {PropTypes} from "react";
import {NewsModal} from "./NewsModal";

export const NewsTile = ({newsObject, index, closeModal, openModal}) => {
    let displayInfo = () => openModal(index);
    return (
        <div onClick={displayInfo} style={{backgroundImage: `url(${newsObject.image})`}} className="col-md-3 newsTile">
            <div className="newsTileInfo text-center">
                <span className="tileTitle">{newsObject.title}</span>
            </div>
            <div className="tileIconDiv">
                <img src="/statics/cnnIcon.png" className="newsIcon"/>
            </div>
            <NewsModal news={newsObject} closeModal={closeModal} index={index}/>
        </div>

    );
};

NewsTile.propTypes = {
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    newsObject: PropTypes.object.isRequired,
    index: PropTypes.number
};