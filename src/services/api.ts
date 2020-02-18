import axios, { AxiosResponse } from "axios";
import { Shop } from "../models/shop";

const apiUrl =
  process.env.apiUrl ||
  `${window.location.protocol}//api.${window.location.host}`;

const paginateData = <T = any>({ headers, data }: AxiosResponse<T>) => ({
  data,
  meta: {
    count: Number(headers["Pagination-Count"]) || 0,
    page: Number(headers["Pagination-Page"]) || 0,
    limit: Number(headers["Pagination-Limit"]) || 0
  }
});

interface searchStoreParams {
  query?: string;
  latitude?: number;
  longitude?: number;
}
export const searchStores = ({
  query,
  latitude,
  longitude
}: searchStoreParams) =>
  axios(`${apiUrl}/shops`, {
    params: { query, lat: latitude, long: longitude }
  }).then(res => paginateData<Array<Shop> | null>(res));
