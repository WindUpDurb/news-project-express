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
            currentModal: null
        };
        
        this.openModal = this.openModal.bind(this);
    }

    componentWillMount() {
        this.props.NewsActions.retrieveFrom("CNN");
        this.props.NewsActions.retrieveFrom("IGN");
        this.props.NewsActions.retrieveFrom("NPR");
        this.props.NewsActions.retrieveFrom("BGBigPicture");
    }


    openModal(news) {
        this.setState({currentModal: news});
    }
    

    render() {
        let aggregateNews, imageGallery, newsModal;
        if (this.props.aggregateNews) aggregateNews = this.props.aggregateNews.map((item, index) => {
            if (item.filler) {
                return <FillerTile key={index}/>;
            } else {
                return (
                    <NewsTile newsObject={item} openModal={this.openModal} key={index}/>
                );
            }
        });
        if (this.props.BigPicture) imageGallery = <ImageSourceGallery imageSource={this.props.BigPicture}/>;
        return (
            <div>
                <div className="container-fluid">
                    <div id="newsContainer" className="row">
                        <FirstTile/>
                        <NewsModal closeModal={this.openModal} news={this.state.currentModal}/>
                        {aggregateNews}
                    </div>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    NewsActions: PropTypes.object,
    aggregateNews: PropTypes.array,
    BigPicture: PropTypes.array
};

function mapStateToProps (state, ownProps) {
    let aggregateNews;
    let BigPicture;
    if (state.newsDirectory) aggregateNews = FunctionTools.aggregateDirectories(state.newsDirectory);
    if (state.newsDirectory && state.newsDirectory.BGBigPicture) BigPicture = [...state.newsDirectory.BGBigPicture];
    return {
        aggregateNews,
        BigPicture
    };
}

function mapDispatchToProps(dispatch) {
    return {
        NewsActions: bindActionCreators(NewsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);