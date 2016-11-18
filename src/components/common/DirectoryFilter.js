"use strict";

import React, {PropTypes} from "react";
import {FilterNews} from "./FilterNews";
import {FilterImages} from "./FilterImages";

export const DirectoryFilter = ({closeFilter, filters, clearSavedFilters, saveFilters, updateFilter, directory}) => {
    let filter, close = () => closeFilter(directory);
    if (directory === "news") filter = (
        <FilterNews newsFilters={filters} updateFilter={updateFilter} clearSavedFilters={clearSavedFilters}
                    saveFilters={saveFilters}/>
    );
    if (directory === "photos") filter = (
        <FilterImages imageFilters={filters} updateFilter={updateFilter} saveFilters={saveFilters}
                      clearSavedFilters={clearSavedFilters}/>
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
    filters: PropTypes.object
};
