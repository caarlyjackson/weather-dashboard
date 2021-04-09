var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.getElementById("#search-form");
var searchButton = document.querySelector("#search-input-button");
var searchInputEl = document.querySelector("#search-input-area");
var searchItemEl = document.querySelector("#past-searches-container");
var APIKEY = '510c27e4545e6077957004db2b092e1f';


console.log(searchFormEl);

// Search Form Input
function formSubmitHandler(event) {
    event.preventDefault();

    var citySearched = searchInputEl.value.trim();
    console.log(searchInputEl.value)

    // check search is true
    if (!citySearched) {
        alert("You need to search a city!")
        return;
    }

    // write query to page so user knows what they are viewing
    var listEl = document.createElement("LI");
    var previousList =
        document.createTextNode(citySearched);
    listEl.appendChild(previousList);
    document.getElementById("past-searches-container").appendChild(listEl);

    getWeatherFromCity(citySearched);
    getUvIndex();
}

function getWeatherFromCity(citySearched) {
    console.log("Inside the getWeatherFromCity function");
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var queryUrl = requestUrl + citySearched + '&appid=' + APIKEY + '&units=metric';
    console.log(queryUrl);
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            printResults(data);
        })
        .catch(function (error) {
            console.log(error);
        })

    // // Searched city not found
    // if (!locRes.results.length) {
    //     console.log('No results found!');
    //     var alertBody = document.createElement('div');
    //     alertBody.classList.add('alert alert-info');
    //     resultCard.append(alertBody);
    //     resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
    // }
}

// UV Index API
function getUvIndex() {
    // Get longatude and latitude
    var longatudeQuery = resultObj.coord.lon;
    var latitudeQuery = resultObj.coord.lat;

    console.log("Inside the getUvIndex function");

    var requestUrl = 'api.openweathermap.org/data/2.5/forecast/daily?';
    var queryUrl = requestUrl + 'lat=' + latitudeQuery + '&lon=' + longatudeQuery + '&appid=' + APIKEY;

    console.log(queryUrl);

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            printResults(data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function printResults(resultObj) {
    console.log(resultObj);

    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    // City Title
    var titleEl = document.createElement('h3');
    console.log(resultObj.name);
    titleEl.textContent = resultObj.name;
    resultBody.append(titleEl);

    // Temperature
    var bodyContentOneEl = document.createElement('p');
    bodyContentOneEl.innerHTML =
        '<strong>Temp:</strong> ' + resultObj.main.temp + '<br/>';
    resultBody.append(bodyContentOneEl);
    // Wind
    var bodyContentTwoEl = document.createElement('p');
    bodyContentTwoEl.innerHTML =
        '<strong>Wind:</strong> ' + resultObj.wind.speed + '<br/>';
    resultBody.append(bodyContentTwoEl);
    // Humidity
    var bodyContentThreeEl = document.createElement('p');
    bodyContentThreeEl.innerHTML =
        '<strong>Humidity:</strong> ' + resultObj.main.humidity + '<br/>';
    resultBody.append(bodyContentThreeEl);

    // // UV Index
    // var bodyContentFourEl = document.createElement('p');
    // bodyContentThreeEl.innerHTML =
    //     '<strong>UV Index:</strong> ' + resultObj.main.humidity + '<br/>';
    // resultBody.append(bodyContentThreeEl);

    resultContentEl.append(resultCard);
}

searchButton.addEventListener('click', formSubmitHandler);

