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
let language = 'fi';
let currentMenu;

const lunchlist = document.querySelector('.lunchlist');
const times = document.querySelector('.hsl-times');
const weather = document.querySelector('.weather');
const info = document.querySelector('.info');
const title = document.querySelector('#title');
const hsl = document.querySelector('#hsl');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

let renderCourseList = (menu) => {
  let courseList = document.querySelector('.lists');
  courseList.innerHTML = '';

  menu.forEach((course) => {
    const mealContainer = document.createElement('div');
    mealContainer.classList.add('meal-container');

    const mealName = document.createElement('div');
    mealName.classList.add('meal-name');

    const mealAllergens = document.createElement('div');
    mealAllergens.classList.add('meal-allergens');

    const mealPrices = document.createElement('div');
    mealPrices.classList.add('meal-prices');

    let meal = document.createElement('p');
    let allergens = document.createElement('p');

    meal.innerHTML = course[0];
    allergens.innerHTML = course[1];

    /**
     * if currentMenu has prices included - convert to string and split into array. For each value in array create DOM element 'p' and set value
     */
    mealName.appendChild(meal);
    mealAllergens.appendChild(allergens);
    mealContainer.append(mealName, mealAllergens);

    if (course[2]) {
      let priceArr = course[2].toString().split('/');
      priceArr.forEach((value) => {
        let prices = document.createElement('p');
        prices.innerHTML = value;
        mealPrices.appendChild(prices);
      });
      mealContainer.appendChild(mealPrices);
    }
    courseList.appendChild(mealContainer);
  });
};

