let apiKey = "cd64fb260d830f5a9d386340ed6a2906";
let apiURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
let apuUrl = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}";
let city = "";

let now = new Date();

let days = [
 "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let changeh5 = document.querySelector("#date");


changeh5.innerHTML = `${day}, ${hours}:${minutes}`;


  //change h1

let form = document.getElementById("inputSearch");
form.addEventListener("submit", search);

function search(event) {
    event.preventDefault();
    city = document.querySelector("#userInputCity").value;
    let citysearch = document.querySelector("#cityname");
    if (city) {
           
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        axios.get(apiUrl).then(showTemperature);
    } else {
        citysearch.innerHTML = "Please enter a city";
    
    }
}

//change temperature search

function showTemperature(response) {
    let citysearch = document.querySelector("#cityname");
    citysearch.innerHTML = `${response.data.name}`;
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let changeHumi = document.querySelector("#humi");
    let changeWind = document.querySelector("#wind");
    let description = document.querySelector("#temperature-description");
   temperatureElement.innerHTML = `${temperature}°C`;
   changeHumi.innerHTML = `Humidity: ${response.data.main.humidity}%`;
   changeWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed*3.6)}km/h`;
   description.innerHTML = response.data.weather[0].description;
   let weatherCode = response.data.weather[0].icon;
   let changeIcon = document.querySelector(".weatherIcon");
   changeIcon.src = `http://openweathermap.org/img/wn/${weatherCode}@2x.png`;
   
  
   }

   //current position temperature
 
 function showPositionCurrent(position) {
    let lat = position.coords.latitude;
   let lon = position.coords.longitude;
   let apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
   axios.get(apiURL).then(showTemperature);
 }
 

 function buttonClick() {
   navigator.geolocation.getCurrentPosition(showPositionCurrent);
 
 }
 
 let clickButton = document.querySelector("#current");
 clickButton.addEventListener("click", buttonClick);





