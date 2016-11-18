"use strict";

import React, {PropTypes} from "react";
import {ImageSourceIcon} from "./ImageSourceIcon";

export const FilterImages = ({imageFilters, clearSavedFilters, saveFilters, updateFilter}) => {
    let newsSources = ["BGBigPicture", "source500PXUpcoming"].map((imageSource, index) => {
        return <ImageSourceIcon newsFilters={imageFilters} updateFilter={updateFilter} key={index} imageSource={imageSource}/>;
    });
    return (
        <div>
            <div style={{position: "absolute", left: "5px", top: "4px"}}>Photo Sources</div>
            <br/>
            {newsSources}
            <br/>
            <br/>
            <br/>
            <div style={{position: "absolute", right: "5px", bottom: "4px"}}>
                <span onClick={saveFilters} className="saveFilterButton">Save Filters</span>
                <div style={{display: "inline-block", marginLeft: "10px"}}>
                    <span onClick={clearSavedFilters} className="saveFilterButton">Clear Saved Filters</span>
                </div>
            </div>

        </div>
    );

};

FilterImages.propTypes = {
    updateFilter: PropTypes.func,
    clearSavedFilters: PropTypes.func,
    saveFilters: PropTypes.func,
    imageFilters: PropTypes.object
};