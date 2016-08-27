"use strict";

import React, {PropTypes} from "react";
import {HomeHeader} from "./homeHeader";
import {connect} from "react-redux";
import * as NewsActions from "../../actions/NewsActions";
import {bindActionCreators} from "redux";
import {NewsTile} from "../common/NewsTile";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.NewsActions.retrieveFromCNN();
    }


    render() {
        let CNN;
        if (this.props.CNN) CNN = this.props.CNN.map((item, index) => <NewsTile newsObject={item} key={index}/>);
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