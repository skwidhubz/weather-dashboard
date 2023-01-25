var latVar = ""; //latitude
var lonVar = ""; //longitude
const apiKey = "b5a40f59d7b1cf68e5036b045244a798"; //API key
const weatherContainer = $("#current-weather-ul"); //UL list for weather
var textBox = document.getElementById("#city-name"); //city name text box
const fiveDayContainer = $("#five-day-ul"); //UL for five day
const fiveDayHeader = $("#five-day-header"); // five day h3 header
var historyEl = document.getElementById("search-history-ul"); // search history UL
var buttonListEl = document.createElement("li"); // history list button
const clearHistoryBtn = $("#clear-search-btn"); // clear history button
var placeNameGlobal = ""; //empty string variable for place name from search

// Geocoding conversion API

var submitBtn = $("#submit-btn");

submitBtn.click (function (){
  var cityText = $("#city-name").val();
  geoCodeFunc(cityText)});

function geoCodeFunc(cityText){
    var qURL = "https://api.openweathermap.org/geo/1.0/direct?q="+cityText+"&limit=5&appid="+apiKey
    fetch(qURL)
    .then((response) => response.json())
    .then((data) => {
        const cityLat = data[0].lat;
        const cityLon = data[0].lon;
        latVar = cityLat;
        lonVar = cityLon;
        placeNameGlobal = data[0].name;
        buttonListEl.dataset.nameData = placeNameGlobal;
        oneCallWeather(latVar, lonVar);
        const placeName = document.createElement("h3");
        weatherContainer.append(placeName);
        placeName.innerText = data[0].name + " (" + dayjs().format('DD/MM/YYYY') + ") ";      
        searchHistory()
    });
}

// MAIN WEATHER FUNC
function oneCallWeather(){

    const exclude = 'minutely,hourly,alerts';
    const units = 'metric';
    const oneCallURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latVar}&lon=${lonVar}&exclude=${exclude}&units=${units}&appid=${apiKey}`;
    
        fetch(oneCallURL)
        .then((response) => response.json())
        .then((data) => {
            // current weather container populate list
            const currentIcon = document.createElement("img")
            const dataDescription = document.createElement("li");
            const mainTemp = document.createElement("li");
            const mainFeelsLike = document.createElement("li");
            const windSpeed = document.createElement("li");
            const humidity = document.createElement("li");
            weatherContainer.append(currentIcon);
            weatherContainer.append(dataDescription);
            weatherContainer.append(mainTemp);
            weatherContainer.append(mainFeelsLike);
            weatherContainer.append(windSpeed);
            weatherContainer.append(humidity);
            currentIcon.setAttribute("src", `http://openweathermap.org/img/wn/${
                data.current.weather[0].icon
              }@2x.png`);
            dataDescription.innerText = "Weather: " + data.current.weather[0].description;
            mainTemp.innerText = "Current temp: " + data.current.temp + "°C";
            mainFeelsLike.innerText = "Feels like: " + data.current.feels_like + "°C";
            windSpeed.innerText = "Wind speed: " + data.current.wind_speed + " Knots";
            humidity.innerText = "Humidity: " + data.current.humidity + "%";
 
            // five day weather loop
            let currentDate = dayjs();
            fiveDayHeader.attr("style", "display: flex");

            for (let i = 1; i < 6; i++) { // starting at 1 to correct 5day start date

              const fiveCardEl = $('<div></div>').addClass("five-cards");
              fiveDayContainer.append(fiveCardEl);

              const currentIcon = document.createElement("img")
              let date = document.createElement("li");
              let temp = document.createElement("li");
              let wind = document.createElement("li");
              let humid = document.createElement("li");
              fiveCardEl.append(date);
              fiveCardEl.append(currentIcon)
              fiveCardEl.append(temp);
              fiveCardEl.append(wind);
              fiveCardEl.append(humid);
              date.innerText = currentDate.add(i, "days").format('dddd');
              currentIcon.setAttribute("src", `http://openweathermap.org/img/wn/${
                  data.daily[i].weather[0].icon
                }@2x.png`);
              temp.innerText = "Temp: " + data.daily[i].temp.day + "°C";
              wind.innerText = "Wind: " + data.daily[i].wind_speed;
              humid.innerText = "Humidity: " + data.daily[i].humidity + "%"; 
            }

            populateHistory();
    });}

var submitBtn = $("#submit-btn");

submitBtn.click(clearDataFunc);

// clear containers function
function clearDataFunc(){
        weatherContainer.empty();
        fiveDayContainer.empty();
}

// SEARCH HISTORY FUNCTION ((LOCAL STORAGE))

var storageArray = JSON.parse(localStorage.getItem('valueKey')) || []; //empty array to store search query

function searchHistory() {  
  storageArray.push(placeNameGlobal);
  localStorage.setItem('valueKey', JSON.stringify(storageArray));
}

// Iterate over storage data and populate list

function populateHistory(){
    historyEl.innerHTML = "";
  for (let i = 0; i < storageArray.length; i++) {
    const element = storageArray[i];
    var buttonListEl = document.createElement("button"); // History list button
    buttonListEl.setAttribute("class", "list-button");
    buttonListEl.textContent = element;
    historyEl.append(buttonListEl); 
  }
};

    document.querySelectorAll('.list-button').forEach(function(button){
        button.addEventListener('click', event => {
            cityText = event.target.dataset.nameData;
            geoCodeFunc(cityText)
        })
    });

populateHistory();

clearHistoryBtn.click(clearHistoryAndStorage);

function clearHistoryAndStorage(){
    storageArray = [];
    historyEl.innerHTML = "";
    localStorage.clear();
}

document.querySelectorAll('.list-button').forEach(function (button){
    button.addEventListener("click", checkButton);
})

function checkButton(){
  var newPlaceName = this.innerText;
  geoCodeFunc(newPlaceName);

}


