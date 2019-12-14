import axios from 'axios';

import { BUILD_ENV, API_URL } from '../config';

const apiURl =
  BUILD_ENV === 'production'
    ? `${window.location.protocol}//${API_URL || `api.${window.location.host}`}`
    : 'http://localhost:1337';

export const searchStores = query =>
  axios(`${apiURl}/stores/search`, { params: { query } }).then(res => res.data);
