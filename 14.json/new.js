var data;
var weatherFlag = 0;
var issFlag = 0;

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

    // dati caricati da URL serve una funzione di callback -->gotaData
    // loadJSON("http://api.open-notify.org/iss-now.json", gotData, 'jsonp');



    createElement('h1', 'International Space Station Current Location');
    createElement('h2', ' from JSON file :').id('title');
    createA('http://api.open-notify.org/iss-now.json', 'http://api.open-notify.org/iss-now.json').parent('#title');
    createElement('div').id("ISS");

    updateISSPosition();


    //-------------------------------------------
    //-------------------------------------------
    createElement('div').id("weatherRovereto");
    loadJSON("http://api.openweathermap.org/data/2.5/weather?q=Rovereto&units=metric&appid=c680a70a452b9e623d92b371e15d6298", gotRoveretoDataWeather);
    createElement('h1', 'Weather in Rovereto').parent('#weatherRovereto');
    //-------------------------------------------
    //-------------------------------------------

    createElement('div').id('weatherNow');
    createElement('h1', 'Weather right now').parent('#weatherNow');
    createElement('input').id('city').value('London').parent('#weatherNow');
    createElement('button', 'Submit').id('submit').parent('#weatherNow');



    var button = select('#submit');
    button.mousePressed(weatherQuery);

}

function askISS() {
    if (issFlag == 1) {
        var oldList = select('#issList');
        oldList.remove();
    }
    loadJSON("http://api.open-notify.org/iss-now.json", gotData);
    issFlag = 1;
}

function updateISSPosition() {

    setInterval(askISS, 3000);
}

function weatherQuery() {

    var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var cityQuery = select('#city');
    var city = cityQuery.value();
    var units = '&units=metric';
    var apiKey = '&appid=c680a70a452b9e623d92b371e15d6298';
    url = api + city + units + apiKey;
    if (weatherFlag == 1) {
        var oldTable = select('#weatherTable');
        oldTable.remove();
    }
    loadJSON(url, gotDataWeather);
}

function gotDataWeather(data) {
    weatherFlag = 1;
    createElement('table').id('weatherTable').parent('#weatherNow');

    //latitudine
    createElement('tr').id('latitudeRow').parent('#weatherTable');
    createElement('th', 'Latitude').parent('#latitudeRow');
    createElement('td', data.coord.lat).parent('#latitudeRow');
    //longitudine
    createElement('tr').id('longitudeRow').parent('#weatherTable');
    createElement('th', 'Longitude').parent('#longitudeRow');
    createElement('td', data.coord.lon).parent('#longitudeRow');
    //tempereatura
    createElement('tr').id('tempRow').parent('#weatherTable');
    createElement('th', 'Temperature').parent('#tempRow');
    createElement('td', data.main.temp).parent('#tempRow');
    //tempereatura max
    createElement('tr').id('tempMaxRow').parent('#weatherTable');
    createElement('th', 'Temperature max').parent('#tempMaxRow');
    createElement('td', data.main.temp_max).parent('#tempMaxRow');
    //tempereatura min
    createElement('tr').id('tempMinRow').parent('#weatherTable');
    createElement('th', 'Temperature min').parent('#tempMinRow');
    createElement('td', data.main.temp_min).parent('#tempMinRow');
    //pressione
    createElement('tr').id('pressureRow').parent('#weatherTable');
    createElement('th', 'Pressure').parent('#pressureRow');
    createElement('td', data.main.pressure).parent('#pressureRow');
    //umidità
    createElement('tr').id('humidityRow').parent('#weatherTable');
    createElement('th', 'Humidity').parent('#humidityRow');
    createElement('td', data.main.humidity).parent('#humidityRow');
    //descrizione
    createElement('tr').id('descriptionRow').parent('#weatherTable');
    createElement('th', 'Description').parent('#descriptionRow');
    createElement('td', data.weather[0].description).parent('#descriptionRow');
}

function gotRoveretoDataWeather(data) {
    createElement('table').id('roveretoTable').parent('weatherRovereto');

    //latitudine
    createElement('tr').id('rovLatitudeRow').parent('#roveretoTable');
    createElement('th', 'Latitude').parent('#rovLatitudeRow');
    createElement('td', data.coord.lat).parent('#rovLatitudeRow');
    //longitudine
    createElement('tr').id('rovLongitudeRow').parent('#roveretoTable');
    createElement('th', 'Longitude').parent('#rovLongitudeRow');
    createElement('td', data.coord.lon).parent('#rovLongitudeRow');
    //tempereatura
    createElement('tr').id('rovTempRow').parent('#roveretoTable');
    createElement('th', 'Temperature').parent('#rovTempRow');
    createElement('td', data.main.temp).parent('#rovTempRow');
    //tempereatura max
    createElement('tr').id('rovTempMaxRow').parent('#roveretoTable');
    createElement('th', 'Temperature max').parent('#rovTempMaxRow');
    createElement('td', data.main.temp_max).parent('#rovTempMaxRow');
    //tempereatura min
    createElement('tr').id('rovTempMinRow').parent('#roveretoTable');
    createElement('th', 'Temperature min').parent('#rovTempMinRow');
    createElement('td', data.main.temp_min).parent('#rovTempMinRow');
    //pressione
    createElement('tr').id('rovPressureRow').parent('#roveretoTable');
    createElement('th', 'Pressure').parent('#rovPressureRow');
    createElement('td', data.main.pressure).parent('#rovPressureRow');
    //umidità
    createElement('tr').id('rovHumidityRow').parent('#roveretoTable');
    createElement('th', 'Humidity').parent('#rovHumidityRow');
    createElement('td', data.main.humidity).parent('#rovHumidityRow');
    //descrizione
    createElement('tr').id('rovDescriptionRow').parent('#roveretoTable');
    createElement('th', 'Description').parent('#rovDescriptionRow');
    createElement('td', data.weather[0].description).parent('#rovDescriptionRow');
}

function gotData(data) {
     createElement('ul').id('issList').parent('#ISS');

    createElement('li').id('timeStamp').parent('#issList');
    select('#timeStamp').html('Timestamp: ' + data.timestamp);

    createElement('li').id('latitude').parent('#issList');
    select('#latitude').html('Latitude: ' + data.iss_position.latitude);

    createElement('li').id('longitude').parent('#issList');
    select('#longitude').html('Longitude: ' + data.iss_position.longitude);

}
