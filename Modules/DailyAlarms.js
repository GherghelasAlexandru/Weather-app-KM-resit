var request = require('request');
// variables  required for trigerring the alarms
var hotTempAlert = 25;
var coldTempAlert = 5;
var rainAlert = 'Clouds';

var apiKey = 'ea17eb5501a9d76bed7c68dd09c044dd';
var city = 'Emmen';








module.exports = {
    triggerAlarm: function(app)
    {
        //console.log(city)
        
        app.get('/DisplayAlarm', function(req, res,next) 
        {

            // Use that city name to fetch data
            // Use the API_KEY in the '.env' file

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

            // Request for data using the URL
            request(url, function(err, response, body) 
            {
                
             
                // On return, check the json data fetched

                if (err) 
                {
                    res.render('DisplayAlert', { weather: null, error: 'Error, please try again' });
                } 

                else 
                {
                    
                    let weather = JSON.parse(body);
                    
                    //  output it in the console just to make sure that the data is there
                    //console.log(weather);
         
                    if (weather.main == undefined && weather.weather == undefined) 
                    {
                        //console.log("ana");
                        res.render('DisplayAlert', { weather: null, error: 'Error, please try again' });
                    } 
                    else
                    {
                      //check for temperature alarms
                        
                       let weatherTemp = `${weather.main.temp}`;
                       console.log(parseInt(weatherTemp));
                        

                      // check for hot weather alert
                      if(parseInt(weatherTemp) >= hotTempAlert)
                      {
                          
                        var hotAlertMessage = "Warning Sir!! Temperature will be higher than 25!";
                      }
                      else
                      {
                        
                       // res.json({  message:"No Heat Wave alarms,Sir!" });
                        var hotAlertMessage = "No Heat Wave alarms,Sir!";
                      }

                      // check for cold weather alert

                      if(parseInt(weatherTemp) <= coldTempAlert)
                      {
                          
                        var coldAlertMessage = "Warning Sir!! Temperature will be lower than 0!";
                      }
                      else
                      {
                        
                       // res.json({  message:"No Heat Wave alarms,Sir!" });
                        var coldAlertMessage = "No Frost alarms,Sir!";
                      }



                      //check for precipitations alert

                      let weatherRain = `${weather.weather[0].main}`;
                      console.log(weatherRain);

                      //Check for rain alert

                     
                      if(weatherRain == rainAlert )
                      {
                        var rainAlarmMessage = 'Warning Sir!! There will be precipitations!';
                      }
                      else
                      {
                        
                        var rainAlarmMessage = 'No precipitations alarms';
                      }
      
                       //render the data to alarm view (DisplayAlert.ejs) before displaying it out
                        setInterval(res.render("DisplayAlert.ejs", { hotAlarmMessage: hotAlertMessage, coldAlarmMessage: coldAlertMessage, precipitationAlarmMessage: rainAlarmMessage }),40,'lucky');
                    
<<<<<<< Updated upstream

=======
                    
  
>>>>>>> Stashed changes
                }
               
              }
          });
        });
    }
};