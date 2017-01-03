var observable = require("data/observable");
var observableArray = require("data/observable-array");
var fetchModule = require("fetch");
var ViewModelItem = (function () {
    function ViewModelItem(title, info, url) {
        this.title = title;
        this.info = info;
        this.url = url;
    }
    return ViewModelItem;
}());
exports.ViewModelItem = ViewModelItem;
var items = new observableArray.ObservableArray();

fetchModule.fetch("https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty", {
    })
    .then(handleErrors)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        for (i = 0; i < 10; i++) { 
            fetchModule.fetch("https://hacker-news.firebaseio.com/v0/item/" + data[i] + ".json?print=pretty", {
            })
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                items.push(new ViewModelItem(data.title, data.text, data.url));
            });
        }
    });

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}


exports.mainViewModel = new observable.Observable();
exports.mainViewModel.set("items", items);

    
