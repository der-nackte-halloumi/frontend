import axios from "axios";

import { API_URL } from "../config";

const apiURl =
  API_URL || `${window.location.protocol}//api.${window.location.host}`;

export const searchStores = query =>
  axios(`${apiURl}/shops`, { params: { query } }).then(res => res.data || []);
