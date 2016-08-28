"use strict";

import React, {PropTypes} from "react";
import {HomeHeader} from "./homeHeader";
import {connect} from "react-redux";
import * as NewsActions from "../../actions/NewsActions";
import {bindActionCreators} from "redux";
import {NewsTile} from "../common/NewsTile";
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
    }


    openModal(index) {
        this.setState({currentModal: index});
    }
    

    render() {
        let aggregateNews;
        if (this.props.aggregateNews) aggregateNews = this.props.aggregateNews.map((item, index) => {
            return (
                <NewsTile newsObject={item} index={index} currentModal={this.state.currentModal}
                             openModal={this.openModal} key={index}/>
            );
        });
        return (
            <div>
                <HomeHeader/>
                <div className="container">
                    <div id="newsContainer" className="row">
                        {aggregateNews}
                    </div>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    NewsActions: PropTypes.object,
    aggregateNews: PropTypes.array
};

function mapStateToProps (state, ownProps) {
    let aggregateNews;
    if (state.newsDirectory) aggregateNews = FunctionTools.aggregateDirectories(state.newsDirectory);
    return {
        aggregateNews
    };
}

function mapDispatchToProps(dispatch) {
    return {
        NewsActions: bindActionCreators(NewsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);