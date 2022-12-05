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
var storedCities = [];

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

//displays the weather data for the the city the user typed
findCity(userCity);

//checks for duplicate cities (doesn't work)
// if (localStorage.getItem("city-list").includes(userCity)) {
//   return;
// }

//adds the city to the list on the page//

var typedCity = document.createElement("li");
typedCity.textContent = userCity;
cityList.append(typedCity);
storedCities.push(userCity);
localStorage.setItem("city-list", storedCities);
console.log(storedCities);
console.log(localStorage.getItem("city-list"));
console.log(typedCity)
typedCity.addEventListener("click", function() {
console.log(this.textContent);
findCity(userCity);
})



}

function findCity (userCity){
  //clears existing data from the page - added Jquery to use .empty function//
  //resets city list in local storage//
localStorage.removeItem("city-list");
$("p").empty();
$("#current-weather").empty();


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

  
  //the base of the weather icon
  //used https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
  var fiveDayArray = [one, two, three, four, five];
  var appendArray = [dayOneDisplay, dayTwoDisplay, dayThreeDisplay, dayFourDisplay, dayFiveDisplay]
  var iconElOne = document.createElement("img");
  var iconElTwo = document.createElement("img");
  var iconElThree = document.createElement("img");
  var iconElFour = document.createElement("img");
  var iconElFive = document.createElement("img");
// the below for loop only works once
  for (let i=0; i<5; i++) {  
  //gets the icon data for the day of the week
  var iconData = fiveDayArray[i].weather[0].icon;
  //gets the icon image 
  var iconPic = "http://openweathermap.org/img/w/" + iconData + ".png";
  //creates Element
  var iconEl = document.createElement("img");
  //gives the image element an id of "weather icon"
  iconEl.setAttribute("id", "weather-icon");
  //gives the image element a source that will be linked via the iconPic variable
  iconEl.setAttribute("src","");
  //links to variable
  $('#weather-icon').attr('src', iconPic);
 //appends
  appendArray[i].append(iconEl);
  }
   
  //appends the details for the day to the page
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

  var dayFourTemp = document.createElement("li");
  dayFourTemp.textContent = "temp =" + four.main.temp; 
  var dayFourWind = document.createElement("li");
  dayFourWind.textContent = "wind=" + four.wind.speed;
  var dayFourHumidity = document.createElement("li");
  dayFourHumidity.textContent="humidity=" + four.main.humidity;
  
  dayFourDisplay.append(dayFourTemp, dayFourWind, dayFourHumidity);

  var dayFiveTemp = document.createElement("li");
  dayFiveTemp.textContent = "temp =" + five.main.temp; 
  var dayFiveWind = document.createElement("li");
  dayFiveWind.textContent = "wind=" + five.wind.speed;
  var dayFiveHumidity = document.createElement("li");
  dayFiveHumidity.textContent="humidity=" + five.main.humidity;
  
  dayFiveDisplay.append(dayFiveTemp, dayFiveWind, dayFiveHumidity);





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
  var currentIcon = data.weather[0].icon;
  console.log(currentIcon);
  var currentIconDisplay = document.createElement("img")
  var currentIconLink = "http://openweathermap.org/img/w/" + currentIcon + ".png";
  currentIconDisplay.setAttribute("id", "weather-icon");
  currentIconDisplay.setAttribute("src",currentIconLink);
  
  currentDisplay.append(currentDayDisplay,currentIconDisplay, currentTemp,currentWind,currentHumidity, );

  var liElements = document.getElementsByTagName('li');
   for (let i=0; i<= liElements.length -1; i++) {
    liElements[i].setAttribute("class", "card-content")
   }


})
  }


searchForm.addEventListener('submit', formSubmit);
