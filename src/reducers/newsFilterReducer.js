"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

const newsFiltersCleared = {
    NPR: false,
    IGN: false,
    BGBigPicture: false,
    NYTimes: false,
    CNN: false,
    ABCNewsInternational: false
};

export default function newsFilterReducer ( state = initialState.newsFilters, action) {
    switch(action.type) {
        case types.FILTERS_FROM_STORAGE:
            return (
                Object.assign({}, state, JSON.parse(action.filters))
            );
        case types.UPDATE_NEWS_FILTER:
            return (
                Object.assign({}, state, {[action.newsSource]: !state[action.newsSource]})
            );

        case types.CLEAR_FILTERS:
            return (
                Object.assign({}, state, newsFiltersCleared)
            );

        default:
            return state;
    }
}