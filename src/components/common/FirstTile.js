"use strict";

import React from "react";

export const FirstTile = () => {
    return (
        <div id="firstTile" className="col-xs-6 col-sm-6">
            <div className="row firstTileTextDiv">
                <div className="col-md-6 col-md-offset-4">
                    <span id="windupText">Wind-Up</span>
                    <br/>
                    <span id="windupSubText">Something about something</span>
                </div>
            </div>
            <img src="/statics/owl.png" className="owlIcon"/>
        </div>
    );
};