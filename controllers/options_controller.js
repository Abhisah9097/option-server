require('dotenv').config();
const axios = require('axios');
// Function to make API call to NSE with headers and params
async function callNseApi(req, res, next) {
  const nseApiEndpoint = process.env.API_URL || "";
  const userAgent = req.headers['user-agent'];
  console.log("userAgent:", req.headers);
  // Define headers and params
  const headers = {
    "User-Agent": req.headers['user-agent'] || 'Thunder Client (https://www.thunderclient.com)',
    "Accept": req.headers['accept'],
    "Accept-Encoding": req.headers['accept-language'] || 'gzip, deflate, br',
    "Accept-Language": req.headers['accept-language'] || 'en-GB,en-US;q=0.9,en;q=0.8',
    "Cookie": req.headers['cookie'] || "",
  };

  const params = {
    symbol: "NIFTY"
  };
  try {
    const response = await axios.get(nseApiEndpoint, {
      headers: headers,
      params: params,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error making NSE API request' });
  }
}

module.exports = callNseApi;
