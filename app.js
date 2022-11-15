// api key!
const API_KEY = '6739e30d4dd54e0dd05dfe09523cd0bf';
const body = document.querySelector('body');
// create element on search input
async function search(event) {
    const value = event.target.value.toLowerCase();
    if (value.length == 0) return
     const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`)
     const data = await result.json();
     const ul = document.querySelector('ul');
     ul.innerHTML = '';
     data.forEach( item => {
        const {name, lat, lon, country} = item;
        ul.innerHTML += `<li data-lat="${lat}" data-lon="${lon}" data-name="${name}">
            ${name}
            <span data-country="${country}">${country}</span>
        </li>`

     });
}
const inputElement = document.querySelector('input[type="text"]');
inputElement.addEventListener('input', search);
// get data and update variables
async function showWeather(lat, lon, name) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const temp = Math.round(data.main.temp);
    const feelsTemp = Math.round(data.main.feels_like);
    const humidity = Math.round(data.main.humidity);
    const wind = Math.round(data.wind.speed);
    const icon = data.weather[0].icon;


    document.querySelector('#degrees').innerHTML = `${temp}&#8451;`;
    document.querySelector('#city').innerText = name;
    document.querySelector('[data-stat="feels-like"]').innerText = feelsTemp;
    document.querySelector('[data-stat="humidity"]').innerText = humidity;
    document.querySelector('[data-stat="wind"]').innerText = wind;
    document.querySelector('#icon').src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

}
// toggle hidden state
function toggleHiddenState(...arguments) {
    arguments.forEach(x => x.classList.toggle('hidden'));
}
// handle click on a city item from a list
document.body.addEventListener('click', event => {
    const li = event.target;
    const {lat,lon, name} = li.dataset;

    if (!lat) return

    showWeather(lat, lon, name);
    toggleHiddenState(document.querySelector('main'),document.querySelector('form'));
    
});
// change city button
document.querySelector('#change-city').addEventListener('click', () => {
    toggleHiddenState(document.querySelector('main'),document.querySelector('form'));
    inputElement.value = '';
    inputElement.focus();
});
// get saved theme
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme')) {
        body.className = localStorage.getItem('theme');
    } else {
        let theme = body.className;
        localStorage.setItem('theme', theme);
    }
});
// change theme on click
document.querySelector('button#theme-switch').addEventListener('click', () => {
    body.classList.toggle('light');
    body.classList.toggle('dark');
    theme = body.className;
    localStorage.setItem('theme', theme);
});




