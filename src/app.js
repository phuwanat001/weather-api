const appKey = "18f064cfd6b112e5dff8179aeedf7a53";

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const cityName = document.querySelector("#city-name");
const icon = document.querySelector("#icon");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");

searchBtn.addEventListener("click", findWeather);
searchInput.addEventListener("keyup", enterPreass);

function enterPreass(eventKey) {
    if (eventKey.key === "Enter") {
        findWeather();
    }
}

function findWeather() {
    const city = searchInput.value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}`;
    
    fetchWeatherData(url, (response) => {
        const jsonObject = JSON.parse(response);
        if (jsonObject.cod !== 200) {
            alert("City not found");
            return;
        }
        displayWeatherData(jsonObject);
    });
}

function fetchWeatherData(url, callback) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            callback(httpRequest.responseText);
        }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function displayWeatherData(jsonObject) {
    cityName.innerHTML = jsonObject.name;
    icon.src = "http://openweathermap.org/img/wn/" + jsonObject.weather[0].icon + ".png";
    temp.innerHTML = Math.round(jsonObject.main.temp - 273.15) + "°C";
    humidity.innerHTML = jsonObject.main.humidity + "%";
}
