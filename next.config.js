const { parsed: envVariables } = require("dotenv").config();

module.exports = {
  env: {
    mapboxToken: process.env.FE_MAPBOX_TOKEN || envVariables.FE_MAPBOX_TOKEN,
    apiUrl: process.env.API_URL || envVariables.API_URL
  },
  distDir: "build"
};
