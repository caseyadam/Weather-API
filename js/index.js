// Diplay weather data function
function displayWeather(weatherData) {
  // Use the data to create variables
  var temp = weatherData.main.temp;
  var description = weatherData.weather[0].description;
  var iconId = weatherData.weather[0].icon;
  // Show the variables
  var locationTemp = document.getElementById('temp');
    locationTemp.innerHTML = `${Math.round(temp)} C`;
  var localCondition = document.getElementById('condition');
    localCondition.innerHTML = description;
  var icon = document.getElementById('icon');
    icon.innerHTML = `<img src='http://openweathermap.org/img/w/${iconId}.png'>`;
}

// API data request function from Open Weather Map
function getMyWeather(town, country) {
  // API URL deconstruction
  var apiAddress = 'http://api.openweathermap.org/data/2.5/weather?q=';
  var units = '&units=metric';
  var apiKey = '&APPID=e6f0e501eac984d729257bb029cca332';
  var endpoint = apiAddress + town + country + units + apiKey;
// Server call
  fetch(endpoint)
  .then(blob => blob.json())
  .then(data => displayWeather(data));
}

// initialise window & get location & call openweathermap api
window.onload = () => {
  var url = 'http://ipinfo.io/json';
  fetch(url)
  .then(blob => blob.json())
  .then((data) => {
    var town = data.city;
    var country = data.country;
    var userLocation = document.getElementById('location');
    userLocation.innerHTML = `${town}, ${country}`;
    getMyWeather(town, country);
  });
};

// Centigrade/Fahrenheit conversion
let unit = 'C'; //API pulls Kelvin
function toCentigrade(degFahren) {
  var degCent = (5 / 9) * (degFahren - 32);
  return Math.round(degCent);
}

function toFahrenheit(degCent) {
  var degFahren = ((9 / 5) * degCent) + 32;
  return Math.round(degFahren);
}

function toggleTemp() {
  var tempConvert = document.getElementById('temp');
  if (unit === 'C') {
    var valueC = parseInt(tempConvert.innerHTML, 10);
    tempConvert.innerHTML = `${toFahrenheit(valueC)}&deg;F`;
    unit = 'F';
  } else {
    var valueF = parseInt(tempConvert.innerHTML, 10);
    tempConvert.innerHTML = `${toCentigrade(valueF)}&deg;C`;
    unit = 'C';
  }
}

var tempButton = document.getElementById('toggleUnit');
tempButton.addEventListener('click', toggleTemp);

// Show the date
var d = new Date();
document.getElementById('dateNow').innerHTML = d.toDateString();