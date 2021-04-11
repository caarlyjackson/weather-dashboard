var resultContentEl = document.querySelector('#result-content');
var resultContentForecastEl = document.querySelector("#result-content-forecast");
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

// CITY DAY WEATHER
function getWeatherFromCity(citySearched) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var queryUrl = requestUrl + citySearched + '&appid=' + APIKEY + '&units=metric';

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            getFiveForecast(data.coord.lat, data.coord.lon);
            printResults(data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

// UV INDEX
// function getUvIndex(latitude, longitude) {

//     var requestUrl = 'https://api.openweathermap.org/data/2.5/uvi?';
//     var queryUrlTwo = requestUrl + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKEY;

//     fetch(queryUrlTwo)
//         .then(function (response) {
//             return response.json();
//         }).then(function (data) {
//             console.log(data);

//             printResultsUv(data);
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// }

// ICON

// FIVE DAY FORECAST
function getFiveForecast(latitude, longitude) {
    // Name
    // var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    // var queryUrlThree = requestUrl + citySearched + '&appid=' + APIKEY;

    // Coordinates
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
    var queryUrlThree = requestUrl + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKEY;

    fetch(queryUrlThree)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            console.log(data);

            fiveDayForecastData(data);
        })
        .catch(function (error) {
            console.log(error);
        })

    console.log(queryUrlThree)
}

// Print Daily City Weather
function printResults(resultObj) {
    console.log(resultObj);

    resultContentEl.textContent = ""

    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'col-8');

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

// Print UV Index
// function printResultsUv(data) {
//     console.log(data)

//     // UV Index
//     var bodyContentFourEl = document.createElement('p');
//     bodyContentFourEl.innerHTML =
//         'UV Index:  ' + data.main.uvi + '<br/>';
//     resultBody.append(bodyContentThreeEl);
// }

// Print Icon
function printIcon(getIcon) {
    var bodyContentFiveEl = document.createElement9('h5');
    // bodyContentFiveEl.innerHTML =
    resultCard.append(resultBody);

}

// Print Five Day Forecast
function fiveDayForecastData(forecastData) {
    // for (var i = 1; fiveDayForecastData.length < 6; i++) {

    var outputData = '';
    // for (var i = 1; forecastData.length < 6; i++) {

    for (var i = 0; i < forecastData.length; i += 8) {
        output += forecastData[i].split(":", 1);
    }
    console.log(outputData)

    // Print data
    resultContentForecastEl.textContent = ""

    // Heading - 5-day forecast
    var headingForecast = document.createElement('div');
    headingForecast.classList.add('card-forecast');
    var headingText = document.createElement('h6');
    headingText.textContent = '5-Day Forecast:';
    headingForecast.append(headingText);
    console.log(headingText)

    // Result Card
    var resultCardTwo = document.createElement('div');
    resultCardTwo.classList.add('card-forecast');

    var resultBodySmall = document.createElement('div');
    resultBodySmall.classList.add('card-body-small');
    resultCardTwo.append(resultBodySmall);

    // Trying to find the time in data array:
    console.log(forecastData.list.child[i].dt)

    // Print results
    // Date
    var unixFormatTwo = document.createElement('h3');
    unixFormatTwo.classList.add('date-text-two');
    unixFormatTwo.textContent = '(' + moment.unix(forecastData.list.child().dt).format('L') + ')';
    console.log(unixFormatTwo);
    resultBodySmall.append(unixFormatTwo);

    // Icon

    // Temp
    // var smallBodyContentOne = document.createElement('p');
    // smallBodyContentOne.textContent = resultObj.name;
    // resultBodySmall.append(smallBodyContentOne);

    // Wind
    // Humidity

}

searchButton.addEventListener('click', formSubmitHandler);

