"use strict";

import React, {PropTypes} from "react";
import {HomeHeader} from "./homeHeader";
import {connect} from "react-redux";
import * as NewsActions from "../../actions/NewsActions";
import {bindActionCreators} from "redux";
import {NewsTile} from "../common/NewsTile";
import $ from "jquery";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.props.NewsActions.retrieveFromCNN();
    }


    openModal(index) {
        $(`#newsModal${index}`).modal("show");
    }

    closeModal(index) {
        console.log("Closing: ", index);
        $(`#newsModal${index}`).modal("hide");
    }

    render() {
        let CNN;
        if (this.props.CNN) CNN = this.props.CNN.map((item, index) => {
            return <NewsTile openModal={this.openModal} newsObject={item} 
                             closeModal={this.closeModal} index={index} key={index}/>;   
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