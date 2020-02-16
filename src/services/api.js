import axios from "axios";

import { API_URL } from "../config";

const apiURl =
  API_URL || `${window.location.protocol}//api.${window.location.host}`;

const paginateData = ({ headers, data }) => ({
  data,
  meta: {
    count: headers["Pagination-Count"],
    page: headers["Pagination-Page"],
    limit: headers["Pagination-Limit"]
  }
});

export const searchStores = query =>
  axios(`${apiURl}/shops`, { params: { query } }).then(paginateData);
