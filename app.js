var richmond = document.getElementById('Richmond');
var la = document.getElementById('LA');
var shanghai = document.getElementById('Shanghai')



// richmond.onlick = function() {
//     $.getJSON('https://api.waqi.info/feed/shanghai/?token=53f407f0dab7cf67ad57f71d6c32ad3588cbe32f', function(aqiData) {
//         document.getElementById("aqi").innerHTML = aqiData.data.city;
//     });
//     alert("test");
// }

function richmondFn() {
    $.getJSON('https://api.waqi.info/feed/shanghai/?token=53f407f0dab7cf67ad57f71d6c32ad3588cbe32f', function(aqiData) {
        document.getElementById("aqi").innerHTML = aqiData.data.city;
    });
    alert("test");
}
