"use strict";

import React, {PropTypes} from "react";
import {NewsSourceIcon} from "./NewsSourceIcon";

export const FilterNews = ({newsFilters, clearSavedFilters, saveFilters, updateFilter}) => {
    let newsSources = ["CNN", "IGN", "ABCNewsInternational", "NYTimes", "NPR", "TechCrunch"].map((newsSource, index) => {
        return (
            <div key={index} style={{padding: "5px"}} className="col-xs-4 col-sm-3">
                <NewsSourceIcon newsFilters={newsFilters} updateFilter={updateFilter} newsSource={newsSource}/>
            </div>
        );
    });
    return (
        <div>
            <div style={{position: "absolute", left: "5px", top: "4px"}}>News Sources</div>
            <br/>
            {newsSources}
            <br/>
            <br/>
            <br/>
            <div style={{marginTop: "40px", height: "15px"}}>
                <div style={{position: "absolute", right: "5px", bottom: "4px"}}>
                    <span onClick={saveFilters} className="saveFilterButton">Save Filters</span>
                    <div style={{display: "inline-block", marginLeft: "10px"}}>
                        <span onClick={clearSavedFilters} className="saveFilterButton">Clear Saved Filters</span>
                    </div>
                </div>
            </div>

        </div>
    );

};

FilterNews.propTypes = {
    updateFilter: PropTypes.func,
    clearSavedFilters: PropTypes.func,
    saveFilters: PropTypes.func,
    newsFilters: PropTypes.object
};