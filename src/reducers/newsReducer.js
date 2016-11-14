"use strict";

import React from "react";
import {NewsDirectory} from "./initialState";
import * as types from "../actions/actionTypes";

export default function newsReducer (state = NewsDirectory, action) {
    switch(action.type) {
        case types.DISPATCH_NEWS:
            return (
               Object.assign({}, state, {[action.source]: action.arrayOfNews})
            );
        default:
            return state;
    }
}