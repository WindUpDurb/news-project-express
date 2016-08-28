"use strict";

import * as types from "./actionTypes";

export function requestSent() {
    return {type: types.REQUEST_SENT};
}

export function receivedRequestSuccess() {
    return {type: types.REQUEST_RECEIVED_SUCCESSFUL};
}

export function receivedRequestError() {
    return {type: types.REQUEST_RECEIVED_ERROR};
}