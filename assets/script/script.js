var latVar = ""; //latitude
var lonVar = ""; //longitude
const weatherContainer = $("#current-weather-ul"); //UL list for weather
const apiKey = "b5a40f59d7b1cf68e5036b045244a798"; //API key
var textBox = document.getElementById("#city-name"); //city name text box
const fiveDayContainer = $("#five-day-ul"); //UL for five day
var historyEl = $("#search-history-ul") // search history UL
const clearHistoryBtn = $("#clear-search-btn"); // clear history button
var placeNameGlobal = "";

// Geocoding conversion API

var submitBtn = $("#submit-btn");

submitBtn.click(geoCodeFunc);

function geoCodeFunc(){
    var cityText = $("#city-name").val();
    var qURL = "https://api.openweathermap.org/geo/1.0/direct?q="+cityText+"&limit=5&appid="+apiKey
    fetch(qURL)
    .then((response) => response.json())
    .then((data) => {
        console.log("geoFunc");
        console.log(data);
        console.log(data[0].lat);
        console.log(data[0].lon);
        const cityLat = data[0].lat;
        const cityLon = data[0].lon;
        // oneCallWeather();
        latVar = cityLat;
        lonVar = cityLon;
        oneCallWeather(latVar, lonVar);
        const placeName = document.createElement("h3");
        weatherContainer.append(placeName);
        placeName.innerText = data[0].name + " (" + dayjs().format('DD/MM/YYYY') + ") ";
        // create button with name and latLong data
        let buttonListEl = document.createElement("button");
        buttonListEl.setAttribute("class", "list-button");
        buttonListEl.dataset.city = data[0].name;
        buttonListEl.dataset.long = lonVar;
        buttonListEl.dataset.lat = latVar; 
        // add button to history UL
        historyEl.append(buttonListEl);
        buttonListEl.innerText = data[0].name;
        placeNameGlobal = data[0].name;
        searchHistory()
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
            humidity.innerText = "Humidity: " + data.current.humidity + " g.m-3";

            // five day forecast list cards
            // let dateBase = dayjs().format('DD/MM/YYYY');
            let currentDate = dayjs.unix(data.current.dt).format('DD/MM/YYYY');
            

            const fiveCardEl1 = $('<div></div>').addClass("five-cards");
            fiveDayContainer.append(fiveCardEl1);
            const currentIcon1 = document.createElement("img")
            let date1 = document.createElement("li");
            let temp1 = document.createElement("li");
            let wind1 = document.createElement("li");
            let humid1 = document.createElement("li");
            fiveCardEl1.append(date1);
            fiveCardEl1.append(currentIcon1)
            fiveCardEl1.append(temp1);
            fiveCardEl1.append(wind1);
            fiveCardEl1.append(humid1);
            date1.innerText = currentDate+1;
            currentIcon1.setAttribute("src", `http://openweathermap.org/img/wn/${
                data.daily[0].weather[0].icon
              }@2x.png`);
            temp1.innerText = "Temp: " + data.daily[0].temp.day + "°C";
            wind1.innerText = "Wind: " + data.daily[0].wind_speed;
            humid1.innerText = "Humidity: " + data.daily[0].humidity + " g.m-3"

            const fiveCardEl2 = $('<div></div>').addClass("five-cards");
            fiveDayContainer.append(fiveCardEl2);
            const currentIcon2 = document.createElement("img")
            let date2 = document.createElement("li");
            let temp2 = document.createElement("li");
            let wind2 = document.createElement("li");
            let humid2 = document.createElement("li");
            fiveCardEl2.append(date2);
            fiveCardEl2.append(currentIcon2)
            fiveCardEl2.append(temp2);
            fiveCardEl2.append(wind2);
            fiveCardEl2.append(humid2);
            date2.innerText = currentDate+2;
            currentIcon2.setAttribute("src", `http://openweathermap.org/img/wn/${
                data.daily[1].weather[0].icon
              }@2x.png`);
            temp2.innerText = "Temp: " + data.daily[1].temp.day + "°C";
            wind2.innerText = "Wind: " + data.daily[1].wind_speed;
            humid2.innerText = "Humidity: " + data.daily[1].humidity + " g.m-3"

            const fiveCardEl3 = $('<div></div>').addClass("five-cards");
            fiveDayContainer.append(fiveCardEl3);
            const currentIcon3 = document.createElement("img")
            let date3 = document.createElement("li");
            let temp3 = document.createElement("li");
            let wind3 = document.createElement("li");
            let humid3 = document.createElement("li");
            fiveCardEl3.append(date3);
            fiveCardEl3.append(currentIcon3)
            fiveCardEl3.append(temp3);
            fiveCardEl3.append(wind3);
            fiveCardEl3.append(humid3);
            date3.innerText = currentDate+3;
            currentIcon3.setAttribute("src", `http://openweathermap.org/img/wn/${
                data.daily[2].weather[0].icon
              }@2x.png`);
            temp3.innerText = "Temp: " + data.daily[2].temp.day + "°C";
            wind3.innerText = "Wind: " + data.daily[2].wind_speed;
            humid3.innerText = "Humidity: " + data.daily[2].humidity + " g.m-3"

            const fiveCardEl4 = $('<div></div>').addClass("five-cards");
            fiveDayContainer.append(fiveCardEl4);
            const currentIcon4 = document.createElement("img")
            let date4 = document.createElement("li");
            let temp4 = document.createElement("li");
            let wind4 = document.createElement("li");
            let humid4 = document.createElement("li");
            fiveCardEl4.append(date4);
            fiveCardEl4.append(currentIcon4)
            fiveCardEl4.append(temp4);
            fiveCardEl4.append(wind4);
            fiveCardEl4.append(humid4);
            date4.innerText = currentDate+4;
            currentIcon4.setAttribute("src", `http://openweathermap.org/img/wn/${
                data.daily[3].weather[0].icon
              }@2x.png`);
            temp4.innerText = "Temp: " + data.daily[3].temp.day + "°C";
            wind4.innerText = "Wind: " + data.daily[3].wind_speed;
            humid4.innerText = "Humidity: " + data.daily[3].humidity + " g.m-3"

            const fiveCardEl5 = $('<div></div>').addClass("five-cards");
            fiveDayContainer.append(fiveCardEl5);
            const currentIcon5 = document.createElement("img")
            let date5 = document.createElement("li");
            let temp5 = document.createElement("li");
            let wind5 = document.createElement("li");
            let humid5 = document.createElement("li");
            fiveCardEl5.append(date5);
            fiveCardEl5.append(currentIcon5)
            fiveCardEl5.append(temp5);
            fiveCardEl5.append(wind5);
            fiveCardEl5.append(humid5);
            date5.innerText = currentDate+5;
            currentIcon5.setAttribute("src", `http://openweathermap.org/img/wn/${
                data.daily[4].weather[0].icon
              }@2x.png`);
            temp5.innerText = "Temp: " + data.daily[4].temp.day + "°C";
            wind5.innerText = "Wind: " + data.daily[4].wind_speed;
            humid5.innerText = "Humidity: " + data.daily[4].humidity + " g.m-3"

    });}

