var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-name");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector("#current-weather");
var cityAndDateEl = document.querySelector("#city-and-date");
var weatherIconEl = document.querySelector("#weather-icon");
var currentTempEl = document.querySelector("#current-temperature");
var currentHumidEl = document.querySelector("#current-humidity");
var currentWindEl = document.querySelector("#current-wind");
var UvIndexEl = document.querySelector("#current-uv-index");

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
var saveCity = function (cityName) {
    cityStorage.push(cityName);
    localStorage.setItem("city", JSON.stringify(cityStorage));

    displayCity(cityName);
    getCityInfo(cityName);
};

var loadCity = function () {
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
var displayCity = function (cityName) {
    var cityListEl = document.createElement("button");
    cityListEl.classList = "list-group-item list-group-item-action";
    cityListEl.setAttribute("type", "button");
    cityListEl.textContent = cityName;
    searchHistoryEl.appendChild(cityListEl);

    cityListEl.addEventListener("click", eventHandler);
};

var eventHandler = function (event) {
    getCityInfo(event.target.textContent);
}

// api request
var getCityInfo = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=05bd4265f18fe414d9b3357776b08c4d";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data);
            });
        } else {
            alert("Error: City not found");
        }
    })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });
};

// display weather
displayWeather = function (data) {
    var name = data.name;
    cityAndDateEl.textContent = name + " (" + today + ")";

    var icon = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    weatherIconEl.setAttribute("src", iconUrl);

    var temperature = data.main.temp;
    currentTempEl.textContent = "Temperature: " + temperature + " °F";

    var humidity = data.main.humidity;
    currentHumidEl.textContent = "Humidity: " + humidity + "%";

    var windSpeed = data.wind.speed;
    currentWindEl.textContent = "Wind Speed: " + windSpeed + " MPH";

    displayUvIndex(data);
}

// display UV index
displayUvIndex = function (data) {
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=05bd4265f18fe414d9b3357776b08c4d";

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            var UvIndex = data.current.uvi;
            UvIndexEl.textContent = "UV Index: " + UvIndex;

            if (UvIndex < 3) {
                UvIndexEl.className = "bg-success col-6 d-flex justify-content-end";
            } else if (UvIndex > 7) {
                UvIndexEl.className = "bg-danger col-6 d-flex justify-content-end";
            } else {
                UvIndexEl.className = "bg-warning col-6 d-flex justify-content-end";
            }
        });
    });
};


searchFormEl.addEventListener("submit", formSubmitHandler);

loadCity();