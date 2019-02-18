const request = require('request');
const yargs = require('yargs');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true  // takes the JSON string and converts it into a js object
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'REQUEST_DENIED') {
            callback('Google Maps API key is required.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                // console.log(JSON.stringify(body, undefined, 2));
                address: body.results[0].formatted_address,
                coordinates: `Latitude: ${body.results[0].geometry.location.lat}; Longitude: ${body.results[0].geometry.location.lng}`
            })
        }
    });
    
};

module.exports = {
    geocodeAddress
}
