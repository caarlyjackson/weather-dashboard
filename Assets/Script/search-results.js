var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector("#search-form");
var searchButton = document.querySelector("#search-input-button");
var searchInputEl = document.querySelector("#search-input-area");
var searchItemEl = document.querySelector("#past-searches-container");
var cityTitleEl = document.getElementById("city-searched-item")
var APIKEY = '510c27e4545e6077957004db2b092e1f';

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
function getWeatherFromCity(citySearched) {
    var requestUrl = 'api.openweathermap.org/data/2.5/weather?q=';
    var queryUrl = requestUrl + citySearched + '&appid=' + APIKEY;

    // If request isn't accepted
    fetch(requestUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (response) {

            return response.json();
        })

        .then(function (locRes) {
            // write query to page so
            cityTitleEl.textContent = locRes.search.citySearched;

            // Searched city not found
            if (!locRes.results.length) {
                console.log('No results found!');
                var resultBody = document.createElement('div');
                resultBody.classList.add('alert-red');
                resultCard.append(resultBody);
                resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                resultContentEl.textContent = '';
                for (var i = 0; i < locRes.results.length; i++) {
                    printResults(locRes.results[i]);
                }
            }
        }

            // Get long and lat
            // Longatude
            var longatudeQuery = Data.coord.long
    // Latitude
    titleEl.textContent = resultObj.name;


    function getUvRating()


    // Print results
    function printResults(resultObj) {
        console.log(resultObj);

        // set up `<div>` to hold result content
        var resultCard = document.createElement('div');
        resultCard.classList.add('card', 'col-6', 'text-dark', 'mb-3', 'p-3');

        var resultBody = document.createElement('div');
        resultBody.classList.add('card-body');
        resultCard.append(resultBody);

        // City Title
        var titleEl = document.createElement('h3');
        titleEl.textContent = resultObj.name;

        // Date Temperature
        var bodyContentEl = document.createElement('p');
        bodyContentEl.innerHTML = // Temperature
            '<strong>Temp:</strong> ' + resultObj.temp + '<br/>';

        if (resultObj.subject) { // Wind
            bodyContentEl.innerHTML +=
                '<strong>Wind:</strong> ' + resultObj.wind + '<br/>';
        } if (resultObj.description) { // Humidity
            bodyContentEl.innerHTML +=
                '<strong>Humidity:</strong> ' + resultObj.humidity[0];
        } if (resultObj.description) { // UV Index
            bodyContentEl.innerHTML +=
                '<strong>Description:</strong> ' + resultObj.description[0];
        } else {
            bodyContentEl.innerHTML +=
                '<strong>Description:</strong>  No description for this entry.';
        }

        var linkButtonEl = document.createElement('a');
        linkButtonEl.textContent = 'Read More';
        linkButtonEl.setAttribute('href', resultObj.url);
        linkButtonEl.classList.add('btn', 'btn-dark');

        resultBody.append(titleEl, bodyContentEl, linkButtonEl);

        resultContentEl.append(resultCard);
    }


    getParams();