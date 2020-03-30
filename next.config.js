const { parsed: envVariables } = require('dotenv').config();
const withCSS = require('@zeit/next-css');

const readFromEnvironmentOr = (key, or) =>
  process.env[key] || (envVariables && envVariables[key]) || or;

module.exports = withCSS({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.ts(x?)$/,
      use: [
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        },
      ],
    });

    return config;
  },

  env: {
    mapboxToken: readFromEnvironmentOr('FE_MAPBOX_TOKEN', ''),
    apiUrl: readFromEnvironmentOr('API_URL', ''),
  },
  distDir: 'build',
  environment: process.env.NODE_ENV || 'production',
});