const fetchHslData = () => {
  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForStopsByLocation(location),
  }).then((response) => {
    let busNumber = document.querySelector('#busnumber');
    let busDest = document.querySelector('#destination');
    let busArrival = document.querySelector('#arrival');
    busNumber.innerHTML = '';
    busDest.innerHTML = '';
    busArrival.innerHTML = '';
    console.log('hsl-data', response.data.stopsByRadius);
    for (let i = 0; i < response.data.stopsByRadius.edges.length; i++) {
      const stop = response.data.stopsByRadius.edges[i].node.stop;
      let timeHours = new Date(
        (stop.stoptimesWithoutPatterns[0].realtimeArrival +
          stop.stoptimesWithoutPatterns[0].serviceDay) *
          1000
      ).getHours();
      let timeMinutes = new Date(
        (stop.stoptimesWithoutPatterns[0].realtimeArrival +
          stop.stoptimesWithoutPatterns[0].serviceDay) *
          1000
      ).getMinutes();
      console.log(timeMinutes);
      if (timeMinutes < 10) {
        timeMinutes = `0${timeMinutes}`;
      }
      if (timeHours < 10) {
        timeHours = `0${timeHours}`;
      }
      /* ${stop.name} */
      busses.push(`${stop.stoptimesWithoutPatterns[0].trip.tripHeadsign}`);
      destination.push(
        `${stop.stoptimesWithoutPatterns[0].trip.routeShortName}`
      );
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

/**
 * Update weather every hour
 */
setInterval(() => {
  getWeather(cityCode);
  console.log('weather update');
}, 3600000);

/**
 * Update hsl-data every minute
 */
setInterval(() => {
  fetchHslData();
  console.log('hsl update');
}, 60000);

const init = async () => {
  const fazerArabiaFi = await FazerData.arabiaFi;
  const fazerArabiaEn = await FazerData.arabiaEn;
  const fazerKaramalmiFi = await FazerData.karamalmiFi;
  const fazerKaramalmiEn = await FazerData.karamalmiEn;
  const sodexoMyllypuroFi = await SodexoData.myllypuroFi;
  const sodexoMyllypuroEn = await SodexoData.myllypuroEn;
  const sodexoMyyrmakiFi = await SodexoData.myyrmakiFi;
  const sodexoMyyrmakiEn = await SodexoData.myyrmakiEn;

  getWeather(cityCode);
  carousel();

  if (language === 'fi') {
    currentMenu = fazerArabiaFi;
  } else {
    currentMenu = fazerArabiaEn;
  }
  renderCourseList(currentMenu);

  title.innerHTML = 'Lounaslista Arabia';

  const changeLanguage = () => {
    if (language === 'en') {
      language = 'fi';
      lunchlist.innerHTML = 'Lounaslista';
      times.innerHTML = 'HSL bussiaikataulu';
      weather.innerHTML = 'Sää';
      info.innerHTML = 'Koronatiedote';
      hsl.innerHTML = 'HSL bussiaikataulu';
    } else {
      language = 'en';
      lunchlist.innerHTML = 'Lunch Menu';
      times.innerHTML = 'HSL schedules';
      weather.innerHTML = 'Weather';
      info.innerHTML = 'COVID-19 info';
      hsl.innerHTML = 'HSL schedules';
    }
  };

  document.querySelector('#changeLang').addEventListener('click', () => {
    changeLanguage();
    changeCampus(language);
  });

  /**
   * Change campus data when clicking data-reload links
   */
  const changeCampus = (language) => {
    const dataReload = document.querySelectorAll('[data-reload]');
    for (let index = 0; index < dataReload.length; index++) {
      dataReload[index].onclick = function () {
        if (dataReload[index].classList.contains('menu__item')) {
          dataReload.forEach((data) => {
            data.classList.remove('active');
          });
          dataReload[index].classList.add('active');
        }
        title.innerHTML = '';
        if (index === 0) {
          cityCode = campus.arabia.cityID;
          location = campus.arabia;
          if (language === 'fi') {
            currentMenu = fazerArabiaFi;
            title.innerHTML = 'Lounaslista Arabia';
          } else {
            currentMenu = fazerArabiaEn;
            title.innerHTML = 'Lunch Menu Arabia';
          }
        } else if (index === 1) {
          cityCode = campus.karamalmi.cityID;
          location = campus.karamalmi;
          if (language === 'fi') {
            currentMenu = fazerKaramalmiFi;
            title.innerHTML = 'Lounaslista Karamalmi';
          } else {
            currentMenu = fazerKaramalmiEn;
            title.innerHTML = 'Lunch Menu Karamalmi';
          }
        } else if (index === 2) {
          cityCode = campus.myllypuro.cityID;
          location = campus.myllypuro;
          if (language === 'fi') {
            currentMenu = sodexoMyllypuroFi;
            title.innerHTML = 'Lounaslista Myllypuro';
          } else {
            currentMenu = sodexoMyllypuroEn;
            title.innerHTML = 'Lunch Menu Myllypuro';
          }
        } else if (index === 3) {
          cityCode = campus.myyrmaki.cityID;
          location = campus.myyrmaki;
          if (language === 'fi') {
            currentMenu = sodexoMyyrmakiFi;
            title.innerHTML = 'Lounaslista Myyrmäki';
          } else {
            currentMenu = sodexoMyyrmakiEn;
            title.innerHTML = 'Lunch Menu Myyrmäki';
          }
          /**
           * Täs vähä sinitarraa ja ei muuta ku herran haltuun :DDd
           * ripuli koodi on paras ja es :---DDD
           */
        } else if (index === 4) {
          if (location === campus.arabia && language === 'fi') {
            currentMenu = fazerArabiaFi;
            title.innerHTML = 'Lounaslista Arabia';
          } else if (location === campus.arabia && language === 'en') {
            currentMenu = fazerArabiaEn;
            title.innerHTML = 'Lunch Menu Arabia';
          }
          if (location === campus.karamalmi && language === 'fi') {
            currentMenu = fazerKaramalmiFi;
            title.innerHTML = 'Lounaslista Karamalmi';
          } else if (location === campus.karamalmi && language === 'en') {
            currentMenu = fazerKaramalmiEn;
            title.innerHTML = 'Lunch Menu Karamalmi';
          }
          if (location === campus.myllypuro && language === 'fi') {
            currentMenu = sodexoMyllypuroFi;
            title.innerHTML = 'Lounaslista Myllypuro';
          } else if (location === campus.myllypuro && language === 'en') {
            currentMenu = sodexoMyllypuroEn;
            title.innerHTML = 'Lunch Menu Myllypuro';
          }
          if (location === campus.myyrmaki && language === 'fi') {
            currentMenu = sodexoMyyrmakiFi;
            title.innerHTML = 'Lounaslista Myyrmäki';
          } else if (location === campus.myyrmaki && language === 'en') {
            currentMenu = sodexoMyyrmakiEn;
            title.innerHTML = 'Lunch Menu Myyrmäki';
          }
        }
        renderCourseList(currentMenu);
        getWeather(cityCode);
        fetchHslData();
      };
    }
  };
  changeCampus(language);
  fetchHslData();
};
init();
