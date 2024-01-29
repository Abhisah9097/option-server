require('dotenv').config();
const axios = require('axios');
// Function to make API call to NSE with headers and params
async function callNseApi(req, res, next) {
  const nseApiEndpoint = process.env.API_URL || "";
  // const userAgent = req.headers['user-agent'];
  // Define headers and params
  const headers = {
    "User-Agent": req.headers['user-agent'] || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept": req.headers['accept'] || "application/json",
    "Accept-Encoding": req.headers['accept-encoding'] || "gzip, deflate, br",
    "Accept-Language": req.headers['accept-language'] || "en-US,en;q=0.9,hi;q=0.8",
    "Cookie": req.headers['cookie'] || "",
    "Content-Type": req.headers['content-type'] || "application/json",
    "Authorization": req.headers['authorization'] || "",
    "Cache-Control": req.headers['cache-control'] || "no-cache",
    "Connection": req.headers['connection'] || "keep-alive",
    "DNT": req.headers['dnt'] || "1",
    "Referer": req.headers['referer'] || ""
  };
  

  console.log("URL: ", headers, nseApiEndpoint);
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
