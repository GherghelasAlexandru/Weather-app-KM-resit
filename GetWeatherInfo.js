// Openweathermap API private key
//const api = "ea17eb5501a9d76bed7c68dd09c044dd"; 
//const cityName = 'Emmen';
//const base = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`;

// constants required to store the lot and lat of the location  



// load information when the page is loaded for the first time
window.onload = getWeatherInfo(cityName);


// timer to make the call to the API every minute
window.setInterval(getWeatherInfo(cityName),60000);
setInterval(ColdAlarmTrigger,3000);
setInterval(HotAlarmTrigger,6000);


function getWeatherInfo(cityName)
{

    fetch(base)
   .then((response) => 
   {
       return response.json();
   })
   .then((data) =>
   {
       var { temp } = data.main;
       var place = data.name;
       var { description , icon} = data.weather[0];
       var { sunrise , sunset} = data.sys;

        //Save lot and lat
         const lat = parseInt(data.coord['lat']);
         const lon = parseInt(data.coord['lom']);
        //console.log(parseInt(data.coord['lat']));
        //console.log(lon);

       var iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
       var fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          var sunriseGMT = new Date(sunrise * 1000);
          var sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data

          var iconImg = document.getElementById('weather-icon');
          var loc = document.querySelector('#location');
          var tempC = document.querySelector('.c');
          var tempF = document.querySelector('.f');
          var desc = document.querySelector('.desc');
          var sunriseDOM = document.querySelector('.sunrise');
          var sunsetDOM = document.querySelector('.sunset');


          //Replace text
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;

         
   });
   
   
   
}
