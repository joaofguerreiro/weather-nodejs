const yargs = require('yargs');
const axios = require('axios');  // Promise-based HTTP client

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
var forecastApiKey = '7ed41af18b5dec1bc43e1e414be96e6b';

// HTTP GET request
axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    } else if (response.data.status === 'REQUEST_DENIED') {
        throw new Error('Google Maps API Key is missing.');
    }

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;

    var weatherUrl = `https://api.darksky.net/forecast/${forecastApiKey}/${latitude},${longitude}`;
    console.log(response.weatherUrl);
    
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`Current weather is ${temperature} but it feels like ${apparentTemperature}`);
}).catch((err) => {
    if (err.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(err.message);
    }
});
