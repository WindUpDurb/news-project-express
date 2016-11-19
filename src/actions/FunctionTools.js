"use strict";

import React from "react";

const imageSources = {
    source500PXUpcoming: true,
    BGBigPicture: true
};

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
    let toReturn = {
        news: [],
        photos: []
    };
    let counter = 0;
    for (let source in newsDirectory) {
        if (!filterOutObject[source]) {
            counter++;
            if (imageSources[source]) {
                toReturn.photos.push(...newsDirectory[source]);
            } else {
                toReturn.news.push(...newsDirectory[source]);
            }
        }
    }
    //let shuffled = shuffleArray(toReturn);
	///////////////////Use performance.now() to check efficiency compared to quick sort algorithm in notes
	//Otherwise, recursion is slow, and re-do as an iterative merge sort
    if (toReturn.news.length) {
        toReturn.news = mergeSort(toReturn.news);
        for (let i = 6; i < toReturn.news.length; i += 6) {
            toReturn.news.splice(i, 0, {filler: true});
        }
    }

    if (toReturn.photos.length) {
        let sorted = mergeSort(toReturn.photos);
        toReturn.photos = addFillersToPhotoDirectory(sorted);
    }

    return toReturn;
};

export const addFillersToPhotoDirectory = (photoContents) => {
    for (let i = 4; i < photoContents.length; i += 5) {
        photoContents.splice(i, 0, {fillerImage: true});
    }
    return photoContents;
};
