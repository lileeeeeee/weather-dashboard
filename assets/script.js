var APIKey = "f7c9249a4ca819afd8dd2f34c5b9766e";


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
//sets local storage to the city the user typed//
localStorage.setItem("city", userCity)


fetch(queryURLGeocode) 
.then(response => response.json())
.then(json => {
     var lat = json[0].lat; 
     var lon = json[0].lon;
     console.log(lat);
     console.log(lon);
     var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon + "&cnt=42&appid=" + APIKey;
     console.log(queryURL);
     return fetch(queryURL);
})
.then (function (response) {
return response.json();
})
.then(function (data) {
  console.log(data);
  console.log(data.list[0]);
  console.log(data.list[8]);
  console.log(data.list[16]);
  console.log(data.list[24]);
  console.log(data.list[32]);
});


  
}

searchForm.addEventListener('submit', formSubmit);


// fetch(queryCrypto) .then(response => response.json())
// .then(json => { 
//     let coins = json.coins; 
//     console.log(coins);
//     console.log(coins[arrayPosition].item.id);

// }); 