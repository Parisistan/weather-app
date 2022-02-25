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