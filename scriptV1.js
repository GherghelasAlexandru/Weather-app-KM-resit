// Openweathermap API private key

// variables required  to store info from the location page
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');


// load information when the page is loaded for the first time
window.onload = getWeatherInfo(cityName);


// timer to make the call to the API every minute
window.setInterval(getWeatherInfo(cityName),60000);


function getWeatherInfo(cityName)
{
   base = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`;

   fetch(base)
   .then((response) => 
   {
       return response.json();
   })
   .then((data) =>
   {
       const { temp } = data.main;
       const place = data.name;
       const { description , icon} = data.weather[0];
       const { sunrise , sunset} = data.sys;

       const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
       const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
   });
   
   
   
}
