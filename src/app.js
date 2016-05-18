/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var SunCalc = require('./suncalc');
    
var date = new Date();
var tomorrow= new Date();
tomorrow.setDate(tomorrow.getDate() + 1)  ;
var lat=10;
var lng=0; 

var card=new UI.Card({
  
  status: {
    backgroundColor: 'grey' 
  },
  title: 'waiting',
  subtitle: 'waiting',
  body: 'waiting' ,
  backgroundColor: 'blue',
  bodyColor: 'white',
  titleColor: 'gray',
  subtitleColor: 'light-gray',
});


var main = new UI.Card({
    title: 'Blue Hour',
  subtitle: 'Getting geolocation',
  body: 'Please wait',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});


function success(pos) {
  main.hide();
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
   var lat=pos.coords.latitude;
   var lng=pos.coords.longitude;
   var sun, sun2,affichage;
   
    sun=SunCalc.getTimes(/*Date*/ date, /*Number*/ lat, /*Number*/ lng);
    sun2=SunCalc.getTimes(/*Date*/ tomorrow, /*Number*/ lat, /*Number*/ lng);
   if (date < sun.sunrise ) {
     affichage=1;
     console.log('case 1');
   }
   else if (date > sun.sunrise & date < sun.goldenHourEnd) {
     affichage=2;
     console.log('case 2');
   }
   else if (date > sun.goldenHourEnd & date < sun.sunset) {
     affichage=3;
     console.log('case 3');
   }
   else if (date > sun.sunset & date < sun.dusk) {
     affichage=4;
     console.log('case 4');
   }
   else if (date > sun.dusk) {
     affichage=5;
     console.log('case 5 '+sun.dusk);
   }
  else {console.log('qqchose ne va pas '+date+' '+sun.dusk+'');
        affichage=1;
       }
   defcard(affichage,sun,sun2);
   console.log('on va jusque là'); 
  
  
     var menu = new UI.Menu({
     sections: [{
      items: [{
        title:  'Time',
        subtitle: date
      }, {
        title: 'Golden Hour Evening',
        subtitle: sun.goldenHour.getHours() + ':' + sun.goldenHour.getMinutes()
      }, {
        title: 'Sunset',
        subtitle: sun.sunset.getHours() + ':' + sun.sunset.getMinutes()
      }, {
        title: 'Blue hour end',
        subtitle: sun.dusk.getHours() + ':' + sun.dusk.getMinutes()
      }, {
        title: 'Blue Hour Morning',
        subtitle: sun2.dawn.getHours() + ':' + sun2.dawn.getMinutes()
      }, {
        title: 'Sunrise',
        subtitle: sun2.sunrise.getHours() + ':' + sun2.sunrise.getMinutes()
      }, {
        title: 'Golden Hour end',
        subtitle: sun2.goldenHourEnd.getHours() + ':' + sun2.goldenHourEnd.getMinutes()
      }]
    }]
  });
  
  
  
  
card.on('click', 'up', function() {
  console.log('Up clicked!');
     affichage=affichage-1;
     if (affichage<2){affichage=5;}
     defcard(affichage,sun,sun2);
});
card.on('click', 'down', function() {
  console.log('down clicked!');
     affichage=affichage+1;
     if (affichage>5){affichage=2;}
     defcard(affichage,sun,sun2);
});
card.on('click', 'select', function() {
  console.log('select clicked!');
  menu.show();
});
/*   card.on('click','up' function() {
     console.log('up');
     affichage=affichage+1;
     if (affichage==6){affichage=1;}
     console.log('click down'+affichage);
     defcard(affichage,sun,sun2);
   });*/
  
  
}

function error(err) {
  console.log('location error (' + err.code + '): ' + err.message);
  lat=0;
  lng=0;
  var erooor = new UI.Card({
    title: 'Error',
    subtitle: 'Getting geolocation',
    body: 'Please restart',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
    });
   erooor.show();
  return lat,lng;
}

function defcard(affichage,sun,sun2){
  var background,titre,sub,heuredeb,heurefin;
  
  console.log(sun.dawn);
  if (affichage==1) {
     background='#55AAFF';
     titre='Blue hour';
     sub='Morning';
     heuredeb=sun.dawn;
     heurefin=sun.sunrise;
     console.log('case 1');
   }
   else if (affichage==2) {
     background='#FFAA00';
     titre='Golden hour';
     sub='Morning';
     heuredeb=sun.sunrise;
     heurefin=sun.goldenHourEnd;
     console.log('case 2');
   }
   else if (affichage==3) {
     background='#FFAA00';
     titre='Golden hour';
     sub='Evening';
     heuredeb=sun.goldenHour;
     heurefin=sun.sunset;
     console.log('case 3');
   }
   else if (affichage==4) {
     background='#55AAFF';
     titre='Blue hour';
     sub='Evening';
     heuredeb=sun.sunset;
     heurefin=sun.dusk;
     console.log('case 4');
   }
   else if (affichage==5) {
     background='#55AAFF';
     titre='Blue hour';
     sub='Morning';
     heuredeb=sun2.dawn;
     heurefin=sun2.sunrise;
     console.log('case 5 '+sun.dusk);
   }
  else {console.log('qqchose ne va pas '+date+' '+sun.dusk+'');}
  
  card.title(titre);
  card.subtitle(sub);
  card.body(' Begin at : '+heuredeb.getHours() + ':' + heuredeb.getMinutes() +
    '\n End at : '+heurefin.getHours() + ':' + heurefin.getMinutes());
  card.backgroundColor(background);
  card.bodyColor('black');
  card.titleColor('gray');
  card.subtitleColor('light-gray');
  card.show();
}

// Request current position
navigator.geolocation.getCurrentPosition(success, error);


main.show();






