import { campus, getWeather } from './modules/weatherAPI';

let cityCode = campus.arabia.cityID;

/**
 * Change campus when clicking data-reload links
 */
const changeCampus = () => {
    const dataReload = document.querySelectorAll('[data-reload]');
    for (let index = 0; index < dataReload.length; index++) {
        dataReload[index].onclick = function() {
             
            if(index === 0 ){
                cityCode = campus.arabia.cityID;
            }else if (index === 1){
                cityCode = campus.karamalmi.cityID;
            }else if (index === 2){
                cityCode = campus.myllypuro.cityID;
            }else if (index === 3){
                cityCode = campus.myyrmaki.cityID;
            }
            getWeather( cityCode );
        };
    }
};

const init = () => {
    changeCampus();
    getWeather( cityCode );
};
init();