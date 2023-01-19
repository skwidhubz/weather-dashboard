// function getLatLong(){
//     console.log("button works");
//     navigator.geolocation.getCurrentPosition((position) => {
//     const lat = position.coords.latitude;
//     const long = position.coords.longitude;
//     console.log(lat);
//     console.log(long);
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&appid=b5a40f59d7b1cf68e5036b045244a798"
//     return queryURL
// });
// }

// getLatLong();


var submitBtn = $("#submit-btn");

submitBtn.click(getCurrentWeather);

var cityName = $("#city-name")
var cityNameURL = cityName.value
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityNameURL+"&appid=b5a40f59d7b1cf68e5036b045244a798"

function getCurrentWeather(){
    fetch(queryURL)
    .then((response) => response.json())
    .then((data) => console.log(data));
  
}
