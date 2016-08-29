"use strict";

export const aggregateDirectories = (newsDirectory) => {
    let toReturn = [];
    let counter = 0;
    for (let source in newsDirectory) {
        if (source !== "BGBigPicture") {
            counter++;
            toReturn.push(...newsDirectory[source]);
        }
    }
    let sorted = toReturn.sort((a, b) => b.publishedUnix - a.publishedUnix);
    for (let i = 6; i < sorted.length; i += 6) {
        sorted.splice(i, 0, {filler: true});
    }
    console.log("Sorted: ", sorted)
    return sorted;
};