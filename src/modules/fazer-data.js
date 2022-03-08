//arabianrannan fazer-ravintolan ID: 321259
//karamalmin ID: 270540

'use strict';

import { fetchData } from './fetch-data';

let currentDate = new Date().toISOString().split('T')[0];
let arabiaFi = [];
let arabiaEn = [];
let karamalmiFi = [];
let karamalmiEn = [];

const todayIndex = () => {
  const weekDay = new Date().getDay() - 1;
  return weekDay;
};

const parseMenu = async (menu, language, restaurantId) => {
  const fazerUrl = `https://www.foodandco.fi/api/restaurant/menu/week?language=${language}&restaurantPageId=${restaurantId}&weekDate=${currentDate}`;

  const response = await fetchData(fazerUrl, true);
  const parsedResponse = JSON.parse(response.contents);

  const setMenus = parsedResponse.LunchMenus[todayIndex()].SetMenus;
  setMenus.forEach((set) => {
    Object.values(set.Meals).forEach((meal) => {
      menu.push([meal.Name, '(' + meal.Diets.join(', ') + ')']);
    });
  });
  return menu;
};

arabiaFi = parseMenu(arabiaFi, 'fi', '321259');
arabiaEn = parseMenu(arabiaEn, 'en', '321259');
karamalmiFi = parseMenu(karamalmiFi, 'fi', '270540');
karamalmiEn = parseMenu(karamalmiEn, 'en', '270540');

const FazerData = { arabiaFi, arabiaEn, karamalmiFi, karamalmiEn };
export default FazerData;
