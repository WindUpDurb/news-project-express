"use strict";

import React from "react";
import {NewsDirectory} from "./initialState";
import * as types from "../actions/actionTypes";

export const newsReducer = (state = NewsDirectory, action) => {
    switch(action.type) {
        case types.DISPATCH_NEWS:
            return (
               Object.assign({}, state, {[action.source]: action.arrayOfNews})
            );
        
        case types.CHANGE_DIRECTORY:
            return (
                Object.assign({}, state, {activeDirectory: action.directory})
            );
        default:
            return state;
    }
};