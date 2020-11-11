const token = "53f407f0dab7cf67ad57f71d6c32ad3588cbe32f";


function vancouverFn() {
    $.getJSON('https://api.waqi.info/feed/vancouver/?token=' + token, function(aqiData) {
        displayAQI(aqiData);
        activateColor("vancouver","shanghai","la");
    });
}

function laFn() {
    $.getJSON('https://api.waqi.info/feed/los-angeles/?token=' + token, function(aqiData) {
        displayAQI(aqiData);
        activateColor("la","shanghai","vancouver");
    });
}

function shanghaiFn() {
    $.getJSON('https://api.waqi.info/feed/shanghai/?token=' + token, function(aqiData) {
        displayAQI(aqiData);
        activateColor("shanghai","la","vancouver");
    });
}

function activateColor(active, notActive1, notActive2) {
    document.getElementById(active).classList.add("city-active");
    document.getElementById(notActive1).classList.remove("city-active");
    document.getElementById(notActive2).classList.remove("city-active");

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

    const o3 = document.createElement('p');
    aqiContainer.appendChild(o3);
    o3.classList.add('o3');
    o3.innerHTML = "O3" + ": " + aqiData.data.iaqi["o3"].v;

    const stationName = document.createElement('p');
    aqiContainer.appendChild(stationName);
    stationName.classList.add('station');
    stationName.innerHTML = aqiData.data.city.name;

    const source = document.createElement('p');
    aqiContainer.appendChild(source);
    source.classList.add('data-source');
    source.innerHTML = "Source: " + aqiData.data.attributions[0].name;
}

function search() {
    var input = document.getElementById("search-box").value;
    console.log(input);
    $.getJSON('https://api.waqi.info/feed/' + input + '/?token=' + token, function(aqiData) {
        displayAQI(aqiData);
    });
}
