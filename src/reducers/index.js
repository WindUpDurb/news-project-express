"use strict";

import { combineReducers } from "redux";
import requestStatusReducer from "./requestsInProgress";
import newsReducer from "./newsReducer";
import activeDirectoryReducer from "./activeDirectoryReducer";
import contentFiltersReducer from "./contentFiltersReducer";

const rootReducer = combineReducers({
    //the property specified here will impact the way it is referred in the rest of the application
    //or short-hand property name of just: `courses`
    requestsInProgress: requestStatusReducer,
    activeDirectory: activeDirectoryReducer,
    newsDirectory: newsReducer,
    contentFilters: contentFiltersReducer
});

export default rootReducer;
