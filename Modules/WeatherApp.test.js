
const weatherForecast = require('./WeatherForecast.js');
const historicalWeather = require('./HistoricalData.js');
let Immutable = require('immutable');

// json retrived from the API using api tester to see the JSON. 
let forecastData = '{"lat":52.7925,"lon":6.8947,"timezone":"Europe/Amsterdam","timezone_offset":7200,"current":{"dt":1635350483,"sunrise":1635315610,"sunset":1635351130,"temp":14.45,"feels_like":14.17,"pressure":1018,"humidity":85,"dew_point":11.96,"uvi":0,"clouds":99,"visibility":10000,"wind_speed":1.34,"wind_deg":235,"wind_gust":3.13,"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}]},"daily":[{"dt":1635332400,"sunrise":1635315610,"sunset":1635351130,"moonrise":1635365820,"moonset":1635340440,"moon_phase":0.71,"temp":{"day":14.89,"min":11.03,"max":14.92,"night":11.03,"eve":14.13,"morn":12.61},"feels_like":{"day":14.55,"night":10.49,"eve":13.79,"morn":12.25},"pressure":1020,"humidity":81,"dew_point":11.66,"wind_speed":7.68,"wind_deg":223,"wind_gust":14.58,"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":100,"pop":0.01,"uvi":0.83},{"dt":1635418800,"sunrise":1635402122,"sunset":1635437410,"moonrise":1635456360,"moonset":1635429000,"moon_phase":0.75,"temp":{"day":14.97,"min":8.59,"max":15.92,"night":10.33,"eve":11.27,"morn":8.85},"feels_like":{"day":14.32,"night":9.51,"eve":10.44,"morn":6.37},"pressure":1016,"humidity":69,"dew_point":9.31,"wind_speed":5.85,"wind_deg":184,"wind_gust":13.61,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":6,"pop":0,"uvi":1.46},{"dt":1635505200,"sunrise":1635488633,"sunset":1635523691,"moonrise":0,"moonset":1635517020,"moon_phase":0.77,"temp":{"day":15.24,"min":9.15,"max":16.4,"night":14.26,"eve":13.88,"morn":9.15},"feels_like":{"day":14.44,"night":13.44,"eve":12.94,"morn":6.58},"pressure":1007,"humidity":62,"dew_point":8.02,"wind_speed":7.53,"wind_deg":175,"wind_gust":14.88,"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":71,"pop":0,"uvi":1.27},{"dt":1635591600,"sunrise":1635575146,"sunset":1635609973,"moonrise":1635547200,"moonset":1635604740,"moon_phase":0.8,"temp":{"day":15.52,"min":9.93,"max":15.52,"night":13.15,"eve":12.92,"morn":9.93},"feels_like":{"day":14.9,"night":12.53,"eve":12.28,"morn":7.39},"pressure":1009,"humidity":68,"dew_point":9.64,"wind_speed":8.43,"wind_deg":208,"wind_gust":15.32,"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":54,"pop":0.02,"uvi":0.79},{"dt":1635678000,"sunrise":1635661658,"sunset":1635696257,"moonrise":1635638400,"moonset":1635692160,"moon_phase":0.84,"temp":{"day":13.99,"min":10.99,"max":15.08,"night":10.99,"eve":13.16,"morn":14.02},"feels_like":{"day":13.69,"night":10.42,"eve":12.72,"morn":13.33},"pressure":995,"humidity":86,"dew_point":11.7,"wind_speed":9.53,"wind_deg":185,"wind_gust":16.32,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":100,"pop":1,"rain":5.48,"uvi":0.29},{"dt":1635764400,"sunrise":1635748170,"sunset":1635782542,"moonrise":1635729660,"moonset":1635779460,"moon_phase":0.87,"temp":{"day":8.54,"min":8.05,"max":10.14,"night":9.06,"eve":9.2,"morn":8.05},"feels_like":{"day":4.96,"night":5.12,"eve":5.27,"morn":4.56},"pressure":996,"humidity":87,"dew_point":6.49,"wind_speed":9.48,"wind_deg":223,"wind_gust":16.89,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":81,"pop":0.63,"rain":1.19,"uvi":1},{"dt":1635850800,"sunrise":1635834682,"sunset":1635868830,"moonrise":1635821040,"moonset":1635866700,"moon_phase":0.91,"temp":{"day":10.58,"min":8.13,"max":10.73,"night":10.25,"eve":10.73,"morn":8.72},"feels_like":{"day":9.76,"night":9.52,"eve":9.9,"morn":4.99},"pressure":997,"humidity":79,"dew_point":7.05,"wind_speed":9.96,"wind_deg":194,"wind_gust":17.02,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":100,"pop":0.89,"rain":1.92,"uvi":1},{"dt":1635937200,"sunrise":1635921195,"sunset":1635955118,"moonrise":1635912600,"moonset":1635953940,"moon_phase":0.94,"temp":{"day":8.38,"min":7.13,"max":9.23,"night":7.57,"eve":7.13,"morn":8.53},"feels_like":{"day":4.71,"night":4.25,"eve":3.9,"morn":4.66},"pressure":994,"humidity":87,"dew_point":6.42,"wind_speed":10.42,"wind_deg":246,"wind_gust":16.4,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":100,"pop":1,"rain":16.17,"uvi":1}]}'
let jsonData = JSON.parse(forecastData);

