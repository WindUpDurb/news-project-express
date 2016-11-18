"use strict";

import * as types from "./actionTypes";
import * as RequestActions from "./requestStatusActions";
import * as FunctionTools from "./FunctionTools";
import toastr from "toastr";

export function dispatchNews(arrayOfNews, source) {
    return {
        type: types.DISPATCH_NEWS,
        arrayOfNews,
        source
    };
}

export function updateFiltersFromStorage(filters) {
    return {
        type: types.NEWS_FILTERS_FROM_STORAGE,
        filters
    };
}

export function dispatchDirectoryChange(directory) {
    return {
        type: types.CHANGE_DIRECTORY,
        directory
    };
}

export function clearAllFilters() {
    return {
        type: types.CLEAR_NEWS_FILTERS
    };
}

export function changeDirectory(directory) {
    return function (dispatch) {
        dispatch(dispatchDirectoryChange(directory));  
    };
}

export function dispatchUpdateNewsFilter(newsSource) {
    return {
        type: types.UPDATE_NEWS_FILTER,
        newsSource
    };
}

export function dispatchRetrieveAllSources(content) {
    return {
        type: types.ALL_SOURCES_HERE,
        content
    };
}

export function updateContentFilters(newsSource) {
    return function (dispatch) {
        dispatch(dispatchUpdateNewsFilter(newsSource));
    };
}

export function saveFilters(filters) {
    localStorage.setItem("imageryNewsSavedFilters", JSON.stringify(filters));
    toastr.info("The current filters have been saved");
}

export function clearSavedFilters() {
    return function (dispatch) {
        localStorage.removeItem("imageryNewsSavedFilters");
        toastr.info("Your saved filters have been cleared");
        dispatch(clearAllFilters());
    };
}

export function retrieveFrom(source) {
    return function(dispatch) {
        dispatch(RequestActions.requestSent());
        fetch(`/api/news/newsPastHours/${source}`)
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                dispatch(RequestActions.receivedRequestSuccess());
                dispatch(dispatchNews(parsedResponse, source));
            })
            .catch(error => {
                dispatch(RequestActions.receivedRequestError());
                toastr.error(error);
            });
    };
}

export function retrieveAllNewsSources() {
    return function (dispatch) {
        dispatch(RequestActions.requestSent());
        fetch("/api/news/retrieveAllSources")
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                dispatch(RequestActions.receivedRequestSuccess());
                if(!parsedResponse.error) dispatch(dispatchRetrieveAllSources(parsedResponse));
            })
            .catch(error => {
                dispatch(RequestActions.receivedRequestError());
                toastr.error(error);
            });
    };
}