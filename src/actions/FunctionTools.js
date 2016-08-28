"use strict";

export const aggregateDirectories = (newsDirectory) => {
    let toReturn = [];
    for (let source in newsDirectory) {
        toReturn.push(...newsDirectory[source]);
    }
    return toReturn;
};