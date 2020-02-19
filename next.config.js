const { error, parsed: envVariables } = require("dotenv").config();

if (error) {
  throw error;
}

module.exports = {
  env: {
    mapboxToken: process.env.FE_MAPBOX_TOKEN || envVariables.FE_MAPBOX_TOKEN,
    apiUrl: process.env.API_URL || envVariables.API_URL
  }
};
