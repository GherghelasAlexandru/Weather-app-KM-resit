var hotAlert = 15;

const alarmSounds = new Audio('/Resources/Sounds/AlarmSound.mp3');
const api = "ea17eb5501a9d76bed7c68dd09c044dd"; 
const cityName = 'Emmen';
const base = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`;




function HotAlarmTrigger ( temperatureAlert )
{

    
    fetch(base)
   .then((response) => 
   {
       return response.json();
   })
   .then((data) => 
   {
       var temperature = parseInt(data.main['temp']);
       console.log(temperature);
       if(temperature >= hotAlert)
       {
          
           fireHotAlarm();
           console.log("Alert!");
       }
   });     
}


function fireHotAlarm ()
{
   alarmHotNotification();
   alarmSound();
   
}

function alarmSound()
{
    alarmSounds.muted = true;
    alarmSounds.play();

}

function alarmHotNotification()
{
   var hotAlarm = document.querySelector('.hotAlarm');
   hotAlarm.textContent = "Sir, please pay attention! Temperature will get higher than 25 C!";
}




