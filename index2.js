const nextISSFlyOVerMyLocation = require('./iss_promised');

nextISSFlyOVerMyLocation()
  .then((passTimes) => {
    for (let time of passTimes) {
      const dateObj = new Date(time.risetime * 1000);
      console.log(`Next pass at ${dateObj.toUTCString()} for ${time.duration} seconds!`);
    }
  })
  .catch(err => console.log(err.message));