var submitBtn = $("#submit-btn");

// submitBtn.click(getCurrentWeather);
submitBtn.click(printGlobalVar);
submitBtn.click(clearDataFunc);

// clear containers function
function clearDataFunc(){
    console.log("clearfunc fired")
        // current weather clear list
        weatherContainer.empty();
        // clear 5 day list
        fiveDayContainer.empty();
}


function printGlobalVar(){
    if (latVar == null && lonVar == null) {
        console.log("latVar & lonVar is NULL")        
    } else {
        $("#test-container").text("latVar & lonVar has data")
    }
}


// SEARCH HISTORY FUNCTION (HISTORY PAGE)((LOCAL STORAGE))

// page loaded populate function

var storageArray = JSON.parse(localStorage.getItem("value")) || []; //empty array to store search query


function searchHistory() {  
  historyEl.innerHTML = "";
  storageArray.push(placeNameGlobal);
  localStorage.setItem("value", JSON.stringify(storageArray));
}

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

function clearLocalStorage() {
  localStorage.clear();
  storageArray = [];
  while (historyEl.hasChildNodes()) {
    historyEl.removeChild(historyEl.firstChild);
  }
}


clearHistoryBtn.click(clearHistoryAndStorage);

function clearHistoryAndStorage(){
    console.log("clear history button");
    historyEl.empty();
    localStorage.clear();
}






