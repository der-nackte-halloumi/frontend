/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from 'axios';
import { Shop } from '../models/shop';

const apiUrl =
  process.env.apiUrl ||
  `${window.location.protocol}//api.${window.location.host}`;

type PaginatedData<T> = {
  data: T;
  meta: {
    count: number;
    page: number;
    limit: number;
  };
};

const paginateData = <T = {}>({
  headers,
  data,
}: AxiosResponse<T>): PaginatedData<T> => ({
  data,
  meta: {
    count: Number(headers['Pagination-Count']) || 0,
    page: Number(headers['Pagination-Page']) || 0,
    limit: Number(headers['Pagination-Limit']) || 0,
  },
});

interface SearchStoreParams {
  query?: string;
  latitude?: number;
  longitude?: number;
}
export const searchStores = ({
  query,
  latitude,
  longitude,
}: SearchStoreParams): Promise<PaginatedData<Shop[] | null>> =>
  axios(`${apiUrl}/shops`, {
    params: { query, lat: latitude, long: longitude },
  }).then(res => paginateData<Array<Shop> | null>(res));
