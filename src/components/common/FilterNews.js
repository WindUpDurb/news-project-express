"use strict";

import React, {PropTypes} from "react";
import {NewsSourceIcon} from "./NewsSourceIcon";

export const FilterNews = ({updateFilter}) => {
    let newsSources = ["CNN", "IGN", "ABCNewsInternational", "NYTimes", "NPR"].map((newsSource, index) => {
        return <NewsSourceIcon updateFilter={updateFilter} key={index} newsSource={newsSource}/>;
    });
    return (
        <div>
            <div style={{position: "absolute", left: "5px", top: "4px"}}>News Sources</div>
            <br/>
            {newsSources}
        </div>
    );

};

FilterNews.propTypes = {
    updateFilter: PropTypes.func
};