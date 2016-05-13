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

var main = new UI.Card({
    title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors


});


function success(pos) {
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
   var lat=pos.coords.latitude;
   var lng=pos.coords.longitude;
   var sun=SunCalc.getTimes(/*Date*/ date, /*Number*/ lat, /*Number*/ lng);
   var sun2=SunCalc.getTimes(/*Date*/ tomorrow, /*Number*/ lat, /*Number*/ lng);
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
   menu.show();


}

function error(err) {
  console.log('location error (' + err.code + '): ' + err.message);
  lat=0;
  lng=0;
  return lat,lng;
}

// Choose options about the data returned
var options = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 10000
};

// Request current position
navigator.geolocation.getCurrentPosition(success, error);


main.show();

