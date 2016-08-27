"use strict";

export function cleanNewsResponseObject(responseObject) {
    //for max 200 results
    let pages = [];
    let toReturn = {
        nextResults: responseObject.result.next,
        remainingResults: parseInt(responseObject.totalTransactions) - responseObject.result.docs.length
    };
    if (responseObject.result.docs.length) {
        while(responseObject.result.docs.length) {
            console.log("length: ", responseObject.result.docs.length);
            if (responseObject.result.docs.length > 15) {
                pages.push(responseObject.result.docs.splice(0, 15));
            } else {
                pages.push(responseObject.result.docs.splice(0));
            }
        }
        toReturn.pages = pages;
    }
}