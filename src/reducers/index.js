"use strict";

import { combineReducers } from "redux";
import jobPostsReducer from "./jobPostsReducer";
import requestStatusReducer from "./requestsInProgress";

const rootReducer = combineReducers({
    //the property specified here will impact the way it is referred in the rest of the application
    //or short-hand property name of just: `courses`
    jobPosts: jobPostsReducer,
    requestsInProgress: requestStatusReducer
});

export default rootReducer;
