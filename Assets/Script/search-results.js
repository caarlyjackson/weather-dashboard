var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector("#search-form");
var searchButton = document.querySelector("#search-input-button");
var searchInputEl = document.querySelector("#search-input-area");
var searchItemEl = document.querySelector("#past-searches-container");


// fetch APIUrl



// Split URL
function getParams() {
    // URL search params and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.location.search.split('&');

    // Get the query and format values
    var query = searchParamsArr[0].split('=').pop();
    var format = searchParamsArr[1].split('=').pop();

    searchApi(query, format);
}




// RESULT CONTENT DIV


// URL
function getApi() {
    var requestUrl = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid=510c27e4545e6077957004db2b092e1f';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

}


// if weather is nice/high temperature - present a sun

// if weather is cold/low temperature/wet - present a cloud

// FIVE DAY WEATHER FORECAST 
// input

// depending on weather, insert:
// rain cloud

// sun

// cloud

// partly sunny/partly cloudy