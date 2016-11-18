"use strict";

import React, {PropTypes} from "react";
import {ImageSourceIcon} from "./ImageSourceIcon";

export const FilterImages = ({imageFilters, clearSavedFilters, saveFilters, updateFilter}) => {
    let newsSources = ["BGBigPicture", "filler", "source500PXUpcoming", "filler"].map((imageSource, index) => {
        return (
            <div key={index} style={{padding: "5px"}} className="col-xs-4 col-sm-3">
                <ImageSourceIcon newsFilters={imageFilters} updateFilter={updateFilter} imageSource={imageSource}/>
            </div>
        );
    });
    return (
        <div>
            <div style={{position: "absolute", left: "5px", top: "4px"}}>Photo Sources</div>
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

FilterImages.propTypes = {
    updateFilter: PropTypes.func,
    clearSavedFilters: PropTypes.func,
    saveFilters: PropTypes.func,
    imageFilters: PropTypes.object
};