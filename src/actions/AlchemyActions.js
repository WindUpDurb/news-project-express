"use strict";

import * as FunctionTools from "./FunctionTools";


export function retrieveNewsPastHours(hours) {
    return function(dispatch) {
        fetch(`/api/news/newsPastHours/${hours}`)
            .then(response => {
                console.log("Response: ", response)
                return response.json();
            })
            .then(parsedResponse => {
                console.log("Parsed Response: \n", parsedResponse);
                if (parsedResponse.status === "OK") {
                    console.log(FunctionTools.cleanNewsResponseObject(parsedResponse));
                }
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };
}