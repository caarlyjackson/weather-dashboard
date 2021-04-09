var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.getElementById("#search-form");
var searchButton = document.querySelector("#search-input-button");
var searchInputEl = document.querySelector("#search-input-area");
var searchItemEl = document.querySelector("#past-searches-container");
var APIKEY = '510c27e4545e6077957004db2b092e1f';
var latitude = "";
var longitude = "";

// Search Form Input
function formSubmitHandler(event) {
    event.preventDefault();

    var citySearched = searchInputEl.value.trim();

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

    //get localstorage
    localStorage.getItem(cityInput);

    getWeatherFromCity(citySearched);
}

function getWeatherFromCity(citySearched) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var queryUrl = requestUrl + citySearched + '&appid=' + APIKEY + '&units=metric';
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

    getFiveForecast(latitude, longitude);
    console.log(getFiveForecast);
}

// UV Index API
function getUvIndex(latitude, longitude) {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/uvi?';
    var queryUrlTwo = requestUrl + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKEY;

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

function getFiveForecast(latitude, longitude) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    var queryUrlThree = requestUrl + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKEY;
    // Exclude (currently, minutely, hourly, daily, alerts)
    // + '&exclude=' + { part }

    // MY FOR LOOP
    // (var i = 1; i < 6; i++) {

    fetch(queryUrlThree)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            console.log(data);

            getFiveForecast(data.coord.lat, data.coord.lon);
        })
        .catch(function (error) {
            console.log(error);
        })

    console.log(queryUrlThree)
}

function printResults(resultObj) {
    console.log(resultObj);

    resultContentEl.textContent = ""

    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    // City Title
    var titleEl = document.createElement('h3');
    titleEl.classList.add('title-text');
    titleEl.textContent = resultObj.name;
    resultBody.append(titleEl);

    // Date
    var unixFormat = document.createElement('h3');
    unixFormat.classList.add('date-text');
    unixFormat.textContent = '   (' + moment.unix(resultObj.dt).format('L') + ')  ';
    console.log(unixFormat);
    resultBody.append(unixFormat);

    // Icon
    var iconContent = document.createElement('h4');
    iconContent.textContent = '   ' + resultObj.weather.icon;
    resultBody.append(iconContent);

    // Temperature
    var bodyContentOneEl = document.createElement('p');
    bodyContentOneEl.classList.add('p-temp');
    bodyContentOneEl.innerHTML =
        'Temp:  ' + resultObj.main.temp + '°C' + '<br/>';
    resultBody.append(bodyContentOneEl);
    // Wind
    var bodyContentTwoEl = document.createElement('p');
    bodyContentTwoEl.innerHTML =
        'Wind:  ' + resultObj.wind.speed + ' MPH' + '<br/>';
    resultBody.append(bodyContentTwoEl);
    // Humidity
    var bodyContentThreeEl = document.createElement('p');
    bodyContentThreeEl.innerHTML =
        'Humidity:  ' + resultObj.main.humidity + ' %' + '<br/>';
    resultBody.append(bodyContentThreeEl);

    resultContentEl.append(resultCard);

    getUvIndex(resultObj.coord.lat, resultObj.coord.lon);

    // getIcon(resultObj.weather.icon);
    console.log(resultObj.weather.icon);
    console.log(getIcon.value())

}

function printIcon(getIcon) {
    var bodyContentFiveEl = document.createElement9('h5');
    // bodyContentFiveEl.innerHTML =
    resultCard.append(resultBody);

}

// function printResultsUv(data) {
//     console.log(data)
//     // UV Index
//     var bodyContentFourEl = document.createElement('p');
//     bodyContentFourEl.innerHTML =
//         'Humidity:  ' + data.main.value + '<br/>';
//     resultBody.append(bodyContentThreeEl);
// }

searchButton.addEventListener('click', formSubmitHandler);

