var historicalApiKey = '49570502e947409ab8f87aa2a8a13608';
var city = 'Emmen';
var mainUrl = `https://api.weatherbit.io/v2.0/history/daily?city=Emmen&start_date=2020-10-21&end_date=2020-10-25&key=${historicalApiKey}`;
var request = require('request');


module.exports = {
    historicalData: function(app)
    {
        app.get('/HistoricalData', function(req, res) 
        {
            

            // Request for data using the URL
            request(mainUrl, function(err, response, body) 
            {
                
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
                        //loopThroughDays(weather);
                       //console.log(weather.data[0].max_temp);
                       //console.log(calculateDates()[0]);
                       //createApiDatesQuerries(calculateDates());
                       //res.render('HistoricalData',{ });
                       
                       
                    }
               
                }
            });

            makeRequest(returnDatesForApi());

            

             



        });
    }
};


// calculate the curent date, and  one year back
function calculateDates()
{
    var now = new Date();
    var oneYearDate = new Date();   
    oneYearDate.setDate( now.getDate() - 6 );
    oneYearDate.setFullYear( now.getFullYear() - 1 );
    var daysOfYear = [];
    for(var d = oneYearDate; d <= now; d.setDate(d.getDate() + 1))
    {
        var date = new Date(d).toString().slice(0,15).split(" ").join("");
        daysOfYear.push(date);
    }
    //retriveYear(daysOfYear[0]);
    return daysOfYear;

}

function returnDatesForApi()
{
    return createApiDatesQuerries(calculateDates());
}


// in this API case, to retrive information for one year, the maximum number of days in one request is 7 days.
// therefore in the querries array there will be 7 days  entries for the API; 
function createApiDatesQuerries()
{
    //console.log(daysOfYear);
    var querries = {};
    querries.startDates = new Array();
    querries.endDates = new Array();
    var startDate;
    var days = calculateDates();
    //console.log(days.length);
    var numberDaysWeek = 0;

    for(i = 0; i < days.length; i++)
    {
        //console.log(i);
        if(numberDaysWeek == 0 )
        {
            querries.startDates.push(conversion(days[i]));
            numberDaysWeek ++;
        }
        else if(numberDaysWeek == 7)
        {
           // console.log(numberDaysWeek);
           
            querries.endDates.push(conversion(days[i]));
            numberDaysWeek = 0;
            startDate = "";

        }
        else
        {
        numberDaysWeek ++;
        }
      
       
    }
    //console.log(querries.startDates);
    return querries;

   // console.log(startQuerries);
  // console.log(stopQuerries[0]);
  // console.log(convertYear(stopQuerries[0]));
  // console.log(transformMounth(stopQuerries[0]));
  // console.log(stopQuerries[0]);
   //console.log(convertNumber(stopQuerries[0]));
   //console.log(joinInformation(convertYear(startQuerries[0]),transformMounth(startQuerries[0]),convertNumber(startQuerries[0])));

}


function loopThroughDays(weather)
{
   // console.log("ana");
   
   var oneDay = {};
   oneDay.temperatures = new Array();
   oneDay.mounths = new Array();
   for( i = 0; i < 7; i++)
   { 
       console.log(weather.data[i].max_temp);
       
      oneDay.temperatures.push(weather.data[i].max_temp);
      oneDay.mounths.push(weather.data[i].datetime);
   }

  // console.log(oneDay);
}

function structureData()
{







}

function makeRequest(querries)
{
    

    var information = {};
    information.mounths = "";
    information.temperatures = new Array();
    //console.log(querries.startDates[0],querries.endDates[0]);
    
    var url ="";
    for(i = 0; i <= querries.startDates.length - 2; i++)
    {
        
            //console.log(querries.endDates[i]);
             
             url = `https://api.weatherbit.io/v2.0/history/daily?city=${city}&start_date=${querries.startDates[i]}&end_date=${querries.endDates[i]}&key=${historicalApiKey}`;
             console.log(url);
            request(url, function(err, response, body) {
                        
                // On return, check the json data fetched

                if (err) 
                {
                    res.render('HistoricalData', { weather: null, error: 'Error, please try again' });
                } 

                else 
                {
                    //console.log(body);
                    removeByteOrderMark(body);
                   
                    let weather = JSON.parse(body);

                    

                   // console.log(weather);

        
                    if (weather == undefined) 
                    {
                        //console.log("ana");
                        res.render('HistoricalData', { weather: null, error: 'Error, please try again' });
                    } 
                    else
                    {
                       // console.log(weather);
                          loopThroughDays(weather);
                    }
            
                }
            });

   }
   
}







//functions required to work and convert dates in the api required format

function retriveDayNumber(date)
{
    var dayNumber = date.slice(6,8);
    return dayNumber;
}



function retriveYear(date)
{
    var year = date.slice(8,14);
    return year;
}


function retriveDay(date)
{
    var day = date.slice(0,3);
    return day;
}

function convertYear(date)
{
    return retriveYear(date);
}

function retriveMounth(date)
{
   var mounth = convertMounth(date.slice(3,6));
   return mounth;
}

function transformMounth(mounth)
{
    return retriveMounth(mounth);
}

function convertNumber(date)
{
    return retriveDayNumber(date);
}

// create new format YYYY-MM-DD

function joinInformation(year,mounth,day)
{
    var apiDate = year + "-" + mounth + "-" + day;
    return apiDate;
}

/// put together the puzzle pices
function conversion (date)
{

   var newDateFormat = joinInformation(convertYear(date),transformMounth(date),convertNumber(date));

   return newDateFormat;


}


function makeAverage(array)
{
    var average;
    for(i = 0; i < array.length; i++)
    {
        average = average + array[i];
    }

    return average;
}


function convertMounth(month)
{
    switch(month)
    {
        case "Jan":
            return "01";
        
        case "Feb":
             return "02";

        case "Mar":
             return "03";

        case "Apr":
             return "04";

        case "May":
             return "05";

        case "Jun":
             return "06";

        case "Jul":
             return "07";

        case "Aug":
             return "08";


        case "Sep":
             return "09";

        case "Oct":
             return "10";

        case "Nov":
             return "11";

        case "Dec":
             return "12";

    }
}

function removeByteOrderMark(str)
{
    return str.replace(/^\ufeff/g,"");
}


