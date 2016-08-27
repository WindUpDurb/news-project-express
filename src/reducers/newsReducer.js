"use strict";

import React from "react";
import {NewsDirectory} from "./initialState";
import * as types from "../actions/actionTypes";

export const newsReducer = (state = NewsDirectory, action) => {
    switch(action.type) {
        case types.DISPATCH_CNN:
            return (
               Object.assign({}, state, {CNN: action.arrayOfNews})
            );
        default:
            return state;
    }
};