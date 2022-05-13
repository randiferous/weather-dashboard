console.log("hello world");

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-name");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector("#current-weather");
var cityAndDateEl = document.querySelector("#city-and-date");

var cityStorage = [];
var today = moment().format("M/DD/YYYY");

// button functionality
var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        cityInputEl.value = "";
        saveCity(cityName);
    } else {
        alert("Please enter a city name");
    }
};

// Local Storage functions
var saveCity = function(cityName) {
    cityStorage.push(cityName);
    localStorage.setItem("city", JSON.stringify(cityStorage));

    displayCity(cityName);
    getCityInfo(cityName);
};

var loadCity = function() {
    var storedCity = localStorage.getItem("city");
    if (!storedCity) {
        return false;
    }
    cityStorage = JSON.parse(storedCity);

    for (var i = 0; i < cityStorage.length; i++) {
        var cityName = cityStorage[i];
        displayCity(cityName);
    }
};

// search history
var displayCity = function(cityName) {
    var cityListEl = document.createElement("button");
    cityListEl.classList = "list-group-item list-group-item-action";
    cityListEl.setAttribute("type", "button");
    cityListEl.textContent = cityName;
    searchHistoryEl.appendChild(cityListEl);

    cityListEl.addEventListener("click", eventHandler);
};

var eventHandler = function(event) {
    getCityInfo(event.target.textContent);
}

// api request
var getCityInfo = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=05bd4265f18fe414d9b3357776b08c4d"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data)
                displayWeather(data);
            });
        } else {
            alert("Error: City not found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to GitHub");
    });
};

// display weather
displayWeather = function(data) {
    var name = data.name;

    var icon = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    var iconImage = document.createElement("img");
    iconImage.setAttribute("src", iconUrl);
    currentWeatherEl.appendChild(iconImage);
    cityAndDateEl.innerHTML = name + " (" + today + ")";
}

searchFormEl.addEventListener("submit", formSubmitHandler);

loadCity();