
//I have removed the API key and stored it elsewhere so I can upload this project to gitHub
//at a later date I will make a config file and store it there so the app works and can 
//be uploaded in whole to github. 

const key = ""; 
const baseURL = "https://api.openweathermap.org/data/2.5/";


const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event){
    if(event.keyCode == 13){
     getResults(searchBox.value);
      
    }
}


function getResults(query){
    fetch(`${baseURL}weather?q=${query}&units=metric&APPID=${key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let currentTemp = document.querySelector('.current .temp');
    currentTemp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let currentWeather = document.querySelector('.current .weather');
    currentWeather.innerText = weather.weather[0].main;

    let hilo = document.querySelector('.current .hi-lo');
    hilo.innerHTML = `${Math.round(weather.main.temp_min)}°c /
    ${Math.round(weather.main.temp_max)}°c`;

    searchBox.value = "";
 }

 function dateBuilder(d){
     let months = ['January', 'February', 'March', 'April', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
 }
