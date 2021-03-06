"use strict";

import React, {PropTypes} from "react";

export const SearchBar = ({searchType, googleSearch, searchQuery, updateSearchField, closeSearch}) => {
    let close = () => closeSearch(null);
    let searchLabel;
    if (searchType === "Google") searchLabel = "Perform a Google Search";
    return (
        <div id="searchDiv">
            <div className="closeSearchDiv">
                <span onClick={close} className="closeSearchButton">X</span>
            </div>
            <form onSubmit={googleSearch} >
                <div className="form-group">
                    <label className="control-label" htmlFor="focusedInput1">{searchLabel}</label>
                    <input style={{width: "100%", color: "#D2D2D2"}} value={searchQuery} onChange={updateSearchField} className="form-control" id="focusedInput1" type="text"/>
                </div>
            </form>
        </div>
    );
};

SearchBar.propTypes = {
    searchType: PropTypes.string,
    searchQuery: PropTypes.string,
    closeSearch: PropTypes.func,
    updateSearchField: PropTypes.func,
    googleSearch: PropTypes.func
};