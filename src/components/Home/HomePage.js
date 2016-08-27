"use strict";

import React, {PropTypes} from "react";
import {HomeHeader} from "./homeHeader";
import {connect} from "react-redux";
import * as AlchemyActions from "../../actions/AlchemyActions";
import {bindActionCreators} from "redux";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.AlchemyActions.retrieveNewsPastHours(1);
    }


    render() {
        return (
            <div>
                <HomeHeader/>
            </div>
        );
    }
}

HomePage.propTypes = {
    AlchemyActions: PropTypes.object
};

function mapStateToProps (state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        AlchemyActions: bindActionCreators(AlchemyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);