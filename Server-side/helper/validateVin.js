const axios = require('axios');

async function vinLookup(vin) {
  const apiKey = 'JIYJw0ptZprX31M+Yt4Bjg==J84W7MezwTFRvimv';

  try {
    const response = await axios({
      method: 'GET',
      url: `https://api.api-ninjas.com/v1/vinlookup?vin=${vin}`,
      headers: {
        'X-Api-Key': apiKey
      }
    });

    console.log(response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request failed:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}

module.exports = vinLookup

