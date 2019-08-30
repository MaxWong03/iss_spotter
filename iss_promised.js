const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (ip) => {
  ip = JSON.parse(ip).ip;
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFlyOVerTimes = (coords) => {
  coords = JSON.parse(coords).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSFlyOVerMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP) //when fetchMYIP is done, the value of the fulfilled promise is passed into fetchCoordsByIP, which parse the value first, and then return a new promise
    .then(fetchISSFlyOVerTimes) //when fetchCoordsByip is done, the value of the fulfilled promise is passed into fetchissflyovertime, which parse the value first, and then return a new promise
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    });
};
module.exports = nextISSFlyOVerMyLocation;

