// var tempAlert = 25;
// var request = require('request');
// var apiKey = 'ea17eb5501a9d76bed7c68dd09c044dd';
// var city = 'Emmen';

// // module.exports = {
// //     setLocation: function(location)
// //     {
// //         city = location;
// //     }
// // }

// module.exports = {
//     triggerAlarm: function(app)
//     {
//         console.log(city)
        
//         app.get('/DisplayAlarm', function(req, res) 
//         {
//             //Temperature Alert variable
            

//             // Get city name passed in the form
        


//             // Use that city name to fetch data
//             // Use the API_KEY in the '.env' file

//             let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
//             console.log(city)
//             console.log(url)

//             // Request for data using the URL
//             request(url, function(err, response, body) {
                
             
//                 // On return, check the json data fetched

//                 if (err) 
//                 {
//                     res.render('DisplayAlert', { weather: null, error: 'Error, please try again' });
//                 } 

//                 else 
//                 {
                    
//                     let weather = JSON.parse(body);
//                     console.log(weather)
//                     //  output it in the console just to make sure that the data is there
//                     //console.log(weather);
         
//                     if (weather.main == undefined) 
//                     {
//                         console.log("ana");
//                         res.render('DisplayAlert', { weather: null, error: 'Error, please try again' });
//                     } 
//                     else
//                     {
                        
                        
//                     let weatherTemp = `${weather.main.temp}`,
//                         weatherPressure = `${weather.main.pressure}`,
//                         weatherDescription = `${weather.weather[0].description}`,
//                         humidity = `${weather.main.humidity}`;
                        
//                       if(parseInt(weatherTemp) >= tempAlert)
//                       {
                          
//                         var alertMessage = "Warning Sir!! Temperature will be higher than 25!";
//                       }
//                       else
//                       {
                        
//                        // res.json({  message:"No Heat Wave alarms,Sir!" });
//                         var alertMessage = "No Heat Wave alarms,Sir!";
//                       }

                      


        
                      
//                     //render the data to alarm view (DisplayAlert.ejs) before displaying it out
//                     res.render("DisplayAlert.ejs", { alarmMessage: alertMessage, });
                    
        
//                 }
               
//               }
//           });
//         });
//     }
// };