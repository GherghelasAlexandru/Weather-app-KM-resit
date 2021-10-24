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
        app.get('/WeatherForecast',function(req,res)
        {
            
           makeMaxDayTempRequest(url,res);
             
            

        });
        
    }
};

// for  Day Time  average max temp
// function makeMaxDayTempRequest(url,res)
// {
//     // for storing the average temp
//     var averageDayMaxTemp = 0;
//     var sum = 0;
    

//     // // access api
//     request(url, function(err, response, body) {
                
        

//         // On return, check the json data fetched

//         if (err) 
//         {
//             res.render('WeatherForecast', { weather: null, error: 'Error, please try again' });
//         } 

//         else 
//         {
//             // parse the JSON info
//             let forecast = JSON.parse(body);

//             // check the 7 days inside the JSON
//             if(forecast.daily == undefined)
//             {
//                 res.render('WeatherForecast',{ weather: null, error: 'Error, please try again' });
//             }

//             else
//             {

//                let temperatures = forecast.daily;
               
 
//                //console.log(temperatures[0].temp['day']);

//                // loop thru days for day time max temp and make sum based on each day
//                for(i = 0; i < 7; i++)
//                {
//                     var temp = temperatures[i].temp['day'];
//                     sum = sum + temp;
//                     if( i == 6)
//                     {
                        
//                         averageDayMaxTemp = (sum / 7).toFixed(2);
//                         console.log(averageDayMaxTemp);
                        
//                     }       
//                } 

//                res.render('WeatherForecast',{averageDayMaxTemp:averageDayMaxTemp});
               
//             }
//         }

//     });
// }


function makeMaxDayTempRequest(url,res)
{
    // for storing the average temp
    var maxTemperatures = [];
    
    

    // // access api
    request(url, function(err, response, body) {
                
        

        // On return, check the json data fetched

        if (err) 
        {
            res.render('WeatherForecast', { weather: null, error: 'Error, please try again' });
        } 

        else 
        {
            // parse the JSON info
            let forecast = JSON.parse(body);

            // check the 7 days inside the JSON
            if(forecast.daily == undefined)
            {
                res.render('WeatherForecast',{ weather: null, error: 'Error, please try again' });
            }

            else
            {

               let temperatures = forecast.daily;
               
 
               //console.log(temperatures[0].temp['day']);

               // loop thru days for day time max temp and make sum based on each day
               for(i = 0; i < 7; i++)
               {
                    console.log(temperatures[i].temp['max']);
                    
                    //maxTemperatures.set(AddDay(i),temperatures[i].temp['max']);
                    maxTemperatures.push( [AddDay(i),temperatures[i].temp['max']] );
               } 
               
               


               res.render('WeatherForecast',{maxDayTemperatures:maxTemperatures});
               
            }
        }

    });
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





