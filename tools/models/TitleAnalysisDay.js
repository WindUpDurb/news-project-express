"use strict";

let schema = {
    wordsCounts: {
        //words as keys
        //values equal to frequency
        "trump": 10,
        "earthquake": 12
    },
    sources: {
        //article link as key
        //used to prevent duplicate articles contributing to total
        "http://www.bbc.co.uk/news/world-asia-38059371": 1
    }
};

//Master Source Object to add each link to?
//In case an old article is still in list

//to grab date at time of fetching articles:
// let today = new Date(Date.now()).toDateString().split(" ");
// let todayString = today[1] + today[2] + today[3];

let publishedFieldOnArticle = "Mon, 21 Nov 2016 20:05:13 -0500".split(" ");
let stringToUse = publishedFieldOnArticle[2] + publishedFieldOnArticle[1] + publishedFieldOnArticle[3];
console.log(stringToUse);