var latVar = ""; //latitude
var lonVar = ""; //longitude
const weatherContainer = $("#current-weather-ul"); //UL list for weather
const apiKey = "b5a40f59d7b1cf68e5036b045244a798"; //API key
var textBox = document.getElementById("#city-name"); //city name text box


// Geocoding conversion API

var submitBtn = $("#submit-btn");

submitBtn.click(geoCodeFunc);

function geoCodeFunc(){
    var cityText = $("#city-name").val();
    var qURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityText+"&limit=5&appid="+apiKey
    fetch(qURL)
    .then((response) => response.json())
    .then((data) => {
        console.log("geoFunc");
        console.log(data);
        console.log(data[0].lat);
        console.log(data[0].lon);
        const cityLat = data[0].lat;
        const cityLon = data[0].lon;
        oneCallWeather();
        return latVar = cityLat, lonVar = cityLon;
    });
}

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// city into query URL

        
function oneCallWeather(){

    console.log("oneCallWeather fired");

    const exclude = 'minutely,hourly,alerts';
    const units = 'metric';
    const oneCallURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latVar}&lon=${lonVar}&exclude=${exclude}&units=${units}&appid=${apiKey}`;
    
        fetch(oneCallURL)
        .then((response) => response.json())
        .then((data) => {
            console.log("oneCall Func");
            console.log(data);
    });}




var submitBtn = $("#submit-btn");

// submitBtn.click(getCurrentWeather);
submitBtn.click(printGlobalVar);
// submitBtn.click(searchHistory);
// submitBtn.click(populateHistory);
// submitBtn.click(oneCallWeather);
// submitBtn.click(getFiveDayForecast);

function printSearchName(){

}

function getCurrentWeather(){
    var cityName = $("#city-name").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey
    fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log(data.weather[0].description);
        console.log((data.main.temp).toFixed(2) + '°C');
        // const placeName = document.createElement("h3");
        // const dataDescription = document.createElement("li");
        // const mainTemp = document.createElement("li");
        // const mainFeelsLike = document.createElement("li");
        // const windSpeed = document.createElement("li");
        // const humidity = document.createElement("li");
        // weatherContainer.appendChild(placeName);
        // weatherContainer.appendChild(dataDescription);
        // weatherContainer.appendChild(mainTemp);
        // weatherContainer.appendChild(mainFeelsLike);
        // weatherContainer.appendChild(windSpeed);
        // weatherContainer.appendChild(humidity);
        // placeName.innerText = data.weather.main.name;
        // dataDescription.innerText = data.weather[0].description;
        // mainTemp.innerText = data.main.temp;
        // mainFeelsLike.innerText = data.main.feels_like;
        // windSpeed.innerText = main.wind.speed;
        // humidity.innerText = data.main.humidity;

        console.log(latVar);
    });
    
};


//five day forecast API

// function getFiveDayForecast(){

//     var qURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast/daily?lat="+latVar+"&lon="+lonVar+"&cnt=5&appid=18848cbedd7ada99a16a0c493d42f700"

//     fetch(qURLFiveDay)
//     .then((response) => response.json())
//     .then((data) => console.log(data));

// // get LAT LONG from first API call.
// // cnt = count of days. 5.
// }


function printGlobalVar(){
    if (latVar == null && lonVar == null) {
        console.log("latVar & lonVar is NULL")        
    } else {
        $("#test-container").text("latVar & lonVar has data")
    }
}



// SEARCH HISTORY FUNCTION (HISTORY PAGE)((LOCAL STORAGE))

// page loaded populate function

// var storageArray = JSON.parse(localStorage.getItem("value")) || []; //empty array to store search query


// function searchHistory() {  
//   historyList.innerHTML = "";
//   storageArray.push(textBox.value);
//   localStorage.setItem("value", JSON.stringify(storageArray));
// }

// // function to iterate and populate
// const historyList = $("search-history-ul")

// function populateHistory(){
//   historyList.innerHTML = "";
//   for (let i = 0; i < storageArray.length; i++) {
//     const element = storageArray[i];
//     const liEl = document.createElement("li");
//     liEl.textContent = element;
//     historyList.appendChild(liEl);
//   }
//   // event.preventDefault();
// };

// function clearLocalStorage() {
//   localStorage.clear();
//   storageArray = [];
//   while (historyList.hasChildNodes()) {
//     historyList.removeChild(historyList.firstChild);
//   }
// }

// var clearHistoryBtn = $("clear-search-btn");
// clearHistoryBtn.click(clearLocalStorage);
// end of search history functions



