"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {NavbarPresentation} from "./NavbarPresentation";
import {DirectoryFilter} from "./DirectoryFilter";
import * as NewsActions from "../../actions/NewsActions";
import {bindActionCreators} from "redux";
import {SearchBar} from "./SearchBar";


class NavbarContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBar: false,
            searchType: null,
            searchQuery: "",
            directoryFilterNews: null,
            directoryFilterImages: null
        };
        this.openSearch = this.openSearch.bind(this);
        this.googleSearch = this.googleSearch.bind(this);
        this.updateSearchField = this.updateSearchField.bind(this);
        this.changeDirectory = this.changeDirectory.bind(this);
        this.toggleDirectoryFilter = this.toggleDirectoryFilter.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    openSearch(type) {
        if (type === null) this.setState({searchQuery: "", searchType: null, searchBar: false});
        if (type !== null )this.setState({searchBar: !this.state.searchBar, searchType: type});
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

    updateFilter(newsSource) {
        this.props.NewsActions.updateNewsFilter(newsSource);
    }
    
    changeDirectory(directory) {
        if (this.props.activeDirectory !== directory) {
            this.props.NewsActions.changeDirectory(directory);
            window.scrollTo(0, 0);
        } else {
            this.toggleDirectoryFilter(directory);
        }
    }

    toggleDirectoryFilter(directory) {
        if (directory === "news") this.setState({directoryFilterNews: !this.state.directoryFilterNews});
    }

    render() {
        let searchBar, directoryFilter;
        if (this.state.searchBar) searchBar = (
            <SearchBar googleSearch={this.googleSearch} closeSearch={this.openSearch}
                                                         updateSearchField={this.updateSearchField} searchQuery={this.state.searchQuery}
                                                         searchType={this.state.searchType}/>
        );
        if (this.state.directoryFilterNews) directoryFilter = (
            <DirectoryFilter updateFilter={this.updateFilter} closeFilter={this.toggleDirectoryFilter} directory={"news"}/>
        );
        return (
            <div>
                <NavbarPresentation activeSearch={this.state.searchBar} searchType={this.state.searchType} openSearch={this.openSearch}
                                    changeDirectory={this.changeDirectory} activeDirectory={this.props.activeDirectory}/>
                {searchBar}
                {directoryFilter}
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
    let activeDirectory = state.activeDirectory;
    return {
        activeDirectory
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);