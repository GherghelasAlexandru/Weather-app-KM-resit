var temperatureAlert = 16;

const alarmSounds = new Audio('/Resources/Sounds/AlarmSound.mp3');

setInterval(AlarmTrigger(temperatureAlert),6000);


function AlarmTrigger ( temperatureAlert )
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
       if(temperature >= temperatureAlert)
       {
          
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




