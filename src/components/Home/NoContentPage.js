"use strict";

import React from "react";

export const NoContentPage = () => {
    console.log("No contnet")
    return (
        <div>
            <div className="col-xs-6 col-sm-8 col-md-6 noContentBackground">
            </div>
            <div className="noContentSubRow text-center">
                <div className="divAroundBigOwl">
                    <img src="/statics/owlBig.png" className="imageEffect"/>
                    <br/>
                    <span className="noContentText">It's either an uneventful day, or all of the filters are applied.</span>
                </div>
            </div>
        </div>
    );
};