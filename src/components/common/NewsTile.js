"use strict";

import React, {PropTypes} from "react";

export const NewsTile = ({newsObject}) => {
    console.log(newsObject);
    return (
        <div className="col-md-3 cardEffect">
            <img src={newsObject.image} className="img-responsive"/>
                <a href={newsObject.link}>{newsObject.title}</a>
                <br/>
                {newsObject.description}
        </div>
    );
};

NewsTile.propTypes = {
    newsObject: PropTypes.object.isRequired
};