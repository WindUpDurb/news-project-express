"use strict";

import React from "react";

export const FirstTile = () => {
    return (
        <div id="firstTile" className="col-xs-6 col-sm-4 col-md-6">
            <div className="row firstTileTextDiv">
                <div className="col-md-6 col-md-offset-4">
                    <span id="windupText">Imagery</span>
                    <br/>
                    <span id="windupSubText">A link to the current world</span>
                </div>
            </div>
            <img src="/statics/owl.png" className="owlIcon"/>
        </div>
    );
};