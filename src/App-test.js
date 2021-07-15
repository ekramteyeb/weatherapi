var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/find',
  params: {
    q: 'london',
    cnt: '0',
    mode: 'null',
    lon: '0',
    type: 'link, accurate',
    lat: '0',
    units: 'imperial, metric'
  },
  headers: {
    'x-rapidapi-key': '522f18392emsh07b4ad84f55c4d8p171de2jsnf2c31127d192',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data.name);
}).catch(function (error) {
	console.error(error);
});