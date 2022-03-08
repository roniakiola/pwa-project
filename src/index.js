'use strict';

import FazerData from './modules/fazer-data';
import SodexoData from './modules/sodexo-data';

const init = async () => {
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
    // fazerArabiaEn,
    // fazerKaramalmiFi,
    // fazerKaramalmiEn,
    // sodexoMyllypuroFi,
    // sodexoMyllypuroEn,
    sodexoMyyrmakiFi
    // sodexoMyyrmakiEn
  );
};
init();
