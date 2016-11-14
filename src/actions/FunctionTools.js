"use strict";

import React from "react";

function merge(left, right) {
    let result = [],
        leftIndex = 0,
        rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].publishedUnix < right[rightIndex].publishedUnix) {
            result.push(right[rightIndex]);
            ++rightIndex;
        } else {
            result.push(left[leftIndex]);
            ++leftIndex;
        }
    }
    for(; leftIndex < left.length; ++leftIndex) {
        result.push(left[leftIndex]);
    }
    for(; rightIndex < right.length; ++rightIndex) {
        result.push(right[rightIndex]);
    }
    return result;
}

function mergeSort(array) {
    if (array.length < 2) return array;
    let midpoint = Math.floor(array.length / 2),
        left = array.slice(0, midpoint),
        right = array.slice(midpoint, array.length);
    return merge(mergeSort(left), mergeSort(right));
}

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

export const aggregateDirectories = (newsDirectory, filterOutObject) => {
    let toReturn = [];
    let counter = 0;
    for (let source in newsDirectory) {
        if (source !== "BGBigPicture" && !filterOutObject[source]) {
            counter++;
            toReturn.push(...newsDirectory[source]);
        }
    }
    //let shuffled = shuffleArray(toReturn);
    let sorted = mergeSort(toReturn);
    for (let i = 6; i < sorted.length; i += 6) {
        sorted.splice(i, 0, {filler: true});
    }
    return sorted;
};

export const addFillersToPhotoDirectory = (photoContents) => {
    let toReturn = photoContents.sort((a, b) => b.publishedUnix - a.publishedUnix);
    for (let i = 4; i < toReturn.length; i += 5) {
        toReturn.splice(i, 0, {fillerImage: true});
    }
    return toReturn;
};