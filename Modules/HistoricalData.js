var historicalApiKey = '49570502e947409ab8f87aa2a8a13608';
var lon = 6.8947;
var lat = 52.7925;
var url = `https://api.weatherbit.io/v2.0/history/daily?city=Emmen&start_date=2020-10-21&end_date=2020-10-25&key=${historicalApiKey}`;
var request = require('request');

module.exports = {
    historicalData: function(app)
    {
        app.get('/HistoricalData', function(req, res) 
        {

            // Request for data using the URL
            request(url, function(err, response, body) {
                
                // On return, check the json data fetched

                if (err) 
                {
                    res.render('HistoricalData', { weather: null, error: 'Error, please try again' });
                } 

                else 
                {
                    
                    let weather = JSON.parse(body);
  
         
                    if (weather == undefined) 
                    {
                        //console.log("ana");
                        res.render('HistoricalData', { weather: null, error: 'Error, please try again' });
                    } 
                    else
                    {
                       console.log(calculateDates()[0]);
                       //res.render('HistoricalData',{ });
                    }
               
                }
          });
        });
    }
};

function calculateDates()
{
    var now = new Date();
    var daysOfYear = [];
    for(var d = new Date(2020,10,25); d <= now; d.setDate(d.getDate() + 1))
    {
        var date = new Date(d).toString().slice(0,10).split(" ").join("");
        daysOfYear.push(date);
    }
    retriveMounth(daysOfYear[0]);
    return daysOfYear;

}

function retriveMounth(date)
{
   var mounth = date.slice(3,6);
   console.log(mounth);
}
