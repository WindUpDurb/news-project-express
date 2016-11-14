"use strict";

import React from "react";
import {activeDirectory} from "./initialState";
import * as types from "../actions/actionTypes";

export default function activeDirectoryReducer (state = activeDirectory, action) {
    switch(action.type) {
        case types.CHANGE_DIRECTORY:
            return action.directory;
        default:
            return state;
    }
}