const axios = require('axios');

// Initialize cookie variable and headers
let cookie;
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Accept': 'application/json',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
  'Cookie': cookie || ''
};

// Create Axios instance with base URL and headers
const instance = axios.create({
  headers: headers,
  timeout: 5000, // Set timeout as needed
});

const getCookies = async () => {
  try {
    const response = await instance.get(process.env.API_URL || "");
    cookie = response.headers['set-cookie'].join();
  } catch (error) {
    console.error("getCookies =========> error");
  }
}

const callNseApi = async (req, res, next) => {
  let retries = 3;

  while (retries > 0) {
    try {
      // Set the Cookie header before making the request
      headers['Cookie'] = cookie || '';
      headers['User-Agent'] = req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
      console.log("Headers: ", headers);
      const response = await instance.get(process.env.API_URL || "", {
        params: {
          symbol: "NIFTY"
        },
      });

      console.log("Success: ", 200);
      res.json(response.data);
      return; // Exit the function if successful
    } catch (error) {
      console.error("Error: ", error.message);

      if (error.response && error.response.status === 401) {
        console.log("callNseApi =========> error.status === 401");
        if (!cookie) {
          console.log("callNseApi =========> cookie not found");
          await getCookies();
        }
      }

      retries--;
    }
  }

  // If retries are exhausted
  res.status(500).json({ error: "Failed to fetch data from NSE API" });
};

module.exports = callNseApi;
