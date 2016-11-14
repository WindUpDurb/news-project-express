"use strict";

import React, {PropTypes} from "react";
import {FilterNews} from "./FilterNews";

export const DirectoryFilter = ({closeFilter, newsFilters, clearSavedFilters, saveFilters, updateFilter, directory}) => {
    let filter, close = () => closeFilter(directory);
    if (directory === "news") filter = (
        <FilterNews newsFilters={newsFilters} updateFilter={updateFilter} clearSavedFilters={clearSavedFilters}
                    saveFilters={saveFilters}/>
    );
    return (
        <div id="searchDiv">
            <div className="closeSearchDiv">
                <span onClick={close} className="closeSearchButton">X</span>
            </div>
            <div style={{paddingTop: "10px"}}>
                {filter}
            </div>
        </div>
    );
};

DirectoryFilter.propTypes = {
    closeFilter: PropTypes.func,
    clearSavedFilters: PropTypes.func,
    saveFilters: PropTypes.func,
    updateFilter: PropTypes.func,
    directory: PropTypes.string,
    newsFilters: PropTypes.object
};
