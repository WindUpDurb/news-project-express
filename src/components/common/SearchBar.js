"use strict";

import React, {PropTypes} from "react";

export const SearchBar = ({searchBar, searchType, googleSearch, searchQuery, updateSearchField, closeSearch}) => {
    let close = () => closeSearch(null);
    if (searchBar) {
        let searchLabel;
        if (searchType === "Google") searchLabel = "Perform a Google Search";
        return (
            <div id="searchDiv">
                <div className="closeSearchDiv">
                    <span onClick={close} className="closeSearchButton">X</span>
                </div>
                <form onSubmit={googleSearch} >
                    <div className="form-group label-floating">
                        <label className="control-label" htmlFor="focusedInput1">{searchLabel}</label>
                        <input value={searchQuery} onChange={updateSearchField} className="form-control" id="focusedInput1" type="text"/>
                    </div>
                </form>
            </div>
        );
    } else {
        return <div></div>;
    }

};

SearchBar.propTypes = {
    searchType: PropTypes.string,
    searchBar: PropTypes.bool,
    searchQuery: PropTypes.string,
    closeSearch: PropTypes.func,
    updateSearchField: PropTypes.func,
    googleSearch: PropTypes.func
};