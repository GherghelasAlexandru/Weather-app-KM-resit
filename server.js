
// Require application dependencies
// These are express, body-parser, and request
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
var currentTemperature;

const fs = require('fs');

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

// Set up your OpenWeatherMap API_KEY

const apiKey = `${process.env.API_KEY}`;
var hotAlarmController = require('./Modules/HotAlarm.js');
// Setup your express app and body-parser configurations
// Setup your javascript template view engine
// we will serve your static pages from the public directory, it will act as your root directory
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



app.post('/auth', function(request, response) {
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


// Setup your default display on launch
app.get("/", function (req, res) {

 
    // It will not fetch and display any data in the index page

     // Get city name passed in the form

    //let city = req.body.city;
    let city = 'Emmen';
    
    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);
            // you shall output it in the console just to make sure that the data being displayed is what you want
            console.log(weather);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                // we shall use the data got to set up your output
                let place = `${weather.name}, ${weather.sys.country}`,
                  /* you shall calculate the current timezone using the data fetched*/
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
                  weatherFahrenheit;
                weatherFahrenheit = (weatherTemp * 9) / 5 + 32;

                // you shall also round off the value of the degrees fahrenheit calculated into two decimal places
                function roundToTwo(num) {
                  return +(Math.round(num + "e+2") + "e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);
        // you shall now render the data to your page (index.ejs) before displaying it out
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
            error: null,
          });
          currentTemperature = parseInt(weatherTemp);
        }
      }
  });
console.log(currentTemperature);

  if( hotAlarmController.hotAlarm(currentTemperature) == true)
          {
            res.writeHead(200, {'Content-Type': 'audio/mp3'});
            let opStream = fs.createReadStream('/Users/Alex/Documents/GitHub/Weather-app-KM-resit/resources/alarm.mp3');
       
            opStream.pipe(res);
            return;
          }
    
  });

  // On a post request, the app shall data from OpenWeatherMap using the given arguments
app.post('/s', function(req, res) {

 

    // Get city name passed in the form

    let city = req.body.city;
    //let city = 'Amsterdam';
    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);
            // you shall output it in the console just to make sure that the data being displayed is what you want
            console.log(weather);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                // we shall use the data got to set up your output
                let place = `${weather.name}, ${weather.sys.country}`,
                  /* you shall calculate the current timezone using the data fetched*/
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
                  weatherFahrenheit;
                  weatherFahrenheit = (weatherTemp * 9) / 5 + 32;

                // you shall also round off the value of the degrees fahrenheit calculated into two decimal places
                function roundToTwo(num) {
                  return +(Math.round(num + "e+2") + "e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);
        // you shall now render the data to your page (index.ejs) before displaying it out
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
            error: null,
          });
          

        }
       
      }
  });
});

app.listen(5000);