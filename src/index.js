import { carousel } from './modules/carousel';
import HSLData, { apiUrl } from './modules/hslAPI';
import { fetchData } from './modules/network';
import { campus, getWeather } from './modules/weatherAPI';

let cityCode = campus.arabia.cityID;
let location = campus.arabia;
let busses = [];


/**
 * Change campus data when clicking data-reload links
 */
const changeCampus = () => {
  const dataReload = document.querySelectorAll('[data-reload]');
  for (let index = 0; index < dataReload.length; index++) {
    dataReload[index].onclick = function () {

      if (index === 0) {
        cityCode = campus.arabia.cityID;
        location = campus.arabia;
      } else if (index === 1) {
        cityCode = campus.karamalmi.cityID;
        location = campus.karamalmi;
      } else if (index === 2) {
        cityCode = campus.myllypuro.cityID;
        location = campus.myllypuro;
      } else if (index === 3) {
        cityCode = campus.myyrmaki.cityID;
        location = campus.myyrmaki;
      }
      getWeather(cityCode);
      fetchData(HSLData.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/graphql' },
        body: HSLData.getQueryForStopsByLocation(location)
      }).then(response => {
        let busList = document.querySelector('#bus-list');
        busList.innerHTML = '';
        /* console.log('hsl-data', response.data.stopsByRadius.edges[1]); */
        for (let i = 0; i < response.data.stopsByRadius.edges.length; i++) {
          const stop = response.data.stopsByRadius.edges[i].node.stop;
          let timeHours = new Date((stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000).getHours();
          let timeMinutes = new Date((stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000).getMinutes();
          console.log(timeMinutes);
          if (timeMinutes < 10){
            timeMinutes = `0${timeMinutes}`;
          }
          if(timeHours < 10){
            timeHours = `0${timeHours}`;
          }
          busses.push(`${stop.name} yeet ${stop.stoptimesWithoutPatterns[0].trip.routeShortName} ${stop.stoptimesWithoutPatterns[0].trip.tripHeadsign} yeet ${timeHours}:${timeMinutes} `);
          let li = document.createElement('li');
          li.innerHTML = busses[i];
          busList.appendChild(li);
        }
        busses = [];
      });
    };
  }
};
const init = () => {
  changeCampus();
  getWeather(cityCode);
  carousel();


  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForStopsByLocation(location)
  }).then(response => {
    let busList = document.querySelector('#bus-list');
    busList.innerHTML = '';
    console.log('hsl-data', response.data.stopsByRadius.edges[1]);
    for (let i = 0; i < response.data.stopsByRadius.edges.length; i++) {
      const stop = response.data.stopsByRadius.edges[i].node.stop;
      let timeHours = new Date((stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000).getHours();
      let timeMinutes = new Date((stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000).getMinutes();
      if (timeMinutes < 10){
        timeMinutes = `0${timeMinutes}`;
      }
      if(timeHours < 10){
        timeHours = `0${timeHours}`;
      }
      busses.push(`${stop.name} yeet ${stop.stoptimesWithoutPatterns[0].trip.routeShortName} ${stop.stoptimesWithoutPatterns[0].trip.tripHeadsign} yeet ${timeHours}:${timeMinutes} `);

      let li = document.createElement('li');
      li.innerHTML = busses[i];
      busList.appendChild(li);
    }
  });
};
init();