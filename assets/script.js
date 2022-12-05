var APIKey = "f7c9249a4ca819afd8dd2f34c5b9766e";
var searchForm = document.querySelector('#search-box');
var cityList = document.querySelector("#city");
var currentDisplay = document.querySelector("#current-weather");
var dayOneDisplay = document.querySelector ("#day-one");
var dayTwoDisplay = document.querySelector ("#day-two");
var dayThreeDisplay = document.querySelector ("#day-three");
var dayFourDisplay = document.querySelector ("#day-four");
var dayFiveDisplay = document.querySelector ("#day-five");
var userCity = " ";

function formSubmit(event) {
    event.preventDefault();
    console.log(event.target);

  //gets the city the user typed
  userCity = document.querySelector('#user-input').value;
  console.log(userCity);
  if(!userCity) {
    console.log("missing city");
    return;
  }
//sets local storage to the city the user typed//
localStorage.setItem("city", userCity)
var storedCities = [];


//displays the weather data for the the city the user typed
findCity(userCity);

//adds the city to the list on the page//
console.log(typeof userCity);
console.log(typeof localStorage.getItem("city"));
var typedCity = document.createElement("li");
typedCity.textContent = userCity;
cityList.append(typedCity);
console.log(typedCity)
typedCity.addEventListener("click", function() {
console.log(this.textContent);
findCity(userCity);
})



}

function findCity (userCity){
  //clears existing data from the page//

//using only city for now, no state or country options//
var queryURLGeocode = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&limit=" + 1 + "&appid=" + APIKey;
console.log(queryURLGeocode);

//makes an API call for coordinates of the user's city input
fetch(queryURLGeocode) 
.then(response => response.json())
.then(json => {
     var lat = json[0].lat; 
     var lon = json[0].lon;
     console.log(lat);
     console.log(lon);
//uses those coordinates to get the five day forecast for that city
     var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon + "&cnt=50&appid=" + APIKey + "&units=imperial";
     console.log(queryURL);
     return fetch(queryURL);
})
.then (function (response) {
return response.json();
})
//grabs five days from the array
.then(function (data) {
  console.log(data.list);
  var one = data.list[8];
  var two = data.list[16];
  var three = data.list[24];
  var  four = data.list[32];
  var five = data.list[39];
  fiveDayArray = [one, two, three, four, five];

  //each day is a UL element showing the date
  var dayOne = document.createElement("ul");
  var dayTwo = document.createElement("ul");
  var dayThree = document.createElement("ul");
  var dayFour = document.createElement("ul");
  var dayFive = document.createElement("ul");
  //this is the date 
  dayOne.textContent = one.dt_txt.substring(5,10); 
  dayTwo.textContent = two.dt_txt.substring(5,10);
  dayThree.textContent = three.dt_txt.substring(5,10);
  dayFour.textContent = four.dt_txt.substring(5,10);
  dayFive.textContent = five.dt_txt.substring(5,10);
  //appends the UL items with the date to the page  
  dayOneDisplay.append(dayOne);
  dayTwoDisplay.append(dayTwo);
  dayThreeDisplay.append(dayThree)
  dayFourDisplay.append(dayFour);
  dayFiveDisplay.append(dayFive);
  //appends the details for the day to the page
  var icon = one.weather[0];
  console.log(icon.icon);
  var dayOneTemp = document.createElement("li");
  dayOneTemp.textContent = "temp =" + one.main.temp; 
  var dayOneWind = document.createElement("li");
  dayOneWind.textContent = "wind=" + one.wind.speed;
  var dayOneHumidity = document.createElement("li");
  dayOneHumidity.textContent="humidity=" + one.main.humidity;
  dayOneDisplay.append(dayOneTemp, dayOneWind, dayOneHumidity);
  var dayTwoTemp = document.createElement("li");
  dayTwoTemp.textContent = "temp =" + two.main.temp; 
  var dayTwoWind = document.createElement("li");
  dayTwoWind.textContent = "wind=" + two.wind.speed;
  var dayTwoHumidity = document.createElement("li");
  dayTwoHumidity.textContent="humidity=" + two.main.humidity;
  dayTwoDisplay.append(dayTwoTemp, dayTwoWind, dayTwoHumidity);
  var dayThreeTemp = document.createElement("li");
  dayThreeTemp.textContent = "temp =" + three.main.temp; 
  var dayThreeWind = document.createElement("li");
  dayThreeWind.textContent = "wind=" + three.wind.speed;
  var dayThreeHumidity = document.createElement("li");
  dayThreeHumidity.textContent="humidity=" + three.main.humidity;
  dayThreeDisplay.append(dayThreeTemp, dayThreeWind, dayThreeHumidity);

  //gets the current forecast for the user's submitted city
  lat = data.city.coord.lat;
  lon = data.city.coord.lon;
  var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
  return fetch(queryURLcurrent);
})
.then (function(response){
  return response.json();
})
.then(function(data) {
  console.log(data);
  var current = data.main.temp;
  console.log(current);
  var currentDayDisplay = document.createElement("ul");
  currentDayDisplay.textContent = Date().substring(0,10);
  var currentTemp = document.createElement("li");
  currentTemp.textContent = "temp =" + data.main.temp;
  var currentWind = document.createElement("li");
  currentWind.textContent = "wind =" + data.wind.speed;
  var currentHumidity = document.createElement("li");
  currentHumidity.textContent = "humidity =" + data.main.humidity;
  currentDisplay.append(currentDayDisplay, currentTemp,currentWind,currentHumidity);


})
  }


searchForm.addEventListener('submit', formSubmit);
