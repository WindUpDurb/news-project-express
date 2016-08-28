"use strict";
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore.dev";
import {Provider} from "react-redux";
import { Router, applyRouterMiddleware, browserHistory } from "react-router";
import useScroll from "react-router-scroll";
import {generateRoutes} from "./routes";
import "./components/Home/homeStyles.css";
import "./styles/styles.css";
import "./styles/preloader.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import "../node_modules/bootstrap-material-design/dist/css/ripples.min.css";
import "../node_modules/bootstrap-material-design/dist/js/material.min";
import "../node_modules/toastr/build/toastr.min.css";

const store = configureStore();

//store.dispatch({type: "CHECK_ACTIVE_USER"});

render(
    <Provider store={store}>
        <Router
            history={browserHistory}
            routes={generateRoutes(store)}
            render={applyRouterMiddleware(useScroll())}/>
    </Provider>,
    document.getElementById("app")
);

export default store;