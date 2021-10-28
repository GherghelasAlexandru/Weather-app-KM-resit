var request = require('request');
var apiKey = '69715c23ad8f43308e6bed6f84fbf328';
var city = 'Emmen';
//var lon =  ;
//var lat = 52.7925;
let url;
let _location ="";




function setLocation(res,req)
{
   
}

 

 function makeForecastRequest(app)
    {
        app.get('/WeatherForecast', function(req, res) 
        {

            //Temperature Alert variable 

            
            let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}`;
            // Request for data using the URL
            request(url, function(err, response, body) 
            {
                
                
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




//store wind speed for the next 7 days 
 function retainWindSpeeds(forecast)
{
   var windSpeeds = [];

   for(i = 0; i < 10; i++)
   {
       console.log(forecast.data[i].datetime);
       windSpeeds.push([forecast.data[i].datetime,forecast.data[i].wind_spd]);
       //windSpeeds.push([AddDay(i),forecast.daily[i].wind_speed]);
   }

   
return windSpeeds;


}

// convert wind direction degrees in cardinal points
 function calculateWindDirection(forecast)
{
    var windDirections = [];

    for(i = 0; i < 10 ; i++)
    {
        //console.log();
        var windDegrees = forecast.data[i].wind_dir;

            var j = (windDegrees + 11.25) % 360;
           // console.log(j);
            
                if (j <=  22.5)
                {
                  windDirections.push([forecast.data[i].datetime, 'N']);
                }
                else if (j <=  45  ) 
                {
                    windDirections.push([forecast.data[i].datetime, "NNE"]);
                }
                else if (j <=  67.5) 
                {
                    windDirections.push([forecast.data[i].datetime, "NE"]);
                }
                else if (j <=  90  ) 
                {
                    windDirections.push([forecast.data[i].datetime, "ENE"]);
                }
                else if (j <= 112.5) 
                {
                    windDirections.push([forecast.data[i].datetime, "E"]);
                    
                }
                else if (j <= 135  )
                {
                    windDirections.push([forecast.data[i].datetime, "ESE"]);
                }
                else if (j <= 157.5) 
                {
                    windDirections.push([forecast.data[i].datetime, "SE"]);
                }
                else if (j <= 180  ) 
                {
                    windDirections.push([forecast.data[i].datetime, "SSE"]);
                }

                else if (j <= 202.5) 
                {
                    windDirections.push([forecast.data[i].datetime, "S"]);
                }

                else if (j <= 225  )
                {
                    windDirections.push([forecast.data[i].datetime, "SSW"]);
                } 

                else if (j <= 247.5) 
                {
                    windDirections.push([forecast.data[i].datetime, "SW"]);
                }

                else if (j <= 270  ) 
                {
                    windDirections.push([forecast.data[i].datetime, "WSW"]);
                }

                else if (j <= 292.5) 
                {
                    windDirections.push([forecast.data[i].datetime, "W"]);
                }

                else if (j <= 315  )
                {
                    windDirections.push([forecast.data[i].datetime, "WNW"]);
                } 

                else if (j <= 337.5) 
                {
                    windDirections.push([forecast.data[i].datetime, "NW"]);
                }

                else
                {
                    windDirections.push([forecast.data[i].datetime, "NNW"]);
                }                 
 

     }

  console.log(windDirections);
  return windDirections;

}

// store the temperature for the next 7 days 
 function storeTemperatures(info,forecast)
{
    
    var temperatures = [];
    switch(info)
    {
        case "min":
            for(i = 0; i < 10; i++)
            {
               temperatures.push( [forecast.data[i].datetime,forecast.data[i].low_temp] );
            } 
            break;

        case "max":
            for(i = 0; i < 10; i++)
            {
               temperatures.push([forecast.data[i].datetime,forecast.data[i].max_temp]);
            } 

    }
    return temperatures;
}


//add  a day based on a for loop 
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


<<<<<<< Updated upstream

module.exports.setLocation =setLocation;
module.exports.upcommingWeather = makeForecastRequest;
=======
// for testing purpouses 
>>>>>>> Stashed changes
module.exports.AddDay = AddDay;
module.exports.storeTemperatures = storeTemperatures;
module.exports.calculateWindDirection = calculateWindDirection;
module.exports.retainWindSpeeds = retainWindSpeeds;

