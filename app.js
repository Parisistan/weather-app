let currentTime = new Date();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let weekDays = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

if (minutes < 10) {
    minutes = `0${minutes}`;
}

if (hours < 10) {
    hours = `0${hours}`;
}

let nowTime = document.querySelector("#now");
nowTime.innerHTML = `${weekDays}, ${hours}:${minutes}`;

function formatted(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


}

function displayWeekly(response) {

    let forcastDays = response.data.daily;

    let weeklyElement = document.querySelector("#weekly");

    let weeklyLoop = `<div class = "row">`;


    forcastDays.forEach(function(forcastDay) {
        weeklyLoop = weeklyLoop + `
    
        <div class="col-2">
            <div class="week-day">
            ${formatted(forcastDay.dt)}
            </div>
                <img 
                src = "http://openweathermap.org/img/wn/${forcastDay.weather[0].icon}@2x.png"
                alt=""
                width="45px">
            <div class="week-day-temp">
            <span class="highest"> ${forcastDay.temp.max}º </span>
            <span class="lowest"> ${forcastDay.temp.min}º </span>
            </div>
        </div>`

    })

    weeklyLoop = weeklyLoop + `</div>`;
    weeklyElement.innerHTML = weeklyLoop;
}

function getWeekly(coordinates) {

    console.log(coordinates);

    let apiKey = "5f80099813d146f19a4a94f45520a87e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayWeekly);

}


function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
        response.data.main.temp
    );
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    console.log(response);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    getWeekly(response.data.coord);

}

function searchIt(event) {
    event.preventDefault();
    let apiKey = "5f80099813d146f19a4a94f45520a87e";
    let city = document.querySelector("#city-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}


let searchingCity = document.querySelector("#search-engine");
searchingCity.addEventListener("submit", searchIt);

function showFahren(event) {
    event.preventDefault();
    let toFahren = (x * 9 / 5) + 32;

}

let fahrenheitLink = document.querySelector("#fahren");
fahrenheitLink.addEventListener("click", showFahren);