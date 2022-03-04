const temperature = document.getElementById('temp');
const cityName = document.getElementById('city');
const weatherIcon = document.getElementById('icon');
const description = document.getElementById('desc');

const  campus = {
    karamalmi: {
        cityID: 660129
    },
    arabia: {
        cityID: 658225
    },
    myllypuro: {
        cityID: 658225
    },
    myyrmaki: {
        cityID: 632453
    }
};

/**
 * Fetch weather info from openweathermapAPI
 * 
 * @param {String} cityID weathermapAPI id for the city
 */
function getWeather( cityID ) {
    const key = 'fc82f8ba5976b84bc2e2debb241461c8';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID +'&units=metric' + '&appid=' + key)  
    .then(function(resp) { return resp.json(); }) // Convert data to json
    .then(function(data) {
      console.log(data);
      let temp = data.main.temp;
      temp = temp.toFixed(0);
      let city = data.name;
      let {icon} = data.weather[0];
      let desc = data.weather[0].description;
      temperature.textContent = temp + '°';
      cityName.textContent = city;
      weatherIcon.innerHTML = `<img src="assets/icons/${icon}.png">`;
      description.textContent = desc;
    });
  };
  
  export {getWeather, campus};