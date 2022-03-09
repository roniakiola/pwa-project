//myllypuro ID 158
//leiritie myrtsi 152

'use strict';

import { fetchData } from './fetch-data';

let myllypuroFi = [];
let myllypuroEn = [];
let myyrmakiFi = [];
let myyrmakiEn = [];

let currentDate = new Date().toISOString().split('T')[0];
/**
 * fetch JSON data from sodexoUrl and parse menu contents into array
 * @param {array} menu
 * @param {string} language
 * @param {string} restaurantId
 * @returns - menu (array)
 */

let parseMenu = async (menu, language, restaurantId) => {
  const sodexoUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/${restaurantId}/${currentDate}`;

  const response = await fetchData(sodexoUrl);

  /** push meal name and diet codes into arrays */
  Object.values(response.courses).forEach((course) => {
    if (language === 'fi') {
      menu.push([course.title_fi, '(' + course.dietcodes + ')', course.price]);
    } else {
      menu.push([course.title_en, '(' + course.dietcodes + ')', course.price]);
    }
  });
  return menu;
};
myllypuroFi = parseMenu(myllypuroFi, 'fi', '158');
myllypuroEn = parseMenu(myllypuroEn, 'en', '158');
myyrmakiFi = parseMenu(myyrmakiFi, 'fi', '152');
myyrmakiEn = parseMenu(myyrmakiEn, 'en', '152');

const SodexoData = { myllypuroFi, myllypuroEn, myyrmakiFi, myyrmakiEn };
export default SodexoData;