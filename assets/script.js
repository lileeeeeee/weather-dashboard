var APIKey = "f7c9249a4ca819afd8dd2f34c5b9766e";
var searchForm = document.querySelector('#search-box');
var cityList = document.querySelector("#city");
var currentDisplay = document.querySelector("#current-weather");
var dayOneDisplay = document.querySelector("#day-one");
var dayTwoDisplay = document.querySelector("#day-two");
var dayThreeDisplay = document.querySelector("#day-three");
var dayFourDisplay = document.querySelector("#day-four");
var dayFiveDisplay = document.querySelector("#day-five");
var userCity = " ";
var storedCities = [];

function formSubmit(event) {
    event.preventDefault();
    // gets the city the user typed
    userCity = document.querySelector('#user-input').value;
    console.log(userCity);
    if (! userCity) {
        console.log("missing city");
        return;
    }

    // displays the weather data for the the city the user typed
    findCity(userCity);
    // adds the city to the list on the page//
    var typedCity = document.createElement("li");
    // sets the text content of the li to the city the user typed
    typedCity.textContent = userCity;
    // pushes the city the user typed to an array containing the cities searched
    storedCities.push(userCity);

    // checks for duplicates https://stackoverflow.com/questions/40305789/check-if-element-is-in-array-twice-time/40305862#40305862
    function countInArray(storedCities, userCity) {
        var count = 0;

        for (let i = 0; i < storedCities.length; i++) {
            if (storedCities[i] === userCity) {
                count++;
            }
        }
        return count;

    }
    if ((countInArray(storedCities, userCity)) > 1) {
        console.log("duplicate")
    } else {
        cityList.append(typedCity);
    }

    console.log(storedCities);
    console.log(typedCity)
    // when the city is clicked, listener grabs the text content on the li to search that city
    typedCity.addEventListener("click", function () {
        console.log(this.textContent);
        findCity(this.textContent);
    })
}

