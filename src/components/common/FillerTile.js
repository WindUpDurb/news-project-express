"use strict";

import React from "react";

export const FillerTile = () => {
    let colors = [{backgroundColor: "#3949AB"}, {backgroundColor: "#d32f2f"},{backgroundColor: "#FBC02D"} ];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    //Get more colors
    //Have the tile filled with quotes
    return (
        <div style={randomColor} className="fillerTile col-xs-6 col-sm-3">
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