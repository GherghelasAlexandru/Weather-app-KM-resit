var historicalApiKey = 'b2037f4f67124b3e82172acfc775651b';
var city = 'Emmen';
let Immutable = require('immutable');
var request = require('request');
var historicalData = [];

// creating and pre setting a map for storing values per mounths 

module.exports = {
    historicalData: function(app)
    {

        app.get('/HistoricalData', function(req, res) 
        {
            makeRequest(returnDatesForApi(),req,res);

        });
    }
};



// calculate the curent date, and  one year back from this date and store everything in one Array 
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



// in this API case, to retrive information for one year, the maximum number of days in one request is 7 days.
// Therefore, the API call should have a start and end date for 7 days

function createApiDatesQuerries()
{

    // make pairs of dates, start - end, at same pozition in array
    var querries = {};
    querries.startDates = new Array();
    querries.endDates = new Array();

    //calculate the dates
    var days = calculateDates();

    var numberDaysWeek = 0;

    for(i = 0; i < days.length; i++)
    {
        // when 0 store the date, as startDate, and increment after 
        if(numberDaysWeek == 0 )
        {
            querries.startDates.push(conversion(days[i]));
            numberDaysWeek ++;
        }
        // when 7, store the date, as endDate, and reset the days
        else if(numberDaysWeek == 7)
        {
        
            querries.endDates.push(conversion(days[i]));
            numberDaysWeek = 0;

        }
        // just increment
        else
        {
        numberDaysWeek ++;
        }
      
       
    }
    
    return querries;
}


// create an array with start and end dates, ready to be used in calling multiple requests on API
function returnDatesForApi()
{
    return createApiDatesQuerries(calculateDates());
}





// retrive and store information per 7 days period
function loopThroughDays(weather)
{  
   var oneWeek = {};
   oneWeek.temperatures = new Array();
   oneWeek.dates = new Array();
   for( i = 0; i < 7; i++)
   { 
      // console.log(weather.data[i].max_temp);
       
      oneWeek.temperatures.push(parseInt(weather.data[i].max_temp));
      oneWeek.dates.push(weather.data[i].datetime);
   }

  return oneWeek;
}


// organize data per mounth with a map
function structureData(oneWeek)
{

    let map = Immutable.Map({
        Jan: [],
        Feb: [],
        Mar: [],
        Apr: [],
        May: [],
        Jun: [],
        Jul: [],
        Aug: [],
        Sep: [],
        Oct: [],
        Nov: [],
        Dec: []
    });
    

   
   for(i = 0; i < oneWeek.dates.length; i++)
   {
  // console.log(map.get(helpOrganize(oneWeek.dates[i])));
  //  console.log(oneWeek.temperatures[i]);
     map.get(helpOrganize(oneWeek.dates[i])).push(oneWeek.temperatures[i]);
      
   }

   return map;

}

function mergeMaps(map1,map2)
{
    var merged = new Map([map1,map2]);
    console.log(merged);
}

function addMaps(map)
{

}
// make average per every mounth 
function chartInterpretation(data)
{
      var keys = Array.from(data.keys());
     // console.log(keys);
      var average;
      
      for( i = 0; i < keys.length; i++)
      {
         // console.log(data.get(keys[i]));
          average = makeAverage(data.get(keys[i]));
          data.set(keys[i],average);
      }



}



function makeRequest(querries,req)
{

        let organizedTemperaturesMap = Immutable.Map({
            Jan: [],
            Feb: [],
            Mar: [],
            Apr: [],
            May: [],
            Jun: [],
            Jul: [],
            Aug: [],
            Sep: [],
            Oct: [],
            Nov: [],
            Dec: []
        });

        var increment;
        
        //console.log(querries.startDates[0],querries.endDates[0]);
   
       
        var url ="";
        for(i = 0; i <= querries.startDates.length - 2; i++)
        {

              
            
                //console.log(querries.endDates[i]);
                
                url = `https://api.weatherbit.io/v2.0/history/daily?city=${city}&start_date=${querries.startDates[i]}&end_date=${querries.endDates[i]}&key=${historicalApiKey}`;
                // console.log(url);
                request(url, function(err, response, body) 
                {

                    // On return, check the json data fetched
                    if (err) 
                    {
                        res.render('HistoricalData', { weather: null, error: 'Error, please try again' });
                    } 

                    else 
                    {
                        //console.log(body)
                        let weather = JSON.parse(body);

                        //console.log(weather);

            
                        if (weather == undefined) 
                        {
                            //console.log("ana");
                            res.render('HistoricalData', { weather: null, error: 'Error, please try again' });
                        } 
                        else
                        {
                            var weeklyInfo = structureData(loopThroughDays(weather),organizedTemperaturesMap);
                            console.log(organizedTemperaturesMap.merge(weeklyInfo).toJS().Oct);

                            if( i ==  querries.startDates.length - 2)
                            {
                                res.render('HistoricalData',{increment:increment})
                            }
                            else
                            {
                            increment++;
                            }
                           
                           
                        }
                
                    }

                    
                });  

         
        }       

        
}







//functions required to work and convert dates in the api required format

function reconvert(date)
{
   return date.slice(5,7);
}

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
   var mounth = convertMounthToNumber(date.slice(3,6));
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
    return average/array.length;
}


function convertMounthToNumber(month)
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

function helpOrganize(date)
{
   return convertMounthToLetters(reconvert(date));
}

function convertMounthToLetters(month)
{
    switch(month)
    {
        case "01":
            return "Jan";
        
        case "02":
             return "Feb";

        case "03":
             return "Mar";

        case "04":
             return "Apr";

        case "05":
             return "May";

        case "06":
             return "Jun";

        case "07":
             return "Jul";

        case "08":
             return "Aug";


        case "09":
             return "Sep";

        case "10":
             return "Oct";

        case "11":
             return "Nov";

        case "12":
             return "Dec";

    }
}


function removeByteOrderMark(str)
{
    return str.replace(/^\ufeff/g,"");
}