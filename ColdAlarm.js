var coldAlert = 1;


function ColdAlarmTrigger ()
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
       if(temperature <= coldAlert)
       {
           fireColdAlarm();
           console.log("Alert!");
       }
   });     
}


function fireColdAlarm ()
{
   alarmColdNotification();
   alarmSound();
   
}

function alarmSound()
{
    alarmSounds.muted = true;
    alarmSounds.play();

}

function alarmColdNotification()
{
   var coldAlarm = document.querySelector('.coldAlarm');
   coldAlarm.textContent = "Sir, please pay attention! Temperature will get lower than 0 C!";
}


