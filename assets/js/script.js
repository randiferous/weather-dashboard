console.log("hello world");

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-name");

var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        console.log(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};

searchFormEl.addEventListener("submit", formSubmitHandler);