// json retrived from the secondAPI using api tester to see the JSON. 

var historicalData = '{"timezone":"Europe\/Amsterdam","state_code":"01","country_code":"NL","lat":52.77917,"lon":6.90694,"city_name":"Emmen","station_id":"062790-99999","data":[{"rh":87,"max_wind_spd_ts":1603227600,"t_ghi":2582.7,"max_wind_spd":5,"solar_rad":23.9,"wind_gust_spd":5,"max_temp_ts":1603227600,"min_temp_ts":1603173600,"clouds":96,"max_dni":756.7,"precip_gpm":5.5,"wind_spd":3.8,"slp":1009.4,"ts":1603144800,"max_ghi":421.6,"temp":9.7,"pres":1007.3,"dni":246.4,"dewpt":7.1,"snow":0,"dhi":28.6,"precip":5.5,"wind_dir":160,"max_dhi":89.8,"ghi":107.6,"max_temp":13.5,"t_dni":5913.6,"max_uv":0.9,"t_dhi":687.5,"datetime":"2020-10-20","t_solar_rad":573.3,"min_temp":6.5,"max_wind_dir":160,"snow_depth":null},{"rh":86.5,"max_wind_spd_ts":1603310400,"t_ghi":2528.9,"max_wind_spd":13,"solar_rad":41,"wind_gust_spd":13,"max_temp_ts":1603306800,"min_temp_ts":1603270800,"clouds":80,"max_dni":753.6,"precip_gpm":7.5,"wind_spd":6.3,"slp":1002,"ts":1603231200,"max_ghi":415.5,"temp":14.6,"pres":999.9,"dni":243.6,"dewpt":12,"snow":0,"dhi":28.3,"precip":7.5,"wind_dir":185,"max_dhi":89.2,"ghi":105.4,"max_temp":18.5,"t_dni":5846.4,"max_uv":1.7,"t_dhi":679.5,"datetime":"2020-10-21","t_solar_rad":983.4,"min_temp":12.2,"max_wind_dir":185,"snow_depth":null},{"rh":83.9,"max_wind_spd_ts":1603317600,"t_ghi":2475.8,"max_wind_spd":10,"solar_rad":88.2,"wind_gust_spd":10,"max_temp_ts":1603364400,"min_temp_ts":1603400400,"clouds":52,"max_dni":750.4,"precip_gpm":0,"wind_spd":5.8,"slp":1008.6,"ts":1603317600,"max_ghi":409.5,"temp":13.9,"pres":1006.4,"dni":240.7,"dewpt":10.7,"snow":0,"dhi":28,"precip":0,"wind_dir":218,"max_dhi":88.7,"ghi":103.2,"max_temp":16.5,"t_dni":5777.8,"max_uv":2.1,"t_dhi":671.5,"datetime":"2020-10-22","t_solar_rad":2116.2,"min_temp":11.2,"max_wind_dir":218,"snow_depth":null},{"rh":93.6,"max_wind_spd_ts":1603486800,"t_ghi":2423.3,"max_wind_spd":5,"solar_rad":44.7,"wind_gust_spd":5,"max_temp_ts":1603458000,"min_temp_ts":1603425600,"clouds":70,"max_dni":747.2,"precip_gpm":0,"wind_spd":3,"slp":1010,"ts":1603404000,"max_ghi":403.5,"temp":11.4,"pres":1007.9,"dni":237.8,"dewpt":10.1,"snow":0,"dhi":27.6,"precip":0,"wind_dir":194,"max_dhi":88.2,"ghi":101,"max_temp":16,"t_dni":5707.9,"max_uv":1.4,"t_dhi":663.4,"datetime":"2020-10-23","t_solar_rad":1073.9,"min_temp":7.7,"max_wind_dir":194,"snow_depth":null},{"rh":89,"max_wind_spd_ts":1603569600,"t_ghi":2371.5,"max_wind_spd":8,"solar_rad":24.7,"wind_gust_spd":8,"max_temp_ts":1603548000,"min_temp_ts":1603519200,"clouds":92,"max_dni":743.9,"precip_gpm":0,"wind_spd":5.5,"slp":1008.6,"ts":1603490400,"max_ghi":397.5,"temp":12.7,"pres":1006.5,"dni":234.9,"dewpt":10.5,"snow":0,"dhi":27.3,"precip":0,"wind_dir":202,"max_dhi":87.7,"ghi":98.8,"max_temp":14.2,"t_dni":5637,"max_uv":0.9,"t_dhi":655.2,"datetime":"2020-10-24","t_solar_rad":593.2,"min_temp":10.1,"max_wind_dir":202,"snow_depth":null},{"rh":87.5,"max_wind_spd_ts":1603576800,"t_ghi":2320.3,"max_wind_spd":9,"solar_rad":16.6,"wind_gust_spd":9,"max_temp_ts":1603591200,"min_temp_ts":1603663200,"clouds":91,"max_dni":740.6,"precip_gpm":5,"wind_spd":5.9,"slp":1001,"ts":1603576800,"max_ghi":391.5,"temp":12.4,"pres":998.9,"dni":222.6,"dewpt":9.9,"snow":0,"dhi":25.9,"precip":5,"wind_dir":195,"max_dhi":87.2,"ghi":92.8,"max_temp":15.1,"t_dni":5565.1,"max_uv":0.8,"t_dhi":646.8,"datetime":"2020-10-25","t_solar_rad":415.6,"min_temp":9.2,"max_wind_dir":195,"snow_depth":null},{"rh":85.7,"max_wind_spd_ts":1603710000,"t_ghi":2269.9,"max_wind_spd":7,"solar_rad":61.2,"wind_gust_spd":7,"max_temp_ts":1603713600,"min_temp_ts":1603692000,"clouds":69,"max_dni":737.3,"precip_gpm":0.5,"wind_spd":5.2,"slp":999.8,"ts":1603666800,"max_ghi":385.6,"temp":9.9,"pres":997.7,"dni":228.9,"dewpt":7.1,"snow":0,"dhi":26.6,"precip":0.5,"wind_dir":191,"max_dhi":86.6,"ghi":94.6,"max_temp":12,"t_dni":5492.5,"max_uv":1.5,"t_dhi":638.4,"datetime":"2020-10-26","t_solar_rad":1468.9,"min_temp":9,"max_wind_dir":191,"snow_depth":null}],"sources":["062790-99999","NLE00109068","NLE00101951","NLE00109283","imerg","merra2","era5","modis"],"city_id":"2756136"}';
var jsonData2 = JSON.parse(historicalData);



