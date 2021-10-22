var tempAlert = 25;
var trigger = false;


module.exports.hotAlarm=function(temperature)
{ 
   if( temperature >= tempAlert)
   {
      
      console.log('pula');
      trigger = true;
      console.log(trigger);

   }
   else
   {
 
      console.log('trigger');
      console.log(trigger);
     

      // playAlert('purr');
       //playAlert.volume(0.5);
   }

   return trigger;
};
