"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

const inital = initialState.jobPosts;

export default function jobPostsReducer (state = inital, action) {
    switch(action.type) {
        default:
            return state;
    }
}