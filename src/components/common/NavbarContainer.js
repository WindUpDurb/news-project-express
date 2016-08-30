"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {NavbarPresentation} from "./NavbarPresentation";
import * as NewsActions from "../../actions/NewsActions";
import {bindActionCreators} from "redux";
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
        this.changeDirectory = this.changeDirectory.bind(this);
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
    
    changeDirectory(directory) {
        this.props.NewsActions.changeDirectory(directory);
    }

    render() {
        return (
            <div>
                <NavbarPresentation activeSearch={this.state.searchBar} openSearch={this.openSearch}
                                    changeDirectory={this.changeDirectory} activeDirectory={this.state.activeDirectory}/>
                <SearchBar googleSearch={this.googleSearch} closeSearch={this.openSearch}
                           updateSearchField={this.updateSearchField} searchBar={this.state.searchBar}
                            searchQuery={this.state.searchQuery}/>
            </div>
        );
    }
}

NavbarContainer.propTypes = {
    NewsActions: PropTypes.object,
    activeDirectory: PropTypes.string
};

function mapDispatchToProps(dispatch) {
    return {
        NewsActions: bindActionCreators(NewsActions, dispatch)
    };
}


function mapStateToProps(state, ownProps) {
    let activeDirectory;
    if (state.newsDirectory && state.newsDirectory.activeDirectory) activeDirectory = state.newsDirectory.activeDirectory;
    return {
        activeDirectory
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);