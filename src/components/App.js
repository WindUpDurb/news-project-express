"use strict";
import React, { PropTypes } from "react";
import {bindActionCreators} from "redux";
import NavbarContainer from "./common/NavbarContainer";
import ScrollToTop from "react-scroll-up";
import {CustomModal} from "./common/CustomModal";
import {connect} from "react-redux";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>
                    <div aria-busy={this.props.loading} aria-label="Loading, please wait." role="progressbar"></div>
                </header>
                <NavbarContainer />
                <ScrollToTop showUnder={160}>
                    <img src="/statics/scrollUp.png"/>
                </ScrollToTop>
                {this.props.children}
                <script>
                    import * as material from "../../node_modules/bootstrap-material-design/dist/js/material.min";
                    import $ from "jquery";
                    $(document).ready(function () {
                    $.material.init()
                });
                </script>
            </div>
        );
    }
}


App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.requestsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);
