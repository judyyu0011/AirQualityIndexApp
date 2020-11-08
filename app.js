function vancouverFn() {
    $.getJSON('https://api.waqi.info/feed/vancouver/?token=53f407f0dab7cf67ad57f71d6c32ad3588cbe32f', function(aqiData) {
        displayAQI(aqiData);
    });
    // alert("test");
}

function laFn() {
    $.getJSON('https://api.waqi.info/feed/los-angeles/?token=53f407f0dab7cf67ad57f71d6c32ad3588cbe32f', function(aqiData) {
        displayAQI(aqiData);
    });
    // alert("test");
}

function shanghaiFn() {
    $.getJSON('https://api.waqi.info/feed/shanghai/?token=53f407f0dab7cf67ad57f71d6c32ad3588cbe32f', function(aqiData) {
        displayAQI(aqiData);    
    });
    // alert("test");
}

function displayAQI(aqiData) {
    document.getElementById("aqi").innerHTML = aqiData.data.city.name;
    const aqiContainer = document.querySelector('#aqi');

    const aqiValue = document.createElement('h1');
    aqiContainer.append(aqiValue);
    aqiValue.classList.add('aqi-value');
    aqiValue.innerHTML = aqiData.data.aqi;

    const source = document.createElement('p');
    aqiContainer.appendChild(source);
    source.classList.add('data-source');
    source.innerHTML = "Source: " + aqiData.data.attributions[0].name;
}