"use strict";

import React, {PropTypes} from "react";
import * as Quotes from "../../actions/Quotes";

export const FillerTile = ({fillerImage}) => {
    let colors = [{backgroundColor: "#3949AB"}, {backgroundColor: "#d32f2f"},{backgroundColor: "#FBC02D"} ];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let quote = Quotes.grabQuote();
    let body = quote[0];
    let author = quote[1];
    //Get more colors
    //Have the tile filled with quotes
    if (fillerImage) {
        return (
            <div style={randomColor} className="fillerTile col-xs-6">
                <div className="row firstTileTextDiv">
                    <div className="col-md-10 col-md-offset-2">
                        <span className="quoteBody">{body}</span>
                        <br/><br/>
                        <span className="authorText">{author}</span>
                    </div>
                </div>
                <img src="/statics/owl.png" className="owlIcon"/>
            </div>
        );
    } else {
        return (
            <div style={randomColor} className="fillerTile col-xs-6 col-sm-3">
                <div className="row firstTileTextDiv">
                    <div className="col-md-10 col-md-offset-2">
                        <span className="quoteBody">{body}</span>
                        <br/><br/>
                        <span className="authorText">{author}</span>
                    </div>
                </div>
                <img src="/statics/owl.png" className="owlIcon"/>
            </div>
        );
    }
};

FillerTile.propTypes = {
    fillerImage: PropTypes.bool
};