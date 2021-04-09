var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.getElementById("#search-form");
var searchButton = document.querySelector("#search-input-button");
var searchInputEl = document.querySelector("#search-input-area");
var searchItemEl = document.querySelector("#past-searches-container");
var APIKEY = '510c27e4545e6077957004db2b092e1f';

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

    // Save to local storage
    var cityInput = document.getElementById("search-input-area");
    var nameInput = cityInput.value;
    localStorage.setItem("City", JSON.stringify(nameInput));

    //save to screen
    console.log(cityInput.value)

    //get localstorage
    localStorage.getItem(cityInput);

    getWeatherFromCity(citySearched);
}

function getWeatherFromCity(citySearched) {
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
function getUvIndex(latitude, longitude) {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?';
    var queryUrlTwo = requestUrl + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKEY;

    console.log(queryUrlTwo);

    fetch(queryUrlTwo)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            printResultsUv(data);
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
    titleEl.textContent = resultObj.name;
    resultBody.append(titleEl);

    // Temperature
    var bodyContentOneEl = document.createElement('p');
    bodyContentOneEl.innerHTML =
        'Temp:  ' + resultObj.main.temp + '<br/>';
    resultBody.append(bodyContentOneEl);
    // Wind
    var bodyContentTwoEl = document.createElement('p');
    bodyContentTwoEl.innerHTML =
        'Wind:  ' + resultObj.wind.speed + '<br/>';
    resultBody.append(bodyContentTwoEl);
    // Humidity
    var bodyContentThreeEl = document.createElement('p');
    bodyContentThreeEl.innerHTML =
        'Humidity:  ' + resultObj.main.humidity + '<br/>';
    resultBody.append(bodyContentThreeEl);

    resultContentEl.append(resultCard);

    getUvIndex(resultObj.coord.lat, resultObj.coord.lon);
    console.log(resultObj.coord.lat);
    // var latitude = resultObj.coord.lat;
    console.log(resultObj.coord.lon);
}

function printResultsUv(data) {
    console.log(data)
    // UV Index
    var bodyContentFourEl = document.createElement('p');
    bodyContentFourEl.innerHTML =
        'Humidity:  ' + data.main.value + '<br/>';
    resultBody.append(bodyContentThreeEl);
}

searchButton.addEventListener('click', formSubmitHandler);