//Begin Testing:

test('Test: Add a day based on numbers between  0 and 6',() =>
{
    expect(weatherForecast.AddDay(0)).toBe("Monday ")
});

test('Test: Retrive Year from Date  ',() =>
{
  
  expect(historicalWeather.retriveYear('WedOct212020')).toBe('2020');
});


test('Test: Retrive Day from Date  ',() =>
{
  
  expect(historicalWeather.retriveDayNumber('WedOct212020')).toBe('21');
});



test('Test: Retrive Mounth from Date  ',() =>
{
  
  expect(historicalWeather.retriveMounth('WedOct212020')).toBe('10');
});


test('Test: ConvertDate  ',() =>
{
  
  expect(historicalWeather.joinInformation(historicalWeather.retriveYear('WedOct212020'),historicalWeather.retriveMounth('WedOct212020'),historicalWeather.retriveDayNumber('WedOct212020'))).toBe('2020-10-21');
});

test('Test: Conversion of dates in format YYYY-MM-DD',() =>
 {
     
     var dates = historicalWeather.calculateDates();
     //console.log(dates)

     var convertedDates = historicalWeather.createApiDatesQuerries(dates);
     //console.log(convertedDates)
       
     expect(historicalWeather.createApiDatesQuerries(historicalWeather.calculateDates())).toEqual(convertedDates);
  });
 
