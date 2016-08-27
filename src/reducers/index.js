"use strict";

import { combineReducers } from "redux";
import requestStatusReducer from "./requestsInProgress";
import {newsReducer} from "./newsReducer";

const rootReducer = combineReducers({
    //the property specified here will impact the way it is referred in the rest of the application
    //or short-hand property name of just: `courses`
    requestsInProgress: requestStatusReducer,
    newsDirectory: newsReducer
});

export default rootReducer;
