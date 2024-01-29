require('dotenv').config();
const axios = require('axios');
// Function to make API call to NSE with headers and params
async function callNseApi(req, res, next) {
  const nseApiEndpoint = process.env.API_URL || "";
  const userAgent = req.headers['user-agent'];
  // Define headers and params
  const headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
    "Cookie": ""
  };

  console.log("URL: ", nseApiEndpoint);
  const params = {
    symbol: "NIFTY"
  };
  try {
    const response = await axios.get(nseApiEndpoint, {
      headers: headers,
      params: params,
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
}

module.exports = callNseApi;
