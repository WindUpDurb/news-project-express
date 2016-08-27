"use strict";

import * as types from "./actionTypes";
import * as FunctionTools from "./FunctionTools";

export function dispatchCNN(arrayOfNews) {
    return {
        type: types.DISPATCH_CNN,
        arrayOfNews
    };
}

export function retrieveFromCNN() {
    return function(dispatch) {
        fetch("/api/news/newsPastHours/")
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                dispatch(dispatchCNN(parsedResponse));
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}