test('Test: Convert Mounths from numbers to letters ',() =>
  {
    expect(historicalWeather.convertMounthToLetters("02")).toBe("Feb");
  });
 
test('Test: Automatic conversion of dates',() =>
  {
      
      var dates = historicalWeather.calculateDates();
      //console.log(dates)
 
      var convertedDates = historicalWeather.createApiDatesQuerries(dates);
      //console.log(convertedDates)

        
      expect(historicalWeather.returnDatesForApi()).toEqual(convertedDates);
   });

test('Test: Make the average of an array[int]  ',() =>
   {
     var array = [6,4,2];
     
     expect(historicalWeather.makeAverage(array)).toBe(4);
   });





test('Test: Store temperature in an hight temperature array from JSON' ,() =>
{
    const arrayHighTemp = [
        [ 'Monday ', 14.92 ],
        [ 'Tuesday ', 15.92 ],
        [ 'Wednesday ',16.4 ],
        [ 'Thursday ', 15.52 ],
        [ 'Friday ', 15.08 ],
        [ 'Saturday ', 10.14 ],
        [ 'Sunday ', 10.73 ]
      ];
    expect(weatherForecast.storeTemperatures("max",jsonData)).toEqual(arrayHighTemp)
});

test('Test: Store the wind speed from JSON',() =>
 {
     const windSpeeds = [
        [ 'Monday ', 7.68 ],
        [ 'Tuesday ', 5.85 ],
        [ 'Wednesday ', 7.53 ],
        [ 'Thursday ', 8.43 ],
        [ 'Friday ', 9.53 ],
        [ 'Saturday ', 9.48 ],
        [ 'Sunday ', 9.96 ]
      ];
     expect(weatherForecast.retainWindSpeeds(jsonData)).toEqual(windSpeeds)
 });

test('Test: Add a day based on numbers between  0 and 6',() =>
{
    const windDirection = [
        [ 'Monday ', 'SW' ],
        [ 'Tuesday ', 'S' ],
        [ 'Wednesday ', 'S' ],
        [ 'Thursday ', 'SSW' ],
        [ 'Friday ', 'S' ],
        [ 'Saturday ', 'SW' ],
        [ 'Sunday ', 'SSW' ]
      ];
      
    expect(weatherForecast.calculateWindDirection(jsonData)).toEqual(windDirection)
 });

test('Test: Calculate a year from this moment in dates which are stored in an array',() =>
{
    
  var now = new Date();
  var oneYearDate = new Date();   
  oneYearDate.setDate( now.getDate() - 6 );
  oneYearDate.setFullYear( now.getFullYear() - 1 );
  var dates = [];
  for(var d = oneYearDate; d <= now; d.setDate(d.getDate() + 1))
  {
      var date = new Date(d).toString().slice(0,15).split(" ").join("");
      dates.push(date);
  }
      
    expect(historicalWeather.calculateDates()).toEqual(dates);
 });

test('Test: Loop through a 7 Days JSON weather info and retain info',() =>
  {
     var info = {}
     info.temperatures = [13,18, 16, 16, 14,15, 12];
     info.dates = ['2020-10-20','2020-10-21','2020-10-22','2020-10-23','2020-10-24','2020-10-25','2020-10-26'];
      
      expect(historicalWeather.loopThroughDays(jsonData2)).toEqual(info);
   });


 