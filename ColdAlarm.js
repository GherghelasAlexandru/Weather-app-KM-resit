var temperatureAlert = 0;


setInterval(AlarmTrigger(temperatureAlert),60000);


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
       if(temperature < temperatureAlert)
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
   var coldAlarm = document.querySelector('.coldAlarm');
   coldAlarm.textContent = "Sir, please pay attention! Temperature will get lower than 0 C!";
}


