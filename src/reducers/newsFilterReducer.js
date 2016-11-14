"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

export default function newsFilterReducer ( state = initialState.newsFilters, action) {
    switch(action.type) {
        case types.UPDATE_NEWS_FILTER:
            console.log("Updating");
            return (
                Object.assign({}, state, {[action.newsSource]: !state[action.newsSource]})
            );

        default:
            return state;
    }
}