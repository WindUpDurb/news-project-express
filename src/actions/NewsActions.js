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

export function retrieveFrom(source) {
    return function(dispatch) {
        dispatch(RequestActions.requestSent());
        fetch(`/api/news/newsPastHours/${source}`)
            .then(response => {
                dispatch(RequestActions.receivedRequestSuccess());
                return response.json();
            })
            .then(parsedResponse => {
                dispatch(dispatchNews(parsedResponse, source));
            })
            .catch(error => {
                dispatch(RequestActions.receivedRequestError());
                toastr.error(error);
            });
    };
}