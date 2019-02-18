const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true  // takes the JSON string and converts it into a js object
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'REQUEST_DENIED') {
                reject('Google Maps API key is required.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
        
    });
}

geocodeAddress('00000').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});
