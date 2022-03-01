import { getWeather } from './modules/weatherAPI';

let cityID = 632453;  /* 660129 */

const  campus = {
    karamalmi: {
        cityID: 
    }
};

window.onload = function() {
    getWeather( cityID );
};
