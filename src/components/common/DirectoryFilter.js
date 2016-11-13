"use strict";

import React, {PropTypes} from "react";
import {FilterNews} from "./FilterNews";

export const DirectoryFilter = ({closeFilter, updateFilter, directory}) => {
    let filter, close = () => closeFilter(directory);
    if (directory === "news") filter = <FilterNews updateFilter={updateFilter}/>;
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
    updateFilter: PropTypes.func,
    directory: PropTypes.string
};
