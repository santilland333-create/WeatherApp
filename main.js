const api ={
    key: 'd9c33cdac86a5158331c70cf6c9bea93',
    base: 'https://api.openweathermap.org/data/2.5/',
};
const searchBox = document.querySelector('#search-input');
searchBox.addEventListener('keypress', setQuery);
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResults);
}
function displayResults(weather) {
    console.log(weather);

    let city = document.querySelector('.Info .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.Info .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.Display .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.Display .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.Display .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();  
    return `${day} ${date} ${month} ${year}`;
}
