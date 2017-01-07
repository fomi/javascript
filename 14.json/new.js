var data;

function preload() {
    // dati caricati da locale
    data = loadJSON("data.json");
}

function setup() {
    noCanvas();

    createElement('h1', data.description, ' from JSON file');
    createElement('h2', ' from JSON file');
    createP(data.source);

    createElement('div').id("birds");
    var div1 = select('#birds');
    div1.style('width', '500px');
    div1.style('height', '300px');
    div1.style('overflow', 'scroll');
    // div1.style('padding-left','150px');

    var birds = data.birds;


    for (var i = 0; i < birds.length; i++) {
        createElement('h2', birds[i].family).parent('#birds');
        var list = createElement('ul').parent('#birds');
        for (var j = 0; j < birds[i].members.length; j++) {
            createElement('li', birds[i].members[j]).parent(list);
        }
    }

    // dati caricati da URL serva una funzione di callback -->gotaData
    loadJSON("http://api.open-notify.org/iss-now.json", gotData);

    createElement('h1', 'International Space Station Current Location');
    createElement('h2', ' from JSON file :').id('title');
    createA('http://api.open-notify.org/iss-now.json', 'http://api.open-notify.org/iss-now.json').parent('#title');

    createElement('div').id("ISS");
    div1 = select('#ISS');


    //-------------------------------------------

    loadJSON("http://api.openweathermap.org/data/2.5/weather?q=Rovereto&units=metric&appid=c680a70a452b9e623d92b371e15d6298", gotDataWeather);
    createElement('h1', 'Weather in Rovereto');
    //-------------------------------------------


}

function gotDataWeather(data) {
    createElement('table').id('roveretoTable');

    //latitudine
    createElement('tr').id('latitudeRow');
    createElement('th', 'Latitude').parent('#latitudeRow');
    createElement('td', data.coord.lat).parent('#latitudeRow');
    //longitudine
    createElement('tr').id('longitudeRow');
    createElement('th', 'Longitude').parent('#longitudeRow');
    createElement('td', data.coord.lon).parent('#longitudeRow');
    //tempereatura
    createElement('tr').id('tempRow');
    createElement('th', 'Temperature').parent('#tempRow');
    createElement('td', data.main.temp).parent('#tempRow');
    //tempereatura max
    createElement('tr').id('tempMaxRow');
    createElement('th', 'Temperature max').parent('#tempMaxRow');
    createElement('td', data.main.temp_max).parent('#tempMaxRow');
    //tempereatura min
    createElement('tr').id('tempMinRow');
    createElement('th', 'Temperature min').parent('#tempMinRow');
    createElement('td', data.main.temp_min).parent('#tempMinRow');
    //pressione
    createElement('tr').id('pressureRow');
    createElement('th', 'Pressure').parent('#pressureRow');
    createElement('td', data.main.pressure).parent('#pressureRow');
    //umidità
    createElement('tr').id('humidityRow');
    createElement('th', 'Humidity').parent('#humidityRow');
    createElement('td', data.main.humidity).parent('#humidityRow');
    //descrizione
    createElement('tr').id('descriptionRow');
    createElement('th', 'Description').parent('#descriptionRow');
    createElement('td', data.weather[0].description).parent('#descriptionRow');
}

function gotData(data) {
    createElement('ul').parent('#ISS');

    createElement('li').id('timeStamp').parent('#ISS');
    select('#timeStamp').html('Timestamp: ' + data.timestamp);

    createElement('li').id('latitude').parent('#ISS');
    select('#latitude').html('Latitude: ' + data.iss_position.latitude);

    createElement('li').id('longitude').parent('#ISS');
    select('#longitude').html('Longitude: ' + data.iss_position.longitude);

}
