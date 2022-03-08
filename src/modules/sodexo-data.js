//myllypuro ID 158
//leiritie myrtsi 152

'use strict';

import { fetchData } from './fetch-data';

//current date YYYY-MM-DD
let currentDate = new Date().toISOString().split('T')[0];

let myllypuroFi = [];
let myllypuroEn = [];
let myyrmakiFi = [];
let myyrmakiEn = [];

//Using current date in URL to fetch days lunch menu

//fetching menu data and parsing every course name into array
let parseMenu = async (menu, language, restaurantId) => {
  const sodexoUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/${restaurantId}/${currentDate}`;

  const response = await fetchData(sodexoUrl);

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

console.log(myllypuroFi, myllypuroEn, myyrmakiFi, myyrmakiEn);

const SodexoData = { myllypuroFi, myllypuroEn, myyrmakiFi, myyrmakiEn };
export default SodexoData;
