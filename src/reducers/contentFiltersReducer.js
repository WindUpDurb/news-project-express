"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

const newsFiltersCleared = {
    NPR: false,
    IGN: false,
    BGBigPicture: false,
    NYTimes: false,
    CNN: false,
    ABCNewsInternational: false,
    source500PXUpcoming: false
};

export default function contentFiltersReducer ( state = initialState.filters, action) {
    switch(action.type) {
        case types.NEWS_FILTERS_FROM_STORAGE:
            return (
                Object.assign({}, state, JSON.parse(action.filters))
            );
        case types.UPDATE_NEWS_FILTER:
            return (
                Object.assign({}, state, {[action.newsSource]: !state[action.newsSource]})
            );

        case types.CLEAR_NEWS_FILTERS:
            return (
                Object.assign({}, state, newsFiltersCleared)
            );

        default:
            return state;
    }
}