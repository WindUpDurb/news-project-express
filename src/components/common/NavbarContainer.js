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
            directoryFilterNews: false,
            directoryFilterImages: false
        };
        this.openSearch = this.openSearch.bind(this);
        this.googleSearch = this.googleSearch.bind(this);
        this.updateSearchField = this.updateSearchField.bind(this);
        this.changeDirectory = this.changeDirectory.bind(this);
        this.toggleDirectoryFilter = this.toggleDirectoryFilter.bind(this);
        this.updateContentFilters = this.updateContentFilters.bind(this);
        this.saveFilters = this.saveFilters.bind(this);
        this.clearSavedFilters = this.clearSavedFilters.bind(this);
    }

    openSearch(type) {
        if (type === null) this.setState({searchQuery: "", searchType: null, searchBar: false});
        if (type !== null )this.setState({searchBar: !this.state.searchBar, searchType: type , directoryFilterNews: false, directoryFilterImages: false});
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

    updateContentFilters(newsSource) {
        this.props.NewsActions.updateContentFilters(newsSource);
    }


    saveFilters() {
        NewsActions.saveFilters(this.props.contentFilters);
    }

    clearSavedFilters() {
        this.props.NewsActions.clearSavedFilters();
    }
    
    changeDirectory(directory) {
        if (this.props.activeDirectory !== directory) {
            this.setState({directoryFilterNews: false});
            this.props.NewsActions.changeDirectory(directory);
            window.scrollTo(0, 0);
        } else {
            this.toggleDirectoryFilter(directory);
        }
    }

    toggleDirectoryFilter(directory) {
        if (directory === "news") this.setState({directoryFilterNews: !this.state.directoryFilterNews, searchBar: false});
        if (directory === "photos") this.setState({directoryFilterImages: !this.state.directoryFilterImages, searchBar: false});
    }

    render() {
        let searchBar, directoryFilter;
        if (this.state.searchBar) searchBar = (
            <SearchBar googleSearch={this.googleSearch} closeSearch={this.openSearch}
                                                         updateSearchField={this.updateSearchField} searchQuery={this.state.searchQuery}
                                                         searchType={this.state.searchType}/>
        );
        if (this.state.directoryFilterNews) directoryFilter = (
            <DirectoryFilter updateFilter={this.updateContentFilters} closeFilter={this.toggleDirectoryFilter} directory={"news"}
                             filters={this.props.contentFilters} clearSavedFilters={this.clearSavedFilters}
                             saveFilters={this.saveFilters}/>
        );
        if (this.state.directoryFilterImages) directoryFilter = (
            <DirectoryFilter updateFilter={this.updateContentFilters} closeFilter={this.toggleDirectoryFilter} directory={"photos"}
                             filters={this.props.contentFilters} clearSavedFilters={this.clearSavedFilters}
                             saveFilters={this.saveFilters}/>
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
    contentFilters: PropTypes.object,
    activeDirectory: PropTypes.string
};

function mapDispatchToProps(dispatch) {
    return {
        NewsActions: bindActionCreators(NewsActions, dispatch)
    };
}


function mapStateToProps(state, ownProps) {
    let activeDirectory = state.activeDirectory,
        contentFilters = state.contentFilters;
    return {
        activeDirectory,
        contentFilters
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);