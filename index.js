const {fetchfetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');
//require and run our main fetch function

// fetchMyIP((error, ip) => {
//   if (error) return console.log('Error fetching IP:', error);
//   console.log('Your IP is: ',ip);
// });

// fetchCoordsByIP('162.245.144.188', (error, data) => {
//   console.log(error);
//   console.log(data);
// });

// fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.09230' }, (error, data) => {
//   console.log(data);
// });


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) return console.log(error);
  for (let time of passTimes) {
    const dateObj = new Date(time.risetime * 1000);
    console.log(`Next pass at ${dateObj.toUTCString()} for ${time.duration} seconds!`);
  }
});
