
// Require application dependencies
// These are express, body-parser, and request
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
var currentTemperature;
//var currentCity;
const fs = require('fs');
let city = "";

//const hotAlarm = require('./Modules/HotAlarm2');
const dailyAlarms = require('./Modules/DailyAlarms');
const weatherForecast = require('./Modules/WeatherForecast');
const historicalData = require('./Modules/HistoricalData');

var authenticateController=require('./controllers/authenticate-controller');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/api/authenticate',authenticateController.authenticate);


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'weathersystem'
});

connection.connect(function (err) {
  if (err) {
      console.log('Error connecting to Db');
      return;
  }
  console.log('Connection established');
});
module.exports = connection;

// Configure dotenv package

require("dotenv").config();

// Set up OpenWeatherMap API_KEY

const apiKey = `${process.env.API_KEY}`;

// Setup express app and body-parser configurations
// Setup javascript template view engine
// will serve static pages from the public directory, it will act as root directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(function(req,res,next){
  req.connection = connection;
  next();
});

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.post('/login',(req,res,next)=>{
  res.render('login.ejs')
})

app.get('/GetLocation',function(request,response)
{
    console.log(location);
    var location = city; 
    response.json({location: location});
     
});

weatherForecast.setLocation(city);


app.post('/auth', function(request, response) 
{
	var username = request.body.username;
  var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      //console.log(results.length);
			if (results.length > 0) {
        response.render('admin.ejs')
        
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



// Setup default display on launch
app.get("/", function (req, res) {

 

    let city = 'Emmen';
    
    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) 
    {

        // On return, check the json data fetched
        if (err) 
        {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } 
        else 
        {
            let weather = JSON.parse(body);
            // you shall output it in the console just to make sure that the data being displayed is what you want
            console.log(weather);

            if (weather.main == undefined) 
            {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } 
            else 
            {
                //  use the data got to set up your output
                let place = `${weather.name}, ${weather.sys.country}`,
                    /*  calculate the current timezone using the data fetched*/
                    weatherTimezone = `${new Date(
                    weather.dt * 1000 - weather.timezone * 1000
                  )}`;

                let weatherTemp = `${weather.main.temp}`,
                    weatherPressure = `${weather.main.pressure}`,
                    /* you will fetch the weather icon and its size using the icon data*/
                    weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    weatherDescription = `${weather.weather[0].description}`,
                    humidity = `${weather.main.humidity}`,
                    clouds = `${weather.clouds.all}`,
                    visibility = `${weather.visibility}`,
                    main = `${weather.weather[0].main}`,
                    lon = `${weather.coord.lon}`,
                    lat = `${weather.coord.lat}`,
                    weatherFahrenheit;
                    weatherFahrenheit = (weatherTemp * 9) / 5 + 32;

                  //test
                  currentCity = place;

                // round off the value of the degrees fahrenheit calculated into two decimal places
                function roundToTwo(num) 
                {
                  return +(Math.round(num + "e+2") + "e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);

                // render the data to  page  before displaying it out
                res.render("index", {
                    weather: weather,
                    place: place,
                    temp: weatherTemp,
                    pressure: weatherPressure,
                    icon: weatherIcon,
                    description: weatherDescription,
                    timezone: weatherTimezone,
                    humidity: humidity,
                    fahrenheit: weatherFahrenheit,
                    clouds: clouds,
                    visibility: visibility,
                    main: main,
                    lat:lat,
                    lon:lon,
                    error: null,
                  });
                  currentTemperature = parseInt(weatherTemp);
                
            }
      }
    });
    
 });



//daily alarms
dailyAlarms.triggerAlarm(app);

//weather forecast for the next 7 days
weatherForecast.upcommingWeather(app);

//  historical data 
historicalData.historicalData(app);




// process information when logged in 
app.post('/', function(req, res) 
{

    // Get city name passed in the form

     city = req.body.city;

   // weatherForecast.setLocation(city);

    // Use that city name to fetch data
  
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) 
    {

        // On return, check the json data fetched
        if (err) 
        {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } 
        else
         {
            let weather = JSON.parse(body);
            console.log(weather.coord['lon']);
            // output it in the console just to make sure that the data being displayed is what I want
            //console.log(weather);

            if (weather.main == undefined)
             {
                res.render('index', { weather: null, error: 'Error, please try again' });
             } 
            else
             {

                //use the data got to set up output
                let place = `${weather.name}, ${weather.sys.country}`,
                    /*  calculate the current timezone using the data fetched*/
                    weatherTimezone = `${new Date(
                    weather.dt * 1000 - weather.timezone * 1000
                  )}`;

                let weatherTemp = `${weather.main.temp}`,
                    weatherPressure = `${weather.main.pressure}`,
                    /* fetch the weather icon and its size using the icon data*/
                    weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    weatherDescription = `${weather.weather[0].description}`,
                    humidity = `${weather.main.humidity}`,
                    clouds = `${weather.clouds.all}`,
                    visibility = `${weather.visibility}`,
                    main = `${weather.weather[0].main}`,
                    lon = `${weather.coord.lon}`,
                    lat = `${weather.coord.lat}`,
                    weatherFahrenheit;
                    weatherFahrenheit = (weatherTemp * 9) / 5 + 32;


                // round off the value of the degrees fahrenheit calculated into two decimal places
                function roundToTwo(num) {
                  return +(Math.round(num + "e+2") + "e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);

               

                //render the data to your page (index.ejs) before displaying it out
                res.render("index", {
                    weather: weather,
                    place: place,
                    temp: weatherTemp,
                    pressure: weatherPressure,
                    icon: weatherIcon,
                    description: weatherDescription,
                    timezone: weatherTimezone,
                    humidity: humidity,
                    fahrenheit: weatherFahrenheit,
                    clouds: clouds,
                    visibility: visibility,
                    main: main,
                    lat:lat,
                    lon:lon,
                    error: null,
                   });
                   


              }
       
          }
     });

});

function parseInfo(out,callback)
{

}
 
app.listen(5000);