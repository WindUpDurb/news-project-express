"use strict";

import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "./components/App";
import HomePage from "./components/Home/HomePage";
import * as types from "./actions/actionTypes";
import toastr from "toastr";

export const generateRoutes = (store) => {
    const checkIfActiveUser = (nextState, replace) => {
        let activeUser;
        if (store) {
            activeUser = store.getState().userAndAuth;
        }
        if (!activeUser) {
            replace({pathname: "/"});
            if(!localStorage.profile) {
                toastr.info("Please login for access.");
            }
        }
    };

    
    // <Route path="/home" component={HomePage} />
    // <Route path="/profile" component={ProfilePage} onEnter={checkIfActiveUser}/>
    //const checkCurrentBeer = () => store.dispatch({type: types.CHECK_CURRENT_BEER_STATE});

    return (
        <Route path="/" component={App}>
            <IndexRedirect to="/home"/>
            <Route path="/home" component={HomePage} />
        </Route>
    );

};

