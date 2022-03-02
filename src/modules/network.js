/**
 * Fetches JSON data from APIs
 * @param {String} url - api endpoint url 
 * @param {String} useProxy -optional proxy server
 */
const fetchData = async(url, options = {}, useProxy) => {
  if(useProxy === 'allorigins'){
    url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  } else if (useProxy === 'fazer-php') {
    const subUrl = url.split('menu/')[1];
    url = `https://users.metropolia.fi/~casperdi/Mediatekniikka/Kevat22/js/proxy/fazer-proxy.php/${subUrl}`;
  };

  let jsonData;
  try {
    const response = await fetch(url, options);
    if (!response.ok){
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    jsonData = await response.json();
    //a allorigins returns json payload in data.contents
    if (useProxy === 'allorigins'){
      jsonData = JSON.parse(jsonData.contents);
    }
  } catch (error) {
    console.error('fetchData() error', error);
    jsonData = {};
  }
  return jsonData;
};


export {fetchData}; 