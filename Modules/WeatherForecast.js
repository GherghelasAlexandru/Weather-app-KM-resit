var request = require('request');
var apiKey = 'ea17eb5501a9d76bed7c68dd09c044dd';
var city = 'Emmen';
var lon = 6.8947;
var lat = 52.7925;
// one call API link based on lat and lon
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`;


module.exports = {
    upcommingWeather: function(app)
    {
        app.get('/WeatherForecast', function(req, res) 
        {
            var lowTemperatures = [];
            //Temperature Alert variable 

            // Get city name passed in the form
        
            // Use that city name to fetch data
            // Use the API_KEY in the '.env' file

        
           // console.log(city)
           // console.log(url)

            // Request for data using the URL
            request(url, function(err, response, body) {
                
                
                // On return, check the json data fetched

                if (err) 
                {
                    res.render('WeatherForecast', { weather: null, error: 'Error, please try again' });
                } 

                else 
                {
                    
                    let weather = JSON.parse(body);
  
         
                    if (weather == undefined) 
                    {
                        //console.log("ana");
                        res.render('WeatherForecast', { weather: null, error: 'Error, please try again' });
                    } 
                    else
                    {
                       
                       res.render('WeatherForecast',{ lowTemperatures: storeTemperatures("min",weather), highTemperatures: storeTemperatures("max",weather), windDirections:calculateWindDirection(weather),windSpeeds: retainWindSpeeds(weather)});
                    }
               
                }
          });
        });
    }
};




//check Min temperature for the next 7 days

function retainWindSpeeds(forecast)
{
   var windSpeeds = [];

   for(i = 0; i < 7; i++)
   {
       windSpeeds.push([AddDay(i),forecast.daily[i].wind_speed]);
   }

return windSpeeds;


}


function calculateWindDirection(forecast)
{
    var windDirections = [];

    for(i = 0; i < 7; i++)
    {
        console.log();
        var windDegrees = forecast.daily[i].wind_deg;

            var j = (windDegrees + 11.25) % 360;
            console.log(j);
            
                if (j <=  22.5)
                {
                  windDirections.push([AddDay(i), 'N']);
                }
                else if (j <=  45  ) 
                {
                    windDirections.push([AddDay(i), "NNE"]);
                }
                else if (j <=  67.5) 
                {
                    windDirections.push([AddDay(i), "NE"]);
                }
                else if (j <=  90  ) 
                {
                    windDirections.push([AddDay(i), "ENE"]);
                }
                else if (j <= 112.5) 
                {
                    windDirections.push([AddDay(i), "E"]);
                    
                }
                else if (j <= 135  )
                {
                    windDirections.push([AddDay(i), "ESE"]);
                }
                else if (j <= 157.5) 
                {
                    windDirections.push([AddDay(i), "SE"]);
                }
                else if (j <= 180  ) 
                {
                    windDirections.push([AddDay(i), "SSE"]);
                }

                else if (j <= 202.5) 
                {
                    windDirections.push([AddDay(i), "S"]);
                }

                else if (j <= 225  )
                {
                    windDirections.push([AddDay(i), "SSW"]);
                } 

                else if (j <= 247.5) 
                {
                    windDirections.push([AddDay(i), "SW"]);
                }

                else if (j <= 270  ) 
                {
                    windDirections.push([AddDay(i), "WSW"]);
                }

                else if (j <= 292.5) 
                {
                    windDirections.push([AddDay(i), "W"]);
                }

                else if (j <= 315  )
                {
                    windDirections.push([AddDay(i), "WNW"]);
                } 

                else if (j <= 337.5) 
                {
                    windDirections.push([AddDay(i), "NW"]);
                }

                else
                {
                    windDirections.push([AddDay(i), "NNW"]);
                }                 
 

     }


  return windDirections;


}

function storeTemperatures(info,forecast)
{
    var temperatures = [];
    switch(info)
    {
        case "min":
            for(i = 0; i < 7; i++)
            {
                    temperatures.push( [AddDay(i),forecast.daily[i].temp['min']] );
            } 
            break;

        case "max":
            for(i = 0; i < 7; i++)
            {
                    temperatures.push( [AddDay(i),forecast.daily[i].temp['max']] );
            } 

    }

    return temperatures;
}


function AddDay(i)
{
    switch(i)
    {
        case 0:
         return "Monday ";
        
        case 1:
            return "Tuesday ";
        
        case 2:
            return "Wednesday ";
        
        case 3: 
            return "Thursday ";

        case 4:
            return "Friday ";

        case 5: 
             return "Saturday ";

        case 6:
             return "Sunday ";

           
    }
}





