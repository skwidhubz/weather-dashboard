// fetching API weather data
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// APIKEY: b5a40f59d7b1cf68e5036b045244a798
// getGeo: 
// GeolocationCoordinates

// var geoLocLat = GeolocationCoordinates.latitude
// var geoLocLon = GeolocationCoordinates.longitude
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&appid=b5a40f59d7b1cf68e5036b045244a798"

var testBtn = document.getElementById("btn");

testBtn.addEventListener("click", getLatLong);

function consoleFunc(){
    console.log("test");
};

function getLatLong(){
    console.log("button works");
    navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat);
    console.log(long);
});
}

// function getCurrentWeather(){
//     fetch(queryURL)
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }

// getCurrentWeather()

