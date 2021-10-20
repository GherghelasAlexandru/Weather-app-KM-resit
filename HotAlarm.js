var temperatureAlert = 14;
var sensor = false;
const api = "ea17eb5501a9d76bed7c68dd09c044dd"; 
const cityName = 'Emmen';
const alarmSounds = new Audio('/Resources/Sounds/AlarmSound.mp3');

let alert = setInterval(AlarmTrigger(temperatureAlert),6000);

function AlarmTrigger ( temperatureAlert )
{
    base = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`;
    
    fetch(base)
   .then((response) => 
   {
       return response.json();
   })
   .then((data) => 
   {
       var temperature = parseInt(data.main['temp']);
       console.log(temperature);
       if(temperature > temperatureAlert)
       {
           sensor = true;
           fireAlarm();
           console.log("Alert!");
       }
   });     
}


function fireAlarm ()
{
   alarmNotification();
   alarmSound();
   
}

function alarmSound()
{
    alarmSounds.muted = true;
    alarmSounds.play();

}

function alarmNotification()
{
    var hotAlarm = document.querySelector('.hotAlarm');
   hotAlarm.textContent = "Sir, please pay attention! Temperature will get higher than 25 C!";
}




