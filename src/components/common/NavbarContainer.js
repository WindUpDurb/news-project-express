"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {NavbarPresentation} from "./NavbarPresentation";
import {SearchBar} from "./SearchBar";


class NavbarContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBar: null,
            searchQuery: ""
        };
        this.openSearch = this.openSearch.bind(this);
        this.googleSearch = this.googleSearch.bind(this);
        this.updateSearchField = this.updateSearchField.bind(this);
    }

    openSearch(type) {
        this.setState({searchBar: type});
        if (type === null) {
            this.setState({searchQuery: ""});
        }
    }

    googleSearch(event) {
        event.preventDefault();
        let query = this.state.searchQuery.replace(/\s/g, "+");
        window.open(`http://google.com/#q=${query}`, "_blank");
        this.setState({searchQuery: ""});
    }

    updateSearchField(event) {
        this.setState({searchQuery: event.target.value});
    }

    render() {
        return (
            <div>
                <NavbarPresentation activeSearch={this.state.searchBar} openSearch={this.openSearch}/>
                <SearchBar googleSearch={this.googleSearch} closeSearch={this.openSearch}
                           updateSearchField={this.updateSearchField} searchBar={this.state.searchBar}
                            searchQuery={this.state.searchQuery}/>
            </div>
        );
    }
}

NavbarContainer.propTypes = {

};


function mapStateToProps(state, ownProps) {
    return {

    };
}

export default connect(mapStateToProps)(NavbarContainer);