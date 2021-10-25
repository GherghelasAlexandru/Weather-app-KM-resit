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

                    
                    
                    //  output it in the console just to make sure that the data is there
                   // console.log(weather.daily[0].temp['min']);
         
                    if (weather.daily == undefined) 
                    {
                        //console.log("ana");
                        res.render('WeatherForecast', { weather: null, error: 'Error, please try again' });
                    } 
                    else
                    {
                        //console.log(weather.daily[0]);
                        for(i = 0; i < 7; i++)
                        {
                            //console.log(weather.daily);
                           // lowTemperatures.push([AddDay(i),weather.daily[0].temp['min']]);
                        }
                     
                       res.render('WeatherForecast',{ lowTemperatures: storeTemperatures("min",weather),highTemperatures: storeTemperatures("max",weather)});
       
        
                    }
               
                }
          });
        });
    }
};




//check Min temperature for the next 7 days

function storeTemperatures(info,forecast)
{
    var temperatures = [];
    switch(info)
    {
        case "min":
            for(i = 0; i < 7; i++)
            {
                    temperatures.push( [AddDay(i),forecast.daily[0].temp['min']] );
            } 
            break;

        case "max":
            for(i = 0; i < 7; i++)
            {
                    temperatures.push( [AddDay(i),forecast.daily[0].temp['max']] );
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





