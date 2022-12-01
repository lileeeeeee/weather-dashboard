var APIKey = "f7c9249a4ca819afd8dd2f34c5b9766e";

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon + "&appid=" + APIKey;

var lat;
var lon;

var searchForm = document.querySelector('#searchBox');

function formSubmit(event) {
    event.preventDefault();
  console.log("clicked!");
  //gets the city the user typed
  var userCity = document.querySelector('#userInput').value;
  console.log(userCity);
  if (!userCity) {
    console.error('Please choose a city');
    return;
  }
//using only city for now, no state or country options//
var queryURLGeocode = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&limit=" + 1 + "&appid=" + APIKey;
console.log(queryURLGeocode);
localStorage.setItem("city", userCity)
 fetch(queryURLGeocode) 
 .then(function (response) {
    console.log(response.json());

 })

  
}

searchForm.addEventListener('submit', formSubmit);