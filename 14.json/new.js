var data;

function preload() {
  // dati caricati da locale
    data = loadJSON("data.json");
}

function setup() {
    noCanvas();

    createElement('h1', data.description,' from JSON file');
    createElement('h2',' from JSON file');
    createP(data.source);

    createElement('div').id("birds");
    var div1 = select('#birds');
    div1.style('width','500px');
    div1.style('height','300px');
    div1.style('overflow','scroll');
    // div1.style('padding-left','150px');

    var birds = data.birds;


    for (var i = 0; i < birds.length; i++) {
        createElement('h2', birds[i].family).parent('#birds');
        var list = createElement('ul').parent('#birds');
        for (var j = 0; j < birds[i].members.length; j++) {
            createElement('li', birds[i].members[j]).parent(list);
        }
    }

    // dati caricati da URL
    loadJSON("http://api.open-notify.org/iss-now.json",gotData);

    createElement('h1', 'International Space Station Current Location');
    createElement('h2',' from JSON file :').id('title');
    createA('http://api.open-notify.org/iss-now.json','http://api.open-notify.org/iss-now.json').parent('#title');

    createElement('div').id("ISS");
    div1 = select('#ISS');




}

function gotData(data){
   createElement('ul').parent('#ISS');

   createElement('li').id('timeStamp').parent('#ISS');
   select('#timeStamp').html('Timestamp: ' + data.timestamp);

   createElement('li').id('latitude').parent('#ISS');
   select('#latitude').html('Latitude: ' + data.iss_position.latitude);

   createElement('li').id('longitude').parent('#ISS');
   select('#longitude').html('Longitude: ' + data.iss_position.longitude);

}
