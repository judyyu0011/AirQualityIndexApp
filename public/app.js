
function vancouverFn() {
    $.getJSON('https://api.waqi.info/feed/vancouver/?token=' + configc.aqiApiKey, function(aqiData) {
        displayAQI(aqiData);
        activateColor("vancouver","shanghai","la","cur-loc");
    });

    // $.
}

function laFn() {
    $.getJSON('https://api.waqi.info/feed/los-angeles/?token=' + configc.aqiApiKey, function(aqiData) {
        displayAQI(aqiData);
        activateColor("la","shanghai","vancouver", "cur-loc");
    });
}

function shanghaiFn() {
    $.getJSON('https://api.waqi.info/feed/shanghai/?token=' + configc.aqiApiKey, function(aqiData) {
        displayAQI(aqiData);
        activateColor("shanghai","la","vancouver","cur-loc");
    });
}

function activateColor(active, notActive1, notActive2, notActive3) {
    document.getElementById(active).classList.add("city-active");
    document.getElementById(notActive1).classList.remove("city-active");
    document.getElementById(notActive2).classList.remove("city-active");
    document.getElementById(notActive3).classList.remove("city-active");
}

function displayAQI(aqiData) {
    const aqiContainer = document.getElementById("aqi");
    aqiContainer.innerHTML = " ";

    const aqiValue = document.createElement('h1');
    aqiContainer.appendChild(aqiValue);
    aqiValue.classList.add('aqi-value');
    const aqi = aqiData.data.aqi;
    aqiValue.innerHTML = aqi;
    var aqiColor;
    
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

    const pm25 = document.createElement('p');
    aqiContainer.appendChild(pm25);
    pm25.classList.add('pm25');
    pm25.innerHTML = "PM2.5" + ": " + aqiData.data.iaqi["pm25"].v;
    if (aqiData.data.iaqi.hasOwnProperty('pm25')) {
        pm25.innerHTML = "PM2.5" + ": " + aqiData.data.iaqi["pm25"].v;
    } else {
        pm25.innerHTML = "PM2.5: unknown";
    }

    const o3 = document.createElement('p');
    aqiContainer.appendChild(o3);
    o3.classList.add('o3');
    if (aqiData.data.iaqi.hasOwnProperty('o3')) {
        o3.innerHTML = "O3" + ": " + aqiData.data.iaqi["o3"].v;
    } else {
        o3.innerHTML = "O3: unknown";
    }

    const stationName = document.createElement('p');
    aqiContainer.appendChild(stationName);
    stationName.classList.add('station');
    stationName.innerHTML = aqiData.data.city.name;

    const source = document.createElement('p');
    aqiContainer.appendChild(source);
    source.classList.add('data-source');
    source.innerHTML = "Source: " + aqiData.data.attributions[0].name;
}

// function search() {
//     var input = document.getElementById("search-box").value;
//     console.log(input);
//     $.getJSON('https://api.waqi.info/feed/' + input + '/?token=' + configc.aqiApiKey, function(aqiData) {
//         if (aqiData.status == "ok") {
//             displayAQI(aqiData);
//             document.getElementById("search-box").value = '';
//         } else if (aqiData.status == "error") {
//             alert("Unknown station.")
//         }
//     });
// }

$(document).ready(()=>{
    $('#search-form').submit((e)=> {
        e.preventDefault();

        var data = {
            city: $('#search-box').val()
        };

        console.log(data);

        $.ajax({
            url : '/search',
            type : 'POST',
            contentType : 'application/json',
            data : JSON.stringify(data),
            success: (response)=>{
                console.log(response);
                if (response.status == "ok") {
                    displayAQI(response);
                    document.getElementById("search-box").value = '';
                } else if (response.status == "error") {
                    alert("Unknown station.")
                }
            }
        });
    }); 
});

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
        getCity(coordinates); 
        return; 
    } 

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert("Unable to access location information.")
    }
      
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function getCity(coordinates) {
    var lat = coordinates[0];
    var lng = coordinates[1];

    $.getJSON('https://api.waqi.info/feed/geo:' + lat + ';' + lng + '/?token=' + configc.aqiApiKey, function(aqiData) {
        if (aqiData.status == "ok") {
            displayAQI(aqiData);
            activateColor("cur-loc","la","vancouver","shanghai");
        } else if (aqiData.status == "error") {
            alert("Unknown station.")
        }
    });
}
