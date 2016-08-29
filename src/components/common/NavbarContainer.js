"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {NavbarPresentation} from "./NavbarPresentation";

class NavbarContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavbarPresentation/>
            </div>
        );
    };
}

NavbarContainer.propTypes = {

};


function mapStateToProps(state, ownProps) {
    return {

    };
}

export default connect(mapStateToProps)(NavbarContainer);