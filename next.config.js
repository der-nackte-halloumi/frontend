const { error, parsed: envVariables } = require("dotenv").config();

if (error) {
  throw error;
}

module.exports = {
  env: {
    mapboxToken: envVariables.FE_MAPBOX_TOKEN,
    apiUrl: envVariables.API_URL
  }
};
