
function displayAQI(aqiData) {
    const aqiContainer = document.getElementById("aqi-container");
    aqiContainer.innerHTML = " ";

    // adds aqi value
    const aqiValue = document.createElement('h1');
    aqiContainer.appendChild(aqiValue);
    aqiValue.classList.add('aqi-value');
    const aqi = aqiData.data.aqi;
    aqiValue.innerHTML = aqi;
    var aqiColor;
    
    // assigns background color based on aqi value
    switch (true) {
        case (aqi <= 50):
            aqiValue.style.backgroundColor = "#009966";
            break;
        case (aqi <= 100):
            aqiValue.style.backgroundColor = "#ffde33";
            break;
        case (aqi <= 150):
            aqiValue.style.backgroundColor = "#ff9933";
            break;
        case (aqi <= 200):
            aqiValue.style.backgroundColor = "#cc0033";
            break;
        case (aqi <= 300):
            aqiValue.style.backgroundColor = "#660099";
            break;
        case (aqi > 300):
            aqiValue.style.backgroundColor = "#7e0023";
            break;
    }       

    // displays station name
    const stationName = document.createElement('p');
    aqiContainer.appendChild(stationName);
    stationName.classList.add('station');
    stationName.innerHTML = aqiData.data.city.name;

    // adds pollutant container
    const polContainer = document.createElement('div');
    aqiContainer.appendChild(polContainer);
    polContainer.id = 'pollutant';

    // displays pollutant heading
    const polHeading = document.createElement('p');
    polContainer.appendChild(polHeading);
    polHeading.id = 'pollutant-heading';
    polHeading.innerHTML = "Dominant Pollutant";

    // container for dominant pollutant
    const domPolContainer = document.createElement('div');
    polContainer.appendChild(domPolContainer);
    domPolContainer.id = 'dom-pol-container';

    // gets the dominant pollutant, display it
    var dominantPollutant = aqiData.data.dominentpol;
    console.log(dominantPollutant);
    const domPol = document.createElement('p');
    domPolContainer.appendChild(domPol);
    domPol.id = 'dom-pol';
    var domPolName;
    if (dominantPollutant == 'co') {
        domPolName = 'Carbon Monoxide';
    } else if (dominantPollutant == 'h') {
        domPolName = 'Hydrogen';
    } else if (dominantPollutant == 'no2') {
        domPolName = 'Nitrogen Dioxide';
    } else if (dominantPollutant == 'o3') {
        domPolName = 'Ozone';
    } else if (dominantPollutant == 'pm10') {
        domPolName = 'PM' + '10'.sub();
    } else if (dominantPollutant == 'pm25') {
        domPolName = 'PM' + '2.5'.sub();
    } else if (dominantPollutant == 'so2') {
        domPolName = 'Sulfur Dioxide';
    } else {
        domPolName = dominantPollutant;
    }
    domPol.innerHTML = domPolName + ": "+ aqiData.data.iaqi[dominantPollutant].v;

    // displays the data source
    const source = document.createElement('p');
    aqiContainer.appendChild(source);
    source.classList.add('data-source');
    source.innerHTML = "Source: " + aqiData.data.attributions[0].name;

    const time = document.createElement('p');
    aqiContainer.appendChild(time);
    time.id = 'time';
    time.innerHTML = "Last Updated: " + aqiData.data.time.s.substring(0,16) + " (local time zone)";

}

// apply color for the selected city
// remove colors for cities not selected
function activateColor(active, notActive1, notActive2, notActive3) {
    document.getElementById(active).classList.add("city-active");
    document.getElementById(notActive1).classList.remove("city-active");
    document.getElementById(notActive2).classList.remove("city-active");
    document.getElementById(notActive3).classList.remove("city-active");
}

// remove colors for all cities
function deactivateColor() {
    var list = document.getElementsByClassName("city");
    for (var i = 0; i < list.length; i++) {
        list[i].classList.remove("city-active");
    }
}

// api call for default city1
function vancouverFn() {
    var data = { city: 'vancouver' };
    callApi(data);
}

// api call for default city2
function laFn() {
    var data = { city: 'los-angeles' };
    callApi(data);
}

// api call for default city3
function shanghaiFn() {
    var data = { city: 'shanghai' };
    callApi(data);
}

// send city name to server 
// handles response (json from api call) from server
// for default cities
function callApi(data) {
    $.ajax({
        url : '/',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(data),
        success: (response)=>{
            console.log(response);
            displayAQI(response);
            if (data.city == "vancouver") {
                activateColor("vancouver","shanghai","la","cur-loc");
            } else if (data.city =="shanghai") {
                activateColor("shanghai","la","vancouver","cur-loc");
            } else if (data.city == "los-angeles") {
                activateColor("la","shanghai","vancouver", "cur-loc");
            }
        }
    });
}

// send city name inputted by user to server
// handles response (json from api call) from server
// for search function
$(document).ready(()=>{
    $('#search-form').submit((e)=> {
        e.preventDefault();

        var data = {
            city: $('#search-box').val()
        };

        $.ajax({
            url : '/',
            type : 'POST',
            contentType : 'application/json',
            data : JSON.stringify(data),
            success: (response)=>{
                console.log(response);
                if (response.status == "ok") {
                    displayAQI(response);
                    document.getElementById("search-box").value = '';
                    deactivateColor();
                } else if (response.status == "error") {
                    alert("Unknown station.")
                }
            }
        });
    }); 
});

// get user's current location coordinate
// uses built in geolocation
function getCoordinates() {
    var options = { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0 
    }; 

    function success(pos) { 
        var crd = pos.coords; 
        var lat = crd.latitude.toString(); 
        var lng = crd.longitude.toString(); 
        var coordinates = [lat, lng]; 
        console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
        displayDataForCurrLoc(coordinates); 
        return; 
    } 

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert("Unable to access location information.")
    }
      
    navigator.geolocation.getCurrentPosition(success, error, options);
}

// sends user's coordiantes to server
// handles response from server
function displayDataForCurrLoc(coordinates) {
    var data = {
        lat : coordinates[0],
        lng : coordinates[1]
    };

    console.log(data);

    $.ajax({
        url : '/curr-loc',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(data),
        success: (response)=>{
            console.log(response);
            if (response.status == "ok") {
                displayAQI(response);
                activateColor("cur-loc","la","vancouver","shanghai");
            } else if (response.status == "error") {
                alert("Unknown station.")
            }
        }
    });
}