function findCity(userCity) { // clears existing data from the page - added Jquery to use .empty function//

    $("p").empty();
    $("#current-weather").empty();

    // using only city for now, no state or country options//
    var queryURLGeocode = "https://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&limit=" + 1 + "&appid=" + APIKey;
    console.log(queryURLGeocode);

    // makes an API call for coordinates of the user's city input
    fetch(queryURLGeocode).then(function (response) {
        return response.json();
    }).then(function (json) {
        var lat = json[0].lat;
        var lon = json[0].lon;
        console.log(lat);
        console.log(lon);
        // uses those coordinates to get the five day forecast for that city
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=50&appid=" + APIKey + "&units=imperial";
        console.log(queryURL);
        fetch(queryURL).then(function (response) {
            return response.json();
        }).then(function (data) { // grabs five days from the array.then(function (data) {
            console.log(data.list);

            var one = data.list[8];
            var two = data.list[16];
            var three = data.list[24];
            var four = data.list[32];
            var five = data.list[39];

            // each day is a UL element showing the date
            var dayOne = document.createElement("ul");
            var dayTwo = document.createElement("ul");
            var dayThree = document.createElement("ul");
            var dayFour = document.createElement("ul");
            var dayFive = document.createElement("ul");
            // this is the date
            dayOne.textContent = one.dt_txt.substring(5, 10);
            dayTwo.textContent = two.dt_txt.substring(5, 10);
            dayThree.textContent = three.dt_txt.substring(5, 10);
            dayFour.textContent = four.dt_txt.substring(5, 10);
            dayFive.textContent = five.dt_txt.substring(5, 10);
            // appends the UL items with the date to the page
            dayOneDisplay.append(dayOne);
            dayTwoDisplay.append(dayTwo);
            dayThreeDisplay.append(dayThree)
            dayFourDisplay.append(dayFour);
            dayFiveDisplay.append(dayFive);


            // the base of the weather icon
            // used https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
            var fiveDayArray = [
                one,
                two,
                three,
                four,
                five
            ];
            var appendArray = [
                dayOneDisplay,
                dayTwoDisplay,
                dayThreeDisplay,
                dayFourDisplay,
                dayFiveDisplay
            ];
            // sets icon for the five day forecast
            for (let i = 0; i < 5; i++) { // gets the icon data for the day of the week
                var iconData = fiveDayArray[i].weather[0].icon;
                // gets the icon image
                var iconPic = "https://openweathermap.org/img/w/" + iconData + ".png";
                // creates Element
                var iconEl = document.createElement("img");
                // links to variable
                iconEl.setAttribute('src', iconPic);
                console.log(iconPic);
                // appends
                appendArray[i].append(iconEl);
                console.log(iconEl);
            }

            // appends the details for the day to the page
            var dayOneTemp = document.createElement("li");
            dayOneTemp.textContent = "temp: " + one.main.temp + " degrees";
            var dayOneWind = document.createElement("li");
            dayOneWind.textContent = "wind: " + one.wind.speed;
            var dayOneHumidity = document.createElement("li");
            dayOneHumidity.textContent = "humidity: " + one.main.humidity + " %";

            dayOneDisplay.append(dayOneTemp, dayOneWind, dayOneHumidity);

            var dayTwoTemp = document.createElement("li");
            dayTwoTemp.textContent = "temp: " + two.main.temp + " degrees";
            var dayTwoWind = document.createElement("li");
            dayTwoWind.textContent = "wind: " + two.wind.speed + " MPH";
            var dayTwoHumidity = document.createElement("li");
            dayTwoHumidity.textContent = "humidity: " + two.main.humidity + " %";

            dayTwoDisplay.append(dayTwoTemp, dayTwoWind, dayTwoHumidity);

            var dayThreeTemp = document.createElement("li");
            dayThreeTemp.textContent = "temp: " + three.main.temp + " degrees";
            var dayThreeWind = document.createElement("li");
            dayThreeWind.textContent = "wind: " + three.wind.speed + " MPH";
            var dayThreeHumidity = document.createElement("li");
            dayThreeHumidity.textContent = "humidity: " + three.main.humidity + " %";

            dayThreeDisplay.append(dayThreeTemp, dayThreeWind, dayThreeHumidity);

            var dayFourTemp = document.createElement("li");
            dayFourTemp.textContent = "temp: " + four.main.temp + " degrees";
            var dayFourWind = document.createElement("li");
            dayFourWind.textContent = "wind: " + four.wind.speed + " MPH";
            var dayFourHumidity = document.createElement("li");
            dayFourHumidity.textContent = "humidity: " + four.main.humidity + " %";

            dayFourDisplay.append(dayFourTemp, dayFourWind, dayFourHumidity);

            var dayFiveTemp = document.createElement("li");
            dayFiveTemp.textContent = "temp: " + five.main.temp + " degrees";
            var dayFiveWind = document.createElement("li");
            dayFiveWind.textContent = "wind: " + five.wind.speed + " MPH";
            var dayFiveHumidity = document.createElement("li");
            dayFiveHumidity.textContent = "humidity: " + five.main.humidity + " %";

            dayFiveDisplay.append(dayFiveTemp, dayFiveWind, dayFiveHumidity);
        });

        // gets the current forecast for the user's submitted city
        var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
        fetch(queryURLcurrent).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            var current = data.main.temp;
            console.log(current);
            var currentDayDisplay = document.createElement("ul");
            currentDayDisplay.textContent = data.name + " " + Date().substring(0, 15);
            var currentTemp = document.createElement("li");
            currentTemp.textContent = "temp: " + data.main.temp + " degrees";
            var currentWind = document.createElement("li");
            currentWind.textContent = "wind: " + data.wind.speed + " MPH";
            var currentHumidity = document.createElement("li");
            currentHumidity.textContent = "humidity: " + data.main.humidity + " %";
            var currentIcon = data.weather[0].icon;
            console.log(currentIcon);
            var currentIconDisplay = document.createElement("img")
            var currentIconLink = "https://openweathermap.org/img/w/" + currentIcon + ".png";
            currentIconDisplay.setAttribute("id", "weather-icon");
            currentIconDisplay.setAttribute("src", currentIconLink);

            currentDisplay.append(currentDayDisplay, currentIconDisplay, currentTemp, currentWind, currentHumidity,);

            var liElements = document.getElementsByTagName('li');
            for (let i = 0; i <= liElements.length - 1; i++) {
                liElements[i].setAttribute("class", "card-content")

            }


        });
    });
}
searchForm.addEventListener('submit', formSubmit);
