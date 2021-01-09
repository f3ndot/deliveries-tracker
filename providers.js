const request = require('request');

const PROVIDERS = {
  canada_post: 'https://www.canadapost.ca/trackweb/rs/track/json/package/$PIN/detail',
};

const getTrackingData = (provider, trackingNumber) => {
  const url = PROVIDERS[provider];
  const req = request(url.replace('$PIN', trackingNumber), { json: true }, (err, res, body) => {
    console.log(err, res, body);
  });
};

exports.PROVIDERS = PROVIDERS;
exports.getTrackingData = getTrackingData;