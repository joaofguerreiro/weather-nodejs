const request = require('request');


var getWeather = (latitude, longitude, callback) => {
    var forecastApiKey = '7ed41af18b5dec1bc43e1e414be96e6b';

    request({
        url: `https://api.darksky.net/forecast/${forecastApiKey}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io servers');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });

}

module.exports = {
    getWeather
}
