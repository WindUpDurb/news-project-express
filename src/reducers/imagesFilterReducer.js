"use strict";

import * as types from "../actions/actionTypes";
import * as initialState from "./initialState";

const imagesFiltersCleared = {
    BGBigPicture: false,
    source500PXUpcoming: false
};

export default function imagesFilterReducer ( state = initialState.imagesFilters, action) {
    switch(action.type) {
        case types.IMAGES_FILTERS_FROM_STORAGE:
            return (
                Object.assign({}, state, JSON.parse(action.filters))
            );
        case types.UPDATE_IMAGES_FILTER:
            return (
                Object.assign({}, state, {[action.newsSource]: !state[action.newsSource]})
            );

        case types.CLEAR_IMAGES_FILTERS:
            return (
                Object.assign({}, state, imagesFiltersCleared)
            );

        default:
            return state;
    }
}