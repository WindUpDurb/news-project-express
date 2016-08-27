"use strict";

import React, {PropTypes} from "react";

export const NewsTile = ({newsObject}) => {
    console.log(newsObject);
    return (
        <div className="col-md-4 cardEffect newsTile">
            <div className="row">
                <div className="col-md-7">
                    <img src={newsObject.image} className="newsTileImage"/>
                </div>
                <div className="col-md-5">
                    <div className="text-center">
                        <a className="newsTileTitle" href={newsObject.link}>{newsObject.title}</a>
                    </div>
                </div>
            </div>
        </div>

    );
};

NewsTile.propTypes = {
    newsObject: PropTypes.object.isRequired
};