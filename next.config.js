const { parsed: envVariables } = require("dotenv").config();
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.tsx$/,
      use: [
        {
          loader: "linaria/loader",
          options: {
            sourceMap: process.env.NODE_ENV !== "production"
          }
        }
      ]
    });

    return config;
  },

  env: {
    mapboxToken: process.env.FE_MAPBOX_TOKEN || envVariables.FE_MAPBOX_TOKEN,
    apiUrl: process.env.API_URL || envVariables.API_URL
  },
  distDir: "build"
});
