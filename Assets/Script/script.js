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

// ICON
function getIcon(icon) {
    var requestUrl = 'https://openweathermap.org/img/wn/';
    var queryUrlFour = requestUrl + icon + '@2x.png';

    fetch(queryUrlFour)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            console.log(data);

            printIcon(data);
        })
        .catch(function (error) {
            console.log(error);
        })
}


// FIVE DAY FORECAST
function getFiveForecast(latitude, longitude) {
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

    console.log(resultObj.main.dt)
}

// Print UV Index
function printResultsUv(data) {
    console.log(data)

    // UV Index
    var bodyContentFourEl = document.createElement('p');
    bodyContentFourEl.innerHTML =
        'UV Index:  ' + data.main.uvi + '<br/>';
    resultBody.append(bodyContentThreeEl);
}

// Print Icon
// function printIcon(getIcon) {
//     var bodyContentIcon = document.createElement9('h5');
//     // bodyContentIcon.innerHTML =
//     resultCard.append(bodyContentIcon);

// }

// Print Five Day Forecast
function fiveDayForecastData(forecastData) {
    for (var i = 0; i < forecastData.list.length; i += 1) {

        console.log(forecastData.list[i].dt)

        console.log(forecastData.list[i])

        // Print data
        resultContentForecastEl.textContent = ""
        // Result Card
        var resultCardTwo = document.createElement('div');
        resultCardTwo.classList.add('card-forecast', 'col-8');
        // Result Body
        var resultBodySmall = document.createElement('div');
        resultBodySmall.classList.add('cardbodytwo');
        resultCardTwo.append(resultBodySmall);

        console.log(forecastData.list[i].dt_text === 'YYYY-MM-DD ' + '15:00:00')


        if (forecastData.list[i].dt_text == 'YYYY-MM-DD ' + '15:00:00') {
            // Date
            var unixForm = document.createElement('h6');
            unixForm.classList.add('date-txt');
            unixForm.textContent = moment.unix(forecastData.list[i].dt).format('L');
            console.log(unixForm);
            resultBodySmall.append(unixForm);
            // Temperature
            var bodyCont = document.createElement('p');
            bodyCont.textContent = 'Temp: ' + forecastData.list.main.temp + '°C';
            resultBodySmall.append(bodyCont);
            // Wind
            var bodyCont = document.createElement('p');
            bodyCont.textContent = 'Wind: ' + forecastData.list.wind.speed + ' MPH';
            resultBodySmall.append(bodyCont);
            // Humidity
            var bodyCont = document.createElement('p');
            bodyCont.textContent = 'Humidity: ' + forecastData.list.main.humidity + ' %';
            resultBodySmall.append(bodyCont);

            // }

            resultContentForecastEl.append(resultCardTwo);
        }

        // // Heading - 5-day forecast
        // var headingText = document.createElement('h6');
        // headingForecast.classList.add('card-forecast');
        // headingText.textContent = '5-Day Forecast:';
        // headingForecast.append(headingText);

        // // Result Card
        // var resultCardTwo = document.createElement('div');
        // resultCardTwo.classList.add('card-forecast');

        // var resultBodySmall = document.createElement('div');
        // resultBodySmall.classList.add('card-body-small');
        // resultCardTwo.append(resultBodySmall);

        // // Print results
        // // Date
        // var unixFormatTwo = document.createElement('h3');
        // unixFormatTwo.classList.add('date-text-two');
        // unixFormatTwo.textContent = '(' + moment.unix(forecastData.list[i].dt).format('L') + ')';
        // console.log(unixFormatTwo);
        // resultBodySmall.append(unixFormatTwo);

        // // Icon

        // // Temp

        // // Wind
        // // Humidity

    }
}
searchButton.addEventListener('click', formSubmitHandler);