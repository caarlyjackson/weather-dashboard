var resultContentEl = document.querySelector('#result-content');
var resultContentForecastEl = document.querySelector("#result-content-forecast");
var searchFormEl = document.getElementById("#search-form");
var searchButton = document.querySelector("#search-input-button");
var searchInputEl = document.querySelector("#search-input-area");
var searchItemEl = document.querySelector("#past-searches-container");
var APIKEY = '3a7dfeed2d095f20c1922bf85894f83b';
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

// // GET ICON
// function getIcon(iconCode) {
//     console.log(iconCode)

//     var requestUrl = 'https://openweathermap.org/img/wn/';
//     var queryUrlFour = requestUrl + iconCode + '@2x.png';
//     console.log(queryUrlFour)

//     fetch(queryUrlFour)
//         .then(function (response) {
//             return response.json();

//         }).then(function (data) {
//             console.log(data);

//             printIcon(data);
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// }


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
    // var items = [titleEl.textContent, unixFormat.textContent, img, bodyContentOneEl.textContent, bodyContentTwoEl, bodyContentThreeEl]
    var iconCode = resultObj.weather[0].icon;
    console.log(iconCode)
    console.log(resultObj);

    resultContentEl.textContent = ""

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

    // // Icon
    // printIcon()
    // var iconContent = document.createElement('h4');
    // iconContent.textContent = '   ' + iconCode;
    // resultBody.append(iconContent);

    var img = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + iconCode + "@2x.png").attr("class", "icon-large");
    resultBody.append(img);
    console.log(resultObj.weather[0].icon)

    // Temperature
    var bodyContentOneEl = document.createElement('p');
    bodyContentOneEl.classList.add('p-temp');
    bodyContentOneEl.innerHTML =
        'Temp:  ' + resultObj.main.temp + '°C' + '<br/>';
    resultBody.append(bodyContentOneEl);
    // Wind
    var bodyContentTwoEl = document.createElement('p');
    bodyContentOneEl.classList.add('p-wind');
    bodyContentTwoEl.innerHTML =
        'Wind:  ' + resultObj.wind.speed + ' MPH' + '<br/>';
    resultBody.append(bodyContentTwoEl);
    // Humidity
    var bodyContentThreeEl = document.createElement('p');
    bodyContentOneEl.classList.add('p-humid');
    bodyContentThreeEl.innerHTML =
        'Humidity:  ' + resultObj.main.humidity + '%' + '<br/>';
    resultBody.append(bodyContentThreeEl);

    resultContentEl.append(resultCard);
    // localStorage.setItem("City", titleEl.textContent);
    // localStorage.setItem("Date", unixFormat.textContent);
    // localStorage.setItem("Temp", bodyContentOneEl.textContent);
    // localStorage.setItem("Wind", bodyContentTwoEl.textContent);

    // localStorage.setItem("City", items.textContent);

    // document.getElementById("result").innerHTML = localStorage.getItem("eName");

    var CityInfo = {
        city: titleEl.textContent.trim(),
        date: unixFormat.textContent,
        icon: img.value,
        temperature: bodyContentOneEl.textContent,
        wind: bodyContentTwoEl.textContent,
        humidity: bodyContentThreeEl.textContent,
    };

    localStorage.setItem("City", JSON.stringify(CityInfo));
    renderLastCity();
}

function renderLastCity() {
    // Use JSON.parse() to convert text to JavaScript object
    var lastCity = JSON.parse(localStorage.getItem("City"));
    // Check if data is returned, if not exit out of the function
    if (lastCity !== null) {
        document.getElementsByClassName("title-text").innerHTML = lastCity.city;
        document.getElementsByClassName("date-text").innerHTML = lastCity.date;
        document.getElementsByClassName("icon-large").innerHTML = lastCity.icon;
        document.getElementsByClassName("p-temp").innerHTML = lastCity.temperature;
        document.getElementsByClassName("p-wind").innerHTML = lastCity.wind;
        document.getElementsByClassName("p-humid").innerHTML = lastCity.humidity;
    } else {
        return;
    }
}

searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    renderLastCity();
});

// // PRINT Icon
// function printIcon(iconCode) {
//     var iconContent = document.createElement('h4');
//     iconContent.textContent = iconCode;
//     resultBody.append(iconContent);

// }

// PRINT UV Index
function printResultsUv(data) {
    console.log(data)

    console.log(data.value)
    // UV Index
    var bodyContentFourEl = document.createElement('p');
    bodyContentFourEl.innerHTML =
        'UV Index:  ' + data.value + '<br/>';
    resultBody.append(bodyContentFourEl);
}

// PRINT Five Day Forecast
function fiveDayForecastData(forecastData) {

    var cardHeading = $("<div>");
    var heading = $("<h3>").text("5-Day Forecast:").attr("class", "title-text-forecast");
    cardHeading.append(heading);
    $("#results-heading").append(cardHeading);

    var filteredForecast = forecastData.list.filter(function (day) {
        return day.dt_txt.indexOf("15:00:00") !== -1
    });

    for (var i = 0; i < filteredForecast.length; i += 1) {
        console.log(filteredForecast[i].weather[0].icon, filteredForecast[i].main.temp, filteredForecast[i].main.humidity);
        console.log(filteredForecast[i].wind.speed);
        var card = $("<div>").attr("class", "card-forecast-small");
        var date = $("<p>").text(moment.unix(filteredForecast[i].dt).format('L')).attr("class", "small-date");
        var img = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + filteredForecast[i].weather[0].icon + "@2x.png");
        var p1 = $("<p>").text("Temperature: " + filteredForecast[i].main.temp + '°C');
        var p2 = $("<p>").text("Wind: " + filteredForecast[i].wind.speed + ' MPH');
        var p3 = $("<p>").text("Humidity: " + filteredForecast[i].main.humidity + '%');
        card.append(date, img, p1, p2, p3);
        $("#result-content-forecast").append(card);
    }
    card.textContent = ""
}

searchButton.addEventListener('click', formSubmitHandler);
