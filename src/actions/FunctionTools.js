"use strict";

import React from "react";

const shuffleArray = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
   return array;
};

export const aggregateDirectories = (newsDirectory) => {
    let toReturn = [];
    let counter = 0;
    for (let source in newsDirectory) {
        if (source !== "BGBigPicture") {
            counter++;
            toReturn.push(...newsDirectory[source]);
        }
    }
    //let sorted = toReturn.sort((a, b) => b.publishedUnix - a.publishedUnix);
    let shuffled = shuffleArray(toReturn);
    for (let i = 6; i < shuffled.length; i += 6) {
        shuffled.splice(i, 0, {filler: true});
    }
    return shuffled;
};

export const addFillersToPhotoDirectory = (photoContents) => {
    let toReturn = photoContents.sort((a, b) => b.publishedUnix - a.publishedUnix);
    for (let i = 4; i < toReturn.length; i += 5) {
        toReturn.splice(i, 0, {fillerImage: true});
    }
    return toReturn;
};