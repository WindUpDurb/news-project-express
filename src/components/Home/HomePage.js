"use strict";

import React, {PropTypes} from "react";
import {HomeHeader} from "./homeHeader";
import {connect} from "react-redux";
import * as NewsActions from "../../actions/NewsActions";
import {bindActionCreators} from "redux";
import {NewsTile} from "../common/NewsTile";
//import $ from "jquery";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentModal: null
        };
        
        this.openModal = this.openModal.bind(this);
    }

    componentWillMount() {
        this.props.NewsActions.retrieveFromCNN();
    }


    openModal(index) {
        console.log("Index: ", index)
        console.log(this.state.currentModal);
        this.setState({currentModal: index});
        console.log(this.state.currentModal);
    }
    

    render() {
        let CNN;
        if (this.props.CNN) CNN = this.props.CNN.map((item, index) => {
            return (
                <NewsTile newsObject={item} index={index} currentModal={this.state.currentModal}
                             openModal={this.openModal} key={index}/>
            );
        });
        return (
            <div>
                <HomeHeader/>
                <div className="container">
                    <div className="row">
                        {CNN}
                    </div>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    NewsActions: PropTypes.object,
    CNN: PropTypes.array
};

function mapStateToProps (state, ownProps) {
    let CNN;
    if (state.newsDirectory && state.newsDirectory.CNN) CNN = state.newsDirectory.CNN;
    return {
        CNN
    };
}

function mapDispatchToProps(dispatch) {
    return {
        NewsActions: bindActionCreators(NewsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);