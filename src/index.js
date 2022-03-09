import { carousel } from './modules/carousel';
import HSLData, { apiUrl } from './modules/hslAPI';
import { fetchData } from './modules/network';
import { campus, getWeather } from './modules/weatherAPI';
import FazerData from './modules/fazer-data';
import SodexoData from './modules/sodexo-data';

let cityCode = campus.arabia.cityID;
let location = campus.arabia;
let busses = [];
let destination = [];
let time = [];


const initLunchMenu = async () => {
  const fazerArabiaFi = await FazerData.arabiaFi;
  const fazerArabiaEn = await FazerData.arabiaEn;
  const fazerKaramalmiFi = await FazerData.karamalmiFi;
  const fazerKaramalmiEn = await FazerData.karamalmiEn;
  const sodexoMyllypuroFi = await SodexoData.myllypuroFi;
  const sodexoMyllypuroEn = await SodexoData.myllypuroEn;
  const sodexoMyyrmakiFi = await SodexoData.myyrmakiFi;
  const sodexoMyyrmakiEn = await SodexoData.myyrmakiEn;
  console.log(
    fazerArabiaFi,
    fazerArabiaEn,
    fazerKaramalmiFi,
    fazerKaramalmiEn,
    sodexoMyllypuroFi,
    sodexoMyllypuroEn,
    sodexoMyyrmakiFi,
    sodexoMyyrmakiEn
  );
};

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
        let busNumber = document.querySelector('#busnumber');
        let busDest = document.querySelector('#destination');
        let busArrival = document.querySelector('#arrival');
        busNumber.innerHTML = '';
        busDest.innerHTML = '';
        busArrival.innerHTML = '';
       console.log('hsl-data', response.data.stopsByRadius); 
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
          /* ${stop.name} */
          busses.push(`${stop.stoptimesWithoutPatterns[0].trip.tripHeadsign}`);
          destination.push(`${stop.stoptimesWithoutPatterns[0].trip.routeShortName}`);
          time.push(`${timeHours}:${timeMinutes}`);
          let busLi = document.createElement('li');
          let destLi = document.createElement('li');
          let arrLi = document.createElement('li');
          busLi.innerHTML = busses[i];
          destLi.innerHTML = destination[i];
          arrLi.innerHTML = time[i];

          busNumber.appendChild(busLi);
          busDest.appendChild(destLi);
          busArrival.appendChild(arrLi);
        }
        busses = [];
        destination = [];
        time = [];
      });
    };
  }
};
const init = () => {
  changeCampus();
  getWeather(cityCode);
  carousel();
  initLunchMenu();

  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForStopsByLocation(location)
  }).then(response => {
    let busNumber = document.querySelector('#busnumber');
    let busDest = document.querySelector('#destination');
    let busArrival = document.querySelector('#arrival');
    busNumber.innerHTML = '';
    busDest.innerHTML = '';
    busArrival.innerHTML = '';
    console.log('hsl-data', response.data.stopsByRadius);
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
      /* ${stop.name} */
      busses.push(`${stop.stoptimesWithoutPatterns[0].trip.tripHeadsign}`);
      destination.push(`${stop.stoptimesWithoutPatterns[0].trip.routeShortName}`);
      time.push(`${timeHours}:${timeMinutes}`);
      let busLi = document.createElement('li');
      let destLi = document.createElement('li');
      let arrLi = document.createElement('li');
      busLi.innerHTML = busses[i];
      destLi.innerHTML = destination[i];
      arrLi.innerHTML = time[i];

      busNumber.appendChild(busLi);
      busDest.appendChild(destLi);
      busArrival.appendChild(arrLi);
    }
    busses = [];
    destination = [];
    time = [];
  });
};
init();