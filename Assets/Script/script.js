var resultContentEl = document.querySelector('#result-content');
var resultContentForecastEl = document.querySelector("#result-content-forecast");
var searchFormEl = document.getElementById("#search-form");
var searchButton = document.querySelector("#search-input-button");
var searchInputEl = document.querySelector("#search-input-area");
var searchItemEl = document.querySelector("#past-searches-container");
var APIKEY = '510c27e4545e6077957004db2b092e1f';
var latitude = "";
var longitude = "";
var resultBody = document.createElement('div');

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

// GET CITY DAY WEATHER
function getWeatherFromCity(citySearched) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var queryUrl = requestUrl + citySearched + '&appid=' + APIKEY + '&units=metric';

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            // console.log(data);
            getFiveForecast(data.coord.lat, data.coord.lon);
            printResults(data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

// GET UV INDEX
function getUvIndex(latitude, longitude) {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/uvi?';
    var queryUrlTwo = requestUrl + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKEY;

    console.log(queryUrlTwo)

    fetch(queryUrlTwo)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            // icon(data)
            printResultsUv(data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

// GET ICON
function getIcon(iconCode) {
    console.log(iconCode)

    var requestUrl = 'https://openweathermap.org/img/wn/';
    var queryUrlFour = requestUrl + iconCode + '@2x.png';
    console.log(queryUrlFour)

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


// GET FIVE DAY FORECAST
function getFiveForecast(latitude, longitude) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
    var queryUrlThree = requestUrl + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKEY + '&units=metric';

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
}

// PRINT Daily City Weather
function printResults(resultObj) {
    var iconCode = resultObj.weather[0].icon;
    console.log(iconCode)
    console.log(resultObj);

    resultContentEl.textContent = ""

    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'col-8');

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
    // console.log(unixFormat);
    resultBody.append(unixFormat);

    // Icon
    printIcon()
    // var iconContent = document.createElement('h4');
    // iconContent.textContent = '   ' + iconCode;
    // resultBody.append(iconContent);

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
}

// PRINT Icon
function printIcon(iconCode) {
    var iconContent = document.createElement('h4');
    iconContent.textContent = iconCode;
    resultBody.append(iconContent);

}

// PRINT UV Index
function printResultsUv(data) {
    console.log(data)

    // UV Index
    var bodyContentFourEl = document.createElement('p');
    bodyContentFourEl.innerHTML =
        'UV Index:  ' + data.value + '<br/>';
    resultBody.append(bodyContentFourEl);
}

// PRINT Five Day Forecast
function fiveDayForecastData(forecastData) {
    // 5 Day Title
    // var titleBody = document.createElement('div');
    var titleFive = document.createElement('h3');
    // titleFive.classList.add('title-text');
    titleFive.textContent = '5-Day Forecast:';

    titleFive.append;

    for (var i = 0; i < forecastData.list.length; i += 1) {
        var str = forecastData.list[i].dt_txt;
        var n = str.includes("15:00:00");

        console.log(forecastData.list[i])

        if (n === true) {
            console.log(forecastData.list[i].dt_txt)
            // Print data
            resultContentForecastEl.textContent = ""

            // Result Card
            var resultCardTwo = document.createElement('div');
            // resultCardTwo.classList.add('card-forecast', 'col-8');

            // Result Body
            var resultDiv = document.createElement('div');
            resultDiv.classList.add('result-boxes');
            // resultDiv.classList.add('cardbodytwo');
            resultCardTwo.append(resultDiv);

            // Date
            console.log(forecastData.list[i].dt)
            console.log(moment.unix(forecastData.list[i].dt).format('L'))
            var date = document.createElement('p');
            date.classList.add('date-txt', 'font-white');
            date.textContent = moment.unix(forecastData.list[i].dt).format('L');
            resultDiv.append(date);

            // Icon
            console.log('ICON: ' + forecastData.list[i].weather[0].icon)
            // let weatherIcon = forecastData.list[i].weather[0].icon;
            // cityIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            // cityIconEl.setAttribute("alt", forecastData.list[i].weather[0].description);
            // weatherIcon = document.createElement('h5');
            // resultDiv.append(weatherIcon);

            // Temperature
            console.log('TEMP: ' + forecastData.list[i].main.temp)
            var temperature = document.createElement('p');
            temperature.classList.add('font-white');
            temperature.textContent = 'Temp: ' + forecastData.list[i].main.temp + '°C';
            resultDiv.append(temperature);

            // Wind
            console.log('WIND: ' + forecastData.list[i].wind.speed)
            var windResult = document.createElement('p');
            windResult.classList.add('font-white');
            windResult.textContent = 'Wind: ' + forecastData.list[i].wind.speed + ' MPH';
            resultDiv.append(windResult);

            // Humidity
            console.log('HUMIDITY: ' + forecastData.list[i].main.humidity)
            var humid = document.createElement('p');
            humid.classList.add('font-white');
            humid.textContent = 'Humidity: ' + forecastData.list[i].main.humidity + ' %';
            resultDiv.append(humid);

            resultContentForecastEl.append(resultCardTwo);
        }
    }
}

searchButton.addEventListener('click', formSubmitHandler);