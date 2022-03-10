'use strict';

import { fetchData } from './fetch-data';

let arabiaFi = [];
let arabiaEn = [];
let karamalmiFi = [];
let karamalmiEn = [];

let currentDate = new Date().toISOString().split('T')[0];

/* set the day of the week as index from 0-6 (doesn't work here on sundays but sundays are not needed) */
const todayIndex = () => {
  const weekDay = new Date().getDay() - 1;
  return weekDay;
};

/**
 * fetch JSON data from fazerUrl and parse menu contents into array
 * uses proxy for CORS config, please refer to fetch-data.js
 * @param {array} menu - array where contents of JSON menu is parsed
 * @param {string} language - language of menu
 * @param {string} restaurantId - restaurant's ID to url
 * @returns - menu (array)
 */
const parseMenu = async (menu, language, restaurantId) => {
  const fazerUrl = `https://www.foodandco.fi/api/restaurant/menu/week?language=${language}&restaurantPageId=${restaurantId}&weekDate=${currentDate}`;

  /**fetchData(true) using proxy for CORS */
  const response = await fetchData(fazerUrl, true);

  /**parse JSON */
  const parsedResponse = JSON.parse(response.contents);

  /** push meal name and diet codes into arrays */
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
