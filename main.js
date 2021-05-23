import './style.css'

let input;
let searchResult = "San Antonio";
let searchNewLocation = document.querySelector("#location");
async function getWeather(){
  // searchNewLocation.innerHTML = searchResult;
  const weatherApiKey = "42b8df01e13a4b0791313017211905";
  const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${searchResult}&days=3&aqi=no&alerts=no`
  const data = await fetch(weatherApiUrl)
  if(data.ok){
    const {current, forecast, location} = await data.json()
    console.log( { current, forecast, location } );
    displayCurrentWeather(current);
    displayCurrentLocation(location);
    displayForecasts(forecast);
  }
}
getWeather();
function displayCurrentLocation(location){
  const currentCity = 
  document.querySelector("#location")
  currentCity.innerHTML = "";
  currentCity.insertAdjacentHTML("beforeend", location.name + ", " + location.region);
}
function displayCurrentWeather(current){
  const currentHtml = 
  `<p>Status: <span class="current_main--status">${current.condition.text}</span></p>
  <img src="${current.condition.icon}" alt="${current.condition.text}">
  <p>Current temp: <span class="current_main--temp">${current.temp_f}&deg; F</span></p>
  <p>Wind speed: <span class="current_main--wind">${current.wind_mph} mph ${current.wind_dir}</span></p>`
  const currentWeatherContainer = document.querySelector(".current_main")
  currentWeatherContainer.innerHTML = "";
  currentWeatherContainer.insertAdjacentHTML("beforeend", currentHtml);
}
function displayForecasts(forecast){
  const forecastHtml = forecast.forecastday.reduce((stringBuilder, forecast) => {
    return stringBuilder.concat(buildForecast(forecast));

  }, "");
  const forecastContainer = document.querySelector(".forecast_all")
  forecastContainer.innerHTML = "";
  forecastContainer.insertAdjacentHTML("beforeend", forecastHtml);
}
function buildForecast({date, day}){

  return `<div class="forecast_item">
    <p class="forecast_item--date">${date}</p>
    <p>Status: <span id="status">${day.condition.text}</span></p>
    <img src="${day.condition.icon}" alt="${day.condition.text}">
    <p>UV Index: <span class="uv">${day.uv}</span></p>
    <p>High temp: <span class="high">${day.maxtemp_f}&deg; F</span></p>
    <p>Low temp: <span class="low">${day.mintemp_f}&deg; F</span></p>
    <p>Chance of Rain: <span class="rainChance">${day.daily_chance_of_rain}&percnt;</span></p>
    <p>Wind speed: <span class="wind">${day.maxwind_mph} mph S</span></p>
  </div>`
}
function searchLocation(e){
  e.preventDefault();
  searchResult = document.getElementById("searchValue").value;
  getWeather();
}
document.querySelector(".search").addEventListener("click", searchLocation)