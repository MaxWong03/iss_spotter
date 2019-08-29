const request = require('request');


const fetchMyIP = (callback) => {
  //use request to fetch IP address form JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) callback(error, null);
    else if (response.statusCode !== 200) callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    else callback(null, JSON.parse(body).ip);
  });
};
const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) callback(error, null);
    else if (response.statusCode !== 200) callback(Error(`Status Code ${response.statusCode} when fetching geo info. Response: ${body}`), null);
    else {
      const {latitude, longitude} = JSON.parse(body).data;
      callback(null, {latitude, longitude});
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) callback(error, null);
    else if (response.statusCode !== 200) callback(Error(`Error fetching risetime and duration! Error Code: ${response.statusCode}\nResponse:${body}`), null);
    else {
      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
  });
};

/**
 * Orchestrates multiple api requests in order to determine the next 5 upcoming ISS fly overs for the users
 * Input:
 *  -A callback with an error or results
 * Returns(via callback):
 *  -An error, if any (nullable)
 *  -The fly-over times as an array (null if error)
 */

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) return callback(err,null);
    fetchCoordsByIP(ip, (err, latLongitude) => {
      if (err) return callback(err, null);
      fetchISSFlyOverTimes(latLongitude, (err, passOverTime) => {
        if (err) return callback(err,null);
        callback(null, passOverTime);
      });
    });
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};