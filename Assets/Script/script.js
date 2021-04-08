var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector("#search-form");
var searchButton = document.querySelector("#search-input-button");
var searchInputEl = document.querySelector("#search-input-area");
var searchItemEl = document.querySelector("#past-searches-container");

// Search Form Input
var formSubmitHandler = function (event) {
    event.preventDefault();

    var citySearched = searchInputEl.value.trim();
    console.log(searchInputEl.value)

    // check search is true
    if (!citySearched) {
        alert("You need to search a city!")
        return;
    }

    var queryString = './search-results.html?q=' + citySearched + '&units=metric';
    // location.assign(queryString);

    // write query to page so user knows what they are viewing
    var listEl = document.createElement("LI");
    var previousList =
        document.createTextNode(citySearched);
    listEl.appendChild(previousList);
    document.getElementById("past-searches-container").appendChild(listEl);
}

searchFormEl.addEventListener('submit', formSubmitHandler);

