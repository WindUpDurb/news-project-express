"use strict";

import React, {PropTypes} from "react";
import {NewsModal} from "../common/NewsModal";
import {FirstTile} from "../common/FirstTile";
import {FillerTile} from "../common/FillerTile";
import {connect} from "react-redux";
import * as NewsActions from "../../actions/NewsActions";
import {bindActionCreators} from "redux";
import {NewsTile} from "../common/NewsTile";
import {ImageSourceGallery} from "../common/ImageSourceGallery";
import * as FunctionTools from "../../actions/FunctionTools";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentModal: null,
            activeLightbox: null
        };
        
        this.openModal = this.openModal.bind(this);
        this.openLightBox = this.openLightBox.bind(this);
    }

    componentWillMount() {
        this.props.NewsActions.retrieveFrom("CNN");
        this.props.NewsActions.retrieveFrom("source500PXUpcoming");
        this.props.NewsActions.retrieveFrom("TechCrunch");
        this.props.NewsActions.retrieveFrom("IGN");
        this.props.NewsActions.retrieveFrom("ABCNewsInternational");
        this.props.NewsActions.retrieveFrom("NYTimes");
        //this.props.NewsActions.retrieveFrom("NYTimesInternational");
        this.props.NewsActions.retrieveFrom("NPR");
        this.props.NewsActions.retrieveFrom("BGBigPicture");
    }

    mapNews (item, index) {
        if (item.filler) {
            return <FillerTile key={index}/>;
        } else {
            return (
                <NewsTile newsObject={item} openModal={this.openModal} key={index}/>
            );
        }
    }

    openModal(news) {
        this.setState({currentModal: news});
    }
    
    openLightBox(photoObject) {
        this.setState({activeLightbox: photoObject});
    }
    

    render() {
        let aggregatePrint, imageGallery, currentDirectory;
        if (this.props.aggregatePrintNews) aggregatePrint = this.props.aggregatePrintNews.map((item, index) => {
            return this.mapNews(item, index);
        });
        if (this.props.aggregatePhotos) imageGallery = (
            <ImageSourceGallery openLightBox={this.openLightBox} imageSource={this.props.aggregatePhotos}
                                activeLightbox={this.state.activeLightbox} />
        );
        this.props.activeDirectory === "photos" ? currentDirectory = imageGallery : currentDirectory = aggregatePrint;
        return (
            <div>
                <div className="container-fluid">
                    <div id="newsContainer" className="row">
                        <FirstTile/>
                        <NewsModal closeModal={this.openModal} news={this.state.currentModal}/>
                        {currentDirectory}
                    </div>
                </div>
            </div>
        );
    }
}


HomePage.propTypes = {
    activeDirectory: PropTypes.string,
    NewsActions: PropTypes.object,
    aggregateNews: PropTypes.object,
    aggregatePrintNews: PropTypes.array,
    aggregatePhotos: PropTypes.array
};

function mapStateToProps (state, ownProps) {
    let aggregateNews, aggregatePrintNews, aggregatePhotos, BigPicture;
    let activeDirectory = state.activeDirectory;
    let newsFilters = state.newsFilters;
    if (state.newsDirectory) aggregateNews = FunctionTools.aggregateDirectories(state.newsDirectory, newsFilters);
    if (aggregateNews && aggregateNews.news) aggregatePrintNews = aggregateNews.news;
    if (aggregateNews && aggregateNews.photos) aggregatePhotos = aggregateNews.photos;
    //if (state.newsDirectory && state.newsDirectory.BGBigPicture) BigPicture = FunctionTools.addFillersToPhotoDirectory([...state.newsDirectory.BGBigPicture]);
    return {
        aggregateNews,
        activeDirectory,
        aggregatePhotos,
        aggregatePrintNews
    };
}

function mapDispatchToProps(dispatch) {
    return {
        NewsActions: bindActionCreators(NewsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);