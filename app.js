// document.addEventListener('DOMContentLoaded', () => {
    // const appContainer = document.querySelector('.app-container');

    // const aqiContainer = document.createElement('div');
    // appContainer.appendChild(aqiContainer);
    // aqiContainer.classList.add('aqi');

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
        const aqiContainer = document.getElementById("aqi");
        aqiContainer.innerHTML = " ";
        // innerHTML = aqiData.data.city.name;
        // const aqiContainer = document.querySelector('#aqi');


        // const aqiContainer = document.createElement('div');
        // appContainer.append(aqiContainer);
        // aqiContainer.classList.add('aqi');

        const aqiValue = document.createElement('h1');
        aqiContainer.appendChild(aqiValue);
        aqiValue.classList.add('aqi-value');
        aqiValue.innerHTML = aqiData.data.aqi;

        const pm25 = document.createElement('p');
        aqiContainer.appendChild(pm25);
        pm25.classList.add('pm25');
        // var domPol = aqiData.data.dominentpol;
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

// })